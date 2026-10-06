# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **342/684** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **513/684**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (228 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 228 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /684.

| Model | Tarih | Konum | Incognito | Skor /684 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /684 | |
| Gemini | | | | /684 | |
| Perplexity | | | | /684 | |
| Bing Copilot | | | | /684 | |
| **Ortalama** | | | | **/684** | Hedef ≥ 342 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /684 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /684 | | |
| Gemini | | /684 | | |
| Perplexity | | /684 | | |
| Bing Copilot | | /684 | | |
| **Ortalama** | | **/684** | | Hedef ≥ 513 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
