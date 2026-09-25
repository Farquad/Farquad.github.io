const fs = require('fs');

// Legge il file con i dati
const filePath = 'dataSorted.js';
const outputFile = 'eventi_stessa_data.txt';
let code;

try {
  code = fs.readFileSync(filePath, 'utf8');
} catch (err) {
  console.error(`Errore durante la lettura del file ${filePath}:`, err.message);
  process.exit(1);
}

// Regex per catturare la data passata a toNumber("...") e il titolo corrispondente
// Gestisce sia apici singoli che doppie virgolette, ed estrae il gruppo per la data e il titolo
const regex = /\{\s*year:\s*toNumber\(\s*(["'])(.*?)\1\s*\)\s*,\s*title:\s*(["'])(.*?)\3/g;
const events = [];
let match;

// Estraiamo tutti gli eventi che usano toNumber
while ((match = regex.exec(code)) !== null) {
  events.push({
    dateStr: match[2],
    title: match[4]
  });
}

// Raggruppiamo gli eventi in base alla stringa della data utilizzata (es: 20/08/-480)
const groupedByDate = {};
for (const event of events) {
  if (!groupedByDate[event.dateStr]) {
    groupedByDate[event.dateStr] = [];
  }
  groupedByDate[event.dateStr].push(event.title);
}

// Filtriamo per mantenere solo le date che hanno ALMENO 2 eventi (quelli da te considerati "stessa data")
const duplicates = Object.entries(groupedByDate).filter(([date, titles]) => titles.length > 1);

let outputText = `Trovati ${duplicates.length} gruppi di eventi che condividono esattamente la stessa data:\n\n`;

for (const [date, titles] of duplicates) {
  outputText += `[ Data comune: ${date} ]\n`;
  for (const title of titles) {
    outputText += `  - ${title}\n`;
  }
  outputText += '\n';
}

// Salva il file e stampa un messaggio in console
try {
  fs.writeFileSync(outputFile, outputText, 'utf8');
  console.log(`Finito! Il report è stato salvato con successo nel file: "${outputFile}"`);
} catch (err) {
  console.error("Errore durante il salvataggio del file di output:", err);
}