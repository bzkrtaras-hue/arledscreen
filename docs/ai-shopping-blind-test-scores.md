# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **222/444** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **333/444**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (148 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 148 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /444.

| Model | Tarih | Konum | Incognito | Skor /444 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /444 | |
| Gemini | | | | /444 | |
| Perplexity | | | | /444 | |
| Bing Copilot | | | | /444 | |
| **Ortalama** | | | | **/444** | Hedef ≥ 222 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /444 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /444 | | |
| Gemini | | /444 | | |
| Perplexity | | /444 | | |
| Bing Copilot | | /444 | | |
| **Ortalama** | | **/444** | | Hedef ≥ 333 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
