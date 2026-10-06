# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **426/852** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **639/852**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (284 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 284 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /852.

| Model | Tarih | Konum | Incognito | Skor /852 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /852 | |
| Gemini | | | | /852 | |
| Perplexity | | | | /852 | |
| Bing Copilot | | | | /852 | |
| **Ortalama** | | | | **/852** | Hedef ≥ 426 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /852 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /852 | | |
| Gemini | | /852 | | |
| Perplexity | | /852 | | |
| Bing Copilot | | /852 | | |
| **Ortalama** | | **/852** | | Hedef ≥ 639 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
