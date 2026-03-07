import { buildFreshnessPlan, type FreshnessPlanInputs } from '@/lib/freshness-plan';

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function renderFreshnessPlanSection(
  inputs: FreshnessPlanInputs,
  options?: {
    maxActions?: number;
    backgroundColor?: string;
  }
): string {
  const plan = buildFreshnessPlan(inputs);
  if (!plan) {
    return '';
  }

  const maxActions = options?.maxActions ?? 4;
  const backgroundColor = options?.backgroundColor ?? '#f8fafc';

  const actionRows = plan.actions
    .slice(0, maxActions)
    .map(
      (action) => `
        <tr>
          <td style="padding:0;">
            <div style="padding:16px;border-radius:14px;background:#ffffff;border:1px solid #e5e7eb;">
              <p style="margin:0;font-size:14px;font-weight:700;color:#111827;">${escapeHtml(action.title)}</p>
              <p style="margin:8px 0 0;font-size:14px;line-height:1.6;color:#4b5563;">${escapeHtml(action.description)}</p>
            </div>
          </td>
        </tr>
      `
    )
    .join('');

  return `
    <div style="margin-top:20px;padding:22px;background:${backgroundColor};border:1px solid #e5e7eb;border-radius:18px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;">${escapeHtml(plan.title)}</p>
      <p style="margin:0;font-size:20px;font-weight:800;color:#111827;">${escapeHtml(plan.summary)}</p>
      <p style="margin:12px 0 0;font-size:14px;line-height:1.6;color:#4b5563;">${escapeHtml(plan.starterNote)}</p>
      <table role="presentation" style="width:100%;border-collapse:separate;border-spacing:0 12px;margin-top:18px;">
        ${actionRows}
      </table>
    </div>
  `;
}
