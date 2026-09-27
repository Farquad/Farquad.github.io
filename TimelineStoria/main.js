const canvas = document.getElementById('timelineCanvas');
const ctx = canvas.getContext('2d');

let width, height;

// Configurazione Iniziale
const minYear = -Infinity; // Nessun limite verso il passato
const maxYear = Infinity; // Nessun limite verso il futuro
let pixelsPerYear = 10; // Livello di zoom iniziale (più ampio per mostrare più secoli)
let centerYear = 1800; // Punto centrale iniziale

let targetPixelsPerYear = pixelsPerYear;
let targetCenterYear = centerYear;
let isButtonAnimating = false;
let buttonGhostingUntil = 0;

function clampCenterYear() {
    const dimension = isVertical ? height : width;
    if (!dimension) return; // Protezione
    const yearsVisible = dimension / pixelsPerYear;
    
    // Il limite assoluto a cui può arrivare il bordo inferiore/destro dello schermo
    const absoluteMaxEdge = maxYear + (yearsVisible * 0.05);
    
    // Per avere il bordo a 'absoluteMaxEdge', il centro deve essere indietro di metà schermo
    const maxAllowedCenter = absoluteMaxEdge - (yearsVisible / 2);
    
    const newCenterYear = Math.max(minYear, Math.min(maxAllowedCenter, centerYear));
    
    // Se è stato limitato, ferma l'inerzia
    if (newCenterYear !== centerYear && typeof velocity !== 'undefined') {
        velocity = 0;
    }
    
    centerYear = newCenterYear;
}

// Limiti dello zoom
const minZoom = 1e-12; // Zoom out virtualmente infinito (permette scale di miliardi di anni)
const maxZoom = 100000; // Zoom in quasi illimitato per vedere chiaramente i mesi/giorni

// Categorie e Colori
const colors = {
    politica: '#db3240',
    scienza: '#129cca',
    cultura: '#F4A261',
    tecnologia: '#139c4a',
    oggi: '#FFD700'
};

// Categorie Attive
const activeCategories = {
    politica: true,
    scienza: true,
    cultura: true,
    tecnologia: true,
    oggi: true
};

let needsLayoutUpdate = true; // Flag per ricalcolo globale del layout

// Toggle categorie UI
document.querySelectorAll('.legend-item').forEach(item => {
    const cat = item.getAttribute('data-category');
    
    // Imposta il colore della legenda dalla costante colors
    const colorBox = item.querySelector('.color-box');
    if (colorBox && colors[cat]) {
        colorBox.style.backgroundColor = colors[cat];
    }
    
    item.addEventListener('click', () => {
        activeCategories[cat] = !activeCategories[cat];
        if (activeCategories[cat]) {
            item.classList.remove('disabled');
        } else {
            item.classList.add('disabled');
        }
        needsLayoutUpdate = true;
    });
});

// Stato input
let isDragging = false;
let startX = 0;
let startY = 0;
let startCenterYear = 0;
let lastPinchDist = 0;
let isPinching = false;
let isVertical = false; // Vista orizzontale di default

let pinchStartY1 = 0;
let pinchStartY2 = 0;

let hasMoved = false; // Per rilevare tap/click
let forcedEventId = null; // ID dell'evento cliccato forzato
let forcedEventIndex = -1; // Indice dell'evento forzato nel gruppo same-year

// Variabili per l'inerzia e ottimizzazione layout
let velocity = 0; // Velocità in anni/ms
const FRAME_MS = 16.666;
// La linea è ferma sotto un pixel a frame. Il fantasma si spegne prima, a movimento lento.
const STOP_PIXELS_PER_FRAME = 1;
const GHOST_PIXELS_PER_FRAME = 4;

function pixelsPerFrame() {
    return Math.abs(velocity) * pixelsPerYear * FRAME_MS;
}

function inertiaHasStopped() {
    return pixelsPerFrame() < STOP_PIXELS_PER_FRAME;
}

function motionIsEvident() {
    return pixelsPerFrame() >= GHOST_PIXELS_PER_FRAME;
}
let lastDragTime = 0;
let lastDragYear = 0;
let lastLayoutCenterYear = centerYear;

// Memoria per interpolazione animazioni offset e layout
const eventStates = new Map();

// Funzione helper per formattare i numeri
function formatYearWithThousands(num) {
    if (Math.abs(num) < 10000) {
        return num.toString();
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

// Helper per verificare se un anno ha 3 cifre decimali significative
function hasThreeDecimals(year) {
    const decimalPart = Math.abs(year) - Math.floor(Math.abs(year));
    if (decimalPart === 0) return false;
    
    // Verifica se la parte decimale richiede 3 posizioni per essere rappresentata
    // Convertiamo in stringa e contiamo i caratteri dopo il punto decimale
    // 0.456 → "0.456" → parte dopo "." è "456" → 3 caratteri
    // 0.005 → "0.005" → parte dopo "." è "005" → 3 caratteri
    // 0.06 → "0.06" → parte dopo "." è "06" → 2 caratteri
    const str = decimalPart.toString();
    const dotIndex = str.indexOf('.');
    if (dotIndex === -1) return false;
    
    const afterDot = str.substring(dotIndex + 1);
    return afterDot.length >= 3;
}

// Funzione per decodificare la parte decimale dell'anno in giorno e mese
function decodeDateFromDecimal(year) {
    const isBC = year < 0;
    const absYear = Math.abs(Math.floor(year));
    const decimalPart = Math.abs(year) - Math.floor(Math.abs(year));
    
    // Verifica se è un anno bisestile per decodificare correttamente
    const isLeapYear = (absYear % 4 === 0 && (absYear % 100 !== 0 || absYear % 400 === 0));
    const daysInYear = isLeapYear ? 366 : 365;
    
    // Usa Math.round invece di Math.floor per recuperare la perdita di precisione delle 3 cifre decimali
    const dayOfYear = Math.round(decimalPart * daysInYear);
    
    // Array dei nomi dei mesi italiani con i giorni di ogni mese
    const months = [
        { name: 'gennaio', days: 31 },
        { name: 'febbraio', days: isLeapYear ? 29 : 28 }, // gestisce l'anno bisestile
        { name: 'marzo', days: 31 },
        { name: 'aprile', days: 30 },
        { name: 'maggio', days: 31 },
        { name: 'giugno', days: 30 },
        { name: 'luglio', days: 31 },
        { name: 'agosto', days: 31 },
        { name: 'settembre', days: 30 },
        { name: 'ottobre', days: 31 },
        { name: 'novembre', days: 30 },
        { name: 'dicembre', days: 31 }
    ];
    
    let day = dayOfYear;
    let monthName = 'gennaio';
    
    for (let i = 0; i < months.length; i++) {
        if (day < months[i].days) {
            monthName = months[i].name;
            break;
        }
        day -= months[i].days;
    }
    
    // Il giorno parte da 1, non da 0
    day = Math.max(1, day + 1);
    
    return {
        day: day,
        monthName: monthName,
        year: absYear,
        isBC: isBC
    };
}

// Funzione per formattare una data completa
function formatFullDate(year) {
    if (year > -5000 && hasThreeDecimals(year)) {
        const date = decodeDateFromDecimal(year);
        const yearStr = formatYearWithThousands(date.year);
        const suffix = date.isBC ? ' a.C.' : '';
        return `${date.day} ${date.monthName} ${yearStr}${suffix}`;
    }
    return null;
}

// Stessa codifica di toNumber: l'anno intero è il 1° gennaio, il resto dell'anno è la frazione dei giorni.
function todayDecimalYear() {
    const oggi = new Date();
    return toNumber(`${oggi.getDate()}/${oggi.getMonth() + 1}/${oggi.getFullYear()}`);
}

// Helper per collisioni 2D
function rectIntersect(r1, r2) {
    return !(r2.left >= r1.right || 
             r2.right <= r1.left || 
             r2.top >= r1.bottom ||
             r2.bottom <= r1.top);
}

// Ridimensionamento
let isKeyboardProbablyOpen = false;
let maxSeenHeight = window.innerHeight;
let maxSeenWidth = window.innerWidth;

function resize() {
    // Aggiorniamo le massime dimensioni viste finora (orientamento e grandezza schermo)
    if (window.innerWidth > maxSeenWidth) maxSeenWidth = window.innerWidth;
    if (window.innerHeight > maxSeenHeight) maxSeenHeight = window.innerHeight;

    // Se stiamo scrivendo attivamente consentiamo cmq al canvas di capire che lo schermo
    // ha nuove dimensioni, altrimenti il browser lo deforma per farlo entrare nel container "schiacciato"
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;
    
    // Controlliamo se la tastiera sta causando uno schiacciamento improvviso dello schermo.
    // Se la larghezza è pressappoco la stessa e l'altezza è crollata (minore dell'85%), ignoriamo il resize
    if (typeof width !== 'undefined') {
        const isSameWidth = Math.abs(currentWidth - width) < 20;
        const heightDropRatio = currentHeight / maxSeenHeight;
        
        // Se l'altezza è sospettosamente bassa rispetto al massimo (es. tastiera aperta)
        if (isSameWidth && heightDropRatio < 0.85) {
            isKeyboardProbablyOpen = true;
            // Interrompiamo immediatamente qualsiasi operazione di resize.
            // Il canvas manterrà i pixel e le dimensioni attuali senza subire alterazioni
            return;
        }
    }
    
    isKeyboardProbablyOpen = false;
    width = currentWidth;
    height = currentHeight;
    
    // Blocchiamo le dimensioni tramite CSS in modo assoluto affinché
    // il "height: 100%" di Chrome non vada a schiacciare visivamente la grafica
    // quando appare la tastiera.
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    
    // Per gestire schermi ad alta densità (Retina)
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    needsLayoutUpdate = true;
}
window.addEventListener('resize', resize);
if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', resize);
}
if (document.getElementById('search-input')) {
    document.getElementById('search-input').addEventListener('blur', () => {
        // Riporta lo scroll a 0 in caso il browser abbia spinto la vista verso il basso (es. Android)
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        
        // Forza un ricalcolo dopo la chiusura della tastiera
        setTimeout(() => {
            isKeyboardProbablyOpen = false;
            resize(); 
        }, 300);
    });
}

// Input Mouse (Pan)
canvas.addEventListener('mousedown', (e) => {
    isButtonAnimating = false;
    targetPixelsPerYear = pixelsPerYear;
    targetCenterYear = centerYear;

    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    startCenterYear = centerYear;
    hasMoved = false;
    
    velocity = 0;
    lastDragTime = performance.now();
    lastDragYear = centerYear;
});
window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    // Controlla se si è mosso sufficientemente per non essere più un click
    if (!hasMoved) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (Math.sqrt(dx * dx + dy * dy) > 15) {
            hasMoved = true;
        }
    }

    const dPos = isVertical ? (e.clientY - startY) : (e.clientX - startX);
    const yearsDelta = dPos / pixelsPerYear;
    const newCenterYear = startCenterYear - yearsDelta;
    
    const now = performance.now();
    const dt = now - lastDragTime;
    
    // Ignoriamo letture troppo ravvicinate per evitare divisioni vicine allo zero (es. dt = 1 o 2 ms)
    if (dt > 10) {
        if (dt > 100) {
            velocity = 0;
        } else {
            let currentVelocity = (newCenterYear - lastDragYear) / dt;
            
            // Limitiamo la velocità massima per evitare salti spaziali pazzeschi
            const maxVelocity = (width / pixelsPerYear) * 0.05; // Max 5% dello schermo per millisecondo
            if (currentVelocity > maxVelocity) currentVelocity = maxVelocity;
            if (currentVelocity < -maxVelocity) currentVelocity = -maxVelocity;
            
            velocity = velocity * 0.4 + currentVelocity * 0.6;
        }
        lastDragTime = now;
        lastDragYear = newCenterYear;
    }
    
    centerYear = newCenterYear;
    
    // Limiti di pan
    clampCenterYear();
    // Durante il pan NON aggiorniamo needsLayoutUpdate per garantire stabilità visiva e performance
});
window.addEventListener('mouseup', (e) => {
    if (isDragging) {
        isDragging = false;
        
        if (!hasMoved) {
            handleInteraction(e.clientX, e.clientY);
        }

        // Se ci siamo fermati prima di rilasciare, o se lo scorrimento è sotto un pixel a frame
        if (performance.now() - lastDragTime > 100 || inertiaHasStopped()) {
            velocity = 0;
            needsLayoutUpdate = true;
        }
        // Altrimenti, l'inerzia gestirà l'aggiornamento finale in animate()
    }
});

// Variabile per il debounce della rotellina del mouse
let wheelTimeout;
let isZoomingWithWheel = false;

// Input Mouse (Zoom - Rotellina)
canvas.addEventListener('wheel', (e) => {
    isButtonAnimating = false;
    targetPixelsPerYear = pixelsPerYear;
    targetCenterYear = centerYear;
    
    e.preventDefault(); // Previene lo scroll della pagina
    velocity = 0; // Ferma l'inerzia se l'utente zooma
    
    const mousePos = isVertical ? e.clientY : e.clientX;
    const canvasCenterPos = isVertical ? height / 2 : width / 2;
    
    // Calcoliamo la posizione del mouse in anni
    const mouseYearOffset = (mousePos - canvasCenterPos) / pixelsPerYear;
    const mouseYear = centerYear + mouseYearOffset;
    
    // Zoom in o out
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    let newPixelsPerYear = pixelsPerYear * zoomFactor;
    
    // Limiti zoom
    newPixelsPerYear = Math.max(minZoom, Math.min(maxZoom, newPixelsPerYear));
    
    // Mantenere il punto sotto il mouse fermo durante lo zoom
    const newMouseYearOffset = (mousePos - canvasCenterPos) / newPixelsPerYear;
    centerYear = mouseYear - newMouseYearOffset;
    
    pixelsPerYear = newPixelsPerYear;
    
    clampCenterYear();
    
    // Evitiamo ricalcoli continui durante lo scrolling veloce della rotellina
    isZoomingWithWheel = true;
    clearTimeout(wheelTimeout);
    wheelTimeout = setTimeout(() => {
        needsLayoutUpdate = true;
        isZoomingWithWheel = false;
    }, 150); // Attende 150ms di inattività prima di ricalcolare
}, { passive: false });

// Double-click zoom (same effect as zoom+ button)
canvas.addEventListener('dblclick', () => {
    targetPixelsPerYear = Math.min(maxZoom, targetPixelsPerYear * 1.5);
    targetCenterYear = centerYear;
    isButtonAnimating = true;
});

// Input Touch (Pan e Pinch-to-Zoom)
canvas.addEventListener('touchstart', (e) => {
    isButtonAnimating = false;
    targetPixelsPerYear = pixelsPerYear;
    targetCenterYear = centerYear;

    if (e.touches.length === 1) {
        isDragging = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        startCenterYear = centerYear;
        hasMoved = false;
        
        velocity = 0;
        lastDragTime = performance.now();
        lastDragYear = centerYear;
    } else if (e.touches.length === 2) {
        isPinching = true;
        lastPinchDist = getDistance(e.touches[0], e.touches[1]);
        
        const p1 = isVertical ? e.touches[0].clientY : e.touches[0].clientX;
        const p2 = isVertical ? e.touches[1].clientY : e.touches[1].clientX;
        const canvasCenterPos = isVertical ? height / 2 : width / 2;
        
        pinchStartY1 = centerYear + (p1 - canvasCenterPos) / pixelsPerYear;
        pinchStartY2 = centerYear + (p2 - canvasCenterPos) / pixelsPerYear;
        
        velocity = 0;
    }
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Previene lo scroll o pull-to-refresh nativo
    if (isPinching && e.touches.length === 2) {
        const currentDist = getDistance(e.touches[0], e.touches[1]);
        const zoomFactor = lastPinchDist > 0 ? currentDist / lastPinchDist : 1;
        lastPinchDist = currentDist;
        
        const p1 = isVertical ? e.touches[0].clientY : e.touches[0].clientX;
        const p2 = isVertical ? e.touches[1].clientY : e.touches[1].clientX;
        
        const yearDiff = Math.abs(pinchStartY1 - pinchStartY2);
        const pixelDiff = Math.abs(p1 - p2);
        
        const centerPos = (p1 + p2) / 2;
        const centerYearTarget = (pinchStartY1 + pinchStartY2) / 2;
        const canvasCenterPos = isVertical ? height / 2 : width / 2;

        if (yearDiff > 0.0001 && pixelDiff > 5) {
            let newPixelsPerYear = pixelDiff / yearDiff;
            newPixelsPerYear = Math.max(minZoom, Math.min(maxZoom, newPixelsPerYear));
            
            centerYear = centerYearTarget - (centerPos - canvasCenterPos) / newPixelsPerYear;
            pixelsPerYear = newPixelsPerYear;
        } else {
            let newPixelsPerYear = pixelsPerYear * zoomFactor;
            newPixelsPerYear = Math.max(minZoom, Math.min(maxZoom, newPixelsPerYear));
            
            centerYear = centerYearTarget - (centerPos - canvasCenterPos) / newPixelsPerYear;
            pixelsPerYear = newPixelsPerYear;
        }
        
        clampCenterYear();
        // Durante il pinch NON aggiorniamo needsLayoutUpdate
    } else if (isDragging && e.touches.length === 1) {
        if (!hasMoved) {
            const dx = e.touches[0].clientX - startX;
            const dy = e.touches[0].clientY - startY;
            if (Math.sqrt(dx * dx + dy * dy) > 15) {
                hasMoved = true;
            }
        }

        const dPos = isVertical ? (e.touches[0].clientY - startY) : (e.touches[0].clientX - startX);
        const yearsDelta = dPos / pixelsPerYear;
        const newCenterYear = startCenterYear - yearsDelta;
        
        const now = performance.now();
        const dt = now - lastDragTime;
        
        // Ignoriamo letture troppo ravvicinate per evitare divisioni vicine allo zero (jitter del touch)
        if (dt > 10) {
            if (dt > 100) {
                velocity = 0;
            } else {
                let currentVelocity = (newCenterYear - lastDragYear) / dt;
                
                // Limitiamo la velocità massima per evitare salti spaziali pazzeschi
                const maxVelocity = (width / pixelsPerYear) * 0.05; // Max 5% dello schermo per millisecondo
                if (currentVelocity > maxVelocity) currentVelocity = maxVelocity;
                if (currentVelocity < -maxVelocity) currentVelocity = -maxVelocity;
                
                velocity = velocity * 0.4 + currentVelocity * 0.6;
            }
            lastDragTime = now;
            lastDragYear = newCenterYear;
        }
        
        centerYear = newCenterYear;
        clampCenterYear();
        // Durante il pan touch NON aggiorniamo needsLayoutUpdate
    }
}, { passive: false });

canvas.addEventListener('touchend', (e) => {
    if (e.touches.length === 0) {
        if (isDragging && !hasMoved) {
            // Era un tap, non c'è e.touches[0] nel touchend, quindi usiamo startX, startY
            if (e.changedTouches && e.changedTouches.length > 0) {
                handleInteraction(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
            } else {
                handleInteraction(startX, startY);
            }
        }

        if (isDragging || isPinching) {
            // Se lo scorrimento è sotto un pixel a frame, ricalcoliamo subito
            if (performance.now() - lastDragTime > 100 || inertiaHasStopped()) {
                velocity = 0;
                needsLayoutUpdate = true;
            }
            // Altrimenti lasceremo che ci pensi l'animate() quando la velocità sarà nulla
        }
        isDragging = false;
        isPinching = false;
    } else if (e.touches.length === 1) {
        // Se passiamo da pinch a pan (da 2 dita a 1 dito)
        // NON forziamo il ricalcolo per evitare salti, aspettiamo la fine dell'azione
        isPinching = false;
        isDragging = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        startCenterYear = centerYear;
        
        velocity = 0;
        lastDragTime = performance.now();
        lastDragYear = centerYear;
    }
});

function getDistance(t1, t2) {
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

function handleInteraction(clientX, clientY) {
    const dimension = isVertical ? height : width;
    const yearsVisible = dimension / pixelsPerYear;
    const bgRenderBuffer = yearsVisible * 0.5;
    const bgVisibleStart = centerYear - yearsVisible / 2 - bgRenderBuffer;
    const bgVisibleEnd = centerYear + yearsVisible / 2 + bgRenderBuffer;
    const canvasCenterX = width / 2;
    const canvasCenterY = height / 2;

    let clickedEventId = null;
    let clickedOnLabel = false;
    let minDistance = 20; // raggio in pixel per il click

    // --- Prima fase: cerca click sui pallini ---
    const clickTodayYear = todayDecimalYear();
    const clickTodayBgEvent = {
        year: clickTodayYear,
        title: "Oggi",
        category: "oggi",
        importance: 1,
        baseDotSize: 8
    };

    let clickBgDots = timelineData;
    if (activeCategories['oggi'] && clickTodayYear >= bgVisibleStart && clickTodayYear <= bgVisibleEnd) {
        clickBgDots = timelineData.concat([clickTodayBgEvent]);
    }

    clickBgDots.forEach(e => {
        if (!activeCategories[e.category]) return;
        if (e.year < bgVisibleStart || e.year > bgVisibleEnd) return;

        const pos = isVertical ? 
            canvasCenterY + (e.year - centerYear) * pixelsPerYear :
            canvasCenterX + (e.year - centerYear) * pixelsPerYear;

        const eventX = isVertical ? canvasCenterX : pos;
        const eventY = isVertical ? pos : canvasCenterY;

        const dx = clientX - eventX;
        const dy = clientY - eventY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < minDistance) {
            minDistance = dist;
            clickedEventId = e.year + '_' + e.title;
            clickedOnLabel = false;
        }
    });

    // --- Seconda fase: cerca click sulle labels ---
    if (!clickedEventId) {
        eventStates.forEach((state, eventId) => {
            if (!state.isVisible || !state.shapes || !state.shapes.textRect) return;
            
            const rect = state.shapes.textRect;
            if (clientX >= rect.left && clientX <= rect.right && 
                clientY >= rect.top && clientY <= rect.bottom) {
                // Prendi l'evento dal suo ID
                const [yearStr, ...titleParts] = eventId.split('_');
                const year = parseFloat(yearStr);
                const title = titleParts.join('_');
                
                // Verifica che esista in timelineData
                const event = timelineData.find(e => e.year === year && e.title === title);
                if (event && activeCategories[event.category]) {
                    clickedEventId = eventId;
                    clickedOnLabel = true;
                }
            }
        });
    }

    if (clickedEventId) {
        // Estrai l'anno dall'evento cliccato
        const [yearStr, ...titleParts] = clickedEventId.split('_');
        const clickedYear = parseFloat(yearStr);
        
        // Il ciclo (< 2 pixel) avviene SOLO se il click è sul pallino, non sulla label
        if (!clickedOnLabel && clickedEventId === forcedEventId) {
            // Trova tutti gli eventi distanti meno di 2 pixel (tutte le categorie attive)
            const nearbyEvents = [];
            clickBgDots.forEach((e, index) => {
                if (!activeCategories[e.category]) return;
                const pixelDistance = Math.abs(e.year - clickedYear) * pixelsPerYear;
                if (pixelDistance < 2) {
                    nearbyEvents.push({ event: e, index: index, pixelDistance: pixelDistance });
                }
            });
            
            // Se c'è più di un evento vicino, cicla
            if (nearbyEvents.length > 1) {
                // Ordina per index in timelineData
                nearbyEvents.sort((a, b) => a.index - b.index);
                
                // Trova l'indice dell'evento corrente nel gruppo
                const currentIndexInGroup = nearbyEvents.findIndex(
                    ne => (ne.event.year + '_' + ne.event.title) === clickedEventId
                );
                
                // Avanza al prossimo (ciclo infinito)
                const nextIndex = (currentIndexInGroup + 1) % nearbyEvents.length;
                const nextEvent = nearbyEvents[nextIndex].event;
                forcedEventId = nextEvent.year + '_' + nextEvent.title;
                forcedEventIndex = nextIndex;
            }
            // Se c'è un solo evento vicino, non fare nulla (resta selezionato)
        } else {
            // Nuovo click su un evento non selezionato (label o pallino non forzato)
            forcedEventId = clickedEventId;
            forcedEventIndex = -1; // Reset dell'indice di ciclo
        }
        needsLayoutUpdate = true;
    } else {
        if (forcedEventId) {
            forcedEventId = null;
            forcedEventIndex = -1;
            needsLayoutUpdate = true;
        }
    }
}

// Bottoni UI
document.getElementById('zoom-in').addEventListener('click', () => {
    targetPixelsPerYear = Math.min(maxZoom, targetPixelsPerYear * 1.5);
    targetCenterYear = centerYear;
    isButtonAnimating = true;
});
document.getElementById('zoom-out').addEventListener('click', () => {
    targetPixelsPerYear = Math.max(minZoom, targetPixelsPerYear / 1.5);
    targetCenterYear = centerYear;
    isButtonAnimating = true;
});
document.getElementById('reset').addEventListener('click', () => {
    targetCenterYear = 1800;
    targetPixelsPerYear = 10;
    forcedEventId = null;
    isButtonAnimating = true;
});
document.getElementById('toggle-view').addEventListener('click', () => {
    isVertical = !isVertical;
    document.getElementById('toggle-view').innerText = isVertical ? 'Vista Orizzontale' : 'Vista Verticale';
    eventStates.clear(); // Reset animazioni offset per un passaggio pulito
    forcedEventId = null;
    clampCenterYear();
    needsLayoutUpdate = true;
    buttonGhostingUntil = performance.now() + 600;
});

// Navigazione da tastiera
window.addEventListener('keydown', (e) => {
    // Ignora se l'utente sta digitando in un campo di input o testuale
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        return;
    }

    const isNavKey = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key);
    
    if (isNavKey) {
        e.preventDefault(); // Evita lo scroll predefinito della pagina
        
        switch (e.key) {
            case 'ArrowUp': // Zoom In (come tasto +)
                targetPixelsPerYear = Math.min(maxZoom, targetPixelsPerYear * 1.5);
                // Aggiorna targetCenterYear al centerYear attuale così da zumare sul centro visibile
                targetCenterYear = centerYear; 
                isButtonAnimating = true;
                break;
            case 'ArrowDown': // Zoom Out (come tasto -)
                targetPixelsPerYear = Math.max(minZoom, targetPixelsPerYear / 1.5);
                targetCenterYear = centerYear;
                isButtonAnimating = true;
                break;
            case 'ArrowLeft': // Scroll in senso antiorario / indietro nel tempo
                {
                    const dimension = isVertical ? height : width;
                    // Sposta del 15% dello schermo ad ogni pressione
                    const panAmount = (dimension * 0.15) / targetPixelsPerYear;
                    targetCenterYear -= panAmount;
                    isButtonAnimating = true;
                }
                break;
            case 'ArrowRight': // Scroll in senso orario / avanti nel tempo
                {
                    const dimension = isVertical ? height : width;
                    // Sposta del 15% dello schermo ad ogni pressione
                    const panAmount = (dimension * 0.15) / targetPixelsPerYear;
                    targetCenterYear += panAmount;
                    isButtonAnimating = true;
                }
                break;
        }
    }
});

// Ricerca Anno
let searchResult = null; // { type: 'year'|'interval'|'date', start: number, end?: number, point?: number }
const searchToggle = document.getElementById('search-toggle');
const searchBox = document.getElementById('search-box');
const searchInput = document.getElementById('search-input');
const searchSubmit = document.getElementById('search-submit');

searchToggle.addEventListener('click', () => {
    if (searchBox.style.display === 'none') {
        searchBox.style.display = 'flex';
        searchInput.focus();
    } else {
        searchBox.style.display = 'none';
        searchResult = null;
        searchInput.value = ''; // puliamo anche il testo della ricerca (opzionale, ma ha senso)
        searchInput.style.border = '1px solid rgba(255,255,255,0.3)';
        needsLayoutUpdate = true;
    }
});

function parseYear(str) {
    const isAC = str.includes('ac');
    const isDC = str.includes('dc');
    const match = str.match(/-?\d+/);
    if (!match) return null;
    let num = parseInt(match[0], 10);
    if (isAC) return Math.abs(num) === 0 ? 0 : -Math.abs(num);
    if (isDC) return Math.abs(num);
    return num;
}

let toastTimeout = null;
function showToast(message) {
    const toast = document.getElementById('toast-message');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('hidden');
    
    if (toastTimeout) {
        clearTimeout(toastTimeout);
    }
    
    toastTimeout = setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

function handleSearch() {
    // Chiude forzatamente la tastiera appena inizia la ricerca
    searchInput.blur(); 
    
    // Su mobile, la tastiera potrebbe aver fatto slittare la pagina in alto. Riportiamo a zero.
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    let input = searchInput.value.trim().toLowerCase();
    const normalized = input.replace(/\./g, '');
    
    let result = null;
    
    // 1. Data precisa (gg/mm/anno)
    const dateMatch = normalized.match(/^(\d{1,2})\/(\d{1,2})\/(.+)$/);
    if (dateMatch) {
        const d = parseInt(dateMatch[1], 10);
        const m = parseInt(dateMatch[2], 10);
        const yearStr = dateMatch[3];
        const y = parseYear(yearStr);
        if (y !== null) {
            const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            let dayOfYear = d - 1;
            for (let i = 0; i < m - 1 && i < 12; i++) dayOfYear += daysInMonth[i];
            const decimal = dayOfYear / 365;
            const decimalYear = y >= 0 ? y + decimal : y - decimal; // In AC gli anni decrescono 
            result = { type: 'date', point: decimalYear };
        }
    }

    // 1.5 Mese e anno
    if (!result) {
        const monthNames = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
        let m = null;
        let yearStr = null;
        
        const monthMatch1 = normalized.match(/^(\d{1,2})\/(.+)$/);
        if (monthMatch1 && !normalized.includes('-')) {
            m = parseInt(monthMatch1[1], 10);
            yearStr = monthMatch1[2];
        } else {
            for (let i = 0; i < monthNames.length; i++) {
                if (normalized.startsWith(monthNames[i])) {
                    m = i + 1;
                    yearStr = normalized.substring(monthNames[i].length).trim();
                    break;
                }
            }
        }
        
        if (m !== null && m >= 1 && m <= 12 && yearStr) {
            const y = parseYear(yearStr);
            // Controlliamo che yearStr contenga effettivamente dei numeri per evitare falsi positivi
            if (y !== null && /\d/.test(yearStr)) {
                // Calcoliamo inizio e fine del mese
                const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                let dayOfYear = 0;
                for (let i = 0; i < m - 1; i++) dayOfYear += daysInMonth[i];
                const decimalStart = dayOfYear / 365;
                const decimalEnd = (dayOfYear + daysInMonth[m - 1]) / 365;
                
                const yStart = y >= 0 ? y + decimalStart : y - decimalStart;
                const yEnd = y >= 0 ? y + decimalEnd : y - decimalEnd;
                
                result = { type: 'interval', start: Math.min(yStart, yEnd), end: Math.max(yStart, yEnd) };
            }
        }
    }
    
    // 2. Intervallo (anno - anno)
    if (!result) {
        let p1, p2;
        if (normalized.includes(' - ')) {
            [p1, p2] = normalized.split(' - ');
        } else {
            // "1940-1945" oppure "44ac-14dc"
            const intervalMatch = normalized.match(/^(.+?(?:\s*(?:ac|dc))?)-(.+)$/i);
            // Attenzione se è solo un anno negativo tipo "-100" non deve dividerlo a metà
            // Il regex sopra divide sull'ultimo tratto se non stiamo attenti.
            if (intervalMatch && !intervalMatch[1].trim().match(/^-$/)) {
                p1 = intervalMatch[1];
                p2 = intervalMatch[2];
            }
        }
        
        if (p1 && p2) {
            const y1 = parseYear(p1);
            const y2 = parseYear(p2);
            if (y1 !== null && y2 !== null) {
                const start = Math.min(y1, y2);
                const end = Math.max(y1, y2); // Aumento di 1 l'end per includere l'intero anno
                result = { type: 'interval', start: start, end: end + 1 };
            }
        }
    }
    
    // 3. Singolo anno
    if (!result) {
        const y = parseYear(normalized);
        const withoutAcDc = normalized.replace(/(?:a\.?c\.?|d\.?c\.?|a\.?E\.?V\.?|p\.?E\.?V\.?)/ig, '').trim();
        if (y !== null && !withoutAcDc.match(/[a-z]/i)) { 
            result = { type: 'year', start: y, end: y + 1 };
        }
    }
    
    // 4. Parola chiave
    if (!result && input.trim() !== '') {
        const removeAccents = (str) => {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        };

        // Separiamo per virgole o usiamo la stringa intera?
        // Permettiamo di cercare più cose, ad esempio dividendole per virgola.
        // Ma se non ci sono virgole, cerchiamo la stringa esatta.
        const keywords = input.split(',').map(k => {
            // Rimuoviamo apici e virgolette (spesso usati dagli utenti per forzare la ricarca o presenti nei testi copiati)
            // e normalizziamo l'apostrofo tipografico
            let cleanK = k.replace(/["“”«»]/g, '').replace(/[’`]/g, "'").trim();
            return removeAccents(cleanK);
        }).filter(k => k !== '');
        
        let matchingEvents = [];
        
        if (keywords.length > 0) {
            matchingEvents = timelineData.filter(e => {
                const title = removeAccents((e.title || '').toLowerCase().replace(/[’`]/g, "'"));
                const desc = removeAccents((e.description || '').toLowerCase().replace(/[’`]/g, "'"));
                const cat = removeAccents((e.category || '').toLowerCase());
                
                // Ritorna true se l'evento corrisponde ad ALMENO UNA delle parole chiave cercate separate da virgola (OR), 
                // oppure se non ci sono virgole cerca l'unica stringa inserita.
                // Utilizziamo un match tramite espressione regolare per cercare la parola intera o come prefisso,
                // evitando di trovarla all'interno di altre parole (es. "roma" in "stromatoliti").
                // Usiamo il flag 'u' e \p{L} per supportare correttamente le lettere accentate.
                return keywords.some(kw => {
                    if (!kw) return false;
                    try {
                        // Escapa i caratteri speciali per la RegExp
                        const escapedKw = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                        // (?<![\p{L}\p{N}]) garantisce che prima non ci sia una lettera o numero (inizio parola)
                        const regex = new RegExp(`(?<![\\p{L}\\p{N}])${escapedKw}`, 'iu');
                        return regex.test(title) || regex.test(desc) || regex.test(cat);
                    } catch (e) {
                        // Fallback sicuro se l'espressione regolare fallisce
                        return title.includes(kw) || desc.includes(kw) || cat.includes(kw);
                    }
                });
            });
        }
        
        if (matchingEvents.length > 0) {
            // Se più di 20, mostriamo solo i 19 più rilevanti per importanza (1 è la più importante)
            if (matchingEvents.length >= 20) {
                matchingEvents.sort((a, b) => (a.importance || 5) - (b.importance || 5));
                matchingEvents = matchingEvents.slice(0, 19); 
                showToast(`Trovati troppi eventi. Vengono mostrati solo i 19 più rilevanti per evitare rallentamenti.`);
            }

            // Attiviamo le categorie degli eventi trovati affinché siano visibili sulla timeline
            let missingCategories = false;
            matchingEvents.forEach(e => {
                const cat = e.category || 'storia';
                if (!activeCategories[cat]) {
                    activeCategories[cat] = true;
                    missingCategories = true;
                }
            });
            
            // Aggiorniamo i bottoni e i dati filtrati visualizzati
            if (missingCategories) {
                document.querySelectorAll('.legend-item').forEach(item => {
                    const id = item.id.replace('legend-', '');
                    if (activeCategories[id]) {
                        item.classList.add('active');
                    }
                });
                
                needsLayoutUpdate = true;
            }

            result = { type: 'keyword', keyword: input, events: matchingEvents };
        } else {
            showToast(`Nessun evento trovato per "${input}".`);
            return;
        }
    }
    
    if (result) {
        searchResult = result;
        searchInput.style.border = '2px solid #FFE800';
        const dimension = isVertical ? height : width;
        
        if (result.type === 'date') {
            targetCenterYear = result.point;
            targetPixelsPerYear = dimension * 0.8; // Molto ravvicinato per un punto preciso
        } else if (result.type === 'keyword') {
            // calcoliamo il bounding box degli anni degli eventi
            let minYear = Infinity;
            let maxYear = -Infinity;
            result.events.forEach(e => {
                if (e.year < minYear) minYear = e.year;
                if (e.year > maxYear) maxYear = e.year;
            });
            
            const span = maxYear - minYear;
            targetCenterYear = minYear + (span / 2);
            
            // se c'è un solo evento e span è 0, mostriamo uno zoom molto vicino ma gestibile
            if (span === 0) {
                targetPixelsPerYear = dimension * 0.4; 
            } else {
                // aggiungiamo un margine
                const adjustedSpan = span * 1.5;
                targetPixelsPerYear = dimension / adjustedSpan;
            }
            
        } else {
            const span = result.end - result.start;
            targetCenterYear = result.start + (span / 2);
            // Calcola lo zoom per farci stare l'intervallo (o l'anno unico) più un margine (es 40% per anno puro, padding se span grosso)
            if (span === 1) {
                targetPixelsPerYear = dimension * 0.4;
            } else {
                targetPixelsPerYear = (dimension * 0.8) / span;
            }
        }
        
        isButtonAnimating = true;
        needsLayoutUpdate = true;
    }
}

searchSubmit.addEventListener('click', handleSearch);
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});


// Helper per sillabazione italiana
function syllabify(word) {
    const vowels = "aeiouyàèéìíîòóùúAEIOUYÀÈÉÌÍÎÒÓÙÚ'";
    const isVowel = c => vowels.indexOf(c) !== -1;
    let syllables = [];
    let current = "";
    
    for (let i = 0; i < word.length; i++) {
        let c = word[i];
        current += c;
        
        // Non spezzare le ultime 2 lettere per evitare sillabe singole appese
        if (i >= word.length - 2) continue;
        
        if (isVowel(c)) {
            let next = word[i+1];
            let next2 = word[i+2];
            
            // Ignora se il carattere successivo non è una lettera
            if (!/[a-zA-Z]/.test(next)) continue;

            if (!isVowel(next)) {
                if (isVowel(next2) || next2 === "'") {
                    // V - C V
                    syllables.push(current);
                    current = "";
                } else if (/[a-zA-Z]/.test(next2)) {
                    let cc = (next + next2).toLowerCase();
                    const inseparable = ["ch", "gh", "gn", "gl", "sc", "br", "cr", "dr", "fr", "gr", "pr", "tr", "vr", "bl", "cl", "fl", "pl", "sl"];
                    const isSImpura = next.toLowerCase() === 's' && !isVowel(next2);
                    
                    if (inseparable.includes(cc) || isSImpura) {
                        // V - CC V (inseparabili o S impura)
                        syllables.push(current);
                        current = "";
                    } else {
                        // V C - C V (doppie o divisibili)
                        current += next;
                        i++;
                        syllables.push(current);
                        current = "";
                    }
                }
            }
        }
    }
    if (current.length > 0) {
        syllables.push(current);
    }
    return syllables;
}

// Helper per avvolgere il testo in base alla larghezza massima
function wrapText(ctx, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = "";

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const testLine = currentLine === "" ? word : currentLine + " " + word;
        const width = ctx.measureText(testLine).width;
        
        if (width <= maxWidth) {
            currentLine = testLine;
        } else {
            if (currentLine !== "") {
                lines.push(currentLine);
                currentLine = "";
            }
            
            const wordWidth = ctx.measureText(word).width;
            if (wordWidth > maxWidth) {
                // Parola troppo lunga: sillabazione
                const syllables = syllabify(word);
                let tempWordLine = "";
                for (let j = 0; j < syllables.length; j++) {
                    const syl = syllables[j];
                    const isLast = (j === syllables.length - 1);
                    const hyphen = isLast ? "" : "-";
                    const testSylLine = tempWordLine + syl + hyphen;
                    
                    // Se c'entra oppure se è la primissima sillaba e sfora lo stesso (deve almeno mettere una sillaba)
                    if (ctx.measureText(testSylLine).width <= maxWidth || tempWordLine === "") {
                        tempWordLine += syl;
                    } else {
                        lines.push(tempWordLine + "-");
                        tempWordLine = syl;
                    }
                }
                currentLine = tempWordLine;
            } else {
                currentLine = word;
            }
        }
    }
    if (currentLine !== "") {
        lines.push(currentLine);
    }
    return lines;
}

// Helper per intersezioni di segmenti e rettangoli
function lineIntersectSegment(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y) {
    let s1_x = p1x - p0x, s1_y = p1y - p0y;
    let s2_x = p3x - p2x, s2_y = p3y - p2y;
    let denom = (-s2_x * s1_y + s1_x * s2_y);
    if (denom === 0) return false;
    let s = (-s1_y * (p0x - p2x) + s1_x * (p0y - p2y)) / denom;
    let t = ( s2_x * (p0y - p2y) - s2_y * (p0x - p2x)) / denom;
    return (s >= 0 && s <= 1 && t >= 0 && t <= 1);
}

function segmentRectIntersect(x1, y1, x2, y2, rect) {
    if (x1 >= rect.left && x1 <= rect.right && y1 >= rect.top && y1 <= rect.bottom) return true;
    if (x2 >= rect.left && x2 <= rect.right && y2 >= rect.top && y2 <= rect.bottom) return true;
    if (lineIntersectSegment(x1, y1, x2, y2, rect.left, rect.top, rect.right, rect.top)) return true;
    if (lineIntersectSegment(x1, y1, x2, y2, rect.left, rect.bottom, rect.right, rect.bottom)) return true;
    if (lineIntersectSegment(x1, y1, x2, y2, rect.left, rect.top, rect.left, rect.bottom)) return true;
    if (lineIntersectSegment(x1, y1, x2, y2, rect.right, rect.top, rect.right, rect.bottom)) return true;
    return false;
}

function distToSegment(px, py, x1, y1, x2, y2) {
    const l2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
    if (l2 === 0) return Math.sqrt((px - x1) * (px - x1) + (py - y1) * (py - y1));
    let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
    t = Math.max(0, Math.min(1, t));
    const projX = x1 + t * (x2 - x1);
    const projY = y1 + t * (y2 - y1);
    return Math.sqrt((px - projX) * (px - projX) + (py - projY) * (py - projY));
}

// Costruzione sequenza di ricerca differenziata per vista verticale e orizzontale
const searchSequenceVerticalLeft = [];
const searchSequenceVerticalRight = [];
const searchSequenceHorizontalTop = [];
const searchSequenceHorizontalBottom = [];
const maxLevelVertical = 4;
const maxLevelHorizontal = 12; // Più livelli per la modalità orizzontale
const maxShiftVertical = 400;
const maxShiftHorizontal = 120; // Shift limitato per evitare linee troppo oblique
const shiftStep = 20;

// Sequenza Verticale
for (let level = 1; level <= maxLevelVertical; level++) {
    for (let shift = 0; shift <= maxShiftVertical; shift += shiftStep) {
        if (shift === 0) {
            searchSequenceVerticalLeft.push({ level, shift, dir: 1 });
            searchSequenceVerticalLeft.push({ level, shift, dir: 2 });
            searchSequenceVerticalRight.push({ level, shift, dir: 1 });
            searchSequenceVerticalRight.push({ level, shift, dir: 2 });
        } else {
            searchSequenceVerticalLeft.push({ level, shift, dir: 1 });
            searchSequenceVerticalLeft.push({ level, shift, dir: 2 });
            searchSequenceVerticalLeft.push({ level, shift: -shift, dir: 1 });
            searchSequenceVerticalLeft.push({ level, shift: -shift, dir: 2 });
            searchSequenceVerticalRight.push({ level, shift, dir: 1 });
            searchSequenceVerticalRight.push({ level, shift, dir: 2 });
            searchSequenceVerticalRight.push({ level, shift: -shift, dir: 1 });
            searchSequenceVerticalRight.push({ level, shift: -shift, dir: 2 });
        }
    }
}

searchSequenceVerticalLeft.sort((a, b) => {
    const dirPenA = a.dir === 1 ? 0 : 1000;
    const dirPenB = b.dir === 1 ? 0 : 1000;
    const penA = a.level * 40 + Math.abs(a.shift) * 2 + dirPenA;
    const penB = b.level * 40 + Math.abs(b.shift) * 2 + dirPenB;
    if (penA !== penB) return penA - penB;
    return a.dir - b.dir; // dir 1 (sinistra) preferito
});

searchSequenceVerticalRight.sort((a, b) => {
    const dirPenA = a.dir === 2 ? 0 : 1000;
    const dirPenB = b.dir === 2 ? 0 : 1000;
    const penA = a.level * 40 + Math.abs(a.shift) * 2 + dirPenA;
    const penB = b.level * 40 + Math.abs(b.shift) * 2 + dirPenB;
    if (penA !== penB) return penA - penB;
    return b.dir - a.dir; // dir 2 (destra) preferito
});

// Sequenza Orizzontale
for (let level = 1; level <= maxLevelHorizontal; level++) {
    for (let shift = 0; shift <= maxShiftHorizontal; shift += shiftStep) {
        if (shift === 0) {
            searchSequenceHorizontalTop.push({ level, shift, dir: 1 });
            searchSequenceHorizontalTop.push({ level, shift, dir: 2 });
            searchSequenceHorizontalBottom.push({ level, shift, dir: 1 });
            searchSequenceHorizontalBottom.push({ level, shift, dir: 2 });
        } else {
            searchSequenceHorizontalTop.push({ level, shift, dir: 1 });
            searchSequenceHorizontalTop.push({ level, shift, dir: 2 });
            searchSequenceHorizontalTop.push({ level, shift: -shift, dir: 1 });
            searchSequenceHorizontalTop.push({ level, shift: -shift, dir: 2 });
            searchSequenceHorizontalBottom.push({ level, shift, dir: 1 });
            searchSequenceHorizontalBottom.push({ level, shift, dir: 2 });
            searchSequenceHorizontalBottom.push({ level, shift: -shift, dir: 1 });
            searchSequenceHorizontalBottom.push({ level, shift: -shift, dir: 2 });
        }
    }
}

searchSequenceHorizontalTop.sort((a, b) => {
    const dirPenA = a.dir === 1 ? 0 : 1000;
    const dirPenB = b.dir === 1 ? 0 : 1000;
    const penA = a.level * 40 + Math.abs(a.shift) * 10 + dirPenA;
    const penB = b.level * 40 + Math.abs(b.shift) * 10 + dirPenB;
    if (penA !== penB) return penA - penB;
    return a.dir - b.dir; // dir 1 (sopra) preferito
});

searchSequenceHorizontalBottom.sort((a, b) => {
    const dirPenA = a.dir === 2 ? 0 : 1000;
    const dirPenB = b.dir === 2 ? 0 : 1000;
    const penA = a.level * 40 + Math.abs(a.shift) * 10 + dirPenA;
    const penB = b.level * 40 + Math.abs(b.shift) * 10 + dirPenB;
    if (penA !== penB) return penA - penB;
    return b.dir - a.dir; // dir 2 (sotto) preferito
});

// Resta tra un layout e l'altro: stessa etichetta, font e larghezza non vengono rimisurati.
let textMeasureCache = new Map();

function measureLabelText(textLabel, fontSize, unscaledMaxWidth, scale) {
    if (!textMeasureCache) {
        ctx.font = `bold ${fontSize}px Arial`;
        const lines = wrapText(ctx, textLabel, unscaledMaxWidth);
        let unscaledBoxWidth = 0;
        for (let i = 0; i < lines.length; i++) {
            const lw = ctx.measureText(lines[i]).width;
            if (lw > unscaledBoxWidth) unscaledBoxWidth = lw;
        }
        return { lines, boxWidth: unscaledBoxWidth * scale };
    }

    const key = fontSize + '\0' + scale + '\0' + unscaledMaxWidth + '\0' + textLabel;
    let entry = textMeasureCache.get(key);
    if (!entry) {
        ctx.font = `bold ${fontSize}px Arial`;
        const lines = wrapText(ctx, textLabel, unscaledMaxWidth);
        let unscaledBoxWidth = 0;
        for (let i = 0; i < lines.length; i++) {
            const lw = ctx.measureText(lines[i]).width;
            if (lw > unscaledBoxWidth) unscaledBoxWidth = lw;
        }
        entry = { lines, boxWidth: unscaledBoxWidth * scale };
        textMeasureCache.set(key, entry);
    }
    return entry;
}

function calculateLayout(pos, level, dir, shift, textLabel, labelDotSize, fontSize, scale, canvasCenterX, canvasCenterY, dynamicRightSpace = 50) {
    const gap = 8; // Spazio tra pallino finale e inizio del testo
    let offset;
    let maxWidth;
    
    if (isVertical) {
        if (dir === 1) { // Sinistra
            offset = - (level * 40 + 10);
            maxWidth = (canvasCenterX + offset) - labelDotSize - gap - 10;
        } else { // Destra
            offset = ((level - 1) * 40 + dynamicRightSpace + 10); // Spazio extra per etichette anni
            maxWidth = width - (canvasCenterX + offset) - labelDotSize - gap - 10;
        }
        if (maxWidth < 60) maxWidth = 60; // Larghezza minima vitale
    } else {
        if (dir === 1) { // Sopra
            offset = - (level * 40 + 10);
        } else { // Sotto
            offset = (level * 40 + 30);
        }
        maxWidth = 250;
    }
    
    const unscaledMaxWidth = maxWidth / scale;
    const measured = measureLabelText(textLabel, fontSize, unscaledMaxWidth, scale);
    const lines = measured.lines;
    const boxWidth = measured.boxWidth;
    const lineHeight = fontSize * 1.2 * scale;
    const boxHeight = lines.length * lineHeight;
    
    let lineX1, lineY1, lineX2, lineY2;
    let textRect = {};
    
    if (isVertical) {
        const eventX = canvasCenterX;
        const eventY = pos;
        const finalX = eventX + offset;
        const finalY = eventY + shift;
        
        lineX1 = eventX; lineY1 = eventY;
        lineX2 = finalX; lineY2 = finalY;
        
        let textRectX;
        if (dir === 1) { // Sinistra
            textRectX = finalX - labelDotSize - gap - boxWidth;
        } else { // Destra
            textRectX = finalX + labelDotSize + gap;
        }
        
        const bgY = finalY - boxHeight / 2;
        textRect = {
            left: textRectX,
            right: textRectX + boxWidth,
            top: bgY,
            bottom: bgY + boxHeight
        };
    } else {
        const eventX = pos;
        const eventY = canvasCenterY;
        const finalX = eventX + shift;
        const finalY = eventY + offset;
        
        lineX1 = eventX; lineY1 = eventY;
        lineX2 = finalX; lineY2 = finalY;
        
        const textStartX = finalX - boxWidth / 2;
        
        let bgY;
        if (dir === 1) { // Sopra
            bgY = finalY - labelDotSize - gap - boxHeight;
        } else { // Sotto
            bgY = finalY + labelDotSize + gap;
        }
        
        textRect = {
            left: textStartX,
            right: textStartX + boxWidth,
            top: bgY,
            bottom: bgY + boxHeight
        };
    }
    
    // Aggiungiamo un margine per mantenere gli elementi distanziati
    const margin = 5;
    textRect.left -= margin; textRect.right += margin;
    textRect.top -= margin; textRect.bottom += margin;
    
    return { offset, shift, dir, lines, boxWidth, boxHeight, lineHeight, gap, shapes: { lineX1, lineY1, lineX2, lineY2, textRect, labelDotX: lineX2, labelDotY: lineY2, labelDotSize } };
}

// Fasce lungo l'asse della timeline: due etichette che non si sovrappongono qui non possono collidere.
const COLLISION_BAND_PX = 128;
const COLLISION_AXIS_PAD = 32;
let collisionBands = null;
let collisionStamp = 0;

function axisSpan(shapes) {
    let min;
    let max;
    if (isVertical) {
        min = Math.min(shapes.lineY1, shapes.lineY2, shapes.textRect.top, shapes.textRect.bottom, shapes.labelDotY);
        max = Math.max(shapes.lineY1, shapes.lineY2, shapes.textRect.top, shapes.textRect.bottom, shapes.labelDotY);
    } else {
        min = Math.min(shapes.lineX1, shapes.lineX2, shapes.textRect.left, shapes.textRect.right, shapes.labelDotX);
        max = Math.max(shapes.lineX1, shapes.lineX2, shapes.textRect.left, shapes.textRect.right, shapes.labelDotX);
    }
    return { min, max };
}

function indexLayoutShape(shapes) {
    if (!collisionBands) return;
    const span = axisSpan(shapes);
    shapes._stamp = 0;
    const from = Math.floor(span.min / COLLISION_BAND_PX);
    const to = Math.floor(span.max / COLLISION_BAND_PX);
    for (let b = from; b <= to; b++) {
        let list = collisionBands.get(b);
        if (!list) {
            list = [];
            collisionBands.set(b, list);
        }
        list.push(shapes);
    }
}

function shapesCollide(shapes, oc) {
    if (rectIntersect(shapes.textRect, oc.textRect)) return true;

    if (segmentRectIntersect(shapes.lineX1, shapes.lineY1, shapes.lineX2, shapes.lineY2, oc.textRect)) return true;
    if (segmentRectIntersect(oc.lineX1, oc.lineY1, oc.lineX2, oc.lineY2, shapes.textRect)) return true;

    if (distToSegment(oc.labelDotX, oc.labelDotY, shapes.lineX1, shapes.lineY1, shapes.lineX2, shapes.lineY2) < oc.labelDotSize + 8) return true;
    if (distToSegment(shapes.labelDotX, shapes.labelDotY, oc.lineX1, oc.lineY1, oc.lineX2, oc.lineY2) < shapes.labelDotSize + 8) return true;

    const dx = shapes.labelDotX - oc.labelDotX;
    const dy = shapes.labelDotY - oc.labelDotY;
    if (Math.sqrt(dx * dx + dy * dy) < shapes.labelDotSize + oc.labelDotSize + 8) return true;

    const sameOrigin = (Math.abs(shapes.lineX1 - oc.lineX1) < 0.1 && Math.abs(shapes.lineY1 - oc.lineY1) < 0.1);
    if (!sameOrigin && lineIntersectSegment(shapes.lineX1, shapes.lineY1, shapes.lineX2, shapes.lineY2, oc.lineX1, oc.lineY1, oc.lineX2, oc.lineY2)) {
        return true;
    }
    return false;
}

function checkCollisionGlobal(shapes, shapesArray, uiHeight) {
    // Controllo fuori schermo ai lati.
    // Poiché calcoliamo con il centerYear attuale, i limiti di schermo orizzontali/verticali sono validi
    // e invarianti per il pan lungo l'asse principale.
    const collisionHeight = isKeyboardProbablyOpen ? maxSeenHeight : height;

    if (isVertical) {
        if (shapes.textRect.left < 0 || shapes.textRect.right > width) return true;
    } else {
        if (shapes.textRect.top < uiHeight - 10 || shapes.textRect.bottom > collisionHeight) return true;
    }

    if (collisionBands) {
        const span = axisSpan(shapes);
        const from = Math.floor((span.min - COLLISION_AXIS_PAD) / COLLISION_BAND_PX);
        const to = Math.floor((span.max + COLLISION_AXIS_PAD) / COLLISION_BAND_PX);
        collisionStamp++;
        for (let b = from; b <= to; b++) {
            const list = collisionBands.get(b);
            if (!list) continue;
            for (let i = 0; i < list.length; i++) {
                const oc = list[i];
                if (oc._stamp === collisionStamp) continue;
                oc._stamp = collisionStamp;
                if (shapesCollide(shapes, oc)) return true;
            }
        }
        return false;
    }

    for (let oc of shapesArray) {
        if (shapesCollide(shapes, oc)) return true;
    }
    return false;
}

function findValidLayoutGlobal(pos, textLabel, labelDotSize, fontSize, scale, shapesArray, canvasCenterX, canvasCenterY, uiHeight, dynamicRightSpace = 50, preferredDir = 1, searchLimit = null) {
    let sequence;
    if (isVertical) {
        sequence = preferredDir === 1 ? searchSequenceVerticalLeft : searchSequenceVerticalRight;
    } else {
        sequence = preferredDir === 1 ? searchSequenceHorizontalTop : searchSequenceHorizontalBottom;
    }
    for (let config of sequence) {
        if (searchLimit && (config.level > searchLimit.maxLevel || Math.abs(config.shift) > searchLimit.maxShift)) {
            continue;
        }
        const layout = calculateLayout(pos, config.level, config.dir, config.shift, textLabel, labelDotSize, fontSize, scale, canvasCenterX, canvasCenterY, dynamicRightSpace);
        if (!checkCollisionGlobal(layout.shapes, shapesArray, uiHeight)) {
            shapesArray.push(layout.shapes);
            indexLayoutShape(layout.shapes);
            return layout;
        }
    }
    return null; // Salta l'evento se troppo affollato
}

// --- PRE-CALCOLO PROPRIETÀ VISUALI EVENTI ---
let globalBestImp = Infinity;
let globalWorstImp = -Infinity;

function initEventProperties() {
    timelineData.forEach(e => {
        if (e.importance < globalBestImp) globalBestImp = e.importance;
        if (e.importance > globalWorstImp) globalWorstImp = e.importance;
    });

    timelineData.forEach(e => {
        let globalRatio = 1.0;
        if (globalWorstImp > globalBestImp) {
            globalRatio = 1.0 - ((e.importance - globalBestImp) / (globalWorstImp - globalBestImp));
        } else if (e.importance > globalBestImp) {
            globalRatio = 0.0;
        }
        globalRatio = Math.max(0.0, Math.min(1.0, globalRatio));
        
        e.baseDotSize = 3 + (globalRatio * 5);
        e.colorIntensity = 120 + (globalRatio * 135);
    });
}
// Chiamata immediata per pre-calcolare al caricamento
initEventProperties();

// Indice per anno: il dataset non cambia dopo il caricamento.
// La ricerca binaria sostituisce lo scan lineare sia nel layout sia nel disegno dei pallini.
let eventsByYear = timelineData.slice().sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return a.title.localeCompare(b.title);
});

function lowerBoundYear(year) {
    let lo = 0;
    let hi = eventsByYear.length;
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (eventsByYear[mid].year < year) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}

function upperBoundYear(year) {
    let lo = 0;
    let hi = eventsByYear.length;
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (eventsByYear[mid].year <= year) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}

function yearRangeBounds(start, end) {
    return { from: lowerBoundYear(start), to: upperBoundYear(end) };
}

function eventsInYearRange(start, end, categoryActive) {
    const bounds = yearRangeBounds(start, end);
    const result = [];
    for (let i = bounds.from; i < bounds.to; i++) {
        const e = eventsByYear[i];
        if (!categoryActive || categoryActive(e)) result.push(e);
    }
    return result;
}

// Margine di anni, oltre lo schermo, per cui si calcolano le etichette.
const LABEL_YEAR_MARGIN = 0.4;
// Impronta di un'etichetta lungo l'asse: in orizzontale il testo è largo, in verticale conta lo shift.
const LABEL_SLOT_PX_HORIZONTAL = 220;
const LABEL_SLOT_PX_VERTICAL = 100;
const SHORT_SEARCH_LIMIT = { maxLevel: 2, maxShift: 40 };
const SPARSE_SEARCH_LIMIT = { maxLevel: 2, maxShift: 0 };

function labelWindowBounds() {
    const dimension = isVertical ? height : width;
    if (!dimension || !pixelsPerYear) return null;
    const yearsVisible = dimension / pixelsPerYear;
    const buffer = yearsVisible * LABEL_YEAR_MARGIN;
    const start = centerYear - yearsVisible / 2 - buffer;
    const end = centerYear + yearsVisible / 2 + buffer;
    return yearRangeBounds(start, end);
}

function labelSlotPx() {
    return isVertical ? LABEL_SLOT_PX_VERTICAL : LABEL_SLOT_PX_HORIZONTAL;
}

let lastLayoutSnapshot = null;

function activeCategoriesKey() {
    return (activeCategories.politica ? '1' : '0')
        + (activeCategories.scienza ? '1' : '0')
        + (activeCategories.cultura ? '1' : '0')
        + (activeCategories.tecnologia ? '1' : '0')
        + (activeCategories.oggi ? '1' : '0');
}

function viewStillInsideLastLayout() {
    const snap = lastLayoutSnapshot;
    if (!snap) return false;
    if (snap.isVertical !== isVertical) return false;
    if (snap.width !== width || snap.height !== height) return false;
    if (snap.forcedEventId !== forcedEventId) return false;
    if (snap.searchResult !== searchResult) return false;
    if (snap.categoriesKey !== activeCategoriesKey()) return false;
    if (!pixelsPerYear || !snap.pixelsPerYear) return false;
    const zoomRatio = snap.pixelsPerYear / pixelsPerYear;
    if (zoomRatio < 0.999 || zoomRatio > 1.001) return false;

    const bounds = labelWindowBounds();
    if (!bounds) return false;
    return bounds.from === snap.eventFrom && bounds.to === snap.eventTo;
}

function shiftVisibleShapesForPan() {
    const snap = lastLayoutSnapshot;
    if (!snap || snap.centerYear === centerYear) return;
    const deltaPx = (snap.centerYear - centerYear) * pixelsPerYear;
    if (deltaPx === 0) return;

    eventStates.forEach(state => {
        const s = state.shapes;
        if (!s || !s.textRect) return;
        if (isVertical) {
            s.lineY1 += deltaPx;
            s.lineY2 += deltaPx;
            s.labelDotY += deltaPx;
            s.textRect.top += deltaPx;
            s.textRect.bottom += deltaPx;
        } else {
            s.lineX1 += deltaPx;
            s.lineX2 += deltaPx;
            s.labelDotX += deltaPx;
            s.textRect.left += deltaPx;
            s.textRect.right += deltaPx;
        }
    });
    snap.centerYear = centerYear;
}


// --- CALCOLO GLOBALE DEL LAYOUT ---
function getEffectiveImportance(e) {
    if (typeof searchResult !== 'undefined' && searchResult && searchResult.type === 'keyword' && searchResult.events && searchResult.events.includes(e)) {
        return 0;
    }
    return e.importance;
}

let globalLayoutShapes = [];

function computeGlobalLayout() {
    const uiContainer = document.getElementById('ui-container');
    const uiHeight = uiContainer ? uiContainer.offsetHeight + 10 : 60;
    const canvasCenterX = width / 2;
    const canvasCenterY = height / 2;

    const dimension = isVertical ? height : width;
    const yearsVisible = dimension / pixelsPerYear;
    
    // Le etichette si calcolano solo poco oltre lo schermo: i pallini restano su una fascia più larga in draw().
    const buffer = yearsVisible * LABEL_YEAR_MARGIN;
    const visibleStart = centerYear - yearsVisible / 2 - buffer;
    const visibleEnd = centerYear + yearsVisible / 2 + buffer;

    // --- CALCOLO SPAZIO DINAMICO PER ETICHETTE ANNI (Destra in verticale) ---
    let dynamicRightSpace = 50; // default
    if (isVertical) {
        ctx.save();
        ctx.font = '14px Arial'; // Stesso font usato per disegnare gli anni in draw()
        const getYearLabelWidth = (y) => {
            const roundedYear = Math.round(y);
            let label;
            if (roundedYear < 0) label = `${formatYearWithThousands(Math.abs(roundedYear))} a.C.`;
            else if (roundedYear === 0) label = "1 a.C.";
            else label = formatYearWithThousands(roundedYear);
            return ctx.measureText(label).width;
        };
        const w1 = getYearLabelWidth(visibleStart);
        const w2 = getYearLabelWidth(visibleEnd);
        let w3 = 0;
        if (visibleStart < 0 && visibleEnd > 0) {
            w3 = getYearLabelWidth(0);
        }
        const maxTextWidth = Math.max(w1, w2, w3);
        // labelX è canvasCenterX + 5, poi c'è il testo. Aggiungiamo 2px di padding.
        // Base = 5 (offset label) + 2 (padding) = 7
        dynamicRightSpace = 7 + maxTextWidth;
        ctx.restore();
    }

    // Selezioniamo SOLO gli eventi attivi e nel range (buffer) per evitare calcoli inutili
    const allActiveEventsInRange = eventsInYearRange(
        visibleStart,
        visibleEnd,
        e => activeCategories[e.category]
    );

    // La finestra è l'impronta di un'etichetta lungo l'asse, non il pallino.
    // A zoom ampio due testi non stanno nella stessa slot; a zoom stretto sì.
    let densityThreshold = 2;
    if (yearsVisible < 50) densityThreshold = 6;
    if (yearsVisible < 10) densityThreshold = 12;
    if (yearsVisible < 2) densityThreshold = 24;

    const windowSizePixels = labelSlotPx();
    const windowSize = windowSizePixels / pixelsPerYear;
    
    const buckets = new Map();
    allActiveEventsInRange.forEach(e => {
        const bucketIndex = Math.floor(e.year / windowSize);
        if (!buckets.has(bucketIndex)) {
            buckets.set(bucketIndex, []);
        }
        buckets.get(bucketIndex).push(e);
    });

    const globallyAllowedEvents = new Set();
    for (let cluster of buckets.values()) {
        if (cluster.length > densityThreshold) {
            cluster.sort((a, b) => {
                const aImp = getEffectiveImportance(a);
                const bImp = getEffectiveImportance(b);
                if (aImp !== bImp) return aImp - bImp;
                if (a.year !== b.year) return a.year - b.year;
                return a.title.localeCompare(b.title);
            });
            const top = cluster.slice(0, densityThreshold);
            top.forEach(e => globallyAllowedEvents.add(e));
        } else {
            cluster.forEach(e => globallyAllowedEvents.add(e));
        }
    }

    const currentYearNum = todayDecimalYear();
    const todayEvent = {
        year: currentYearNum,
        title: "Oggi",
        category: "oggi",
        importance: 1 
    };

    let eventsToCompute = allActiveEventsInRange.filter(e => globallyAllowedEvents.has(e) || (e.year + '_' + e.title === forcedEventId));
    
    if (activeCategories['oggi'] && currentYearNum >= visibleStart && currentYearNum <= visibleEnd) {
        eventsToCompute.push(todayEvent);
    }

    const screenStart = centerYear - yearsVisible / 2;
    const screenEnd = centerYear + yearsVisible / 2;

    let activeEventsOnScreenCount = 0;
    let onScreenBestImp = Infinity;
    
    allActiveEventsInRange.forEach(e => {
        const eImp = getEffectiveImportance(e);
        if (e.year >= screenStart && e.year <= screenEnd) {
            activeEventsOnScreenCount++;
            if (eImp < onScreenBestImp) {
                onScreenBestImp = eImp;
            }
        }
    });

    if (onScreenBestImp === Infinity) {
        onScreenBestImp = globalBestImp;
    }

    const importanceShift = onScreenBestImp - globalBestImp;

    let localBestImp = Infinity;
    let localWorstImp = -Infinity;
    eventsToCompute.forEach(e => {
        const eImp = getEffectiveImportance(e);
        const effImportance = Math.max(globalBestImp, eImp - importanceShift);
        if (effImportance < localBestImp) localBestImp = effImportance;
        if (effImportance > localWorstImp) localWorstImp = effImportance;
    });

    // Se non ci sono eventi nel viewport, ricadiamo nei limiti globali
    if (localBestImp === Infinity) {
        localBestImp = globalBestImp;
        localWorstImp = globalWorstImp;
    }

    // Ordine deterministico: Prima diamo priorità assoluta agli eventi attualmente sullo schermo!
    // Poi a parità di "a schermo", ordiniamo per importanza, ecc.

    eventsToCompute.sort((a, b) => {
        const aId = a.year + '_' + a.title;
        const bId = b.year + '_' + b.title;

        if (aId === forcedEventId) return -1;
        if (bId === forcedEventId) return 1;

        const aOnScreen = a.year >= screenStart && a.year <= screenEnd;
        const bOnScreen = b.year >= screenStart && b.year <= screenEnd;
        
        if (aOnScreen && !bOnScreen) return -1;
        if (!aOnScreen && bOnScreen) return 1;
        
        const aImp = getEffectiveImportance(a);
        const bImp = getEffectiveImportance(b);
        // Se sono entrambi a schermo o entrambi fuori, vince l'importanza
        if (aImp !== bImp) return aImp - bImp;
        if (a.year !== b.year) return a.year - b.year;
        return a.title.localeCompare(b.title);
    });

    // Quanti box ci stanno davvero lungo l'asse. Il filtro per finestre da 30 px
    // resta, ma non può più moltiplicare i candidati su tutta la fascia.
    const labelCandidateCap = Math.max(40, Math.floor((2 * dimension) / 36));
    if (eventsToCompute.length > labelCandidateCap) {
        eventsToCompute = eventsToCompute.slice(0, labelCandidateCap);
    }

    globalLayoutShapes = [];
    collisionBands = new Map();
    collisionStamp = 0;
    const baseFontSize = 18;
    ctx.font = `bold ${baseFontSize}px Arial`;

    // Nascondiamo tutto di base, mostreremo solo chi trova posto
    eventStates.forEach(state => state.isVisible = false);

    let nextPreferredDir = 1; // Iniziamo preferendo la sinistra/sopra (1)
    const saturatedBins = new Set();
    const searchedBins = new Set();
    const slotPx = labelSlotPx();
    const wideView = yearsVisible >= 50;

    eventsToCompute.forEach(e => {
        const eImp = getEffectiveImportance(e);
        const pos = isVertical ? 
            canvasCenterY + (e.year - centerYear) * pixelsPerYear :
            canvasCenterX + (e.year - centerYear) * pixelsPerYear;
        
        const effImportance = Math.max(globalBestImp, eImp - importanceShift);

        // Calcolo ratio globale assoluto
        let globalRatio = 1.0;
        if (globalWorstImp > globalBestImp) {
            globalRatio = 1.0 - ((effImportance - globalBestImp) / (globalWorstImp - globalBestImp));
        } else if (effImportance > globalBestImp) {
            globalRatio = 0.0;
        }
        globalRatio = Math.max(0.0, Math.min(1.0, globalRatio));

        // Calcolo ratio locale
        let localRatio = 1.0;
        if (localWorstImp > localBestImp) {
            localRatio = 1.0 - ((effImportance - localBestImp) / (localWorstImp - localBestImp));
        } else if (effImportance > localBestImp) {
            localRatio = 0.0;
        } else {
            // Se c'è solo un'importanza visibile e questo evento la matcha, prende 1.0
            localRatio = 1.0;
        }
        localRatio = Math.max(0.0, Math.min(1.0, localRatio));

        const eventId = e.year + '_' + e.title;

        // L'evento riceve un upgrade (locale) ma non può scendere sotto la sua importanza assoluta
        const ratio = Math.max(globalRatio, localRatio);
        
        const isForced = (eventId === forcedEventId);
        const finalRatio = isForced ? 1.0 : ratio;
        
        const targetScale = 0.5 + (finalRatio * 0.5); 
        const targetDotSize = 3 + (finalRatio * 5); 
        const targetColorIntensity = 120 + (finalRatio * 135); 
        let state = eventStates.get(eventId);
        if (!state) {
            state = { 
                event: e,
                currentOffset: null, 
                currentShift: null,
                currentScale: targetScale,
                currentDotSize: targetDotSize,
                currentColorIntensity: targetColorIntensity,
                targetOffset: 0,
                targetShift: 0,
                lines: [],
                boxHeight: 0,
                gap: 0,
                fontSize: 18,
                isVisible: false,
                lastDir: null
            };
            eventStates.set(eventId, state);
        }
        
        state.targetScale = targetScale;
        state.targetDotSize = targetDotSize;
        state.targetColorIntensity = targetColorIntensity;
        
        let displayYear = Math.floor(e.year);
        if (displayYear < 0) displayYear = `${formatYearWithThousands(Math.abs(displayYear))} a.C.`;
        else if (displayYear === 0) displayYear = "1 a.C.";
        else displayYear = formatYearWithThousands(displayYear);
        
        // Controlla se l'evento cliccato ha diritti a una data completa
        const isForcedAndHasFullDate = (eventId === forcedEventId) && (e.year > -5000) && hasThreeDecimals(e.year);
        
        let textLabel;
        if (e.category === 'oggi') {
            const oggi = new Date();
            const mesi = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
            const dataCompleta = `${oggi.getDate()} ${mesi[oggi.getMonth()]} ${oggi.getFullYear()}`;
            textLabel = `Oggi (${dataCompleta})`;
        } else if (Math.abs(e.year) >= 1000000) {
            textLabel = e.title;
        } else if (isForcedAndHasFullDate) {
            // Mostra la data completa se l'evento è cliccato e ha 3 decimali dopo il 5000 a.C.
            const fullDate = formatFullDate(e.year);
            textLabel = `${fullDate} - ${e.title}`;
        } else {
            textLabel = `${displayYear} - ${e.title}`;
        }
        const labelDotSize = Math.max(2, targetDotSize - 1);
        
        const preferredDir = state.lastDir !== null ? state.lastDir : nextPreferredDir;

        // Il primo evento del bin prova tutta la sequenza. A zoom ampio i successivi
        // provano solo le posizioni vicine; se falliscono, il tratto è saturo.
        const anchorBin = Math.floor(pos / slotPx);
        if (saturatedBins.has(anchorBin)) {
            state.isVisible = false;
            state.shapes = null;
            return;
        }

        const sparseScreen = activeEventsOnScreenCount <= 2;
        const shortSearch = !sparseScreen && wideView && searchedBins.has(anchorBin);
        searchedBins.add(anchorBin);
        const searchLimit = sparseScreen ? SPARSE_SEARCH_LIMIT : (shortSearch ? SHORT_SEARCH_LIMIT : null);

        let eventFontSize = baseFontSize;
        let layout = findValidLayoutGlobal(pos, textLabel, labelDotSize, eventFontSize, targetScale, globalLayoutShapes, canvasCenterX, canvasCenterY, uiHeight, dynamicRightSpace, preferredDir, searchLimit);
        
        // Con al massimo due eventi a schermo, un solo font più piccolo e le stesse poche posizioni.
        if (layout === null && sparseScreen && e.year >= screenStart && e.year <= screenEnd) {
            eventFontSize = 14;
            layout = findValidLayoutGlobal(pos, textLabel, labelDotSize, eventFontSize, targetScale, globalLayoutShapes, canvasCenterX, canvasCenterY, uiHeight, dynamicRightSpace, preferredDir, SPARSE_SEARCH_LIMIT);
        }
        
        if (layout !== null) {
            // Alterniamo la direzione preferita per il prossimo evento
            nextPreferredDir = layout.dir === 1 ? 2 : 1;
            
            state.lastDir = layout.dir;

            state.targetOffset = layout.offset;
            state.targetShift = layout.shift;
            state.lines = layout.lines;
            state.boxHeight = layout.boxHeight;
            state.gap = layout.gap;
            state.fontSize = eventFontSize;
            state.isVisible = true;
            state.shapes = layout.shapes; // Salva shapes per hit detection
            
            if (state.currentOffset === null) {
                state.currentOffset = layout.offset;
                state.currentShift = layout.shift;
            }
        } else {
            state.isVisible = false;
            state.shapes = null; // Pulisci shapes se non visibile
            saturatedBins.add(anchorBin);
        }
    });

    const placedBounds = yearRangeBounds(visibleStart, visibleEnd);
    lastLayoutSnapshot = {
        pixelsPerYear,
        isVertical,
        width,
        height,
        forcedEventId,
        searchResult,
        categoriesKey: activeCategoriesKey(),
        centerYear,
        rangeStart: visibleStart,
        rangeEnd: visibleEnd,
        eventFrom: placedBounds.from,
        eventTo: placedBounds.to
    };
    collisionBands = null;
    needsLayoutUpdate = false;
}

// Funzione principale di disegno
function draw() {
    if (needsLayoutUpdate) {
        // Stessi eventi nella fascia delle etichette: si spostano solo le shape già calcolate.
        if (viewStillInsideLastLayout()) {
            shiftVisibleShapesForPan();
            needsLayoutUpdate = false;
        } else {
            computeGlobalLayout();
            lastLayoutCenterYear = centerYear;
        }
    }

    ctx.clearRect(0, 0, width, height);
    
    const canvasCenterX = width / 2;
    const canvasCenterY = height / 2;
    
    // Calcolo range visibile
    const dimension = isVertical ? height : width;
    const yearsVisible = dimension / pixelsPerYear;
    const visibleStart = centerYear - yearsVisible / 2;
    const visibleEnd = centerYear + yearsVisible / 2;
    
    const currentYearNum = todayDecimalYear();
    const currentYearPos = isVertical ? 
        canvasCenterY + (currentYearNum - centerYear) * pixelsPerYear :
        canvasCenterX + (currentYearNum - centerYear) * pixelsPerYear;
    
    // Disegna Linea Base
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#444';
    
    // Linea del passato (continua)
    ctx.beginPath();
    ctx.setLineDash([]);
    if (isVertical) {
        ctx.moveTo(canvasCenterX, 0);
        ctx.lineTo(canvasCenterX, currentYearPos);
    } else {
        ctx.moveTo(0, canvasCenterY);
        ctx.lineTo(currentYearPos, canvasCenterY);
    }
    ctx.stroke();

    // Linea del futuro (tratteggiata)
    ctx.beginPath();
    ctx.setLineDash([10, 15]); // Tratteggio: 10px linea, 15px spazio
    if (isVertical) {
        ctx.moveTo(canvasCenterX, currentYearPos);
        ctx.lineTo(canvasCenterX, height);
    } else {
        ctx.moveTo(currentYearPos, canvasCenterY);
        ctx.lineTo(width, canvasCenterY);
    }
    ctx.stroke();
    ctx.setLineDash([]); // Ripristina per altri disegni

    // Disegna Highlight Ricerca (Data puntuale, Anno singolo, Intervallo, Keyword)
    if (typeof searchResult !== 'undefined' && searchResult !== null) {
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#FFE800'; // Giallo più acceso
        ctx.fillStyle = 'rgba(255, 232, 0, 0.15)'; // Giallo semitrasparente
        ctx.beginPath();
        
        if (searchResult.type === 'date' || searchResult.type === 'keyword') {
            const pointsToDraw = searchResult.type === 'keyword' ? searchResult.events.map(e => e.year) : [searchResult.point];
            
            ctx.lineWidth = 1.5; // Bordo sottile
            ctx.fillStyle = '#FFE800'; // Fill interno giallo
            
            pointsToDraw.forEach(pointYear => {
                const pointPos = isVertical ? 
                    canvasCenterY + (pointYear - centerYear) * pixelsPerYear :
                    canvasCenterX + (pointYear - centerYear) * pixelsPerYear;
                
                // Offset di animazione: movimento più lento e corto
                const t = performance.now() / 300; // Divisore più grande = più lento
                const bounceOffset = Math.sin(t) * 3; // Modulatore più piccolo = escursione minore (±3px)

                if (isVertical) {
                    const xBase = canvasCenterX;
                    const tipX = xBase - 12 + bounceOffset; // Punta più vicina alla timeline
                    
                    ctx.beginPath();
                    ctx.moveTo(tipX, pointPos); // Punta della freccia
                    ctx.lineTo(tipX - 12, pointPos - 10); // Angolo superiore punta
                    ctx.lineTo(tipX - 12, pointPos - 5); // Rientranza superiore asta
                    ctx.lineTo(tipX - 24, pointPos - 5); // Fine superiore asta (corta e cicciotta)
                    ctx.lineTo(tipX - 24, pointPos + 5); // Fine inferiore asta
                    ctx.lineTo(tipX - 12, pointPos + 5); // Rientranza inferiore asta
                    ctx.lineTo(tipX - 12, pointPos + 10); // Angolo inferiore punta
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                } else {
                    const yBase = canvasCenterY;
                    const tipY = yBase - 12 + bounceOffset; // Punta più vicina
                    
                    ctx.beginPath();
                    ctx.moveTo(pointPos, tipY); // Punta
                    ctx.lineTo(pointPos - 10, tipY - 12); // Angolo sinistro punta
                    ctx.lineTo(pointPos - 5, tipY - 12); // Rientranza sinistra asta
                    ctx.lineTo(pointPos - 5, tipY - 24); // Fine sinistra asta (corta e cicciotta)
                    ctx.lineTo(pointPos + 5, tipY - 24); // Fine destra asta
                    ctx.lineTo(pointPos + 5, tipY - 12); // Rientranza destra asta
                    ctx.lineTo(pointPos + 10, tipY - 12); // Angolo destro punta
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                }
            });
        } else {
            const yStart = isVertical ? 
                canvasCenterY + (searchResult.start - centerYear) * pixelsPerYear :
                canvasCenterX + (searchResult.start - centerYear) * pixelsPerYear;
                
            const yEnd = isVertical ? 
                canvasCenterY + (searchResult.end - centerYear) * pixelsPerYear :
                canvasCenterX + (searchResult.end - centerYear) * pixelsPerYear;
                
            if (isVertical) {
                // Sfondo semitrasparente che copre tutto l'intervallo
                ctx.fillRect(0, yStart, width, yEnd - yStart);
            } else {
                const xStart = yStart;
                const xEnd = yEnd;
                // Sfondo
                ctx.fillRect(xStart, 0, xEnd - xStart, height);
            }
        }
    }
    
    // Determina intervallo dei marker principali in base allo zoom in modo dinamico
    const minPixelsBetweenMarkers = 120; // Almeno 120px di distanza
    const targetYearsStep = minPixelsBetweenMarkers / pixelsPerYear;
    
    const magnitude = Math.pow(10, Math.floor(Math.log10(targetYearsStep)));
    const normalized = targetYearsStep / magnitude;
    
    let step;
    let isSubYear = false;
    
    if (targetYearsStep < 1) {
        // Se lo step target è inferiore a un anno, usiamo step frazionari (mesi/trimestri)
        isSubYear = true;
        if (targetYearsStep <= 1/12) step = 1/12;       // Mesi
        else if (targetYearsStep <= 0.25) step = 0.25;  // Trimestri
        else if (targetYearsStep <= 0.5) step = 0.5;    // Semestri
        else step = 1;
    } else {
        if (normalized <= 1) step = 1 * magnitude;
        else if (normalized <= 2) step = 2 * magnitude;
        else if (normalized <= 5) step = 5 * magnitude;
        else step = 10 * magnitude;
        step = Math.max(1, step); // Risoluzione principale ad anni interi
    }
    
    // Assicuriamoci che i marker partano da un multiplo corretto
    // Per i mesi usiamo una base di moltiplicazione sicura per evitare errori di precisione
    const firstMarker = Math.floor(visibleStart / step) * step;
    const lastMarker = Math.ceil(visibleEnd / step) * step;
    
    ctx.font = '14px Arial';
    ctx.fillStyle = '#aaa';
    
    // Disegna i marker
    // Per evitare cicli infiniti a causa dei float
    const epsilon = 0.0001; 
    for (let y = firstMarker; y <= lastMarker + epsilon; y += step) {
        // Controllo se è un anno intero (entro margine di errore float)
        const isWholeYear = Math.abs(y - Math.round(y)) < epsilon;
        
        const pos = isVertical ? 
            canvasCenterY + (y - centerYear) * pixelsPerYear : 
            canvasCenterX + (y - centerYear) * pixelsPerYear;
        
        ctx.beginPath();
        ctx.strokeStyle = isWholeYear ? '#666' : '#444';
        ctx.lineWidth = isWholeYear ? 2 : 1;
        
        const tickLength = isWholeYear ? 10 : 5;
        
        if (isVertical) {
            ctx.moveTo(canvasCenterX - tickLength, pos);
            ctx.lineTo(canvasCenterX + tickLength, pos);
        } else {
            ctx.moveTo(pos, canvasCenterY - tickLength);
            ctx.lineTo(pos, canvasCenterY + tickLength);
        }
        ctx.stroke();
        
        // Disegna l'etichetta solo se è un anno intero
        if (isWholeYear) {
            const roundedYear = Math.round(y);
            let yearLabel;
            if (roundedYear < 0) {
                yearLabel = `${formatYearWithThousands(Math.abs(roundedYear))} a.C.`;
            } else if (roundedYear === 0) {
                yearLabel = "1 a.C.";
            } else {
                yearLabel = formatYearWithThousands(roundedYear);
            }
            
            if (isVertical) {
                ctx.textAlign = 'left';
                ctx.textBaseline = 'middle';
                const labelX = canvasCenterX + 5;
                ctx.fillText(yearLabel, labelX, pos);
            } else {
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                const labelY = canvasCenterY + 15;
                ctx.fillText(yearLabel, pos, labelY);
            }
            // (I marker anno non vengono più inseriti in occupiedShapes per semplificare il layout globale)
        }
    }

    // Consideriamo l'utente "in interazione" se c'è tocco o c'è una velocità significativa
    // (L'ombra è pesante, la disattiviamo mentre si muove per i 60fps lisci)
    const isInteracting = isDragging || isPinching || motionIsEvident() || isZoomingWithWheel || isButtonAnimating || performance.now() < buttonGhostingUntil;
    
    // Animazione dell'effetto fantasma
    let targetAlpha = 1.0;
    if (isInteracting) {
        // Oscilla tra 0.1 e 0.6 usando il tempo
        const time = performance.now() / 200; // Regola la velocità di pulsazione
        targetAlpha = 0.35 + Math.sin(time) * 0.25;
    }
    
    if (typeof window.labelsAlpha === 'undefined') window.labelsAlpha = 1.0;
    
    // Interpolazione più veloce per seguire la pulsazione o normale se non sta interagendo
    const lerpSpeed = isInteracting ? 0.5 : 0.15;
    window.labelsAlpha += (targetAlpha - window.labelsAlpha) * lerpSpeed;


    // Rendering degli eventi memorizzati in eventStates
    // Renderizziamo SOLO ciò che è strettamente vicino allo schermo (margine 20%) per massimizzare gli FPS.
    // Le etichette sono già state calcolate su una fascia più stretta; qui passiamo al canvas
    // solo i nodi attualmente nel campo visivo.
    const renderYearBuffer = yearsVisible * 0.2;
    const baseFontSize = 18;
    ctx.font = `bold ${baseFontSize}px Arial`;
    // ATTENZIONE: Questo blocco è stato spostato in modo da disegnare i pallini sopra le linee di collegamento
    // --- DISEGNO PALLINI DI SFONDO (Sempre visibili se la categoria è attiva) ---
    // Renderizziamo solo i pallini che cadono nello schermo (più un piccolo margine)
    const bgRenderBuffer = yearsVisible * 0.5;
    const bgVisibleStart = centerYear - yearsVisible / 2 - bgRenderBuffer;
    const bgVisibleEnd = centerYear + yearsVisible / 2 + bgRenderBuffer;

    const todayYear = todayDecimalYear();
    const todayBgEvent = {
        year: todayYear,
        title: "Oggi",
        category: "oggi",
        importance: 1,
        baseDotSize: 8
    };

    const backgroundDots = eventsInYearRange(
        bgVisibleStart,
        bgVisibleEnd,
        e => activeCategories[e.category]
    );
    if (activeCategories['oggi'] && todayYear >= bgVisibleStart && todayYear <= bgVisibleEnd) {
        backgroundDots.push(todayBgEvent);
    }

    backgroundDots.forEach(e => {
        if (!activeCategories[e.category]) return;
        if (e.year < bgVisibleStart || e.year > bgVisibleEnd) return;

        const pos = isVertical ? 
            canvasCenterY + (e.year - centerYear) * pixelsPerYear :
            canvasCenterX + (e.year - centerYear) * pixelsPerYear;

        const eventId = e.year + '_' + e.title;
        const state = eventStates.get(eventId);
        const hasLabel = state && state.isVisible;

        // Se ha l'etichetta, usiamo la sua dimensione corrente (che è animata)
        // Se NON ha l'etichetta (è stato scartato), usiamo la dimensione base ulteriormente ridotta.
        let dotSize = hasLabel ? state.currentDotSize : (e.baseDotSize * 0.6);
        const color = colors[e.category] || '#fff';

        const eventX = isVertical ? canvasCenterX : pos;
        const eventY = isVertical ? pos : canvasCenterY;

        // I pallini ora sono cerchi vuoti (solo outline colorata) se hanno la label
        ctx.globalAlpha = 0.75 * window.labelsAlpha;
        ctx.beginPath();
        ctx.arc(eventX, eventY, Math.max(0, dotSize), 0, Math.PI * 2);
        
        if (!hasLabel) {
            // Se NON ha l'etichetta, lo riempiamo (pallino pieno più piccolo) e togliamo o cambiamo lo stroke
            ctx.fillStyle = color;
            ctx.fill();
        } else {
            // Se ha l'etichetta, usiamo il cerchio vuoto con outline
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Pallino piccolo centrale per indicare la posizione precisa (dimensione fissa)
            ctx.beginPath();
            ctx.arc(eventX, eventY, 2, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
        }
    });
    
    eventStates.forEach(state => {
        if (!state.isVisible) return;
        
        const e = state.event;
        // Culling per le performance
        if (e.year < visibleStart - renderYearBuffer || e.year > visibleEnd + renderYearBuffer) return;
        if (!activeCategories[e.category]) return;

        const pos = isVertical ? 
            canvasCenterY + (e.year - centerYear) * pixelsPerYear :
            canvasCenterX + (e.year - centerYear) * pixelsPerYear;
        
        ctx.globalAlpha = window.labelsAlpha;
        
        // Animazione fluida
        state.currentScale += (state.targetScale - state.currentScale) * 0.15;
        state.currentDotSize += (state.targetDotSize - state.currentDotSize) * 0.15;
        state.currentColorIntensity += (state.targetColorIntensity - state.currentColorIntensity) * 0.15;
        state.currentOffset += (state.targetOffset - state.currentOffset) * 0.15;
        state.currentShift += (state.targetShift - state.currentShift) * 0.15;
        
        const drawScale = state.currentScale;
        const drawDotSize = state.currentDotSize;
        const drawColorIntensity = state.currentColorIntensity;
        const drawOffset = state.currentOffset;
        const drawShift = state.currentShift;
        const color = colors[e.category] || '#fff';
        
        const labelDotSize = Math.max(2, drawDotSize - 1);
        
        const { lines, boxHeight, gap } = state;
        
        if (isVertical) {
            const eventX = canvasCenterX;
            const eventY = pos;
            
            let finalX = eventX + drawOffset;
            let finalY = eventY + drawShift;
            
            // Calcola il punto di partenza della linea dal bordo del cerchio
            const dx = finalX - eventX;
            const dy = finalY - eventY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            let startX = eventX;
            let startY = eventY;
            if (dist > drawDotSize) {
                startX += (dx / dist) * drawDotSize;
                startY += (dy / dist) * drawDotSize;
            } else {
                startX = finalX;
                startY = finalY;
            }
            
            // Linea
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(finalX, finalY);
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.stroke();
            
            
            // Pallino fine linea
            ctx.beginPath();
            ctx.arc(finalX, finalY, Math.max(0, labelDotSize), 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            
            // Testo
            const bgY = finalY - boxHeight / 2;
            
            if (state.targetOffset < 0) { // Testo a sinistra
                finalX -= (labelDotSize + gap);
            } else { // Testo a destra
                finalX += (labelDotSize + gap);
            }
            
            const eventFontSize = state.fontSize || baseFontSize;
            const unscaledLineHeight = eventFontSize * 1.2;
            
            ctx.save();
            ctx.translate(finalX, bgY);
            ctx.scale(drawScale, drawScale);
            
            ctx.font = `bold ${eventFontSize}px Arial`;
            ctx.fillStyle = `rgb(${drawColorIntensity}, ${drawColorIntensity}, ${drawColorIntensity})`;
            ctx.textBaseline = 'top';
            ctx.textAlign = state.targetOffset < 0 ? 'right' : 'left';
            
            if (!isInteracting) {
                ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
                ctx.shadowBlur = 5;
                ctx.shadowOffsetX = 1;
                ctx.shadowOffsetY = 1;
            }
            
            lines.forEach((line, i) => {
                ctx.fillText(line, 0, i * unscaledLineHeight);
            });
            
            ctx.restore();
            
        } else {
            const eventX = pos;
            const eventY = canvasCenterY;
            
            let finalX = eventX + drawShift;
            let finalY = eventY + drawOffset;
            
            // Calcola il punto di partenza della linea dal bordo del cerchio
            const dx = finalX - eventX;
            const dy = finalY - eventY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            let startX = eventX;
            let startY = eventY;
            if (dist > drawDotSize) {
                startX += (dx / dist) * drawDotSize;
                startY += (dy / dist) * drawDotSize;
            } else {
                startX = finalX;
                startY = finalY;
            }
            
            // Linea
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(finalX, finalY);
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.stroke();
            
            
            // Pallino fine linea
            ctx.beginPath();
            ctx.arc(finalX, finalY, Math.max(0, labelDotSize), 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            
            // Testo
            let bgY;
            if (state.targetOffset < 0) { // Testo sopra
                bgY = finalY - labelDotSize - gap - boxHeight;
            } else { // Testo sotto
                bgY = finalY + labelDotSize + gap;
            }
            const textCenterX = finalX;
            
            const eventFontSize = state.fontSize || baseFontSize;
            const unscaledLineHeight = eventFontSize * 1.2;
            
            ctx.save();
            ctx.translate(textCenterX, bgY);
            ctx.scale(drawScale, drawScale);
            
            ctx.font = `bold ${eventFontSize}px Arial`;
            ctx.fillStyle = `rgb(${drawColorIntensity}, ${drawColorIntensity}, ${drawColorIntensity})`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            
            if (!isInteracting) {
                ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
                ctx.shadowBlur = 5;
                ctx.shadowOffsetX = 1;
                ctx.shadowOffsetY = 1;
            }
            
            lines.forEach((line, i) => {
                ctx.fillText(line, 0, i * unscaledLineHeight);
            });
            
            ctx.restore();
        }
    });
    
    ctx.globalAlpha = 1.0; // Ripristino globalAlpha per i prossimi frame
}

let lastFrameTime = performance.now();

function animate(time) {
    let dt = time - lastFrameTime;
    lastFrameTime = time;
    
    // Sicurezza: Se per qualche motivo il frame ha impiegato tantissimo a renderizzare (es. lag del browser o cambio tab),
    // capiamo il dt a max 32ms (circa 2 frame a 60fps). 
    // Questo previene che un lag improvviso spari centerYear migliaia di anni nel futuro basandosi sulla velocità attuale.
    if (dt > 32) dt = 32;

    // Gestione dell'inerzia. La soglia è in pixel a frame, così non dipende dallo zoom.
    if (!isDragging && !isPinching && !inertiaHasStopped()) {
        centerYear += velocity * dt;
        clampCenterYear();
        
        // Durante il movimento (per trascinamento o per inerzia) il layout è congelato.
        
        // Frizione: 0.92 per un arresto fluido, lasciando scorrere la timeline più a lungo
        const frictionFactor = Math.pow(0.92, dt / FRAME_MS);
        velocity *= frictionFactor; 
        
        // Quando il movimento scende sotto un pixel a frame, scatta il ricalcolo del layout
        if (inertiaHasStopped()) {
            velocity = 0;
            needsLayoutUpdate = true; 
        }
    }
    
    // Gestione animazione bottoni
    if (isButtonAnimating) {
        const lerpSpeed = 1.0 - Math.pow(0.85, dt / 16.666);
        
        const diffZoom = targetPixelsPerYear - pixelsPerYear;
        const diffCenter = targetCenterYear - centerYear;
        
        // Se siamo molto vicini al target, fermiamo l'animazione
        if (Math.abs(diffZoom) < 0.001 && Math.abs(diffCenter) < 0.001) {
            pixelsPerYear = targetPixelsPerYear;
            centerYear = targetCenterYear;
            clampCenterYear();
            isButtonAnimating = false;
            needsLayoutUpdate = true;
        } else {
            pixelsPerYear += diffZoom * lerpSpeed;
            centerYear += diffCenter * lerpSpeed;
            clampCenterYear();
        }
    }

    draw();
    requestAnimationFrame(animate);
}

// Inizializzazione
resize();
requestAnimationFrame(animate);

