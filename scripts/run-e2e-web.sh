#!/bin/bash

# Load environment variables from .env.test
set -a
source .env.test 2>/dev/null || true
set +a

# Build and start Next.js on port 3010
# Use standalone server since next.config.js has output: 'standalone'
next build && PORT=3010 node .next/standalone/server.js
