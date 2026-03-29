#!/bin/bash
# SafeHaven — Google Sheets Webhook Setup
# Run this once to set up the Google Sheets data collection
#
# Prerequisites: Node.js, npm
# This will open your browser for Google auth

set -e

echo "=== SafeHaven Google Sheets Webhook Setup ==="

# 1. Install clasp
echo "Installing clasp..."
npm install -g @google/clasp

# 2. Login (opens browser)
echo "Logging in to Google (browser will open)..."
clasp login

# 3. Create Apps Script project linked to a Sheet
echo "Creating Apps Script project..."
cd scripts/apps-script
clasp create --type sheets --title "SafeHaven Data Collection"

# 4. Push code
echo "Pushing Apps Script code..."
clasp push

# 5. Deploy as web app
echo "Deploying as web app..."
DEPLOY_OUTPUT=$(clasp deploy --description "SafeHaven webhook v1")
echo "$DEPLOY_OUTPUT"

# Extract deployment URL
DEPLOY_ID=$(echo "$DEPLOY_OUTPUT" | grep -oP 'AKfycb[a-zA-Z0-9_-]+')
WEBHOOK_URL="https://script.google.com/macros/s/${DEPLOY_ID}/exec"

echo ""
echo "=== Setup Complete ==="
echo "Webhook URL: $WEBHOOK_URL"
echo ""
echo "Add to your .env.local:"
echo "NEXT_PUBLIC_SHEETS_WEBHOOK_URL=$WEBHOOK_URL"
echo ""
echo "Or set in Vercel:"
echo "vercel env add NEXT_PUBLIC_SHEETS_WEBHOOK_URL"
