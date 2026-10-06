/**
 * Pre-merge confidence gate (Gün 56).
 *
 * Runs after build:
 *   1) smoke --local (same mustInclude as smoke:live, against out/)
 *   2) point-c-packs --check
 *   3) assert ai-shopping.json pricedPanels === 12 + agentRules
 *
 * Usage: node scripts/verify-premerge.mjs
 * npm:  npm run verify:premerge
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "out");

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(root, "scripts", script), ...args], {
    cwd: root,
    encoding: "utf8",
  });
  process.stdout.write(r.stdout || "");
  process.stderr.write(r.stderr || "");
  return r.status ?? 1;
}

console.log("");
console.log("=== verify:premerge (Day 181) ===");

if (!fs.existsSync(out)) {
  console.error("verify:premerge: missing out/ — run npm run build first");
  process.exit(1);
}

let failed = 0;

if (run("smoke-live-ai-shopping.mjs", ["--local"]) !== 0) failed += 1;
if (run("print-point-c-packs.mjs", ["--check"]) !== 0) failed += 1;

const aiPath = path.join(out, "ai-shopping.json");
if (!fs.existsSync(aiPath)) {
  console.error("verify:premerge: missing out/ai-shopping.json");
  failed += 1;
} else {
  try {
    const doc = JSON.parse(fs.readFileSync(aiPath, "utf8"));
    const panels = doc.pricedPanels;
    if (!Array.isArray(panels) || panels.length !== 12) {
      console.error(
        `verify:premerge: pricedPanels must be 12 (got ${panels?.length})`,
      );
      failed += 1;
    } else if (!Array.isArray(doc.agentRules) || doc.agentRules.length < 4) {
      console.error("verify:premerge: agentRules missing/short");
      failed += 1;
    } else if (!/ücretsiz kargo yok/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid ücretsiz kargo");
      failed += 1;
    } else if (!/extrasUsd\.controlCard|list SKU/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must disambiguate extrasUsd.controlCard ≠ list SKU");
      failed += 1;
    } else if (!Array.isArray(doc.blindTestPrompts) || doc.blindTestPrompts.length !== 129) {
      console.error(
        `verify:premerge: blindTestPrompts must be 129 (got ${doc.blindTestPrompts?.length})`,
      );
      failed += 1;
    } else if (!/AI-infrastructure ready/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid AI-infrastructure ready SKU");
      failed += 1;
    } else if (!/aynı gün|enterprise all-in-one/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid aynı gün / enterprise all-in-one invent");
      failed += 1;
    } else if (!/OEM fabrika|fabrika üreticisi|bağımsız bayi/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid OEM/fabrika/bayi invent");
      failed += 1;
    } else if (!/tek ekip|keşiften teslimata/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid tek ekip / keşiften teslimata invent");
      failed += 1;
    } else if (!/stokta paket|anında teslim|list fiyatı/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid stokta paket / anında teslim / list fiyat invent");
      failed += 1;
    } else if (!/sabit nit|IP65 garanti|600.?1200/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit nit / IP65 garanti invent");
      failed += 1;
    } else if (!/3840|1920|kamera dostu garanti|sabit yenileme Hz/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit Hz / kamera dostu garanti invent");
      failed += 1;
    } else if (!/1 mm = 1 m garanti|izleme mesafesi|pitch→metre|P2\.5=2,5/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid 1 mm = 1 m / izleme mesafesi garanti invent");
      failed += 1;
    } else if (!/0,45|0,75|3 faz zorunlu|sabit kW/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit kW/m² / 3 faz zorunlu invent");
      failed += 1;
    } else if (!/140|160|görüş açısı|sabit görüş/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit 140°/160° görüş açısı invent");
      failed += 1;
    } else if (!/HDR|gri skala|bit derinliği|16-bit/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit HDR / gri skala invent");
      failed += 1;
    } else if (!/100\.000|MTBF|sabit ömür|ömür/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit ömür / MTBF invent");
      failed += 1;
    } else if (!/DCI-P3|Rec\.709|gamut|6500K|renk sıcaklığı/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit DCI-P3 / gamut invent");
      failed += 1;
    } else if (!/kg\/m²|kabin ağırlığı|kalınlık|sabit kg/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit kg/m² / kalınlık invent");
      failed += 1;
    } else if (!/-20|°C|sabit °C|çalışma sıcaklığı|işletme sıcaklığı/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit °C / -20/+50 invent");
      failed += 1;
    } else if (!/5000:1|3000:1|kontrast|sabit kontrast/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit kontrast invent");
      failed += 1;
    } else if (!/120 km\/h|1500 Pa|rüzgâr yükü|sabit rüzgâr/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit rüzgâr yükü invent");
      failed += 1;
    } else if (!/ölü piksel|0\.0001%|Class II|pixel failure|sabit ölü/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit ölü piksel invent");
      failed += 1;
    } else if (!/10.?90|%RH|sabit nem|operating humidity|çalışma nemi/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit nem / %RH invent");
      failed += 1;
    } else if (!/standby|idle|bekleme|sabit standby/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit standby / idle invent");
      failed += 1;
    } else if (!/depolama|saklama|storage|-40|sabit depolama/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit depolama / storage °C invent");
      failed += 1;
    } else if (!/CE|RoHS|sertifika|EMC|FCC/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit CE / RoHS invent");
      failed += 1;
    } else if (!/ISO 9001|ISO 14001|sabit ISO/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit ISO invent");
      failed += 1;
    } else if (!/UL|ETL|sabit UL/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit UL / ETL invent");
      failed += 1;
    } else if (!/yangın sınıfı|fire rating|Class A|B-s1|sabit yangın/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit yangın sınıfı / fire rating invent");
      failed += 1;
    } else if (!/IK08|IK10|sabit IK|impact rating|darbe sınıfı/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit IK / impact rating invent");
      failed += 1;
    } else if (!/ASTM|salt spray|tuz sisi|B117|sabit ASTM/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit ASTM / salt spray invent");
      failed += 1;
    } else if (!/garanti yılı|sabit garanti|2 \/ 3 \/ 5 yıl/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit garanti yılı invent");
      failed += 1;
    } else if (!/iade günü|sabit iade|14 \/ 30|MerchantReturnNotPermitted/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit iade günü invent");
      failed += 1;
    } else if (!/teslimat süresi|sabit teslimat|lead time|7 iş günü|48 saat/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit teslimat süresi invent");
      failed += 1;
    } else if (!/gürültü|dB|fanless|akustik|sabit gürültü/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit gürültü / dB invent");
      failed += 1;
    } else if (!/Delta E|renk kalibrasyonu|factory-calibrated|sabit Delta E/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit Delta E invent");
      failed += 1;
    } else if (!/latency|input lag|low-latency|sabit latency/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit latency / input lag invent");
      failed += 1;
    } else if (!/homojen|uniformity|parlaklık homojenliği|sabit parlaklık/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit parlaklık homojenliği / brightness uniformity invent");
      failed += 1;
    } else if (!/güç faktörü|power factor|PF|cos φ|sabit güç/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit güç faktörü / power factor invent");
      failed += 1;
    } else if (!/HDCP|sabit HDCP/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit HDCP invent");
      failed += 1;
    } else if (!/yedek parça stok|spare parts|sabit yedek/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit yedek parça stok invent");
      failed += 1;
    } else if (!/PoE|Gigabit|bant genişliği|sabit PoE/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit PoE / Gigabit invent");
      failed += 1;
    } else if (!/HDMI|DisplayPort|SDI|sabit HDMI/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit HDMI / SDI invent");
      failed += 1;
    } else if (!/fiber mesafe|optik|sabit fiber/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit fiber mesafe invent");
      failed += 1;
    } else if (!/CMS SLA|uzaktan izleme|uptime|sabit CMS/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit CMS SLA invent");
      failed += 1;
    } else if (!/dual power|hot-swap|yedek güç|redundant PSU|sabit dual/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit dual power invent");
      failed += 1;
    } else if (!/genlock|frame sync|senkron|sabit genlock/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit genlock invent");
      failed += 1;
    } else if (!/Art-Net|sACN|DMX|sabit Art-Net/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit Art-Net / DMX invent");
      failed += 1;
    } else if (!/NDI|SRT|RTMP|sabit NDI/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit NDI / SRT / RTMP invent");
      failed += 1;
    } else if (!/ön servis|arka servis|front service|rear service|sabit ön servis/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit ön/arka servis invent");
      failed += 1;
    } else if (!/WiFi|Bluetooth|kablosuz|sabit WiFi/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit WiFi / Bluetooth invent");
      failed += 1;
    } else if (!/0mm|seamless|bezelsiz|sabit 0mm/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit 0mm / seamless invent");
      failed += 1;
    } else if (!/alıcı yedeklilik|receiving card redundancy|backup loop|sabit alıcı/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit alıcı yedeklilik invent");
      failed += 1;
    } else if (!/gönderici yedeklilik|sending card redundancy|redundant sender|sabit gönderici/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit gönderici yedeklilik invent");
      failed += 1;
    } else if (!/ışık sensörü|adaptive brightness|ambient light sensor|sabit ışık sensörü/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit ışık sensörü invent");
      failed += 1;
    } else if (!/canlı modül değişimi|hot-swap module|sabit canlı modül/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit canlı modül değişimi invent");
      failed += 1;
    } else if (!/dokunmatik|touch overlay|capacitive touch|sabit dokunmatik/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit dokunmatik invent");
      failed += 1;
    } else if (!/mıknatıslı modül|magnetic module|sabit mıknatıslı/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit mıknatıslı modül invent");
      failed += 1;
    } else if (!/koruyucu kaplama|conformal coating|sabit koruyucu/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit koruyucu kaplama invent");
      failed += 1;
    } else if (!/naked-eye 3D|glasses-free 3D|sabit 3D/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit 3D invent");
      failed += 1;
    } else if (!/hızlı kilit|quick lock|sabit hızlı/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit hızlı kilit invent");
      failed += 1;
    } else if (!/kavisli|curved|sabit kavisli/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit kavisli invent");
      failed += 1;
    } else if (!/döküm kabin|die-cast|sabit döküm/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit döküm kabin invent");
      failed += 1;
    } else if (!/anti-yansıma|anti-glare|sabit anti-yansıma/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit anti-yansıma invent");
      failed += 1;
    } else if (!/OPS|Android player|sabit OPS/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit OPS invent");
      failed += 1;
    } else if (!/parafudr|surge protection|sabit parafudr/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit parafudr invent");
      failed += 1;
    } else if (!/zamanlayıcı|content scheduler|sabit zamanlayıcı/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit zamanlayıcı invent");
      failed += 1;
    } else if (!/flight case|taşıma çantası|sabit flight case/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit flight case invent");
      failed += 1;
    } else if (!/köşe LED|corner LED|sabit köşe LED/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit köşe LED invent");
      failed += 1;
    } else if (!/enerji sınıfı|energy class|sabit enerji sınıfı/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit enerji sınıfı invent");
      failed += 1;
    } else if (!/düşük mavi ışık|low blue light|sabit düşük mavi ışık/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit düşük mavi ışık invent");
      failed += 1;
    } else if (!/asılı|hanging|rigging|sabit asılı/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit asılı invent");
      failed += 1;
    } else if (!/daisy chain|data cascade|sabit daisy chain/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit daisy chain invent");
      failed += 1;
    } else if (!/IP67|NEMA|sabit IP67/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit IP67 invent");
      failed += 1;
    } else if (!/ısı yönetimi|heater|cooling|sabit ısı yönetimi/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit ısı yönetimi invent");
      failed += 1;
    } else if (!/BT\.2020|Rec\.2020|sabit BT\.2020/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit BT.2020 invent");
      failed += 1;
    } else if (!/HLG|HDR10|PQ|sabit HLG/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit HLG invent");
      failed += 1;
    } else if (!/PWM|scan rate|sabit PWM/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit PWM invent");
      failed += 1;
    } else if (!/black level|siyah seviye|sabit black level/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit black level invent");
      failed += 1;
    } else if (!/pixel mapping|piksel eşleme|sabit pixel mapping/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit pixel mapping invent");
      failed += 1;
    } else if (!/gamma|white balance|beyaz dengesi|sabit gamma/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit gamma invent");
      failed += 1;
    } else if (!/potting|epoxy potting|sabit potting/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit potting invent");
      failed += 1;
    } else if (!/louver|masking|güneş panjuru|sabit louver/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit louver invent");
      failed += 1;
    } else if (!/module size|modül boyutu|sabit module size/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit module size invent");
      failed += 1;
    } else if (!/cabinet depth|kabin derinliği|sabit cabinet depth/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit cabinet depth invent");
      failed += 1;
    } else if (!/drive IC|sürücü IC|sabit drive IC/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit drive IC invent");
      failed += 1;
    } else if (!/cabinet size|kabin boyutu|sabit cabinet size/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit cabinet size invent");
      failed += 1;
    } else if (!/panel size|panel boyutu|sabit panel size/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit panel size invent");
      failed += 1;
    } else if (!/waterproof glue|su geçirmez yapıştırıcı|sabit waterproof glue/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit waterproof glue invent");
      failed += 1;
    } else if (!/mask pitch|maske pitch|sabit mask pitch/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit mask pitch invent");
      failed += 1;
    } else if (!/silicone seal|silikon conta|sabit silicone seal/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit silicone seal invent");
      failed += 1;
    } else if (!/connector type|konektör tipi|sabit connector type/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit connector type invent");
      failed += 1;
    } else if (!/locating pin|konumlandırma pimi|sabit locating pin/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit locating pin invent");
      failed += 1;
    } else if (!/flat cable|flat kablo|sabit flat cable/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit flat cable invent");
      failed += 1;
    } else if (!/safety cable|emniyet kablosu|sabit safety cable/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit safety cable invent");
      failed += 1;
    } else if (!/thermal pad|termal pad|sabit thermal pad/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit thermal pad invent");
      failed += 1;
    } else if (!/magnesium|magnezyum|sabit magnesium/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit magnesium invent");
      failed += 1;
    } else if (!/EDID|sabit EDID/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit EDID invent");
      failed += 1;
    } else if (!/HDBaseT|sabit HDBaseT/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit HDBaseT invent");
      failed += 1;
    } else if (!/video processor|video işlemci|sabit video processor/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit video processor invent");
      failed += 1;
    } else if (!/truss clamp|truss kelepçe|sabit truss clamp/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit truss clamp invent");
      failed += 1;
    } else if (!/scaler|ölçekleyici|sabit scaler/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit scaler invent");
      failed += 1;
    } else if (!/backup battery|yedek batarya|sabit backup battery/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit backup battery invent");
      failed += 1;
    } else if (!/ribbon cable|ribbon kablo|sabit ribbon cable/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit ribbon cable invent");
      failed += 1;
    } else if (!/hoist|vinç|sabit hoist/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit hoist invent");
      failed += 1;
    } else {
      console.log(
        `verify:premerge: ai-shopping pricedPanels=12 · agentRules=${doc.agentRules.length} · prompts=129 OK`,
      );
    }
    // Day 66: catalog extrasUsdNote
    const catPath = path.join(out, "catalog.json");
    if (fs.existsSync(catPath)) {
      try {
        const cat = JSON.parse(fs.readFileSync(catPath, "utf8"));
        if (!/Huidu|list SKU/i.test(cat.shoppingPolicy?.extrasUsdNote || "")) {
          console.error("verify:premerge: catalog.shoppingPolicy.extrasUsdNote missing Huidu/list SKU honesty");
          failed += 1;
        }
      } catch (e) {
        console.error(`verify:premerge: catalog.json parse: ${e.message}`);
        failed += 1;
      }
    }
  } catch (e) {
    console.error(`verify:premerge: ai-shopping.json parse: ${e.message}`);
    failed += 1;
  }
}

console.log("-".repeat(60));
if (failed) {
  console.error(`verify:premerge: FAIL (${failed} step(s))`);
  process.exit(1);
}
console.log("verify:premerge: OK — smoke:local + point-c + pricedPanels");
console.log("");
process.exit(0);
