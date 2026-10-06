# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **374/747** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **561/747**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (249 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 249 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /747.

| Model | Tarih | Konum | Incognito | Skor /747 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /747 | |
| Gemini | | | | /747 | |
| Perplexity | | | | /747 | |
| Bing Copilot | | | | /747 | |
| **Ortalama** | | | | **/747** | Hedef ≥ 374 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /747 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /747 | | |
| Gemini | | /747 | | |
| Perplexity | | /747 | | |
| Bing Copilot | | /747 | | |
| **Ortalama** | | **/747** | | Hedef ≥ 561 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
