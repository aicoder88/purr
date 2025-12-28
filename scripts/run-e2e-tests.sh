#!/bin/bash

# Load environment variables from .env.test
set -a
source .env.test 2>/dev/null || true
set +a

# Run Playwright tests
playwright test
