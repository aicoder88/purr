#!/bin/sh
# Pre-push Git hook — i18n hardcoded string validator
# Installed by: pnpm setup-hooks
#
# Blocks pushes that introduce hardcoded UI strings that should be
# in translation files (en.ts / fr.ts). Run in strict mode so any
# new violations cause a non-zero exit and block the push.

ROOT="$(git rev-parse --show-toplevel)"

echo ""
echo "🌐  i18n check: scanning for hardcoded UI strings..."

node --import tsx "$ROOT/scripts/validation/validate-hardcoded-ui-i18n.ts" --strict

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
