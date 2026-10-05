# Point C — merge günü kontrol listesi (Gün 42)

Hedef: PR #55 deploy olduktan **aynı gün** canlı AI yüzeyleri + bağımsız atıf başlasın.
Spam blog / 81-il yok. Kaynak: [`entity-profiles.json`](https://arledscreen.com/entity-profiles.json) · playbook: [`offsite-entity-playbook.md`](./offsite-entity-playbook.md)

## 0) Merge + redeploy (blok)

1. PR #55 merge → `main`
2. Cloudflare Pages production redeploy (artifact = bu branch build çıktısı)
3. Beklenen static dosyalar Functions dışında (`_routes.json` exclude)

## 1) Canlı smoke (zorunlu)

```bash
npm run smoke:live
```

Hedef: **13/13 PASS** (veya ≥12; sitemap + IndexNow key).

| URL | Beklenen |
|-----|----------|
| `/entity.json` | 200 JSON · `citeOneLiner` · Gaziosmanpaşa |
| `/entity-profiles.json` | 200 JSON · `gbpDescription` · `linkedinAbout` |
| `/catalog.json` | 200 · `dataset` · `groupAggregateOffers` |
| `/.well-known/ard.json` | 200 · catalog + entity-profiles discovery |
| `/llms.txt` | cite + entity-profiles.json |
| `/feeds/merchant-priced-panels.tsv` | 12 SKU · `p2-5-ic` · `32.18 USD` |
| `/tr/about/` · `/tr/yapay-zeka/` · `/tr/led-ekran-fiyatlari/` | entity + catalog link |
| IndexNow key `.txt` | 200 · key body |

Hızlı curl:

```bash
for u in entity.json entity-profiles.json catalog.json .well-known/ard.json feeds/merchant-priced-panels.tsv; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "https://arledscreen.com/$u")
  echo "$code  /$u"
done
```

## 1b) IndexNow ping (smoke yeşil olduktan sonra)

```bash
npm run post-deploy
# veya ayrı:
npm run smoke:live
npm run indexnow -- --live
```

Tek fetch ajan index: https://arledscreen.com/ai-shopping.json  
Dokümantasyon: [`indexnow.md`](./indexnow.md) — Bing’e AI artefact URL’lerini bildirir (entity/catalog/ard/…).

## 2) Point C yapıştırma (aynı NAP / cite)

Pack’leri canlıdan alın (repo `public/entity-profiles.json` ile birebir):

```bash
curl -sS https://arledscreen.com/entity-profiles.json | jq -r '.packs | keys[]'
```

| Kanal | Pack anahtarı | Not |
|-------|---------------|-----|
| Google Business Profile açıklama | `gbpDescription` | MEDIUM cite; kategori LED / dijital tabela |
| LinkedIn şirket About | `linkedinAbout` | Web + entity.json + telefon |
| Instagram bio | `instagramBio` | Kısa; site TR |
| Facebook About | `facebookAbout` | MEDIUM cite |
| Dizin kısa | `directoryShort` | ONE_LINER |
| Dizin uzun | `directoryLong` | NAP + entity |
| YouTube About | `youtubeAbout` | SHORT + entity |

**Yapmayın:** uydurma rating, “Türkiye’nin en …”, sabit TL paket, kaydı olmayan il kapısı.

## 3) Domain birleştirme

- `arleds.com` → `https://arledscreen.com/tr/` **301** (entity bölünmesini kes)
- Aynı telefonla iki domain indekste kalmasın

## 4) Kör tur 1 (deploy sonrası)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md) — 12 prompt × 0–3 = /36  
Skor kartı: [`ai-shopping-blind-test-scores.md`](./ai-shopping-blind-test-scores.md)  
Hedef tur 1 ≥ **18/36**.

## 5) Merchant (opsiyonel, priced-only)

- Feed: `/feeds/merchant-priced-panels.tsv` (12 SKU)
- Quote-only (şeffaf/esnek/poster/kiralık) **eklenmez**
- Checklist: [`merchant-priced-panels.md`](./merchant-priced-panels.md)

## 6) Ay sonu (≤ 2026-11-04)

[`ai-alisveris-ay-sonu-pano.md`](./ai-alisveris-ay-sonu-pano.md): smoke GREEN · Point C ≥ 5 bağımsız URL · kör tur 2 ≥ 27/36
