#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${VERCEL_TOKEN:-}" ]]; then
  echo "::error::VERCEL_TOKEN secret is required"
  exit 1
fi

SHA="${GITHUB_SHA:-}"
PROJECT_NAME="${VERCEL_PROJECT_NAME:-purr}"
BASE_URL="https://api.vercel.com"
TEAM_QS=""
if [[ -n "${VERCEL_TEAM_ID:-}" ]]; then
  TEAM_QS="&teamId=${VERCEL_TEAM_ID}"
fi

echo "Monitoring Vercel deployment for project='${PROJECT_NAME}' commit='${SHA}'"
echo "Using Vercel API: ${BASE_URL}"

deadline=$(( $(date +%s) + 1800 )) # 30 minutes
DEPLOY_ID=""
DEPLOY_URL=""

poll() {
  local resp
  set +e
  resp=$(curl -fsSL -H "Authorization: Bearer ${VERCEL_TOKEN}" "${BASE_URL}/v6/deployments?app=${PROJECT_NAME}&limit=20${TEAM_QS}")
  local code=$?
  set -e
  if [[ $code -ne 0 || -z "$resp" ]]; then
    echo "Vercel API request failed or empty; retrying..."
    return 1
  fi
  echo "$resp" > deployments.json
  DEPLOY_ID=$(jq -r --arg sha "$SHA" '.deployments[] | select(.meta.githubCommitSha==$sha) | .uid' deployments.json | head -n 1)
  if [[ -n "$DEPLOY_ID" && "$DEPLOY_ID" != "null" ]]; then
    DEPLOY_URL=$(jq -r --arg id "$DEPLOY_ID" '.deployments[] | select(.uid==$id) | .url' deployments.json)
    local state
    state=$(jq -r --arg id "$DEPLOY_ID" '.deployments[] | select(.uid==$id) | .state' deployments.json)
    echo "Found deployment id=$DEPLOY_ID url=https://${DEPLOY_URL} state=${state}"
    if [[ "$state" =~ ^(READY|ready)$ ]]; then
      echo "Deployment is ready: https://${DEPLOY_URL}"
      echo "Deployment URL: https://${DEPLOY_URL}" >> "$GITHUB_STEP_SUMMARY"
      return 0
    fi
    if [[ "$state" =~ ^(ERROR|error|CANCELED|canceled)$ ]]; then
      echo "::error::Deployment failed (state=${state}) id=${DEPLOY_ID}"
      echo "Deployment failed (state=${state}) id=${DEPLOY_ID}" >> "$GITHUB_STEP_SUMMARY"
      echo "Fetching build events..."
      set +e
      curl -fsSL -H "Authorization: Bearer ${VERCEL_TOKEN}" "${BASE_URL}/v2/deployments/${DEPLOY_ID}/events?limit=1000${TEAM_QS}" > events.json
      set -e
      if [[ -s events.json ]]; then
        echo '--- Build events (tail) ---'
        jq -r '.events[]? | (.created | tostring) + " " + (.payload?.text // .type // "")' events.json | tail -n 200
        echo '---------------------------'
      else
        echo "No events available or failed to fetch."
      fi
      return 2
    fi
  else
    echo "No deployment yet for this commit; will retry."
  fi
  return 1
}

while [[ $(date +%s) -lt $deadline ]]; do
  if poll; then
    exit 0
  elif [[ $? -eq 2 ]]; then
    exit 1
  fi
  sleep 10
done

echo "::error::Timed out waiting for Vercel deployment for commit ${SHA}"
echo "Timed out waiting for deployment of ${SHA}" >> "$GITHUB_STEP_SUMMARY"
exit 1

