const fs = require('fs');
const code = fs.readFileSync('data.js', 'utf8');

const regex = /\{\s*year:\s*([-\d.]+)\s*,\s*title:\s*(["'])(.*?)\2/g;
const events = [];

let match;
while ((match = regex.exec(code)) !== null) {
  events.push({
    year: parseFloat(match[1]),
    title: match[3]
  });
}

events.sort((a, b) => a.year - b.year);

const potentialDuplicates = [];

function getWordOverlap(str1, str2) {
    const normalize = s => s.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 3 && !['della', 'delle', 'degli', 'nella', 'nelle', 'negli', 'dell', 'nell'].includes(w));
    const words1 = new Set(normalize(str1));
    const words2 = new Set(normalize(str2));
    let intersection = 0;
    for (const w of words1) {
        if (words2.has(w)) intersection++;
    }
    return intersection;
}

for (let i = 0; i < events.length; i++) {
  for (let j = i + 1; j < events.length; j++) {
    const yearDiff = Math.abs(events[i].year - events[j].year);
    if (yearDiff > 5) break;
    
    const overlap = getWordOverlap(events[i].title, events[j].title);
    
    // Check if they are similar
    if (overlap >= 2 || (overlap === 1 && events[i].title.length < 30 && events[j].title.length < 30)) {
      potentialDuplicates.push({
        year1: events[i].year,
        title1: events[i].title,
        year2: events[j].year,
        title2: events[j].title,
        overlap
      });
    }
  }
}

// Filter out exact duplicates since we already found those
const fuzzyOnly = potentialDuplicates.filter(d => d.title1 !== d.title2);

console.log(`Trovati ${fuzzyOnly.length} potenziali quasi-duplicati:`);
fuzzyOnly.forEach(d => {
    console.log(`\n---`);
    console.log(`[${d.year1}] ${d.title1}`);
    console.log(`[${d.year2}] ${d.title2}`);
});