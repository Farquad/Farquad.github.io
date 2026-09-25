const fs = require('fs');

const content = fs.readFileSync('data.js', 'utf8');
const lines = content.split('\n');

const results = [];
let lineNumber = 1;

for (const line of lines) {
    // Check if line contains a year property between 1900 and 1999
    // matching: year: 19XX, or year: 19XX.YY
    const match = line.match(/year:\s*(19\d{2}(?:\.\d+)?)\s*,/);
    if (match) {
        results.push({
            line: lineNumber,
            original: line.trim()
        });
    }
    lineNumber++;
}

console.log(`Found ${results.length} events from the 1900s with decimal/integer format.`);
console.log(JSON.stringify(results.slice(0, 5), null, 2));
