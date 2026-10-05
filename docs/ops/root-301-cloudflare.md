# Root → /tr/ permanent redirect (Cloudflare)

Eski AR-LED ana sayfası güvenli kapatıldı: kökte HTML yok, 404 yok, yalnızca **301 → `https://arledscreen.com/tr/`**.

## Canlı durum (doğrulama 2026-10-05)

| URL | Code | Location |
| --- | --- | --- |
| `https://arledscreen.com/` | **301** | `https://arledscreen.com/tr/` (absolute; Function) |
| `https://www.arledscreen.com/` | **301** | `https://arledscreen.com/tr/` |
| `https://arledscreen.com/tr/` | **200** | — (kanonik ana sayfa) |
| `https://arledscreen.com/llms.txt` | **200** | — |
| `https://arledscreen.com/robots.txt` | **200** | — |
| `https://arledscreen.com/sitemap.xml` | **200** | — (kök URL yok) |

Apex gövdesi HTML değil; sunucu yönlendirme metni veya boş 301. Eski meta-refresh stub ve `out/index.html` yok.

## Repoda eski ana sayfa kaynağı

| Aday | Durum |
| --- | --- |
| `src/app/page.tsx` / `pages/index.*` | **Yok** — App Router yalnızca `src/app/[locale]/` |
| `public/index.html` | **Yok** — bilinçli kaldırıldı |
| `out/index.html` | **Yok** — `scripts/postbuild-lang.mjs` siler |
| Ayrı Hostinger HTML | Yedek: `hosting/hostinger/.htaccess` absolute 301 |
| Cloudflare | `functions/index.js` + `public/_routes.json` (yalnız `/`) |

Eski dizin başlığı («LED Ekran \| Türkiye Satış ve Montaj \| AR-LED», «81 ilde», «5 yıl ücretsiz…», «P6–P10») **sitede yayında değil**; Google önbelleği 301 + `/tr/` yeniden tarama ile düşer.

## Repo mekanizması (öncelik sırası)

1. **`functions/index.js`** — apex `/` için absolute `301` → `https://arledscreen.com/tr/` (query string korunur).
2. **`public/_routes.json`** — Function yalnızca `/` için çalışır; `/tr/*` ve diğer statik yollar sınırsız static + `_redirects` kalır.
3. **`public/_redirects`** — `/`, `/index.html`, `/index.htm` → absolute `/tr/` (Function yoksa yedek).
4. **Postbuild** — `out/index.html` varsa sil (static asset `_redirects` / Function’dan önce 200 vermesin).
5. **Hostinger yedek** — `hosting/hostinger/.htaccess` absolute 301 (Pages dışı fallback).

## Cloudflare dashboard (www)

Ruleset phase `http_request_dynamic_redirect`:

1. **WWW root to /tr/** — host `www.arledscreen.com` and path `/` → `https://arledscreen.com/tr/` (301).
2. **WWW to HTTPS apex** — other www paths → `concat("https://arledscreen.com", path)` (301).

Apex için ek Single Redirect **gerekmez** (Function absolute Location üretir). Varsa göreli `/tr/` üreten apex kuralını kaldırın veya aynı absolute hedefe çekin.

## Deploy

```bash
npm run build
test ! -f out/index.html
test -f out/_routes.json
npx wrangler pages deploy out --project-name=arledscreen --branch=main
# confirm:
curl -sI https://arledscreen.com/ | grep -i '^location:'
# expect: location: https://arledscreen.com/tr/
curl -sI https://arledscreen.com/tr/ | head -1
# expect: HTTP/2 200
```

## GSC — eski dizin kaydını düşürmek (hesap sahibi)

Arama sonuçlarında hâlâ eski AR-LED başlığı görünüyorsa:

1. [Google Search Console](https://search.google.com/search-console) → `arledscreen.com`.
2. **URL Inspection** → `https://arledscreen.com/` → Google’ın **301** ve hedef `https://arledscreen.com/tr/` gördüğünü doğrula.
3. `https://arledscreen.com/tr/` → **Request indexing** (yeni title: ARLEDSCREEN).
4. **Sitemaps** → `https://arledscreen.com/sitemap.xml` yeniden gönder.
5. İsteğe bağlı: Removals yalnızca acil yanıltıcı snippet için; kalıcı çözüm 301 + yeniden tarama.

## Token hygiene

Revoke chat-shared Cloudflare API tokens under  
https://dash.cloudflare.com/profile/api-tokens  
Keep only what you still need (or none — redirects already live).
