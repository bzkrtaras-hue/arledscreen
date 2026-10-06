# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **69/138** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **103/138**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (46 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 46 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /138.

| Model | Tarih | Konum | Incognito | Skor /138 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /138 | |
| Gemini | | | | /138 | |
| Perplexity | | | | /138 | |
| Bing Copilot | | | | /138 | |
| **Ortalama** | | | | **/138** | Hedef ≥ 69 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /138 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /138 | | |
| Gemini | | /138 | | |
| Perplexity | | /138 | | |
| Bing Copilot | | /138 | | |
| **Ortalama** | | **/138** | | Hedef ≥ 103 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
