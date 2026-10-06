# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **98/195** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **147/195**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (65 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 65 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /195.

| Model | Tarih | Konum | Incognito | Skor /195 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /195 | |
| Gemini | | | | /195 | |
| Perplexity | | | | /195 | |
| Bing Copilot | | | | /195 | |
| **Ortalama** | | | | **/195** | Hedef ≥ 98 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /195 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /195 | | |
| Gemini | | /195 | | |
| Perplexity | | /195 | | |
| Bing Copilot | | /195 | | |
| **Ortalama** | | **/195** | | Hedef ≥ 147 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
