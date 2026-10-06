# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **212/423** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **318/423**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (141 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 141 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /423.

| Model | Tarih | Konum | Incognito | Skor /423 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /423 | |
| Gemini | | | | /423 | |
| Perplexity | | | | /423 | |
| Bing Copilot | | | | /423 | |
| **Ortalama** | | | | **/423** | Hedef ≥ 212 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /423 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /423 | | |
| Gemini | | /423 | | |
| Perplexity | | /423 | | |
| Bing Copilot | | /423 | | |
| **Ortalama** | | **/423** | | Hedef ≥ 318 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
