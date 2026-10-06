# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **78/156** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **117/156**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (52 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 52 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /156.

| Model | Tarih | Konum | Incognito | Skor /156 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /156 | |
| Gemini | | | | /156 | |
| Perplexity | | | | /156 | |
| Bing Copilot | | | | /156 | |
| **Ortalama** | | | | **/156** | Hedef ≥ 78 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /156 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /156 | | |
| Gemini | | /156 | | |
| Perplexity | | /156 | | |
| Bing Copilot | | /156 | | |
| **Ortalama** | | **/156** | | Hedef ≥ 117 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
