# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **86/171** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **129/171**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (57 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 57 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /171.

| Model | Tarih | Konum | Incognito | Skor /171 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /171 | |
| Gemini | | | | /171 | |
| Perplexity | | | | /171 | |
| Bing Copilot | | | | /171 | |
| **Ortalama** | | | | **/171** | Hedef ≥ 86 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /171 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /171 | | |
| Gemini | | /171 | | |
| Perplexity | | /171 | | |
| Bing Copilot | | /171 | | |
| **Ortalama** | | **/171** | | Hedef ≥ 129 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
