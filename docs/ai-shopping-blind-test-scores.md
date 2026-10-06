# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **104/207** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **156/207**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (69 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 69 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /207.

| Model | Tarih | Konum | Incognito | Skor /207 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /207 | |
| Gemini | | | | /207 | |
| Perplexity | | | | /207 | |
| Bing Copilot | | | | /207 | |
| **Ortalama** | | | | **/207** | Hedef ≥ 104 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /207 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /207 | | |
| Gemini | | /207 | | |
| Perplexity | | /207 | | |
| Bing Copilot | | /207 | | |
| **Ortalama** | | **/207** | | Hedef ≥ 156 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
