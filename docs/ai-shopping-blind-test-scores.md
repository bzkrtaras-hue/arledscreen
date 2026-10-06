# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **167/333** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **250/333**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (111 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 111 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /333.

| Model | Tarih | Konum | Incognito | Skor /333 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /333 | |
| Gemini | | | | /333 | |
| Perplexity | | | | /333 | |
| Bing Copilot | | | | /333 | |
| **Ortalama** | | | | **/333** | Hedef ≥ 167 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /333 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /333 | | |
| Gemini | | /333 | | |
| Perplexity | | /333 | | |
| Bing Copilot | | /333 | | |
| **Ortalama** | | **/333** | | Hedef ≥ 250 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
