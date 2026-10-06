# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **485/969** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **727/969**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (323 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 323 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /969.

| Model | Tarih | Konum | Incognito | Skor /969 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /969 | |
| Gemini | | | | /969 | |
| Perplexity | | | | /969 | |
| Bing Copilot | | | | /969 | |
| **Ortalama** | | | | **/969** | Hedef ≥ 485 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /969 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /969 | | |
| Gemini | | /969 | | |
| Perplexity | | /969 | | |
| Bing Copilot | | /969 | | |
| **Ortalama** | | **/969** | | Hedef ≥ 727 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
