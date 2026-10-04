# Root → /tr/ permanent redirect (Cloudflare)

## Problem (live before this deploy)

| URL | Code | Target |
| --- | --- | --- |
| `https://arledscreen.com/` | **200** | HTML meta refresh → `/tr/` |
| `https://www.arledscreen.com/` | 301 | `https://arledscreen.com/` |
| `http://…` | 301 | `https://arledscreen.com/` |

Cloudflare Pages serves a static `index.html` **before** `_redirects`. The meta-refresh stub produced HTTP 200 instead of a server 301.

## Fix in this repo

1. **Do not ship** `out/index.html` (`public/index.html` removed; `scripts/postbuild-lang.mjs` deletes any leftover).
2. `public/_redirects`: `/` and `/index.html` → `/tr/` **301**.
3. Hostinger fallback: `hosting/hostinger/.htaccess` apex `/` → `/tr/`; www root → `https://apex/tr/`.

## After Arledscreen bot deploy — expected headers

```bash
curl -sI https://arledscreen.com/ | head -5
# HTTP/2 301
# location: /tr/   (or https://arledscreen.com/tr/)

curl -sI https://arledscreen.com/llms.txt | head -3   # 200
curl -sI https://arledscreen.com/robots.txt | head -3 # 200
```

## Cloudflare Rule (www chain shorten) — dashboard

Bulk Redirect / Redirect Rule currently: www → `https://arledscreen.com/`.

Change target to:

`https://arledscreen.com/tr/`

so www does not hop through apex `/`. Keep apex `/` → `/tr/` via Pages `_redirects`.

## GSC

1. URL Inspection on `https://arledscreen.com/` — expect 301 to `/tr/`.
2. Request indexing for `https://arledscreen.com/tr/` and resubmit sitemap.
