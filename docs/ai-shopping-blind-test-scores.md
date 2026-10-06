# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **338/675** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **507/675**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (225 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 225 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /675.

| Model | Tarih | Konum | Incognito | Skor /675 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /675 | |
| Gemini | | | | /675 | |
| Perplexity | | | | /675 | |
| Bing Copilot | | | | /675 | |
| **Ortalama** | | | | **/675** | Hedef ≥ 338 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /675 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /675 | | |
| Gemini | | /675 | | |
| Perplexity | | /675 | | |
| Bing Copilot | | /675 | | |
| **Ortalama** | | **/675** | | Hedef ≥ 507 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
