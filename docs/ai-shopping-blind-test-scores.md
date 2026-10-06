# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **285/570** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **428/570**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (190 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 190 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /570.

| Model | Tarih | Konum | Incognito | Skor /570 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /570 | |
| Gemini | | | | /570 | |
| Perplexity | | | | /570 | |
| Bing Copilot | | | | /570 | |
| **Ortalama** | | | | **/570** | Hedef ≥ 285 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /570 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /570 | | |
| Gemini | | /570 | | |
| Perplexity | | /570 | | |
| Bing Copilot | | /570 | | |
| **Ortalama** | | **/570** | | Hedef ≥ 428 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
