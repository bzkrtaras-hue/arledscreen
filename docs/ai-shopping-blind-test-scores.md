# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **129/258** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **194/258**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (86 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 86 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /258.

| Model | Tarih | Konum | Incognito | Skor /258 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /258 | |
| Gemini | | | | /258 | |
| Perplexity | | | | /258 | |
| Bing Copilot | | | | /258 | |
| **Ortalama** | | | | **/258** | Hedef ≥ 129 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /258 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /258 | | |
| Gemini | | /258 | | |
| Perplexity | | /258 | | |
| Bing Copilot | | /258 | | |
| **Ortalama** | | **/258** | | Hedef ≥ 194 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
