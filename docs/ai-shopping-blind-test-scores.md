# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **251/501** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **376/501**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (167 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 167 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /501.

| Model | Tarih | Konum | Incognito | Skor /501 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /501 | |
| Gemini | | | | /501 | |
| Perplexity | | | | /501 | |
| Bing Copilot | | | | /501 | |
| **Ortalama** | | | | **/501** | Hedef ≥ 251 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /501 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /501 | | |
| Gemini | | /501 | | |
| Perplexity | | /501 | | |
| Bing Copilot | | /501 | | |
| **Ortalama** | | **/501** | | Hedef ≥ 376 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
