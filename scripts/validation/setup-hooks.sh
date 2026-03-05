#!/bin/sh
# Installs all project Git hooks.
# Run via: pnpm setup-hooks
#
# This is idempotent — safe to re-run after a fresh clone or
# whenever hooks are updated.

ROOT="$(git rev-parse --show-toplevel)"
HOOKS_DIR="$ROOT/.git/hooks"

echo "🔧  Installing Git hooks..."

# ────────────────────────────────────────────────
# pre-commit — image optimizer & compliance audit
# ────────────────────────────────────────────────
cat > "$HOOKS_DIR/pre-commit" << 'EOF'
#!/bin/sh
# Git pre-commit hook — managed by scripts/validation/setup-hooks.sh
sh "$(git rev-parse --show-toplevel)/scripts/images/pre-commit-image-hook.sh"
EOF
chmod +x "$HOOKS_DIR/pre-commit"
echo "   ✓  pre-commit  → scripts/images/pre-commit-image-hook.sh"

# ────────────────────────────────────────────────
# pre-push — i18n hardcoded string validator
# ────────────────────────────────────────────────
cat > "$HOOKS_DIR/pre-push" << 'EOF'
#!/bin/sh
# Git pre-push hook — managed by scripts/validation/setup-hooks.sh
sh "$(git rev-parse --show-toplevel)/scripts/validation/pre-push.sh"
EOF
chmod +x "$HOOKS_DIR/pre-push"
echo "   ✓  pre-push    → scripts/validation/pre-push.sh"

echo ""
echo "✅  All Git hooks installed."
