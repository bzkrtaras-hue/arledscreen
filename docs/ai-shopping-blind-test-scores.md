# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **386/771** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **579/771**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (257 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 257 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /771.

| Model | Tarih | Konum | Incognito | Skor /771 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /771 | |
| Gemini | | | | /771 | |
| Perplexity | | | | /771 | |
| Bing Copilot | | | | /771 | |
| **Ortalama** | | | | **/771** | Hedef ≥ 386 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /771 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /771 | | |
| Gemini | | /771 | | |
| Perplexity | | /771 | | |
| Bing Copilot | | /771 | | |
| **Ortalama** | | **/771** | | Hedef ≥ 579 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
