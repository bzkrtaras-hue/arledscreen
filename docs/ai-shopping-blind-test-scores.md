# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **231/462** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **347/462**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (154 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 154 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /462.

| Model | Tarih | Konum | Incognito | Skor /462 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /462 | |
| Gemini | | | | /462 | |
| Perplexity | | | | /462 | |
| Bing Copilot | | | | /462 | |
| **Ortalama** | | | | **/462** | Hedef ≥ 231 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /462 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /462 | | |
| Gemini | | /462 | | |
| Perplexity | | /462 | | |
| Bing Copilot | | /462 | | |
| **Ortalama** | | **/462** | | Hedef ≥ 347 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
