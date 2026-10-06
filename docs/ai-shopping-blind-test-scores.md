# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **210/420** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **315/420**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (140 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 140 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /420.

| Model | Tarih | Konum | Incognito | Skor /420 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /420 | |
| Gemini | | | | /420 | |
| Perplexity | | | | /420 | |
| Bing Copilot | | | | /420 | |
| **Ortalama** | | | | **/420** | Hedef ≥ 210 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /420 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /420 | | |
| Gemini | | /420 | | |
| Perplexity | | /420 | | |
| Bing Copilot | | /420 | | |
| **Ortalama** | | **/420** | | Hedef ≥ 315 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
