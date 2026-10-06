## Gün 467b — arleds.com bizim değil (kanonik arledscreen.com)

- `blockedUntil301` boş · sahip 301 görevi kaldırıldı
- sameAs yalnızca IG/FB/LI · Point C + Tur 1a hâlâ sahip

## Gün 467 — invent Blind #415 counter apron

- Blind #415 counter apron / counter eteği · dis/mimari · prompts=415 · /1245
- Point C + Tur 1a hâlâ sahip

## Gün 466 — invent Blind #414 Logitech Meetup

- Blind #414 Logitech Meetup · ic/konferans · prompts=414 · /1242
- Point C + Tur 1a hâlâ sahip

## Gün 465 — invent Blind #413 skirt apron

- Blind #413 skirt apron / etek eteği · dis/mimari · prompts=413 · /1239
- Point C + Tur 1a hâlâ sahip

## Gün 464 — invent Blind #412 Rally Bar Huddle

- Blind #412 Rally Bar Huddle · ic/konferans · prompts=412 · /1236
- Point C + Tur 1a hâlâ sahip

## Gün 463 — invent Blind #411 coping apron

- Blind #411 coping apron / parapet kapak eteği · dis/mimari · prompts=411 · /1233
- Point C + Tur 1a hâlâ sahip

## Gün 462b — IndexNow same-day fix + Bing Places pack

- IndexNow: hash değişince same-day skip yutmaz (invent sonrası bildirim)
- Point C `bingPlaces` pack (packs=13)
- Spam/81-il yok; Point C + Tur 1a hâlâ sahip

## Gün 462 — invent Blind #410 Neat Bar + ARD temizliği

- Blind #410 Neat Bar · ic/konferans · prompts=410 · /1230
- ARD outdoor Cisco #408 stale cite temizlendi
- Point C + Tur 1a hâlâ sahip

## Gün 461b — invent Blind #409 ridge apron

- Blind #409 ridge apron / saçak eteği · dis/mimari · prompts=409 · /1227
- Point C + Tur 1a hâlâ sahip; spam/81-il yok

## Gün 461 — ajan kapanış (stale docs + timer)

- Stale 405/1215 → **408/1224**; PR draft → **ready**; skor Tur2 hedef **918**
- Point C Drive Doc + paste-bundle güncellendi
- Canlı: JSON 200 · robots 3× BYPASS Host bare · prompts=408 · CI yeşil
- **Açık sahip:** Point C paste · Tur 1a · arleds.com 301
- Yeni invent yok bu turda

## Gün 458e — Point C paste bundle

- `docs/point-c-paste-bundle.md` üretim entity-profiles çekimi
- Invent/deploy/merge yok; PR draft


## Gün 458d — kör tur P0 + sameAs

- Tur 1a: canlı ai-shopping #1–#20 → skor kartı /60 (sahip doldurur)
- sameAs IG/FB/LinkedIn GET **200**; arleds.com TLS fail → 301 yok
- Invent/deploy/purge/merge yok; PR #55 draft


## Gün 458c — Point C / kör tur (merge’siz)

- Canlı JSON 200 + robots 3× BYPASS bare Host doğrulandı
- `point-c-merge-day.md`: paste P0 sırası; merge Point C bloğu kaldırıldı
- Kör tur 1 skor kartı: merge şartı kalktı — sahip doldurur
- Invent / deploy / purge / merge yok; PR #55 draft


## Host — çift cevap gerçeği (2026-10-06)

- Function/BYPASS: `Host: arledscreen.com` (doğru)
- CDN HIT max-age=14400: `Host: https://arledscreen.com` (şemalı; hâlâ duruyor)
- Zone cache purge 401 (token) — sahip purge veya TTL
- “Canlı Host düzeldi” iddiası HIT bitmeden doğru değil
- JSON 200; invent yok; PR draft; `_headers` /robots.txt → no-store



## Host satırı — üretim düzeltildi (2026-10-06)

- CF Pages redeploy: Function gövdesi canlı — **`Host: arledscreen.com`** (şemasız)
- YandexBot + DuckDuckBot Allow; Disallow yok; Sitemap duruyor; no-store/BYPASS
- `smoke:live` **20/20**; dört JSON 200; invent yok; PR draft

## Host satırı — 2026-10-06 düzeltme kaydı

- Önbellek iddiası yetmez: üretim `robots.txt` BYPASS/no-store iken gövde **`Host: https://arledscreen.com`** (şemalı)
- `pages.dev` Function: bare `Host: arledscreen.com` + Yandex/DuckDuck
- Dört JSON 200; invent yok; PR draft; smoke robots CONTENT (19/20)
- Docs’taki “canlı bare Host / 20/20” iddiası geri çekildi

# AI alışveriş / GEO — 30 günlük çalışma günlüğü

Hedef: arledscreen.com’u AI alışveriş ajanları için makinece okunabilir lider konumda tutmak.
Spam blog / 81-il doorway yok. Point C = sahibi işletecek üçüncü taraf atıflar.

| Gün | Tarih | İş | Durum |
|-----|-------|-----|-------|
| 16 | 2026-10-05 | CWV mobile smoke + MailerLite heading | ✅ |
| 17 | 2026-10-05 | GSC invalid-schema regression (`audit:schema`) | ✅ |
| 18 | 2026-10-05 | Thin EN noindex + `audit:locale` | ✅ |
| 19 | 2026-10-05 | Case-study photo gaps (`audit:case-images`) | ✅ |
| 20 | 2026-10-05 | GOB vs SMD + ShoppingLinkCloud | ✅ |
| 21 | 2026-10-05 | `groupAggregateOffers` in catalog.json | ✅ |
| 22 | 2026-10-05 | ProductCtaRow + `audit:product-ctas` | ✅ |
| 23 | 2026-10-05 | Sitemap completeness (`audit:sitemap`) | ✅ |
| 24 | 2026-10-05 | Bing/AI bot Allow + Host (`audit:robots`) | ✅ |
| 25 | 2026-10-05 | Kör test protokolü + `audit:blind-test` | ✅ |
| 26 | 2026-10-05 | llms/entity cite parity (`audit:cite-parity`) | ✅ |
| 27 | 2026-10-05 | Merchant feed dry-run 12 SKU (`audit:merchant-feed`) | ✅ |
| 28 | 2026-10-05 | FAQ + LinkCloud gaps (ürün grupları catalog hint) | ✅ |
| 29 | 2026-10-05 | Regression suite tek komut (`audit:all`) | ✅ |
| 30 | 2026-10-05 | Ay sonu pano + `smoke:live` (ölçüm 2026-11-04) | ✅ |
| 31 | 2026-10-05 | Fiyat hub AI sources + Merchant ARD + `_routes` exclude | ✅ |
| 32 | 2026-10-05 | Pitch USD FAQs + hesaplayici shopping FAQ/LinkCloud | ✅ |
| 33 | 2026-10-05 | İzleme/kiralama rehber + quote FAQ (list vs teklif) | ✅ |
| 34 | 2026-10-05 | About/NXTIONSTAR/products hub identity FAQs + LinkCloud | ✅ |
| 35 | 2026-10-05 | Founder + yapay-zeka ShoppingLinkCloud / FAQ | ✅ |
| 36 | 2026-10-05 | SSS + hizmetler catalog FAQ + LinkCloud | ✅ |
| 37 | 2026-10-05 | Home + bölgeler hub/iller ShoppingLinkCloud | ✅ |
| 38 | 2026-10-05 | Rehber hub + projeler + galeri shopping FAQs | ✅ |
| 39 | 2026-10-05 | Case study + blog ShoppingLinkCloud / FAQ | ✅ |
| 40 | 2026-10-05 | Model pages LinkCloud + entity-profiles.json Point C | ✅ |
| 41 | 2026-10-05 | llms-full/smoke/footer Point C discovery | ✅ |
| 42 | 2026-10-05 | entity-profiles CORS + merge-day Point C checklist | ✅ |
| 43 | 2026-10-05 | Deploy artifact guard + blind-test skor kartı | ✅ |
| 44 | 2026-10-05 | AI headers parity (CORS+Content-Type) + `audit:ai-headers` | ✅ |
| 45 | 2026-10-05 | Org hasOfferCatalog + sitemap AI artefacts + SEO-guide LinkCloud | ✅ |
| 46 | 2026-10-05 | IndexNow key + ping script + `audit:indexnow` (post-merge Bing) | ✅ |
| 47 | 2026-10-05 | Offer↔catalog join (sku/@id) + pitch AggregateOffer + llms USD parity | ✅ |
| 48 | 2026-10-05 | `ai-shopping.json` tek-fetch index + `post-deploy` + entity hasOfferCatalog | ✅ |
| 49 | 2026-10-05 | ai-shopping.json birincil ajan girişi (yapay-zeka/footer/FAQ/llms) | ✅ |
| 50 | 2026-10-05 | Offer `priceValidUntil` + `sync-llms-prices` otomatik PANEL tablosu | ✅ |
| 51 | 2026-10-05 | ai-shopping pricedPanels+agentRules · Offer shippingDetails · Brand.url | ✅ |
| 52 | 2026-10-05 | Merchant shipping honesty · iade FAQ · extrasUsd · ENTITY_FAQS tek kaynak | ✅ |
| 53 | 2026-10-05 | llms/ARD/yapay-zeka honesty parity · Org subjectOf ai-shopping · smoke Day51–52 | ✅ |
| 54 | 2026-10-05 | Home/quote FAQ · ai-catalog refresh · Merchant tax · Point C sameAsReadiness | ✅ |
| 55 | 2026-10-05 | ARD→ai-catalog sync · shared prompts · FAQ holes · Footer EN · point-c --check · PR CI | ✅ |
| 56 | 2026-10-05 | smoke:local / verify:premerge · FAQ ai-shopping holes · IndexNow URL complete · Org Quote CTA · blind-test doc parity | ✅ |
| 57 | 2026-10-05 | Offer hasMerchantReturnPolicy · Merchant iade honesty · sitemap ai-catalog · audit/smoke/blind-test guards | ✅ |
| 58 | 2026-10-05 | FAQ ai-shopping wave 2 (quote-only/commercial/founder/projeler/bolgeler/articles) · blind mustSay honesty | ✅ |
| 59 | 2026-10-05 | FAQ honesty wave 3 · model FAQPage · AggregateOffer ücretsiz-kargo · audit requireHonesty | ✅ |
| 60 | 2026-10-05 | Case-study FAQPage ×29 · Org OfferCatalog honesty · merge-day/post-deploy Day 59 · hub AggregateOffer audit | ✅ |
| 61 | 2026-10-05 | llms hasMerchantReturnPolicy tokens · case/blog sameAs→ai-shopping · blog FAQPage ×N | ✅ |
| 62 | 2026-10-05 | Kontrol quote-only invent closure · ARD return-policy tokens · galeri FAQPage | ✅ |
| 63 | 2026-10-05 | Kontrol residual wave (entity/commercial/YZ) · blind #13 · merchant return_policy_label · footer merchant/ai-catalog | ✅ |
| 64 | 2026-10-05 | llms/hubs kontrol quote-only closure · extrasUsd≠list · IndexNow kontrol hubs · smoke Day63 needles | ✅ |
| 65 | 2026-10-05 | Price-surface extrasUsd≠list SKU · agentRules disambiguation · SSS/Home FAQ · blind #14 esnek | ✅ |
| 66 | 2026-10-05 | fiyat-hesap UI extrasUsd honesty · catalog extrasUsdNote · kontrol brand FAQs · blind #15 Colorlight | ✅ |
| 67 | 2026-10-05 | Point C citeMedium honesty · GEO kapsül · blind #16 poster · IndexNow quote hubs · smoke fiyat-hesap | ✅ |
| 68 | 2026-10-05 | Hero 81-il invent kill · citeShort/IG/playbook honesty · led-modul FAQ · IndexNow kiralık | ✅ |
| 69 | 2026-10-05 | EN/AR/RU home meta honesty · üretici page · blind #17 led-modul · FB playbook | ✅ |
| 70 | 2026-10-05 | seo-guides engineering-desk invent kill · rehber FAQ · blind #18 · IndexNow EN rehber · YT playbook | ✅ |
| 71 | 2026-10-05 | AI-ready invent kill · yapay-zeka EN/TR · AR/RU meta honesty · blind #19 · smoke EN YZ | ✅ |
| 72 | 2026-10-05 | Slogan küresel-standart invent kill · Enterprise/Kurumsal masa → yazılı teklif · blind #20 | ✅ |
| 73 | 2026-10-05 | llms-full slogan residual · directory paste packs · blind #21 · seo-guides desk residual | ✅ |
| 74 | 2026-10-05 | ARD 17→22 kör test drift · quote desk invent · Alman ARLED blind #22 · llms intent rows | ✅ |
| 75 | 2026-10-05 | NEXTSTAR invent blind #23 · founder IndexNow · Real-time engineering invent · point-c ARD 23 | ✅ |
| 76 | 2026-10-05 | NationStar invent #24 · agentRules disambiguation · Bing Places NAP · skor hedef drift fix | ✅ |
| 77 | 2026-10-05 | mühendislik/engineering standard invent #25 · masa invent · Apple BC/Yandex/Wikidata packs · YandexBot · ARD brand/founder/rehber | ✅ |
| 78 | 2026-10-05 | AR/RU invent #26 seller · tek çatı/uçtan uca · Crunchbase/Merchant packs · IndexNow hubs | ✅ |
| 79 | 2026-10-05 | turnkey/tek süreç #27 · Ücretsiz calculator · DuckDuckBot · ARD about/hesap/kontrol | ✅ |
| 80 | 2026-10-05 | sorunsuz/platform #28 · Küresel LED · tek merkezden · ARD led-ekran/sss | ✅ |
| 81 | 2026-10-05 | AI-infrastructure #29 · ranking invent · EN yapay-zeka ARD · skor /87 | ✅ |
| 82 | 2026-10-05 | enterprise/aynı-gün #30 · hizmetler/products ARD · skor /90 | ✅ |
| 83 | 2026-10-05 | üretici/fabrika/OEM #31 · satisi/montaj/servis ARD · skor /93 | ✅ |
| 84 | 2026-10-05 | tek ekip/fabrika use-case #32 · p2-5/galeri/bolgeler ARD · skor /96 | ✅ |
| 85 | 2026-10-05 | quote-only stok/anında #33 · TrustFacts aynı-ekip · esnek/seffaf/poster ARD · skor /99 | ✅ |
| 86 | 2026-10-05 | sabit nit/IP #34 · keşiften-montaja residual · ic/dis/gob ARD · skor /102 | ✅ |
| 87 | 2026-10-06 | sabit Hz/kamera #35 · ince-pitch/konferans ARD · skor /105 | ✅ |
| 88 | 2026-10-06 | izleme mesafesi #36 · piksel-araligi/p4/p5 ARD · skor /108 | ✅ |
| 89 | 2026-10-06 | sabit kW/3faz #37 · mimari/poster/kiosk ARD · skor /111 | ✅ |
| 90 | 2026-10-06 | sabit görüş açısı #38 · gob-vs-smd/led-tabela/p1-25 ARD · skor /114 | ✅ |
| 91 | 2026-10-06 | sabit HDR/gri skala #39 · p3-07/p1-86/kiralik-mi ARD · skor /117 | ✅ |
| 92 | 2026-10-06 | sabit ömür/MTBF #40 · p2-9/cephe/billboard ARD · skor /120 | ✅ |
| 93 | 2026-10-06 | sabit gamut/DCI-P3 #41 · magaza/sahne/vitrin ARD · skor /123 | ✅ |
| 94 | 2026-10-06 | sabit kg/m² #42 · otel/avm/fuar ARD · skor /126 | ✅ |
| 95 | 2026-10-06 | sabit °C #43 · stadyum/belediye/restoran ARD · skor /129 | ✅ |
| 96 | 2026-10-06 | sabit kontrast #44 · dugun/konferans/spor ARD · skor /132 | ✅ |
| 97 | 2026-10-06 | sabit rüzgâr #45 · EN rehber-dis/quote/about ARD · skor /135 | ✅ |
| 98 | 2026-10-06 | sabit ölü piksel #46 · EN rehber-ic/led/hesaplayici ARD · skor /138 | ✅ |
| 99 | 2026-10-06 | sabit nem/%RH #47 · EN rehber hub + TR/EN home ARD · skor /141 | ✅ |
| 100 | 2026-10-06 | sabit standby/idle #48 · hesaplayici/mimari refresh · skor /144 | ✅ |
| 101 | 2026-10-06 | sabit depolama/storage °C #49 · /ar/ /ru/ home ARD · skor /147 | ✅ |
| 102 | 2026-10-06 | sabit CE/RoHS #50 · /ar/ /ru/ about ARD · skor /150 | ✅ |
| 103 | 2026-10-06 | sabit ISO #51 · EN mimari + AR/RU quote ARD · skor /153 | ✅ |
| 104 | 2026-10-06 | sabit UL/ETL #52 · EN products + AR/RU hesaplayici ARD · skor /156 | ✅ |
| 105 | 2026-10-06 | sabit yangın sınıfı #53 · EN konferans + AR/RU yapay-zeka ARD · skor /159 | ✅ |
| 106 | 2026-10-06 | sabit IK #54 · EN vitrin/poster/kiosk ARD · skor /162 | ✅ |
| 107 | 2026-10-06 | sabit ASTM/salt spray #55 · rehber fiyat ARD · skor /165 | ✅ |
| 108 | 2026-10-06 | sabit garanti yılı #56 · AR/RU rehber ARD · skor /168 | ✅ |
| 109 | 2026-10-06 | sabit iade günü #57 · AR/RU rehber-ic ARD · skor /171 | ✅ |
| 110 | 2026-10-06 | sabit teslimat süresi #58 · AR/RU rehber-dis ARD · skor /174 | ✅ |
| 111 | 2026-10-06 | sabit gürültü/dB #59 · AR/RU konferans ARD · skor /177 | ✅ |
| 112 | 2026-10-06 | sabit Delta E #60 · AR/RU vitrin ARD · skor /180 | ✅ |
| 113 | 2026-10-06 | sabit latency/input lag #61 · AR/RU kiosk ARD · skor /183 | ✅ |
| 114 | 2026-10-06 | sabit parlaklık homojenliği #62 · AR/RU products + TR p2-5 ARD · skor /186 | ✅ |
| 115 | 2026-10-06 | sabit güç faktörü #63 · TR p3-07/p4/dis p2-5 ARD · skor /189 | ✅ |
| 116 | 2026-10-06 | sabit HDCP #64 · TR dis p2-9/p3-07/p4 ARD · skor /192 | ✅ |
| 117 | 2026-10-06 | sabit yedek parça stok #65 · TR dis p4-on-servis/p5/p8 ARD · skor /195 | ✅ |
| 118 | 2026-10-06 | sabit PoE / Gigabit #66 · TR GOB p1-25/p1-53/p1-86 ARD · skor /198 | ✅ |
| 119 | 2026-10-06 | sabit HDMI/SDI #67 · TR NovaStar mctrl660-pro/tb50/vx600 ARD · skor /201 | ✅ |
| 120 | 2026-10-06 | sabit fiber mesafe #68 · TR Colorlight s20/vx20/x20 ARD · skor /204 | ✅ |
| 121 | 2026-10-06 | sabit CMS SLA #69 · TR Huidu hd-a7/hd-c16/hd-w60 ARD · skor /207 | ✅ |
| 122 | 2026-10-06 | sabit dual power #70 · TR esnek p1-86/p2-5 + Colorlight x40m ARD · skor /210 | ✅ |
| 123 | 2026-10-06 | sabit genlock #71 · TR bolgeler istanbul/antalya/bursa ARD · skor /213 | ✅ |
| 124 | 2026-10-06 | sabit Art-Net/DMX #72 · TR bolgeler izmir/eskisehir/manisa ARD · skor /216 | ✅ |
| 125 | 2026-10-06 | sabit NDI/SRT/RTMP #73 · TR bolgeler aksaray/van/yozgat ARD · skor /219 | ✅ |
| 126 | 2026-10-06 | sabit ön/arka servis #74 · TR bolgeler giresun/yalova/nigde ARD · skor /222 | ✅ |
| 127 | 2026-10-06 | sabit WiFi/Bluetooth #75 · edirne + matiz/beylikduzu proje ARD · skor /225 | ✅ |
| 128 | 2026-10-06 | sabit 0mm/seamless #76 · white-city/manisa-bb/unye proje ARD · skor /228 | ✅ |
| 129 | 2026-10-06 | sabit alıcı yedeklilik #77 · giresun/yalova-malt/barcelona proje ARD · skor /231 | ✅ |
| 130 | 2026-10-06 | sabit gönderici yedeklilik #78 · ayberk/dogu-produksiyon/umut-radyoloji proje ARD · skor /234 | ✅ |
| 131 | 2026-10-06 | sabit ışık sensörü #79 · babil/beren/kesan-golet proje ARD · skor /237 | ✅ |
| 132 | 2026-10-06 | sabit canlı modül #80 · azerbaycan/gnd-triko/ouka proje ARD · skor /240 | ✅ |
| 133 | 2026-10-06 | sabit dokunmatik #81 · beylikduzu-yasam/bireysel/bursa proje ARD · skor /243 | ✅ |
| 134 | 2026-10-06 | sabit mıknatıslı modül #82 · hair/drama/manisa-2 proje ARD · skor /246 | ✅ |
| 135 | 2026-10-06 | sabit koruyucu kaplama #83 · manisa-proje/prestij/sinan-polat proje ARD · skor /249 | ✅ |
| 136 | 2026-10-06 | sabit 3D #84 · bireysel-2/orta-sekerli proje ARD · skor /252 | ✅ |
| 137 | 2026-10-06 | sabit hızlı kilit #85 · blog 256/kafe/eskisehir ARD · skor /255 | ✅ |
| 138 | 2026-10-06 | sabit kavisli #86 · blog alanya/unye/ic-mekan ARD · skor /258 | ✅ |
| 139 | 2026-10-06 | sabit döküm kabin #87 · priced dis/ic/gob ARD refresh · skor /261 | ✅ |
| 140 | 2026-10-06 | sabit anti-yansıma #88 · ic/konferans/ince-pitch ARD refresh · skor /264 | ✅ |
| 141 | 2026-10-06 | sabit OPS #89 · kiosk/poster ARD refresh · skor /267 | ✅ |
| 142 | 2026-10-06 | sabit parafudr #90 · dis/mimari ARD refresh · skor /270 | ✅ |
| 143 | 2026-10-06 | sabit zamanlayıcı #91 · kiosk/poster ARD refresh · skor /273 | ✅ |
| 144 | 2026-10-06 | sabit flight case #92 · konferans/kiralik ARD refresh · skor /276 | ✅ |
| 145 | 2026-10-06 | sabit köşe LED #93 · vitrin/mimari ARD refresh · skor /279 | ✅ |
| 146 | 2026-10-06 | sabit enerji sınıfı #94 · dis/ic ARD refresh · skor /282 | ✅ |
| 147 | 2026-10-06 | sabit düşük mavi ışık #95 · ic/konferans ARD refresh · skor /285 | ✅ |
| 148 | 2026-10-06 | sabit asılı/hanging #96 · konferans/mimari ARD refresh · skor /288 | ✅ |
| 149 | 2026-10-06 | sabit daisy chain #97 · ic/dis ARD refresh · skor /291 | ✅ |
| 150 | 2026-10-06 | sabit IP67/NEMA #98 · dis/mimari ARD refresh · skor /294 | ✅ |
| 151 | 2026-10-06 | sabit ısı yönetimi #99 · dis/ic ARD refresh · skor /297 | ✅ |
| 152 | 2026-10-06 | sabit BT.2020 #100 · ic/konferans ARD refresh · skor /300 | ✅ |
| 153 | 2026-10-06 | sabit HLG/HDR10 #101 · ic/konferans ARD refresh · skor /303 | ✅ |
| 154 | 2026-10-06 | sabit PWM/scan rate #102 · ic/konferans ARD refresh · skor /306 | ✅ |
| 155 | 2026-10-06 | sabit black level #103 · ic/konferans ARD refresh · skor /309 | ✅ |
| 156 | 2026-10-06 | sabit pixel mapping #104 · ic/konferans ARD refresh · skor /312 | ✅ |
| 157 | 2026-10-06 | sabit gamma/white balance #105 · ic/konferans ARD refresh · skor /315 | ✅ |
| 158 | 2026-10-06 | sabit potting #106 · dis/mimari ARD refresh · skor /318 | ✅ |
| 159 | 2026-10-06 | sabit louver/masking #107 · dis/mimari ARD refresh · skor /321 | ✅ |
| 160 | 2026-10-06 | sabit module size #108 · ic/konferans ARD refresh · skor /324 | ✅ |
| 161 | 2026-10-06 | sabit cabinet depth #109 · dis/mimari ARD refresh · skor /327 | ✅ |
| 162 | 2026-10-06 | sabit drive IC #110 · ic/konferans ARD refresh · skor /330 | ✅ |
| 163 | 2026-10-06 | sabit cabinet size #111 · dis/mimari ARD refresh · skor /333 | ✅ |
| 164 | 2026-10-06 | sabit panel size #112 · ic/konferans ARD refresh · skor /336 | ✅ |
| 165 | 2026-10-06 | sabit waterproof glue #113 · dis/mimari ARD refresh · skor /339 | ✅ |
| 166 | 2026-10-06 | sabit mask pitch #114 · ic/konferans ARD refresh · skor /342 | ✅ |
| 167 | 2026-10-06 | sabit silicone seal #115 · dis/mimari ARD refresh · skor /345 | ✅ |
| 168 | 2026-10-06 | sabit connector type #116 · ic/konferans ARD refresh · skor /348 | ✅ |
| 169 | 2026-10-06 | sabit locating pin #117 · dis/mimari ARD refresh · skor /351 | ✅ |
| 170 | 2026-10-06 | sabit flat cable #118 · ic/konferans ARD refresh · skor /354 | ✅ |
| 171 | 2026-10-06 | sabit safety cable #119 · dis/mimari ARD refresh · skor /357 | ✅ |
| 172 | 2026-10-06 | sabit thermal pad #120 · ic/konferans ARD refresh · skor /360 | ✅ |
| 173 | 2026-10-06 | sabit magnesium #121 · dis/mimari ARD refresh · skor /363 | ✅ |
| 174 | 2026-10-06 | sabit EDID #122 · ic/konferans ARD refresh · skor /366 | ✅ |
| 175 | 2026-10-06 | sabit HDBaseT #123 · dis/mimari ARD refresh · skor /369 | ✅ |
| 176 | 2026-10-06 | sabit video processor #124 · ic/konferans ARD refresh · skor /372 | ✅ |
| 177 | 2026-10-06 | sabit truss clamp #125 · dis/mimari ARD refresh · skor /375 | ✅ |
| 178 | 2026-10-06 | sabit scaler #126 · ic/konferans ARD refresh · skor /378 | ✅ |
| 179 | 2026-10-06 | sabit backup battery #127 · dis/mimari ARD refresh · skor /381 | ✅ |
| 180 | 2026-10-06 | sabit ribbon cable #128 · ic/konferans ARD refresh · skor /384 | ✅ |
| 181 | 2026-10-06 | sabit hoist #129 · dis/mimari ARD refresh · skor /387 | ✅ |
| 182 | 2026-10-06 | sabit SFP #130 · ic/konferans ARD refresh · skor /390 | ✅ |
| 183 | 2026-10-06 | sabit cable gland #131 · dis/mimari ARD refresh · skor /393 | ✅ |
| 184 | 2026-10-06 | sabit PIP #132 · ic/konferans ARD refresh · skor /396 | ✅ |
| 185 | 2026-10-06 | sabit grounding #133 · dis/mimari ARD refresh · skor /399 | ✅ |
| 186 | 2026-10-06 | sabit Dante #134 · ic/konferans ARD refresh · skor /402 | ✅ |
| 187 | 2026-10-06 | sabit powerCON #135 · dis/mimari ARD refresh · skor /405 | ✅ |
| 188 | 2026-10-06 | sabit KVM #136 · ic/konferans ARD refresh · skor /408 | ✅ |
| 189 | 2026-10-06 | sabit Neutrik #137 · dis/mimari ARD refresh · skor /411 | ✅ |
| 190 | 2026-10-06 | sabit multi-window #138 · ic/konferans ARD refresh · skor /414 | ✅ |
| 191 | 2026-10-06 | sabit guy wire #139 · dis/mimari ARD refresh · skor /417 | ✅ |
| 192 | 2026-10-06 | sabit junction box #140 · ic/konferans ARD refresh · skor /420 | ✅ |
| 193 | 2026-10-06 | sabit leveling foot #141 · dis/mimari ARD refresh · skor /423 | ✅ |
| 194 | 2026-10-06 | sabit matrix switcher #142 · ic/konferans ARD refresh · skor /426 | ✅ |
| 195 | 2026-10-06 | sabit ballast #143 · dis/mimari ARD refresh · skor /429 | ✅ |
| 196 | 2026-10-06 | sabit BYOD #144 · ic/konferans ARD refresh · skor /432 | ✅ |
| 197 | 2026-10-06 | sabit outrigger #145 · dis/mimari ARD refresh · skor /435 | ✅ |
| 198 | 2026-10-06 | sabit Crestron #146 · ic/konferans ARD refresh · skor /438 | ✅ |
| 199 | 2026-10-06 | sabit USB-C #147 · dis/mimari ARD refresh · skor /441 | ✅ |
| 200 | 2026-10-06 | sabit IR remote #148 · ic/konferans ARD refresh · skor /444 | ✅ |
| 201 | 2026-10-06 | sabit base plate #149 · dis/mimari ARD refresh · skor /447 | ✅ |
| 202 | 2026-10-06 | sabit RS-232 #150 · ic/konferans ARD refresh · skor /450 | ✅ |
| 203 | 2026-10-06 | sabit weather drain #151 · dis/mimari ARD refresh · skor /453 | ✅ |
| 204 | 2026-10-06 | sabit Extron #152 · ic/konferans ARD refresh · skor /456 | ✅ |
| 205 | 2026-10-06 | sabit wall bracket #153 · dis/mimari ARD refresh · skor /459 | ✅ |
| 206 | 2026-10-06 | sabit AMX #154 · ic/konferans ARD refresh · skor /462 | ✅ |
| 207 | 2026-10-06 | sabit drip edge #155 · dis/mimari ARD refresh · skor /465 | ✅ |
| 208 | 2026-10-06 | sabit Control4 #156 · ic/konferans ARD refresh · skor /468 | ✅ |
| 209 | 2026-10-06 | sabit weep hole #157 · dis/mimari ARD refresh · skor /471 | ✅ |
| 210 | 2026-10-06 | sabit Biamp #158 · ic/konferans ARD refresh · skor /474 | ✅ |
| 211 | 2026-10-06 | sabit bird mesh #159 · dis/mimari ARD refresh · skor /477 | ✅ |
| 212 | 2026-10-06 | sabit QSC #160 · ic/konferans ARD refresh · skor /480 | ✅ |
| 213 | 2026-10-06 | sabit anti-theft screw #161 · dis/mimari ARD refresh · skor /483 | ✅ |
| 214 | 2026-10-06 | sabit RS-485 #162 · ic/konferans ARD refresh · skor /486 | ✅ |
| 215 | 2026-10-06 | sabit bird spike #163 · dis/mimari ARD refresh · skor /489 | ✅ |
| 216 | 2026-10-06 | sabit Kramer #164 · ic/konferans ARD refresh · skor /492 | ✅ |
| 217 | 2026-10-06 | sabit expansion joint #165 · dis/mimari ARD refresh · skor /495 | ✅ |
| 218 | 2026-10-06 | sabit Shure #166 · ic/konferans ARD refresh · skor /498 | ✅ |
| 219 | 2026-10-06 | sabit snow load #167 · dis/mimari ARD refresh · skor /501 | ✅ |
| 220 | 2026-10-06 | sabit Symetrix #168 · ic/konferans ARD refresh · skor /504 | ✅ |
| 221 | 2026-10-06 | sabit cable tray #169 · dis/mimari ARD refresh · skor /507 | ✅ |
| 222 | 2026-10-06 | sabit Atlona #170 · ic/konferans ARD refresh · skor /510 | ✅ |
| 223 | 2026-10-06 | sabit sun shade #171 · dis/mimari ARD refresh · skor /513 | ✅ |
| 224 | 2026-10-06 | sabit Zoom Room #172 · ic/konferans ARD refresh · skor /516 | ✅ |
| 225 | 2026-10-06 | sabit vandal guard #173 · dis/mimari ARD refresh · skor /519 | ✅ |
| 226 | 2026-10-06 | sabit Teams Room #174 · ic/konferans ARD refresh · skor /522 | ✅ |
| 227 | 2026-10-06 | sabit lightning rod #175 · dis/mimari ARD refresh · skor /525 | ✅ |
| 228 | 2026-10-06 | sabit Webex Room #176 · ic/konferans ARD refresh · skor /528 | ✅ |
| 229 | 2026-10-06 | sabit sill flashing #177 · dis/mimari ARD refresh · skor /531 | ✅ |
| 230 | 2026-10-06 | sabit ClickShare #178 · ic/konferans ARD refresh · skor /534 | ✅ |
| 231 | 2026-10-06 | sabit seismic brace #179 · dis/mimari ARD refresh · skor /537 | ✅ |
| 232 | 2026-10-06 | sabit AirMedia #180 · ic/konferans ARD refresh · skor /540 | ✅ |
| 233 | 2026-10-06 | sabit chemical anchor #181 · dis/mimari ARD refresh · skor /543 | ✅ |
| 234 | 2026-10-06 | sabit Solstice #182 · ic/konferans ARD refresh · skor /546 | ✅ |
| 235 | 2026-10-06 | sabit counter flashing #183 · dis/mimari ARD refresh · skor /549 | ✅ |
| 236 | 2026-10-06 | sabit Google Meet #184 · ic/konferans ARD refresh · skor /552 | ✅ |
| 237 | 2026-10-06 | sabit neoprene gasket #185 · dis/mimari ARD refresh · skor /555 | ✅ |
| 238 | 2026-10-06 | sabit Yealink #186 · ic/konferans ARD refresh · skor /558 | ✅ |
| 239 | 2026-10-06 | sabit frost heave #187 · dis/mimari ARD refresh · skor /561 | ✅ |
| 240 | 2026-10-06 | sabit Logitech Rally #188 · ic/konferans ARD refresh · skor /564 | ✅ |
| 241 | 2026-10-06 | sabit insect screen #189 · dis/mimari ARD refresh · skor /567 | ✅ |
| 242 | 2026-10-06 | sabit Neat Board #190 · ic/konferans ARD refresh · skor /570 | ✅ |
| 243 | 2026-10-06 | sabit condensation drain #191 · dis/mimari ARD refresh · skor /573 | ✅ |
| 244 | 2026-10-06 | sabit Polycom #192 · ic/konferans ARD refresh · skor /576 | ✅ |
| 245 | 2026-10-06 | sabit vapor barrier #193 · dis/mimari ARD refresh · skor /579 | ✅ |
| 246 | 2026-10-06 | sabit Jabra #194 · ic/konferans ARD refresh · skor /582 | ✅ |
| 247 | 2026-10-06 | sabit scupper #195 · dis/mimari ARD refresh · skor /585 | ✅ |
| 248 | 2026-10-06 | sabit Meeting Owl #196 · ic/konferans ARD refresh · skor /588 | ✅ |
| 249 | 2026-10-06 | sabit parapet flashing #197 · dis/mimari ARD refresh · skor /591 | ✅ |
| 250 | 2026-10-06 | sabit Huddly #198 · ic/konferans ARD refresh · skor /594 | ✅ |
| 251 | 2026-10-06 | sabit ice dam #199 · dis/mimari ARD refresh · skor /597 | ✅ |
| 252 | 2026-10-06 | sabit DTEN #200 · ic/konferans ARD refresh · skor /600 | ✅ |
| 253 | 2026-10-06 | sabit downspout #201 · dis/mimari ARD refresh · skor /603 | ✅ |
| 254 | 2026-10-06 | sabit Maxhub #202 · ic/konferans ARD refresh · skor /606 | ✅ |
| 255 | 2026-10-06 | sabit gutter #203 · dis/mimari ARD refresh · skor /609 | ✅ |
| 256 | 2026-10-06 | sabit ClearOne #204 · ic/konferans ARD refresh · skor /612 | ✅ |
| 257 | 2026-10-06 | sabit ridge vent #205 · dis/mimari ARD refresh · skor /615 | ✅ |
| 258 | 2026-10-06 | sabit AVer #206 · ic/konferans ARD refresh · skor /618 | ✅ |
| 259 | 2026-10-06 | sabit soffit vent #207 · dis/mimari ARD refresh · skor /621 | ✅ |
| 260 | 2026-10-06 | sabit Nureva #208 · ic/konferans ARD refresh · skor /624 | ✅ |
| 261 | 2026-10-06 | sabit cricket flashing #209 · dis/mimari ARD refresh · skor /627 | ✅ |
| 262 | 2026-10-06 | sabit Sennheiser #210 · ic/konferans ARD refresh · skor /630 | ✅ |
| 263 | 2026-10-06 | sabit kick-out flashing #211 · dis/mimari ARD refresh · skor /633 | ✅ |
| 264 | 2026-10-06 | sabit Vaddio #212 · ic/konferans ARD refresh · skor /636 | ✅ |
| 265 | 2026-10-06 | sabit valley flashing #213 · dis/mimari ARD refresh · skor /639 | ✅ |
| 266 | 2026-10-06 | sabit Lifesize #214 · ic/konferans ARD refresh · skor /642 | ✅ |
| 267 | 2026-10-06 | sabit step flashing #215 · dis/mimari ARD refresh · skor /645 | ✅ |
| 268 | 2026-10-06 | sabit Bose #216 · ic/konferans ARD refresh · skor /648 | ✅ |
| 269 | 2026-10-06 | sabit apron flashing #217 · dis/mimari ARD refresh · skor /651 | ✅ |
| 270 | 2026-10-06 | sabit BirdDog #218 · ic/konferans ARD refresh · skor /654 | ✅ |
| 271 | 2026-10-06 | sabit chimney flashing #219 · dis/mimari ARD refresh · skor /657 | ✅ |
| 272 | 2026-10-06 | sabit Pexip #220 · ic/konferans ARD refresh · skor /660 | ✅ |
| 273 | 2026-10-06 | sabit hip flashing #221 · dis/mimari ARD refresh · skor /663 | ✅ |
| 274 | 2026-10-06 | sabit Lumens #222 · ic/konferans ARD refresh · skor /666 | ✅ |
| 275 | 2026-10-06 | sabit rake flashing #223 · dis/mimari ARD refresh · skor /669 | ✅ |
| 276 | 2026-10-06 | sabit PTZOptics #224 · ic/konferans ARD refresh · skor /672 | ✅ |
| 277 | 2026-10-06 | sabit fascia flashing #225 · dis/mimari ARD refresh · skor /675 | ✅ |
| 278 | 2026-10-06 | sabit Obsbot #226 · ic/konferans ARD refresh · skor /678 | ✅ |
| 279 | 2026-10-06 | sabit head flashing #227 · dis/mimari ARD refresh · skor /681 | ✅ |
| 280 | 2026-10-06 | sabit Barco #228 · ic/konferans ARD refresh · skor /684 | ✅ |
| 281 | 2026-10-06 | sabit jamb flashing #229 · dis/mimari ARD refresh · skor /687 | ✅ |
| 282 | 2026-10-06 | sabit Christie #230 · ic/konferans ARD refresh · skor /690 | ✅ |
| 283 | 2026-10-06 | sabit threshold flashing #231 · dis/mimari ARD refresh · skor /693 | ✅ |
| 284 | 2026-10-06 | sabit Epson #232 · ic/konferans ARD refresh · skor /696 | ✅ |
| 285 | 2026-10-06 | sabit gravel stop #233 · dis/mimari ARD refresh · skor /699 | ✅ |
| 286 | 2026-10-06 | sabit NEC #234 · ic/konferans ARD refresh · skor /702 | ✅ |
| 287 | 2026-10-06 | sabit cant strip #235 · dis/mimari ARD refresh · skor /705 | ✅ |
| 288 | 2026-10-06 | sabit Panasonic #236 · ic/konferans ARD refresh · skor /708 | ✅ |
| 289 | 2026-10-06 | sabit reglet #237 · dis/mimari ARD refresh · skor /711 | ✅ |
| 290 | 2026-10-06 | sabit Optoma #238 · ic/konferans ARD refresh · skor /714 | ✅ |
| 291 | 2026-10-06 | sabit termination bar #239 · dis/mimari ARD refresh · skor /717 | ✅ |
| 292 | 2026-10-06 | sabit BenQ #240 · ic/konferans ARD refresh · skor /720 | ✅ |
| 293 | 2026-10-06 | sabit through-wall flashing #241 · dis/mimari ARD refresh · skor /723 | ✅ |
| 294 | 2026-10-06 | sabit Sony #242 · ic/konferans ARD refresh · skor /726 | ✅ |
| 295 | 2026-10-06 | sabit coping #243 · dis/mimari ARD refresh · skor /729 | ✅ |
| 296 | 2026-10-06 | sabit Airtame #244 · ic/konferans ARD refresh · skor /732 | ✅ |
| 297 | 2026-10-06 | sabit base flashing #245 · dis/mimari ARD refresh · skor /735 | ✅ |
| 298 | 2026-10-06 | sabit Mersive #246 · ic/konferans ARD refresh · skor /738 | ✅ |
| 299 | 2026-10-06 | sabit cleat #247 · dis/mimari ARD refresh · skor /741 | ✅ |
| 300 | 2026-10-06 | sabit Vivitek #248 · ic/konferans ARD refresh · skor /744 | ✅ |
| 301 | 2026-10-06 | sabit surface cleat #249 · dis/mimari ARD refresh · skor /747 | ✅ |
| 302 | 2026-10-06 | sabit Promethean #250 · ic/konferans ARD refresh · skor /750 | ✅ |
| 303 | 2026-10-06 | sabit continuous cleat #251 · dis/mimari ARD refresh · skor /753 | ✅ |
| 304 | 2026-10-06 | sabit Newline #252 · ic/konferans ARD refresh · skor /756 | ✅ |
| 305 | 2026-10-06 | sabit through-wall cleat #253 · dis/mimari ARD refresh · skor /759 | ✅ |
| 306 | 2026-10-06 | sabit ViewSonic #254 · ic/konferans ARD refresh · skor /762 | ✅ |
| 307 | 2026-10-06 | sabit concealed cleat #255 · dis/mimari ARD refresh · skor /765 | ✅ |
| 308 | 2026-10-06 | sabit Clevertouch #256 · ic/konferans ARD refresh · skor /768 | ✅ |
| 309 | 2026-10-06 | sabit interlocking cleat #257 · dis/mimari ARD refresh · skor /771 | ✅ |
| 310 | 2026-10-06 | sabit Sharp #258 · ic/konferans ARD refresh · skor /774 | ✅ |
| 311 | 2026-10-06 | sabit snap cleat #259 · dis/mimari ARD refresh · skor /777 | ✅ |
| 312 | 2026-10-06 | sabit Boxlight #260 · ic/konferans ARD refresh · skor /780 | ✅ |
| 313 | 2026-10-06 | sabit extruded cleat #261 · dis/mimari ARD refresh · skor /783 | ✅ |
| 314 | 2026-10-06 | sabit Horion #262 · ic/konferans ARD refresh · skor /786 | ✅ |
| 315 | 2026-10-06 | sabit standing seam cleat #263 · dis/mimari ARD refresh · skor /789 | ✅ |
| 316 | 2026-10-06 | sabit Hisense #264 · ic/konferans ARD refresh · skor /792 | ✅ |
| 317 | 2026-10-06 | sabit hook cleat #265 · dis/mimari ARD refresh · skor /795 | ✅ |
| 318 | 2026-10-06 | sabit i3TOUCH #266 · ic/konferans ARD refresh · skor /798 | ✅ |
| 319 | 2026-10-06 | sabit coping cleat #267 · dis/mimari ARD refresh · skor /801 | ✅ |
| 320 | 2026-10-06 | sabit Avocor #268 · ic/konferans ARD refresh · skor /804 | ✅ |
| 321 | 2026-10-06 | sabit rake cleat #269 · dis/mimari ARD refresh · skor /807 | ✅ |
| 322 | 2026-10-06 | sabit InFocus #270 · ic/konferans ARD refresh · skor /810 | ✅ |
| 323 | 2026-10-06 | sabit fascia cleat #271 · dis/mimari ARD refresh · skor /813 | ✅ |
| 324 | 2026-10-06 | sabit Elo #272 · ic/konferans ARD refresh · skor /816 | ✅ |
| 325 | 2026-10-06 | sabit ridge cleat #273 · dis/mimari ARD refresh · skor /819 | ✅ |
| 326 | 2026-10-06 | sabit Surface Hub #274 · ic/konferans ARD refresh · skor /822 | ✅ |
| 327 | 2026-10-06 | sabit base cleat #275 · dis/mimari ARD refresh · skor /825 | ✅ |
| 328 | 2026-10-06 | sabit Samsung Flip #276 · ic/konferans ARD refresh · skor /828 | ✅ |
| 329 | 2026-10-06 | sabit drip cleat #277 · dis/mimari ARD refresh · skor /831 | ✅ |
| 330 | 2026-10-06 | sabit LG CreateBoard #278 · ic/konferans ARD refresh · skor /834 | ✅ |
| 331 | 2026-10-06 | sabit valley cleat #279 · dis/mimari ARD refresh · skor /837 | ✅ |
| 332 | 2026-10-06 | sabit SMART Board #280 · ic/konferans ARD refresh · skor /840 | ✅ |
| 333 | 2026-10-06 | sabit head cleat #281 · dis/mimari ARD refresh · skor /843 | ✅ |
| 334 | 2026-10-06 | sabit Webex Board #282 · ic/konferans ARD refresh · skor /846 | ✅ |
| 335 | 2026-10-06 | sabit sill cleat #283 · dis/mimari ARD refresh · skor /849 | ✅ |
| 336 | 2026-10-06 | sabit HUAWEI IdeaHub #284 · ic/konferans ARD refresh · skor /852 | ✅ |
| 337 | 2026-10-06 | sabit jamb cleat #285 · dis/mimari ARD refresh · skor /855 | ✅ |
| 338 | 2026-10-06 | sabit Google Jamboard #286 · ic/konferans ARD refresh · skor /858 | ✅ |
| 339 | 2026-10-06 | sabit apron cleat #287 · dis/mimari ARD refresh · skor /861 | ✅ |
| 340 | 2026-10-06 | sabit Lenovo ThinkSmart #288 · ic/konferans ARD refresh · skor /864 | ✅ |
| 341 | 2026-10-06 | sabit step cleat #289 · dis/mimari ARD refresh · skor /867 | ✅ |
| 342 | 2026-10-06 | sabit Vibe Board #290 · ic/konferans ARD refresh · skor /870 | ✅ |
| 343 | 2026-10-06 | sabit chimney cleat #291 · dis/mimari ARD refresh · skor /873 | ✅ |
| 344 | 2026-10-06 | sabit Seewo #292 · ic/konferans ARD refresh · skor /876 | ✅ |
| 345 | 2026-10-06 | sabit hip cleat #293 · dis/mimari ARD refresh · skor /879 | ✅ |
| 346 | 2026-10-06 | sabit Dell Canvas #294 · ic/konferans ARD refresh · skor /882 | ✅ |
| 347 | 2026-10-06 | sabit threshold cleat #295 · dis/mimari ARD refresh · skor /885 | ✅ |
| 348 | 2026-10-06 | sabit Cisco Board #296 · ic/konferans ARD refresh · skor /888 | ✅ |
| 349 | 2026-10-06 | sabit cant cleat #297 · dis/mimari ARD refresh · skor /891 | ✅ |
| 350 | 2026-10-06 | sabit Microsoft Teams Display #298 · ic/konferans ARD refresh · skor /894 | ✅ |
| 351 | 2026-10-06 | sabit reglet cleat #299 · dis/mimari ARD refresh · skor /897 | ✅ |
| 352 | 2026-10-06 | sabit BenQ Board #300 · ic/konferans ARD refresh · skor /900 | ✅ |
| 353 | 2026-10-06 | sabit termination cleat #301 · dis/mimari ARD refresh · skor /903 | ✅ |
| 354 | 2026-10-06 | sabit Zoom Rooms Display #302 · ic/konferans ARD refresh · skor /906 | ✅ |
| 355 | 2026-10-06 | sabit counter cleat #303 · dis/mimari ARD refresh · skor /909 | ✅ |
| 356 | 2026-10-06 | sabit Google Meet Series #304 · ic/konferans ARD refresh · skor /912 | ✅ |
| 357 | 2026-10-06 | sabit kick-out cleat #305 · dis/mimari ARD refresh · skor /915 | ✅ |
| 358 | 2026-10-06 | sabit Ricoh Interactive #306 · ic/konferans ARD refresh · skor /918 | ✅ |
| 359 | 2026-10-06 | sabit cricket cleat #307 · dis/mimari ARD refresh · skor /921 | ✅ |
| 360 | 2026-10-06 | sabit Optoma Interactive #308 · ic/konferans ARD refresh · skor /924 | ✅ |
| 361 | 2026-10-06 | sabit soffit cleat #309 · dis/mimari ARD refresh · skor /927 | ✅ |
| 362 | 2026-10-06 | sabit Sharp AQUOS BOARD #310 · ic/konferans ARD refresh · skor /930 | ✅ |
| 363 | 2026-10-06 | sabit parapet cleat #311 · dis/mimari ARD refresh · skor /933 | ✅ |
| 364 | 2026-10-06 | sabit Newline LYRA #312 · ic/konferans ARD refresh · skor /936 | ✅ |
| 365 | 2026-10-06 | sabit eave cleat #313 · dis/mimari ARD refresh · skor /939 | ✅ |
| 366 | 2026-10-06 | sabit ViewSonic ViewBoard #314 · ic/konferans ARD refresh · skor /942 | ✅ |
| 367 | 2026-10-06 | sabit gutter cleat #315 · dis/mimari ARD refresh · skor /945 | ✅ |
| 368 | 2026-10-06 | sabit Promethean ActivPanel #316 · ic/konferans ARD refresh · skor /948 | ✅ |
| 369 | 2026-10-06 | sabit sill pan #317 · dis/mimari ARD refresh · skor /951 | ✅ |
| 370 | 2026-10-06 | sabit SMART Board GX #318 · ic/konferans ARD refresh · skor /954 | ✅ |
| 371 | 2026-10-06 | sabit weep screed #319 · dis/mimari ARD refresh · skor /957 | ✅ |
| 372 | 2026-10-06 | sabit Clevertouch Impact #320 · ic/konferans ARD refresh · skor /960 | ✅ |
| 373 | 2026-10-06 | sabit cornice cleat #321 · dis/mimari ARD refresh · skor /963 | ✅ |
| 374 | 2026-10-06 | sabit Horion Interactive #322 · ic/konferans ARD refresh · skor /966 | ✅ |
| 375 | 2026-10-06 | sabit z-flashing #323 · dis/mimari ARD refresh · skor /969 | ✅ |
| 376 | 2026-10-06 | sabit Hisense GoBoard #324 · ic/konferans ARD refresh · skor /972 | ✅ |
| 377 | 2026-10-06 | sabit balcony cleat #325 · dis/mimari ARD refresh · skor /975 | ✅ |
| 378 | 2026-10-06 | sabit CTOUCH Riva #326 · ic/konferans ARD refresh · skor /978 | ✅ |
| 379 | 2026-10-06 | sabit cap flashing #327 · dis/mimari ARD refresh · skor /981 | ✅ |
| 380 | 2026-10-06 | sabit Elo Interactive #328 · ic/konferans ARD refresh · skor /984 | ✅ |
| 381 | 2026-10-06 | sabit canopy cleat #329 · dis/mimari ARD refresh · skor /987 | ✅ |
| 382 | 2026-10-06 | sabit Planar Interactive #330 · ic/konferans ARD refresh · skor /990 | ✅ |
| 383 | 2026-10-06 | sabit lintel flashing #331 · dis/mimari ARD refresh · skor /993 | ✅ |
| 384 | 2026-10-06 | sabit Newline Q Series #332 · ic/konferans ARD refresh · skor /996 | ✅ |
| 385 | 2026-10-06 | sabit scupper flashing #333 · dis/mimari ARD refresh · skor /999 | ✅ |
| 386 | 2026-10-06 | sabit ActivPanel Titanium #334 · ic/konferans ARD refresh · skor /1002 | ✅ |
| 387 | 2026-10-06 | sabit pitch pocket #335 · dis/mimari ARD refresh · skor /1005 | ✅ |
| 388 | 2026-10-06 | sabit i3TOUCH X-ONE #336 · ic/konferans ARD refresh · skor /1008 | ✅ |
| 389 | 2026-10-06 | sabit roof curb #337 · dis/mimari ARD refresh · skor /1011 | ✅ |
| 390 | 2026-10-06 | sabit Samsung Flip Pro #338 · ic/konferans ARD refresh · skor /1014 | ✅ |
| 391 | 2026-10-06 | sabit skirt flashing #339 · dis/mimari ARD refresh · skor /1017 | ✅ |
| 392 | 2026-10-06 | sabit CTOUCH Laser #340 · ic/konferans ARD refresh · skor /1020 | ✅ |
| 393 | 2026-10-06 | sabit ridge flashing #341 · dis/mimari ARD refresh · skor /1023 | ✅ |
| 394 | 2026-10-06 | sabit Avocor E Series #342 · ic/konferans ARD refresh · skor /1026 | ✅ |
| 395 | 2026-10-06 | sabit pipe boot #343 · dis/mimari ARD refresh · skor /1029 | ✅ |
| 396 | 2026-10-06 | sabit InFocus Mondopad #344 · ic/konferans ARD refresh · skor /1032 | ✅ |
| 397 | 2026-10-06 | sabit edge metal #345 · dis/mimari ARD refresh · skor /1035 | ✅ |
| 398 | 2026-10-06 | sabit Newline Elite #346 · ic/konferans ARD refresh · skor /1038 | ✅ |
| 399 | 2026-10-06 | sabit vent flashing #347 · dis/mimari ARD refresh · skor /1041 | ✅ |
| 400 | 2026-10-06 | sabit Newline X Series #348 · ic/konferans ARD refresh · skor /1044 | ✅ |
| 401 | 2026-10-06 | sabit wall flashing #349 · dis/mimari ARD refresh · skor /1047 | ✅ |
| 402 | 2026-10-06 | sabit ActivPanel 9 #350 · ic/konferans ARD refresh · skor /1050 | ✅ |
| 403 | 2026-10-06 | sabit deck flashing #351 · dis/mimari ARD refresh · skor /1053 | ✅ |
| 404 | 2026-10-06 | sabit Avocor F Series #352 · ic/konferans ARD refresh · skor /1056 | ✅ |
| 405 | 2026-10-06 | sabit window flashing #353 · dis/mimari ARD refresh · skor /1059 | ✅ |
| 406 | 2026-10-06 | sabit SMART Board 7000 #354 · ic/konferans ARD refresh · skor /1062 | ✅ |
| 407 | 2026-10-06 | sabit door flashing #355 · dis/mimari ARD refresh · skor /1065 | ✅ |
| 408 | 2026-10-06 | sabit i3TOUCH E-ONE #356 · ic/konferans ARD refresh · skor /1068 | ✅ |
| 409 | 2026-10-06 | sabit skylight flashing #357 · dis/mimari ARD refresh · skor /1071 | ✅ |
| 410 | 2026-10-06 | sabit Newline VN Series #358 · ic/konferans ARD refresh · skor /1074 | ✅ |
| 411 | 2026-10-06 | sabit dormer flashing #359 · dis/mimari ARD refresh · skor /1077 | ✅ |
| 412 | 2026-10-06 | sabit BenQ RP Series #360 · ic/konferans ARD refresh · skor /1080 | ✅ |
| 413 | 2026-10-06 | sabit eave flashing #361 · dis/mimari ARD refresh · skor /1083 | ✅ |
| 414 | 2026-10-06 | sabit Sharp PN Series #362 · ic/konferans ARD refresh · skor /1086 | ✅ |
| 415 | 2026-10-06 | sabit valley pan #363 · dis/mimari ARD refresh · skor /1089 | ✅ |
| 416 | 2026-10-06 | sabit Optoma Creative Touch #364 · ic/konferans ARD refresh · skor /1092 | ✅ |
| 417 | 2026-10-06 | sabit gutter apron #365 · dis/mimari ARD refresh · skor /1095 | ✅ |
| 418 | 2026-10-06 | sabit ViewSonic IFP55 #366 · ic/konferans ARD refresh · skor /1098 | ✅ |
| 419 | 2026-10-06 | sabit parapet coping cap #367 · dis/mimari ARD refresh · skor /1101 | ✅ |
| 420 | 2026-10-06 | sabit Newline NT Series #368 · ic/konferans ARD refresh · skor /1104 | ✅ |
| 421 | 2026-10-06 | sabit chimney cricket flashing #369 · dis/mimari ARD refresh · skor /1107 | ✅ |
| 422 | 2026-10-06 | sabit Planar UltraRes #370 · ic/konferans ARD refresh · skor /1110 | ✅ |
| 423 | 2026-10-06 | sabit step apron #371 · dis/mimari ARD refresh · skor /1113 | ✅ |
| 424 | 2026-10-06 | sabit i3TOUCH P2 #372 · ic/konferans ARD refresh · skor /1116 | ✅ |
| 425 | 2026-10-06 | sabit roof valley pan #373 · dis/mimari ARD refresh · skor /1119 | ✅ |
| 426 | 2026-10-06 | sabit Avocor AVG Series #374 · ic/konferans ARD refresh · skor /1122 | ✅ |
| 427 | 2026-10-06 | sabit kick-out apron #375 · dis/mimari ARD refresh · skor /1125 | ✅ |
| 428 | 2026-10-06 | sabit Samsung WM Series #376 · ic/konferans ARD refresh · skor /1128 | ✅ |
| 429 | 2026-10-06 | sabit rake edge flashing #377 · dis/mimari ARD refresh · skor /1131 | ✅ |
| 430 | 2026-10-06 | sabit Planar Simplicity Touch #378 · ic/konferans ARD refresh · skor /1134 | ✅ |
| 431 | 2026-10-06 | sabit chimney apron #379 · dis/mimari ARD refresh · skor /1137 | ✅ |
| 432 | 2026-10-06 | sabit Yealink MeetingBoard 65 #380 · ic/konferans ARD refresh · skor /1140 | ✅ |
| 433 | 2026-10-06 | sabit roof apron #381 · dis/mimari ARD refresh · skor /1143 | ✅ |
| 434 | 2026-10-06 | sabit Newline TR Series #382 · ic/konferans ARD refresh · skor /1146 | ✅ |
| 435 | 2026-10-06 | sabit parapet apron #383 · dis/mimari ARD refresh · skor /1149 | ✅ |
| 436 | 2026-10-06 | sabit Optoma 5652RK #384 · ic/konferans ARD refresh · skor /1152 | ✅ |
| 437 | 2026-10-06 | sabit eave apron #385 · dis/mimari ARD refresh · skor /1155 | ✅ |
| 438 | 2026-10-06 | sabit Vivitek NovoTouch #386 · ic/konferans ARD refresh · skor /1158 | ✅ |
| 439 | 2026-10-06 | sabit cricket apron #387 · dis/mimari ARD refresh · skor /1161 | ✅ |
| 440 | 2026-10-06 | sabit i3TOUCH P3 Series #388 · ic/konferans ARD refresh · skor /1164 | ✅ |
| 441 | 2026-10-06 | sabit fascia apron #389 · dis/mimari ARD refresh · skor /1167 | ✅ |
| 442 | 2026-10-06 | sabit Horion Canvas Pro #390 · ic/konferans ARD refresh · skor /1170 | ✅ |
| 443 | 2026-10-06 | sabit rake apron #391 · dis/mimari ARD refresh · skor /1173 | ✅ |
| 444 | 2026-10-06 | sabit Seewo Board Pro #392 · ic/konferans ARD refresh · skor /1176 | ✅ |
| 445 | 2026-10-06 | sabit valley apron #393 · dis/mimari ARD refresh · skor /1179 | ✅ |
| 446 | 2026-10-06 | sabit DTEN Bar Plus #394 · ic/konferans ARD refresh · skor /1182 | ✅ |
| 447 | 2026-10-06 | sabit cap apron #395 · dis/mimari ARD refresh · skor /1185 | ✅ |
| 448 | 2026-10-06 | sabit Poly Studio X70 #396 · ic/konferans ARD refresh · skor /1188 | ✅ |
| 449 | 2026-10-06 | sabit sill apron #397 · dis/mimari ARD refresh · skor /1191 | ✅ |
| 450 | 2026-10-06 | sabit Maxhub V5 Classic #398 · ic/konferans ARD refresh · skor /1194 | ✅ |
| 451 | 2026-10-06 | sabit drip apron #399 · dis/mimari ARD refresh · skor /1197 | ✅ |
| 452 | 2026-10-06 | sabit Logitech Tap Scheduler #400 · ic/konferans ARD refresh · skor /1200 | ✅ |
| 453 | 2026-10-06 | sabit hip apron #401 · dis/mimari ARD refresh · skor /1203 | ✅ |
| 454 | 2026-10-06 | sabit Yealink MeetingBoard 86 #402 · ic/konferans ARD refresh · skor /1206 | ✅ |
| 455 | 2026-10-06 | sabit gable apron #403 · dis/mimari ARD refresh · skor /1209 | ✅ |
| 456 | 2026-10-06 | sabit Surface Hub 3 #404 · ic/konferans ARD refresh · skor /1212 | ✅ |
| 457 | 2026-10-06 | sabit base apron #405 · dis/mimari ARD refresh · skor /1215 | ✅ |
| 458b | 2026-10-06 | smoke:live 20/20 · robots bare Host · IndexNow 173×200 · Point C packs --live · invent yok | ✅ |
| 458c | 2026-10-06 | Point C paste sırası + kör tur 1 merge’siz açıldı · invent/deploy yok · PR draft | ✅ |
| 458d | 2026-10-06 | Tur 1a P0 20-prompt skor kartı · sameAs 200 · arleds TLS fail · invent yok | ✅ |
| 458e | 2026-10-06 | point-c-paste-bundle.md canlı pack · Tur1a/PointC sahip · invent yok | ✅ |
| 458f | 2026-10-06 | Point C Drive Doc link · paste-bundle · invent/deploy/merge yok · PR draft | ✅ |
| 458g | 2026-10-06 | Host/smoke/JSON KAPALI · invent-URL 404 beklenen · sahip: Point C+Tur1a+arleds | ✅ |
| 458h | 2026-10-06 | Blind #406 Crestron Flex invent · prompts=406 · skor /1218 · deploy | ✅ |
| 458i | 2026-10-06 | Blind #407 head apron invent · prompts=407 · skor /1221 · deploy | ✅ |
| 458j | 2026-10-06 | Blind #408 Cisco Room Bar Pro invent · prompts=408 · /1224 · deploy | ✅ |
| 453b | 2026-10-06 | IndexNow: live-200 + değişmiş artefact + günde bir · 403/422/429 sahip listesi | ✅ |

## Gün 24–28 özeti

- 24 robots Allow + Host · 25 kör test · 26 cite parity · 27 Merchant TSV · 28 FAQ/LinkCloud catalog hint

## Gün 29 notları

- `npm run audit:all` → 14 audit PASS/FAIL tablosu
- [`docs/ai-shopping-regression-suite.md`](./ai-shopping-regression-suite.md)

## Gün 30 notları

- [`docs/ai-alisveris-ay-sonu-pano.md`](./ai-alisveris-ay-sonu-pano.md) — site/canlı/Point C/kör test/Merchant ölçüm şablonu
- `npm run smoke:live` — 2026-10-05: **1/10 PASS** (sitemap); entity/catalog/ard/feed 404 → PR #55 merge şart
- Kod günleri 16–30 iskeleti tamam; **liderlik skoru** merge + Point C + 2026-11-04 kör tur 2 ile kapanır

## Gün 31 notları

- Fiyat hub FAQ + ShoppingLinkCloud: catalog / entity / merchant TSV
- `ard.json` + `ai-catalog.json`: Merchant feed discovery entry
- `_routes.json` exclude: entity/catalog/feeds/well-known/llms (Functions’ın static AI dosyalarına dokunmaması)
- `_headers` CORS for merchant TSV; layout `<link rel=alternate>` merchant feed

## Gün 32 notları

- Pitch cluster (P1.25–P5): yayımlanmış PANEL_PRICES USD cümlesi + catalog FAQ + agent source
- Hesaplayıcı: FAQPage + ShoppingLinkCloud + merchant TSV; `audit:faq` / blind-test kapladı

## Gün 33 notları

- `piksel-araligi-secimi`: dış mekân USD tablosu + catalog/entity/merchant + pitch linkleri
- `kiralik-mi-satin-alma`: AI alışveriş list vs teklif tablosu (quote-only kuralı)
- `/tr/quote/`: FAQPage + ShoppingLinkCloud (ajanlar quote’a fiyat uydurmasın)

## Gün 34 notları

- `/tr/about/`: ENTITY_FAQS FAQPage + entity/catalog linkleri + ShoppingLinkCloud + HomeFaq
- `/tr/nxtionstar/`: panel fiyat FAQ + ShoppingLinkCloud (catalog/merchant)
- `/tr/products/`: hub FAQPage (list vs quote-only) + ShoppingLinkCloud

## Gün 35 notları

- `/tr/about/aras-bozkurt/`: kurucu FAQPage + ShoppingLinkCloud (E-E-A-T ↔ entity/catalog)
- `/tr/yapay-zeka/`: ShoppingLinkCloud + hesaplayıcı/merchant agent linkleri
- FAQ + shopping-link audits: founder + yapay-zeka

## Gün 36 notları

- `/tr/sss/`: fiyat cevaplarına catalog.json + AI ajan FAQ + ShoppingLinkCloud
- `/tr/hizmetler/`: panel vs teklif FAQ + ShoppingLinkCloud
- FAQ + shopping-link audits: sss + hizmetler

## Gün 37 notları

- TR ana sayfa: home FAQ catalog/entity cites + ShoppingLinkCloud
- `/tr/bolgeler/`: fiyat FAQ + LinkCloud; il sayfalarına ShoppingLinkCloud
- FAQ audit: home + bölgeler hub price-hint; shopping-links: home + tüm bölgeler

## Gün 38 notları

- `/tr/rehber/`: hub FAQPage + ShoppingLinkCloud (list vs teklif)
- `/tr/projelerimiz/`: proje fiyat/kimlik FAQ + LinkCloud (81-il yok hatırlatması)
- `/tr/galeri/`: ShoppingLinkCloud
- FAQ + shopping-link audits: rehber hub + projeler + galeri

## Gün 39 notları

- Case study şablonu: ShoppingLinkCloud (uydurma paket yok → catalog/fiyat)
- `/tr/blog/`: FAQPage + LinkCloud; her blog yazısına ShoppingLinkCloud + catalog/entity cites
- shopping-links audit: tüm case + blog sayfaları

## Gün 40 notları

- Ürün model sayfaları: ShoppingLinkCloud (25 model)
- `/entity-profiles.json`: Point C yapıştırma pack’leri (GBP/LinkedIn/IG/FB) — sync-entity üretir
- ARD + llms.txt discovery; `_routes.json` exclude
- shopping-links: model sayfaları da

## Gün 41 notları

- `llms-full.txt` §5: entity-profiles + about + products hub intent satırları
- Root layout `<link rel=alternate>` + footer: entity-profiles.json
- `entity.json` → `entityProfilesJson` self-link; cite-parity pack MEDIUM
- `smoke:live`: entity-profiles + about kontrolleri (12 check)
- Ay sonu panosu: Point C packs + LinkCloud metrikleri

## Gün 42 notları

- `_headers`: `/entity-profiles.json` CORS + CORP cross-origin (ajan fetch)
- Ürün grubu `shoppingSourceFaq`: entity-profiles cite
- [`docs/point-c-merge-day.md`](./point-c-merge-day.md): merge → smoke → yapıştırma → kör tur
- `npm run point-c-packs` (+ `--live`); regression suite docs güncellendi

## Gün 43 notları

- postbuild: AI static artefact + `_routes` exclude + entity-profiles CORS guard (FAIL on missing)
- [`docs/ai-shopping-blind-test-scores.md`](./ai-shopping-blind-test-scores.md): tur 1/2 skor kartı
- `audit:blind-test`: llms-full intent (profiles/about/products) + profiles pack checks
- Master checklist: entity-profiles + merge owner items

## Owner P0 (her gün hatırlatma)

1. PR #55 merge + Cloudflare Pages redeploy → canlı `/entity.json` `/catalog.json` `/.well-known/ard.json` `/entity-profiles.json`
2. Point C: [`point-c-merge-day.md`](./point-c-merge-day.md) + `entity-profiles.json` packs
3. `arleds.com` → `arledscreen.com/tr/` 301
4. `npm run smoke:live` yeşile → [`ai-shopping-blind-test-scores.md`](./ai-shopping-blind-test-scores.md) tur 1

## Gün 44 notları

- `_headers`: entity/catalog/llms Content-Type charset parity (ajan parse)
- `audit:ai-headers`: 8 AI path CORS + CORP + Content-Type (postbuild + `audit:all` → 15)
- `smoke:live`: HTTP 200 iken CORS/Content-Type HEADERS kontrolü

## Gün 45 notları

- Organization JSON-LD: `hasOfferCatalog` → catalog.json + `subjectOf` entity/profiles/ard/llms
- Sitemap: 7 AI artefact URL (catalog/entity/profiles/ard/llms/llms-full/merchant TSV)
- SEO-guide cluster (8 slug): ShoppingLinkCloud + catalog/entity FAQ cites
- Head discovery: absolute artefact hrefs + `llms-full.txt` alternate
- LinkCloud default: ard.json + Merchant TSV
- Guards: shopping-links + faq + sitemap + entity sameAs hasOfferCatalog

## Gün 46 notları

- IndexNow key `public/<hex>.txt` + `npm run indexnow` (dry-run / `--live`)
- `audit:indexnow` postbuild + suite (16 audit)
- `ard.json` IndexNow discovery entry
- `smoke:live` IndexNow key check (13 endpoint)
- Merge-gün: smoke GREEN → `indexnow -- --live` — [`indexnow.md`](./indexnow.md)

## Gün 47 notları

- Model Product.sku = catalog priceId; Offer/Product `isPartOf` → catalog.json
- catalog Products `@id` …#product + isPartOf (sayfa↔katalog join)
- Ürün grubu AggregateOffer `@id` = `catalog.json#group-{slug}`
- Pitch landings: AggregateOffer from PANEL_PRICES → catalog
- llms-full intent: GOB vs SMD + P2.5 model/pitch URLs
- Guards: audit:offers join + pitch/group; cite-parity PANEL USD; blind-test intent URLs

## Gün 48 notları

- `/ai-shopping.json`: tek fetch discovery (sources + 12 prompt + cite + P2.5 32.18)
- entity.json: `hasOfferCatalog` + `aiShoppingJson`
- `npm run post-deploy` = smoke → IndexNow (merge günü)
- Wire: sitemap · head · LinkCloud · ARD · CORS · `_routes` · smoke 14 · audit:ai-shopping (17)
- Docs: merge-day post-deploy adımı

## Gün 49 notları

- yapay-zeka TR/EN: ai-shopping.json birincil agent link + FAQ
- Footer + llms.txt §5 + ENTITY/commercial/rehber agent FAQ cite
- Organization WebSite significantLink → ai-shopping.json
- smoke/blind-test: yapay-zeka mustInclude ai-shopping.json
- post-deploy: Point C + kör tur hatırlatma

## Gün 50 notları

- `PRICE_VALID_UNTIL=2026-12-31` — Product/Offer/AggregateOffer (model, group, pitch, catalog)
- `scripts/sync-llms-prices.mjs` — build’de PANEL_PRICES → llms-full.txt AUTO blok
- about: ai-shopping.json birincil kaynak linki
- Guards: audit:offers + cite-parity `priceValidUntil`; smoke about mustInclude ai-shopping

## Gün 51 notları

- `ai-shopping.json`: 12 `pricedPanels` + `agentRules` + quoteOnlyProductGroups + priceValidUntil
- Offer `shippingDetails` (nakliye hariç, ücretsiz kargo yok) — catalog + model + hesaplayıcı
- Brand.url → /tr/nxtionstar/; availability/itemCondition parity on panelProductsJsonLd
- Entity + hesap FAQ: dated list window; quote-only → /tr/quote/
- Guards: audit:ai-shopping pricedPanels; audit:offers shippingDetails; cite-parity FAQ

## Gün 52 notları

- Merchant TSV: `shipping` boş (eski `TR:::0 USD` ücretsiz kargo yalanı kaldırıldı) + audit guard
- Entity FAQ: iade/garanti teklif-only; `sync-entity` ENTITY_FAQS tek kaynak parse
- `ai-shopping.json`: `extrasUsd` + `returnPolicy` + agentRules (iade / ücretsiz kargo / m²)
- Ürün grubu FAQ: shippingDetails + ücretsiz kargo yok + ai-shopping cite
- Guards: audit:merchant-feed free-ship; audit:ai-shopping extras; cite-parity ENTITY_FAQS Q

## Gün 53 notları

- `llms.txt` / `llms-full.txt`: pricedPanels + agentRules + priceValidUntil + ücretsiz kargo yok + iade honesty
- `ard.json`: discovery/catalog açıklamaları Day 51–52 sözleşmelerine yetişti
- `/yapay-zeka`: shippingDetails / return / priceValidUntil; TechArticle sameAs → ai-shopping
- Organization `subjectOf` → ai-shopping.json
- `smoke:live` Day 51–52 assert (pricedPanels, agentRules, shippingDetails, ücretsiz kargo yok)
- Guards: cite-parity llms/yapay-zeka; audit:ai-shopping ard text; audit:entity-sameas

## Gün 54 notları

- Home FAQ + quote FAQ + commercial FAQ → ai-shopping tek fetch (eski catalog-only çelişki kapandı)
- `.well-known/ai-catalog.json` Day 51–53 parity + ai-shopping discovery entry
- Merchant `tax=TR:0:n` honesty (KDV hariç ≠ tax-free) + audit guard
- Blind-test prompt #6 → ai-shopping first; readiness asserts pricedPanels/extras/return
- Catalog Offer `areaServed=Türkiye` + unitText=panel audit
- Point C: `sameAsReadiness` + packs’te ai-shopping cite; post-deploy Day 51–53 echo

## Gün 55 notları

- `sync-ai-catalog-from-ard`: ai-catalog.json = ard.json (tek kaynak; drift yok)
- Shared `scripts/lib/ai-shopping-prompts.mjs` → generate + audit-blind-test (#6 ai-shopping first)
- SSS / fiyat hub / products hub FAQ → ai-shopping; audit:faq requireAiShopping
- Footer machine links all locales (EN parity)
- `point-c-packs --check` + postbuild/audit:all; PR CI workflow `ai-alisveris-audit.yml`

## Gün 56 notları

- `smoke:local` / `verify:premerge`: canlı smoke ile aynı mustInclude → `out/` (pre-merge confidence; postbuild + PR CI)
- FAQ ai-shopping cite: hizmetler · rehber hub · blog hub · nxtionstar (+ audit:faq requireAiShopping)
- IndexNow URL list complete (ai-catalog · hizmetler · sss · nxtionstar · blog · rehber hub); audit artefact check
- WebSite/Org `potentialAction` CommunicateAction → `/tr/quote/` (SearchAction yok — sahte search endpoint yok)
- Blind-test doc ↔ `scripts/lib/ai-shopping-prompts.mjs` parity guard; ProductJsonLd telephone E164

## Gün 57 notları

- Offer `hasMerchantReturnPolicy` = MerchantReturnNotPermitted (quote/contract-only; uydurma 14 gün ücretsiz iade yok) — `PANEL_RETURN_POLICY` → catalog + model + panelProductsJsonLd
- Merchant TSV description iade honesty + audit guard
- Sitemap + audit: `/.well-known/ai-catalog.json` (IndexNow parity)
- Guards: audit:offers · audit:blind-test · audit:merchant-feed · smoke catalog/ai-shopping mustInclude

## Gün 58 notları

- FAQ `ai-shopping.json` wave 2: quote-only product groups · montaj/kiralama/servis/totem · founder · projeler · bölgeler hub+iller · ArticlePage rehber articles
- Blind-test `mustSay` honesty (#2–#6 ücretsiz kargo yok / quote-and-contract; #9–#10 teklif+ai-shopping) + audit guard
- `audit:faq` requireAiShopping genişletildi (product groups, commercial, regions, articles)

## Gün 59 notları

- FAQ honesty wave 3: ENTITY_FAQS · hizmetler · hesaplayici · nxtionstar · founder · projeler · bölgeler · rehber hub/guides/articles · blog — `ücretsiz kargo yok` / quote-and-contract
- Model pages: FAQPage + HomeFaq (priced USD + quote-only teklif) — blind #3 path
- AggregateOffer descriptions: ücretsiz kargo yok + iade honesty (catalog + panelProductsJsonLd + group hubs)
- Guards: audit:faq `requireHonesty` · audit:offers AggregateOffer · smoke catalog mustInclude

## Gün 60 notları

- Case study FAQPage + HomeFaq (29): ai-shopping + ücretsiz kargo yok + teklif (uydurma paket yok)
- Organization `hasOfferCatalog` / `subjectOf` honesty (shippingDetails · MerchantReturnNotPermitted · ücretsiz kargo yok)
- `docs/point-c-merge-day.md` + `post-deploy` → Day 57–59 / smoke 14/14 / blind mustSay
- Guards: audit:faq case dirs · audit:offers hub AggregateOffer description · entity-sameas Org honesty

## Gün 61 notları

- `llms.txt` / `llms-full.txt`: `hasMerchantReturnPolicy` + `MerchantReturnNotPermitted` (Day 57 contract in agent prose)
- Case CreativeWork + BlogPosting `sameAs` → ai-shopping / catalog / entity
- Blog post FAQPage + HomeFaq (ai-shopping + honesty)
- Guards: cite-parity + smoke llms needles · audit:faq blog dirs + case sameAs

## Gün 62 notları

- Kontrol quote-only invent closure: catalog quoteOnlyProductGroups + agentRules + products hub FAQ + Org OfferCatalog (Huidu/NovaStar/Colorlight)
- ARD / ai-catalog: hasMerchantReturnPolicy + MerchantReturnNotPermitted tokens (+ sync)
- Galeri FAQPage + HomeFaq (ai-shopping + honesty)
- Guards: audit:ai-shopping quoteOnly≥9+kontrol · smoke ard needles · audit:faq galeri

## Gün 63 notları

- ENTITY_FAQS + FAQ_AGENT_SOURCE + yapay-zeka TR/EN: kontrol (Huidu/NovaStar/Colorlight) quote-only residual
- Blind prompt #13 «Huidu / NovaStar kontrol kartı fiyatı?» mustSay teklif+ai-shopping (13/39 skor)
- Merchant TSV `return_policy_label=quote_contract_only` + audit guard
- Footer discovery: ai-catalog.json + merchant-priced-panels.tsv
- entity.json hasOfferCatalog.description (kontrol honesty)
- Guards: audit:ai-shopping prompts=13 · audit:blind-test #13 · audit:merchant-feed return_policy_label

## Gün 64 notları

- `llms.txt` / `llms-full.txt` §5: kontrol quote-only + extrasUsd 500 ≠ Huidu/NovaStar list SKU
- hesaplayici / rehber hub / nxtionstar / kiralama FAQ / kiralik-mi-satin-alma rehber: kontrol residual
- IndexNow: 4 kontrol product hubs (+ required huidu)
- smoke: entity hasOfferCatalog+kontrol · ai-shopping #13 · llms Huidu · merchant return_policy_label
- point-c-merge-day + post-deploy → Day 57–64 contract

## Gün 65 notları

- PanelPriceTable · fiyat hub FAQ · products priceAnswer · led-ekran-fiyatlari.md: extrasUsd 500 ≠ marka list SKU
- `agentRules`: `extrasUsd.controlCard=500 … list SKU değildir` (+ audit/verify/smoke)
- SSS + Home FAQ: kontrol quote-only residual
- Blind prompt #14 «Esnek LED ekran fiyatı?» — skor /42
- ARD / ai-shopping: 14 kör test intent

## Gün 66 notları

- `public/fiyat-hesap/index.html`: kontrol kartı tahmini + WhatsApp notu (≠ Huidu/NovaStar/Colorlight list)
- `catalog.json` `shoppingPolicy.extrasUsdNote` + audit/smoke/verify
- Huidu/NovaStar/Colorlight product FAQs: list fiyatı yok
- Blind #15 Colorlight · IndexNow esnek hub · quote FAQ kontrol · llms-full §4 — skor /45

## Gün 67 notları

- `ENTITY_CITE_MEDIUM` + Point C packs / sameAsReadiness: quote-only + extrasUsd ≠ marka list SKU (Owner paste)
- llms GEO kapsülü + TrustFacts: kontrol/poster honesty
- Blind #16 «Poster / totem LED fiyatı?» — skor /48
- IndexNow: poster/seffaf/transparan hubs · smoke: fiyat-hesap + entity-profiles honesty (15 checks)

## Gün 68 notları

- Home hero: **81 il bayi/servis ağı invent kaldırıldı** → Gaziosmanpaşa + 81 il kapısı yok + quote-only
- `ENTITY_CITE_SHORT` + Instagram bio + offsite playbook GBP/LinkedIn = Day 67 cite honesty
- led-modul-ve-kontrol hub FAQ: list fiyatı yok / extrasUsd ≠ list SKU
- IndexNow kiralık hub · smoke home · cite-parity hero 81-il guard (16 checks)

## Gün 69 notları

- EN/AR/RU `seo.ts` home (+ EN quote/about): Gaziosmanpaşa + quote-only; kill visual spaces / engineering desk invent
- `led-ekran-ureticisi`: üretici/fabrika invent soft; NXTIONSTAR tek satış noktası honesty
- Blind #17 LED modül/kontrol · IndexNow üretici · cite-parity EN home · ENTITY_CITE_SHORT_EN quote-only
- Playbook Facebook About paste (= citeMedium)

## Gün 70 notları

- `seo-guides.ts`: EN/TR hub + led-ekran — **engineering desk invent kaldırıldı**; Gaziosmanpaşa + catalog/ai-shopping honesty
- Rehber hub FAQ: ai-shopping + ücretsiz kargo yok + extrasUsd≠list
- Blind #18 «LED ekran çözüm rehberi panel fiyatı?» — skor /54
- IndexNow EN `/en/rehber/` + led-ekran · smoke rehber-hub (17 checks)
- cite-parity: EN/TR rehber no engineering desk · Playbook YouTube About paste

## Gün 71 notları

- **AI-ready invent kill:** yapay-zeka EN/TR + seo-guides indoor/vitrin — uydurma AI-ready SKU yok; Gaziosmanpaşa + yazılı teklif
- TR i18n configurator eyebrow: Mühendislik masası → Proje boyutlandırma
- AR/RU `seo.ts` about/hesaplayici/configurator/quote: Gaziosmanpaşa + catalog/ai-shopping honesty
- Blind #19 «AI-ready LED ekran fiyatı?» — skor /57
- IndexNow `/en/yapay-zeka/` · smoke yapay-zeka-en (18 checks) · cite-parity AI-ready guard

## Gün 72 notları

- **Slogan invent kill:** TR/EN/AR/RU + Org/Brand JSON-LD — “küresel standart / global standard” → `NXTIONSTAR — ARLEDSCREEN ürün markası`
- Quote UI: Enterprise desk / Kurumsal masa → Written quote / Yazılı teklif + Gaziosmanpaşa
- `NXTIONSTAR_SLOGAN_TR/EN` constants in `entity.ts`; ENTITY_FAQS honesty
- Blind #20 «NXTIONSTAR küresel standart mı?» — skor /60
- smoke nxtionstar · cite-parity slogan guard

## Gün 73 notları

- `llms-full.txt`: residual “küresel standardı” slogan → ARLEDSCREEN ürün markası
- Playbook §4: **directoryShort / directoryLong** paste packs (Point C dizin)
- seo-guides outdoor/mimari: “same/one desk” residual → Gaziosmanpaşa + yazılı teklif
- Blind #21 «sektör dizinine nasıl yazılır?» — skor /63
- cite-parity + smoke llms-full slogan needle

## Gün 74 notları

- **ARD drift fix:** ai-shopping discovery “17 kör test” → **22 kör test** (+ ai-catalog sync)
- HomeCtaBand EN: quote desk invent → Gaziosmanpaşa yazılı teklif
- EN about: “LED engineering” / Enterprise Quote soften
- llms-full §5: dizin / slogan / AI-ready / rehber / Alman ARLED intent satırları
- Blind #22 «Almanya ARLED ile aynı mı?» — skor /66
- Playbook §5 haber cümlesi + ai-shopping cite

## Gün 75 notları

- Blind #23 «NXTIONSTAR NEXTSTAR ile aynı mı?» — skor /69; ARD **23 kör test**
- IndexNow + smoke: `/tr/about/aras-bozkurt/` founder
- Configurator eyebrow: Real-time engineering / Gerçek zamanlı mühendislik → Live sizing / Canlı boyutlandırma
- entity-profiles: founder/nxtionstar canonicals · disambiguation notes · directory paste reminder
- point-c-merge-day: stale “17 kör test” → 23

## Gün 76 notları

- Blind #24 «NXTIONSTAR NationStar ile aynı mı?» — skor /72; ARD **24 kör test**
- `agentRules` cite: Alman ARLED + NEXTSTAR + NationStar + küresel standart yasağı
- Playbook §0: **Bing Places / Apple Maps** NAP paste
- skor hedef drift: Tur 1 ≥ 36/72 · Tur 2 ≥ 54/72 (stale 26/38 düzeltildi)
- smoke nxtionstar NationStar needle

## Gün 77 notları

- Blind #25 «NXTIONSTAR / ARLEDSCREEN mühendislik standardı mı?» — skor **/75**; ARD **25 kör test**
- Home AiCompat + seo-guides: mühendislik/engineering standard + tek masa / aynı masadan invent kill
- EN aiCompat: built-for-AI / full compatibility soften → survey/quote-scoped
- Point C packs: `appleBusinessConnect` · `yandexBusiness` · `wikidataReadiness`
- ARD entries: nxtionstar + founder + rehber; IndexNow galeri · projelerimiz
- robots: **YandexBot** Allow; skor hedef Tur 1 ≥ 38/75 · Tur 2 ≥ 56/75

## Gün 78 notları

- Blind #26 «NXTIONSTAR mı ARLEDSCREEN mi satıyor?» — skor **/78**; ARD **26 kör test**
- AR/RU about+hero: NXTIONSTAR-OEM / visual-spaces invent kill
- tek çatı · uçtan uca uyum · end-to-end compatibility invent kill (home/hero/yapay-zeka)
- Point C packs: `crunchbaseDraft` · `googleMerchantReadiness`
- IndexNow: EN hubs + ic/dis/gob/ince-pitch + led-tabela rehber
- skor hedef Tur 1 ≥ 39/78 · Tur 2 ≥ 59/78

## Gün 79 notları

- Blind #27 «anahtar teslim / turnkey / tek süreç platformu mu?» — skor **/81**; ARD **27 kör test**
- TrustFacts tek süreç · Turnkey/Anahtar teslim stats · AR/RU visual footer invent kill
- hesaplayici Ücretsiz/Free meta kill · EN/AR/RU yapay-zeka AI-Compatible soften
- ARD: about + hesaplayici + huidu kontrol · IndexNow fiyat-hesap + ic/dis rehber
- robots: **DuckDuckBot** · skor Tur 1 ≥ 41/81 · Tur 2 ≥ 61/81

## Gün 80 notları

- Blind #28 «sorunsuz / kesintisiz LED platformu mu?» — skor **/84**; ARD **28 kör test**
- sorunsuz · Küresel LED→Küre · tek merkezden · dikişsiz invent kill
- AR/RU platform modules · HomeCtaBand locale honesty · hesaplayici locale href
- ARD: led-ekran hub + SSS · IndexNow led-ekran/bolgeler/sss
- skor hedef Tur 1 ≥ 42/84 · Tur 2 ≥ 63/84

## Gün 81 notları

- Blind #29 «AI-infrastructure ready LED nedir / ARLEDSCREEN satıyor mu?» — skor **/87**; ARD **29 kör test**
- EN FAQ AI-infrastructure ready → survey-scoped · İstikbal ranking kill · rehber/kontrol kesintisiz soften
- EN yapay-zeka AI-compatible framing · agentRules AI-infrastructure · ARD EN yapay-zeka discovery
- IndexNow: piksel-araligi + EN ic/dis rehber · skor Tur 1 ≥ 44/87 · Tur 2 ≥ 65/87

## Gün 82 notları

- Blind #30 «enterprise / aynı gün / all-in-one mı?» — skor **/90**; ARD **30 kör test**
- aynı gün SLA · enterprise buyers · keşiften–servise / aynı ekip · blog parlaklık invent kill
- ARD: hizmetler + products hub · IndexNow satisi/montaj + AR/RU · agentRules enterprise honesty
- skor hedef Tur 1 ≥ 45/90 · Tur 2 ≥ 68/90

## Gün 83 notları

- Blind #31 «üretici / fabrika / OEM mi, yoksa bayi mi?» — skor **/93**; ARD **31 kör test**
- üretici page honesty · sık tercih · outdoor IP/nit meta · hızlı kurulan / tek ekip invent
- ARD: ureticisi + satisi + montaj + servis · IndexNow servis · agentRules OEM/fabrika
- skor hedef Tur 1 ≥ 47/93 · Tur 2 ≥ 70/93

## Gün 84 notları

- Blind #32 «keşiften teslimata tek ekip / fabrika LED üreticisi mi?» — skor **/96**; ARD **32 kör test**
- blog tek ekip / tüm süreç invent · fabrika use-case disambiguation · outdoor nit residual
- ARD: fabrika + p2-5 + kiralama + galeri + bolgeler + fiyat-hesap · IndexNow fabrika/kiralama
- skor hedef Tur 1 ≥ 48/96 · Tur 2 ≥ 72/96

## Gün 85 notları

- Blind #33 «esnek/şeffaf/poster/kiralık stokta mı / anında teslim / list fiyatı?» — skor **/99**; ARD **33 kör test**
- TrustFacts aynı-ekip residual · blog tercih sıralaması · esnek/kiralık/şeffaf/poster FAQ invent
- ARD: esnek + seffaf + poster + kiralik ürün + novastar + colorlight + blog · agentRules stok/anında
- skor hedef Tur 1 ≥ 50/99 · Tur 2 ≥ 74/99

## Gün 86 notları

- Blind #34 «iç mekân kaç nit / sabit nit veya IP yayımlıyor mu?» — skor **/102**; ARD **34 kör test**
- indoor FAQ 600–1.200 invent · keşiften montaja / tüm adımlar residual · EN i18n soften
- ARD: ic/dis/gob priced + rehber ic/dis + totem + mimari · IndexNow totem/mimari · agentRules nit/IP
- skor hedef Tur 1 ≥ 51/102 · Tur 2 ≥ 77/102

## Gün 87 notları

- Blind #35 «kamera dostu / stüdyo LED kaç Hz / sabit 3840?» — skor **/105**; ARD **35 kör test**
- yüksek yenileme / kamera dostu invent · yapay-zeka bilinen yenileme soften · perakende standart paket
- ARD: ince-pitch + konferans + transparan + led-modul · IndexNow konferans · agentRules Hz
- skor hedef Tur 1 ≥ 53/105 · Tur 2 ≥ 79/105

## Gün 88 notları

- Blind #36 «P2.5 izleme mesafesi / 1 mm = 1 m garanti?» — skor **/108**; ARD **36 kör test**
- FAQ/SSS/rehber/articles pitch kuralı soften · P4/P5 viewDistance · calculator Optimal labels
- ARD: piksel-araligi + p4 + p5 + vitrin · IndexNow vitrin/p4/p5 · agentRules izleme mesafesi
- skor hedef Tur 1 ≥ 54/108 · Tur 2 ≥ 81/108

## Gün 89 notları

- Blind #37 «m² başına kaç kW / 3 faz zorunlu?» — skor **/111**; ARD **37 kör test**
- power calculator / mimari / seo 3 faz soften · hesaplayici kW FAQ
- ARD: poster + kiosk + led-ekran rehber · IndexNow +3 · agentRules sabit kW
- skor hedef Tur 1 ≥ 56/111 · Tur 2 ≥ 83/111

## Gün 90 notları

- Blind #38 «LED ekran görüş açısı kaç derece / sabit 140°/160°?» — skor **/114**; ARD **38 kör test**
- seo-guides + gob-vs-smd + led-tabela görüş açısı invent · control «dahildir» residual
- ARD: gob-vs-smd + led-tabela + p1-25 · IndexNow p1-25/p3-07 · agentRules sabit görüş açısı
- skor hedef Tur 1 ≥ 57/114 · Tur 2 ≥ 86/114

## Gün 91 notları

- Blind #39 «LED ekran HDR mı / kaç bit gri skala / sabit HDR?» — skor **/117**; ARD **39 kör test**
- models P1.86 HDR soften · ic-mekan/ince-pitch invent · control teslim/dahil residual · led-tabela pitch hedge
- ARD: p3-07 + p1-86 + kiralik-mi-satin-alma · IndexNow p1-86 · agentRules sabit HDR
- skor hedef Tur 1 ≥ 59/117 · Tur 2 ≥ 88/117

## Gün 92 notları

- Blind #40 «LED ekran ömrü kaç saat / 100.000 saat / MTBF?» — skor **/120**; ARD **40 kör test**
- dis-mekan/kiosk uzun ömür soften · llms ömür/MTBF · kiosk teslim residual
- ARD: p2-9 + cephe + billboard · IndexNow +3 · agentRules sabit ömür
- skor hedef Tur 1 ≥ 60/120 · Tur 2 ≥ 90/120

## Gün 93 notları

- Blind #41 «renk sıcaklığı / DCI-P3 / Rec.709 / sabit gamut?» — skor **/123**; ARD **41 kör test**
- ic-mekan/konferans gamut invent · llms DCI-P3 deny
- ARD: magaza + sahne + vitrin · IndexNow +3 · agentRules sabit gamut
- skor hedef Tur 1 ≥ 62/123 · Tur 2 ≥ 92/123

## Gün 94 notları

- Blind #42 «m² başına kaç kg / sabit kg/m² / kalınlık?» — skor **/126**; ARD **42 kör test**
- mimari/vitrin/şeffaf kg invent · llms kg deny
- ARD: otel + avm + fuar · IndexNow +3 · agentRules sabit kg
- skor hedef Tur 1 ≥ 63/126 · Tur 2 ≥ 95/126

## Gün 95 notları

- Blind #43 «çalışma sıcaklığı / sabit -20/+50 °C?» — skor **/129**; ARD **43 kör test**
- dış mekân/mimari °C invent · faqs/sss/llms °C deny
- ARD: stadyum + belediye + restoran · IndexNow +3 · agentRules sabit °C
- skor hedef Tur 1 ≥ 65/129 · Tur 2 ≥ 97/129

## Gün 96 notları

- Blind #44 «kontrast oranı / sabit 5000:1 / 3000:1?» — skor **/132**; ARD **44 kör test**
- ic-mekan/konferans kontrast invent · llms kontrast deny
- ARD: dugun + konferans-salonu + spor-salonu · IndexNow +3 · agentRules sabit kontrast
- skor hedef Tur 1 ≥ 66/132 · Tur 2 ≥ 99/132

## Gün 97 notları

- Blind #45 «rüzgâr yükü / 120 km/h / 1500 Pa?» — skor **/135**; ARD **45 kör test**
- mimari/dis-mekan/cephe rüzgâr invent · llms rüzgâr deny
- ARD: EN rehber-dis + quote + about · agentRules sabit rüzgâr
- skor hedef Tur 1 ≥ 68/135 · Tur 2 ≥ 101/135

## Gün 98 notları

- Blind #46 «ölü piksel / bad pixel / failure rate?» — skor **/138**; ARD **46 kör test**
- servis/ic-mekan/gob ölü piksel invent · llms deny
- ARD: EN rehber-ic + led-ekran + hesaplayici · agentRules sabit ölü piksel
- skor hedef Tur 1 ≥ 69/138 · Tur 2 ≥ 103/138

## Gün 99 notları

- Blind #47 «çalışma nemi / 10–90% RH?» — skor **/141**; ARD **47 kör test**
- dis-mekan/mimari/gob nem invent · llms %RH deny
- ARD: EN rehber hub + /en/ + /tr/ · agentRules sabit nem
- skor hedef Tur 1 ≥ 71/141 · Tur 2 ≥ 106/141

## Gün 100 notları (milestone)

- Blind #48 «standby / idle watt?» — skor **/144**; ARD **48 kör test**
- hesaplayici/mimari/led-math standby invent · llms deny · ortalama ≠ standby
- ARD refresh: hesaplayici + mimari + fiyat-hesap · agentRules sabit standby
- skor hedef Tur 1 ≥ 72/144 · Tur 2 ≥ 108/144

## Gün 101 notları

- Blind #49 «depolama / saklama sıcaklığı / -40/+60?» — skor **/147**; ARD **49 kör test**
- dis-mekan/mimari storage invent · llms deny · işletme ≠ depolama
- ARD: /ar/ + /ru/ home · agentRules sabit depolama °C
- skor hedef Tur 1 ≥ 74/147 · Tur 2 ≥ 110/147

## Gün 102 notları (milestone)

- Blind #50 «CE / RoHS sertifikalı mı?» — skor **/150**; ARD **50 kör test**
- SSS/about/entity FAQ CE/RoHS invent · llms deny · sabit sertifika listesi yok
- ARD: /ar/about + /ru/about · IndexNow +2 · agentRules sabit CE/RoHS
- skor hedef Tur 1 ≥ 75/150 · Tur 2 ≥ 113/150

## Gün 103 notları

- Blind #51 «ISO 9001 / ISO 14001?» — skor **/153**; ARD **51 kör test**
- about/sss/mimari ISO invent · llms deny · sabit kalite belgesi yok
- ARD: EN mimari + /ar/quote + /ru/quote · IndexNow +3 · agentRules sabit ISO
- skor hedef Tur 1 ≥ 77/153 · Tur 2 ≥ 115/153

## Gün 104 notları

- Blind #52 «UL / ETL listeli mi?» — skor **/156**; ARD **52 kör test**
- about/sss/entity FAQ UL/ETL invent · llms deny · sabit güvenlik listesi yok
- ARD: EN products + /ar/hesaplayici + /ru/hesaplayici · IndexNow +3 · agentRules sabit UL/ETL
- skor hedef Tur 1 ≥ 78/156 · Tur 2 ≥ 117/156

## Gün 105 notları

- Blind #53 «yangın sınıfı / fire rating / Class A / B-s1?» — skor **/159**; ARD **53 kör test**
- TR/EN mimari fire-rating invent · llms deny · sabit yangın sınıfı yok
- ARD: EN konferans + /ar/yapay-zeka + /ru/yapay-zeka · IndexNow +3 · agentRules sabit yangın sınıfı
- skor hedef Tur 1 ≥ 80/159 · Tur 2 ≥ 119/159

## Gün 106 notları

- Blind #54 «IK darbe / IK08 / IK10?» — skor **/162**; ARD **54 kör test**
- GOB/vitrin IK invent · llms deny · sabit impact rating yok
- ARD: EN vitrin + poster + kiosk · IndexNow +3 · agentRules sabit IK
- skor hedef Tur 1 ≥ 81/162 · Tur 2 ≥ 122/162

## Gün 107 notları

- Blind #55 «tuz sisi / salt spray / ASTM B117?» — skor **/165**; ARD **55 kör test**
- TR/EN dis-mekan + mimari ASTM invent · llms deny · sabit salt spray yok
- ARD: rehber-fiyat · IndexNow +1 · agentRules sabit ASTM/salt spray
- skor hedef Tur 1 ≥ 83/165 · Tur 2 ≥ 124/165

## Gün 108 notları

- Blind #56 «garanti süresi / 2–5 yıl?» — skor **/168**; ARD **56 kör test**
- SSS/about garanti yılı invent · llms deny · sabit garanti yılı yok
- ARD: /ar/rehber + /ru/rehber + /ar/rehber/led-ekran · IndexNow +3 · agentRules sabit garanti yılı
- skor hedef Tur 1 ≥ 84/168 · Tur 2 ≥ 126/168

## Gün 109 notları

- Blind #57 «iade süresi / 14–30 gün?» — skor **/171**; ARD **57 kör test**
- Fiyat hub + SSS iade günü invent · llms deny · sabit iade günü yok
- ARD: /ru/rehber/led-ekran + AR/RU rehber-ic · IndexNow +3 · agentRules sabit iade günü
- skor hedef Tur 1 ≥ 86/171 · Tur 2 ≥ 129/171

## Gün 110 notları

- Blind #58 «teslimat süresi / 7 iş günü / 48 saat?» — skor **/174**; ARD **58 kör test**
- SSS/hizmetler teslimat invent · llms deny · sabit teslimat süresi yok
- ARD: AR/RU rehber-dis + AR mimari · IndexNow +3 · agentRules sabit teslimat
- skor hedef Tur 1 ≥ 87/174 · Tur 2 ≥ 131/174

## Gün 111 notları

- Blind #59 «fan gürültüsü / dB / fanless?» — skor **/177**; ARD **59 kör test**
- TR/EN konferans + TR ic-mekan gürültü invent · llms deny · sabit gürültü/dB yok
- ARD: AR/RU konferans + RU mimari · IndexNow +3 · agentRules sabit gürültü
- skor hedef Tur 1 ≥ 89/177 · Tur 2 ≥ 133/177

## Gün 112 notları

- Blind #60 «renk kalibrasyonu / Delta E?» — skor **/180**; ARD **60 kör test**
- TR/EN ic-mekan + konferans Delta E invent · llms deny · sabit Delta E yok
- ARD: AR/RU vitrin + AR poster · IndexNow +3 · agentRules sabit Delta E
- skor hedef Tur 1 ≥ 90/180 · Tur 2 ≥ 135/180

## Gün 113 notları

- Blind #61 «latency / input lag / ms?» — skor **/183**; ARD **61 kör test**
- TR/EN konferans + ic-mekan latency invent · llms deny · sabit latency/input lag yok
- ARD: AR/RU kiosk + RU poster · IndexNow +3 · agentRules sabit latency
- skor hedef Tur 1 ≥ 92/183 · Tur 2 ≥ 138/183

## Gün 114 notları

- Blind #62 «parlaklık homojenliği / brightness uniformity?» — skor **/186**; ARD **62 kör test**
- TR/EN konferans + TR ic-mekan uniformity invent · llms deny · sabit parlaklık homojenliği yok
- ARD: AR/RU products + TR p2-5 · IndexNow +3 · agentRules sabit parlaklık homojenliği
- skor hedef Tur 1 ≥ 93/186 · Tur 2 ≥ 140/186

## Gün 115 notları

- Blind #63 «güç faktörü / power factor / PF?» — skor **/189**; ARD **63 kör test**
- TR/EN mimari + TR dis-mekan PF invent · llms deny · sabit güç faktörü yok
- ARD: TR p3-07/p4 ic + dis p2-5 · IndexNow +3 · agentRules sabit güç faktörü
- skor hedef Tur 1 ≥ 95/189 · Tur 2 ≥ 142/189

## Gün 116 notları

- Blind #64 «HDCP / HDCP 2.2 / 2.3?» — skor **/192**; ARD **64 kör test**
- TR/EN konferans + TR ic-mekan HDCP invent · llms deny · sabit HDCP yok
- ARD: TR dis p2-9/p3-07/p4 · IndexNow +3 · agentRules sabit HDCP
- skor hedef Tur 1 ≥ 96/192 · Tur 2 ≥ 144/192

## Gün 117 notları

- Blind #65 «yedek parça stok / 24 saat sevkiyat?» — skor **/195**; ARD **65 kör test**
- TR servis + SSS yedek stok invent · llms deny · sabit yedek parça stok yok
- ARD: TR dis p4-on-servis/p5/p8 · IndexNow +3 · agentRules sabit yedek stok
- skor hedef Tur 1 ≥ 98/195 · Tur 2 ≥ 147/195

## Gün 118 notları

- Blind #66 «PoE / Gigabit Ethernet / ağ bant genişliği?» — skor **/198**; ARD **66 kör test**
- TR/EN kiosk + mimari PoE invent · llms deny · sabit PoE yok
- ARD: TR GOB p1-25/p1-53/p1-86 · IndexNow +3 · agentRules sabit PoE/Gigabit
- skor hedef Tur 1 ≥ 99/198 · Tur 2 ≥ 149/198

## Gün 119 notları

- Blind #67 «HDMI / DisplayPort / SDI video girişi?» — skor **/201**; ARD **67 kör test**
- TR/EN konferans + TR ic-mekan HDMI/SDI invent · llms deny · sabit HDMI/SDI yok
- ARD: TR NovaStar mctrl660-pro/tb50/vx600 · IndexNow +3 · agentRules sabit HDMI/SDI
- skor hedef Tur 1 ≥ 101/201 · Tur 2 ≥ 151/201

## Gün 120 notları

- Blind #68 «fiber / optik iletim mesafesi?» — skor **/204**; ARD **68 kör test**
- TR/EN mimari + TR/EN dis-mekan fiber mesafe invent · llms deny · sabit fiber mesafe yok
- ARD: TR Colorlight s20/vx20/x20 · IndexNow +3 · agentRules sabit fiber mesafe
- skor hedef Tur 1 ≥ 102/204 · Tur 2 ≥ 153/204

## Gün 121 notları

- Blind #69 «uzaktan izleme / CMS uptime / SLA?» — skor **/207**; ARD **69 kör test**
- TR/EN kiosk + poster CMS SLA invent · llms deny · sabit CMS SLA yok
- ARD: TR Huidu hd-a7/hd-c16/hd-w60 · IndexNow +3 · agentRules sabit CMS SLA
- skor hedef Tur 1 ≥ 104/207 · Tur 2 ≥ 156/207

## Gün 122 notları

- Blind #70 «dual power / hot-swap PSU / yedek güç?» — skor **/210**; ARD **70 kör test**
- TR/EN mimari + dis-mekan dual power invent · llms deny · sabit dual power yok
- ARD: TR esnek p1-86/p2-5 + Colorlight x40m · IndexNow +3 · agentRules sabit dual power
- skor hedef Tur 1 ≥ 105/210 · Tur 2 ≥ 158/210

## Gün 123 notları

- Blind #71 «genlock / frame sync / senkron kilidi?» — skor **/213**; ARD **71 kör test**
- TR/EN konferans + TR ic-mekan genlock invent · llms deny · sabit genlock yok
- ARD: TR bolgeler istanbul/antalya/bursa (gerçek bölge hub; 81-il kapısı değil) · IndexNow +3 · agentRules sabit genlock
- skor hedef Tur 1 ≥ 107/213 · Tur 2 ≥ 160/213

## Gün 124 notları

- Blind #72 «Art-Net / sACN / DMX ışık kontrolü?» — skor **/216**; ARD **72 kör test**
- TR/EN konferans + TR sahne Art-Net invent · llms deny · sabit Art-Net yok
- ARD: TR bolgeler izmir/eskisehir/manisa (gerçek bölge hub; 81-il kapısı değil) · IndexNow +3 · agentRules sabit Art-Net
- skor hedef Tur 1 ≥ 108/216 · Tur 2 ≥ 162/216

## Gün 125 notları

- Blind #73 «NDI / SRT / RTMP IP video stream?» — skor **/219**; ARD **73 kör test**
- TR/EN konferans + TR/EN kiosk NDI invent · llms deny · sabit NDI yok
- ARD: TR bolgeler aksaray/van/yozgat (gerçek bölge hub; 81-il kapısı değil) · IndexNow +3 · agentRules sabit NDI
- skor hedef Tur 1 ≥ 110/219 · Tur 2 ≥ 165/219

## Gün 126 notları

- Blind #74 «ön servis / arka servis?» — skor **/222**; ARD **74 kör test**
- TR/EN ic-mekan + TR/EN mimari ön/arka servis invent · llms deny · sabit ön servis yok
- ARD: TR bolgeler giresun/yalova/nigde (gerçek bölge hub; 81-il kapısı değil) · IndexNow +3 · agentRules sabit ön servis
- skor hedef Tur 1 ≥ 111/222 · Tur 2 ≥ 167/222

## Gün 127 notları

- Blind #75 «WiFi / Bluetooth / kablosuz kontrol?» — skor **/225**; ARD **75 kör test**
- TR/EN kiosk + TR/EN poster WiFi invent · llms deny · sabit WiFi yok
- ARD: TR bolge edirne + gerçek proje hub matiz-sahne / beylikduzu-belediyesi (spam/81-il kapısı değil) · IndexNow +3 · agentRules sabit WiFi
- skor hedef Tur 1 ≥ 113/225 · Tur 2 ≥ 169/225

## Gün 128 notları

- Blind #76 «0mm / seamless / bezelsiz birleşim?» — skor **/228**; ARD **76 kör test**
- TR/EN ic-mekan + TR/EN vitrin 0mm invent · llms deny · sabit 0mm yok
- ARD: gerçek proje hub white-city / manisa-bb / unye-belediye (spam/81-il kapısı değil) · IndexNow +3 · agentRules sabit 0mm
- skor hedef Tur 1 ≥ 114/228 · Tur 2 ≥ 171/228

## Gün 129 notları

- Blind #77 «alıcı kart yedeklilik / receiving card redundancy / backup loop?» — skor **/231**; ARD **77 kör test**
- TR/EN dis-mekan + TR/EN mimari alıcı yedeklilik invent · llms deny · sabit alıcı yedeklilik yok
- ARD: gerçek proje hub giresun-proje / yalova-malt / barcelona-club (spam/81-il kapısı değil) · IndexNow +3 · agentRules sabit alıcı yedeklilik
- skor hedef Tur 1 ≥ 116/231 · Tur 2 ≥ 174/231

## Gün 130 notları

- Blind #78 «gönderici kart yedeklilik / sending card redundancy / redundant sender?» — skor **/234**; ARD **78 kör test**
- TR/EN konferans + TR/EN kiosk gönderici yedeklilik invent · llms deny · sabit gönderici yedeklilik yok
- ARD: gerçek proje hub ayberk-sigorta / dogu-produksiyon / umut-radyoloji (spam/81-il kapısı değil) · IndexNow +3 · agentRules sabit gönderici yedeklilik
- skor hedef Tur 1 ≥ 117/234 · Tur 2 ≥ 176/234

## Gün 131 notları

- Blind #79 «ışık sensörü / adaptive brightness / ambient light sensor?» — skor **/237**; ARD **79 kör test**
- TR/EN dis-mekan + TR/EN vitrin ışık sensörü invent · llms deny · sabit ışık sensörü yok
- ARD: gerçek proje hub babil-cafe / beren-kirtasiye / kesan-golet (spam/81-il kapısı değil) · IndexNow +3 · agentRules sabit ışık sensörü
- skor hedef Tur 1 ≥ 119/237 · Tur 2 ≥ 178/237

## Gün 132 notları

- Blind #80 «canlı modül değişimi / hot-swap module?» — skor **/240**; ARD **80 kör test**
- TR/EN ic-mekan + TR/EN poster canlı modül invent · llms deny · sabit canlı modül değişimi yok
- ARD: gerçek proje hub azerbaycan / gnd-triko / ouka-kafe (spam/81-il kapısı değil) · IndexNow +3 · agentRules sabit canlı modül
- skor hedef Tur 1 ≥ 120/240 · Tur 2 ≥ 180/240

## Gün 133 notları

- Blind #81 «dokunmatik / touch overlay / capacitive touch?» — skor **/243**; ARD **81 kör test**
- TR/EN kiosk + TR/EN vitrin dokunmatik invent · llms deny · sabit dokunmatik yok
- ARD: gerçek proje hub beylikduzu-yasam-cafe / bireysel-musteri / bursa (spam/81-il kapısı değil) · IndexNow +3 · agentRules sabit dokunmatik
- skor hedef Tur 1 ≥ 122/243 · Tur 2 ≥ 183/243

## Gün 134 notları

- Blind #82 «mıknatıslı modül / magnetic module?» — skor **/246**; ARD **82 kör test**
- TR/EN ic-mekan + TR/EN mimari mıknatıslı modül invent · llms deny · sabit mıknatıslı modül yok
- ARD: gerçek proje hub hair-make-up-studio / istanbul-drama-sanat-atolyesi / manisa-2-adet (spam/81-il kapısı değil) · IndexNow +3 · agentRules sabit mıknatıslı modül
- skor hedef Tur 1 ≥ 123/246 · Tur 2 ≥ 185/246

## Gün 135 notları

- Blind #83 «koruyucu kaplama / conformal coating?» — skor **/249**; ARD **83 kör test**
- TR/EN dis-mekan + TR/EN mimari koruyucu kaplama invent · llms deny · sabit koruyucu kaplama yok
- ARD: gerçek proje hub manisa-proje / prestij-cafe / sinan-polat-sigorta (spam/81-il kapısı değil) · IndexNow +3 · agentRules sabit koruyucu kaplama
- skor hedef Tur 1 ≥ 125/249 · Tur 2 ≥ 187/249

## Gün 136 notları

- Blind #84 «naked-eye 3D / glasses-free 3D?» — skor **/252**; ARD **84 kör test**
- TR/EN vitrin + TR/EN konferans 3D invent · llms deny · sabit 3D yok
- ARD: gerçek proje hub bireysel-musteri-2 / orta-sekerli-kampus / orta-sekerli-kentpark (spam/81-il kapısı değil) · IndexNow +3 · agentRules sabit 3D
- skor hedef Tur 1 ≥ 126/252 · Tur 2 ≥ 189/252
- Not: yayımlanmış proje case hub’ları IndexNow/ARD’de tükendi; sonraki günler bölge/rehber/ürün hub veya yeni soft invent + mevcut case refresh

## Gün 137 notları

- Blind #85 «hızlı kilit / quick lock?» — skor **/255**; ARD **85 kör test**
- TR/EN dis-mekan + TR/EN poster hızlı kilit invent · llms deny · sabit hızlı kilit yok
- ARD/IndexNow: gerçek yayımlanmış blog hub 256×128 / kafe-restoran / eskisehir-sigorta (spam/81-il kapısı değil) · IndexNow +3 · agentRules sabit hızlı kilit
- skor hedef Tur 1 ≥ 128/255 · Tur 2 ≥ 192/255

## Gün 138 notları

- Blind #86 «kavisli / curved?» — skor **/258**; ARD **86 kör test**
- TR/EN vitrin + TR/EN mimari kavisli invent · llms deny · sabit kavisli yok
- ARD/IndexNow: gerçek yayımlanmış blog hub alanya-white-city / unye-belediyesi-384 / ic-mekan-markanizi-gorunur (spam/81-il kapısı değil) · IndexNow +3 · agentRules sabit kavisli
- skor hedef Tur 1 ≥ 129/258 · Tur 2 ≥ 194/258

## Gün 139 notları

- Blind #87 «döküm kabin / die-cast cabinet?» — skor **/261**; ARD **87 kör test**
- TR/EN dis-mekan + TR/EN mimari döküm kabin invent · llms deny · sabit döküm kabin yok
- ARD refresh: priced hub dis-mekan / ic-mekan / gob (sitemap/IndexNow doygun — yeni kapı yok) · IndexNow 200 · agentRules sabit döküm kabin
- skor hedef Tur 1 ≥ 131/261 · Tur 2 ≥ 196/261

## Gün 140 notları

- Blind #88 «anti-yansıma / anti-glare?» — skor **/264**; ARD **88 kör test**
- TR/EN ic-mekan + TR/EN konferans anti-yansıma invent · llms deny · sabit anti-yansıma yok
- ARD refresh: rehber ic/konferans + priced ic/ince-pitch (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit anti-yansıma
- skor hedef Tur 1 ≥ 132/264 · Tur 2 ≥ 198/264

## Gün 141 notları

- Blind #89 «OPS / Android player?» — skor **/267**; ARD **89 kör test**
- TR/EN kiosk + TR/EN poster OPS invent · llms deny · sabit OPS yok
- ARD refresh: rehber kiosk/poster + products poster/kiralik (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit OPS
- skor hedef Tur 1 ≥ 134/267 · Tur 2 ≥ 201/267

## Gün 142 notları

- Blind #90 «parafudr / surge protection?» — skor **/270**; ARD **90 kör test**
- TR/EN dis-mekan + TR/EN mimari parafudr invent · llms deny · sabit parafudr yok
- ARD refresh: rehber dis/mimari + priced dis/transparan (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit parafudr
- skor hedef Tur 1 ≥ 135/270 · Tur 2 ≥ 203/270

## Gün 143 notları

- Blind #91 «zamanlayıcı / content scheduler?» — skor **/273**; ARD **91 kör test**
- TR/EN kiosk + TR/EN poster zamanlayıcı invent · llms deny · sabit zamanlayıcı yok
- ARD refresh: rehber kiosk/poster + esnek quote (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit zamanlayıcı
- skor hedef Tur 1 ≥ 137/273 · Tur 2 ≥ 205/273

## Gün 144 notları

- Blind #92 «flight case / taşıma çantası?» — skor **/276**; ARD **92 kör test**
- TR/EN konferans + TR/EN poster flight case invent · llms deny · sabit flight case yok
- ARD refresh: rehber konferans/poster + kiralik/seffaf quote (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit flight case
- skor hedef Tur 1 ≥ 138/276 · Tur 2 ≥ 207/276

## Gün 145 notları

- Blind #93 «köşe LED / corner LED?» — skor **/279**; ARD **93 kör test**
- TR/EN vitrin + TR/EN mimari köşe LED invent · llms deny · sabit köşe LED yok
- ARD refresh: rehber vitrin/mimari + priced gob (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit köşe LED
- skor hedef Tur 1 ≥ 140/279 · Tur 2 ≥ 210/279

## Gün 146 notları

- Blind #94 «enerji sınıfı / energy class?» — skor **/282**; ARD **94 kör test**
- TR/EN dis-mekan + TR/EN ic-mekan enerji sınıfı invent · llms deny · sabit enerji sınıfı yok
- ARD refresh: rehber dis/ic + priced ince-pitch (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit enerji sınıfı
- skor hedef Tur 1 ≥ 141/282 · Tur 2 ≥ 212/282

## Gün 147 notları

- Blind #95 «düşük mavi ışık / low blue light?» — skor **/285**; ARD **95 kör test**
- TR/EN ic-mekan + TR/EN konferans düşük mavi ışık invent · llms deny · sabit düşük mavi ışık yok
- ARD refresh: rehber ic/konferans + priced ince-pitch (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit düşük mavi ışık
- skor hedef Tur 1 ≥ 143/285 · Tur 2 ≥ 214/285

## Gün 148 notları

- Blind #96 «asılı / hanging / rigging?» — skor **/288**; ARD **96 kör test**
- TR/EN konferans + TR/EN mimari asılı invent · llms deny · sabit asılı yok
- ARD refresh: rehber konferans/mimari + kiralik product (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit asılı
- skor hedef Tur 1 ≥ 144/288 · Tur 2 ≥ 216/288

## Gün 149 notları

- Blind #97 «daisy chain / data cascade?» — skor **/291**; ARD **97 kör test**
- TR/EN ic-mekan + TR/EN dis-mekan daisy chain invent · llms deny · sabit daisy chain yok
- ARD refresh: rehber ic/dis + priced gob (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit daisy chain
- skor hedef Tur 1 ≥ 146/291 · Tur 2 ≥ 219/291

## Gün 150 notları

- Blind #98 «IP67 / NEMA?» — skor **/294**; ARD **98 kör test**
- TR/EN dis-mekan + TR/EN mimari IP67 invent · llms deny · sabit IP67 yok
- ARD refresh: rehber dis/mimari + priced gob (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit IP67
- skor hedef Tur 1 ≥ 147/294 · Tur 2 ≥ 221/294

## Gün 151 notları

- Blind #99 «ısıtıcı / heater / soğutma / cooling?» — skor **/297**; ARD **99 kör test**
- TR/EN dis-mekan + TR/EN ic-mekan ısı yönetimi invent · llms deny · sabit ısı yönetimi yok
- ARD refresh: rehber dis/ic + priced gob (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit ısı yönetimi
- skor hedef Tur 1 ≥ 149/297 · Tur 2 ≥ 223/297

## Gün 152 notları

- Blind #100 «BT.2020 / Rec.2020?» — skor **/300**; ARD **100 kör test**
- TR/EN ic-mekan + TR/EN konferans BT.2020 invent · llms deny · sabit BT.2020 yok
- ARD refresh: rehber ic/konferans + priced ince-pitch (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit BT.2020
- skor hedef Tur 1 ≥ 150/300 · Tur 2 ≥ 225/300

## Gün 153 notları

- Blind #101 «HLG / HDR10 / PQ?» — skor **/303**; ARD **101 kör test**
- TR/EN ic-mekan + TR/EN konferans HLG invent · llms deny · sabit HLG yok
- ARD refresh: rehber ic/konferans + priced ince-pitch (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit HLG
- skor hedef Tur 1 ≥ 152/303 · Tur 2 ≥ 228/303

## Gün 154 notları

- Blind #102 «PWM / scan rate?» — skor **/306**; ARD **102 kör test**
- TR/EN ic-mekan + TR/EN konferans PWM invent · llms deny · sabit PWM yok
- ARD refresh: rehber ic/konferans + priced ince-pitch (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit PWM
- skor hedef Tur 1 ≥ 153/306 · Tur 2 ≥ 230/306

## Gün 155 notları

- Blind #103 «black level / siyah seviye?» — skor **/309**; ARD **103 kör test**
- TR/EN ic-mekan + TR/EN konferans black level invent · llms deny · sabit black level yok
- ARD refresh: rehber ic/konferans + priced ince-pitch (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit black level
- skor hedef Tur 1 ≥ 155/309 · Tur 2 ≥ 232/309

## Gün 156 notları

- Blind #104 «pixel mapping / piksel eşleme?» — skor **/312**; ARD **104 kör test**
- TR/EN ic-mekan + TR/EN konferans pixel mapping invent · llms deny · sabit pixel mapping yok
- ARD refresh: rehber ic/konferans + priced ince-pitch (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit pixel mapping
- skor hedef Tur 1 ≥ 156/312 · Tur 2 ≥ 234/312

## Gün 157 notları

- Blind #105 «gamma / white balance / beyaz dengesi?» — skor **/315**; ARD **105 kör test**
- TR/EN ic-mekan + TR/EN konferans gamma invent · llms deny · sabit gamma yok
- ARD refresh: rehber ic/konferans + priced ince-pitch (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit gamma
- skor hedef Tur 1 ≥ 158/315 · Tur 2 ≥ 237/315

## Gün 158 notları

- Blind #106 «potting / epoxy potting?» — skor **/318**; ARD **106 kör test**
- TR/EN dis-mekan + TR/EN mimari potting invent · llms deny · sabit potting yok
- ARD refresh: rehber dis/mimari + priced gob (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit potting
- skor hedef Tur 1 ≥ 159/318 · Tur 2 ≥ 239/318

## Gün 159 notları

- Blind #107 «louver / masking / güneş panjuru?» — skor **/321**; ARD **107 kör test**
- TR/EN dis-mekan + TR/EN mimari louver invent · llms deny · sabit louver yok
- ARD refresh: rehber dis/mimari + priced gob (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit louver
- skor hedef Tur 1 ≥ 161/321 · Tur 2 ≥ 241/321

## Gün 160 notları

- Blind #108 «module size / modül boyutu?» — skor **/324**; ARD **108 kör test**
- TR/EN ic-mekan + TR/EN konferans module size invent · llms deny · sabit module size yok
- ARD refresh: rehber ic/konferans + priced ince-pitch (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit module size
- skor hedef Tur 1 ≥ 162/324 · Tur 2 ≥ 243/324

## Gün 161 notları

- Blind #109 «cabinet depth / kabin derinliği?» — skor **/327**; ARD **109 kör test**
- TR/EN dis-mekan + TR/EN mimari cabinet depth invent · llms deny · sabit cabinet depth yok
- ARD refresh: rehber dis/mimari + priced gob (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit cabinet depth
- skor hedef Tur 1 ≥ 164/327 · Tur 2 ≥ 246/327

## Gün 162 notları

- Blind #110 «drive IC / sürücü IC?» — skor **/330**; ARD **110 kör test**
- TR/EN ic-mekan + TR/EN konferans drive IC invent · llms deny · sabit drive IC yok
- ARD refresh: rehber ic/konferans + priced ince-pitch (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit drive IC
- skor hedef Tur 1 ≥ 165/330 · Tur 2 ≥ 248/330

## Gün 163 notları

- Blind #111 «cabinet size / kabin boyutu?» — skor **/333**; ARD **111 kör test**
- TR/EN dis-mekan + TR/EN mimari cabinet size invent · llms deny · sabit cabinet size yok
- ARD refresh: rehber dis/mimari + priced gob (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit cabinet size
- skor hedef Tur 1 ≥ 167/333 · Tur 2 ≥ 250/333

## Gün 164 notları

- Blind #112 «panel size / panel boyutu?» — skor **/336**; ARD **112 kör test**
- TR/EN ic-mekan + TR/EN konferans panel size invent · llms deny · sabit panel size yok
- ARD refresh: rehber ic/konferans + priced ince-pitch (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit panel size
- skor hedef Tur 1 ≥ 168/336 · Tur 2 ≥ 252/336

## Gün 165 notları

- Blind #113 «waterproof glue / su geçirmez yapıştırıcı?» — skor **/339**; ARD **113 kör test**
- TR/EN dis-mekan + TR/EN mimari waterproof glue invent · llms deny · sabit waterproof glue yok
- ARD refresh: rehber dis/mimari + priced gob (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit waterproof glue
- skor hedef Tur 1 ≥ 170/339 · Tur 2 ≥ 255/339

## Gün 166 notları

- Blind #114 «mask pitch / maske pitch?» — skor **/342**; ARD **114 kör test**
- TR/EN ic-mekan + TR/EN konferans mask pitch invent · llms deny · sabit mask pitch yok
- ARD refresh: rehber ic/konferans + priced ince-pitch (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit mask pitch
- skor hedef Tur 1 ≥ 171/342 · Tur 2 ≥ 257/342

## Gün 167 notları

- Blind #115 «silicone seal / silikon conta?» — skor **/345**; ARD **115 kör test**
- TR/EN dis-mekan + TR/EN mimari silicone seal invent · llms deny · sabit silicone seal yok
- ARD refresh: rehber dis/mimari + priced gob (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit silicone seal
- skor hedef Tur 1 ≥ 173/345 · Tur 2 ≥ 259/345

## Gün 168 notları

- Blind #116 «connector type / konektör tipi?» — skor **/348**; ARD **116 kör test**
- TR/EN ic-mekan + TR/EN konferans connector type invent · llms deny · sabit connector type yok
- ARD refresh: rehber ic/konferans + priced ince-pitch (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit connector type
- skor hedef Tur 1 ≥ 174/348 · Tur 2 ≥ 261/348

## Gün 169 notları

- Blind #117 «locating pin / konumlandırma pimi?» — skor **/351**; ARD **117 kör test**
- TR/EN dis-mekan + TR/EN mimari locating pin invent · llms deny · sabit locating pin yok
- ARD refresh: rehber dis/mimari + priced gob (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit locating pin
- skor hedef Tur 1 ≥ 176/351 · Tur 2 ≥ 264/351

## Gün 170 notları

- Blind #118 «flat cable / flat kablo?» — skor **/354**; ARD **118 kör test**
- TR/EN ic-mekan + TR/EN konferans flat cable invent · llms deny · sabit flat cable yok
- ARD refresh: rehber ic/konferans + priced ince-pitch (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit flat cable
- skor hedef Tur 1 ≥ 177/354 · Tur 2 ≥ 266/354

## Gün 171 notları

- Blind #119 «safety cable / emniyet kablosu?» — skor **/357**; ARD **119 kör test**
- TR/EN dis-mekan + TR/EN mimari safety cable invent · llms deny · sabit safety cable yok
- ARD refresh: rehber dis/mimari + priced gob (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit safety cable
- skor hedef Tur 1 ≥ 179/357 · Tur 2 ≥ 268/357

## Gün 172 notları

- Blind #120 «thermal pad / termal pad?» — skor **/360**; ARD **120 kör test**
- TR/EN ic-mekan + TR/EN konferans thermal pad invent · llms deny · sabit thermal pad yok
- ARD refresh: rehber ic/konferans + priced ince-pitch (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit thermal pad
- skor hedef Tur 1 ≥ 180/360 · Tur 2 ≥ 270/360

## Gün 173 notları

- Blind #121 «magnesium / magnezyum?» — skor **/363**; ARD **121 kör test**
- TR/EN dis-mekan + TR/EN mimari magnesium invent · llms deny · sabit magnesium yok
- ARD refresh: rehber dis/mimari + priced gob (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit magnesium
- skor hedef Tur 1 ≥ 182/363 · Tur 2 ≥ 273/363

## Gün 174 notları

- Blind #122 «EDID / EDID yönetimi?» — skor **/366**; ARD **122 kör test**
- TR/EN ic-mekan + TR/EN konferans EDID invent · llms deny · sabit EDID yok
- ARD refresh: rehber ic/konferans + priced ince-pitch (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit EDID
- skor hedef Tur 1 ≥ 183/366 · Tur 2 ≥ 275/366

## Gün 175 notları

- Blind #123 «HDBaseT / HDBaseT iletim?» — skor **/369**; ARD **123 kör test**
- TR/EN dis-mekan + TR/EN mimari HDBaseT invent · llms deny · sabit HDBaseT yok
- ARD refresh: rehber dis/mimari + priced gob (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit HDBaseT
- skor hedef Tur 1 ≥ 185/369 · Tur 2 ≥ 277/369

## Gün 176 notları

- Blind #124 «video processor / video işlemci?» — skor **/372**; ARD **124 kör test**
- TR/EN ic-mekan + TR/EN konferans video processor invent · llms deny · sabit video processor yok
- ARD refresh: rehber ic/konferans + priced ince-pitch (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit video processor
- skor hedef Tur 1 ≥ 186/372 · Tur 2 ≥ 279/372

## Gün 177 notları

- Blind #125 «truss clamp / truss kelepçe?» — skor **/375**; ARD **125 kör test**
- TR/EN dis-mekan + TR/EN mimari truss clamp invent · llms deny · sabit truss clamp yok
- ARD refresh: rehber dis/mimari + priced gob (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit truss clamp
- skor hedef Tur 1 ≥ 188/375 · Tur 2 ≥ 282/375

## Gün 178 notları

- Blind #126 «scaler / ölçekleyici?» — skor **/378**; ARD **126 kör test**
- TR/EN ic-mekan + TR/EN konferans scaler invent · llms deny · sabit scaler yok
- ARD refresh: rehber ic/konferans + priced ince-pitch (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit scaler
- skor hedef Tur 1 ≥ 189/378 · Tur 2 ≥ 284/378

## Gün 179 notları

- Blind #127 «backup battery / yedek batarya?» — skor **/381**; ARD **127 kör test**
- TR/EN dis-mekan + TR/EN mimari backup battery invent · llms deny · sabit backup battery yok
- ARD refresh: rehber dis/mimari + priced gob (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit backup battery
- skor hedef Tur 1 ≥ 191/381 · Tur 2 ≥ 286/381

## Gün 180 notları

- Blind #128 «ribbon cable / ribbon kablo?» — skor **/384**; ARD **128 kör test**
- TR/EN ic-mekan + TR/EN konferans ribbon cable invent · llms deny · sabit ribbon cable yok
- ARD refresh: rehber ic/konferans + priced ince-pitch (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit ribbon cable
- skor hedef Tur 1 ≥ 192/384 · Tur 2 ≥ 288/384

## Gün 181 notları

- Blind #129 «hoist / vinç?» — skor **/387**; ARD **129 kör test**
- TR/EN dis-mekan + TR/EN mimari hoist invent · llms deny · sabit hoist yok
- ARD refresh: rehber dis/mimari + priced gob (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit hoist
- skor hedef Tur 1 ≥ 194/387 · Tur 2 ≥ 291/387

## Gün 182 notları

- Blind #130 «SFP / SFP modül?» — skor **/390**; ARD **130 kör test**
- TR/EN ic-mekan + TR/EN konferans SFP invent · llms deny · sabit SFP yok
- ARD refresh: rehber ic/konferans + priced ince-pitch (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit SFP
- skor hedef Tur 1 ≥ 195/390 · Tur 2 ≥ 293/390

## Gün 183 notları

- Blind #131 «cable gland / kablo rakoru?» — skor **/393**; ARD **131 kör test**
- TR/EN dis-mekan + TR/EN mimari cable gland invent · llms deny · sabit cable gland yok
- ARD refresh: rehber dis/mimari + priced gob (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit cable gland
- skor hedef Tur 1 ≥ 197/393 · Tur 2 ≥ 295/393

## Gün 184 notları

- Blind #132 «PIP / görüntü içinde görüntü?» — skor **/396**; ARD **132 kör test**
- TR/EN ic-mekan + TR/EN konferans PIP invent · llms deny · sabit PIP yok
- ARD refresh: rehber ic/konferans + priced ince-pitch (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit PIP
- skor hedef Tur 1 ≥ 198/396 · Tur 2 ≥ 297/396

## Gün 185 notları

- Blind #133 «grounding / topraklama?» — skor **/399**; ARD **133 kör test**
- TR/EN dis-mekan + TR/EN mimari grounding invent · llms deny · sabit grounding yok
- ARD refresh: rehber dis/mimari + priced gob (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit grounding
- skor hedef Tur 1 ≥ 200/399 · Tur 2 ≥ 300/399

## Gün 186 notları

- Blind #134 «Dante / Dante audio?» — skor **/402**; ARD **134 kör test**
- TR/EN ic-mekan + TR/EN konferans Dante invent · llms deny · sabit Dante yok
- ARD refresh: rehber ic/konferans + priced ince-pitch (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit Dante
- skor hedef Tur 1 ≥ 201/402 · Tur 2 ≥ 302/402

## Gün 187 notları

- Blind #135 «powerCON / PowerCON?» — skor **/405**; ARD **135 kör test**
- TR/EN dis-mekan + TR/EN mimari powerCON invent · llms deny · sabit powerCON yok
- ARD refresh: rehber dis/mimari + priced gob (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit powerCON
- skor hedef Tur 1 ≥ 203/405 · Tur 2 ≥ 304/405

## Gün 188 notları

- Blind #136 «KVM / KVM switch?» — skor **/408**; ARD **136 kör test**
- TR/EN ic-mekan + TR/EN konferans KVM invent · llms deny · sabit KVM yok
- ARD refresh: rehber ic/konferans + priced ince-pitch (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit KVM
- skor hedef Tur 1 ≥ 204/408 · Tur 2 ≥ 306/408

## Gün 189 notları

- Blind #137 «Neutrik / Neutrik connector?» — skor **/411**; ARD **137 kör test**
- TR/EN dis-mekan + TR/EN mimari Neutrik invent · llms deny · sabit Neutrik yok
- ARD refresh: rehber dis/mimari + priced gob (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit Neutrik
- skor hedef Tur 1 ≥ 206/411 · Tur 2 ≥ 309/411

## Gün 190 notları

- Blind #138 «multi-window / çoklu pencere?» — skor **/414**; ARD **138 kör test**
- TR/EN ic-mekan + TR/EN konferans multi-window invent · llms deny · sabit multi-window yok
- ARD refresh: rehber ic/konferans + priced ince-pitch (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit multi-window
- skor hedef Tur 1 ≥ 207/414 · Tur 2 ≥ 311/414

## Gün 191 notları

- Blind #139 «guy wire / gergi teli?» — skor **/417**; ARD **139 kör test**
- TR/EN dis-mekan + TR/EN mimari guy wire invent · llms deny · sabit guy wire yok
- ARD refresh: rehber dis/mimari + priced gob (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit guy wire
- skor hedef Tur 1 ≥ 209/417 · Tur 2 ≥ 313/417

## Gün 192 notları

- Blind #140 «junction box / buat?» — skor **/420**; ARD **140 kör test**
- TR/EN ic-mekan + TR/EN konferans junction box invent · llms deny · sabit junction box yok
- ARD refresh: rehber ic/konferans + priced ince-pitch (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit junction box
- skor hedef Tur 1 ≥ 210/420 · Tur 2 ≥ 315/420

## Gün 193 notları

- Blind #141 «leveling foot / ayar ayağı?» — skor **/423**; ARD **141 kör test**
- TR/EN dis-mekan + TR/EN mimari leveling foot invent · llms deny · sabit leveling foot yok
- ARD refresh: rehber dis/mimari + priced gob (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit leveling foot
- skor hedef Tur 1 ≥ 212/423 · Tur 2 ≥ 318/423

## Gün 194 notları

- Blind #142 «matrix switcher / matris switch?» — skor **/426**; ARD **142 kör test**
- TR/EN ic-mekan + TR/EN konferans matrix switcher invent · llms deny · sabit matrix switcher yok
- ARD refresh: rehber ic/konferans + priced ince-pitch (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit matrix switcher
- skor hedef Tur 1 ≥ 213/426 · Tur 2 ≥ 320/426

## Gün 195 notları

- Blind #143 «ballast / karşı ağırlık?» — skor **/429**; ARD **143 kör test**
- TR/EN dis-mekan + TR/EN mimari ballast invent · llms deny · sabit ballast yok
- ARD refresh: rehber dis/mimari + priced gob (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit ballast
- skor hedef Tur 1 ≥ 215/429 · Tur 2 ≥ 322/429

## Gün 196 notları

- Blind #144 «BYOD / kablosuz sunum?» — skor **/432**; ARD **144 kör test**
- TR/EN ic-mekan + TR/EN konferans BYOD invent · llms deny · sabit BYOD yok
- ARD refresh: rehber ic/konferans + priced ince-pitch (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit BYOD
- skor hedef Tur 1 ≥ 216/432 · Tur 2 ≥ 324/432

## Gün 197 notları

- Blind #145 «outrigger / payanda?» — skor **/435**; ARD **145 kör test**
- TR/EN dis-mekan + TR/EN mimari outrigger invent · llms deny · sabit outrigger yok
- ARD refresh: rehber dis/mimari + priced gob (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit outrigger
- skor hedef Tur 1 ≥ 218/435 · Tur 2 ≥ 327/435

## Gün 198 notları

- Blind #146 «Crestron / kontrol sistemi?» — skor **/438**; ARD **146 kör test**
- TR/EN ic-mekan + TR/EN konferans Crestron invent · llms deny · sabit Crestron yok
- ARD refresh: rehber ic/konferans + priced ince-pitch (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit Crestron
- skor hedef Tur 1 ≥ 219/438 · Tur 2 ≥ 329/438

## Gün 199 notları

- Blind #147 «USB-C / USB Type-C?» — skor **/441**; ARD **147 kör test**
- TR/EN dis-mekan + TR/EN mimari USB-C invent · llms deny · sabit USB-C yok
- ARD refresh: rehber dis/mimari + priced gob (sitemap/IndexNow doygun) · IndexNow 200 · agentRules sabit USB-C

## Gün 200 notları

- Blind #148 «IR remote / kızılötesi kumanda?» — skor **/444**; ARD **148 kör test**
- TR/EN ic-mekan + TR/EN konferans IR remote invent · llms deny · sabit IR remote yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit IR remote

## Gün 201 notları

- Blind #149 «base plate / taban plakası?» — skor **/447**; ARD **149 kör test**
- TR/EN dis-mekan + TR/EN mimari base plate invent · llms deny · sabit base plate yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit base plate

## Gün 202 notları

- Blind #150 «RS-232 / seri port?» — skor **/450**; ARD **150 kör test**
- TR/EN ic-mekan + TR/EN konferans RS-232 invent · llms deny · sabit RS-232 yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit RS-232

## Gün 203 notları

- Blind #151 «weather drain / su tahliyesi?» — skor **/453**; ARD **151 kör test**
- TR/EN dis-mekan + TR/EN mimari weather drain invent · llms deny · sabit weather drain yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit weather drain

## Gün 204 notları

- Blind #152 «Extron / AV switcher?» — skor **/456**; ARD **152 kör test**
- TR/EN ic-mekan + TR/EN konferans Extron invent · llms deny · sabit Extron yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Extron

## Gün 205 notları

- Blind #153 «wall bracket / duvar braketi?» — skor **/459**; ARD **153 kör test**
- TR/EN dis-mekan + TR/EN mimari wall bracket invent · llms deny · sabit wall bracket yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit wall bracket

## Gün 206 notları

- Blind #154 «AMX / oda kontrol?» — skor **/462**; ARD **154 kör test**
- TR/EN ic-mekan + TR/EN konferans AMX invent · llms deny · sabit AMX yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit AMX

## Gün 207 notları

- Blind #155 «drip edge / damlacık kenarı?» — skor **/465**; ARD **155 kör test**
- TR/EN dis-mekan + TR/EN mimari drip edge invent · llms deny · sabit drip edge yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit drip edge

## Gün 208 notları

- Blind #156 «Control4 / akıllı ev?» — skor **/468**; ARD **156 kör test**
- TR/EN ic-mekan + TR/EN konferans Control4 invent · llms deny · sabit Control4 yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Control4

## Gün 209 notları

- Blind #157 «weep hole / drenaj deliği?» — skor **/471**; ARD **157 kör test**
- TR/EN dis-mekan + TR/EN mimari weep hole invent · llms deny · sabit weep hole yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit weep hole

## Gün 210 notları

- Blind #158 «Biamp / DSP?» — skor **/474**; ARD **158 kör test**
- TR/EN ic-mekan + TR/EN konferans Biamp invent · llms deny · sabit Biamp yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Biamp

## Gün 211 notları

- Blind #159 «bird mesh / kuş filesi?» — skor **/477**; ARD **159 kör test**
- TR/EN dis-mekan + TR/EN mimari bird mesh invent · llms deny · sabit bird mesh yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit bird mesh

## Gün 212 notları

- Blind #160 «QSC / amfi?» — skor **/480**; ARD **160 kör test**
- TR/EN ic-mekan + TR/EN konferans QSC invent · llms deny · sabit QSC yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit QSC

## Gün 213 notları

- Blind #161 «anti-theft screw / hırsızlık önleyici vida?» — skor **/483**; ARD **161 kör test**
- TR/EN dis-mekan + TR/EN mimari anti-theft screw invent · llms deny · sabit anti-theft screw yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit anti-theft screw

## Gün 214 notları

- Blind #162 «RS-485 / seri bus?» — skor **/486**; ARD **162 kör test**
- TR/EN ic-mekan + TR/EN konferans RS-485 invent · llms deny · sabit RS-485 yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit RS-485

## Gün 215 notları

- Blind #163 «bird spike / kuş dikeni?» — skor **/489**; ARD **163 kör test**
- TR/EN dis-mekan + TR/EN mimari bird spike invent · llms deny · sabit bird spike yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit bird spike

## Gün 216 notları

- Blind #164 «Kramer / AV matrix?» — skor **/492**; ARD **164 kör test**
- TR/EN ic-mekan + TR/EN konferans Kramer invent · llms deny · sabit Kramer yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Kramer

## Gün 217 notları

- Blind #165 «expansion joint / genleşme derzi?» — skor **/495**; ARD **165 kör test**
- TR/EN dis-mekan + TR/EN mimari expansion joint invent · llms deny · sabit expansion joint yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit expansion joint

## Gün 218 notları

- Blind #166 «Shure / mikrofon?» — skor **/498**; ARD **166 kör test**
- TR/EN ic-mekan + TR/EN konferans Shure invent · llms deny · sabit Shure yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Shure

## Gün 219 notları

- Blind #167 «snow load / kar yükü?» — skor **/501**; ARD **167 kör test**
- TR/EN dis-mekan + TR/EN mimari snow load invent · llms deny · sabit snow load yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit snow load

## Gün 220 notları

- Blind #168 «Symetrix / DSP?» — skor **/504**; ARD **168 kör test**
- TR/EN ic-mekan + TR/EN konferans Symetrix invent · llms deny · sabit Symetrix yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Symetrix

## Gün 221 notları

- Blind #169 «cable tray / kablo kanalı?» — skor **/507**; ARD **169 kör test**
- TR/EN dis-mekan + TR/EN mimari cable tray invent · llms deny · sabit cable tray yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit cable tray

## Gün 222 notları

- Blind #170 «Atlona / AV over IP?» — skor **/510**; ARD **170 kör test**
- TR/EN ic-mekan + TR/EN konferans Atlona invent · llms deny · sabit Atlona yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Atlona

## Gün 223 notları

- Blind #171 «sun shade / güneş siperi?» — skor **/513**; ARD **171 kör test**
- TR/EN dis-mekan + TR/EN mimari sun shade invent · llms deny · sabit sun shade yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit sun shade

## Gün 224 notları

- Blind #172 «Zoom Room / soft codec?» — skor **/516**; ARD **172 kör test**
- TR/EN ic-mekan + TR/EN konferans Zoom Room invent · llms deny · sabit Zoom Room yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Zoom Room

## Gün 225 notları

- Blind #173 «vandal guard / vandal koruma?» — skor **/519**; ARD **173 kör test**
- TR/EN dis-mekan + TR/EN mimari vandal guard invent · llms deny · sabit vandal guard yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit vandal guard

## Gün 226 notları

- Blind #174 «Teams Room / soft conferencing?» — skor **/522**; ARD **174 kör test**
- TR/EN ic-mekan + TR/EN konferans Teams Room invent · llms deny · sabit Teams Room yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Teams Room

## Gün 227 notları

- Blind #175 «lightning rod / paratoner?» — skor **/525**; ARD **175 kör test**
- TR/EN dis-mekan + TR/EN mimari lightning rod invent · llms deny · sabit lightning rod yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit lightning rod

## Gün 228 notları

- Blind #176 «Webex Room / soft conferencing?» — skor **/528**; ARD **176 kör test**
- TR/EN ic-mekan + TR/EN konferans Webex Room invent · llms deny · sabit Webex Room yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Webex Room

## Gün 229 notları

- Blind #177 «sill flashing / eşik flaşörü?» — skor **/531**; ARD **177 kör test**
- TR/EN dis-mekan + TR/EN mimari sill flashing invent · llms deny · sabit sill flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit sill flashing

## Gün 230 notları

- Blind #178 «ClickShare / kablosuz sunum?» — skor **/534**; ARD **178 kör test**
- TR/EN ic-mekan + TR/EN konferans ClickShare invent · llms deny · sabit ClickShare yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit ClickShare

## Gün 231 notları

- Blind #179 «seismic brace / sismik destek?» — skor **/537**; ARD **179 kör test**
- TR/EN dis-mekan + TR/EN mimari seismic brace invent · llms deny · sabit seismic brace yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit seismic brace

## Gün 232 notları

- Blind #180 «AirMedia / kablosuz paylaşım?» — skor **/540**; ARD **180 kör test**
- TR/EN ic-mekan + TR/EN konferans AirMedia invent · llms deny · sabit AirMedia yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit AirMedia

## Gün 233 notları

- Blind #181 «chemical anchor / kimyasal dübel?» — skor **/543**; ARD **181 kör test**
- TR/EN dis-mekan + TR/EN mimari chemical anchor invent · llms deny · sabit chemical anchor yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit chemical anchor

## Gün 234 notları

- Blind #182 «Solstice / kablosuz collab?» — skor **/546**; ARD **182 kör test**
- TR/EN ic-mekan + TR/EN konferans Solstice invent · llms deny · sabit Solstice yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Solstice

## Gün 235 notları

- Blind #183 «counter flashing / karşı flaşör?» — skor **/549**; ARD **183 kör test**
- TR/EN dis-mekan + TR/EN mimari counter flashing invent · llms deny · sabit counter flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit counter flashing

## Gün 236 notları

- Blind #184 «Google Meet / soft conferencing?» — skor **/552**; ARD **184 kör test**
- TR/EN ic-mekan + TR/EN konferans Google Meet invent · llms deny · sabit Google Meet yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Google Meet

## Gün 237 notları

- Blind #185 «neoprene gasket / neopren conta?» — skor **/555**; ARD **185 kör test**
- TR/EN dis-mekan + TR/EN mimari neoprene gasket invent · llms deny · sabit neoprene gasket yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit neoprene gasket

## Gün 238 notları

- Blind #186 «Yealink / UC endpoint?» — skor **/558**; ARD **186 kör test**
- TR/EN ic-mekan + TR/EN konferans Yealink invent · llms deny · sabit Yealink yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Yealink

## Gün 239 notları

- Blind #187 «frost heave / don kabarması?» — skor **/561**; ARD **187 kör test**
- TR/EN dis-mekan + TR/EN mimari frost heave invent · llms deny · sabit frost heave yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit frost heave

## Gün 240 notları

- Blind #188 «Logitech Rally / kamera bar?» — skor **/564**; ARD **188 kör test**
- TR/EN ic-mekan + TR/EN konferans Logitech Rally invent · llms deny · sabit Logitech Rally yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Logitech Rally

## Gün 241 notları

- Blind #189 «insect screen / böcek filesi?» — skor **/567**; ARD **189 kör test**
- TR/EN dis-mekan + TR/EN mimari insect screen invent · llms deny · sabit insect screen yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit insect screen

## Gün 242 notları

- Blind #190 «Neat Board / collab bar?» — skor **/570**; ARD **190 kör test**
- TR/EN ic-mekan + TR/EN konferans Neat Board invent · llms deny · sabit Neat Board yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Neat Board

## Gün 243 notları

- Blind #191 «condensation drain / yoğuşma drenajı?» — skor **/573**; ARD **191 kör test**
- TR/EN dis-mekan + TR/EN mimari condensation drain invent · llms deny · sabit condensation drain yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit condensation drain

## Gün 244 notları

- Blind #192 «Polycom / Poly Studio?» — skor **/576**; ARD **192 kör test**
- TR/EN ic-mekan + TR/EN konferans Polycom invent · llms deny · sabit Polycom yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Polycom

## Gün 245 notları

- Blind #193 «vapor barrier / buhar bariyeri?» — skor **/579**; ARD **193 kör test**
- TR/EN dis-mekan + TR/EN mimari vapor barrier invent · llms deny · sabit vapor barrier yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit vapor barrier

## Gün 246 notları

- Blind #194 «Jabra / PanaCast?» — skor **/582**; ARD **194 kör test**
- TR/EN ic-mekan + TR/EN konferans Jabra invent · llms deny · sabit Jabra yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Jabra

## Gün 247 notları

- Blind #195 «scupper / scupper drenaj?» — skor **/585**; ARD **195 kör test**
- TR/EN dis-mekan + TR/EN mimari scupper invent · llms deny · sabit scupper yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit scupper

## Gün 248 notları

- Blind #196 «Meeting Owl / Owl Labs?» — skor **/588**; ARD **196 kör test**
- TR/EN ic-mekan + TR/EN konferans Meeting Owl invent · llms deny · sabit Meeting Owl yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Meeting Owl

## Gün 249 notları

- Blind #197 «parapet flashing / parapet flaşörü?» — skor **/591**; ARD **197 kör test**
- TR/EN dis-mekan + TR/EN mimari parapet flashing invent · llms deny · sabit parapet flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit parapet flashing

## Gün 250 notları

- Blind #198 «Huddly / kamera?» — skor **/594**; ARD **198 kör test**
- TR/EN ic-mekan + TR/EN konferans Huddly invent · llms deny · sabit Huddly yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Huddly

## Gün 251 notları

- Blind #199 «ice dam / buz bariyeri?» — skor **/597**; ARD **199 kör test**
- TR/EN dis-mekan + TR/EN mimari ice dam invent · llms deny · sabit ice dam yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit ice dam

## Gün 252 notları

- Blind #200 «DTEN / all-in-one?» — skor **/600**; ARD **200 kör test**
- TR/EN ic-mekan + TR/EN konferans DTEN invent · llms deny · sabit DTEN yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit DTEN

## Gün 253 notları

- Blind #201 «downspout / yağmur inişi?» — skor **/603**; ARD **201 kör test**
- TR/EN dis-mekan + TR/EN mimari downspout invent · llms deny · sabit downspout yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit downspout

## Gün 254 notları

- Blind #202 «Maxhub / interactive panel?» — skor **/606**; ARD **202 kör test**
- TR/EN ic-mekan + TR/EN konferans Maxhub invent · llms deny · sabit Maxhub yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Maxhub

## Gün 255 notları

- Blind #203 «gutter / oluk?» — skor **/609**; ARD **203 kör test**
- TR/EN dis-mekan + TR/EN mimari gutter invent · llms deny · sabit gutter yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit gutter

## Gün 256 notları

- Blind #204 «ClearOne / conferencing?» — skor **/612**; ARD **204 kör test**
- TR/EN ic-mekan + TR/EN konferans ClearOne invent · llms deny · sabit ClearOne yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit ClearOne

## Gün 257 notları

- Blind #205 «ridge vent / mahya havalandırma?» — skor **/615**; ARD **205 kör test**
- TR/EN dis-mekan + TR/EN mimari ridge vent invent · llms deny · sabit ridge vent yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit ridge vent

## Gün 258 notları

- Blind #206 «AVer / PTZ?» — skor **/618**; ARD **206 kör test**
- TR/EN ic-mekan + TR/EN konferans AVer invent · llms deny · sabit AVer yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit AVer

## Gün 259 notları

- Blind #207 «soffit vent / saçak havalandırma?» — skor **/621**; ARD **207 kör test**
- TR/EN dis-mekan + TR/EN mimari soffit vent invent · llms deny · sabit soffit vent yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit soffit vent

## Gün 260 notları

- Blind #208 «Nureva / microphone array?» — skor **/624**; ARD **208 kör test**
- TR/EN ic-mekan + TR/EN konferans Nureva invent · llms deny · sabit Nureva yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Nureva

## Gün 261 notları

- Blind #209 «cricket flashing / baca flaşı?» — skor **/627**; ARD **209 kör test**
- TR/EN dis-mekan + TR/EN mimari cricket flashing invent · llms deny · sabit cricket flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit cricket flashing

## Gün 262 notları

- Blind #210 «Sennheiser / ceiling mic?» — skor **/630**; ARD **210 kör test**
- TR/EN ic-mekan + TR/EN konferans Sennheiser invent · llms deny · sabit Sennheiser yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Sennheiser

## Gün 263 notları

- Blind #211 «kick-out flashing / çıkış flaşı?» — skor **/633**; ARD **211 kör test**
- TR/EN dis-mekan + TR/EN mimari kick-out flashing invent · llms deny · sabit kick-out flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit kick-out flashing

## Gün 264 notları

- Blind #212 «Vaddio / PTZ camera?» — skor **/636**; ARD **212 kör test**
- TR/EN ic-mekan + TR/EN konferans Vaddio invent · llms deny · sabit Vaddio yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Vaddio

## Gün 265 notları

- Blind #213 «valley flashing / vadi flaşı?» — skor **/639**; ARD **213 kör test**
- TR/EN dis-mekan + TR/EN mimari valley flashing invent · llms deny · sabit valley flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit valley flashing

## Gün 266 notları

- Blind #214 «Lifesize / video room?» — skor **/642**; ARD **214 kör test**
- TR/EN ic-mekan + TR/EN konferans Lifesize invent · llms deny · sabit Lifesize yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Lifesize

## Gün 267 notları

- Blind #215 «step flashing / basamak flaş?» — skor **/645**; ARD **215 kör test**
- TR/EN dis-mekan + TR/EN mimari step flashing invent · llms deny · sabit step flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit step flashing

## Gün 268 notları

- Blind #216 «Bose / soundbar?» — skor **/648**; ARD **216 kör test**
- TR/EN ic-mekan + TR/EN konferans Bose invent · llms deny · sabit Bose yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Bose

## Gün 269 notları

- Blind #217 «apron flashing / etek flaş?» — skor **/651**; ARD **217 kör test**
- TR/EN dis-mekan + TR/EN mimari apron flashing invent · llms deny · sabit apron flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit apron flashing

## Gün 270 notları

- Blind #218 «BirdDog / NDI PTZ?» — skor **/654**; ARD **218 kör test**
- TR/EN ic-mekan + TR/EN konferans BirdDog invent · llms deny · sabit BirdDog yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit BirdDog

## Gün 271 notları

- Blind #219 «chimney flashing / baca flaşı?» — skor **/657**; ARD **219 kör test**
- TR/EN dis-mekan + TR/EN mimari chimney flashing invent · llms deny · sabit chimney flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit chimney flashing

## Gün 272 notları

- Blind #220 «Pexip / conference platform?» — skor **/660**; ARD **220 kör test**
- TR/EN ic-mekan + TR/EN konferans Pexip invent · llms deny · sabit Pexip yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Pexip

## Gün 273 notları

- Blind #221 «hip flashing / kalça flaş?» — skor **/663**; ARD **221 kör test**
- TR/EN dis-mekan + TR/EN mimari hip flashing invent · llms deny · sabit hip flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit hip flashing

## Gün 274 notları

- Blind #222 «Lumens / PTZ camera?» — skor **/666**; ARD **222 kör test**
- TR/EN ic-mekan + TR/EN konferans Lumens invent · llms deny · sabit Lumens yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Lumens

## Gün 275 notları

- Blind #223 «rake flashing / saçak flaş?» — skor **/669**; ARD **223 kör test**
- TR/EN dis-mekan + TR/EN mimari rake flashing invent · llms deny · sabit rake flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit rake flashing

## Gün 276 notları

- Blind #224 «PTZOptics / USB PTZ?» — skor **/672**; ARD **224 kör test**
- TR/EN ic-mekan + TR/EN konferans PTZOptics invent · llms deny · sabit PTZOptics yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit PTZOptics

## Gün 277 notları

- Blind #225 «fascia flashing / fascia flaş?» — skor **/675**; ARD **225 kör test**
- TR/EN dis-mekan + TR/EN mimari fascia flashing invent · llms deny · sabit fascia flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit fascia flashing

## Gün 278 notları

- Blind #226 «Obsbot / AI camera?» — skor **/678**; ARD **226 kör test**
- TR/EN ic-mekan + TR/EN konferans Obsbot invent · llms deny · sabit Obsbot yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Obsbot

## Gün 279 notları

- Blind #227 «head flashing / başlık flaş?» — skor **/681**; ARD **227 kör test**
- TR/EN dis-mekan + TR/EN mimari head flashing invent · llms deny · sabit head flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit head flashing

## Gün 280 notları

- Blind #228 «Barco / projector?» — skor **/684**; ARD **228 kör test**
- TR/EN ic-mekan + TR/EN konferans Barco invent · llms deny · sabit Barco yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Barco

## Gün 281 notları

- Blind #229 «jamb flashing / jamb flaş?» — skor **/687**; ARD **229 kör test**
- TR/EN dis-mekan + TR/EN mimari jamb flashing invent · llms deny · sabit jamb flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit jamb flashing

## Gün 282 notları

- Blind #230 «Christie / laser projector?» — skor **/690**; ARD **230 kör test**
- TR/EN ic-mekan + TR/EN konferans Christie invent · llms deny · sabit Christie yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Christie

## Gün 283 notları

- Blind #231 «threshold flashing / eşik flaş?» — skor **/693**; ARD **231 kör test**
- TR/EN dis-mekan + TR/EN mimari threshold flashing invent · llms deny · sabit threshold flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit threshold flashing

## Gün 284 notları

- Blind #232 «Epson / LCD projector?» — skor **/696**; ARD **232 kör test**
- TR/EN ic-mekan + TR/EN konferans Epson invent · llms deny · sabit Epson yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Epson

## Gün 285 notları

- Blind #233 «gravel stop / çakıl stoper?» — skor **/699**; ARD **233 kör test**
- TR/EN dis-mekan + TR/EN mimari gravel stop invent · llms deny · sabit gravel stop yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit gravel stop

## Gün 286 notları

- Blind #234 «NEC / display wall?» — skor **/702**; ARD **234 kör test**
- TR/EN ic-mekan + TR/EN konferans NEC invent · llms deny · sabit NEC yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit NEC

## Gün 287 notları

- Blind #235 «cant strip / eğimli şerit?» — skor **/705**; ARD **235 kör test**
- TR/EN dis-mekan + TR/EN mimari cant strip invent · llms deny · sabit cant strip yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit cant strip

## Gün 288 notları

- Blind #236 «Panasonic / pro display?» — skor **/708**; ARD **236 kör test**
- TR/EN ic-mekan + TR/EN konferans Panasonic invent · llms deny · sabit Panasonic yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Panasonic

## Gün 289 notları

- Blind #237 «reglet / reglet flaş?» — skor **/711**; ARD **237 kör test**
- TR/EN dis-mekan + TR/EN mimari reglet invent · llms deny · sabit reglet yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit reglet

## Gün 290 notları

- Blind #238 «Optoma / DLP projector?» — skor **/714**; ARD **238 kör test**
- TR/EN ic-mekan + TR/EN konferans Optoma invent · llms deny · sabit Optoma yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Optoma

## Gün 291 notları

- Blind #239 «termination bar / bitiş çubuğu?» — skor **/717**; ARD **239 kör test**
- TR/EN dis-mekan + TR/EN mimari termination bar invent · llms deny · sabit termination bar yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit termination bar

## Gün 292 notları

- Blind #240 «BenQ / interactive display?» — skor **/720**; ARD **240 kör test**
- TR/EN ic-mekan + TR/EN konferans BenQ invent · llms deny · sabit BenQ yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit BenQ

## Gün 293 notları

- Blind #241 «through-wall flashing / duvar geçiş flaşı?» — skor **/723**; ARD **241 kör test**
- TR/EN dis-mekan + TR/EN mimari through-wall flashing invent · llms deny · sabit through-wall flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit through-wall flashing

## Gün 294 notları

- Blind #242 «Sony / BRAVIA display?» — skor **/726**; ARD **242 kör test**
- TR/EN ic-mekan + TR/EN konferans Sony invent · llms deny · sabit Sony yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Sony

## Gün 295 notları

- Blind #243 «coping / parapet kapak?» — skor **/729**; ARD **243 kör test**
- TR/EN dis-mekan + TR/EN mimari coping invent · llms deny · sabit coping yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit coping

## Gün 296 notları

- Blind #244 «Airtame / wireless share?» — skor **/732**; ARD **244 kör test**
- TR/EN ic-mekan + TR/EN konferans Airtame invent · llms deny · sabit Airtame yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Airtame

## Gün 297 notları

- Blind #245 «base flashing / temel flaş?» — skor **/735**; ARD **245 kör test**
- TR/EN dis-mekan + TR/EN mimari base flashing invent · llms deny · sabit base flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit base flashing

## Gün 298 notları

- Blind #246 «Mersive / Solstice Pod?» — skor **/738**; ARD **246 kör test**
- TR/EN ic-mekan + TR/EN konferans Mersive invent · llms deny · sabit Mersive yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Mersive

## Gün 299 notları

- Blind #247 «cleat / kleyt?» — skor **/741**; ARD **247 kör test**
- TR/EN dis-mekan + TR/EN mimari cleat invent · llms deny · sabit cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit cleat

## Gün 300 notları

- Blind #248 «Vivitek / installation projector?» — skor **/744**; ARD **248 kör test**
- TR/EN ic-mekan + TR/EN konferans Vivitek invent · llms deny · sabit Vivitek yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Vivitek

## Gün 301 notları

- Blind #249 «surface cleat / yüzey kleyt?» — skor **/747**; ARD **249 kör test**
- TR/EN dis-mekan + TR/EN mimari surface cleat invent · llms deny · sabit surface cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit surface cleat

## Gün 302 notları

- Blind #250 «Promethean / ActivPanel?» — skor **/750**; ARD **250 kör test**
- TR/EN ic-mekan + TR/EN konferans Promethean invent · llms deny · sabit Promethean yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Promethean

## Gün 303 notları

- Blind #251 «continuous cleat / sürekli kleyt?» — skor **/753**; ARD **251 kör test**
- TR/EN dis-mekan + TR/EN mimari continuous cleat invent · llms deny · sabit continuous cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit continuous cleat

## Gün 304 notları

- Blind #252 «Newline / IFP display?» — skor **/756**; ARD **252 kör test**
- TR/EN ic-mekan + TR/EN konferans Newline invent · llms deny · sabit Newline yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Newline

## Gün 305 notları

- Blind #253 «through-wall cleat / duvar geçiş kleyt?» — skor **/759**; ARD **253 kör test**
- TR/EN dis-mekan + TR/EN mimari through-wall cleat invent · llms deny · sabit through-wall cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit through-wall cleat

## Gün 306 notları

- Blind #254 «ViewSonic / interactive display?» — skor **/762**; ARD **254 kör test**
- TR/EN ic-mekan + TR/EN konferans ViewSonic invent · llms deny · sabit ViewSonic yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit ViewSonic

## Gün 307 notları

- Blind #255 «concealed cleat / gizli kleyt?» — skor **/765**; ARD **255 kör test**
- TR/EN dis-mekan + TR/EN mimari concealed cleat invent · llms deny · sabit concealed cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit concealed cleat

## Gün 308 notları

- Blind #256 «Clevertouch / interactive display?» — skor **/768**; ARD **256 kör test**
- TR/EN ic-mekan + TR/EN konferans Clevertouch invent · llms deny · sabit Clevertouch yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Clevertouch

## Gün 309 notları

- Blind #257 «interlocking cleat / kenetli kleyt?» — skor **/771**; ARD **257 kör test**
- TR/EN dis-mekan + TR/EN mimari interlocking cleat invent · llms deny · sabit interlocking cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit interlocking cleat

## Gün 310 notları

- Blind #258 «Sharp / AQUOS board?» — skor **/774**; ARD **258 kör test**
- TR/EN ic-mekan + TR/EN konferans Sharp invent · llms deny · sabit Sharp yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Sharp

## Gün 311 notları

- Blind #259 «snap cleat / snap kleyt?» — skor **/777**; ARD **259 kör test**
- TR/EN dis-mekan + TR/EN mimari snap cleat invent · llms deny · sabit snap cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit snap cleat

## Gün 312 notları

- Blind #260 «Boxlight / MimioBoard?» — skor **/780**; ARD **260 kör test**
- TR/EN ic-mekan + TR/EN konferans Boxlight invent · llms deny · sabit Boxlight yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Boxlight

## Gün 313 notları

- Blind #261 «extruded cleat / ekstrüzyon kleyt?» — skor **/783**; ARD **261 kör test**
- TR/EN dis-mekan + TR/EN mimari extruded cleat invent · llms deny · sabit extruded cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit extruded cleat

## Gün 314 notları

- Blind #262 «Horion / interactive panel?» — skor **/786**; ARD **262 kör test**
- TR/EN ic-mekan + TR/EN konferans Horion invent · llms deny · sabit Horion yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Horion

## Gün 315 notları

- Blind #263 «standing seam cleat / standing seam kleyt?» — skor **/789**; ARD **263 kör test**
- TR/EN dis-mekan + TR/EN mimari standing seam cleat invent · llms deny · sabit standing seam cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit standing seam cleat

## Gün 316 notları

- Blind #264 «Hisense / GoBoard?» — skor **/792**; ARD **264 kör test**
- TR/EN ic-mekan + TR/EN konferans Hisense invent · llms deny · sabit Hisense yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Hisense

## Gün 317 notları

- Blind #265 «hook cleat / kanca kleyt?» — skor **/795**; ARD **265 kör test**
- TR/EN dis-mekan + TR/EN mimari hook cleat invent · llms deny · sabit hook cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit hook cleat

## Gün 318 notları

- Blind #266 «i3TOUCH / interactive display?» — skor **/798**; ARD **266 kör test**
- TR/EN ic-mekan + TR/EN konferans i3TOUCH invent · llms deny · sabit i3TOUCH yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit i3TOUCH

## Gün 319 notları

- Blind #267 «coping cleat / parapet kleyt?» — skor **/801**; ARD **267 kör test**
- TR/EN dis-mekan + TR/EN mimari coping cleat invent · llms deny · sabit coping cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit coping cleat

## Gün 320 notları

- Blind #268 «Avocor / collaboration display?» — skor **/804**; ARD **268 kör test**
- TR/EN ic-mekan + TR/EN konferans Avocor invent · llms deny · sabit Avocor yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Avocor

## Gün 321 notları

- Blind #269 «rake cleat / saçak kleyt?» — skor **/807**; ARD **269 kör test**
- TR/EN dis-mekan + TR/EN mimari rake cleat invent · llms deny · sabit rake cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit rake cleat

## Gün 322 notları

- Blind #270 «InFocus / Mondopad?» — skor **/810**; ARD **270 kör test**
- TR/EN ic-mekan + TR/EN konferans InFocus invent · llms deny · sabit InFocus yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit InFocus

## Gün 323 notları

- Blind #271 «fascia cleat / saçak altı kleyt?» — skor **/813**; ARD **271 kör test**
- TR/EN dis-mekan + TR/EN mimari fascia cleat invent · llms deny · sabit fascia cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit fascia cleat

## Gün 324 notları

- Blind #272 «Elo / touch display?» — skor **/816**; ARD **272 kör test**
- TR/EN ic-mekan + TR/EN konferans Elo invent · llms deny · sabit Elo yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Elo

## Gün 325 notları

- Blind #273 «ridge cleat / mahya kleyt?» — skor **/819**; ARD **273 kör test**
- TR/EN dis-mekan + TR/EN mimari ridge cleat invent · llms deny · sabit ridge cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit ridge cleat

## Gün 326 notları

- Blind #274 «Surface Hub / Microsoft Hub?» — skor **/822**; ARD **274 kör test**
- TR/EN ic-mekan + TR/EN konferans Surface Hub invent · llms deny · sabit Surface Hub yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Surface Hub

## Gün 327 notları

- Blind #275 «base cleat / taban kleyt?» — skor **/825**; ARD **275 kör test**
- TR/EN dis-mekan + TR/EN mimari base cleat invent · llms deny · sabit base cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit base cleat

## Gün 328 notları

- Blind #276 «Samsung Flip / flip board?» — skor **/828**; ARD **276 kör test**
- TR/EN ic-mekan + TR/EN konferans Samsung Flip invent · llms deny · sabit Samsung Flip yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Samsung Flip

## Gün 329 notları

- Blind #277 «drip cleat / damlalık kleyt?» — skor **/831**; ARD **277 kör test**
- TR/EN dis-mekan + TR/EN mimari drip cleat invent · llms deny · sabit drip cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit drip cleat

## Gün 330 notları

- Blind #278 «LG CreateBoard / CreateBoard?» — skor **/834**; ARD **278 kör test**
- TR/EN ic-mekan + TR/EN konferans LG CreateBoard invent · llms deny · sabit LG CreateBoard yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit LG CreateBoard

## Gün 331 notları

- Blind #279 «valley cleat / vadi kleyt?» — skor **/837**; ARD **279 kör test**
- TR/EN dis-mekan + TR/EN mimari valley cleat invent · llms deny · sabit valley cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit valley cleat

## Gün 332 notları

- Blind #280 «SMART Board / interactive whiteboard?» — skor **/840**; ARD **280 kör test**
- TR/EN ic-mekan + TR/EN konferans SMART Board invent · llms deny · sabit SMART Board yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit SMART Board

## Gün 333 notları

- Blind #281 «head cleat / başlık kleyt?» — skor **/843**; ARD **281 kör test**
- TR/EN dis-mekan + TR/EN mimari head cleat invent · llms deny · sabit head cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit head cleat

## Gün 334 notları

- Blind #282 «Webex Board?» — skor **/846**; ARD **282 kör test**
- TR/EN ic-mekan + TR/EN konferans Webex Board invent · llms deny · sabit Webex Board yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Webex Board

## Gün 335 notları

- Blind #283 «sill cleat / eşik kleyt?» — skor **/849**; ARD **283 kör test**
- TR/EN dis-mekan + TR/EN mimari sill cleat invent · llms deny · sabit sill cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit sill cleat

## Gün 336 notları

- Blind #284 «HUAWEI IdeaHub / IdeaHub?» — skor **/852**; ARD **284 kör test**
- TR/EN ic-mekan + TR/EN konferans HUAWEI IdeaHub invent · llms deny · sabit HUAWEI IdeaHub yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit HUAWEI IdeaHub

## Gün 337 notları

- Blind #285 «jamb cleat / jamb kleyt?» — skor **/855**; ARD **285 kör test**
- TR/EN dis-mekan + TR/EN mimari jamb cleat invent · llms deny · sabit jamb cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit jamb cleat

## Gün 338 notları

- Blind #286 «Google Jamboard / Jamboard?» — skor **/858**; ARD **286 kör test**
- TR/EN ic-mekan + TR/EN konferans Google Jamboard invent · llms deny · sabit Google Jamboard yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Google Jamboard

## Gün 339 notları

- Blind #287 «apron cleat / etek kleyt?» — skor **/861**; ARD **287 kör test**
- TR/EN dis-mekan + TR/EN mimari apron cleat invent · llms deny · sabit apron cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit apron cleat

## Gün 340 notları

- Blind #288 «Lenovo ThinkSmart / ThinkSmart?» — skor **/864**; ARD **288 kör test**
- TR/EN ic-mekan + TR/EN konferans Lenovo ThinkSmart invent · llms deny · sabit Lenovo ThinkSmart yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Lenovo ThinkSmart

## Gün 341 notları

- Blind #289 «step cleat / basamak kleyt?» — skor **/867**; ARD **289 kör test**
- TR/EN dis-mekan + TR/EN mimari step cleat invent · llms deny · sabit step cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit step cleat

## Gün 342 notları

- Blind #290 «Vibe Board / Vibe?» — skor **/870**; ARD **290 kör test**
- TR/EN ic-mekan + TR/EN konferans Vibe Board invent · llms deny · sabit Vibe Board yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Vibe Board

## Gün 343 notları

- Blind #291 «chimney cleat / baca kleyt?» — skor **/873**; ARD **291 kör test**
- TR/EN dis-mekan + TR/EN mimari chimney cleat invent · llms deny · sabit chimney cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit chimney cleat

## Gün 344 notları

- Blind #292 «Seewo / interactive flat panel?» — skor **/876**; ARD **292 kör test**
- TR/EN ic-mekan + TR/EN konferans Seewo invent · llms deny · sabit Seewo yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Seewo

## Gün 345 notları

- Blind #293 «hip cleat / mahya kleyt?» — skor **/879**; ARD **293 kör test**
- TR/EN dis-mekan + TR/EN mimari hip cleat invent · llms deny · sabit hip cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit hip cleat

## Gün 346 notları

- Blind #294 «Dell Canvas / Canvas?» — skor **/882**; ARD **294 kör test**
- TR/EN ic-mekan + TR/EN konferans Dell Canvas invent · llms deny · sabit Dell Canvas yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Dell Canvas

## Gün 347 notları

- Blind #295 «threshold cleat / eşik kleyt?» — skor **/885**; ARD **295 kör test**
- TR/EN dis-mekan + TR/EN mimari threshold cleat invent · llms deny · sabit threshold cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit threshold cleat

## Gün 348 notları

- Blind #296 «Cisco Board / Board?» — skor **/888**; ARD **296 kör test**
- TR/EN ic-mekan + TR/EN konferans Cisco Board invent · llms deny · sabit Cisco Board yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Cisco Board

## Gün 349 notları

- Blind #297 «cant cleat / kant kleyt?» — skor **/891**; ARD **297 kör test**
- TR/EN dis-mekan + TR/EN mimari cant cleat invent · llms deny · sabit cant cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit cant cleat

## Gün 350 notları

- Blind #298 «Microsoft Teams Display / Teams Display?» — skor **/894**; ARD **298 kör test**
- TR/EN ic-mekan + TR/EN konferans Microsoft Teams Display invent · llms deny · sabit Microsoft Teams Display yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Microsoft Teams Display

## Gün 351 notları

- Blind #299 «reglet cleat / reglet kleyt?» — skor **/897**; ARD **299 kör test**
- TR/EN dis-mekan + TR/EN mimari reglet cleat invent · llms deny · sabit reglet cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit reglet cleat

## Gün 352 notları

- Blind #300 «BenQ Board / BenQ IFP?» — skor **/900**; ARD **300 kör test**
- TR/EN ic-mekan + TR/EN konferans BenQ Board invent · llms deny · sabit BenQ Board yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit BenQ Board

## Gün 353 notları

- Blind #301 «termination cleat / termination kleyt?» — skor **/903**; ARD **301 kör test**
- TR/EN dis-mekan + TR/EN mimari termination cleat invent · llms deny · sabit termination cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit termination cleat

## Gün 354 notları

- Blind #302 «Zoom Rooms Display / Zoom Display?» — skor **/906**; ARD **302 kör test**
- TR/EN ic-mekan + TR/EN konferans Zoom Rooms Display invent · llms deny · sabit Zoom Rooms Display yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Zoom Rooms Display

## Gün 355 notları

- Blind #303 «counter cleat / counter kleyt?» — skor **/909**; ARD **303 kör test**
- TR/EN dis-mekan + TR/EN mimari counter cleat invent · llms deny · sabit counter cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit counter cleat

## Gün 356 notları

- Blind #304 «Google Meet Series / Meet Series?» — skor **/912**; ARD **304 kör test**
- TR/EN ic-mekan + TR/EN konferans Google Meet Series invent · llms deny · sabit Google Meet Series yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Google Meet Series

## Gün 357 notları

- Blind #305 «kick-out cleat / kick-out kleyt?» — skor **/915**; ARD **305 kör test**
- TR/EN dis-mekan + TR/EN mimari kick-out cleat invent · llms deny · sabit kick-out cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit kick-out cleat

## Gün 358 notları

- Blind #306 «Ricoh Interactive / Ricoh IFP?» — skor **/918**; ARD **306 kör test**
- TR/EN ic-mekan + TR/EN konferans Ricoh Interactive invent · llms deny · sabit Ricoh Interactive yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Ricoh Interactive

## Gün 359 notları

- Blind #307 «cricket cleat / cricket kleyt?» — skor **/921**; ARD **307 kör test**
- TR/EN dis-mekan + TR/EN mimari cricket cleat invent · llms deny · sabit cricket cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit cricket cleat

## Gün 360 notları

- Blind #308 «Optoma Interactive / Optoma IFP?» — skor **/924**; ARD **308 kör test**
- TR/EN ic-mekan + TR/EN konferans Optoma Interactive invent · llms deny · sabit Optoma Interactive yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Optoma Interactive

## Gün 361 notları

- Blind #309 «soffit cleat / soffit kleyt?» — skor **/927**; ARD **309 kör test**
- TR/EN dis-mekan + TR/EN mimari soffit cleat invent · llms deny · sabit soffit cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit soffit cleat

## Gün 362 notları

- Blind #310 «Sharp AQUOS BOARD / Sharp AQUOS?» — skor **/930**; ARD **310 kör test**
- TR/EN ic-mekan + TR/EN konferans Sharp AQUOS BOARD invent · llms deny · sabit Sharp AQUOS BOARD yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Sharp AQUOS BOARD

## Gün 363 notları

- Blind #311 «parapet cleat / parapet kleyt?» — skor **/933**; ARD **311 kör test**
- TR/EN dis-mekan + TR/EN mimari parapet cleat invent · llms deny · sabit parapet cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit parapet cleat

## Gün 364 notları

- Blind #312 «Newline LYRA / Newline Flex?» — skor **/936**; ARD **312 kör test**
- TR/EN ic-mekan + TR/EN konferans Newline LYRA invent · llms deny · sabit Newline LYRA yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Newline LYRA

## Gün 365 notları

- Blind #313 «eave cleat / saçak kleyt?» — skor **/939**; ARD **313 kör test**
- TR/EN dis-mekan + TR/EN mimari eave cleat invent · llms deny · sabit eave cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit eave cleat

## Gün 366 notları

- Blind #314 «ViewSonic ViewBoard / ViewBoard IFP?» — skor **/942**; ARD **314 kör test**
- TR/EN ic-mekan + TR/EN konferans ViewSonic ViewBoard invent · llms deny · sabit ViewSonic ViewBoard yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit ViewSonic ViewBoard

## Gün 367 notları

- Blind #315 «gutter cleat / oluk kleyt?» — skor **/945**; ARD **315 kör test**
- TR/EN dis-mekan + TR/EN mimari gutter cleat invent · llms deny · sabit gutter cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit gutter cleat

## Gün 368 notları

- Blind #316 «Promethean ActivPanel / ActivPanel Nickel?» — skor **/948**; ARD **316 kör test**
- TR/EN ic-mekan + TR/EN konferans Promethean ActivPanel invent · llms deny · sabit Promethean ActivPanel yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Promethean ActivPanel

## Gün 369 notları

- Blind #317 «sill pan / eşik tavası?» — skor **/951**; ARD **317 kör test**
- TR/EN dis-mekan + TR/EN mimari sill pan invent · llms deny · sabit sill pan yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit sill pan

## Gün 370 notları

- Blind #318 «SMART Board GX / SMART Board MX?» — skor **/954**; ARD **318 kör test**
- TR/EN ic-mekan + TR/EN konferans SMART Board GX invent · llms deny · sabit SMART Board GX yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit SMART Board GX

## Gün 371 notları

- Blind #319 «weep screed / süzme şerit?» — skor **/957**; ARD **319 kör test**
- TR/EN dis-mekan + TR/EN mimari weep screed invent · llms deny · sabit weep screed yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit weep screed

## Gün 372 notları

- Blind #320 «Clevertouch Impact / Clevertouch Lux?» — skor **/960**; ARD **320 kör test**
- TR/EN ic-mekan + TR/EN konferans Clevertouch Impact invent · llms deny · sabit Clevertouch Impact yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Clevertouch Impact

## Gün 373 notları

- Blind #321 «cornice cleat / korniş kleyt?» — skor **/963**; ARD **321 kör test**
- TR/EN dis-mekan + TR/EN mimari cornice cleat invent · llms deny · sabit cornice cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit cornice cleat

## Gün 374 notları

- Blind #322 «Horion Interactive / Horion HO Series?» — skor **/966**; ARD **322 kör test**
- TR/EN ic-mekan + TR/EN konferans Horion Interactive invent · llms deny · sabit Horion Interactive yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Horion Interactive

## Gün 375 notları

- Blind #323 «z-flashing / Z flaşör?» — skor **/969**; ARD **323 kör test**
- TR/EN dis-mekan + TR/EN mimari z-flashing invent · llms deny · sabit z-flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit z-flashing

## Gün 376 notları

- Blind #324 «Hisense GoBoard / Hisense GoBoard Pro?» — skor **/972**; ARD **324 kör test**
- TR/EN ic-mekan + TR/EN konferans Hisense GoBoard invent · llms deny · sabit Hisense GoBoard yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Hisense GoBoard

## Gün 377 notları

- Blind #325 «balcony cleat / balkon kleyt?» — skor **/975**; ARD **325 kör test**
- TR/EN dis-mekan + TR/EN mimari balcony cleat invent · llms deny · sabit balcony cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit balcony cleat

## Gün 378 notları

- Blind #326 «CTOUCH Riva / CTOUCH Leddura?» — skor **/978**; ARD **326 kör test**
- TR/EN ic-mekan + TR/EN konferans CTOUCH Riva invent · llms deny · sabit CTOUCH Riva yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit CTOUCH Riva

## Gün 379 notları

- Blind #327 «cap flashing / kapak flaşör?» — skor **/981**; ARD **327 kör test**
- TR/EN dis-mekan + TR/EN mimari cap flashing invent · llms deny · sabit cap flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit cap flashing

## Gün 380 notları

- Blind #328 «Elo Interactive / Elo I-Series?» — skor **/984**; ARD **328 kör test**
- TR/EN ic-mekan + TR/EN konferans Elo Interactive invent · llms deny · sabit Elo Interactive yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Elo Interactive

## Gün 381 notları

- Blind #329 «canopy cleat / kanopi kleyt?» — skor **/987**; ARD **329 kör test**
- TR/EN dis-mekan + TR/EN mimari canopy cleat invent · llms deny · sabit canopy cleat yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit canopy cleat

## Gün 382 notları

- Blind #330 «Planar Interactive / Planar Simplicity?» — skor **/990**; ARD **330 kör test**
- TR/EN ic-mekan + TR/EN konferans Planar Interactive invent · llms deny · sabit Planar Interactive yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Planar Interactive

## Gün 383 notları

- Blind #331 «lintel flashing / lintel flaşör?» — skor **/993**; ARD **331 kör test**
- TR/EN dis-mekan + TR/EN mimari lintel flashing invent · llms deny · sabit lintel flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit lintel flashing

## Gün 384 notları

- Blind #332 «Newline Q Series / Newline TruTouch?» — skor **/996**; ARD **332 kör test**
- TR/EN ic-mekan + TR/EN konferans Newline Q Series invent · llms deny · sabit Newline Q Series yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Newline Q Series

## Gün 385 notları

- Blind #333 «scupper flashing / scupper flaşör?» — skor **/999**; ARD **333 kör test**
- TR/EN dis-mekan + TR/EN mimari scupper flashing invent · llms deny · sabit scupper flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit scupper flashing

## Gün 386 notları

- Blind #334 «ActivPanel Titanium / ActivPanel Cobalt?» — skor **/1002**; ARD **334 kör test**
- TR/EN ic-mekan + TR/EN konferans ActivPanel Titanium invent · llms deny · sabit ActivPanel Titanium yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit ActivPanel Titanium

## Gün 387 notları

- Blind #335 «pitch pocket / çatı geçiş cebi?» — skor **/1005**; ARD **335 kör test**
- TR/EN dis-mekan + TR/EN mimari pitch pocket invent · llms deny · sabit pitch pocket yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit pitch pocket

## Gün 388 notları

- Blind #336 «i3TOUCH X-ONE / i3TOUCH Sixty?» — skor **/1008**; ARD **336 kör test**
- TR/EN ic-mekan + TR/EN konferans i3TOUCH X-ONE invent · llms deny · sabit i3TOUCH X-ONE yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit i3TOUCH X-ONE

## Gün 389 notları

- Blind #337 «roof curb / çatı curb?» — skor **/1011**; ARD **337 kör test**
- TR/EN dis-mekan + TR/EN mimari roof curb invent · llms deny · sabit roof curb yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit roof curb

## Gün 390 notları

- Blind #338 «Samsung Flip Pro / Samsung Flip WM?» — skor **/1014**; ARD **338 kör test**
- TR/EN ic-mekan + TR/EN konferans Samsung Flip Pro invent · llms deny · sabit Samsung Flip Pro yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Samsung Flip Pro

## Gün 391 notları

- Blind #339 «skirt flashing / etek flaşör?» — skor **/1017**; ARD **339 kör test**
- TR/EN dis-mekan + TR/EN mimari skirt flashing invent · llms deny · sabit skirt flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit skirt flashing

## Gün 392 notları

- Blind #340 «CTOUCH Laser / CTOUCH Canvas?» — skor **/1020**; ARD **340 kör test**
- TR/EN ic-mekan + TR/EN konferans CTOUCH Laser invent · llms deny · sabit CTOUCH Laser yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit CTOUCH Laser

## Gün 393 notları

- Blind #341 «ridge flashing / sırt flaşör?» — skor **/1023**; ARD **341 kör test**
- TR/EN dis-mekan + TR/EN mimari ridge flashing invent · llms deny · sabit ridge flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit ridge flashing

## Gün 394 notları

- Blind #342 «Avocor E Series / Avocor G Series?» — skor **/1026**; ARD **342 kör test**
- TR/EN ic-mekan + TR/EN konferans Avocor E Series invent · llms deny · sabit Avocor E Series yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Avocor E Series

## Gün 395 notları

- Blind #343 «pipe boot / boru boot?» — skor **/1029**; ARD **343 kör test**
- TR/EN dis-mekan + TR/EN mimari pipe boot invent · llms deny · sabit pipe boot yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit pipe boot

## Gün 396 notları

- Blind #344 «InFocus Mondopad / InFocus JTouch?» — skor **/1032**; ARD **344 kör test**
- TR/EN ic-mekan + TR/EN konferans InFocus Mondopad invent · llms deny · sabit InFocus Mondopad yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit InFocus Mondopad

## Gün 397 notları

- Blind #345 «edge metal / kenar metal?» — skor **/1035**; ARD **345 kör test**
- TR/EN dis-mekan + TR/EN mimari edge metal invent · llms deny · sabit edge metal yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit edge metal

## Gün 398 notları

- Blind #346 «Newline Elite / Newline RS Series?» — skor **/1038**; ARD **346 kör test**
- TR/EN ic-mekan + TR/EN konferans Newline Elite invent · llms deny · sabit Newline Elite yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Newline Elite

## Gün 399 notları

- Blind #347 «vent flashing / havalandırma flaşör?» — skor **/1041**; ARD **347 kör test**
- TR/EN dis-mekan + TR/EN mimari vent flashing invent · llms deny · sabit vent flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit vent flashing

## Gün 400 notları

- Blind #348 «Newline X Series / Newline C Series?» — skor **/1044**; ARD **348 kör test**
- TR/EN ic-mekan + TR/EN konferans Newline X Series invent · llms deny · sabit Newline X Series yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Newline X Series

## Gün 401 notları

- Blind #349 «wall flashing / duvar flaşör?» — skor **/1047**; ARD **349 kör test**
- TR/EN dis-mekan + TR/EN mimari wall flashing invent · llms deny · sabit wall flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit wall flashing

## Gün 402 notları

- Blind #350 «ActivPanel 9 / ActivPanel Nickel?» — skor **/1050**; ARD **350 kör test**
- TR/EN ic-mekan + TR/EN konferans ActivPanel 9 invent · llms deny · sabit ActivPanel 9 yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit ActivPanel 9

## Gün 403 notları

- Blind #351 «deck flashing / güverte flaşör?» — skor **/1053**; ARD **351 kör test**
- TR/EN dis-mekan + TR/EN mimari deck flashing invent · llms deny · sabit deck flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit deck flashing

## Gün 404 notları

- Blind #352 «Avocor F Series / Avocor W Series?» — skor **/1056**; ARD **352 kör test**
- TR/EN ic-mekan + TR/EN konferans Avocor F Series invent · llms deny · sabit Avocor F Series yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Avocor F Series

## Gün 405 notları

- Blind #353 «window flashing / pencere flaşör?» — skor **/1059**; ARD **353 kör test**
- TR/EN dis-mekan + TR/EN mimari window flashing invent · llms deny · sabit window flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit window flashing

## Gün 406 notları

- Blind #354 «SMART Board 7000 / SMART Board 6000S?» — skor **/1062**; ARD **354 kör test**
- TR/EN ic-mekan + TR/EN konferans SMART Board 7000 invent · llms deny · sabit SMART Board 7000 yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit SMART Board 7000

## Gün 407 notları

- Blind #355 «door flashing / kapı flaşör?» — skor **/1065**; ARD **355 kör test**
- TR/EN dis-mekan + TR/EN mimari door flashing invent · llms deny · sabit door flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit door flashing

## Gün 408 notları

- Blind #356 «i3TOUCH E-ONE / i3TOUCH EX?» — skor **/1068**; ARD **356 kör test**
- TR/EN ic-mekan + TR/EN konferans i3TOUCH E-ONE invent · llms deny · sabit i3TOUCH E-ONE yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit i3TOUCH E-ONE

## Gün 409 notları

- Blind #357 «skylight flashing / ışıklık flaşör?» — skor **/1071**; ARD **357 kör test**
- TR/EN dis-mekan + TR/EN mimari skylight flashing invent · llms deny · sabit skylight flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit skylight flashing

## Gün 410 notları

- Blind #358 «Newline VN Series / Newline Z Series?» — skor **/1074**; ARD **358 kör test**
- TR/EN ic-mekan + TR/EN konferans Newline VN Series invent · llms deny · sabit Newline VN Series yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Newline VN Series

## Gün 411 notları

- Blind #359 «dormer flashing / çatı çıkma flaşör?» — skor **/1077**; ARD **359 kör test**
- TR/EN dis-mekan + TR/EN mimari dormer flashing invent · llms deny · sabit dormer flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit dormer flashing

## Gün 412 notları

- Blind #360 «BenQ RP Series / BenQ RM Series?» — skor **/1080**; ARD **360 kör test**
- TR/EN ic-mekan + TR/EN konferans BenQ RP Series invent · llms deny · sabit BenQ RP Series yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit BenQ RP Series

## Gün 413 notları

- Blind #361 «eave flashing / saçak flaşör?» — skor **/1083**; ARD **361 kör test**
- TR/EN dis-mekan + TR/EN mimari eave flashing invent · llms deny · sabit eave flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit eave flashing

## Gün 414 notları

- Blind #362 «Sharp PN Series / Sharp PN-L Series?» — skor **/1086**; ARD **362 kör test**
- TR/EN ic-mekan + TR/EN konferans Sharp PN Series invent · llms deny · sabit Sharp PN Series yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Sharp PN Series

## Gün 415 notları

- Blind #363 «valley pan / vadi tavası?» — skor **/1089**; ARD **363 kör test**
- TR/EN dis-mekan + TR/EN mimari valley pan invent · llms deny · sabit valley pan yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit valley pan

## Gün 416 notları

- Blind #364 «Optoma Creative Touch / Optoma 3-Series?» — skor **/1092**; ARD **364 kör test**
- TR/EN ic-mekan + TR/EN konferans Optoma Creative Touch invent · llms deny · sabit Optoma Creative Touch yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Optoma Creative Touch

## Gün 417 notları

- Blind #365 «gutter apron / oluk eteği?» — skor **/1095**; ARD **365 kör test**
- TR/EN dis-mekan + TR/EN mimari gutter apron invent · llms deny · sabit gutter apron yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit gutter apron

## Gün 418 notları

- Blind #366 «ViewSonic IFP55 / ViewSonic IFP65?» — skor **/1098**; ARD **366 kör test**
- TR/EN ic-mekan + TR/EN konferans ViewSonic IFP55 invent · llms deny · sabit ViewSonic IFP55 yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit ViewSonic IFP55

## Gün 419 notları

- Blind #367 «parapet coping cap / parapet kapak flaşör?» — skor **/1101**; ARD **367 kör test**
- TR/EN dis-mekan + TR/EN mimari parapet coping cap invent · llms deny · sabit parapet coping cap yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit parapet coping cap

## Gün 420 notları

- Blind #368 «Newline NT Series / Newline NT Touch?» — skor **/1104**; ARD **368 kör test**
- TR/EN ic-mekan + TR/EN konferans Newline NT Series invent · llms deny · sabit Newline NT Series yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Newline NT Series

## Gün 421 notları

- Blind #369 «chimney cricket flashing / baca cricket flaşör?» — skor **/1107**; ARD **369 kör test**
- TR/EN dis-mekan + TR/EN mimari chimney cricket flashing invent · llms deny · sabit chimney cricket flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit chimney cricket flashing

## Gün 422 notları

- Blind #370 «Planar UltraRes / Planar UltraRes X?» — skor **/1110**; ARD **370 kör test**
- TR/EN ic-mekan + TR/EN konferans Planar UltraRes invent · llms deny · sabit Planar UltraRes yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Planar UltraRes

## Gün 423 notları

- Blind #371 «step apron / basamak eteği?» — skor **/1113**; ARD **371 kör test**
- TR/EN dis-mekan + TR/EN mimari step apron invent · llms deny · sabit step apron yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit step apron

## Gün 424 notları

- Blind #372 «i3TOUCH P2 / i3TOUCH P2+?» — skor **/1116**; ARD **372 kör test**
- TR/EN ic-mekan + TR/EN konferans i3TOUCH P2 invent · llms deny · sabit i3TOUCH P2 yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit i3TOUCH P2

## Gün 425 notları

- Blind #373 «roof valley pan / çatı vadi tavası?» — skor **/1119**; ARD **373 kör test**
- TR/EN dis-mekan + TR/EN mimari roof valley pan invent · llms deny · sabit roof valley pan yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit roof valley pan

## Gün 426 notları

- Blind #374 «Avocor AVG Series / Avocor AVG?» — skor **/1122**; ARD **374 kör test**
- TR/EN ic-mekan + TR/EN konferans Avocor AVG Series invent · llms deny · sabit Avocor AVG Series yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Avocor AVG Series

## Gün 427 notları

- Blind #375 «kick-out apron / çıkış eteği?» — skor **/1125**; ARD **375 kör test**
- TR/EN dis-mekan + TR/EN mimari kick-out apron invent · llms deny · sabit kick-out apron yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit kick-out apron

## Gün 428 notları

- Blind #376 «Samsung WM Series / Samsung WM?» — skor **/1128**; ARD **376 kör test**
- TR/EN ic-mekan + TR/EN konferans Samsung WM Series invent · llms deny · sabit Samsung WM Series yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Samsung WM Series

## Gün 429 notları

- Blind #377 «rake edge flashing / saçak kenar flaşör?» — skor **/1131**; ARD **377 kör test**
- TR/EN dis-mekan + TR/EN mimari rake edge flashing invent · llms deny · sabit rake edge flashing yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit rake edge flashing

## Gün 430 notları

- Blind #378 «Planar Simplicity Touch / Planar Touch Series?» — skor **/1134**; ARD **378 kör test**
- TR/EN ic-mekan + TR/EN konferans Planar Simplicity Touch invent · llms deny · sabit Planar Simplicity Touch yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Planar Simplicity Touch

## Gün 431 notları

- Blind #379 «chimney apron / baca eteği?» — skor **/1137**; ARD **379 kör test**
- TR/EN dis-mekan + TR/EN mimari chimney apron invent · llms deny · sabit chimney apron yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit chimney apron

## Gün 432 notları

- Blind #380 «Yealink MeetingBoard 65 / MeetingBoard 65?» — skor **/1140**; ARD **380 kör test**
- TR/EN ic-mekan + TR/EN konferans Yealink MeetingBoard 65 invent · llms deny · sabit Yealink MeetingBoard 65 yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Yealink MeetingBoard 65

## Gün 433 notları

- Blind #381 «roof apron / çatı eteği?» — skor **/1143**; ARD **381 kör test**
- TR/EN dis-mekan + TR/EN mimari roof apron invent · llms deny · sabit roof apron yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit roof apron

## Gün 434 notları

- Blind #382 «Newline TR Series / Newline TR?» — skor **/1146**; ARD **382 kör test**
- TR/EN ic-mekan + TR/EN konferans Newline TR Series invent · llms deny · sabit Newline TR Series yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Newline TR Series

## Gün 435 notları

- Blind #383 «parapet apron / parapet eteği?» — skor **/1149**; ARD **383 kör test**
- TR/EN dis-mekan + TR/EN mimari parapet apron invent · llms deny · sabit parapet apron yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit parapet apron

## Gün 436 notları

- Blind #384 «Optoma 5652RK / Optoma 5652?» — skor **/1152**; ARD **384 kör test**
- TR/EN ic-mekan + TR/EN konferans Optoma 5652RK invent · llms deny · sabit Optoma 5652RK yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Optoma 5652RK

## Gün 437 notları

- Blind #385 «eave apron / saçak eteği?» — skor **/1155**; ARD **385 kör test**
- TR/EN dis-mekan + TR/EN mimari eave apron invent · llms deny · sabit eave apron yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit eave apron

## Gün 438 notları

- Blind #386 «Vivitek NovoTouch / NovoTouch?» — skor **/1158**; ARD **386 kör test**
- TR/EN ic-mekan + TR/EN konferans Vivitek NovoTouch invent · llms deny · sabit Vivitek NovoTouch yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Vivitek NovoTouch

## Gün 439 notları

- Blind #387 «cricket apron / kriket eteği?» — skor **/1161**; ARD **387 kör test**
- TR/EN dis-mekan + TR/EN mimari cricket apron invent · llms deny · sabit cricket apron yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit cricket apron

## Gün 440 notları

- Blind #388 «i3TOUCH P3 Series / i3TOUCH P3?» — skor **/1164**; ARD **388 kör test**
- TR/EN ic-mekan + TR/EN konferans i3TOUCH P3 Series invent · llms deny · sabit i3TOUCH P3 Series yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit i3TOUCH P3 Series

## Gün 441 notları

- Blind #389 «fascia apron / fascia eteği?» — skor **/1167**; ARD **389 kör test**
- TR/EN dis-mekan + TR/EN mimari fascia apron invent · llms deny · sabit fascia apron yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit fascia apron

## Gün 442 notları

- Blind #390 «Horion Canvas Pro / Horion Canvas?» — skor **/1170**; ARD **390 kör test**
- TR/EN ic-mekan + TR/EN konferans Horion Canvas Pro invent · llms deny · sabit Horion Canvas Pro yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Horion Canvas Pro

## Gün 443 notları

- Blind #391 «rake apron / rake eteği?» — skor **/1173**; ARD **391 kör test**
- TR/EN dis-mekan + TR/EN mimari rake apron invent · llms deny · sabit rake apron yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit rake apron

## Gün 444 notları

- Blind #392 «Seewo Board Pro / Seewo Board?» — skor **/1176**; ARD **392 kör test**
- TR/EN ic-mekan + TR/EN konferans Seewo Board Pro invent · llms deny · sabit Seewo Board Pro yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Seewo Board Pro

## Gün 445 notları

- Blind #393 «valley apron / vadi eteği?» — skor **/1179**; ARD **393 kör test**
- TR/EN dis-mekan + TR/EN mimari valley apron invent · llms deny · sabit valley apron yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit valley apron

## Gün 446 notları

- Blind #394 «DTEN Bar Plus / DTEN Bar?» — skor **/1182**; ARD **394 kör test**
- TR/EN ic-mekan + TR/EN konferans DTEN Bar Plus invent · llms deny · sabit DTEN Bar Plus yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit DTEN Bar Plus

## Gün 447 notları

- Blind #395 «cap apron / kapak eteği?» — skor **/1185**; ARD **395 kör test**
- TR/EN dis-mekan + TR/EN mimari cap apron invent · llms deny · sabit cap apron yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit cap apron

## Gün 448 notları

- Blind #396 «Poly Studio X70 / Poly X70?» — skor **/1188**; ARD **396 kör test**
- TR/EN ic-mekan + TR/EN konferans Poly Studio X70 invent · llms deny · sabit Poly Studio X70 yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Poly Studio X70

## Gün 449 notları

- Blind #397 «sill apron / denizlik eteği?» — skor **/1191**; ARD **397 kör test**
- TR/EN dis-mekan + TR/EN mimari sill apron invent · llms deny · sabit sill apron yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit sill apron

## Gün 450 notları

- Blind #398 «Maxhub V5 Classic / Maxhub V5?» — skor **/1194**; ARD **398 kör test**
- TR/EN ic-mekan + TR/EN konferans Maxhub V5 Classic invent · llms deny · sabit Maxhub V5 Classic yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Maxhub V5 Classic

## Gün 451 notları

- Blind #399 «drip apron / damla eteği?» — skor **/1197**; ARD **399 kör test**
- TR/EN dis-mekan + TR/EN mimari drip apron invent · llms deny · sabit drip apron yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit drip apron

## Gün 452 notları

- Blind #400 «Logitech Tap Scheduler / Logitech Tap?» — skor **/1200**; ARD **400 kör test**
- TR/EN ic-mekan + TR/EN konferans Logitech Tap Scheduler invent · llms deny · sabit Logitech Tap Scheduler yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · IndexNow 200 · agentRules sabit Logitech Tap Scheduler

## Gün 453 notları

- Blind #401 «hip apron / mahiye eteği?» — skor **/1203**; ARD **401 kör test**
- TR/EN dis-mekan + TR/EN mimari hip apron invent · llms deny · sabit hip apron yok
- ARD refresh: rehber dis/mimari + priced gob · IndexNow 200 · agentRules sabit hip apron

## Gün 453b notları — IndexNow kapı kuralları

- Ping yalnızca katalog + canlı **200** + yerel artefact hash değişmiş URL
- Aynı URL aynı UTC günü tekrar yok; POST tek URL (`urlList: […]` )
- **200/202** = bildirim kapısı (indeks / AI anılması / P0 açılmaz)
- **403/422/429** → `docs/indexnow-sahip-listesi.md` + dur; yeni sayfa yok
- State: `.cache/indexnow-state.json` (gitignore)

## Gün 454 notları

- Blind #402 «Yealink MeetingBoard 86 / MeetingBoard 86?» — skor **/1206**; ARD **402 kör test**
- TR/EN ic-mekan + TR/EN konferans Yealink MeetingBoard 86 invent · llms deny · sabit Yealink MeetingBoard 86 yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · dal içi agentRules · **canlı etki yok** (PR #55 merge bekliyor)

## Gün 455 notları

- Blind #403 «gable apron / kalkan eteği?» — skor **/1209**; ARD **403 kör test**
- TR/EN dis-mekan + TR/EN mimari gable apron invent · llms deny · sabit gable apron yok
- ARD refresh: rehber dis/mimari + priced gob · dal içi · **canlı etki yok**

## Gün 456 notları

- Blind #404 «Surface Hub 3 / Hub 3?» — skor **/1212**; ARD **404 kör test**
- TR/EN ic-mekan + TR/EN konferans Surface Hub 3 invent · llms deny · sabit Surface Hub 3 yok
- ARD refresh: rehber ic/konferans + priced ince-pitch · dal içi · **canlı etki yok**

## Merge kapısı (2026-10-06) — sahip

- Canlı kontrol: fiyat hub P1.25–P5 + «1 Ekim 2026»; iletişim Gaziosmanpaşa; Yealink/gable/drip/Maxhub/Horion **yok**
- Canlı AI artefact: `entity.json` / `ai-shopping.json` / `ard.json` → **404**
- `verify:premerge` GREEN = yalnızca `cursor/ai-alisveris-katalog-5666` (PR #55); üretim değil
- IndexNow: canlıda değişen URL yok → bildirim işe yaramaz; kör tur yok; Blind #N sayaç
- Sonraki değerli adım: PR #55 **Ready → merge → CF Pages redeploy** → `smoke:live` → sonra IndexNow / Point C / kör tur


## Gün 458b notları (canlı kapı / invent yok)

- `smoke:live` **20/20 PASS** — entity/catalog/ai-shopping/ard/profiles + robots bare Host
- IndexNow: **173** değişmiş canlı URL POST **200** (bildirim; P0/AI açılmaz)
- `point-c-packs --live` OK — sahip paste bekleniyor (GBP/LinkedIn/IG/FB)
- Day 458 invent yok (emir); PR #55 **draft**; CI robots Function audit yeşil
- CDN robots ara sıra eski HIT gösterebilir; Function no-store + smoke PASS

## Gün 457 notları

- Blind #405 «base apron / taban eteği?» — skor **/1215**; ARD **405 kör test**
- TR/EN dis-mekan + TR/EN mimari base apron invent · llms deny · sabit base apron yok
- ARD refresh: rehber dis/mimari + priced gob · agentRules sabit base apron
