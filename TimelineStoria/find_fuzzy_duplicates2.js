const fs = require('fs');
const code = fs.readFileSync('data.js', 'utf8');

const regex = /\{\s*year:\s*([-\d.]+)\s*,\s*title:\s*(["'])(.*?)\2.*?\}/g;
const events = [];

let match;
while ((match = regex.exec(code)) !== null) {
  events.push({
    fullLine: match[0],
    year: parseFloat(match[1]),
    title: match[3]
  });
}

events.sort((a, b) => a.year - b.year);

function similarity(s1, s2) {
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    if (longer.length === 0) return 1.0;
    return (longer.length - editDistance(longer, shorter)) / parseFloat(longer.length);
}

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
    const costs = new Array();
    for (let i = 0; i <= s1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= s2.length; j++) {
            if (i === 0) costs[j] = j;
            else {
                if (j > 0) {
                    let newValue = costs[j - 1];
                    if (s1.charAt(i - 1) !== s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}

const duplicatesToRemove = [];

for (let i = 0; i < events.length; i++) {
  for (let j = i + 1; j < events.length; j++) {
    const yearDiff = Math.abs(events[i].year - events[j].year);
    if (yearDiff > 10) break; // Look within 10 years
    
    // Exact title match or high similarity
    if (events[i].title === events[j].title || similarity(events[i].title, events[j].title) > 0.6) {
        // Simple manual overrides or specific keywords to ignore
        if (events[i].title.includes('Sacco di Roma') && events[j].title.includes('Sacco di Roma')) {
            if (events[i].title.includes('Visigoti') && !events[j].title.includes('Visigoti') && !events[i].title.includes('Alarico')) continue;
        }

        console.log(`DUPLICATE FOUND:`);
        console.log(`1: [${events[i].year}] ${events[i].title}`);
        console.log(`2: [${events[j].year}] ${events[j].title}`);
        console.log(`Similarity: ${similarity(events[i].title, events[j].title)}`);
        console.log(`---`);
        
        // Mark one for removal (usually the less descriptive one, or the second one)
        duplicatesToRemove.push({
            keep: events[i].fullLine,
            remove: events[j].fullLine
        });
    }
  }
}

fs.writeFileSync('duplicates_to_remove.json', JSON.stringify(duplicatesToRemove, null, 2));