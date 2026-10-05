/**
 * Organization sameAs + disambiguation parity audit.
 *
 * Checks:
 * - public/entity.json sameAs === ORGANIZATION_SAME_AS (no arleds.com)
 * - disambiguatingDescription mentions ARLED Solutions + NEXTSTAR/NationStar
 * - llms.txt / llms-full.txt carry the same disambiguation intent
 * - out/entity.json present after build
 * - Live probe (warn-only): entity.json / catalog.json / ard.json HTTP status
 *
 * Run: node scripts/audit-entity-sameas.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];

const social = fs.readFileSync(path.join(root, "src/lib/social.ts"), "utf8");
const sameBlock = social.match(/export const ORGANIZATION_SAME_AS = \[([\s\S]*?)\] as const/);
if (!sameBlock) errors.push("ORGANIZATION_SAME_AS missing in social.ts");
const instagramHref = social.match(/instagram:\s*\{[\s\S]*?href:\s*"([^"]+)"/)?.[1];
const facebookHref = social.match(/facebook:\s*\{[\s\S]*?href:\s*"([^"]+)"/)?.[1];
const expectedSameAs = sameBlock
  ? sameBlock[1]
      .split("\n")
      .filter((line) => !line.trim().startsWith("//"))
      .flatMap((line) => {
        const urls = [...line.matchAll(/"([^"]+)"/g)].map((m) => m[1]).filter((u) => u.startsWith("http"));
        if (/SOCIAL_LINKS\.instagram\.href/.test(line) && instagramHref) urls.push(instagramHref);
        if (/SOCIAL_LINKS\.facebook\.href/.test(line) && facebookHref) urls.push(facebookHref);
        return urls;
      })
  : [];

const entityPath = path.join(root, "public/entity.json");
if (!fs.existsSync(entityPath)) {
  errors.push("public/entity.json missing");
} else {
  const entity = JSON.parse(fs.readFileSync(entityPath, "utf8"));
  const got = entity.sameAs || [];
  if (JSON.stringify(got) !== JSON.stringify(expectedSameAs)) {
    errors.push(`entity.json sameAs ${JSON.stringify(got)} != ORGANIZATION_SAME_AS ${JSON.stringify(expectedSameAs)}`);
  }
  if (got.some((u) => /arleds\.com/i.test(u))) {
    errors.push("entity.json sameAs must not include arleds.com until TLS+301");
  }
  const dis = entity.disambiguatingDescription || "";
  for (const needle of ["ARLED Solutions", "NEXTSTAR", "NationStar"]) {
    if (!dis.includes(needle)) errors.push(`entity.json disambiguatingDescription missing "${needle}"`);
  }
  if (entity["@type"] !== "Organization") errors.push("entity.json @type not Organization");
  if (!entity.catalogJson?.includes("/catalog.json")) errors.push("entity.json catalogJson missing");
  if (!entity.ardJson?.includes("/ard.json")) errors.push("entity.json ardJson missing");
  if (!entity.founder?.sameAs?.includes("https://www.linkedin.com/in/bozkurtaras")) {
    errors.push("founder sameAs missing LinkedIn");
  }
}

const orgSrc = fs.readFileSync(path.join(root, "src/components/seo/OrganizationJsonLd.tsx"), "utf8");
for (const needle of ["ARLED Solutions", "NEXTSTAR", "NationStar", "ORGANIZATION_SAME_AS"]) {
  if (!orgSrc.includes(needle)) errors.push(`OrganizationJsonLd.tsx missing ${needle}`);
}

for (const file of ["public/llms.txt", "public/llms-full.txt"]) {
  const text = fs.readFileSync(path.join(root, file), "utf8");
  for (const needle of ["ARLED Solutions", "NEXTSTAR", "NationStar"]) {
    if (!text.includes(needle) && !(needle === "NEXTSTAR" && text.includes("Next&NextStar"))) {
      errors.push(`${file} missing disambiguation term ${needle}`);
    }
  }
  if (/sameAs.*arleds\.com|arleds\.com.*sameAs/i.test(text)) {
    warnings.push(`${file} mentions arleds.com (ok in playbook notes; not as sameAs)`);
  }
}

const outEntity = path.join(root, "out/entity.json");
if (fs.existsSync(path.join(root, "out"))) {
  if (!fs.existsSync(outEntity)) errors.push("out/entity.json missing after build");
  else {
    const a = JSON.parse(fs.readFileSync(entityPath, "utf8"));
    const b = JSON.parse(fs.readFileSync(outEntity, "utf8"));
    if (JSON.stringify(a.sameAs) !== JSON.stringify(b.sameAs)) {
      errors.push("out/entity.json sameAs drifted from public/");
    }
  }
} else {
  warnings.push("out/ missing — skip export copy check");
}

const profilesPath = path.join(root, "public/entity-profiles.json");
if (!fs.existsSync(profilesPath)) {
  errors.push("public/entity-profiles.json missing (Point C packs)");
} else {
  const packs = JSON.parse(fs.readFileSync(profilesPath, "utf8"));
  for (const key of ["gbpDescription", "linkedinAbout", "instagramBio", "facebookAbout", "directoryLong"]) {
    if (!packs.packs?.[key]) errors.push(`entity-profiles.json missing packs.${key}`);
  }
  if (!String(packs.packs?.gbpDescription || "").includes("Gaziosmanpaşa")) {
    errors.push("entity-profiles gbpDescription missing Gaziosmanpaşa");
  }
  if (fs.existsSync(path.join(root, "out")) && !fs.existsSync(path.join(root, "out/entity-profiles.json"))) {
    errors.push("out/entity-profiles.json missing after build");
  }
}

/** Optional live probe (network). Failures are warnings until PR #55 deploys. */
async function liveProbe() {
  const urls = [
    "https://arledscreen.com/entity.json",
    "https://arledscreen.com/catalog.json",
    "https://arledscreen.com/.well-known/ard.json",
    "https://arledscreen.com/llms.txt",
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url, {
        headers: { "user-agent": "ARLEDSCREEN-entity-audit/1.0" },
        redirect: "follow",
      });
      const ct = res.headers.get("content-type") || "";
      if (!res.ok) {
        warnings.push(`LIVE ${res.status} ${url} (merge/deploy PR #55 to publish)`);
        continue;
      }
      if (url.endsWith(".json") && !ct.includes("json") && !ct.includes("text/plain")) {
        // CF sometimes serves application/octet-stream; accept if body parses
        const text = await res.text();
        try {
          JSON.parse(text);
        } catch {
          warnings.push(`LIVE ${url} content-type ${ct} / non-JSON body`);
        }
      }
    } catch (e) {
      warnings.push(`LIVE probe failed ${url}: ${e.message}`);
    }
  }
}

await liveProbe();

console.log(
  `Entity sameAs audit: expected ${expectedSameAs.length} profiles [${expectedSameAs.join(", ")}]`,
);
for (const w of warnings) console.warn(`WARN: ${w}`);
if (errors.length) {
  console.error("FAIL:");
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}
console.log("OK: Organization sameAs + disambiguation guards passed");
