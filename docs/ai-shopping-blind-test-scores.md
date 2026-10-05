# AI alışveriş — kör test skor kartı

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **39/78** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **59/78**  
Spam blog / 81-il yok. Kaynaklar: `entity.json` · `catalog.json` · `entity-profiles.json` · `ard.json`

## Site readiness (repo)

| Kontrol | Durum |
|---------|--------|
| `npm run audit:blind-test` | build/postbuild |
| `npm run smoke:live` | deploy sonrası 20/20 |

## Tur kayıtları

Skor: prompt başına **0–3** (bkz. protokol). Toplam /78.

### Tur 1 — deploy sonrası (PR #55 canlı)

| Model | Tarih | Konum | Incognito | Skor /78 | Not |
|-------|-------|-------|-----------|----------|-----|
| ChatGPT | | TR / | evet | /78 | |
| Gemini | | | | /78 | |
| Perplexity | | | | /78 | |
| Bing Copilot | | | | /78 | |
| **Ortalama** | | | | **/78** | Hedef ≥ 39 |

Detay (örnek — her model için kopyalayın):

```
Tarih:
Model:
# | Prompt | Skor | Atıf URL | Not
1–25 | (bkz. protokol) |  |  |
26 | NXTIONSTAR mı ARLEDSCREEN mi satıyor? |  |  | satıcı = ARLEDSCREEN
Toplam: /78
```

### Tur 2 — Point C sonrası (≤ 2026-11-04)

Önkoşul: GBP + LinkedIn/IG/FB About = `entity-profiles.json` packs · `arleds.com` 301

| Model | Tarih | Skor /78 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|----------|---------------------------|-----|
| ChatGPT | | /78 | | |
| Gemini | | /78 | | |
| Perplexity | | /78 | | |
| Bing Copilot | | /78 | | |
| **Ortalama** | | **/78** | | Hedef ≥ 59 |

## Point C sayaç (tur 2 ile birlikte)

| Kaynak | URL / kanıt | Aynı cite? |
|--------|-------------|------------|
| GBP | | ☐ |
| LinkedIn şirket | | ☐ |
| Instagram | | ☐ |
| Facebook | | ☐ |
| Bing Places / Apple Maps | | ☐ |
| Apple Business Connect | | ☐ |
| Yandex Business | | ☐ |
| Crunchbase (draft) | | ☐ |
| Merchant Center 12 SKU | | ☐ |
| Dizin 1 | | ☐ |
| Dizin 2 | | ☐ |
