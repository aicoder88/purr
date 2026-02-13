# PR Outreach Automation

This pipeline turns the PR machine domain list into a repeatable outreach system.

## Commands

```bash
# 0) One-command run (machine + enrichment + queue)
pnpm pr:outreach:run

# 1) Build/refresh publication list (all PR tabs)
pnpm pr:machine

# 2) Crawl publication websites for contact info
pnpm pr:outreach:enrich

# Optional: process only first N rows while testing
pnpm pr:outreach:enrich --limit 200 --concurrency 6

# 3) Build today's outreach queues
pnpm pr:outreach:queue --limit 100

# 4) After you actually send today's emails, advance cadence state
pnpm pr:outreach:mark-sent
```

## Outputs

All files are in `reports/pr-machine/`.

- `contact-enrichment.csv`: One row per domain with discovered contact details.
- `contact-enrichment.json`: Same as above, JSON format.
- `pr-outreach-crm.csv`: CSV compatible with `purrify-cold-email` merge tooling.
- `outreach-send-queue.csv`: Domains ready to email now (email discovered).
- `outreach-manual-research-queue.csv`: Domains that need manual contact-page research.
- `outreach-state.json`: Follow-up state and cadence progress per domain.
- `outreach-dashboard.html`: Queue dashboard.

## Cadence Behavior

- Stage 1: initial outreach
- Stage 2+: follow-ups based on configured sequence days
- Default sequence days: `0,3,7,14,21`
- `--mark-sent` moves queued records forward in state and sets next follow-up date.

## Integration with Email Merge

Use `reports/pr-machine/pr-outreach-crm.csv` with:

`purrify-cold-email/scripts/email-merge.py`

and your chosen template under:

`purrify-cold-email/emails/`

Example:

```bash
cd purrify-cold-email/scripts
python email-merge.py \
  --csv ../../reports/pr-machine/pr-outreach-crm.csv \
  --template ../emails/pr-initial-outreach.txt \
  --output ../../reports/pr-machine/email-drafts \
  --status "Prospect"
```

Included PR templates:

- `purrify-cold-email/emails/pr-initial-outreach.txt`
- `purrify-cold-email/emails/pr-followup-1.txt`

## Notes

- Contact extraction uses public website pages only.
- Some domains block bots or hide contact details; those appear in manual research queue.
- Always review queue rows before sending.
