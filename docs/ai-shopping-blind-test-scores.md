# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **84/168** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **126/168**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (56 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 56 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /168.

| Model | Tarih | Konum | Incognito | Skor /168 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /168 | |
| Gemini | | | | /168 | |
| Perplexity | | | | /168 | |
| Bing Copilot | | | | /168 | |
| **Ortalama** | | | | **/168** | Hedef ≥ 84 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /168 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /168 | | |
| Gemini | | /168 | | |
| Perplexity | | /168 | | |
| Bing Copilot | | /168 | | |
| **Ortalama** | | **/168** | | Hedef ≥ 126 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
