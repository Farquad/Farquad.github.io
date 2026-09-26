var fs = require("fs");
var path = require("path");

var input = process.argv[2];
var output = process.argv[3];

if (!input) {
  console.error("Uso: node genera-nota.js <nota.md> [nota.js]");
  process.exit(1);
}

if (!output) {
  output = input.replace(/\.md$/i, "") + ".js";
}

var md = fs.readFileSync(path.resolve(input), "utf8");
var js = "window.NOTA_TESTO = " + JSON.stringify(md) + ";\n";
fs.writeFileSync(path.resolve(output), js);
console.log(output);
