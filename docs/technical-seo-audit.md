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

## C. Sahip doğrulama checklist (2026-10-06)

Aşağıdaki maddeler ajan ortamından **kesinleştirilemedi** veya kısmen canlı spot-check ile doğrulandı. GSC / PSI / gerçek cihaz gerektirenler sahip işi.

| Kontrol | Öncelik | Durum | Yapılacak işlem |
|---|---|---|---|
| Google indeksleme | Kritik | **Sahip doğrula** | Search Console’da ana sayfa, ürün ve rehber URL’lerini inceleyin. |
| Canonical ve yönlendirmeler | Yüksek | Canlı spot OK · **sahip teyit** | HTTP→HTTPS, www→apex, `/`→`/tr/` 301/308 canlıda görüldü; GSC’de tercih edilen URL’yi teyit edin. |
| Sitemap ve robots.txt | Yüksek | Canlı spot OK · **sahip teyit** | `robots.txt` 200 · Host bare · Sitemap bildirimi; `sitemap.xml` 200 · **164** URL. Engellenen kritik sayfa yok (audit:robots/sitemap). GSC Sitemap “Success” sahibi. |
| Mobil performans | Yüksek | **Sahip doğrula** | PageSpeed Insights + gerçek mobil cihaz: hız, görsel boyut, etkileşim gecikmesi. |
| Yapılandırılmış veri | Yüksek | Canlı spot OK · **sahip teyit** | Ana sayfada Organization; ürün sayfasında Product/Offer + BreadcrumbList canlı HTML’de. Rich Results / GSC Enhancements sahibi. |
| Görsel SEO | Orta | Kısmi kod · **sahip doğrula** | Açıklayıcı dosya adları + alt metin audit’leri var; boyut/CDN gerçek cihazla teyit. |
| İç bağlantılar | Yüksek | Kod audit OK · **sahip teyit** | Rehber↔ürün↔proje↔teklif link audit’i yeşil; örnek sayfalarda manuel tıklama teyidi. |

## Verdict

No code change required for A/B file health. Architecture matches intended TR-primary + EN alternate model. Remaining work is **GSC verification, PSI/mobile, and indexing monitoring** by the site owner (section C).
