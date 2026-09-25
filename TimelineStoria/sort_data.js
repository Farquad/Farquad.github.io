const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data.js');
const sortedDataFilePath = path.join(__dirname, 'dataSorted.js');

const rawContent = fs.readFileSync(dataFilePath, 'utf8');

// Invece di usare let, chiamiamo direttamente la funzione evaluata 'toNumber'
let myToNumber = null;
const functionMatch = rawContent.split('const timelineData = [')[0];
if (functionMatch && functionMatch.includes('function toNumber')) {
    // Valuta tutte le funzioni precedenti per sicurezza, mettendole a disposizione
    eval(functionMatch);
    myToNumber = toNumber;
}

// Estraiamo tutti gli oggetti presenti nell'intero file (ovunque si trovino)
const objectStringRegex = /\{[\s\S]*?\}/g;
let rawObjectMatches = [];
let m;
while ((m = objectStringRegex.exec(rawContent)) !== null) {
    if (m[0].includes('year:') && m[0].includes('title:')) {
        rawObjectMatches.push(m[0]);
    }
}

const events = [];
for (const rawObjectText of rawObjectMatches) {
    
    // Proviamo a estrarre l'anno calcolato per il sorting
    // Per avere un valore preciso e robusto potremmo analizzare il testo dell'anno
    const yearMatchText = rawObjectText.match(/year:\s*([^,}]+)/);
    let yearVal = 0;
    
    if (yearMatchText) {
        let yearString = yearMatchText[1].trim();
        // Rimuove eventuali apici e rimuove l'involucro toNumber()
        if (yearString.startsWith('toNumber(')) {
            yearString = yearString.replace(/^toNumber\(/, '').replace(/\)$/, '').trim();
        }
        yearString = yearString.replace(/^['"]|['"]$/g, '');
        
        if (typeof myToNumber === 'function') {
            yearVal = myToNumber(yearString);
        } else {
            yearVal = parseFloat(yearString);
        }
    }
    
    events.push({
        rawText: rawObjectText,
        yearVal: yearVal
    });
}

// Simuliamo il processo richiesto: "posizionare ciascuno nella giusta posizione in ordine cronologico rispetto a quelli che già sono stati messi fino a quel momento"
// Questo è sostanzialmente un Insertion Sort.
const sortedEvents = [];

for (const event of events) {
    let inserted = false;
    // Troviamo la giusta posizione iterando su quelli già posizionati
    for (let i = 0; i < sortedEvents.length; i++) {
        if (event.yearVal < sortedEvents[i].yearVal) {
            sortedEvents.splice(i, 0, event);
            inserted = true;
            break;
        }
    }
    if (!inserted) {
        // Se è maggiore o uguale a tutti, lo mettiamo alla fine
        sortedEvents.push(event);
    }
}

// Costruiamo il contenuto salvato
const functionHeaders = rawContent.split('const timelineData')[0];

let outputContent = functionHeaders;
outputContent += 'const timelineData = [\n';
let txtContent = '[\n';

let currentSeparator = null;

sortedEvents.forEach((ev, index) => {
    let year = ev.yearVal;
    let separator = null;
    
    if (year >= 1800) {
        // Suddivisione in decenni dal 1800 in poi
        let decade = Math.floor(year / 10) * 10;
        separator = `// ${decade}s`;
    } else if (year >= -3000) {
        // Suddivisione in secoli dal 3000 a.C.
        let century = Math.floor(year / 100) * 100;
        if (century < 0) {
            separator = `// ${Math.abs(century)} a.C.`;
        } else {
            separator = `// ${century}s`;
        }
    }
    
    if (separator && separator !== currentSeparator) {
        // Aggiunge un po' di spazio prima del nuovo gruppo
        outputContent += `\n    ${separator}\n`;
        txtContent += `\n    ${separator}\n`;
        currentSeparator = separator;
    }

    outputContent += '    ' + ev.rawText + (index < sortedEvents.length - 1 ? ',' : '') + '\n';
    txtContent += '    ' + ev.rawText + (index < sortedEvents.length - 1 ? ',' : '') + '\n';
});

outputContent += '];\n';
txtContent += '];\n';

fs.writeFileSync(sortedDataFilePath, outputContent, 'utf8');

const sortedListTxtPath = path.join(__dirname, 'sortedList.txt');
fs.writeFileSync(sortedListTxtPath, txtContent, 'utf8');

console.log(`Elaborazione completata. ${sortedEvents.length} eventi sono stati ordinati e salvati in dataSorted.js e sortedList.txt`);
