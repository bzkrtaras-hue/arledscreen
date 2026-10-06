# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **327/654** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **491/654**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (218 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 218 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /654.

| Model | Tarih | Konum | Incognito | Skor /654 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /654 | |
| Gemini | | | | /654 | |
| Perplexity | | | | /654 | |
| Bing Copilot | | | | /654 | |
| **Ortalama** | | | | **/654** | Hedef ≥ 327 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /654 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /654 | | |
| Gemini | | /654 | | |
| Perplexity | | /654 | | |
| Bing Copilot | | /654 | | |
| **Ortalama** | | **/654** | | Hedef ≥ 491 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
