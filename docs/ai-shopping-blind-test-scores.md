# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **302/603** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **453/603**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (201 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 201 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /603.

| Model | Tarih | Konum | Incognito | Skor /603 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /603 | |
| Gemini | | | | /603 | |
| Perplexity | | | | /603 | |
| Bing Copilot | | | | /603 | |
| **Ortalama** | | | | **/603** | Hedef ≥ 302 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /603 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /603 | | |
| Gemini | | /603 | | |
| Perplexity | | /603 | | |
| Bing Copilot | | /603 | | |
| **Ortalama** | | **/603** | | Hedef ≥ 453 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
