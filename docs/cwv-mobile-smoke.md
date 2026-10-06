# CWV / mobile smoke (Gün 16)

Tarih: 2026-10-05  
Ortam: local static export `out/` @ `http://127.0.0.1:8765`  
Araç: Lighthouse mobile (headless Chrome)  
Raporlar: `/tmp/cwv-reports/*.json` (geçici; bu doc kalıcı özet)

## Sonuç özeti

| URL | Perf | A11y | BP | SEO | LCP | CLS | FCP | TBT |
|-----|------|------|----|-----|-----|-----|-----|-----|
| `/tr/` | 100 | 96 | 100 | 100 | 1.5 s | 0 | 0.6 s | 0 ms |
| `/tr/led-ekran-fiyatlari/` | 100 | 99 | 100 | 100 | 1.2 s | 0 | 0.4 s | 0 ms |
| `/tr/products/` | 100 | 99 | 100 | 100 | 1.5 s | 0 | 0.5 s | 0 ms |
| `/tr/projelerimiz/ayberk-sigorta-led-ekran/` | 100 | 99 | 100 | 100 | 1.2 s | 0 | 0.4 s | 0 ms |

**Verdict:** Core Web Vitals smoke geçti (LCP ≤1.5 s, CLS 0, TBT 0). AI alışveriş yüzeyleri mobil performansta engel değil.

## Bilinen uyarılar (bloklamayan)

### `font-display` (score 0.5)

Kaynak: **MailerLite** üçüncü taraf fontları (`fonts.mailerlite.com` Montserrat / Open Sans).  
Site fontu: `next/font` Montserrat zaten `display: "swap"` (`src/app/layout.tsx`).  
Aksiyon: MailerLite hesap font ayarı (owner) veya embed’i daha geç yükleme — kod tarafında ek swap gerekmiyor.

### `heading-order` (score 0)

Kaynak: MailerLite form embed `<h4>Kampanyalardan ilk siz haberdar olun</h4>` — footer’da zaten `<h2>` bülten başlığı var → h2→h4 atlama.  
Düzeltme (Gün 16): `.ml-form-embedContent > h4 { display: none }` — duplicate başlık gizlendi.

### `uses-responsive-images` (home ~645 KiB “savings”)

Gateway tile görselleri 480/960/1600 WebP; mobil emülasyon DPR≈2.6 → tarayıcı 960w seçer (beklenen).  
İsteğe bağlı ileride: 720 mid-tier üretimi.

### `modern-image-formats` (home ~114 KiB)

Hero video poster JPG’ler (`/videos/*.jpg`). WebP/AVIF poster dönüşümü ayrı görev.

### `unused-javascript`

Next.js chunk’lar + MailerLite `universal.js` (lazyOnload). Statik export için kabul edilebilir.

## Tekrar çalıştırma

```bash
npm run build
python3 -m http.server 8765 --directory out --bind 127.0.0.1
npx --yes lighthouse http://127.0.0.1:8765/tr/ \
  --only-categories=performance,accessibility,best-practices,seo \
  --form-factor=mobile --screenEmulation.mobile \
  --output=json --output-path=/tmp/cwv-reports/tr.json --chrome-flags="--headless --no-sandbox"
```

Aynı komutu fiyat / products / 1 case study URL’leri için tekrarla.

## Sonraki

- Gün 17: GSC invalid schema regression guard (script)
- Owner: canlı GSC CWV paneli (field data) — lab smoke ≠ field
