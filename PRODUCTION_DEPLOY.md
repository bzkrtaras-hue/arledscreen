# Production Deployment Guide: AI Discovery Feeds

## Overview

This document outlines the production deployment process for the AI discovery feed infrastructure. These feeds enable AI agents, search engines, and semantic tools to understand and interact with ARLEDSCREEN's product catalog and pricing.

**Key Principle:** Homepage and user-facing UI remain unchanged. Only machine-readable data layer is added.

---

## What Gets Deployed

### Machine-Readable Feeds (Generated at Build Time)
- `public/catalog.json` — Complete product catalog with prices (schema.org Collection)
- `public/ai-shopping.json` — Agent index with guidelines and resource links

### Configuration & Discovery
- `public/robots.txt` — Crawl rules (allows AI feed discovery)
- `public/_headers` — HTTP headers (Content-Type, Cache-Control, CSP)
- `public/.well-known/ard.json` — Agentic Resource Discovery endpoint

### Build Process
- `scripts/postbuild-ai.mjs` — Generates feeds from canonical price list
- `package.json` — Build script integration (`npm run build` triggers feed generation)

---

## Pre-Deployment Checklist

### 1. Code Review
- [ ] All changes are in `/scripts`, `/public` (config), and `.github/workflows`
- [ ] Homepage (`src/app/[locale]/page.tsx`) is NOT modified
- [ ] No React component changes that affect user interface
- [ ] No changes to layout, styling, or visible content

### 2. Build Validation
```bash
npm ci
npm run build
```

- [ ] Build completes without errors
- [ ] `public/catalog.json` is generated (12 products)
- [ ] `public/ai-shopping.json` is generated
- [ ] JSON files have valid schema.org structure

### 3. Content Verification
```bash
# Verify products
node -e "const c = JSON.parse(require('fs').readFileSync('public/catalog.json')); console.log(c.mainEntity.itemListElement.length + ' products')"

# Verify prices
node -e "const c = JSON.parse(require('fs').readFileSync('public/catalog.json')); const prices = c.mainEntity.itemListElement.map(p => p.offers.price); console.log('Price range: $' + Math.min(...prices) + ' - $' + Math.max(...prices))"
```

- [ ] 12 products in catalog
- [ ] All prices are > 0 and ≤ 2026-12-31
- [ ] No missing or invalid URLs
- [ ] Brand correctly set to NXTIONSTAR

### 4. Safety Gates
- [ ] Homepage loads and displays correctly (run `npm run dev`, visit http://localhost:3000/tr/)
- [ ] No visual regressions or broken links
- [ ] Chat widget still works on TR/EN homepages
- [ ] Mobile viewport responsive and correct

### 5. AI Feed Quality
```bash
# Check agent guidelines
node -e "const ai = JSON.parse(require('fs').readFileSync('public/ai-shopping.json')); console.log(JSON.stringify(ai.agentGuidelines, null, 2))"

# Check robots policy
cat public/robots.txt | grep -E "Allow|Disallow"
```

- [ ] Agent guidelines are complete and accurate
- [ ] Price source clearly points to catalog.json
- [ ] Quote-only groups are properly listed
- [ ] robots.txt allows AI feed discovery

### 6. Compliance & Integrity
- [ ] `priceValidUntil` is set to 2026-12-31
- [ ] All prices are in USD with tax/shipping excluded
- [ ] Firm identity (ARLEDSCREEN vs NXTIONSTAR) is correct
- [ ] No invented claims (warranty, certifications, staffing)

---

## Deployment Steps

### Step 1: Prepare Production Environment
```bash
# On production server:
cd /var/www/arledscreen

# Backup current public folder
cp -r public public.backup.$(date +%s)

# Pull latest from main
git pull origin main

# Install dependencies
npm ci --only=production
```

### Step 2: Build
```bash
npm run build

# Verify output
ls -lh public/catalog.json public/ai-shopping.json
```

### Step 3: Copy to Web Root
```bash
# If using separate build/deploy servers:
rsync -avz dist/out/* user@production:/var/www/arledscreen/public/

# Or if building on production:
# Files are already in place
```

### Step 4: Verify HTTP Headers
```bash
# For Netlify/Vercel: Ensure _headers file is deployed
ls -la public/_headers

# For traditional servers: Configure nginx/Apache accordingly
# Example nginx:
# location / {
#   add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
#   add_header Content-Security-Policy "default-src 'self'...";
# }
```

### Step 5: Verify Robots & Crawl Rules
```bash
# Check robots.txt is served
curl -I https://arledscreen.com/robots.txt

# Verify feed endpoints
curl -I https://arledscreen.com/catalog.json
curl -I https://arledscreen.com/ai-shopping.json
```

### Step 6: Cache Invalidation
```bash
# If using CDN, purge cache:
# Cloudflare example:
# curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache" \
#   -H "Authorization: Bearer {token}" \
#   -H "Content-Type: application/json" \
#   --data '{"files":["https://arledscreen.com/catalog.json","https://arledscreen.com/ai-shopping.json"]}'
```

---

## Post-Deployment Verification

### Immediate Checks (1-5 minutes after deploy)

```bash
# 1. Check HTTP Status & Content-Type
curl -I https://arledscreen.com/catalog.json
# Expected: 200 OK, Content-Type: application/ld+json

# 2. Validate JSON response
curl https://arledscreen.com/catalog.json | jq '.@type'
# Expected: "Collection"

# 3. Check product count
curl https://arledscreen.com/catalog.json | jq '.mainEntity.itemListElement | length'
# Expected: 12

# 4. Verify robots.txt rules
curl https://arledscreen.com/robots.txt | grep "Allow.*catalog"
# Expected: Allow: /catalog.json

# 5. Homepage smoke test
curl -L https://arledscreen.com/tr/ | grep -q "LED ekran" && echo "✅ Homepage OK"
```

### Extended Checks (10-30 minutes after deploy)

- [ ] Search console (Google): Verify no indexing errors
- [ ] Schema.org validator: Paste catalog.json and ai-shopping.json
  - https://validator.schema.org/
- [ ] Test with AI tools: Ask Claude/GPT about ARLEDSCREEN prices
  - Verify it pulls from catalog.json, not invented prices
- [ ] Monitor server logs for 404s on new feeds
- [ ] Check CDN/cache logs for proper cache headers

### Long-Term Monitoring (24 hours+)

- [ ] Monitor analytics for homepage engagement (should be unchanged)
- [ ] Track AI feed access logs (catalog.json, ai-shopping.json request counts)
- [ ] Set alerts for feed file 404s or Content-Type errors
- [ ] Verify pricing accuracy reported by AI agents

---

## Rollback Plan

If issues arise, rollback is simple and safe:

```bash
# Option 1: Restore from backup
rm -rf public
mv public.backup.{timestamp} public

# Option 2: Revert Git commit (if only feeds were changed)
git revert {commit-sha}
npm run build
# Deploy again
```

**No homepage changes to revert—only config files.**

---

## Monitoring & Maintenance

### Weekly
- [ ] Check for feed access in server logs
- [ ] Verify cache headers are being served
- [ ] Test one feed endpoint manually

### Monthly
- [ ] Review AI agent usage patterns
- [ ] Check schema.org validator for any deprecations
- [ ] Update `dateModified` in catalog (happens automatically each build)

### When Prices Change
- [ ] Update `scripts/postbuild-ai.mjs` PANEL_PRICES array
- [ ] Update `priceValidUntil` date if needed
- [ ] Run `npm run build` locally to verify
- [ ] Deploy new build to production

---

## Emergency Contacts

- **Production Issues:** Check deployment logs in `.github/workflows/deploy-ai-feeds.yml`
- **Schema.org Questions:** https://schema.org/Collection, https://schema.org/Product
- **AI Agent Feedback:** Monitor responses from Claude, GPT, Gemini, etc.

---

## FAQ

**Q: Will this affect my homepage visitors?**
A: No. All changes are in machine-readable files (`*.json`, `robots.txt`, headers). Users see the same page.

**Q: What if prices change?**
A: Update `PANEL_PRICES` in `scripts/postbuild-ai.mjs`, then `npm run build` and deploy.

**Q: Can AI agents break my website?**
A: No. They only read the feed files. They cannot modify anything.

**Q: How do I know if deployment worked?**
A: Check the verification steps above. If catalog.json returns 200 with valid JSON, you're good.

**Q: What about SEO impact?**
A: Positive. Better structured data helps search engines understand your products and prices more accurately.

---

## Deployment Checklist (Final)

Before clicking "Deploy to Production":

- [ ] All code review checks passed
- [ ] Build validation successful
- [ ] Content verification complete
- [ ] Safety gates confirmed (homepage unchanged)
- [ ] AI feed quality verified
- [ ] Compliance & integrity checked
- [ ] No homepage changes detected
- [ ] Rollback plan documented
- [ ] Monitoring set up
- [ ] Team notified of deployment

**Status:** Ready for production deployment ✅
