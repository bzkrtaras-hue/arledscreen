import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

/**
 * Build-time lastmod for sitemap entries: ISO date of the last git commit that
 * touched any of the page's source/content files. Falls back to the build date
 * when git history is unavailable or shallow (a shallow clone would stamp every
 * URL with the same HEAD date, which is not a real per-page signal).
 */
const ROOT = process.cwd();
const cache = new Map<string, Date>();
let shallow: boolean | null = null;

function buildDate(): Date {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

function historyUsable(): boolean {
  if (shallow !== null) return !shallow;
  try {
    const out = execFileSync("git", ["rev-parse", "--is-shallow-repository"], {
      cwd: ROOT,
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    shallow = out !== "false";
  } catch {
    shallow = true;
  }
  return !shallow;
}

export function gitLastmod(files: readonly string[]): Date {
  const existing = files.filter((f) => fs.existsSync(path.join(ROOT, f)));
  const key = existing.join("|");
  const hit = cache.get(key);
  if (hit) return hit;
  let date = buildDate();
  if (existing.length && historyUsable()) {
    try {
      const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...existing], {
        cwd: ROOT,
        stdio: ["ignore", "pipe", "ignore"],
      })
        .toString()
        .trim();
      const parsed = iso ? new Date(iso) : null;
      if (parsed && !Number.isNaN(parsed.getTime())) date = parsed;
    } catch {
      /* keep build date */
    }
  }
  cache.set(key, date);
  return date;
}
