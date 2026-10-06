# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **243/486** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **365/486**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (162 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 162 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /486.

| Model | Tarih | Konum | Incognito | Skor /486 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /486 | |
| Gemini | | | | /486 | |
| Perplexity | | | | /486 | |
| Bing Copilot | | | | /486 | |
| **Ortalama** | | | | **/486** | Hedef ≥ 243 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /486 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /486 | | |
| Gemini | | /486 | | |
| Perplexity | | /486 | | |
| Bing Copilot | | /486 | | |
| **Ortalama** | | **/486** | | Hedef ≥ 365 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
