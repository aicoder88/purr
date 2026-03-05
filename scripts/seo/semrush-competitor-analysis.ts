#!/usr/bin/env tsx
/**
 * SEMrush Competitor & Backlink Gap Analysis for purrify.ca
 *
 * Pulls:
 * 1. Organic competitors (CA + US databases)
 * 2. Keyword gap — high-volume keywords competitors rank for, we don't
 * 3. Backlink referring domains for top competitors
 * 4. Purrify's own referring domains (for gap comparison)
 * 5. Outputs a full markdown report to docs/SEO_COMPETITOR_REPORT.md
 */

import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const API_KEY = process.env.SEMRUSH_API_KEY;
if (!API_KEY) {
  console.error('SEMRUSH_API_KEY not set in .env.local');
  process.exit(1);
}

const BASE_URL = 'https://api.semrush.com/';
const BACKLINKS_URL = 'https://api.semrush.com/analytics/v1/';
const OUR_DOMAIN = 'purrify.ca';

// Databases to query
const DATABASES = ['ca', 'us'] as const;

// ----- helpers -----

async function semrushGet(params: Record<string, string | number>): Promise<string> {
  const qs = new URLSearchParams({
    key: API_KEY!,
    ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
  });
  const url = `${BASE_URL}?${qs}`;
  const res = await fetch(url);
  const text = await res.text();
  if (text.startsWith('ERROR')) throw new Error(`SEMrush error: ${text}`);
  return text;
}

async function semrushBacklinks(params: Record<string, string | number>): Promise<string> {
  const qs = new URLSearchParams({
    key: API_KEY!,
    ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
  });
  const url = `${BACKLINKS_URL}?${qs}`;
  const res = await fetch(url);
  const text = await res.text();
  if (text.startsWith('ERROR')) throw new Error(`SEMrush backlinks error: ${text}`);
  return text;
}

function parseCsv(raw: string): Array<Record<string, string>> {
  const lines = raw.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(';');
  return lines.slice(1).map(line => {
    const vals = line.split(';');
    return Object.fromEntries(headers.map((h, i) => [h.trim(), (vals[i] ?? '').trim()]));
  });
}

function num(s: string): number {
  return parseInt(s.replace(/[^0-9]/g, ''), 10) || 0;
}

function fmtNum(n: number): string {
  return n.toLocaleString('en-CA');
}

// ----- API calls -----

async function getOrganicCompetitors(domain: string, db: string, limit = 15) {
  const raw = await semrushGet({
    type: 'domain_organic_organic',
    domain,
    database: db,
    display_limit: limit,
    export_columns: 'Dn,Cr,Np,Or,Ot,Oc,Ad',
  });
  return parseCsv(raw);
}

async function getDomainKeywords(domain: string, db: string, limit = 200) {
  const raw = await semrushGet({
    type: 'domain_organic',
    domain,
    database: db,
    display_limit: limit,
    export_columns: 'Ph,Po,Nq,Cp,Ur,Co',
  });
  return parseCsv(raw);
}

async function getDomainBacklinkOverview(domain: string) {
  const raw = await semrushBacklinks({
    type: 'backlinks_overview',
    target: domain,
    target_type: 'root_domain',
    export_columns: 'ascore,total,domains_num,follows_num,nofollows_num',
  });
  return parseCsv(raw)[0] ?? {};
}

async function getRefDomains(domain: string, limit = 100) {
  const raw = await semrushBacklinks({
    type: 'backlinks_refdomains',
    target: domain,
    target_type: 'root_domain',
    display_limit: limit,
    export_columns: 'domain_ascore,domain,backlinks_num,ip',
    display_sort: 'domain_ascore_desc',
  });
  return parseCsv(raw);
}

// ----- analysis -----

interface KeywordRow {
  keyword: string;
  position: number;
  volume: number;
  cpc: number;
  url: string;
  competition: number;
}

function parseKeywords(rows: Array<Record<string, string>>): KeywordRow[] {
  return rows.map(r => ({
    keyword: r['Keyword'] ?? r['Ph'] ?? '',
    position: num(r['Position'] ?? r['Po'] ?? '0'),
    volume: num(r['Search Volume'] ?? r['Nq'] ?? '0'),
    cpc: parseFloat(r['CPC'] ?? r['Cp'] ?? '0') || 0,
    url: r['URL'] ?? r['Ur'] ?? '',
    competition: parseFloat(r['Competition'] ?? r['Co'] ?? '0') || 0,
  })).filter(k => k.keyword);
}

function keywordGap(
  ourKeywords: KeywordRow[],
  theirKeywords: KeywordRow[],
  minVolume = 50
): KeywordRow[] {
  const ourSet = new Set(ourKeywords.map(k => k.keyword.toLowerCase()));
  return theirKeywords
    .filter(k => !ourSet.has(k.keyword.toLowerCase()) && k.volume >= minVolume && k.position <= 20)
    .sort((a, b) => b.volume * (b.cpc + 0.1) - a.volume * (a.cpc + 0.1))
    .slice(0, 40);
}

// ----- report builder -----

function tableRow(...cells: string[]): string {
  return `| ${cells.join(' | ')} |`;
}

function mdTable(headers: string[], rows: string[][]): string {
  const sep = headers.map(() => '---');
  return [
    tableRow(...headers),
    tableRow(...sep),
    ...rows.map(r => tableRow(...r)),
  ].join('\n');
}

// ----- main -----

async function main() {
  const lines: string[] = [];
  const log = (s: string) => { lines.push(s); process.stdout.write(s + '\n'); };

  log(`# SEMrush Competitor & Backlink Gap Report — purrify.ca`);
  log(`**Generated:** ${new Date().toISOString().slice(0, 10)}\n`);

  // ---- 1. Our keywords (CA + US) ----
  log('## Step 1 — Collecting Purrify keyword universe...');
  const ourKwsCA = parseKeywords(await getDomainKeywords(OUR_DOMAIN, 'ca', 200));
  const ourKwsUS = parseKeywords(await getDomainKeywords(OUR_DOMAIN, 'us', 200));
  const ourKwsAll = [...ourKwsCA, ...ourKwsUS];
  log(`  CA: ${ourKwsCA.length} keywords | US: ${ourKwsUS.length} keywords\n`);

  // ---- 2. Organic competitors ----
  log('## Step 2 — Identifying organic competitors...');
  const competitorsCA = await getOrganicCompetitors(OUR_DOMAIN, 'ca', 15);
  const competitorsUS = await getOrganicCompetitors(OUR_DOMAIN, 'us', 15);

  // Deduplicate competitor domains
  const competitorDomains = new Map<string, Record<string, string>>();
  for (const row of [...competitorsCA, ...competitorsUS]) {
    const d = row['Domain'] ?? row['Dn'] ?? '';
    if (d && d !== OUR_DOMAIN && !competitorDomains.has(d)) {
      competitorDomains.set(d, row);
    }
  }

  log(`  Found ${competitorDomains.size} unique competitor domains\n`);

  lines.push('---\n');
  lines.push('## Organic Competitors (CA + US)\n');

  const compHeaders = ['Domain', 'Common KWs', 'Their KWs', 'Est. Traffic/mo', 'Paid KWs'];
  const compRows: string[][] = [];

  for (const [domain, row] of competitorDomains) {
    compRows.push([
      domain,
      row['Common Keywords'] ?? row['Cr'] ?? '0',
      row['Competitor\'s Keywords'] ?? row['Or'] ?? row['Np'] ?? '0',
      fmtNum(num(row['Competitor\'s Traffic'] ?? row['Ot'] ?? '0')),
      row['Competitor\'s Paid Keywords'] ?? row['Oc'] ?? '0',
    ]);
  }

  lines.push(mdTable(compHeaders, compRows));
  lines.push('');

  // ---- 3. Keyword gap for top competitors ----
  lines.push('---\n');
  lines.push('## Keyword Gap — High-Value Keywords You\'re Missing\n');
  lines.push('> Competitors rank #1–20 for these; Purrify does not rank at all. Sorted by traffic value (volume × CPC).\n');

  // Pick top 6 competitors by traffic
  const topCompetitors = compRows
    .sort((a, b) => num(b[3].replace(/,/g, '')) - num(a[3].replace(/,/g, '')))
    .slice(0, 6)
    .map(r => r[0]);

  log(`## Step 3 — Keyword gap analysis for: ${topCompetitors.join(', ')}`);

  const allGapKeywords = new Map<string, KeywordRow & { foundOn: string[] }>();

  for (const competitor of topCompetitors) {
    log(`  Pulling keywords for ${competitor}...`);
    try {
      // Try CA first, then US
      let theirKws: KeywordRow[] = [];
      try {
        theirKws = parseKeywords(await getDomainKeywords(competitor, 'ca', 200));
      } catch {}
      if (theirKws.length < 10) {
        theirKws = parseKeywords(await getDomainKeywords(competitor, 'us', 200));
      }

      const gap = keywordGap(ourKwsAll, theirKws, 50);
      log(`    → ${gap.length} gap keywords`);

      for (const kw of gap) {
        const key = kw.keyword.toLowerCase();
        if (allGapKeywords.has(key)) {
          allGapKeywords.get(key)!.foundOn.push(competitor);
        } else {
          allGapKeywords.set(key, { ...kw, foundOn: [competitor] });
        }
      }
    } catch (e: any) {
      log(`    ERROR for ${competitor}: ${e.message}`);
    }
  }

  // Sort gap keywords: appear on multiple competitors first, then by value
  const sortedGap = [...allGapKeywords.values()]
    .sort((a, b) => {
      const multiA = a.foundOn.length > 1 ? 1 : 0;
      const multiB = b.foundOn.length > 1 ? 1 : 0;
      if (multiB !== multiA) return multiB - multiA;
      return (b.volume * (b.cpc + 0.1)) - (a.volume * (a.cpc + 0.1));
    })
    .slice(0, 50);

  const gapHeaders = ['Keyword', 'Vol/mo', 'CPC', 'Competition', 'Competitors Ranking', 'Priority'];
  const gapRows: string[][] = sortedGap.map(k => {
    const priority = k.foundOn.length >= 3 ? '**HIGH**'
      : k.foundOn.length === 2 ? '**MED**'
      : k.volume >= 200 && k.cpc >= 0.40 ? 'MED'
      : 'LOW';
    return [
      k.keyword,
      fmtNum(k.volume),
      `$${k.cpc.toFixed(2)}`,
      k.competition.toFixed(2),
      k.foundOn.slice(0, 3).join(', '),
      priority,
    ];
  });

  lines.push(mdTable(gapHeaders, gapRows));
  lines.push('');

  // ---- 4. Backlink analysis ----
  lines.push('---\n');
  lines.push('## Backlink Analysis\n');

  log('\n## Step 4 — Backlink overview...');

  // Our backlinks
  let ourBacklinks: Record<string, string> = {};
  let ourRefDomains: Array<Record<string, string>> = [];
  try {
    ourBacklinks = await getDomainBacklinkOverview(OUR_DOMAIN);
    ourRefDomains = await getRefDomains(OUR_DOMAIN, 100);
    log(`  Purrify: ${ourBacklinks['total'] ?? '?'} total backlinks, ${ourBacklinks['domains_num'] ?? '?'} referring domains`);
  } catch (e: any) {
    log(`  Backlink overview error: ${e.message}`);
  }

  const ourRefSet = new Set(ourRefDomains.map(r => (r['domain'] ?? '').toLowerCase()));

  lines.push('### Purrify Backlink Profile\n');
  lines.push(`| Metric | Value |`);
  lines.push(`| --- | --- |`);
  lines.push(`| Authority Score | ${ourBacklinks['ascore'] ?? 'N/A'} |`);
  lines.push(`| Total Backlinks | ${fmtNum(num(ourBacklinks['total'] ?? '0'))} |`);
  lines.push(`| Referring Domains | ${fmtNum(num(ourBacklinks['domains_num'] ?? '0'))} |`);
  lines.push(`| Follow Links | ${fmtNum(num(ourBacklinks['follows_num'] ?? '0'))} |`);
  lines.push(`| Nofollow Links | ${fmtNum(num(ourBacklinks['nofollows_num'] ?? '0'))} |`);
  lines.push('');

  // Competitor backlink profiles + gap
  lines.push('### Competitor Backlink Profiles\n');

  const blHeaders = ['Domain', 'Auth Score', 'Total Links', 'Ref Domains', 'Follow'];
  const blRows: string[][] = [];

  const competitorRefDomains = new Map<string, Array<Record<string, string>>>();

  for (const competitor of topCompetitors.slice(0, 5)) {
    log(`  Pulling backlinks for ${competitor}...`);
    try {
      const overview = await getDomainBacklinkOverview(competitor);
      const refDoms = await getRefDomains(competitor, 100);
      competitorRefDomains.set(competitor, refDoms);

      blRows.push([
        competitor,
        overview['ascore'] ?? 'N/A',
        fmtNum(num(overview['total'] ?? '0')),
        fmtNum(num(overview['domains_num'] ?? '0')),
        fmtNum(num(overview['follows_num'] ?? '0')),
      ]);
      log(`    AS=${overview['ascore']}, refdomains=${overview['domains_num']}`);
    } catch (e: any) {
      log(`    ERROR: ${e.message}`);
      blRows.push([competitor, 'N/A', 'N/A', 'N/A', 'N/A']);
    }
  }

  lines.push(mdTable(blHeaders, blRows));
  lines.push('');

  // ---- 5. Backlink gap — domains linking to competitors but NOT to purrify ----
  lines.push('### Backlink Gap — Easy Link Opportunities\n');
  lines.push('> These domains link to your competitors but NOT to purrify.ca. Sorted by Authority Score.\n');

  // Collect all competitor ref domains not linking to us
  interface RefDomainGap {
    domain: string;
    ascore: number;
    backlinks: number;
    linkedTo: string[];
  }

  const refDomainGap = new Map<string, RefDomainGap>();

  for (const [competitor, refDoms] of competitorRefDomains) {
    for (const row of refDoms) {
      const d = (row['domain'] ?? '').toLowerCase();
      if (!d || ourRefSet.has(d) || d === OUR_DOMAIN) continue;
      if (refDomainGap.has(d)) {
        refDomainGap.get(d)!.linkedTo.push(competitor);
      } else {
        refDomainGap.set(d, {
          domain: d,
          ascore: num(row['domain_ascore'] ?? '0'),
          backlinks: num(row['backlinks_num'] ?? '0'),
          linkedTo: [competitor],
        });
      }
    }
  }

  // Sort by: appears on multiple competitors first, then by authority score
  const sortedRefGap = [...refDomainGap.values()]
    .sort((a, b) => {
      if (b.linkedTo.length !== a.linkedTo.length) return b.linkedTo.length - a.linkedTo.length;
      return b.ascore - a.ascore;
    })
    .slice(0, 60);

  const refGapHeaders = ['Referring Domain', 'Auth Score', 'Backlinks', 'Links to Competitors', 'Opportunity'];
  const refGapRows: string[][] = sortedRefGap.map(r => {
    const opp = r.linkedTo.length >= 3 ? '**HOT**'
      : r.linkedTo.length === 2 ? '**WARM**'
      : r.ascore >= 40 ? 'HIGH-DA'
      : 'STANDARD';
    return [
      r.domain,
      String(r.ascore),
      fmtNum(r.backlinks),
      r.linkedTo.slice(0, 3).join(', '),
      opp,
    ];
  });

  lines.push(mdTable(refGapHeaders, refGapRows));
  lines.push('');

  // ---- 6. Our existing referring domains ----
  lines.push('### Purrify Current Referring Domains (Top 30 by Authority)\n');
  const ourRefHeaders = ['Domain', 'Auth Score', 'Backlinks to Us'];
  const ourRefRows = ourRefDomains
    .sort((a, b) => num(b['domain_ascore'] ?? '0') - num(a['domain_ascore'] ?? '0'))
    .slice(0, 30)
    .map(r => [
      r['domain'] ?? '',
      r['domain_ascore'] ?? '0',
      fmtNum(num(r['backlinks_num'] ?? '0')),
    ]);

  lines.push(mdTable(ourRefHeaders, ourRefRows));
  lines.push('');

  // ---- 7. Action plan ----
  lines.push('---\n');
  lines.push('## Prioritized Action Plan\n');

  const hotLinks = sortedRefGap.filter(r => r.linkedTo.length >= 2).slice(0, 10);
  const highValueKws = sortedGap.filter(k => k.foundOn.length >= 2).slice(0, 10);

  lines.push('### Backlink Outreach — Top Targets\n');
  if (hotLinks.length) {
    lines.push('These domains link to 2+ of your competitors. Reach out for guest posts, product mentions, or resource links:\n');
    hotLinks.forEach((r, i) => {
      lines.push(`${i + 1}. **${r.domain}** (AS: ${r.ascore}) — links to: ${r.linkedTo.join(', ')}`);
    });
  }

  lines.push('\n### Keyword Content Gaps — Write These First\n');
  if (highValueKws.length) {
    lines.push('2+ competitors rank for these. Create or strengthen pages targeting:\n');
    highValueKws.forEach((k, i) => {
      lines.push(`${i + 1}. **"${k.keyword}"** — ${fmtNum(k.volume)}/mo, CPC $${k.cpc.toFixed(2)}, ranked by: ${k.foundOn.join(', ')}`);
    });
  }

  lines.push('\n---\n');
  lines.push(`_Report generated by \`scripts/seo/semrush-competitor-analysis.ts\` on ${new Date().toISOString().slice(0, 10)}_`);

  // Write report
  const outPath = path.resolve(process.cwd(), 'docs/SEO_COMPETITOR_REPORT.md');
  fs.writeFileSync(outPath, lines.join('\n'), 'utf-8');
  console.log(`\nReport written to: ${outPath}`);
}

main().catch(e => {
  console.error('Fatal:', e);
  process.exit(1);
});
