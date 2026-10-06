# Case study foto gaps (Gün 19)

Son güncelleme: 2026-10-05  
Kural: **uydurma / stok yanlış eşleme yok** — yalnız kimliği net dosyalar `IMAGE_BY_REF`’e girer.  
Guard: `npm run audit:case-images` (postbuild)

Kaynak: `src/content/case-studies.ts` → `IMAGE_BY_REF`  
Sayfalar: `/tr/projelerimiz/<slug>/` (foto yoksa “henüz eşleşen fotoğraf bağlı değil” notu + galeri linki)

## Özet

| Durum | Adet |
|-------|------|
| Yayımlanabilir case study | 29 |
| En az 1 gerçek foto bağlı | **8** |
| Foto eksik (owner yükleme bekliyor) | **21** |

Makinece envanter (build sonrası yenilenir): [`case-study-photo-gaps.generated.json`](./case-study-photo-gaps.generated.json)

## Fotoğu olanlar (dokunma / sadece gerçek ekle)

| ref | Slug | Foto |
|-----|------|------|
| ref-05 | manisa-buyuksehir-belediyesi-led-ekran | 1 |
| ref-14 | beylikduzu-yasam-cafe-led-ekran | 3 |
| ref-22 | white-city-resort-hotel-led-ekran | 1 |
| ref-26 | unye-belediyesi-ordu-gunleri-led-ekran | 2 |
| ref-27 | bursa-led-ekran | 1 |
| ref-38 | istanbul-drama-sanat-atolyesi-led-ekran | 1 |
| ref-39 | sinan-polat-sigorta-led-ekran | 5 |
| ref-44 | barcelona-club-led-ekran | 2 |

`public/blog/*` orijinaller `public/opt/blog/` kopyalarından geri yüklendi (Gün 19); OptImage `/opt` WebP ile zaten çalışıyordu.

## Foto eksik — owner checklist

Instagram Reels/Hikaye kaynağı olan kayıtlar için saha fotoğrafı export → `public/projects/case/<slug>/` → `IMAGE_BY_REF` satırı.

| Öncelik | ref | Proje | Konum | Tarih | Kaynak notu |
|---------|-----|-------|-------|-------|-------------|
| P0 | ref-02 | Ayberk Sigorta | Aksaray | Tem 2026 | Reels + Hikaye (CWV smoke URL) |
| P0 | ref-05 zaten var | — | — | — | — |
| P0 | ref-01 | Giresun Proje | Giresun | Tem 2026 | Hikaye |
| P1 | ref-03 | Beren Kırtasiye | Aksaray | Tem 2026 | Reels |
| P1 | ref-04 | Ouka Kafe | Aksaray | Haz 2026 | Reels |
| P1 | ref-06 | Matiz Sahne | Kadıköy | May 2026 | Reels |
| P1 | ref-07 | Babil Cafe | Niğde | May 2026 | Reels |
| P1 | ref-15 | Gnd Triko | Merter | Şub 2026 | — |
| P1 | ref-23 | Beylikdüzü Belediyesi | İstanbul | Ara 2025 | — |
| P2 | ref-09 | Bireysel müşteri | Aksaray | Nis 2026 | İsim gizliliği |
| P2 | ref-16 | Manisa (2 adet) | Manisa | Şub 2026 | — |
| P2 | ref-18 | Manisa Proje | Manisa | Şub 2026 | — |
| P2 | ref-25 | Yalova Malt | Yalova | Ara 2025 | — |
| P2 | ref-28 | Keşan Golet | Keşan | Kas 2025 | — |
| P2 | ref-29 | Prestij Cafe | Osmanbey | Kas 2025 | — |
| P2 | ref-32 | Hair Make-up Studio | Dikili | Eki 2025 | — |
| P2 | ref-33 | Orta Şekerli Kampüs | Yozgat | Eyl 2025 | — |
| P2 | ref-34 | Orta Şekerli Kentpark | Yozgat | Eyl 2025 | — |
| P2 | ref-37 | Doğu Prodüksiyon | Van | Eyl 2025 | — |
| P2 | ref-45 | Umut Radyoloji | Van | Tem 2025 | — |
| P3 | ref-24 | Bireysel (Berlin) | Almanya | Ara 2025 | Yurt dışı; onay |
| P3 | ref-30 | Azerbaycan | Azerbaycan | Kas 2025 | Onay |

## Nasıl eklenir (sahip / mühendis)

1. Gerçek kurulum fotoğrafını koy: `public/projects/case/<slug>/<n>.jpg`
2. `npm run` optimize-images (veya mevcut pipeline) → manifest + `/opt` WebP
3. `IMAGE_BY_REF["ref-XX"]` altına `{ src, alt }` — alt metinde proje adı + konum
4. `npm run audit:case-images` yeşil olmalı
5. **Yasak:** başka projenin görselini “benzer” diye bağlamak; stock; AI generate

## Makine kontrolü

```bash
node scripts/audit-case-study-images.mjs
# postbuild içinde audit:case-images
```
