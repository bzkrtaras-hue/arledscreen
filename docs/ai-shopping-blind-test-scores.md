# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **410/819** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **615/819**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (273 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 273 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /819.

| Model | Tarih | Konum | Incognito | Skor /819 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /819 | |
| Gemini | | | | /819 | |
| Perplexity | | | | /819 | |
| Bing Copilot | | | | /819 | |
| **Ortalama** | | | | **/819** | Hedef ≥ 410 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /819 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /819 | | |
| Gemini | | /819 | | |
| Perplexity | | /819 | | |
| Bing Copilot | | /819 | | |
| **Ortalama** | | **/819** | | Hedef ≥ 615 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
