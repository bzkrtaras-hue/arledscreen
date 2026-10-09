/**
 * GENERATED from the owner price list (ARLEDSCREEN fiyat listesi, 09.05.2026 sheets 4–8;
 * non-panel prices copied verbatim, USD, KDV hariç). Panel rows carry NO list price:
 * they reference prices.ts (PANEL_PRICES = site price, DERIVED_PANEL_PRICES = average ratio).
 * Regenerate with /workspace/fiyat-listesi/gen/gen_materials.py + to_ts.py; do not hand-edit prices.
 */
import type { MaterialSection } from "@/content/materials";

export const MATERIAL_SECTIONS: Record<string, MaterialSection[]> = {
  "kontrol-kartlari": [
    {
      "title": "TF kontrol kartları (tek renk)",
      "cols": [
        "Model",
        "Port · kapasite",
        "Fiyat (USD)"
      ],
      "kind": "default",
      "items": [
        {
          "id": "tf-tf-lu20",
          "name": "TF-LU20",
          "spec": "2'li · 16x640 / 32x320 Piksel",
          "usd": 5
        },
        {
          "id": "tf-tf-s6u",
          "name": "TF-S6U",
          "spec": "2'li · 16x1280 / 32x640 Piksel",
          "usd": 7.5
        },
        {
          "id": "tf-tf-a6u",
          "name": "TF-A6U",
          "spec": "4'lü · 32x768 / 64x384 Piksel",
          "usd": 10
        },
        {
          "id": "tf-tf-mu",
          "name": "TF-MU",
          "spec": "RS+USB 6'lı · 32x1536 / 64x768 Piksel",
          "usd": 16
        },
        {
          "id": "tf-tf-c6ur",
          "name": "TF-C6UR",
          "spec": "8'li · 64x2048 / 128x1024 Piksel",
          "usd": 20
        },
        {
          "id": "tf-tf-s6uw",
          "name": "TF-S6UW",
          "spec": "Wi-Fi 2'li · 16x1280 / 32x640 Piksel",
          "usd": 10.5
        },
        {
          "id": "tf-tf-a6uw",
          "name": "TF-A6UW",
          "spec": "Wi-Fi 4'lü · 32x768 / 64x384 Piksel",
          "usd": 14
        },
        {
          "id": "tf-tf-m6uw",
          "name": "TF-M6UW",
          "spec": "Wi-Fi 6'lı · 32x1536 / 64x768 Piksel",
          "usd": 18
        },
        {
          "id": "tf-tf-c6uw",
          "name": "TF-C6UW",
          "spec": "Wi-Fi 8'li · 64x2048 / 128x1024 Piksel",
          "usd": 24
        },
        {
          "id": "tf-tf-e6uw",
          "name": "TF-E6UW",
          "spec": "Wi-Fi+HUB 16'lı · 64x2048 / 128x1024 Piksel",
          "usd": 36
        }
      ]
    },
    {
      "title": "Huidu kontrol kartları — tek renk ve aksesuar",
      "cols": [
        "Model",
        "Port · kapasite",
        "Fiyat (USD)"
      ],
      "kind": "default",
      "items": [
        {
          "id": "hd-huidu-hd-u6a",
          "name": "Huidu HD-U6A",
          "spec": "2'li · 32x320 Piksel",
          "usd": 5,
          "brand": "Huidu"
        },
        {
          "id": "hd-huidu-hd-u60",
          "name": "Huidu HD-U60",
          "spec": "2'li · 32x512 Piksel",
          "usd": 6.5,
          "brand": "Huidu"
        },
        {
          "id": "hd-huidu-hd-u6b",
          "name": "Huidu HD-U6B",
          "spec": "3'lü · 48x1024 Piksel",
          "usd": 7.5,
          "brand": "Huidu"
        },
        {
          "id": "hd-huidu-hd-u62",
          "name": "Huidu HD-U62",
          "spec": "4'lü · 64x768 Piksel",
          "usd": 10,
          "brand": "Huidu"
        },
        {
          "id": "hd-huidu-hd-w2",
          "name": "Huidu HD-W2",
          "spec": "Wi-Fi 2'li · 32x512 px (Sensörsüz)",
          "usd": 5,
          "brand": "Huidu"
        },
        {
          "id": "hd-huidu-hd-w02",
          "name": "Huidu HD-W02",
          "spec": "Wi-Fi 2'li · 32x512 px (Sensörlü)",
          "usd": 7,
          "brand": "Huidu"
        },
        {
          "id": "hd-huidu-hd-w3",
          "name": "Huidu HD-W3",
          "spec": "Wi-Fi 3'lü · 48x1024 px (Sensörsüz)",
          "usd": 6,
          "brand": "Huidu"
        },
        {
          "id": "hd-huidu-hd-w04",
          "name": "Huidu HD-W04",
          "spec": "Wi-Fi 4'lü · 64x768 Piksel",
          "usd": 7.5,
          "brand": "Huidu"
        },
        {
          "id": "hd-huidu-hd-w60",
          "name": "Huidu HD-W60",
          "spec": "USB+Wi-Fi 2'li · 32x1024 Piksel",
          "usd": 10.5,
          "brand": "Huidu"
        },
        {
          "id": "hd-huidu-hd-w62",
          "name": "Huidu HD-W62",
          "spec": "USB+Wi-Fi 4'lü · 64x1024 Piksel",
          "usd": 17,
          "brand": "Huidu"
        },
        {
          "id": "hd-huidu-hd-w63",
          "name": "Huidu HD-W63",
          "spec": "USB+Wi-Fi 8'li · 128x1024 Piksel",
          "usd": 23,
          "brand": "Huidu"
        },
        {
          "id": "hd-huidu-hd-w64a",
          "name": "Huidu HD-W64A",
          "spec": "USB+Wi-Fi 16'lı · 256x1024 Piksel",
          "usd": 34,
          "brand": "Huidu"
        },
        {
          "id": "hd-huidu-hd-w66",
          "name": "Huidu HD-W66",
          "spec": "USB+Wi-Fi 32'li · 512x2048 Piksel",
          "usd": 57,
          "brand": "Huidu"
        },
        {
          "id": "hd-huidu-hd-e62",
          "name": "Huidu HD-E62",
          "spec": "USB+ETH 4'lü · 64x1024 Piksel",
          "usd": 20,
          "brand": "Huidu"
        },
        {
          "id": "hd-huidu-hd-e63",
          "name": "Huidu HD-E63",
          "spec": "USB+ETH 8'li · 128x1024 Piksel",
          "usd": 30,
          "brand": "Huidu"
        },
        {
          "id": "hd-huidu-hd-e64",
          "name": "Huidu HD-E64",
          "spec": "USB+ETH 16'lı · 256x1024 Piksel",
          "usd": 44,
          "brand": "Huidu"
        },
        {
          "id": "hd-huidu-hd-isi-sensoru",
          "name": "Huidu HD ısı sensörü",
          "spec": "TF ve HD Kartlara Uyumlu",
          "usd": 6.5,
          "brand": "Huidu"
        },
        {
          "id": "hd-huidu-hd-isi-nem-sensoru",
          "name": "Huidu HD ısı + nem sensörü",
          "spec": "TF ve HD Kartlara Uyumlu",
          "usd": 8.5,
          "brand": "Huidu"
        },
        {
          "id": "hd-huidu-goz-ve-kumanda-seti",
          "name": "Huidu göz ve kumanda seti",
          "spec": "Set",
          "usd": 10,
          "brand": "Huidu"
        },
        {
          "id": "hd-huidu-hub-75-08",
          "name": "Huidu HUB 75-08",
          "spec": "HD Kartlara Uyumlu",
          "usd": 7,
          "brand": "Huidu"
        },
        {
          "id": "hd-huidu-hub-12-16",
          "name": "Huidu HUB 12-16",
          "spec": "HD Kartlara Uyumlu",
          "usd": 9.5,
          "brand": "Huidu"
        }
      ]
    },
    {
      "title": "Huidu RGB kontrol kartları ve alıcı kartlar",
      "cols": [
        "Model",
        "Port · kapasite",
        "Fiyat (USD)"
      ],
      "kind": "default",
      "items": [
        {
          "id": "hdrgb-huidu-hd-wf1",
          "name": "Huidu HD-WF1",
          "spec": "Tekli Wi-Fi · 32x640 Piksel",
          "usd": 6,
          "brand": "Huidu"
        },
        {
          "id": "hdrgb-huidu-hd-wf2",
          "name": "Huidu HD-WF2",
          "spec": "2'li Wi-Fi · 64x768 Piksel",
          "usd": 9.5,
          "brand": "Huidu"
        },
        {
          "id": "hdrgb-huidu-hd-wf4",
          "name": "Huidu HD-WF4",
          "spec": "4'lü Wi-Fi · 128x768 Piksel",
          "usd": 12.5,
          "brand": "Huidu"
        },
        {
          "id": "hdrgb-huidu-hd-d16",
          "name": "Huidu HD-D16",
          "spec": "HUB75 4'lü · Video - 64x640 px",
          "usd": 51,
          "brand": "Huidu"
        },
        {
          "id": "hdrgb-huidu-hd-d16-sdk",
          "name": "Huidu HD-D16 SDK",
          "spec": "HUB75 4'lü · Video+SDK - 64x640 px",
          "usd": 67,
          "brand": "Huidu"
        },
        {
          "id": "hdrgb-huidu-hd-c16l",
          "name": "Huidu HD-C16L",
          "spec": "Wi-Fi 12'li · 1280x512 Piksel",
          "usd": 75,
          "brand": "Huidu"
        },
        {
          "id": "hdrgb-huidu-hd-c08l",
          "name": "Huidu HD-C08L",
          "spec": "Wi-Fi 8'li · 1024x192 Piksel",
          "usd": 65,
          "brand": "Huidu"
        },
        {
          "id": "hdrgb-huidu-hd-a3l",
          "name": "Huidu HD-A3L",
          "spec": "Wi-Fi 16GB 1P · 1280x512 Piksel",
          "usd": 71,
          "brand": "Huidu"
        },
        {
          "id": "hdrgb-huidu-hd-a4l",
          "name": "Huidu HD-A4L",
          "spec": "Wi-Fi 16GB 1P · 1280x512 Piksel",
          "usd": 130,
          "brand": "Huidu"
        },
        {
          "id": "hdrgb-huidu-hd-a5l",
          "name": "Huidu HD-A5L",
          "spec": "Wi-Fi 16GB 2P · 1280x1024 Piksel",
          "usd": 187,
          "brand": "Huidu"
        },
        {
          "id": "hdrgb-huidu-hd-a6l",
          "name": "Huidu HD-A6L",
          "spec": "Wi-Fi 16GB 4P · 1920x1200 Piksel",
          "usd": 262,
          "brand": "Huidu"
        },
        {
          "id": "hdrgb-huidu-hd-h4k",
          "name": "Huidu HD-H4K",
          "spec": "Wi-Fi 16GB · 65536x8192 Piksel",
          "usd": 322,
          "brand": "Huidu"
        },
        {
          "id": "hdrgb-huidu-hd-h6",
          "name": "Huidu HD-H6",
          "spec": "4K Wi-Fi 64GB 6P · 65536x8192 Piksel",
          "usd": 452,
          "brand": "Huidu"
        },
        {
          "id": "hdrgb-huidu-hd-h8",
          "name": "Huidu HD-H8",
          "spec": "4K Wi-Fi 64GB 8P · 65536x8192 Piksel",
          "usd": 582,
          "brand": "Huidu"
        },
        {
          "id": "hdrgb-huidu-hd-r708",
          "name": "Huidu HD-R708",
          "spec": "Receiving · 128x512 Piksel",
          "usd": 20,
          "brand": "Huidu"
        },
        {
          "id": "hdrgb-huidu-hd-r712",
          "name": "Huidu HD-R712",
          "spec": "Receiving · 256x512 Piksel",
          "usd": 26,
          "brand": "Huidu"
        },
        {
          "id": "hdrgb-huidu-hd-r716",
          "name": "Huidu HD-R716",
          "spec": "Receiving · 640x512 Piksel",
          "usd": 34,
          "brand": "Huidu"
        },
        {
          "id": "hdrgb-sensor-box-s108",
          "name": "SENSOR BOX S108",
          "spec": "Isı/Nem/Parlak",
          "usd": 47
        }
      ]
    }
  ],
  "novastar-alici-gonderici": [
    {
      "title": "NovaStar alıcı kartlar",
      "cols": [
        "Model",
        "Özellik",
        "Fiyat (USD)"
      ],
      "kind": "default",
      "items": [
        {
          "id": "nova-novastar-dh7508-s",
          "name": "NovaStar DH7508-S",
          "spec": "HUB75 - 256x256 Piksel",
          "usd": 15.5,
          "brand": "NovaStar"
        },
        {
          "id": "nova-novastar-dh7512-s",
          "name": "NovaStar DH7512-S",
          "spec": "HUB75 - 512x512 Piksel",
          "usd": 17.5,
          "brand": "NovaStar"
        },
        {
          "id": "nova-novastar-dh7516-s",
          "name": "NovaStar DH7516-S",
          "spec": "HUB75 - 512x384 Piksel",
          "usd": 18.5,
          "brand": "NovaStar"
        },
        {
          "id": "nova-novastar-nv3210",
          "name": "NovaStar NV3210",
          "spec": "HUB32 - 512x512 Piksel",
          "usd": 25,
          "brand": "NovaStar"
        }
      ]
    },
    {
      "title": "NovaStar gönderici kart, medya oynatıcı ve kontrol kutuları",
      "cols": [
        "Model",
        "Özellik",
        "Fiyat (USD)"
      ],
      "kind": "default",
      "items": [
        {
          "id": "nova-novastar-tb10-plus",
          "name": "NovaStar TB10 Plus",
          "spec": "650.000 Piksel",
          "usd": 140,
          "brand": "NovaStar"
        },
        {
          "id": "nova-novastar-tb20-plus",
          "name": "NovaStar TB20 Plus",
          "spec": "Canlı Yayın - 650.000 Piksel",
          "usd": 179,
          "brand": "NovaStar"
        },
        {
          "id": "nova-novastar-tb40",
          "name": "NovaStar TB40",
          "spec": "Canlı Yayın - 1.300.000 Piksel",
          "usd": 240,
          "brand": "NovaStar"
        },
        {
          "id": "nova-novastar-tb60",
          "name": "NovaStar TB60",
          "spec": "Canlı Yayın - 2.600.000 Piksel",
          "usd": 560,
          "brand": "NovaStar"
        },
        {
          "id": "nova-novastar-tu15-pro",
          "name": "NovaStar TU15 PRO",
          "spec": "Android - 2.600.000 Piksel",
          "usd": 710,
          "brand": "NovaStar"
        },
        {
          "id": "nova-novastar-tu20-pro",
          "name": "NovaStar TU20 PRO",
          "spec": "Android - 3.900.000 Piksel",
          "usd": 960,
          "brand": "NovaStar"
        },
        {
          "id": "nova-novastar-tu-4k-pro",
          "name": "NovaStar TU 4K PRO",
          "spec": "Android - 13.000.000 Piksel",
          "usd": 1410,
          "brand": "NovaStar"
        },
        {
          "id": "nova-novastar-msd300",
          "name": "NovaStar MSD300",
          "spec": "Canlı Yayın - 1.300.000 Piksel",
          "usd": 290,
          "brand": "NovaStar"
        },
        {
          "id": "nova-novastar-msd600",
          "name": "NovaStar MSD600",
          "spec": "Canlı Yayın - 2.300.000 Piksel",
          "usd": 430,
          "brand": "NovaStar"
        },
        {
          "id": "nova-novastar-mctrl300",
          "name": "NovaStar MCTRL300",
          "spec": "Canlı Yayın - 1.300.000 Piksel",
          "usd": 360,
          "brand": "NovaStar"
        },
        {
          "id": "nova-novastar-mctrl600",
          "name": "NovaStar MCTRL600",
          "spec": "Canlı Yayın - 2.300.000 Piksel",
          "usd": 490,
          "brand": "NovaStar"
        },
        {
          "id": "nova-novastar-mctrl700",
          "name": "NovaStar MCTRL700",
          "spec": "Canlı Yayın - 2.300.000 Piksel",
          "usd": 530,
          "brand": "NovaStar"
        }
      ]
    },
    {
      "title": "Fiber dönüştürücü",
      "cols": [
        "Model",
        "Özellik",
        "Fiyat (USD)"
      ],
      "kind": "default",
      "items": [
        {
          "id": "nova-novastar-cvt-320",
          "name": "NovaStar CVT 320",
          "spec": "Fiber Dönüştürücü - 15 km",
          "usd": 87,
          "brand": "NovaStar"
        }
      ]
    }
  ],
  "video-islemci": [
    {
      "title": "NovaStar video işlemciler",
      "cols": [
        "Model",
        "Kapasite · maks. çözünürlük",
        "Fiyat (USD)"
      ],
      "kind": "default",
      "items": [
        {
          "id": "vp-novastar-vx400",
          "name": "NovaStar VX400",
          "spec": "2.6M px - W:10240 H:8192",
          "usd": 1310,
          "brand": "NovaStar"
        },
        {
          "id": "vp-novastar-vx600",
          "name": "NovaStar VX600",
          "spec": "3.9M px - W:10240 H:8192",
          "usd": 1460,
          "brand": "NovaStar"
        },
        {
          "id": "vp-novastar-vx1000",
          "name": "NovaStar VX1000",
          "spec": "6.5M px - W:10240 H:8192",
          "usd": 1860,
          "brand": "NovaStar"
        },
        {
          "id": "vp-novastar-vx16s",
          "name": "NovaStar VX16S",
          "spec": "10.4M px - W:10240 H:8192",
          "usd": 3010,
          "brand": "NovaStar"
        },
        {
          "id": "vp-novastar-vx2000",
          "name": "NovaStar VX2000",
          "spec": "13M px - W:16384 H:8192",
          "usd": 3410,
          "brand": "NovaStar"
        }
      ]
    },
    {
      "title": "Huidu video işlemciler",
      "cols": [
        "Model",
        "Kapasite · maks. çözünürlük",
        "Fiyat (USD)"
      ],
      "kind": "default",
      "items": [
        {
          "id": "vp-huidu-hd-vp210h",
          "name": "Huidu HD-VP210H",
          "spec": "1.3M px - W:3840 H:1920",
          "usd": 390,
          "brand": "Huidu"
        },
        {
          "id": "vp-huidu-hd-vp410h",
          "name": "Huidu HD-VP410H",
          "spec": "2.6M px - W:3840 H:1920",
          "usd": 530,
          "brand": "Huidu"
        },
        {
          "id": "vp-huidu-hd-vp620-4k",
          "name": "Huidu HD-VP620 4K",
          "spec": "3.9M px - W:8192 H:4096",
          "usd": 690,
          "brand": "Huidu"
        },
        {
          "id": "vp-huidu-hd-vp820-4k",
          "name": "Huidu HD-VP820 4K",
          "spec": "5.2M px - W:8192 H:4096",
          "usd": 830,
          "brand": "Huidu"
        },
        {
          "id": "vp-huidu-hd-vp830-sdi",
          "name": "Huidu HD-VP830 SDI",
          "spec": "5.2M px - W:8192 H:4096",
          "usd": 930,
          "brand": "Huidu"
        },
        {
          "id": "vp-huidu-hd-vp1240a-4k",
          "name": "Huidu HD-VP1240A 4K",
          "spec": "7.8M px - W:16000 H:4000",
          "usd": 1110,
          "brand": "Huidu"
        },
        {
          "id": "vp-huidu-hd-p601",
          "name": "Huidu HD-P601",
          "spec": "1920x1280 px @60Hz",
          "usd": 290,
          "brand": "Huidu"
        }
      ]
    }
  ],
  "trafo-adaptor": [
    {
      "title": "5V adaptörler ve DC-DC dönüştürücüler",
      "cols": [
        "Model",
        "Tip",
        "Fiyat (USD)"
      ],
      "kind": "default",
      "items": [
        {
          "id": "psu-5v-10a",
          "name": "5V 10A",
          "spec": "Plastik Kasa",
          "usd": 9
        },
        {
          "id": "psu-5v-40a",
          "name": "5V 40A",
          "spec": "YOUYI - Slim",
          "usd": 11
        },
        {
          "id": "psu-5v-60a",
          "name": "5V 60A",
          "spec": "YOUYI - Slim - Akıllı Fanlı",
          "usd": 15
        },
        {
          "id": "psu-dc-dc-10a",
          "name": "DC-DC 10A",
          "spec": "9V-35V Dönüştürücü",
          "usd": 8
        },
        {
          "id": "psu-dc-dc-20a",
          "name": "DC-DC 20A",
          "spec": "9V-35V Dönüştürücü",
          "usd": 12
        }
      ]
    }
  ],
  "cnc-kasa": [
    {
      "title": "Slim CNC kasalar",
      "cols": [
        "Ölçü",
        "Özellik",
        "Fiyat (USD)"
      ],
      "kind": "default",
      "items": [
        {
          "id": "cnc-slim-16-x-32-cm",
          "name": "Slim CNC kasa 16 x 32 cm",
          "spec": "Slim",
          "usd": 12.5
        },
        {
          "id": "cnc-slim-16-x-64-cm",
          "name": "Slim CNC kasa 16 x 64 cm",
          "spec": "Slim",
          "usd": 16.5
        },
        {
          "id": "cnc-slim-12-8-x-25-6-cm",
          "name": "Slim CNC kasa 12.8 x 25.6 cm",
          "spec": "P8 · slim",
          "usd": 11.5
        },
        {
          "id": "cnc-slim-12-8-x-51-2-cm",
          "name": "Slim CNC kasa 12.8 x 51.2 cm",
          "spec": "P8 · slim",
          "usd": 18
        }
      ]
    },
    {
      "title": "16 serisi CNC kasalar",
      "cols": [
        "Ölçü (cm)",
        "Tek yüzlü (USD)",
        "Çift yüzlü (USD)"
      ],
      "kind": "cnc",
      "items": [
        {
          "id": "cnc-16-16-x-32",
          "name": "CNC kasa 16 × 32 cm",
          "spec": "16 serisi",
          "usd": 11.5,
          "usd2": 18
        },
        {
          "id": "cnc-16-16-x-64",
          "name": "CNC kasa 16 × 64 cm",
          "spec": "16 serisi",
          "usd": 15.5,
          "usd2": 26
        },
        {
          "id": "cnc-16-16-x-96",
          "name": "CNC kasa 16 × 96 cm",
          "spec": "16 serisi",
          "usd": 19.5,
          "usd2": 34
        },
        {
          "id": "cnc-16-16-x-128",
          "name": "CNC kasa 16 × 128 cm",
          "spec": "16 serisi",
          "usd": 22.5,
          "usd2": 40
        },
        {
          "id": "cnc-16-16-x-160",
          "name": "CNC kasa 16 × 160 cm",
          "spec": "16 serisi",
          "usd": 26,
          "usd2": 47
        },
        {
          "id": "cnc-16-16-x-192",
          "name": "CNC kasa 16 × 192 cm",
          "spec": "16 serisi",
          "usd": 29,
          "usd2": 51
        },
        {
          "id": "cnc-16-16-x-224",
          "name": "CNC kasa 16 × 224 cm",
          "spec": "16 serisi",
          "usd": 32.5,
          "usd2": 57
        },
        {
          "id": "cnc-16-16-x-256",
          "name": "CNC kasa 16 × 256 cm",
          "spec": "16 serisi",
          "usd": 35.5,
          "usd2": 64
        }
      ]
    },
    {
      "title": "32 serisi CNC kasalar",
      "cols": [
        "Ölçü (cm)",
        "Tek yüzlü (USD)",
        "Çift yüzlü (USD)"
      ],
      "kind": "cnc",
      "items": [
        {
          "id": "cnc-32-32-x-32",
          "name": "CNC kasa 32 × 32 cm",
          "spec": "32 serisi",
          "usd": 16.5,
          "usd2": 28
        },
        {
          "id": "cnc-32-32-x-64",
          "name": "CNC kasa 32 × 64 cm",
          "spec": "32 serisi",
          "usd": 21,
          "usd2": 37
        },
        {
          "id": "cnc-32-32-x-96",
          "name": "CNC kasa 32 × 96 cm",
          "spec": "32 serisi",
          "usd": 26,
          "usd2": 44.5
        },
        {
          "id": "cnc-32-32-x-128",
          "name": "CNC kasa 32 × 128 cm",
          "spec": "32 serisi",
          "usd": 30,
          "usd2": 53
        },
        {
          "id": "cnc-32-32-x-160",
          "name": "CNC kasa 32 × 160 cm",
          "spec": "32 serisi",
          "usd": 36.5,
          "usd2": 64
        },
        {
          "id": "cnc-32-32-x-192",
          "name": "CNC kasa 32 × 192 cm",
          "spec": "32 serisi",
          "usd": 42,
          "usd2": 72
        },
        {
          "id": "cnc-32-32-x-224",
          "name": "CNC kasa 32 × 224 cm",
          "spec": "32 serisi",
          "usd": 53,
          "usd2": 81.5
        },
        {
          "id": "cnc-32-32-x-256",
          "name": "CNC kasa 32 × 256 cm",
          "spec": "32 serisi",
          "usd": 57.5,
          "usd2": 91.5
        }
      ]
    },
    {
      "title": "48 serisi CNC kasalar",
      "cols": [
        "Ölçü (cm)",
        "Tek yüzlü (USD)",
        "Çift yüzlü (USD)"
      ],
      "kind": "cnc",
      "items": [
        {
          "id": "cnc-48-48-x-64",
          "name": "CNC kasa 48 × 64 cm",
          "spec": "48 serisi",
          "usd": 26,
          "usd2": 45
        },
        {
          "id": "cnc-48-48-x-96",
          "name": "CNC kasa 48 × 96 cm",
          "spec": "48 serisi",
          "usd": 33,
          "usd2": 57.5
        },
        {
          "id": "cnc-48-48-x-128",
          "name": "CNC kasa 48 × 128 cm",
          "spec": "48 serisi",
          "usd": 44,
          "usd2": 67.5
        },
        {
          "id": "cnc-48-48-x-160",
          "name": "CNC kasa 48 × 160 cm",
          "spec": "48 serisi",
          "usd": 48,
          "usd2": 80
        },
        {
          "id": "cnc-48-48-x-192",
          "name": "CNC kasa 48 × 192 cm",
          "spec": "48 serisi",
          "usd": 53.5,
          "usd2": 92
        },
        {
          "id": "cnc-48-48-x-224",
          "name": "CNC kasa 48 × 224 cm",
          "spec": "48 serisi",
          "usd": 60,
          "usd2": 102.5
        },
        {
          "id": "cnc-48-48-x-256",
          "name": "CNC kasa 48 × 256 cm",
          "spec": "48 serisi",
          "usd": 69,
          "usd2": 117.5
        }
      ]
    },
    {
      "title": "64 serisi CNC kasalar",
      "cols": [
        "Ölçü (cm)",
        "Tek yüzlü (USD)",
        "Çift yüzlü (USD)"
      ],
      "kind": "cnc",
      "items": [
        {
          "id": "cnc-64-64-x-64",
          "name": "CNC kasa 64 × 64 cm",
          "spec": "64 serisi",
          "usd": 32,
          "usd2": 55
        },
        {
          "id": "cnc-64-64-x-96",
          "name": "CNC kasa 64 × 96 cm",
          "spec": "64 serisi",
          "usd": 41,
          "usd2": 71
        },
        {
          "id": "cnc-64-64-x-128",
          "name": "CNC kasa 64 × 128 cm",
          "spec": "64 serisi",
          "usd": 50.5,
          "usd2": 87.5
        },
        {
          "id": "cnc-64-64-x-160",
          "name": "CNC kasa 64 × 160 cm",
          "spec": "64 serisi",
          "usd": 61,
          "usd2": 105
        },
        {
          "id": "cnc-64-64-x-192",
          "name": "CNC kasa 64 × 192 cm",
          "spec": "64 serisi",
          "usd": 71,
          "usd2": 125.5
        },
        {
          "id": "cnc-64-64-x-224",
          "name": "CNC kasa 64 × 224 cm",
          "spec": "64 serisi",
          "usd": 81.5,
          "usd2": 145.5
        },
        {
          "id": "cnc-64-64-x-256",
          "name": "CNC kasa 64 × 256 cm",
          "spec": "64 serisi",
          "usd": 92,
          "usd2": 162
        }
      ]
    },
    {
      "title": "80 serisi CNC kasalar",
      "cols": [
        "Ölçü (cm)",
        "Tek yüzlü (USD)",
        "Çift yüzlü (USD)"
      ],
      "kind": "cnc",
      "items": [
        {
          "id": "cnc-80-80-x-64",
          "name": "CNC kasa 80 × 64 cm",
          "spec": "80 serisi",
          "usd": 37,
          "usd2": 65
        },
        {
          "id": "cnc-80-80-x-96",
          "name": "CNC kasa 80 × 96 cm",
          "spec": "80 serisi",
          "usd": 49,
          "usd2": 85.5
        },
        {
          "id": "cnc-80-80-x-128",
          "name": "CNC kasa 80 × 128 cm",
          "spec": "80 serisi",
          "usd": 59.5,
          "usd2": 104.5
        },
        {
          "id": "cnc-80-80-x-160",
          "name": "CNC kasa 80 × 160 cm",
          "spec": "80 serisi",
          "usd": 71.5,
          "usd2": 125
        },
        {
          "id": "cnc-80-80-x-192",
          "name": "CNC kasa 80 × 192 cm",
          "spec": "80 serisi",
          "usd": 83.5,
          "usd2": 146
        },
        {
          "id": "cnc-80-80-x-224",
          "name": "CNC kasa 80 × 224 cm",
          "spec": "80 serisi",
          "usd": 94,
          "usd2": 164
        },
        {
          "id": "cnc-80-80-x-256",
          "name": "CNC kasa 80 × 256 cm",
          "spec": "80 serisi",
          "usd": 104.5,
          "usd2": 185
        }
      ]
    },
    {
      "title": "96 serisi CNC kasalar",
      "cols": [
        "Ölçü (cm)",
        "Tek yüzlü (USD)",
        "Çift yüzlü (USD)"
      ],
      "kind": "cnc",
      "items": [
        {
          "id": "cnc-96-96-x-64",
          "name": "CNC kasa 96 × 64 cm",
          "spec": "96 serisi",
          "usd": 41,
          "usd2": 71
        },
        {
          "id": "cnc-96-96-x-96",
          "name": "CNC kasa 96 × 96 cm",
          "spec": "96 serisi",
          "usd": 54,
          "usd2": 96
        },
        {
          "id": "cnc-96-96-x-128",
          "name": "CNC kasa 96 × 128 cm",
          "spec": "96 serisi",
          "usd": 66.5,
          "usd2": 117
        },
        {
          "id": "cnc-96-96-x-160",
          "name": "CNC kasa 96 × 160 cm",
          "spec": "96 serisi",
          "usd": 81.5,
          "usd2": 143
        },
        {
          "id": "cnc-96-96-x-192",
          "name": "CNC kasa 96 × 192 cm",
          "spec": "96 serisi",
          "usd": 94,
          "usd2": 164.5
        },
        {
          "id": "cnc-96-96-x-224",
          "name": "CNC kasa 96 × 224 cm",
          "spec": "96 serisi",
          "usd": 106.5,
          "usd2": 187.5
        },
        {
          "id": "cnc-96-96-x-256",
          "name": "CNC kasa 96 × 256 cm",
          "spec": "96 serisi",
          "usd": 121,
          "usd2": 211.5
        }
      ]
    }
  ],
  "ithal-rental-kasa": [
    {
      "title": "İthal poster LED kasalar",
      "cols": [
        "Ürün",
        "Özellik",
        "Fiyat (USD)"
      ],
      "kind": "default",
      "items": [
        {
          "id": "ithal-192x64-ithal-poster-vidali",
          "name": "192x64 İthal Poster Vidalı",
          "spec": "Dış Mekan · Çerçeveli · Birleştirilebilir",
          "usd": 338.5
        },
        {
          "id": "ithal-192x64-ithal-poster-miknatisli",
          "name": "192x64 İthal Poster Mıknatıslı",
          "spec": "İç Mekan · Çerçevesiz · Birleştirilebilir",
          "usd": 269.5
        }
      ]
    },
    {
      "title": "Dış mekân vidalı rental kasalar",
      "cols": [
        "Ürün",
        "Özellik",
        "Fiyat (USD)"
      ],
      "kind": "default",
      "items": [
        {
          "id": "ithal-96x96-rental-kasa",
          "name": "96x96 Rental Kasa",
          "spec": "Die-Casting · Kapaklı",
          "usd": 137.25
        },
        {
          "id": "ithal-64x64-rental-kasa",
          "name": "64x64 Rental Kasa",
          "spec": "Die-Casting · Kapaklı",
          "usd": 102.75
        },
        {
          "id": "ithal-100x50-rental-kasa",
          "name": "100x50 Rental Kasa",
          "spec": "25x25 Paneli ile Uyumlu · Dikey",
          "usd": 102.75
        }
      ]
    },
    {
      "title": "İç mekân mıknatıslı tava kasalar",
      "cols": [
        "Ürün",
        "Özellik",
        "Fiyat (USD)"
      ],
      "kind": "default",
      "items": [
        {
          "id": "ithal-64x64-tava-rental",
          "name": "64x64 Tava Rental",
          "spec": "Önden Müdahale · Mıknatıslı",
          "usd": 53.3
        },
        {
          "id": "ithal-48x64-tava-rental",
          "name": "48x64 Tava Rental",
          "spec": "Önden Müdahale · Mıknatıslı",
          "usd": 39.5
        },
        {
          "id": "ithal-50x50-rental-kasa",
          "name": "50x50 Rental Kasa",
          "spec": "25x25 Paneli ile Uyumlu",
          "usd": 62.5
        }
      ]
    },
    {
      "title": "İthal kasa, flight case ve asma aparatı",
      "cols": [
        "Ürün",
        "Özellik",
        "Fiyat (USD)"
      ],
      "kind": "default",
      "items": [
        {
          "id": "ithal-96x96-ithal-kasa",
          "name": "96x96 İthal Kasa",
          "spec": "Arkası Açık · Vidalı",
          "usd": 45.25
        },
        {
          "id": "ithal-flight-case",
          "name": "Flight Case",
          "spec": "100x50 ile Uyumlu · 6 Hazneli",
          "usd": 206.25
        },
        {
          "id": "ithal-asma-aparati",
          "name": "Asma Aparatı",
          "spec": "50|64|96 cm Dikey - Tüm Rental Kasalar",
          "usd": 39.5
        }
      ]
    }
  ],
  "esnek-matrix": [
    {
      "title": "Esnek LED matrix paneller",
      "cols": [
        "Ürün",
        "Özellik",
        "Fiyat (USD)"
      ],
      "kind": "default",
      "items": [
        {
          "id": "matrix-37-4x9-2-cm-led-matrix",
          "name": "37.4x9.2 cm LED matrix",
          "spec": "Android ve iOS Uyumlu · Kolay Kurulum",
          "usd": 28
        },
        {
          "id": "matrix-34-8x10-2-cm-led-matrix",
          "name": "34.8x10.2 cm LED matrix",
          "spec": "Android ve iOS Uyumlu · Kolay Kurulum",
          "usd": 34
        },
        {
          "id": "matrix-59-5x12-cm-led-matrix",
          "name": "59.5x12 cm LED matrix",
          "spec": "Android ve iOS Uyumlu · Kolay Kurulum",
          "usd": 38
        }
      ]
    }
  ],
  "kablo-aksesuar": [
    {
      "title": "Data kabloları ve konnektörler",
      "cols": [
        "Ürün",
        "Özellik",
        "Fiyat (USD)"
      ],
      "kind": "default",
      "items": [
        {
          "id": "aks-flat-data-kayan-yazi-tobu-16-pin-h75-m",
          "name": "Flat Data-Kayan Yazı Tobu",
          "spec": "16 Pin H75 M",
          "usd": 24.2
        },
        {
          "id": "aks-flat-data-kablosu-16-pin-40-cm",
          "name": "Flat Data Kablosu",
          "spec": "16 Pin 40 cm",
          "usd": 0.66
        },
        {
          "id": "aks-flat-data-kablosu-16-pin-60-cm",
          "name": "Flat Data Kablosu",
          "spec": "16 Pin 60 cm",
          "usd": 0.77
        },
        {
          "id": "aks-flat-data-kablosu-16-pin-80-cm",
          "name": "Flat Data Kablosu",
          "spec": "16 Pin 80 cm",
          "usd": 0.88
        },
        {
          "id": "aks-flat-data-kablosu-16-pin-100-cm",
          "name": "Flat Data Kablosu",
          "spec": "16 Pin 100 cm",
          "usd": 1.1
        },
        {
          "id": "aks-flat-data-kablosu-26-pin-40-cm",
          "name": "Flat Data Kablosu",
          "spec": "26 Pin 40 cm",
          "usd": 1.38
        },
        {
          "id": "aks-flat-data-kablosu-26-pin-60-cm",
          "name": "Flat Data Kablosu",
          "spec": "26 Pin 60 cm",
          "usd": 1.65
        },
        {
          "id": "aks-flat-data-kablosu-26-pin-100-cm",
          "name": "Flat Data Kablosu",
          "spec": "26 Pin 100 cm",
          "usd": 2.2
        },
        {
          "id": "aks-flat-data-konnektor-ucu-100-adet",
          "name": "Flat Data Konnektör Ucu",
          "spec": "100 Adet",
          "usd": 8.8
        },
        {
          "id": "aks-flat-data-konnektor-ucu-500-adet",
          "name": "Flat Data Konnektör Ucu",
          "spec": "500 Adet",
          "usd": 38.5
        },
        {
          "id": "aks-flat-data-konnektor-ucu-1000-adet",
          "name": "Flat Data Konnektör Ucu",
          "spec": "1000 Adet",
          "usd": 71.5
        }
      ]
    },
    {
      "title": "Kablo, jack seti ve fan",
      "cols": [
        "Ürün",
        "Özellik",
        "Fiyat (USD)"
      ],
      "kind": "default",
      "items": [
        {
          "id": "aks-cat6-uzatma-kablosu-vidali-1-5-metre",
          "name": "CAT6 Uzatma Kablosu Vidalı",
          "spec": "1.5 Metre",
          "usd": 4.95
        },
        {
          "id": "aks-cat6-ethernet-ag-kablosu-1-5-metre",
          "name": "CAT6-Ethernet Ağ Kablosu",
          "spec": "1.5 Metre",
          "usd": 1.32
        },
        {
          "id": "aks-cat6-ethernet-ag-kablosu-5-metre",
          "name": "CAT6-Ethernet Ağ Kablosu",
          "spec": "5 Metre",
          "usd": 3.85
        },
        {
          "id": "aks-usb-uzatma-kablosu-vidali-1-5-metre",
          "name": "USB Uzatma Kablosu Vidalı",
          "spec": "1.5 Metre",
          "usd": 4.95
        },
        {
          "id": "aks-usb-uzatma-kablosu-1-5-metre",
          "name": "USB Uzatma Kablosu",
          "spec": "1.5 Metre",
          "usd": 1.65
        },
        {
          "id": "aks-tek-renk-power-kablosu-dort-soketli",
          "name": "Tek Renk Power Kablosu",
          "spec": "Dört Soketli",
          "usd": 1.65
        },
        {
          "id": "aks-rgb-power-kablosu-iki-soketli",
          "name": "RGB Power Kablosu",
          "spec": "İki Soketli",
          "usd": 1.65
        },
        {
          "id": "aks-power-jack-seti",
          "name": "Power Jack Seti",
          "spec": "",
          "usd": 7.15
        },
        {
          "id": "aks-power-jack-seti-kablolu",
          "name": "Power Jack Seti (Kablolu)",
          "spec": "",
          "usd": 8.25
        },
        {
          "id": "aks-rj45-jack-seti",
          "name": "RJ45 Jack Seti",
          "spec": "",
          "usd": 6.05
        },
        {
          "id": "aks-rj45-jack-seti-kablolu",
          "name": "RJ45 Jack Seti (Kablolu)",
          "spec": "",
          "usd": 7.15
        },
        {
          "id": "aks-orijinal-ithal-fan-220v-sapkali",
          "name": "Orijinal İthal Fan 220V",
          "spec": "Şapkalı",
          "usd": 5.5
        }
      ]
    },
    {
      "title": "Diğer aksesuarlar",
      "cols": [
        "Ürün",
        "Özellik",
        "Fiyat (USD)"
      ],
      "kind": "default",
      "items": [
        {
          "id": "aks-flat-data-kablo-cakma-pensesi",
          "name": "Flat Data Kablo Çakma Pensesi",
          "spec": "",
          "usd": 17.6
        },
        {
          "id": "aks-led-panel-sokucu",
          "name": "LED Panel Sökücü",
          "spec": "",
          "usd": 4.4
        },
        {
          "id": "aks-led-panel-sokucu-vakum",
          "name": "LED Panel Sökücü Vakum",
          "spec": "",
          "usd": 242
        },
        {
          "id": "aks-3d-hologram-42cm-led-wi-fi",
          "name": "3D Hologram 42cm LED",
          "spec": "Wi-Fi",
          "usd": 71.5
        },
        {
          "id": "aks-raket-tekerlek-takimi-2-kilitli-2-kilitsiz",
          "name": "Raket Tekerlek Takımı",
          "spec": "2 Kilitli+2 Kilitsiz",
          "usd": 8.8
        },
        {
          "id": "aks-64cm-poster-ayak-48x64-ve-64x64-kabinleri",
          "name": "64cm Poster Ayak",
          "spec": "48x64 ve 64x64 Kabinleri",
          "usd": 93.5
        },
        {
          "id": "aks-96cm-poster-ayak-96x96-kabinleri",
          "name": "96cm Poster Ayak",
          "spec": "96x96 Kabinleri",
          "usd": 126.5
        }
      ]
    },
    {
      "title": "Montaj malzemeleri",
      "cols": [
        "Ürün",
        "Özellik",
        "Fiyat (USD)"
      ],
      "kind": "default",
      "items": [
        {
          "id": "aks-miknatisli-vida-m3-m4-adet",
          "name": "Mıknatıslı Vida M3-M4",
          "spec": "Adet",
          "usd": 0.11
        },
        {
          "id": "aks-pullu-vida-m3-m4-100-adet",
          "name": "Pullu Vida M3-M4",
          "spec": "100 Adet",
          "usd": 1.65
        },
        {
          "id": "aks-pullu-vida-m3-m4-500-adet",
          "name": "Pullu Vida M3-M4",
          "spec": "500 Adet",
          "usd": 6.6
        },
        {
          "id": "aks-pullu-vida-m3-m4-1000-adet",
          "name": "Pullu Vida M3-M4",
          "spec": "1000 Adet",
          "usd": 11
        },
        {
          "id": "aks-plastik-cirt-kablo-klipsi-500-adet-4x200mm",
          "name": "Plastik Cırt Kablo Klipsi",
          "spec": "500 Adet 4x200mm",
          "usd": 4.95
        }
      ]
    }
  ],
  "led-paneller": [
    {
      "title": "RGB panel varyantları",
      "cols": [
        "Panel",
        "Özellik",
        "Fiyat (USD / panel)"
      ],
      "kind": "panel",
      "items": [
        {
          "id": "pv-p8-dis",
          "name": "NXTIONSTAR P8 dış mekân LED panel",
          "spec": "256 × 128 mm · 16 × 32 piksel",
          "derivedPriceId": "pv-p8-dis",
          "modelHref": "/tr/products/dis-mekan-led-ekran/p8/"
        },
        {
          "id": "pv-p1-86-esnek",
          "name": "NXTIONSTAR P1.86 esnek iç mekân LED panel",
          "spec": "320 × 160 mm · 86 × 172 piksel",
          "derivedPriceId": "pv-p1-86-esnek",
          "modelHref": "/tr/products/esnek-led-ekran/p1-86-esnek/"
        },
        {
          "id": "pv-p2-5-esnek",
          "name": "NXTIONSTAR P2.5 esnek iç mekân LED panel",
          "spec": "320 × 160 mm · 64 × 128 piksel",
          "derivedPriceId": "pv-p2-5-esnek",
          "modelHref": "/tr/products/esnek-led-ekran/p2-5-esnek/"
        },
        {
          "id": "pv-p2-5-gob-ic",
          "name": "P2.5 GOB iç mekân LED panel",
          "spec": "3840 / 7680 Hz · 64 × 128 piksel",
          "panelPriceId": "p2-5-ic"
        },
        {
          "id": "pv-p1-86-ic",
          "name": "P1.86 iç mekân LED panel (GOB'suz)",
          "spec": "3840 / 7680 Hz · 86 × 172 piksel",
          "panelPriceId": "p1-86-ic-gob"
        },
        {
          "id": "pv-p1-86-gob-esnek",
          "name": "P1.86 GOB esnek LED panel",
          "spec": "3840 / 7680 Hz · 86 × 172 piksel",
          "panelPriceId": "p1-86-ic-gob"
        },
        {
          "id": "pv-p3-07-45-kesik",
          "name": "P3.07 45° kesik (köşe) dış mekân LED panel",
          "spec": "3840 / 7680 Hz · 52 × 104 piksel",
          "panelPriceId": "p3-07-dis"
        },
        {
          "id": "pv-p3-91-dis",
          "name": "P3.91 dış mekân LED panel",
          "spec": "25 × 25 cm · 3840 / 7680 Hz · 64 × 64 piksel",
          "derivedPriceId": "pv-p3-91-dis"
        },
        {
          "id": "pv-p10-dis-4s-a2",
          "name": "P10 dış mekân LED panel 4S-A2",
          "spec": "2525 SMD · 16 × 32 piksel",
          "derivedPriceId": "pv-p10-dis-4s-a2"
        },
        {
          "id": "pv-p10-dis-4s-a1",
          "name": "P10 dış mekân LED panel 4S-A1",
          "spec": "2727 SMD · 16 × 32 piksel",
          "derivedPriceId": "pv-p10-dis-4s-a1"
        }
      ]
    },
    {
      "title": "Tek renk P10 paneller (kayan yazı)",
      "cols": [
        "Panel",
        "Özellik",
        "Fiyat (USD / panel)"
      ],
      "kind": "panel",
      "items": [
        {
          "id": "tek-p10-dip-kirmizi",
          "name": "P10 tek renk LED panel DIP kırmızı",
          "spec": "Soketli · 10 vidalı · 16 entegreli",
          "derivedPriceId": "tek-p10-dip-kirmizi"
        },
        {
          "id": "tek-p10-dip-beyaz",
          "name": "P10 tek renk LED panel DIP beyaz",
          "spec": "Soketli · 10 vidalı · 16 entegreli",
          "derivedPriceId": "tek-p10-dip-beyaz"
        },
        {
          "id": "tek-p10-dip-yesil",
          "name": "P10 tek renk LED panel DIP yeşil",
          "spec": "Soketli · 10 vidalı · 16 entegreli",
          "derivedPriceId": "tek-p10-dip-yesil"
        },
        {
          "id": "tek-p10-dip-sari",
          "name": "P10 tek renk LED panel DIP sarı",
          "spec": "Soketli · 10 vidalı · 16 entegreli",
          "derivedPriceId": "tek-p10-dip-sari"
        },
        {
          "id": "tek-p10-dip-mavi",
          "name": "P10 tek renk LED panel DIP mavi",
          "spec": "Soketli · 10 vidalı · 16 entegreli",
          "derivedPriceId": "tek-p10-dip-mavi"
        },
        {
          "id": "tek-p10-smd-kirmizi",
          "name": "P10 tek renk LED panel SMD kırmızı",
          "spec": "Soketli · 6 vidalı",
          "derivedPriceId": "tek-p10-smd-kirmizi"
        },
        {
          "id": "tek-p10-smd-beyaz",
          "name": "P10 tek renk LED panel SMD beyaz",
          "spec": "Soketli · 6 vidalı",
          "derivedPriceId": "tek-p10-smd-beyaz"
        },
        {
          "id": "tek-p10-smd-yesil",
          "name": "P10 tek renk LED panel SMD yeşil",
          "spec": "Soketli · 6 vidalı",
          "derivedPriceId": "tek-p10-smd-yesil"
        },
        {
          "id": "tek-p10-smd-sari",
          "name": "P10 tek renk LED panel SMD sarı",
          "spec": "Soketli · 6 vidalı",
          "derivedPriceId": "tek-p10-smd-sari"
        }
      ]
    }
  ]
};
