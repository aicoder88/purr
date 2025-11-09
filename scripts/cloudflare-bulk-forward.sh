#!/usr/bin/env bash
# Bulk-creates/updates Cloudflare page rules so parked domains forward to Purrify.
set -euo pipefail

: "${CF_EMAIL:?CF_EMAIL must be set (Cloudflare login email)}"
: "${CF_KEY:?CF_KEY must be set (Cloudflare Global API key)}"

API_BASE="https://api.cloudflare.com/client/v4"
DOMAINS=(
  allnaturalcatlitter.com
  backtobasicscatlitter.com
  catlittersmell.com
  crystaldeodorantprotection.com
  ecocatlitters.com
  finepinecatlitter.com
  healthycatlitter.com
  premiumcatlitter.com
  reviewcatlitter.com
  thenaturalcatlitter.com
)
DESTINATION_BASE=${CF_REDIRECT_TARGET:-https://purrify.ca}
DESTINATION_BASE=${DESTINATION_BASE%/}
TARGET_URL="${DESTINATION_BASE}/\$1"

api() {
  local method=$1
  local path=$2
  shift 2
  curl -sS -X "$method" "${API_BASE}${path}" \
    -H "X-Auth-Email: ${CF_EMAIL}" \
    -H "X-Auth-Key: ${CF_KEY}" \
    -H "Content-Type: application/json" "$@"
}

for domain in "${DOMAINS[@]}"; do
  echo "▶ Setting redirect for ${domain}" >&2
  zone_id=$(api GET "/zones?name=${domain}" | jq -r '.result[0].id // empty')
  if [[ -z "$zone_id" ]]; then
    echo "  ⚠️  Zone not found" >&2
    continue
  fi

  pattern="*${domain}/*"
  rule_info=$(api GET "/zones/${zone_id}/pagerules" | \
    jq -r --arg pattern "$pattern" \
      '.result[] | select(.targets[0].constraint.value == $pattern) | [.id, .actions[0].value.url] | @tsv' | head -n1)

  if [[ -n "$rule_info" ]]; then
    read -r rule_id current_url <<<"$rule_info"
    if [[ "$current_url" == "$TARGET_URL" ]]; then
      echo "  ✔️  Already forwarding to ${current_url}" >&2
      continue
    fi
    echo "  ↻ Updating existing page rule (${rule_id})" >&2
    payload=$(jq -n --arg pattern "$pattern" --arg url "$TARGET_URL" '{
      targets: [{target: "url", constraint: {operator: "matches", value: $pattern}}],
      actions: [{id: "forwarding_url", value: {url: $url, status_code: 301}}],
      priority: 1,
      status: "active"
    }')
    api PATCH "/zones/${zone_id}/pagerules/${rule_id}" --data "${payload}" >/dev/null
    echo "  ✅ Updated" >&2
  else
    echo "  ➕ Creating new page rule" >&2
    payload=$(jq -n --arg pattern "$pattern" --arg url "$TARGET_URL" '{
      targets: [{target: "url", constraint: {operator: "matches", value: $pattern}}],
      actions: [{id: "forwarding_url", value: {url: $url, status_code: 301}}],
      priority: 1,
      status: "active"
    }')
    api POST "/zones/${zone_id}/pagerules" --data "${payload}" >/dev/null
    echo "  ✅ Created" >&2
  fi

done
