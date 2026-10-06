# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **114/228** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **171/228**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (76 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 76 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /228.

| Model | Tarih | Konum | Incognito | Skor /228 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /228 | |
| Gemini | | | | /228 | |
| Perplexity | | | | /228 | |
| Bing Copilot | | | | /228 | |
| **Ortalama** | | | | **/228** | Hedef ≥ 114 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /228 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /228 | | |
| Gemini | | /228 | | |
| Perplexity | | /228 | | |
| Bing Copilot | | /228 | | |
| **Ortalama** | | **/228** | | Hedef ≥ 171 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
