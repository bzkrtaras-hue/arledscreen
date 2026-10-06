# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **416/831** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **624/831**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (277 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 277 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /831.

| Model | Tarih | Konum | Incognito | Skor /831 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /831 | |
| Gemini | | | | /831 | |
| Perplexity | | | | /831 | |
| Bing Copilot | | | | /831 | |
| **Ortalama** | | | | **/831** | Hedef ≥ 416 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /831 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /831 | | |
| Gemini | | /831 | | |
| Perplexity | | /831 | | |
| Bing Copilot | | /831 | | |
| **Ortalama** | | **/831** | | Hedef ≥ 624 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
