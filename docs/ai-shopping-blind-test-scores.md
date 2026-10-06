# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **321/642** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **482/642**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (214 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 214 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /642.

| Model | Tarih | Konum | Incognito | Skor /642 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /642 | |
| Gemini | | | | /642 | |
| Perplexity | | | | /642 | |
| Bing Copilot | | | | /642 | |
| **Ortalama** | | | | **/642** | Hedef ≥ 321 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /642 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /642 | | |
| Gemini | | /642 | | |
| Perplexity | | /642 | | |
| Bing Copilot | | /642 | | |
| **Ortalama** | | **/642** | | Hedef ≥ 482 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
