# AI alışveriş — kör test skor kartı

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **42/84** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **63/84**  
Spam blog / 81-il yok. Kaynaklar: `entity.json` · `catalog.json` · `entity-profiles.json` · `ard.json`

## Site readiness (repo)

| Kontrol | Durum |
|---------|--------|
| `npm run audit:blind-test` | build/postbuild |
| `npm run smoke:live` | deploy sonrası 20/20 |

## Tur kayıtları

Skor: prompt başına **0–3** (bkz. protokol). Toplam /84.

### Tur 1 — deploy sonrası (PR #55 canlı)

| Model | Tarih | Konum | Incognito | Skor /84 | Not |
|-------|-------|-------|-----------|----------|-----|
| ChatGPT | | TR / | evet | /84 | |
| Gemini | | | | /84 | |
| Perplexity | | | | /84 | |
| Bing Copilot | | | | /84 | |
| **Ortalama** | | | | **/84** | Hedef ≥ 42 |

### Tur 2 — Point C sonrası (≤ 2026-11-04)

| Model | Tarih | Skor /84 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|----------|---------------------------|-----|
| ChatGPT | | /84 | | |
| Gemini | | /84 | | |
| Perplexity | | /84 | | |
| Bing Copilot | | /84 | | |
| **Ortalama** | | **/84** | | Hedef ≥ 63 |
