const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "data.js");
const src = fs.readFileSync(file, "utf8");

const noComments = src
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/\/\/.*$/gm, "");

const counts = new Map();
const numeric = /importance\s*:\s*(-?\d+(?:\.\d+)?)/g;
let match;
while ((match = numeric.exec(noComments))) {
  const value = Number(match[1]);
  counts.set(value, (counts.get(value) || 0) + 1);
}

const other = [];
const otherRe = /importance\s*:\s*([^,\n}]+)/g;
while ((match = otherRe.exec(noComments))) {
  const raw = match[1].trim();
  if (!/^-?\d+(?:\.\d+)?$/.test(raw)) other.push(raw);
}

const events = (noComments.match(/\byear\s*:/g) || []).length;
const withImportance = [...counts.values()].reduce((sum, n) => sum + n, 0);
const missing = [];
const objectRe = /\{[^{}]*\byear\s*:[\s\S]*?\}/g;
while ((match = objectRe.exec(noComments))) {
  const block = match[0];
  if (!/importance\s*:/.test(block)) {
    const title = block.match(/title\s*:\s*(?:"([^"]*)"|'([^']*)'|`([^`]*)`)/);
    missing.push(title ? title[1] || title[2] || title[3] : block.replace(/\s+/g, " ").slice(0, 160));
  }
}

const levels = [...counts.keys()].sort((a, b) => a - b);

console.log("Report importanza — TimelineStoria/data.js");
console.log("");
console.log("Valore | Eventi | Quota");
console.log("-------|--------|------");

for (const level of levels) {
  const n = counts.get(level);
  const pct = ((n / withImportance) * 100).toFixed(1);
  console.log(String(level).padStart(6) + " | " + String(n).padStart(6) + " | " + pct.padStart(5) + "%");
}

console.log("");
console.log("Eventi con importance: " + withImportance);
console.log("Eventi totali (campo year): " + events);
console.log("Eventi senza importance: " + (events - withImportance));

if (missing.length) {
  console.log("");
  console.log("Senza importance:");
  for (const title of missing) console.log("  - " + title);
}

if (other.length) {
  console.log("");
  console.log("Valori di importance non numerici (" + other.length + "):");
  for (const item of other) console.log("  " + item);
}
