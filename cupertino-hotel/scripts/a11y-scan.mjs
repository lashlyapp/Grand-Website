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
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
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
const pageResults = [];
for (const f of files) {
  const n = await scanFile(f);
  total += n;
  const path = "/" + f.replace("index.html", "").replace(".html", "");
  pageResults.push({ path, issues: n });
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

// ---------------------------------------------------------------------------
// Write a self-contained HTML report to public/ so it can be linked from the
// Accessibility Statement as evidence.
// ---------------------------------------------------------------------------
const generated = new Date().toISOString().slice(0, 10);
const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const rowsHtml = pageResults
  .map(
    (p) =>
      `<tr><td><code>${esc(p.path)}</code></td><td class="${
        p.issues === 0 ? "ok" : "warn"
      }">${p.issues === 0 ? "Pass" : p.issues + " issue(s)"}</td></tr>`,
  )
  .join("\n");

const violationsHtml =
  rows.length === 0
    ? `<p class="ok">No structural violations were detected.</p>`
    : `<ul>${rows
        .map(
          ([id, e]) =>
            `<li><strong>[${esc((e.impact || "n/a").toUpperCase())}]</strong> <code>${esc(
              id,
            )}</code> — ${esc(e.count)} instance(s) on ${esc([...e.pages].join(", "))}<br><span class="muted">${esc(
              e.help,
            )}</span></li>`,
        )
        .join("")}</ul>`;

const report = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Accessibility Test Report — The Cupertino Hotel</title>
<style>
  :root { color-scheme: light; }
  body { font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color:#1a1a1a; max-width: 820px; margin: 0 auto; padding: 2.5rem 1.25rem; line-height: 1.6; }
  h1 { font-size: 1.7rem; margin-bottom: .25rem; }
  h2 { font-size: 1.15rem; margin-top: 2rem; border-bottom: 1px solid #e5e5e5; padding-bottom: .3rem; }
  .muted { color:#666; }
  .ok { color:#15803d; font-weight:600; }
  .warn { color:#b45309; font-weight:600; }
  table { border-collapse: collapse; width: 100%; margin-top: .75rem; }
  th, td { text-align: left; padding: .5rem .75rem; border-bottom: 1px solid #eee; font-size: .95rem; }
  th { color:#555; font-weight:600; }
  code { background:#f4f4f5; padding: .1rem .35rem; border-radius: 4px; font-size: .9em; }
  .meta { display:grid; grid-template-columns: max-content 1fr; gap:.25rem 1rem; margin-top:1rem; font-size:.95rem; }
  .badge { display:inline-block; background:#15803d; color:#fff; border-radius:999px; padding:.2rem .7rem; font-size:.8rem; font-weight:600; }
  footer { margin-top:2.5rem; color:#777; font-size:.85rem; }
</style>
</head>
<body>
  <h1>Accessibility Test Report</h1>
  <p class="muted">The Cupertino Hotel, Cupertino, CA — marketing website</p>
  <p><span class="badge">${total === 0 ? "0 structural violations" : total + " issues"}</span></p>

  <div class="meta">
    <div>Target standard</div><div><strong>WCAG 2.1 Level AA</strong></div>
    <div>Date generated</div><div>${generated}</div>
    <div>Pages tested</div><div>${pageResults.length}</div>
    <div>Automated engine</div><div>axe-core ${esc(axe.version || "")} (structural)</div>
  </div>

  <h2>Results by page</h2>
  <table>
    <thead><tr><th>Page</th><th>Result</th></tr></thead>
    <tbody>
${rowsHtml}
    </tbody>
  </table>

  <h2>Violations</h2>
  ${violationsHtml}

  <h2>Scope &amp; methodology</h2>
  <p>
    This report reflects automated structural testing with axe-core against every
    page of the site. Visual and interaction checks that require a rendering
    engine — notably <strong>color contrast</strong> and <strong>keyboard
    operability</strong> — are validated separately on every release using
    headless-browser tools (<strong>pa11y-ci</strong> at WCAG 2.1 AA and
    <strong>Lighthouse</strong>) in our continuous-integration pipeline.
  </p>
  <p class="muted">
    Automated testing detects an estimated 30–40% of accessibility issues. This
    report is evidence of ongoing good-faith conformance work and does not, by
    itself, constitute certification. A periodic manual expert audit complements
    these automated checks.
  </p>

  <footer>
    Generated automatically by the project's accessibility scan
    (<code>npm run a11y:scan</code>). For accessibility feedback, see our
    Accessibility Statement.
  </footer>
</body>
</html>
`;

const outDir = join(process.cwd(), "public");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "accessibility-report.html"), report);
console.log("Report written to public/accessibility-report.html\n");
