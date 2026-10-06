# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **593/1185** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **889/1185**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (395 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 395 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1185.

| Model | Tarih | Konum | Incognito | Skor /1185 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1185 | |
| Gemini | | | | /1185 | |
| Perplexity | | | | /1185 | |
| Bing Copilot | | | | /1185 | |
| **Ortalama** | | | | **/1185** | Hedef ≥ 593 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1185 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1185 | | |
| Gemini | | /1185 | | |
| Perplexity | | /1185 | | |
| Bing Copilot | | /1185 | | |
| **Ortalama** | | **/1185** | | Hedef ≥ 889 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
