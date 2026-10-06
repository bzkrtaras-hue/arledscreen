#!/usr/bin/env node
/**
 * Build-time validation and logging for AI discovery feeds.
 * Ensures all feeds are generated and accessible.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const publicDir = path.join(repoRoot, "public");

const REQUIRED_FILES = [
  "catalog.json",
  "ai-shopping.json",
  "entity.json",
  "entity-profiles.json",
  ".well-known/ard.json",
  "llms.txt",
  "llms-full.txt",
  "feeds/merchant-priced-panels.tsv",
  "robots.txt",
  "_headers",
];

function validateAIFeeds() {
  console.log("🔍 Validating AI discovery feeds...");
  const errors = [];
  const warnings = [];

  for (const file of REQUIRED_FILES) {
    const filePath = path.join(publicDir, file);
    if (!fs.existsSync(filePath)) {
      errors.push(`❌ Missing: ${file}`);
    } else {
      const stats = fs.statSync(filePath);
      const sizeKb = (stats.size / 1024).toFixed(1);
      console.log(`✅ ${file} (${sizeKb} KB)`);
    }
  }

  // Validate JSON structure
  const jsonFiles = [
    { path: "catalog.json", type: "Collection" },
    { path: "ai-shopping.json", type: "Dataset" },
    { path: "entity.json", type: "Organization" },
    { path: ".well-known/ard.json", type: "WebSite" },
  ];

  for (const { path: file, type } of jsonFiles) {
    const filePath = path.join(publicDir, file);
    if (fs.existsSync(filePath)) {
      try {
        const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        if (content["@type"] !== type) {
          warnings.push(`⚠️ ${file}: Expected @type=${type}, got ${content["@type"]}`);
        }
      } catch (e) {
        errors.push(`❌ ${file}: Invalid JSON - ${e.message}`);
      }
    }
  }

  // Summary
  console.log(`\n📊 AI Discovery Feeds Validation Summary`);
  console.log(`   ✅ Files: ${REQUIRED_FILES.length - errors.length}/${REQUIRED_FILES.length}`);
  if (warnings.length) console.log(`   ⚠️ Warnings: ${warnings.length}`);
  if (errors.length) console.log(`   ❌ Errors: ${errors.length}`);

  if (errors.length) {
    console.error("\n❌ Validation failed:");
    errors.forEach(e => console.error(`   ${e}`));
    process.exit(1);
  }

  if (warnings.length) {
    console.warn("\n⚠️ Warnings:");
    warnings.forEach(w => console.warn(`   ${w}`));
  }

  console.log("\n✅ All AI discovery feeds are valid and ready for production.");
  console.log("\n📍 Feed URLs:");
  console.log("   - https://arledscreen.com/catalog.json");
  console.log("   - https://arledscreen.com/ai-shopping.json");
  console.log("   - https://arledscreen.com/entity.json");
  console.log("   - https://arledscreen.com/.well-known/ard.json");
  console.log("   - https://arledscreen.com/llms.txt");
  console.log("   - https://arledscreen.com/llms-full.txt");
}


// After next build + postbuild-ai, out/ must carry deployable AI feeds.
const outDir = path.join(repoRoot, "out");
if (fs.existsSync(outDir)) {
  for (const file of [
    "catalog.json",
    "ai-shopping.json",
    "entity.json",
    "entity-profiles.json",
    "llms.txt",
  ]) {
    const fp = path.join(outDir, file);
    if (!fs.existsSync(fp)) {
      console.error(`❌ Missing in out/: ${file} (CF deploy would wipe GEO)`);
      process.exit(1);
    }
  }
  const ai = JSON.parse(fs.readFileSync(path.join(outDir, "ai-shopping.json"), "utf8"));
  if (!Array.isArray(ai.pricedPanels) || ai.pricedPanels.length !== 12) {
    console.error("❌ out/ai-shopping.json pricedPanels must be length 12");
    process.exit(1);
  }
  if (/blindTestPrompts|kör test/i.test(JSON.stringify(ai))) {
    console.error("❌ out/ai-shopping.json must not carry blind-test payload");
    process.exit(1);
  }
  console.log("✅ out/ AI feeds present (catalog, ai-shopping×12, entity, profiles, llms)");
}

validateAIFeeds();
