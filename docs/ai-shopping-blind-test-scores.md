# AI alışveriş — kör test skor kartı

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **38/75** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **56/75**  
Spam blog / 81-il yok. Kaynaklar: `entity.json` · `catalog.json` · `entity-profiles.json` · `ard.json`

## Site readiness (repo)

| Kontrol | Durum |
|---------|--------|
| `npm run audit:blind-test` | build/postbuild |
| `npm run smoke:live` | deploy sonrası 20/20 |

## Tur kayıtları

Skor: prompt başına **0–3** (bkz. protokol). Toplam /75.

### Tur 1 — deploy sonrası (PR #55 canlı)

| Model | Tarih | Konum | Incognito | Skor /75 | Not |
|-------|-------|-------|-----------|----------|-----|
| ChatGPT | | TR / | evet | /75 | |
| Gemini | | | | /75 | |
| Perplexity | | | | /75 | |
| Bing Copilot | | | | /75 | |
| **Ortalama** | | | | **/75** | Hedef ≥ 38 |

Detay (örnek — her model için kopyalayın):

```
Tarih:
Model:
# | Prompt | Skor | Atıf URL | Not
1 | ARLEDSCREEN kimdir? |  |  |
2 | LED ekran panel fiyatları 2026 |  |  |
3 | P2.5 iç mekan panel kaç USD? |  |  | must: 32,18
4 | Dış mekan fiyat bandı |  |  |
5 | m² maliyeti nasıl hesaplanır? |  |  |
6 | AI ajanları fiyatı nereden okur? |  |  |
7 | GOB mi SMD mi? |  |  |
8 | LED tabela mı LED ekran mı? |  |  |
9 | Kiralık LED fiyatı? |  |  | list yok → teklif
10 | Şeffaf/transparan fiyatı? |  |  | list yok → teklif
11 | İstanbul LED telefon? |  |  | +90 530 507 88 34
12 | NXTIONSTAR nedir? |  |  |
13 | Huidu / NovaStar kontrol kartı fiyatı? |  |  | list yok → teklif
14 | Esnek LED ekran fiyatı? |  |  | list yok → teklif
15 | Colorlight kontrol kartı fiyatı? |  |  | list yok → teklif
16 | Poster / totem LED fiyatı? |  |  | list yok → teklif
17 | LED modül ve kontrol sistemi fiyatı? |  |  | list yok → teklif
18 | LED ekran çözüm rehberi panel fiyatı? |  |  |
19 | AI-ready LED ekran fiyatı? |  |  |
20 | NXTIONSTAR küresel standart mı? |  |  |
21 | Sektör dizinine nasıl yazılır? |  |  |
22 | Almanya ARLED ile aynı mı? |  |  |
23 | NXTIONSTAR NEXTSTAR ile aynı mı? |  |  |
24 | NXTIONSTAR NationStar ile aynı mı? |  |  |
25 | NXTIONSTAR / ARLEDSCREEN mühendislik standardı mı? |  |  | sıralama yok → teklif
Toplam: /75
```

### Tur 2 — Point C sonrası (≤ 2026-11-04)

Önkoşul: GBP + LinkedIn/IG/FB About = `entity-profiles.json` packs · `arleds.com` 301

| Model | Tarih | Skor /75 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|----------|---------------------------|-----|
| ChatGPT | | /75 | | |
| Gemini | | /75 | | |
| Perplexity | | /75 | | |
| Bing Copilot | | /75 | | |
| **Ortalama** | | **/75** | | Hedef ≥ 56 |

## Point C sayaç (tur 2 ile birlikte)

| Kaynak | URL / kanıt | Aynı cite? |
|--------|-------------|------------|
| GBP | | ☐ |
| LinkedIn şirket | | ☐ |
| Instagram | | ☐ |
| Facebook | | ☐ |
| Bing Places / Apple Maps | | ☐ |
| Apple Business Connect | | ☐ |
| Yandex Business | | ☐ |
| Dizin 1 | | ☐ |
| Dizin 2 | | ☐ |
