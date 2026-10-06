# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **371/741** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **556/741**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (247 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 247 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /741.

| Model | Tarih | Konum | Incognito | Skor /741 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /741 | |
| Gemini | | | | /741 | |
| Perplexity | | | | /741 | |
| Bing Copilot | | | | /741 | |
| **Ortalama** | | | | **/741** | Hedef ≥ 371 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /741 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /741 | | |
| Gemini | | /741 | | |
| Perplexity | | /741 | | |
| Bing Copilot | | /741 | | |
| **Ortalama** | | **/741** | | Hedef ≥ 556 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
