import fs from 'fs';
import path from 'path';
import type { BrokenLink, LinkCheckResult } from './broken-link-detector';
import type { CanonicalIssue } from './canonical-validator';
import type { RedirectChain } from './redirect-analyzer';

export interface TechnicalSEOReport {
  timestamp: string;
  summary: {
    totalUrls: number;
    brokenLinks: number;
    canonicalIssues: number;
    redirectChains: number;
    sitemapIssues: number;
    healthScore: number;
  };
  brokenLinks: BrokenLink[];
  canonicalIssues: CanonicalIssue[];
  redirectChains: RedirectChain[];
  sitemapIssues: Array<{
    url: string;
    issue: string;
    action: string;
    canonicalUrl?: string;
  }>;
}

export class ReportGenerator {
  generateBrokenLinkReport(result: LinkCheckResult, outputDir: string = 'reports'): void {
    const timestamp = new Date().toISOString();
    const report = {
      timestamp,
      summary: {
        totalLinks: result.totalLinks,
        brokenLinks: result.brokenLinks.length,
        redirects: result.redirects.length,
        validLinks: result.validLinks,
        healthScore: Math.round((result.validLinks / result.totalLinks) * 100)
      },
      brokenLinks: result.brokenLinks.map(link => ({
        ...link,
        severity: link.statusCode === 404 ? 'critical' : link.statusCode >= 500 ? 'error' : 'warning'
      }))
    };

    // Ensure reports directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write JSON report
    const jsonPath = path.join(outputDir, `broken-links-${Date.now()}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));

    // Write HTML report
    const htmlPath = path.join(outputDir, `broken-links-${Date.now()}.html`);
    fs.writeFileSync(htmlPath, this.generateBrokenLinkHTML(report));

    console.log(`\n✅ Reports generated:`);
    console.log(`   JSON: ${jsonPath}`);
    console.log(`   HTML: ${htmlPath}`);
  }

  private generateBrokenLinkHTML(report: any): string {
    const brokenByStatus = report.brokenLinks.reduce((acc: any, link: BrokenLink) => {
      const status = link.statusCode.toString();
      if (!acc[status]) acc[status] = [];
      acc[status].push(link);
      return acc;
    }, {});

    const statusSections = Object.entries(brokenByStatus)
      .map(([status, links]: [string, any]) => `
        <div class="status-group">
          <h3>Status ${status} (${links.length} links)</h3>
          <table>
            <thead>
              <tr>
                <th>Source Page</th>
                <th>Broken URL</th>
                <th>Link Text</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              ${links.map((link: BrokenLink) => `
                <tr>
                  <td><a href="${link.sourceUrl}" target="_blank">${link.sourceUrl}</a></td>
                  <td><code>${link.targetUrl}</code></td>
                  <td>${link.linkText || '(no text)'}</td>
                  <td><span class="badge ${link.linkType}">${link.linkType}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `).join('');

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Broken Links Report - ${report.timestamp}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 2rem; background: #f5f5f5; }
    .container { max-width: 1400px; margin: 0 auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    h1 { color: #333; margin-bottom: 0.5rem; }
    .timestamp { color: #666; font-size: 0.9rem; margin-bottom: 2rem; }
    .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
    .summary-card { background: #f8f9fa; padding: 1.5rem; border-radius: 6px; border-left: 4px solid #007bff; }
    .summary-card.critical { border-left-color: #dc3545; }
    .summary-card.warning { border-left-color: #ffc107; }
    .summary-card.success { border-left-color: #28a745; }
    .summary-card h3 { font-size: 0.875rem; color: #666; margin-bottom: 0.5rem; text-transform: uppercase; }
    .summary-card .value { font-size: 2rem; font-weight: bold; color: #333; }
    .status-group { margin-bottom: 2rem; }
    .status-group h3 { color: #333; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #e9ecef; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 1rem; }
    th { background: #f8f9fa; padding: 0.75rem; text-align: left; font-weight: 600; color: #495057; border-bottom: 2px solid #dee2e6; }
    td { padding: 0.75rem; border-bottom: 1px solid #e9ecef; }
    tr:hover { background: #f8f9fa; }
    code { background: #f8f9fa; padding: 0.2rem 0.4rem; border-radius: 3px; font-size: 0.875rem; color: #e83e8c; }
    .badge { display: inline-block; padding: 0.25rem 0.5rem; border-radius: 3px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; }
    .badge.internal { background: #d1ecf1; color: #0c5460; }
    .badge.external { background: #fff3cd; color: #856404; }
    a { color: #007bff; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔗 Broken Links Report</h1>
    <div class="timestamp">Generated: ${report.timestamp}</div>
    
    <div class="summary">
      <div class="summary-card">
        <h3>Total Links</h3>
        <div class="value">${report.summary.totalLinks}</div>
      </div>
      <div class="summary-card critical">
        <h3>Broken Links</h3>
        <div class="value">${report.summary.brokenLinks}</div>
      </div>
      <div class="summary-card warning">
        <h3>Redirects</h3>
        <div class="value">${report.summary.redirects}</div>
      </div>
      <div class="summary-card success">
        <h3>Valid Links</h3>
        <div class="value">${report.summary.validLinks}</div>
      </div>
      <div class="summary-card ${report.summary.healthScore >= 90 ? 'success' : report.summary.healthScore >= 70 ? 'warning' : 'critical'}">
        <h3>Health Score</h3>
        <div class="value">${report.summary.healthScore}%</div>
      </div>
    </div>

    ${statusSections}
  </div>
</body>
</html>
    `.trim();
  }

  generateTechnicalSEOReport(report: TechnicalSEOReport, outputDir: string = 'reports'): void {
    // Ensure reports directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write JSON report
    const jsonPath = path.join(outputDir, `seo-health-${Date.now()}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));

    // Write HTML report
    const htmlPath = path.join(outputDir, `seo-health-${Date.now()}.html`);
    fs.writeFileSync(htmlPath, this.generateTechnicalSEOHTML(report));

    console.log(`\n✅ Technical SEO Reports generated:`);
    console.log(`   JSON: ${jsonPath}`);
    console.log(`   HTML: ${htmlPath}`);
  }

  private generateTechnicalSEOHTML(report: TechnicalSEOReport): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Technical SEO Health Report - ${report.timestamp}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 2rem; background: #f5f5f5; }
    .container { max-width: 1400px; margin: 0 auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    h1 { color: #333; margin-bottom: 0.5rem; }
    h2 { color: #495057; margin: 2rem 0 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #e9ecef; }
    .timestamp { color: #666; font-size: 0.9rem; margin-bottom: 2rem; }
    .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
    .summary-card { background: #f8f9fa; padding: 1.5rem; border-radius: 6px; border-left: 4px solid #007bff; }
    .summary-card.critical { border-left-color: #dc3545; }
    .summary-card.warning { border-left-color: #ffc107; }
    .summary-card.success { border-left-color: #28a745; }
    .summary-card h3 { font-size: 0.875rem; color: #666; margin-bottom: 0.5rem; text-transform: uppercase; }
    .summary-card .value { font-size: 2rem; font-weight: bold; color: #333; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 2rem; }
    th { background: #f8f9fa; padding: 0.75rem; text-align: left; font-weight: 600; color: #495057; border-bottom: 2px solid #dee2e6; }
    td { padding: 0.75rem; border-bottom: 1px solid #e9ecef; font-size: 0.9rem; }
    tr:hover { background: #f8f9fa; }
    code { background: #f8f9fa; padding: 0.2rem 0.4rem; border-radius: 3px; font-size: 0.875rem; color: #e83e8c; word-break: break-all; }
    .badge { display: inline-block; padding: 0.25rem 0.5rem; border-radius: 3px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; }
    .badge.critical { background: #f8d7da; color: #721c24; }
    .badge.error { background: #fff3cd; color: #856404; }
    .badge.warning { background: #d1ecf1; color: #0c5460; }
    a { color: #007bff; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .empty-state { text-align: center; padding: 2rem; color: #6c757d; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔍 Technical SEO Health Report</h1>
    <div class="timestamp">Generated: ${report.timestamp}</div>
    
    <div class="summary">
      <div class="summary-card">
        <h3>Total URLs</h3>
        <div class="value">${report.summary.totalUrls}</div>
      </div>
      <div class="summary-card ${report.summary.brokenLinks > 0 ? 'critical' : 'success'}">
        <h3>Broken Links</h3>
        <div class="value">${report.summary.brokenLinks}</div>
      </div>
      <div class="summary-card ${report.summary.canonicalIssues > 0 ? 'warning' : 'success'}">
        <h3>Canonical Issues</h3>
        <div class="value">${report.summary.canonicalIssues}</div>
      </div>
      <div class="summary-card ${report.summary.redirectChains > 0 ? 'warning' : 'success'}">
        <h3>Redirect Chains</h3>
        <div class="value">${report.summary.redirectChains}</div>
      </div>
      <div class="summary-card ${report.summary.sitemapIssues > 0 ? 'warning' : 'success'}">
        <h3>Sitemap Issues</h3>
        <div class="value">${report.summary.sitemapIssues}</div>
      </div>
      <div class="summary-card ${report.summary.healthScore >= 90 ? 'success' : report.summary.healthScore >= 70 ? 'warning' : 'critical'}">
        <h3>Health Score</h3>
        <div class="value">${report.summary.healthScore}%</div>
      </div>
    </div>

    <h2>🔗 Broken Links</h2>
    ${report.brokenLinks.length > 0 ? `
      <table>
        <thead>
          <tr>
            <th>Source</th>
            <th>Broken URL</th>
            <th>Status</th>
            <th>Suggested Fix</th>
          </tr>
        </thead>
        <tbody>
          ${report.brokenLinks.slice(0, 50).map(link => `
            <tr>
              <td><a href="${link.sourceUrl}" target="_blank">${link.sourceUrl}</a></td>
              <td><code>${link.targetUrl}</code></td>
              <td><span class="badge critical">${link.statusCode}</span></td>
              <td>${link.suggestedFix ? `<code>${link.suggestedFix}</code>` : '-'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      ${report.brokenLinks.length > 50 ? `<p><em>Showing first 50 of ${report.brokenLinks.length} broken links</em></p>` : ''}
    ` : '<div class="empty-state">✅ No broken links found</div>'}

    <h2>🔗 Canonical Issues</h2>
    ${report.canonicalIssues.length > 0 ? `
      <table>
        <thead>
          <tr>
            <th>Page URL</th>
            <th>Canonical URL</th>
            <th>Issue Type</th>
            <th>Suggestion</th>
          </tr>
        </thead>
        <tbody>
          ${report.canonicalIssues.map(issue => `
            <tr>
              <td><a href="${issue.pageUrl}" target="_blank">${issue.pageUrl}</a></td>
              <td><code>${issue.canonicalUrl}</code></td>
              <td><span class="badge warning">${issue.issueType}</span></td>
              <td>${issue.suggestion}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    ` : '<div class="empty-state">✅ No canonical issues found</div>'}

    <h2>↪️ Redirect Chains</h2>
    ${report.redirectChains.length > 0 ? `
      <table>
        <thead>
          <tr>
            <th>Start URL</th>
            <th>Hops</th>
            <th>Final URL</th>
            <th>Suggestion</th>
          </tr>
        </thead>
        <tbody>
          ${report.redirectChains.map(chain => `
            <tr>
              <td><code>${chain.startUrl}</code></td>
              <td><span class="badge ${chain.totalHops > 1 ? 'error' : 'warning'}">${chain.totalHops}</span></td>
              <td><code>${chain.finalUrl}</code></td>
              <td>${chain.suggestion}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    ` : '<div class="empty-state">✅ No redirect chains found</div>'}

    <h2>🗺️ Sitemap Issues</h2>
    ${report.sitemapIssues.length > 0 ? `
      <table>
        <thead>
          <tr>
            <th>URL</th>
            <th>Issue</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${report.sitemapIssues.map(issue => `
            <tr>
              <td><code>${issue.url}</code></td>
              <td><span class="badge warning">${issue.issue}</span></td>
              <td>${issue.action}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    ` : '<div class="empty-state">✅ No sitemap issues found</div>'}
  </div>
</body>
</html>
    `.trim();
  }
}
