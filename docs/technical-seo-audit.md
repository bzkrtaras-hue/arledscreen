# Technical SEO audit — redirects, canonical, hreflang, sitemap

Live checks against `arledscreen.com` (2026-10-05). Google Search Console
indexing counts are **owner-only** and are not available from this environment.

## A. Redirect / language architecture — PASS

| Check | Result |
|---|---|
| `/` canonical | After 301 → page canonical = `https://arledscreen.com/tr/` |
| `/tr/` canonical | `https://arledscreen.com/tr/` |
| `/en/` exists | Yes, 200; canonical self; hreflang tr↔en + x-default→`/tr/` |
| hreflang (home) | `en`→`/en/`, `tr`→`/tr/`, `x-default`→`/tr/` |
| TR-only pages (led-ekran, bölgeler) | Self-canonical; **no** false en hreflang |
| http → https | 301 (Cloudflare) |
| www → non-www apex | 301 → `https://arledscreen.com/…` |
| Trailing slash | Missing slash → **308** → slash URL; sitemap locs all end with `/` |
| Apex function | `functions/index.js` 301 `/` → `https://arledscreen.com/tr/` |
| Legacy samples | `/led-ekran-fiyatlari`→`/tr/led-ekran-fiyatlari/`; `/ic-mekan-led-ekran`→products; `/blog`→rehber; eski fiyat rehber → yeni fiyat |
| Duplicate risk | Slash variants consolidate via 308; fiyat rehber 301 to commercial |

### Thin locales
- `/ar/` and `/ru/` return 200 but layout sets **`noindex, follow`** (thin mirrors).
- They are **omitted from sitemap** (correct).

## B. robots.txt + sitemap.xml — FILE HEALTH PASS

| Asset | Status | Content-Type | Notes |
|---|---|---|---|
| `/robots.txt` | 200 | `text/plain; charset=utf-8` | `Allow: /`, AI bots allowed, `Host:` + `Sitemap: https://arledscreen.com/sitemap.xml` |
| `/sitemap.xml` | 200 | **`application/xml`** | Valid XML declaration; **155** `<url>` entries; trailing slashes OK |

Some crawlers choke on XML content-type in a browser preview — that is **not** evidence the file is broken. Googlebot expects XML.

## B2. Google Search Console — OWNER checklist (cannot automate here)

Sign in → property `https://arledscreen.com` (URL-prefix or Domain):

1. **Sitemaps** → submit `https://arledscreen.com/sitemap.xml` → status “Success”
2. Note **Discovered URLs** vs **Indexed**
3. **Pages** report:
   - Crawled – currently not indexed
   - Discovered – currently not indexed
   - Duplicate without user-selected canonical
   - Soft 404
   - Redirect error
4. **HTTPS** / **Core Web Vitals** / **Manual actions** = clean
5. Inspect sample URLs: `/tr/`, `/tr/led-ekran-fiyatlari/`, `/entity.json`, one case study
6. Optional: Bing Webmaster Tools same sitemap

## Verdict

No code change required for A/B file health. Architecture matches intended TR-primary + EN alternate model. Remaining work is **GSC verification and indexing monitoring** by the site owner.
