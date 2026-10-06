# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **303/606** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **455/606**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (202 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 202 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /606.

| Model | Tarih | Konum | Incognito | Skor /606 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /606 | |
| Gemini | | | | /606 | |
| Perplexity | | | | /606 | |
| Bing Copilot | | | | /606 | |
| **Ortalama** | | | | **/606** | Hedef ≥ 303 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /606 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /606 | | |
| Gemini | | /606 | | |
| Perplexity | | /606 | | |
| Bing Copilot | | /606 | | |
| **Ortalama** | | **/606** | | Hedef ≥ 455 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
