# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **530/1059** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **795/1059**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (353 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 353 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1059.

| Model | Tarih | Konum | Incognito | Skor /1059 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1059 | |
| Gemini | | | | /1059 | |
| Perplexity | | | | /1059 | |
| Bing Copilot | | | | /1059 | |
| **Ortalama** | | | | **/1059** | Hedef ≥ 530 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1059 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1059 | | |
| Gemini | | /1059 | | |
| Perplexity | | /1059 | | |
| Bing Copilot | | /1059 | | |
| **Ortalama** | | **/1059** | | Hedef ≥ 795 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
