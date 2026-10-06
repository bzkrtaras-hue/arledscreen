# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **393/786** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **590/786**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (262 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 262 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /786.

| Model | Tarih | Konum | Incognito | Skor /786 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /786 | |
| Gemini | | | | /786 | |
| Perplexity | | | | /786 | |
| Bing Copilot | | | | /786 | |
| **Ortalama** | | | | **/786** | Hedef ≥ 393 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /786 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /786 | | |
| Gemini | | /786 | | |
| Perplexity | | /786 | | |
| Bing Copilot | | /786 | | |
| **Ortalama** | | **/786** | | Hedef ≥ 590 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
