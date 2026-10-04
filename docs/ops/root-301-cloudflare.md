# Root → /tr/ permanent redirect (Cloudflare)

## Live status (verified 2026-10-04)

| URL | Code | Location |
| --- | --- | --- |
| `https://arledscreen.com/` | **301** | `/tr/` |
| `https://www.arledscreen.com/` | **301** | `https://arledscreen.com/tr/` |
| `https://arledscreen.com/llms.txt` | **200** | — |
| `https://arledscreen.com/robots.txt` | **200** | — |
| `https://arledscreen.com/sitemap.xml` | **200** | — |

Apex body is server redirect text (`Redirecting to /tr/`), not the old meta-refresh HTML stub.

## Repo fix

1. Do not ship `out/index.html` (`public/index.html` removed; `scripts/postbuild-lang.mjs` deletes leftovers).
2. `public/_redirects`: `/` and `/index.html` → `/tr/` **301**.
3. Hostinger fallback: `hosting/hostinger/.htaccess` apex `/` → `/tr/`; www root → `https://apex/tr/`.

## Cloudflare Single Redirect (zone `arledscreen.com`)

Ruleset phase `http_request_dynamic_redirect`:

1. **WWW root to /tr/** — host `www.arledscreen.com` and path `/` → `https://arledscreen.com/tr/` (301).
2. **WWW to HTTPS apex** — other www paths → `concat("https://arledscreen.com", path)` (301).

## Deploy

```bash
npm run build
# confirm: test ! -f out/index.html
npx wrangler pages deploy out --project-name=arledscreen
```

## GSC (owner account — do after deploy)

1. [Google Search Console](https://search.google.com/search-console) → property `arledscreen.com` (or `https://arledscreen.com/`).
2. **URL Inspection** → `https://arledscreen.com/` → confirm Google sees **301** to `/tr/`.
3. Inspect `https://arledscreen.com/tr/` → **Request indexing**.
4. **Sitemaps** → submit / resubmit `https://arledscreen.com/sitemap.xml`.
5. Optional: inspect a few legacy URLs (`/iletisim`, old `/urunler/...`) and confirm they 301 to current `/tr/...` routes.

## Token hygiene

Revoke chat-shared Cloudflare API tokens under  
https://dash.cloudflare.com/profile/api-tokens  
Keep only what you still need (or none — redirects already live).
