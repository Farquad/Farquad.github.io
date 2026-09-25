const fs = require('fs');
const code = fs.readFileSync('data.js', 'utf8');

// Match everything from title: to the comma or end of line/object
const regex = /title:\s*(["'])(.*?)\1/g;
const titles = [];
const duplicates = [];
const exactDuplicates = [];

let match;
while ((match = regex.exec(code)) !== null) {
  const title = match[2];
  if (titles.includes(title)) {
    if (!duplicates.includes(title)) {
        duplicates.push(title);
    }
  } else {
    titles.push(title);
  }
}

console.log("Duplicate Titles:");
console.log(JSON.stringify(duplicates, null, 2));