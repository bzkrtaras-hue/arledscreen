# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **272/543** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **408/543**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (181 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 181 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /543.

| Model | Tarih | Konum | Incognito | Skor /543 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /543 | |
| Gemini | | | | /543 | |
| Perplexity | | | | /543 | |
| Bing Copilot | | | | /543 | |
| **Ortalama** | | | | **/543** | Hedef ≥ 272 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /543 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /543 | | |
| Gemini | | /543 | | |
| Perplexity | | /543 | | |
| Bing Copilot | | /543 | | |
| **Ortalama** | | **/543** | | Hedef ≥ 408 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
