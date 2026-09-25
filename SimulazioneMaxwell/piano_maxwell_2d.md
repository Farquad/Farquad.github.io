# Piano: doppia fisica 3D / Maxwell 2D

Revisione del piano `dual_physics_modes`, con la formulazione matematica completa, la
correzione di due errori di formula, e uno schema numerico dimensionato per girare su un
PC medio.

Tutto avviene in `index.html`. Nessuna dipendenza nuova, nessun file nuovo a runtime.

---

## 1. Obiettivo

Un selettore **3D section** / **2D Maxwell** nella card *Dynamics*.

| | statico | elettrodinamico |
|---|---|---|
| **3D** (default, comportamento attuale) | Coulomb `1/R²` | Liénard–Wiechert, un solo `t_rit` |
| **2D** | Coulomb `1/R`, `φ = −K₂q ln(R/R₀)` | Green 2D, integrale sulla storia |

Il moto delle cariche (oscillazioni analitiche, Velocity Verlet del drag, tetto a 0.9 c),
il buffer `history`, `interpolateCubicHermite` e `getRetardedState` **si riusano invariati**
(salvo il punto 4.1). Cambia solo come da quella storia si ricava `(E, φ)`.

### Interpretazione fisica da mettere in chiaro

Una carica puntiforme in 2+1 dimensioni **è un filo rettilineo infinito perpendicolare
allo schermo**. Questo spiega gratis tutto il resto: il `ln R` del potenziale, la sua
divergenza infrarossa (il potenziale di un filo infinito non si annulla all'infinito:
serve un raggio di riferimento), la radiazione che decade come `1/√R` invece di `1/R`,
e il fatto che il flusso di Gauss resti nel foglio. È la frase che rende la modalità 2D
comprensibile a chi guarda, e va in `concezione_fisica.txt`.

---

## 2. Formulazione matematica

### 2.1 Potenziali ritardati 2D

Green ritardato del d'Alembertiano in 2+1 dimensioni:

```
G(R, τ) = (c / 2π) · Θ(cτ − R) / √(c²τ² − R²)
```

Ogni evento **dentro** il cerchio di luce contribuisce, non solo il bordo: è il fallimento
del principio di Huygens in dimensione pari, ed è la scia che vogliamo vedere.

Con `τ = t − t'`, `R(t') = |r − r_q(t')|`, definisco

```
σ(t') = √( c²τ² − R(t')² )        σ(t_rit) = 0,  σ > 0 dentro il cono
```

e adotto la normalizzazione (il fattore `c` è scelto per far tornare il limite statico
esattamente a `E = K₂ q n̂ / R`):

```
φ(r,t) = K₂ q c   ∫_{−∞}^{t_rit} dt' / σ
A(r,t) = (K₂ q/c) ∫_{−∞}^{t_rit} dt' v(t') / σ
E      = −∇φ − ∂A/∂t
```

### 2.2 Il kernel di E — la parte che mancava

Il piano precedente si fermava a `E = −∇φ − ∂A/∂t` e proponeva "termine di cono + coda
con sottrazione del moto rettilineo". **Non serve.** L'integrale si regolarizza da solo
con un'integrazione per parti, e il risultato è molto più semplice.

Definizioni (tutte valutate a `t'`, tutte già disponibili da `getRetardedState`):

```
R(t') = r − r_q(t')            vettore sorgente→campo
P(t') = τ v(t') − R(t')
u(t') = c²τ − R(t')·v(t')
```

Due identità che fanno funzionare tutto:

```
dP/dt' = τ a(t')                    (P è costante se a = 0)
dσ/dt' = −u/σ,   con u > 0 ovunque dentro il cono  ⟹ σ è monotòna
```

Derivando sotto il segno di integrale si ottengono due termini di bordo divergenti come
`1/σ_rit` (quello di Leibniz su `t_rit`, e quello dell'integrale `∫P/σ³`). Integrando per
parti `∫ P/σ³ dt' = ∫ (P/u)·(u/σ³) dt'` e usando `d(1/σ)/dt' = u/σ³`, i due termini di
bordo **si cancellano esattamente**. Resta:

```
        E(r,t) = − K₂ q c  ∫_{−∞}^{t_rit}  F(t') · dt'/σ

        F(t') =  τ a / u  +  P · (c² − v² + R·a) / u²
```

Proprietà di questo kernel, tutte verificate:

- `F` è **regolare** ovunque, incluso `t' = t_rit` (lì `u = cτ_rit(c − n̂·v) > 0`).
  L'unica singolarità residua è il `1/σ` integrabile, che il cambio di variabile del §3.1
  elimina del tutto.
- **Nessun termine di bordo, nessuna sottrazione, nessun cutoff `δ`.** Sparisce quindi
  anche il rischio di cancellazione catastrofica: non si sottraggono mai due numeri grandi.
- Limite statico (`v = a = 0`): l'integrale si fa in forma chiusa e dà `E = K₂ q n̂ / R`. ✔
- Limite moto uniforme (`a = 0`): dà la formula di Heaviside 2D del §2.3. ✔

Per il potenziale, stesso integrale con integrando `1`:

```
        φ(r,t) = K₂ q c  ∫_{−∞}^{t_rit} dt'/σ
```

cioè **gli stessi pesi di quadratura servono sia a E che a φ**. Un solo ciclo, due uscite.

### 2.3 Correzione di formula: il campo di moto uniforme

Il piano precedente scriveva

```
E_cono = K₂ q (1 − β²) (n̂ − β) / [ R (1 − n̂·β)² ]        ← SBAGLIATO
```

L'esponente di `(1 − β²)` è preso dal caso 3D. Per la linea di carica è diverso. Due
derivazioni indipendenti concordano:

*Boost.* Nel riferimento proprio `E' = 2kλ ρ̂'/ρ'`; il boost è ⊥ alla linea quindi
`λ = λ'`; con `E_⊥ = γE'_⊥` e `ρ'² = γ²ρ²(1 − β²sin²θ)` si ottiene
`E = 2kλ ρ̂ / [γ ρ (1 − β²sin²θ)]`. Usando `ρ²(1−β²sin²θ) = R²(1−n̂·β)²` e
`ρ = R(n̂−β)` si passa alla forma ritardata.

*Integrale.* Ponendo `a = 0` nel kernel del §2.2, `P` è costante e l'integrale si riduce a
`∫₀^∞ dσ/u³ = γ/(c u_rit²)`, che dà lo stesso risultato.

```
        E_uniforme = K₂ q √(1 − β²) (n̂ − β) / [ R (1 − n̂·β)² ]
```

`√(1 − β²) = 1/γ`, non `1/γ²`. (Confronto: in 3D è `(1−β²)(n̂−β)/[R²(1−n̂·β)³]`.)

Questa formula **non** è più il "termine di cono" dello schema vecchio: serve come
(a) fallback statico / storia corta, (b) near field per `R` piccolo (§3.4),
(c) riferimento di validazione del kernel integrale.

### 2.4 Pre-storia in forma chiusa — niente artefatto di troncamento

L'integrale va a `t' = −∞`, ma il buffer comincia a `t₀`. Il piano precedente diceva
"tenere la storia lunga" e insieme "non serve un buffer nuovo": è contraddittorio, e con
`maxHistory = worldDiag/cSpeed` (riga 1912) il troncamento cade **esattamente al bordo
dello schermo**, lasciando un anello con gradiente discontinuo a `R = cT`.

Soluzione esatta e gratuita: spezzare l'integrale e risolvere analiticamente il pezzo
antecedente al buffer, assumendo che la carica fosse **ferma in `p₀ = history[0]`** per
`t' < t₀` (che è anche la condizione iniziale vera: le cariche nascono ferme).

Con `R₀ = r − p₀`, `τ₀ = t − t₀`, `ξ = R₀/(c τ₀)`  (richiede `ξ < 1`, cioè `t₀` dentro il
cono passato — altrimenti il buffer non serve affatto e si usa il fallback statico):

```
E_pre = K₂ q · (R̂₀ / R₀) · ( 1 − √(1 − ξ²) )

V_pre = K₂ q · ( ln(L₀ / R₀) − arccosh(1/ξ) )
```

Verifiche:

- Buffer lunghissimo (`ξ → 0`): `E_pre → 0`, `V_pre → cost.` indipendente da `r`. ✔
- Buffer al minimo (`ξ → 1`): `E_pre →` campo statico completo, quadratura vuota. ✔
- **Carica ferma, buffer qualsiasi**: quadratura + pre-storia `= K₂ q n̂/R` e
  `V = K₂ q ln(L₀/R)` **esattamente**, per ogni lunghezza di buffer.

Quest'ultima è la proprietà che conta: il risultato è **indipendente dalla lunghezza della
storia**. Niente anello, niente flicker quando il buffer si riempie, niente salto quando
`maxHistory` cambia con lo zoom o con lo slider `c`.

### 2.5 Divergenza infrarossa del potenziale

In 2D `φ ~ ln` diverge: è fisico (filo infinito), non un bug. La costante additiva è
assorbita in `L₀`, una lunghezza di schermo fissa (es. 400 px), **non** la media spaziale
del frame — quella sfarfallerebbe a ogni fotogramma — e **non** `2cT` con `T` derivato dal
buffer, perché `T` dipende da zoom e `cSpeed` e farebbe traslare tutti i potenziali quando
l'utente zooma. Con `L₀` costante la mappa è stabile e vale `V = −K₂q ln(R/L₀)` a riposo.

---

## 3. Schema numerico

### 3.1 Quadratura composita

Variabile `s = t_rit − t'` (età dell'evento rispetto al cono), orizzonte `S = t_rit − t₀`.

**Regione vicina al cono** — `s ∈ [0, s₁]` con `s₁ ≈ 4` frame. Sostituzione `s = w²`:

```
∫₀^{s₁} g(s) ds/σ  =  ∫₀^{√s₁} g(w²) · (2w/σ) dw
```

Poiché `σ² ≈ 2 u_rit · s` vicino al cono, si ha `2w/σ → √(2/u_rit)`: **finito**. La
singolarità sparisce analiticamente, non viene aggirata. 8 nodi uniformi in `w`, Simpson.

Questa sostituzione è quella giusta proprio perché `σ` è monotòna in `t'` (§2.2): non
ci sono ambiguità di inversione.

**Regione lontana** — `s ∈ [s₁, S]`, nodi **uniformi in `s`** (non logaritmici).
Il motivo è importante: nella coda lontana l'integrando tende a `a(t')/(c³s)`, quindi
con spaziatura logaritmica ogni nodo contribuisce con un peso costante `∝ a(t'_k)` e,
per una carica oscillante campionata a fasi arbitrarie, si ottiene rumore invece che la
media (che è il valore vero, soppresso da `1/(ωs)`). Serve spaziatura uniforme che
risolva il periodo.

Le oscillazioni sono analitiche e note (riga 1809, `omega = sliderVal/100 · c/A`), quindi
il passo si può dimensionare esattamente:

```
Δs = min over charges of ( 2π/omega ) / 4      ; se nessuna oscillazione: S/16
N_far = clamp( ceil((S − s₁)/Δs), 12, 24 )
```

**Budget totale: 8 + 12..24 ≈ 20–32 nodi per carica per campione.**

Limite noto da documentare: ad ampiezza molto piccola e frequenza massima il periodo
scende a ~10 frame e il cap di 24 nodi sottocampiona la coda, producendo un lieve rumore.
Accettabile; se dà fastidio, orizzonte adattivo `S = min(buffer, 6 periodi)`, dato che
oltre qualche periodo la coda oscillante si media comunque a zero.

### 3.2 Cosa si calcola in un solo passaggio

Per ogni carica e ogni punto campione, un solo ciclo sui nodi accumula:

- `φ`: somma dei pesi `(2w/σ)` / `(Δs/σ)` — integrando `1`
- `E`: stessi pesi × `F(t')`

Il costo marginale di `φ` sopra `E` è quasi nullo. Ogni nodo richiede una
`interpolateCubicHermite` sulla storia più una `sqrt`.

### 3.3 `t_rit` va trovato meglio

`getRetardedState` (riga 1186) usa **3 iterazioni di punto fisso**. Il fattore di
contrazione è `≈ β`: a 0.9 c tre iterazioni riducono l'errore solo di `0.9³ ≈ 0.73`.
In 3D produce un campo leggermente sbagliato e passa inosservato. In 2D `t_rit` è il
**limite di integrazione** e `s₁` si misura da lì: un errore su `t_rit` sposta il cono e
si amplifica.

Sostituire con **Newton** su `f(t') = c(t − t') − R(t')`, che ha derivata nota:

```
f'(t') = −c + n̂·v(t')      ⟹   t'_{k+1} = t'_k − f/f' = t'_k + f/(c − n̂·v)
```

Convergenza quadratica, stesso costo per iterazione, 3 iterazioni bastano a qualunque `β`.
Miglioramento gratuito anche per il modo 3D.

### 3.4 Near field e fallback

- `R < R_near` (≈ 40 px): usare solo la forma chiusa del §2.3. Lì il campo `~1/R` domina
  e la coda è trascurabile. Risparmia lavoro e, soprattutto, mantiene accurato il
  tracciamento delle linee vicino alle cariche (dove la cache del §4.2 è troppo grossa).
- `R < 10`: mantenere il cutoff a zero già presente (riga 1230).
- `simMode === 'static'`, oppure `history.length < 4`, oppure `ξ ≥ 1`: forma chiusa
  statica `E = K₂q n̂/R`, `V = −K₂q ln(R/L₀)`. Grazie al §2.4 il passaggio
  fallback → quadratura è continuo, quindi niente flicker alla creazione della carica.

---

## 4. Architettura del codice

### 4.1 Stato e dispatcher

```
let physicsSpace = '3d';                     // '3d' | '2d'
const R_REF_2D = 90;                         // px
const K2 = K / R_REF_2D;                     // = 20000/90 ≈ 222
const L0_2D = 400;                           // px, riferimento IR del potenziale
const VOLTAGE_SCALE_2D = ...;                // taratura, vedi §5
```

- Rinominare l'attuale `getFieldContributionFromCharge` → `getFieldContribution3D` e
  il corpo di `getPotentialAt` → `getPotential3D`.
- Nuove `getFieldContribution2D(c, x, y)` e `getPotential2D(c, x, y)`; meglio ancora una
  sola `getChargeFieldAndPotential2D` che restituisce `{Ex, Ey, V}` dallo stesso ciclo (§3.2).
- `getFieldContributionFromCharge` / `getPotentialAt` diventano dispatcher su `physicsSpace`.

**Punti di innesto da non dimenticare** (il piano precedente diceva "sensori e linee non
cambiano", ma i sensori bypassano `getFieldAt`):

| riga | chiamata | azione |
|---|---|---|
| 1262 | `getFieldAt` → `getFieldContributionFromCharge` | dispatcher, ok |
| 1423 | `getPotentialAt` | dispatcher |
| 1740 | `drawSensorAnalysis` | **chiama direttamente la 3D: va instradata** |
| 1749 | `drawSensorHeadToTail` | **idem** |
| 1502 | `drawVoltageMap` | vedi §4.2 |
| 1588 | `drawSingleFieldLine` | vedi §4.2 |

I sensori sono pochi punti: calcolarli sempre in modo esatto, mai dalla cache.

### 4.2 Cache di campo su griglia — l'intervento che rende il 2D praticabile

Senza questo il 2D non gira. Con questo gira.

Solo in modalità 2D, una volta per frame, prima del disegno:

1. Riempire due `Float32Array` (`Ex`, `Ey`) su una griglia di passo `FIELD_CACHE_STEP = 20`
   world-px che copre `getWorldBounds()` più un margine (le linee escono dai bordi).
2. `drawField` (frecce, ~900 punti): calcolo esatto, costa poco.
3. `drawSingleFieldLine`: campionamento **bilineare** dalla cache. È qui che si guadagna
   quasi tutto — il tracciamento diventa gratuito. Vicino alle cariche (`R < R_near`)
   usare la forma chiusa del §3.4 invece della cache, così le linee partono pulite.
4. `drawVoltageMap`: ciclo proprio a `res = 16` in 2D (il `ln` è liscio, non serve 8).

Gli array si allocano una volta sola e si riusano; riallocare solo su resize/zoom.

### 4.3 UI

- `radio-switch` (classe già stilata, riga 209) nella card *Dynamics*, sopra il toggle
  *Electrodynamic*: **3D section** / **2D Maxwell**.
- `syncDependentControls` (riga 985): nascondere il gruppo di **Radiation Strength**
  (`sliderRad`, riga 699) in 2D — la radiazione non è un termine additivo separato, sta
  dentro il Green. **Speed of Light** resta.
- Switch a caldo, senza reset delle cariche né della storia.

---

## 5. Costanti e visualizzazione

`K₂ = K / R_ref` con `R_ref ≈ 90 px`: così a `R = R_ref` i due modi hanno `|E|` simile e
il passaggio 3D↔2D mostra il **cambio di decadimento** (`1/R` contro `1/R²`), non un salto
di luminosità. Da documentare come unità di schermo, non come relazione fisica.

Adattamenti:

- **Soglia linee di campo** (riga 1590, `mag < 0.005`): tenerla bassa, non alzarla. In 2D
  il campo decade più lentamente e le linee devono arrivare da `+` a `−`.
- **`MAX_STEPS`** (riga 1584, attualmente 1000 a passo 4 px): con `1/R` le linee vanno
  molto più lontano e il limite verrà colpito spesso. Passo adattivo (`step ∝ 1/√|E|`,
  clampato) oppure `MAX_STEPS` più alto — sostenibile solo grazie alla cache del §4.2.
- **Mappa voltage** (riga 1503, `Math.min(Math.abs(V)/300, 1)`): tarata su `Kq/R`. Per un
  `ln` serve un divisore dedicato `VOLTAGE_SCALE_2D`, con `V` già riferito a `L₀`
  (quindi con segno che cambia attraversando `R = L₀`: è corretto e va spiegato).

---

## 6. Prestazioni

Canvas dimensionato in pixel CSS senza DPR (riga 835): tipicamente ~1600×900.

**Senza le mitigazioni** (voltage a res 8, linee calcolate punto per punto, 32 nodi, 2 cariche):

| voce | kernel/frame |
|---|---|
| voltage map | ~1.45 M |
| linee di campo | ~1.28 M |
| frecce | ~0.06 M |

A ~30 ns per kernel (Hermite + `sqrt` + divisioni, con accesso sparso a un array di ~180
elementi) sono **~90 ms/frame su una macchina buona, 150–200 ms su un portatile medio:
5–11 fps.** Il piano precedente definiva questo livello "accettabile in JS": non lo è.

**Con le mitigazioni dei §3.1 e §4.2:**

| voce | kernel/frame |
|---|---|
| cache di campo, passo 20 px (80×45) | ~200 k |
| voltage map, res 16 (100×56) | ~313 k |
| frecce esatte | ~51 k |
| linee di campo (dalla cache) | ~0 |
| **totale** | **~565 k** |

**~20 ms/frame su una macchina decente, ~35 ms su un portatile medio: 30–50 fps.** In
budget, con due manopole ovvie se serve altro margine (numero di nodi, passo della cache).

Se un giorno si volesse la piena risoluzione a 60 fps garantiti, l'unica strada è un
fragment shader WebGL con la storia in una texture: il problema è imbarazzantemente
parallelo. È però un altro progetto, non questo.

Il modo 3D non paga nulla di tutto questo: mantiene il percorso attuale.

---

## 7. Verifica

Test numerici (da fare prima di guardare lo schermo):

1. **Coerenza `E` ↔ `φ`.** `φ` ed `E` hanno convenzioni di `c` diverse
   (`∫dt'/σ` ha dimensioni di 1/velocità: è il punto in cui un fattore `c` sparisce senza
   farsi notare). Verificare che `−∇φ` differenziato numericamente coincida con la `E`
   restituita, sia statico che dinamico. È il test che becca subito l'errore di fattore.
2. **Carica ferma, buffer variabile.** `E` e `V` devono essere identici con buffer da 5
   frame e da 180 frame (proprietà del §2.4). Se non lo sono, la pre-storia è sbagliata.
3. **Moto uniforme.** Carica trascinata a velocità costante: il kernel integrale deve
   riprodurre la forma chiusa del §2.3 entro la tolleranza di quadratura, per `β` da 0 a 0.9.
4. **Gauss nel piano.** `|E| · R` costante attorno a una carica ferma.

Test visivi:

5. `+` e `−`: linee che collegano davvero le due cariche (flusso conservato nel foglio).
   Switch a 3D, stesso setup: le linee si indeboliscono e si perdono (flusso che esce in z).
6. Scatto di accelerazione: in 3D un guscio netto; in 2D una **coda dentro** il cerchio di
   luce, che è la firma di Huygens in dimensione pari — l'intera ragione di questo lavoro.
7. Carica ferma da molto tempo in 2D dinamico ≈ forma chiusa statica.
8. Toggle 3D↔2D a caldo senza reset; `Radiation Strength` visibile solo in 3D.
9. Zoom e slider `c` durante il 2D dinamico: nessun salto della mappa di potenziale
   (verifica che `L₀` sia davvero costante, §2.5).

---

## 8. Ordine di implementazione

1. `getRetardedState` a Newton (§3.3). Isolato, migliora anche il 3D, verificabile subito.
2. Rinomina 3D + dispatcher + stato `physicsSpace` + radio UI. A questo punto il 2D può
   restituire ancora la forma chiusa statica: l'app funziona già in entrambe le modalità.
3. Forme chiuse 2D: statico e moto uniforme (§2.3), più il fallback del §3.4.
   Test 3 e 4 passano qui.
4. Kernel integrale (§2.2) con la quadratura composita (§3.1) e la pre-storia (§2.4).
   Test 1, 2 e 7.
5. Cache di campo su griglia (§4.2) e taratura visiva (§5). Test 5, 6, 8, 9.
6. Aggiornare `concezione_fisica.txt`: i due modi, l'interpretazione a filo infinito,
   il Green 2D e la scia, la divergenza IR del potenziale, e cosa resta scelta di
   visualizzazione (`K₂`, `L₀`, niente B, niente forza di Lorentz).

I passi 1–3 sono a rischio basso e già danno un 2D statico corretto. Il passo 4 è il
cuore. Il passo 5 è quello che decide se gira.

---

## 9. Differenze rispetto al piano precedente

| | piano precedente | qui |
|---|---|---|
| kernel di E | non scritto; "cono + coda con sottrazione" | forma esplicita e regolare (§2.2), senza termini di bordo |
| cancellazione numerica | rischio reale sottraendo due `1/σ³` | non si sottrae nulla |
| cutoff `δ` a mezzo frame | necessario | non serve: sostituzione `s = w²` |
| `(1 − β²)` nel campo di moto uniforme | esponente 3D | `√(1 − β²)`, §2.3 |
| troncamento della storia | "tenere lunga" (contraddittorio) | pre-storia in forma chiusa, risultato indipendente dal buffer |
| riferimento IR | media del frame o `2cT` | `L₀` fisso |
| spaziatura dei nodi | Chebyshev o `u²`, 32–64 | `w = √s` vicino al cono + uniforme in `s` sulla coda, 20–32 |
| `t_rit` | punto fisso a 3 iterazioni | Newton |
| linee di campo | calcolate punto per punto | dalla cache su griglia |
| prestazioni | "~10⁶, accettabile" | 5–11 fps senza mitigazioni, 30–50 fps con |
| sensori | "non cambiano" | bypassano il dispatcher, vanno instradati |
