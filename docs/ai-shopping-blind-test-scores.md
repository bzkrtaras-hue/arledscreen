# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **447/894** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **671/894**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (298 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 298 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /894.

| Model | Tarih | Konum | Incognito | Skor /894 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /894 | |
| Gemini | | | | /894 | |
| Perplexity | | | | /894 | |
| Bing Copilot | | | | /894 | |
| **Ortalama** | | | | **/894** | Hedef ≥ 447 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /894 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /894 | | |
| Gemini | | /894 | | |
| Perplexity | | /894 | | |
| Bing Copilot | | /894 | | |
| **Ortalama** | | **/894** | | Hedef ≥ 671 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
