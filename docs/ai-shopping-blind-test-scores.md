# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **207/414** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **311/414**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (138 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 138 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /414.

| Model | Tarih | Konum | Incognito | Skor /414 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /414 | |
| Gemini | | | | /414 | |
| Perplexity | | | | /414 | |
| Bing Copilot | | | | /414 | |
| **Ortalama** | | | | **/414** | Hedef ≥ 207 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /414 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /414 | | |
| Gemini | | /414 | | |
| Perplexity | | /414 | | |
| Bing Copilot | | /414 | | |
| **Ortalama** | | **/414** | | Hedef ≥ 311 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
