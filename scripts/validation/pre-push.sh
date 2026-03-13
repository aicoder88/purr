#!/bin/sh
# Pre-push Git hook — i18n hardcoded string validator
# Installed by: pnpm setup-hooks
#
# Blocks pushes that introduce hardcoded UI strings that should be
# in translation files (en.ts / fr.ts). Run in strict mode so any
# new violations cause a non-zero exit and block the push.

ROOT="$(git rev-parse --show-toplevel)"

find_node() {
  if command -v node >/dev/null 2>&1; then
    command -v node
    return 0
  fi

  if [ -s "$HOME/.nvm/nvm.sh" ]; then
    # Load nvm for non-interactive Git hook shells.
    . "$HOME/.nvm/nvm.sh" >/dev/null 2>&1
    if command -v node >/dev/null 2>&1; then
      command -v node
      return 0
    fi
  fi

  for candidate in \
    "$HOME/.nvm/versions/node"/*/bin/node \
    "$HOME/.volta/bin/node" \
    "/opt/homebrew/opt/node@22/bin/node" \
    "/opt/homebrew/bin/node" \
    "/usr/local/bin/node"
  do
    if [ -x "$candidate" ]; then
      echo "$candidate"
      return 0
    fi
  done

  return 1
}

echo ""
echo "🌐  i18n check: scanning for hardcoded UI strings..."

NODE_BIN="$(find_node)"

if [ -z "$NODE_BIN" ]; then
  echo ""
  echo "❌  Node.js 22 was not found in the Git hook environment. Push blocked."
  echo ""
  echo "   How to fix:"
  echo "   1. Install/enable Node 22 for this shell (for example: 'nvm use 22')."
  echo "   2. Reinstall hooks with 'pnpm setup-hooks' if your environment changed."
  echo "   3. Retry the push."
  echo ""
  exit 1
fi

cd "$ROOT" || exit 1
"$NODE_BIN" --import tsx "$ROOT/scripts/validation/validate-hardcoded-ui-i18n.ts" --strict

STATUS=$?

if [ $STATUS -ne 0 ]; then
  echo ""
  echo "❌  i18n validation FAILED. Push blocked."
  echo ""
  echo "   How to fix:"
  echo "   1. Move the hardcoded strings shown above into src/translations/en.ts"
  echo "      and src/translations/fr.ts under the appropriate namespace."
  echo "   2. Reference the key via useTranslations() in the component."
  echo "   3. Run 'pnpm validate-i18n:hardcoded' locally to verify all clear."
  echo "   4. Commit your translation changes, then push again."
  echo ""
  exit 1
fi

echo "✅  i18n check passed."
echo ""
