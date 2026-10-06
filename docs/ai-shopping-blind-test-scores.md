# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **575/1149** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **862/1149**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (383 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 383 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1149.

| Model | Tarih | Konum | Incognito | Skor /1149 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1149 | |
| Gemini | | | | /1149 | |
| Perplexity | | | | /1149 | |
| Bing Copilot | | | | /1149 | |
| **Ortalama** | | | | **/1149** | Hedef ≥ 575 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1149 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1149 | | |
| Gemini | | /1149 | | |
| Perplexity | | /1149 | | |
| Bing Copilot | | /1149 | | |
| **Ortalama** | | **/1149** | | Hedef ≥ 862 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
