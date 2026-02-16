#!/usr/bin/env python3
"""
Fix Google Analytics MCP server scopes to include analyticsadmin.googleapis.com access.

The issue is that the analytics-mcp package only requests the analytics.readonly scope,
but the Google Analytics Admin API requires the analyticsadmin scope.

Usage:
    python fix_ga_mcp_scopes.py
"""

import os
import sys


def fix_analytics_mcp_package():
    """Fix the scopes in the analytics_mcp package."""
    from pathlib import Path
    
    home = Path.home()
    pipx_base = home / ".local/pipx/venvs/analytics-mcp/lib"
    
    # Find the utils.py file
    utils_path = None
    if pipx_base.exists():
        for python_dir in pipx_base.iterdir():
            if python_dir.is_dir() and "python" in python_dir.name:
                potential_path = python_dir / "site-packages/analytics_mcp/tools/utils.py"
                if potential_path.exists():
                    utils_path = potential_path
                    break
    
    if not utils_path:
        print("✗ Could not find analytics_mcp/tools/utils.py")
        print("  Make sure analytics-mcp is installed via: pipx install analytics-mcp")
        return False
    
    print(f"Found utils.py at: {utils_path}")
    
    with open(utils_path, 'r') as f:
        content = f.read()
    
    # Check if already fixed
    if "analytics.admin.readonly" in content:
        print("✓ utils.py already contains analyticsadmin scope")
        return True
    
    # Fix 1: Add analyticsadmin scope to the _READ_ONLY_ANALYTICS_SCOPE
    old_scope_line = '_READ_ONLY_ANALYTICS_SCOPE = (\n    "https://www.googleapis.com/auth/analytics.readonly"\n)'
    new_scope_line = '''_READ_ONLY_ANALYTICS_SCOPE = (
    "https://www.googleapis.com/auth/analytics.readonly",
    "https://www.googleapis.com/auth/analytics.admin.readonly",
)'''
    
    if old_scope_line in content:
        content = content.replace(old_scope_line, new_scope_line)
        print("✓ Added analyticsadmin scope to _READ_ONLY_ANALYTICS_SCOPE")
    else:
        print("✗ Could not find the expected scope definition pattern")
        return False
    
    # Fix 2: Change scopes parameter to properly convert tuple to list
    old_scopes_param = "scopes=[_READ_ONLY_ANALYTICS_SCOPE]"
    new_scopes_param = "scopes=list(_READ_ONLY_ANALYTICS_SCOPE)"
    
    if old_scopes_param in content:
        content = content.replace(old_scopes_param, new_scopes_param)
        print("✓ Fixed scopes parameter to properly handle tuple")
    
    with open(utils_path, 'w') as f:
        f.write(content)
    
    return True


def add_mcp_to_kimi():
    """Add the GA MCP server to Kimi CLI configuration."""
    from pathlib import Path
    import subprocess
    
    home = Path.home()
    mcp_path = home / ".local/pipx/venvs/analytics-mcp/bin/google-analytics-mcp"
    
    if not mcp_path.exists():
        print(f"✗ MCP binary not found at {mcp_path}")
        return False
    
    try:
        result = subprocess.run(
            ["kimi", "mcp", "add", "--transport", "stdio", "google-analytics", str(mcp_path)],
            capture_output=True,
            text=True,
            check=False
        )
        if "Added" in result.stdout or "already exists" in result.stderr.lower():
            print("✓ Added google-analytics MCP to Kimi CLI")
            return True
        else:
            print(f"MCP add output: {result.stdout}{result.stderr}")
            return True  # Might already exist
    except FileNotFoundError:
        print("✗ 'kimi' command not found. Make sure Kimi CLI is installed.")
        return False


def print_next_steps():
    """Print the remaining manual steps."""
    print("""
╔══════════════════════════════════════════════════════════════════╗
║                    REMAINING STEPS                               ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  1. Re-authenticate with Google Cloud (to get the new scope):    ║
║                                                                  ║
║     gcloud auth application-default revoke                       ║
║                                                                  ║
║     gcloud auth application-default login \\\                      ║
║       --scopes=openid,https://www.googleapis.com/auth/\\         ║
║       userinfo.email,https://www.googleapis.com/auth/\\          ║
║       cloud-platform,https://www.googleapis.com/auth/\\          ║
║       analytics.readonly,https://www.googleapis.com/auth/\\      ║
║       analytics.admin.readonly                                   ║
║                                                                  ║
║  2. Restart Claude Code / Kimi CLI                               ║
║                                                                  ║
║  3. Test the connection:                                         ║
║                                                                  ║
║     kimi mcp test google-analytics                               ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝

The key scope that was missing:
  https://www.googleapis.com/auth/analytics.admin.readonly

This scope is required for accessing the Google Analytics Admin API.
""")


def main():
    print("="*60)
    print("Fixing Google Analytics MCP Scopes")
    print("="*60)
    print()
    
    # Fix the package
    print("Step 1: Patching analytics_mcp package...")
    if not fix_analytics_mcp_package():
        print("\n✗ Failed to patch package")
        return 1
    
    print()
    print("Step 2: Adding MCP to Kimi CLI...")
    add_mcp_to_kimi()
    
    print()
    print_next_steps()
    
    return 0


if __name__ == "__main__":
    sys.exit(main())
