# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **260/519** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **390/519**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (173 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 173 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /519.

| Model | Tarih | Konum | Incognito | Skor /519 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /519 | |
| Gemini | | | | /519 | |
| Perplexity | | | | /519 | |
| Bing Copilot | | | | /519 | |
| **Ortalama** | | | | **/519** | Hedef ≥ 260 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /519 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /519 | | |
| Gemini | | /519 | | |
| Perplexity | | /519 | | |
| Bing Copilot | | /519 | | |
| **Ortalama** | | **/519** | | Hedef ≥ 390 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
