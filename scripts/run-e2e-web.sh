#!/bin/bash

# Load environment variables from .env.test
set -a
source .env.test 2>/dev/null || true
set +a

# Build and start Next.js on port 3010
next build && next start --port 3010
