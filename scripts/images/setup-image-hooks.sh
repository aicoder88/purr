#!/bin/sh
# Installs the image compliance pre-commit hook.
# Run once after cloning: pnpm setup-image-hooks

HOOK_SRC="scripts/images/pre-commit-image-hook.sh"
HOOK_DEST=".git/hooks/pre-commit"

if [ ! -d ".git" ]; then
  echo "❌ Not a git repository. Run this from the project root."
  exit 1
fi

# If a pre-commit hook already exists, append rather than overwrite
if [ -f "$HOOK_DEST" ]; then
  # Check if our hook is already wired in
  if grep -q "pre-commit-image-hook" "$HOOK_DEST" 2>/dev/null; then
    echo "✅ Image compliance hook already installed at $HOOK_DEST"
    exit 0
  fi

  echo "⚠️  Existing pre-commit hook found. Appending image hook call..."
  echo "" >> "$HOOK_DEST"
  echo "# Image compliance (added by setup-image-hooks)" >> "$HOOK_DEST"
  echo "sh \"\$(git rev-parse --show-toplevel)/$HOOK_SRC\"" >> "$HOOK_DEST"
else
  cat > "$HOOK_DEST" << 'EOF'
#!/bin/sh
# Git pre-commit hook — managed by scripts/images/setup-image-hooks.sh
sh "$(git rev-parse --show-toplevel)/scripts/images/pre-commit-image-hook.sh"
EOF
fi

chmod +x "$HOOK_DEST"
echo "✅ Image compliance hook installed at $HOOK_DEST"
echo "   New source images dropped into public/images/ or public/original-images/"
echo "   will automatically be optimized and audited before each commit."
