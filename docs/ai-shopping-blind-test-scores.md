# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **131/261** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **196/261**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (87 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 87 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /261.

| Model | Tarih | Konum | Incognito | Skor /261 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /261 | |
| Gemini | | | | /261 | |
| Perplexity | | | | /261 | |
| Bing Copilot | | | | /261 | |
| **Ortalama** | | | | **/261** | Hedef ≥ 131 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /261 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /261 | | |
| Gemini | | /261 | | |
| Perplexity | | /261 | | |
| Bing Copilot | | /261 | | |
| **Ortalama** | | **/261** | | Hedef ≥ 196 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
