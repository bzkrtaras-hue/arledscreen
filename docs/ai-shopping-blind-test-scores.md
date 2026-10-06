# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **309/618** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **464/618**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (206 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 206 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /618.

| Model | Tarih | Konum | Incognito | Skor /618 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /618 | |
| Gemini | | | | /618 | |
| Perplexity | | | | /618 | |
| Bing Copilot | | | | /618 | |
| **Ortalama** | | | | **/618** | Hedef ≥ 309 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /618 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /618 | | |
| Gemini | | /618 | | |
| Perplexity | | /618 | | |
| Bing Copilot | | /618 | | |
| **Ortalama** | | **/618** | | Hedef ≥ 464 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
