#!/usr/bin/env node
/**
 * One-off accessibility scan of the prerendered pages using axe-core in jsdom.
 *
 * NOTE: jsdom has no layout/rendering engine, so visual rules (notably
 * color-contrast) cannot be evaluated here and are reported as "incomplete",
 * not pass/fail. For full coverage (including contrast and keyboard behavior),
 * run the browser-based CI scan (pa11y-ci / Lighthouse) — see package.json.
 *
 * Usage: node scripts/a11y-scan.mjs   (after `next build`)
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { JSDOM } from "jsdom";
import axe from "axe-core";

const DIR = join(process.cwd(), ".next", "server", "app");

const files = readdirSync(DIR)
  .filter((f) => f.endsWith(".html") && !f.startsWith("_"))
  .sort();

const tally = new Map(); // ruleId -> { impact, help, count, pages:Set }

async function scanFile(file) {
  const html = readFileSync(join(DIR, file), "utf8");
  const dom = new JSDOM(html, {
    runScripts: "dangerously",
    pretendToBeVisual: true,
    virtualConsole: new (await import("jsdom")).VirtualConsole(), // swallow page-script noise
  });
  const s = dom.window.document.createElement("script");
  s.textContent = axe.source;
  dom.window.document.head.appendChild(s);
  if (!dom.window.axe) throw new Error("axe failed to load in jsdom");
  const results = await dom.window.axe.run(dom.window.document.documentElement, {
    resultTypes: ["violations"],
    // contrast needs real layout; skip to avoid misleading jsdom output
    rules: { "color-contrast": { enabled: false } },
  });
  for (const v of results.violations) {
    const entry = tally.get(v.id) || {
      impact: v.impact,
      help: v.help,
      count: 0,
      pages: new Set(),
    };
    entry.count += v.nodes.length;
    entry.pages.add(file.replace(".html", ""));
    tally.set(v.id, entry);
  }
  return results.violations.reduce((n, v) => n + v.nodes.length, 0);
}

const rank = { critical: 0, serious: 1, moderate: 2, minor: 3, undefined: 4 };

console.log(`\nScanning ${files.length} prerendered pages with axe-core…\n`);
let total = 0;
for (const f of files) {
  const n = await scanFile(f);
  total += n;
  console.log(`  ${n === 0 ? "✓" : "•"} /${f.replace(".html", "")}  —  ${n} issue(s)`);
}

console.log(`\n${"=".repeat(60)}\nViolations by rule (color-contrast excluded — needs a browser):\n`);
const rows = [...tally.entries()].sort(
  (a, b) => (rank[a[1].impact] ?? 5) - (rank[b[1].impact] ?? 5),
);
if (rows.length === 0) {
  console.log("  No structural violations found. 🎉");
} else {
  for (const [id, e] of rows) {
    console.log(
      `  [${(e.impact || "n/a").toUpperCase()}] ${id} — ${e.count} instance(s) on: ${[...e.pages].join(", ")}`,
    );
    console.log(`        ${e.help}`);
  }
}
console.log(`\nTotal structural issues: ${total}\n`);
