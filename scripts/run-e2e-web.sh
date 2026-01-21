#!/bin/bash

# Load environment variables from .env.test
set -a
source .env.test 2>/dev/null || true
set +a

# Build and start Next.js on port 3010
# Use standalone server since next.config.js has output: 'standalone'
next build

# Copy public and static assets to standalone build
# Next.js standalone builds require manual copying of public directory
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/

# Start the standalone server
PORT=3010 node .next/standalone/server.js
