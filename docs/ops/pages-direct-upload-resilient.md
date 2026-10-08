# Cloudflare Pages Direct Upload — resilient path

## Incident (2026-10-07)

`POST /pages/assets/upload` returned **500 HTML** (CF Ray IAD) during a Cloudflare **Partial System Outage**.  
`npx wrangler@4 pages deploy out … --skip-caching` failed repeatedly because it **forces every hash** to re-upload in concurrent buckets.

## What works

| Step | Endpoint / command | Notes |
| --- | --- | --- |
| 1 | `GET /accounts/{id}/pages/projects/arledscreen/upload-token` | JWT (`features: ["files"]`, ~30 min) |
| 2 | `POST /pages/assets/check-missing` + JWT body `{ hashes: [...] }` | Differential — skip already-known hashes |
| 3 | `POST /pages/assets/upload` + JWT, **one file per request** | Tiny batches succeed when bulk 500s |
| 4 | `POST /pages/assets/upsert-hashes` + JWT | Mark hashes known |
| 5 | `npx wrangler@4 pages deploy out --project-name=arledscreen --branch=main --commit-dirty=true` **without** `--skip-caching` | Uploads 0 files if prewarmed; attaches **Functions** + `_headers` + `_redirects` |

Hash algorithm (must match wrangler): `blake3(base64(fileBytes) + extWithoutDot).hex.slice(0, 32)`.

## Account inventory (this token)

| Resource | Status |
| --- | --- |
| Pages project `arledscreen` | Yes — `arledscreen.com` + `arledscreen.pages.dev` |
| Workers scripts | **0** |
| R2 / KV / Workers subdomain APIs | **Auth error** on this token (no R2/Workers write scope) |
| Repo `wrangler.toml` | **None** |
| Alternate Hostinger path | `hosting/hostinger/.htaccess` (301 only) |

**Do not** stand up Workers+R2 invent mirrors unless a broader-scoped token is issued. Differential Pages upload is enough.

## Ship command

```bash
export CLOUDFLARE_API_TOKEN=…   # Pages edit
export CLOUDFLARE_ACCOUNT_ID=4a0f179229f3c6a21d076df944b850e8
npm run build
node scripts/pages-deploy-resilient.mjs out
```

Workflow: `.github/workflows/deploy-cloudflare-pages.yml` → same script (no `--skip-caching`).

## Anti-patterns

- `--skip-caching` during upload outages (full re-upload → 500 storm)
- Creating a deployment FormData **without** the Functions worker bundle (drops apex Function; `_redirects` still 301s but relative Location)
- Assuming R2 exists — this account/token has neither Workers nor usable R2
