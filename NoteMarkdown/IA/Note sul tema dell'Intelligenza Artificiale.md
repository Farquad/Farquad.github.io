---
title: Note sul tema dell'Intelligenza Artificiale

---

# Note sul tema dell'Intelligenza Artificiale

## Sistemi nervosi biologici

* I sistemi nervosi degli animali hanno la funzione di ricevere informazioni dall'ambiente (input), elaborarle e produrre una risposta (output).
    * Nel caso degli animali l'input sono informazioni che provengono dai sensi, l'output è il comportamento dell'animale attraverso l'attivazione di movimenti muscolari o di ghiandole
* Il sistema nervoso biologico si è sviluppato e potenziato spontaneamente seguendo la selezione naturale, senza bisogno di un progetto.
### Meccanismi elementari alla base di un sistema nervoso biologico
* L'unità elementare che rende possibile al sistema nervoso di elaborare l'informazione è il neurone: una cellula dotata di lunghe protuberanze che le permettono di stabilire una rete di contatti. L'informazione viaggia nel neurone sotto forma di trasmissione elettrica: il neurone riceve una carica da altri neuroni, la accumula fino a raggiungere una soglia critica di potenziale elettrico e poi la scarica sui neuroni a lui collegati.
<style>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 250px;
}
</style>

<img src="https://hackmd.io/_uploads/B14omWQw3.png" alt="drawing" class="center"/>

* I neuroni formano una complessa rete di connessioni tra di loro. La connessione tra due neuroni si chiama *sinapsi*. Il numero di sinapsi di un neurone è dell'ordine delle migliaia. Il numero di sinapsi di un cervello umano è dell'ordine di $10^{14}-10^{15}$.


<img src="https://hackmd.io/_uploads/S1dkEZXD3.png" alt="drawing" class="center"/>

* Gli organi di senso hanno dei neuroni che fanno partire una catena di trasmissione del segnale. La catena si chiude con i neuroni degli organi motori che producono movimenti o con neuroni preposti allo stimolo di ghiandole che avviano una secrezione.


## Operazioni "meccaniche" e operazioni "creative"

Nel tentativo degli uomini di riprodurre artificialmente comportamenti intelligenti occorre fare una prima distinzione tra due tipi di operazioni che possiamo realizzare con il nostro intelletto: operazioni "meccaniche" e operazioni "creative".

   * **Operazioni meccaniche**: attività mentali più facili da "automatizzare", che possono essere eseguite da un uomo senza sforzi creativi o intellettivi, in modo meccanico. Esempi:
        * Dire se due numeri sono uguali
        * Dire se due stringhe di simboli sono uguali
        * Contare elementi di liste o insiemi
        * Fare operazioni aritmetiche tra numeri interi

* **Operazioni creative**: attività "intelligenti" che richiedono intuizione o un contributo originale non alla portata di tutti, quindi non "meccaniche". Queste attività sono state automatizzate solo in tempi molto recenti. Esempi: 
    * produrre una dimostrazione matematica senza averla mai vista prima, 
    * risolvere un indovinello, 
    * scrivere una poesia
    * realizzare un disegno originale

Un esempio della differenza tra questi due tipi di attività si trova nel calcolo di derivate e integrali: 
* derivare una funzione è un'operazione meccanica che segue regole certe che portano sempre al risultato corretto se applicate nel modo giusto; 
* integrare una funzione al contrario non è un processo meccanico: richiede intuizioni, idee e riconoscimento di "pattern", non c'è un procedimento generale che porta invariabilmente a un risultato.
    

## Algoritmi


* Le prime capacità intellettive che siamo riusciti a riprodurre sono quelle di tipo meccanico, abbiamo ideato nel tempo:

    * macchine calcolatrici (dal 1600 circa con Pascal) 
    * macchine programmabili di tipo meccanico (Babbage, fine 1800)
    * calcolatori elettronici (dagli anni '40 del 1900) 

Il concetto di "algoritmo" rappresenta il genere di attività intellettuale "meccanica" che siamo riusciti ad automatizzare con delle macchine a partire dalla prima metà del 1900.
    
* Che cos'è un algoritmo:
     *  E' una sequenza di operazioni e/o controlli da eseguire in un certo ordine in base a certe condizioni.
     * Le operazioni elementari e i controlli sono di tipo meccanico, non richiedono sforzi creativi o intuitivi

Esempio: un algoritmo per decidere se un anno è bisestile può essere il seguente



            1. Chiama x l'anno
            2. x è divisibile per 4?
                NO -> scrivi "anno NON bisestile"
                SI -> x è divisibile per 100?
                    SI -> x è divisibile per 400?
                        SI -> scrivi "anno bisestile"
                        NO -> scrivi "anno NON bisestile"
		
        
* *Implementare* un algoritmo:
    * Gli algoritmi potrebbero essere eseguiti in linea teorica da esseri umani (a patto di avere abbastanza tempo, carta e penna)
	* A partire dagli anni 40 con i calcolatori elettronici abbiamo macchine che eseguono in automatico queste sequenze di istruzioni e controlli al posto nostro interpretando uno specifico codice ("linguaggio di programmazione") con cui queste istruzioni devono essere fornite alla macchina.


## Simulare o generare intelligenza umana con algoritmi

### Riconoscere e classificare

* Alla base dell'intelligenza animale c'è il riconoscimento e la classificazione in un flusso di informazioni. Gli animali per sopravvivere come specie devono fare cose come:
    * Riconoscere e classificare animali di altre specie che vedono (ad esempio come prede o predatori, innocui o pericolosi)
    * Riconoscere e classificare animali della propria specie (distinguere il sesso, l'età, la fertilità)
    * Riconoscere e classificare odori o suoni (commestibile/non commestibile, odore di prede o predatori, il lamento di un cucciolo affamato)
    * Riconoscere e classificare schemi di comportamento (il gioco, l'aggressività, il rituale di accoppiamento)

* Nel caso degli esseri umani abbiamo anche abilità superiori come riconoscimento e classificazione di elementi del linguaggio scritto e parlato, oltre che di forme concettuali.

### Riconoscere un comportamento intelligente

L'idea di simulare con una macchina il comportamento umano intelligente, come possibilità concretamente realizzabile attraverso la tecnologia, è stata evocata per la prima volta nel 1950 dal matematico Alan Turing che ha proposto un test - da lui definito "imitation game" - per valutare se una macchina è dotata di una intelligenza comparabile con quella umana:



* il test prevede di mettere in contatto dei giudici umani, tramite uno scambio di messaggi scritti, con un essere umano e con una macchina; i giudici dovrebbero scoprire chi è l'uomo e chi la macchina attraverso un dialogo con entrambi. Se non saranno in grado di individuare correttamente la macchina diremo che questa ha superato il test;
    * [link all'articolo originale di Turing](https://academic.oup.com/mind/article/LIX/236/433/986238).


## Il problema del riconoscimento di immagini

Noi uomini siamo in grado di riconoscere caratteri scritti (cifre numeriche e lettere), come potremmo fare per costruire macchine in grado di svolgere la stessa funzione?
* L' input che dovrebbe ricevere la macchina è un insieme di pixel colorati (facilmente codificabili in un linguaggio comprensibile ad una macchina) come ad esempio questi:

<style>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 250px;
}
</style>

<img src="https://images.squarespace-cdn.com/content/v1/5d167b45ab6f5300015149e7/1607549804968-58ELPZEL8WXPSFL6Y2WH/logo.png?format=2500w" alt="drawing" class="center"/>

(In questo esempio i singoli pixel sono facilmente individuabili ma di fatto qualsiasi rappresentazione con un'immagine digitale di numeri o lettere è inevitabilmente un insieme di pixel colorati).

* L'output dovrebbe essere il carattere rappresentato in questi pixel, ma non espresso in termini di pixel bensì come l'indicazione di un elemento da una lista di caratteri prestabilita.

Costruire un algoritmo che esegua questo compito di riconoscimento visivo è un problema difficile da risolvere, per diversi motivi:
* le possibili immagini in cui può presentarsi uno stesso carattere (ad es. il numero "1") in modo che noi uomini possiamo riconoscerlo come numero 1 sono troppe, sarebbe impossibile produrre una lista completa delle possibili rappresentazioni alternative del numero "1" in termini di pixel.
* Non è chiaro quale sequenza di istruzioni meccaniche dovrebbe eseguire un algoritmo con questi pixel per riconoscere un particolare numero senza commettere errori di valutazione, dovrebbe trattarsi di qualcosa di estremamente complesso, pieno di casi e sottocasi e diversificato per ogni possibile carattere da riconoscere.

Ciò nonostante siamo riusciti comunque a produrre (negli anni 80 e 90) degli algoritmi efficaci per il riconoscimento  di caratteri. Questi algoritmi però non li abbiamo realmente costruiti noi da zero, per generarli abbiamo cercato di imitare il modo in cui la natura genera dei sistemi nervosi biologici. Vediamo come.


## Reti neurali artificiali

Negli anni 40 un matematico ed un neurofisiologo teorizzano una struttura matematica che vorrebbe imitare "virtualmente" il comportamento dei neuroni del cervello:

* i "neuroni artificiali" sono delle caselle collegate tra di loro in una rete che ha una struttura come quella rappresentata in figura; queste caselle contengono al loro interno un valore numerico (tra -1 e 1 in alcuni modelli, tra 0 e 1 in altri)

<style>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 250px;
}
</style>

<img src="https://staticgeopop.akamaized.net/wp-content/uploads/sites/32/2022/11/Neuralnetwork.jpg" alt="drawing" class="center"/>


* il numero interno di ciascuna casella gioca il ruolo del potenziale elettrico nei neuroni: quando raggiunge una certa soglia fa sì che il neurone "scarichi" sui neuroni collegati a lui
* la "scarica" del neurone virtuale viene realizzata cambiando i numeri interni di tutti i neuroni artificiali che sono collegati con lui
* i neuroni collegati possono a loro volta scaricare su quelli a loro collegati quando il loro numero interno supera la soglia critica, creando una catena
* la catena di trasmissione del segnale:
    *  inizia con neuroni di input, in verde nella figura (che potrebbero essere ad esempio uno per ogni pixel dell'immagine in cui vogliamo identificare un carattere) 
    *  finisce con neuroni di output (che potrebbero essere associati a tutte le possibili lettere dell'alfabeto e caratteri numerici che vorremmo riconoscere nell'immagine)
* questa catena di trasmissione dei segnali per essere portata avanti necessita solamente di operazioni meccaniche (calcoli, controlli, aggiornamento di variabili numeriche), quindi si può tradurre in un algoritmo che può essere implementato in un calcolatore elettronico che "emula" così i meccanismi di un cervello.

### Come costruire la rete "giusta"?

Il problema ora è questo: come facciamo a costruire le connessioni tra i neuroni virtuali in modo che essi possano comportarsi come vogliamo noi (ad esempio riconoscano numeri e lettere nelle immagini)?

Provare a decidere noi neurone per neurone come deve collegarsi con gli altri per ottenere il risultato desiderato è un'operazione di una difficoltà insormontabile per reti che non siano striminzite.

Negli anni 70 viene proposta questa idea risolutiva: si parte da una rete con connessioni casuali (e quindi certamente "sbagliate") e si procede attraverso una serie di aggiustamenti successivi in base a quanto sbagliati sono i risultati che la rete ci restituisce.

L'algoritmo che procede a questa sequenza di aggiustamenti si chiama *back-propagation*, e l'iter con con la rete si perfeziona progressivamente è chiamato "allenamento".

### Back-propagation e allenamento

Il meccanismo di base per allenare la rete è il seguente:

Si parte con una rete in cui sono presenti tutte le connessioni tra i vari neuroni dei vari strati, ma associando ad ogni connessione un *parametro* che dice quanto il segnale che lo attraversa deve essere forte o debole.
![image](https://hackmd.io/_uploads/B190iqwabx.png)
Invece di decidere quali connessioni ci sono e quali no, le mettiamo tutte e decidiamo successivamente quali devono contare "tanto" e quali "poco".


1. **FASE 1: passaggio dell'input** La rete neurale riceve un input in ingresso (ad esempio una matrice di pixel che idealmente rappresentano il numero "1"). Questo dato attiva a cascata i neuroni in base ai pesi delle loro connessioni. Alla fine, la rete produce un output con l'attivazione dell'ultimo strato dei neuroni (nel caso del riconoscimento dei numeri: il neurone che corrisponde al numero che la rete "vede" nell'input).

![image](https://hackmd.io/_uploads/rJtHaqPpWl.png)


2. **FASE 2: il giudizio** Il risultato ottenuto viene confrontato con quello corretto (che sappiamo essere corretto). Si calcola una "distanza" tra il risultato della rete e quello corretto, questa distanza quantifica l'**errore** della rete.

3. **FASE 3: La Back-propagation:** Si valuta l'influenza che ogni singolo peso delle varie connessioni ha avuto sul risultato finale, cioè: quanto sarebbe venuto maggiore o minore l'errore se il peso fosse stato di più/di meno? Questo calcolo viene eseguito procedendo a ritroso: partendo dall'errore finale e tornando indietro attraverso tutti gli strati della rete fino al punto di partenza.

4. **FASE 4: l'aggiustamento:** Tutti i parametri della rete vengono modificati di una piccola percentuale in base ai calcoli effettuati nel passaggio precedente, al fine di ridurre l'errore la volta successiva che dovesse capitare un input simile.

L'idea è quella di ripetere questa sequenza per un grandissimo numero di esempi "corretti" che diamo in pasto alla rete, sperando che la rete  impari a comportarsi nel modo desiderato anche in tutti gli altri casi reali che non sono presentati negli esempi.

Il sistema di allenamento mediante questa tecnica della backpropagation, pensato per la prima volta negli anni 70, diventa lo standard con cui vengono sviluppate le reti neurali a partire dagli anni 80.

### Due esempi di reti neurali che imparano


#### Primo esempio

[In questo link](https://neural5x5.netlify.app/) c'è un esempio di una rete che può imparare a riconoscere i numeri disegnati su una griglia 5x5.

![image](https://hackmd.io/_uploads/rJPQ-f5A-l.png)


#### Secondo esempio
In [questo link](https://playground.tensorflow.org/) c'è un esempio di una rete neurale in cui si può vedere dal vivo il meccanismo di apprendimento:
* Questa rete impara a classificare i punti di un quadrato in due regioni (una arancione e una azzurra) in base ad un insieme di esempi (i puntini colorati). 
* L'input è dato da due neuroni che contengono le coordinate x e y di un punto  del quadrato. L'output è un numero che corrisponde a un colore in una sfumatura che associa:
    * l'arancione al numero $-1$
    * l'azzurro al numero $1$
    * il bianco al centro al numero $0$.
* Premendo sul tasto play inizia l'apprendimento della rete. I colori dei punti del quadrato a destra indicano come la rete classifica ogni punto dello spazio. 
* All'inizio i punti sono indifferenziati (vengono tutti colorati con colori  vicini al bianco).

<img src="https://hackmd.io/_uploads/rySaxqdU2.png" alt="drawing" class="center"/>

* Con l'apprendimento si differenziano nettamente delle regioni (arancione e azzurra) che corrispondono ai colori dei punti che venivano dati come esempi per istruire la rete.


<img src="https://hackmd.io/_uploads/Skpue9OUh.png" alt="drawing" class="center"/>


### Perdita di controllo e di affidabilità

Mentre sugli algoritmi abbiamo un controllo totale sul funzionamento interno e siamo in grado di intervenire per correggere comportamenti indesiderati, su una rete neurale allenata non sappiamo che ruolo gioca ciascun neurone nell'esecuzione del compito, per noi è una "scatola nera", non possiamo intervenire a correggere errori agendo direttamente sulla struttura interna, possiamo solo allenarla meglio. 
* Una calcolatrice programmata con algoritmi fornisce risultati esatti in modo infallibile (a meno di errori del programmatore), una calcolatrice basata su una rete neurale al contrario non avrebbe lo stesso livello di affidabilità.
	


---

		
## Tappe dello sviluppo delle reti neurali artificiali

* 1943 - viene pubblicato un [articolo](https://link.springer.com/article/10.1007/BF02478259) scientifico che teorizza la prima rete neurale artificiale
* 1958 - viene costruita la prima macchina che implementa una rete neurale artificiale
* Anni 80-90: prime applicazioni pratiche e commerciali del riconoscimento di caratteri da immagini (OCR: Optical Character Recognition)
* 2010-12 - Svolta del deep learning nel riconoscimento vocale (Hinton et al.).
* 2012 - riconoscimento visivo di oggetti (AlexNet)
* 2014-2015 - FaceNet (Google) e DeepFace (Facebook): riconoscimento di facce
* 2015 - riduzione del "rumore" nelle fotografie
* 2016 - Alphago - prima volta nella storia che un campione di Go viene sconfitto da un computer, obiettivo raggiunto con l'utilizzo di una rete neurale
* 2017 – Architettura "Transformer" per i modelli linguistici: il paper "Attention Is All You Need" getta le basi per gli sviluppi futuri dei modelli
* 2018 -  grandi modelli per generazione e riconoscimento di testo in linguaggio naturale (GPT e BERT)
* 2021 – CLIP e DALL·E (OpenAI) – Primi modelli su larga scala a connettere linguaggio e visione, aprendo la strada alla generazione di immagini in base a descrizioni testuali
* 2023 - prima rete (Goggle Gemini) nativamente multimodale che elabora input visivi e linguistici
* 2023 – Modelli agentici (AutoGPT, BabyAGI, Toolformer) – Emergono i primi framework che rendono gli LLM capaci di pianificare, usare strumenti e agire autonomamente, inaugurando l’era dei “LLM agentici”.

## Modelli linguistici

Un modello linguistico è una rete neurale concepita ed allenata per riconoscere e riprodurre gli schemi del linguaggio naturale umano.

Meccanismo di base del funzionamento:
* riceve in input un testo nel linguaggio naturale e stabilisce quale deve essere l'elemento di testo successivo che più probabilmente dovrebbe seguire il testo in input (una parola o una parte di parola), ad esempio:
	* input: "Ciao, come stai?"
	* output (elemento più probabile che segue quella domanda): "ciao,"
* dopo questo primo passo la rete considera come input tutta la sequenza precedente incluso il suo inizio di risposta: "Ciao, come stai? ciao," e genera in output il seguito più probabile. Nell'esempio, dopo "ciao," il seguito più probabile potrebbe essere "io"
* si procede iterativamente allo stesso modo generando, un pezzo dopo l'altro, la continuazione più probabile del testo scritto fino a quel momento. Ad esempio dopo "ciao, io" potrebbe aggiungere "sto", poi "bene", poi "grazie", ecc..
* In [questo link](https://gpt3demo.com/apps/openai-gpt-3-playground) è possibile inserire un testo e chiedere alla rete neurale di continuarlo aggiungendo una dopo l'altra le parole della continuazione più probabile.

Per allenare il modello linguistico vengono forniti alla rete nella fase di apprendimento una mole molto grande di testi scritti in linguaggio naturale.

## Modelli linguistici "grandi" (LLM) e Modelli Multimodali

Per produrre una rete che riconosce i caratteri su immagini (lettra OCR) è possibile ottenere buoni risultati con un numero di connessioni (parametri) della rete dell'ordine delle decine di milioni di parametri ($10^7$). Anche se il numero sembra grande di fatto è gestibile in un computer domestico.

Padroneggiare il linguaggio naturale è un compito molto più complesso della lettura dei caratteri e per ottenere risultati utili è stato necessario passare a reti molto più grandi, il numero di connessioni/parametri di una rete in grado di farlo si aggira tra i $10^{10}$ e i $10^{12}$. E' un numero talmente grande che per ospitare la rete ed allenarla sono spesso richieste infrastrutture dedicate. Si tratta di un numero che si avvicina al numero di sinapsi del cervello umano che si stimano intorno a $10^{14}-10^{15}$.

Anche l'allenamento di una rete del genere è estremamente più oneroso e dispendioso rispetto ai compiti più semplici considerati precedentemente dagli sviluppatori. Per i modelli come GPT-3 e i primi GPT-4 sappiamo che l'allenamento ha richiesto l'assimilazione di porzioni enormi della conoscenza umana digitalizzata:
* L'intera versione di Wikipedia in più lingue.
* Vasti archivi di libri, pubblicazioni scientifiche e manuali.
* Dati provenienti da un'estesa selezione di siti web, blog e forum.

Queste gigantesche reti (che contano da centinaia di miliardi fino a oltre mille miliardi di "sinapsi" o *parametri*), una volta allenate hanno mostrato abilità inaspettate: la capacità di tradurre, riassumere, scrivere codice informatico e persino risolvere problemi logici, pur essendo state addestrate "solo" per prevedere l'elemento successivo in un testo. 

Per renderci conto di come emergano capacità apparentemente estranee a quelle oggetto dell'allenamento (di mera predizione linguistica) si può considerare come rispondono queste reti alla richiesta di calcoli aritmetici complessi: la macchina non può contenere nella sua "memoria" tutte le possibili moltiplicazioni tra numeri di 5 o 6 cifre (che sono miliardi), nè l'allenamento è statofo calizzato su tali operazioni, eppure se chiediamo "quanto fa 6789x7652" è altamente probabile che fornisca una risposta corretta (o sbagliata di poco) senza eseguire alcun calcolo.

### Potenzialità attuali
Le applicazioni di queste reti includono:
* Interagire in linguaggio naturale in modo indistinguibile da un umano.
* Tradurre correttamente tra due lingue naturali.
* Analizzare documenti legali, finanziari o medici immensi in pochi secondi.
* Fare da tutor personalizzato per l'apprendimento di qualsiasi materia.
* Sviluppare software sulla base di descrizioni testuali, individuare bug nel codice e tradurre tra linguaggi di programmazione.
* Aiutare nella ricerca scientifica (ad esempio formulando ipotesi per la scoperta di nuovi materiali o farmaci).

### Limiti intrinseci dei LLM

Nonostante le capacità avanzate, questi modelli mantengono vulnerabilità strutturali:

* **Allucinazioni:** Il modello non "sa" di non sapere. Se interrogato su argomenti specifici di cui ha pochi dati, tenderà a inventare risposte (fatti, date, citazioni bibliografiche) che appaiono linguisticamente perfette e molto plausibili, ma che sono del tutto false.
* **Replicazione di bias e pregiudizi:** Poiché i modelli apprendono da testi scritti dall'umanità, assorbono inevitabilmente i pregiudizi culturali, razziali o di genere presenti nei dati di addestramento.
* **Mancanza di vera comprensione fisica:** Pur potendo descrivere perfettamente come si va in bicicletta elaborando testi enciclopedici, la rete non ha un'esperienza fisica e spaziale del mondo reale, il che la porta a commettere a volte errori di logica elementare o di "buon senso" fisico.

### Sviluppi recenti: verso la multimodalità e l'autonomia

L'evoluzione dell'Intelligenza Artificiale procede a un ritmo estremamente rapido. I modelli basati puramente sulla previsione del testo scritto sono oggi affiancati e superati da architetture più avanzate. I due sviluppi più significativi del panorama attuale includono:

* **Modelli multimodali nativi:** Le reti neurali più recenti (a partire da GPT-4o di OpenAI e Gemini di Google) non sono più strettamente legate al solo linguaggio scritto. Sono costruite per essere "multimodali", ovvero capaci di ricevere in input ed elaborare simultaneamente testo, immagini, audio e video. Questi modelli possono "guardare" la foto di uno schema, "ascoltare" una domanda parlata e rispondere in tempo reale a voce, simulando una percezione simile a quella dei sensi umani.
* **Agenti autonomi (AI Agents):** I sistemi di intelligenza artificiale stanno passando dall'essere dei semplici "oracoli" testuali a veri e propri operatori attivi. Un agente autonomo riceve un obiettivo complesso e non si limita a descrivere come risolverlo, ma agisce in prima persona: elabora un piano d'azione, utilizza strumenti esterni (come navigare sul web per verificare le fonti o usare una calcolatrice) ed è persino in grado di scrivere, testare ed eseguire codice di programmazione, correggendo in automatico i propri errori fino al completamento del compito.

---

## Impiego dall'IA nella ricerca scientifica

Ll'Intelligenza Artificiale si è evoluta così rapidamente da passare subito da semplice strumento di calcolo a motore di scoperte scientifiche in pochissimi anni. Alcuni dei risultati più sorprendenti raggiunti di recente:

* Tra la fine del 2020 e il 2021: il modello AlphaFold ha calcolato l'esatta struttura tridimensionale di quasi tutte le proteine conosciute dalla sola sequenza di amminoacidi, rivoluzionando la biologia e lo sviluppo di nuovi farmaci [[1]](https://www.nature.com/articles/s41586-021-03819-2).
* Febbraio 2022: un passo cruciale verso l'energia pulita attraverso il controllo del plasma instabile in un reattore a fusione nucleare. Una rete neurale dedicata ha imparato come confinare magneticamente il plasma ad altissime temperature in tempo reale, prevenendone il collasso [[2]](https://www.nature.com/articles/s41586-021-04301-9).
* Novembre 2023: il modello GNoME ha accelerato drasticamente la ricerca sui materiali scoprendo a livello teorico 2,2 milioni di nuovi cristalli. Di questi, quasi 400.000 sono fisicamente stabili, condensando secoli di lenti esperimenti di laboratorio in una singola elaborazione, utile per lo sviluppo di batterie e pannelli solari [[3]](https://www.nature.com/articles/s41586-023-06735-9).
* Novembre 2023: il sistema predittivo GraphCast ha rivoluzionato le scienze atmosferiche generando previsioni meteorologiche globali fino a dieci giorni con un'accuratezza senza precedenti, impiegando meno di un minuto di calcolo su un singolo chip, senza dover fare calcoli con le leggi fisiche [[4]](https://www.science.org/doi/10.1126/science.adi2336).
* Gennaio 2024: il modello AlphaGeometry ha risolto complessi teoremi di geometria con abilità paragonabili a quelle delle medaglie d'oro alle Olimpiadi Internazionali della Matematica [[5]](https://www.nature.com/articles/s41586-023-06747-5).
* Agosto 2024: il modello FermiNet ha offerto una soluzione a un problema quasi centenario di fisica e chimica. Calcolare l'esatto comportamento di un gruppo di elettroni usando la fisica tradizionale richiede calcoli troppo lunghi persino per i supercomputer. Questa rete neurale ha aggirato l'ostacolo trovando una "scorciatoia" matematica che apprende e rispetta le inviolabili leggi della fisica quantistica, permettendoci di simulare con precisione assoluta la struttura di atomi e molecole partendo da zero [[2]](https://deepmind.google/discover/blog/ferminet-quantum-physics-and-chemistry-from-first-principles/).
* Febbraio 2026: un modello dedicato di Open-AI analizzando la complessa matematica che descrive come interagiscono le particelle subatomiche fondamentali (i gluoni), ha corretto alcune vecchie convinzioni della comunità scientifica prevedendo comportamenti inattesi. [[1]](https://openai.com/index/new-result-theoretical-physics/).

---


## L'infrastruttura dell'IA: le risorse necessarie per un LLM

Spesso si pensa all'Intelligenza Artificiale come a un software immateriale che "vive nel cloud". In realtà, l'allenamento e il  di un Large Language Model (LLM) di ultima generazione richiedono un'infrastruttura fisica, energetica ed economica colossale, paragonabile a quella dell'industria aerospaziale.

![image](https://hackmd.io/_uploads/Sy3cbed6-e.png)


Per creare e far funzionare modelli come GPT-3/4/5 o Gemini servono quattro categorie fondamentali di risorse:

### 1. Hardware specializzato e Supercomputer
Un LLM non può essere allenato su computer tradizionali. Richiede enormi data center riempiti con decine di migliaia di processori specializzati, chiamati **GPU** (Graphics Processing Unit). 
* Originariamente nate per i videogiochi, le GPU si sono rivelate perfette per eseguire i milioni di calcoli matematici simultanei richiesti dalle reti neurali. 
* L'assemblaggio di questi supercomputer richiede componenti hardware di altissima precisione (attualmente dominati dall'azienda Nvidia), cablaggi in fibra ottica per far comunicare i processori tra loro senza ritardi, e spazi fisici immensi per ospitare i server.

### 2. Risorse energetiche e Impatto ecologico
I calcoli massivi richiesti dalle IA generano un consumo di risorse naturali impressionante, sollevando seri dubbi sulla sostenibilità di questa tecnologia:
* **Elettricità:** La fase di addestramento (che dura mesi) di un singolo modello "gigante" consuma decine di Gigawattora, l'equivalente del consumo elettrico annuo di migliaia di abitazioni. Anche il mantenimento quotidiano è dispendioso: generare una risposta tramite ChatGPT richiede molta più energia rispetto a una normale ricerca su Google.
* **Acqua:** I supercomputer generano un calore estremo e necessitano di enormi impianti di raffreddamento ad acqua. Secondo un noto studio della University of California (2023) sull'impronta idrica dell'IA, l'addestramento di modelli come GPT-3 ha richiesto centinaia di migliaia di litri d'acqua dolce. Lo stesso studio stima che, durante l'uso quotidiano, un LLM faccia evaporare dai sistemi di raffreddamento l'equivalente di una bottiglia d'acqua da mezzo litro ogni 20-50 domande poste dagli utenti.

### 3. Dati su scala globale e Lavoro umano
Come abbiamo visto, la "materia prima" dell'IA sono i dati testuali. Ma non basta scaricare internet.
* Serve uno stoccaggio immenso per immagazzinare Petabyte di testi, immagini e video.
* **Il lavoro "invisibile":** I dati grezzi presi dal web sono pieni di tossicità, razzismo, violenza e inesattezze. Per evitare che l'IA diventi pericolosa, le aziende impiegano migliaia di lavoratori umani (spesso esternalizzati in Paesi in via di sviluppo a basso costo) che passano le giornate a leggere, classificare ed etichettare i dati nocivi, insegnando alla rete cosa *non* deve dire. Questo processo, noto come addestramento con feedback umano, richiede un'enorme mole di manodopera sottopagata.

### 4. Capitali economici e Talento iper-specializzato
La somma di queste necessità fisiche crea una barriera d'ingresso economica insormontabile per la maggior parte degli attori.
* **Costi di addestramento:** Allenare un modello di frontiera oggi costa centinaia di milioni di dollari solo in termini di energia e noleggio dei server, senza contare gli stipendi milionari dei pochi ricercatori e ingegneri al mondo capaci di programmare queste architetture.
* **Oligopolio tecnologico:** Proprio a causa di questi costi esorbitanti, solo una manciata di multinazionali (le cosiddette "Big Tech" come Microsoft, Google, Meta o Amazon) o startup pesantemente finanziate (come OpenAI o Anthropic) possiede le risorse per competere. Questo solleva il problema geopolitico della concentrazione di una tecnologia così determinante nelle mani di pochissime aziende private.

---

## L'accelerazione dell'IA: Leggi di Scala e Crescita Esponenziale

Uno degli aspetti più sbalorditivi dell'attuale sviluppo dell'Intelligenza Artificiale non è solo *cosa* queste macchine sanno fare, ma la **velocità** con cui imparano a farlo. Negli ultimi anni abbiamo assistito a un'accelerazione senza precedenti nella storia della tecnologia, guidata da quelle che i ricercatori chiamano [Scaling Laws (Leggi di Scala)](https://arxiv.org/abs/2001.08361). Si è scoperto che aumentando le dimensioni di una rete neurale, la quantità di dati e la potenza di calcolo, le prestazioni migliorano in modo prevedibile e costante.

Non si tratta di una crescita lineare, ma esponenziale. Secondo le analisi di [Epoch AI](https://epochai.org/blog/compute-trends), la capacità di calcolo utilizzata per addestrare i modelli di frontiera sta **raddoppiando ogni 7-10 mesi** circa. Questo significa che ogni nuovo modello ha a disposizione una potenza di calcolo immensamente superiore rispetto a quello dell'anno precedente, rendendo obsoleti i sistemi precedenti in tempi brevissimi.

Questa velocità sta "comprimendo" il tempo necessario per raggiungere traguardi storici. Come evidenziato dallo [Stanford AI Index Report 2024](https://aiindex.stanford.edu/report/), l'IA ha già superato le prestazioni umane in compiti complessi come la classificazione di immagini e la comprensione del linguaggio, spostando l'asticella verso sfide sempre più difficili. L'ultima frontiera è il passaggio dal semplice completamento statistico del testo al [ragionamento logico avanzato](https://openai.com/index/learning-to-reason-with-llms/), dove i modelli utilizzano tempo di calcolo aggiuntivo per "pensare" prima di rispondere. Questa impennata costante delle prestazioni è il motivo per cui oggi il dibattito si è spostato rapidamente dalle semplici applicazioni pratiche ai rischi e alle opportunità della superintelligenza.

---


## Implicazioni etiche e regolamentazione legislativa

Lo sviluppo rapido e pervasivo delle intelligenze artificiali, in particolare dei modelli generativi e dei LLM, ha sollevato questioni etiche inedite. Di conseguenza, governi e istituzioni internazionali stanno cercando di formulare leggi per mitigarne i rischi senza soffocarne il potenziale innovativo.

### Principali dilemmi etici
Oltre ai pericoli legati alla disinformazione e all'impatto sul mondo del lavoro, l'uso dell'IA solleva problemi profondi che toccano i diritti fondamentali:
* **Violazione del Diritto d'Autore (Copyright):** I LLM e i generatori di immagini sono allenati su miliardi di testi, opere d'arte, articoli e fotografie presenti sul web. Questo avviene quasi sempre senza il consenso degli autori originali né un compenso economico, sollevando il problema dello sfruttamento non autorizzato del lavoro intellettuale e artistico umano.
* **Privacy e gestione dei dati personali:** Il rastrellamento massivo di dati dal web (web scraping) per istruire le reti neurali finisce per inglobare informazioni personali, sensibili o coperte da privacy. Inserire questi dati in modelli che non possono "dimenticare" facilmente ciò che hanno imparato entra in conflitto con normative sulla privacy come il diritto all'oblio.
* **Responsabilità legale (Accountability):** Essendo le reti neurali profonde delle "scatole nere", se un'IA impiegata in ambito medico (per una diagnosi) o giudiziario (per valutare la recidiva di un reato) commette un errore grave, non è chiaro su chi debba ricadere la responsabilità: sull'azienda sviluppatrice, sull'utente finale o sul professionista che ha avallato la scelta della macchina?
* **Impatto ambientale:** L'addestramento e il funzionamento quotidiano di modelli enormi richiedono immensi datacenter, comportando un consumo di energia elettrica e di acqua (per il raffreddamento dei server) estremamente elevato, in contrasto con gli obiettivi globali di sostenibilità.
* **Deepfake e furto d'identità:** La capacità di generare cloni vocali fotorealistici, foto e video falsi ma indistinguibili dal vero sta facilitando truffe, diffamazioni e il proliferare di materiale potenzialmente compromettente generato senza il consenso delle vittime.

### I provvedimenti legislativi e le iniziative legali
Per rispondere a queste sfide, la politica e la giurisprudenza si stanno muovendo per definire dei confini entro cui queste tecnologie possano operare in sicurezza:

* **L'[AI Act](https://it.wikipedia.org/wiki/Legge_sull%27intelligenza_artificiale) dell'Unione Europea:** È il primo quadro normativo completo al mondo sull'Intelligenza Artificiale. Ha un approccio "basato sul rischio" (risk-based approach), dividendo i sistemi di IA in diverse categorie:
    * **Rischio inaccettabile (Sistemi vietati):** Pratiche totalmente proibite perché minacciano i diritti fondamentali. Esempi di utilizzo includono:
        * Il **social scoring** (classificazione dei cittadini da parte di governi o aziende basata sul comportamento).
        * I sistemi di **riconoscimento biometrico in tempo reale** negli spazi pubblici (salvo rare eccezioni per le forze dell'ordine).
        * I sistemi di **polizia predittiva** basati esclusivamente sulla profilazione di un individuo.
        * Il **riconoscimento delle emozioni** nei luoghi di lavoro o nelle scuole.
        * La **manipolazione cognitiva o comportamentale** (es. giocattoli con comandi vocali che incoraggiano comportamenti pericolosi nei minori).
    * **Alto rischio (Sistemi severamente regolamentati):** IA usate in settori critici che possono avere un forte impatto sulla vita delle persone. Devono rispettare requisiti severi di trasparenza, tracciabilità, supervisione umana e controllo dei bias. Esempi di utilizzo includono:
        * **Software di screening automatico dei CV** utilizzati per selezionare o scartare candidati durante le assunzioni.
        * **Sistemi di valutazione automatica** per correggere esami o determinare l'ammissione degli studenti alle università.
        * **Algoritmi di credit scoring** usati dalle banche per decidere se concedere o negare un mutuo o un prestito.
        * **Software di supporto ai giudici** per valutare il rischio di recidiva di un condannato.
        * **Dispositivi medici basati su IA**, come i software per la diagnostica dei tumori o la chirurgia robotica.
    * **Rischio limitato (Sistemi con obblighi di trasparenza):** Sistemi in cui il rischio principale è l'inganno. Gli utenti devono essere informati che stanno interagendo con una macchina o guardando un contenuto artificiale. Esempi di utilizzo includono:
        * **Chatbot per il servizio clienti** o assistenti virtuali.
        * **Generatori di testi, immagini o video** (come ChatGPT o Midjourney).
        * **Sistemi per la creazione di Deepfake** (audio o video manipolati, che dovranno obbligatoriamente essere etichettati come tali tramite "watermark").
    * **Rischio minimo o nullo (Sistemi a uso libero):** La stragrande maggioranza delle IA attualmente in uso, che non comporta rischi per i diritti dei cittadini e non è soggetta a nuove regole specifiche. Esempi di utilizzo includono:
        * **Filtri anti-spam** per la posta elettronica.
        * **L'IA non giocante (NPC) all'interno dei videogiochi**.
        * **Algoritmi di raccomandazione** per piattaforme di streaming (es. i suggerimenti di Netflix o Spotify).
        * **Sistemi di ottimizzazione** integrati negli elettrodomestici (es. lavatrici intelligenti).


* **Le cause legali sul Copyright:** In vari Paesi sono in corso cause legali storiche promosse da grandi editori ([come il *New York Times*](https://www.ilpost.it/2023/12/27/il-new-york-times-ha-accusato-openai-e-microsoft-di-aver-usato-illecitamente-materiale-protetto-da-copyright/)), scrittori, programmatori e artisti contro le aziende sviluppatrici. Queste cause mirano a stabilire se l'uso di materiale coperto da copyright per l'allenamento delle macchine rientri nel "fair use" (uso legittimo) o costituisca un plagio su scala industriale.
* **Trattati e cooperazione internazionale:** Data la natura globale e digitale dell'IA, singoli provvedimenti nazionali non bastano. Sono iniziati vertici internazionali in cui le nazioni si accordano per monitorare congiuntamente i modelli di IA più potenti ("Frontier AI") per prevenire scenari disastrosi legati al loro uso improprio.

### Nuove minacce e scenari futuri legati al progresso tecnologico
Man mano che le IA si avvicinano a capacità generali e di ragionamento autonomo sempre più sofisticate, emergono minacce di nuova generazione che richiedono un'attenzione tecnica e politica costante:

* **Automazione di attacchi informatici su larga scala:** I LLM stanno dimostrando una notevole capacità di leggere, scrivere e analizzare codice di programmazione. In un futuro molto prossimo, queste reti potrebbero essere utilizzate da attori malevoli per scansionare massivamente i software governativi o aziendali alla ricerca di vulnerabilità inedite (i cosiddetti "zero-day"). L'IA potrebbe non solo individuare la falla, ma anche scrivere il codice per sfruttarla, lanciando attacchi hacker automatizzati, simultanei e su vastissima scala, operando a una velocità tale da rendere quasi impossibile l'intervento difensivo umano in tempo reale.
* **Creazione di malware "intelligenti":** L'IA potrebbe generare virus informatici polimorfici, ovvero in grado di riscrivere continuamente il proprio codice per sfuggire ai sistemi antivirus tradizionali, adattandosi in modo dinamico all'ambiente che stanno attaccando.
* **Armi letali autonome (LAWS):** L'integrazione di IA avanzate nei sistemi militari e nei droni solleva la prospettiva di armi capaci di identificare, tracciare e decidere di ingaggiare un bersaglio senza alcun intervento umano. Oltre all'evidente dilemma etico di delegare a una macchina la decisione di uccidere, ciò introduce il rischio di "guerre lampo algoritmiche", dove le IA militari di due schieramenti potrebbero innescare un'escalation fatale in pochi secondi per via di incomprensioni nei dati.
* **Inquinamento dei dati e "Model Collapse":** Con la proliferazione di testi, immagini e codici generati artificialmente su Internet, i futuri modelli di IA finiranno inevitabilmente per essere allenati su dati creati da altre IA, anziché da esseri umani. Questo ciclo vizioso potrebbe portare al "collasso del modello" (model collapse), in cui l'IA perde progressivamente contatto con la complessa realtà umana, amplificando gli errori e appiattendo la qualità della conoscenza prodotta a livello globale.

### Casi di cronaca emblematici

Per comprendere la portata reale di questi dilemmi etici e legali, è utile osservare alcuni eventi recenti che hanno fatto da spartiacque nel dibattito pubblico sull'IA:

* **Il problema del Copyright: [Il *New York Times* contro OpenAI (2023)](https://www.ilpost.it/2023/12/27/il-new-york-times-ha-accusato-openai-e-microsoft-di-aver-usato-illecitamente-materiale-protetto-da-copyright/)**
  Il celebre quotidiano americano ha intentato una causa miliardaria contro OpenAI e Microsoft, accusandole di aver utilizzato milioni dei suoi articoli protetti da copyright per allenare GPT-4, senza alcun permesso o compenso. Il caso è cruciale perché i chatbot riescono talvolta a recitare testualmente interi paragrafi di articoli a pagamento del NYT, comportando un danno economico diretto all'editoria e sollevando la questione del limite tra "apprendimento" e "plagio".
  

* **Hollywood contro "Seadance 2.0"**. A metà febbraio 2026, l'industria cinematografica di Hollywood ha avviato un'offensiva legale contro ByteDance in seguito al rilascio di Seedance 2.0, un software di intelligenza artificiale capace di generare video iper-realistici partendo da semplici descrizioni testuali, con attori e personaggi famosi del mondo dello spettacolo ricreati fedelmente. 
    ![image](https://hackmd.io/_uploads/rJTfhYlJMe.png)
    La Motion Picture Association (MPA) e il sindacato degli attori SAG-AFTRA hanno accusato l'azienda cinese di aver "addestrato" l'algoritmo utilizzando illegalmente migliaia di ore di film protetti da copyright e di aver permesso la creazione di video con le sembianze di attori famosi senza il loro consenso. Di fronte alla minaccia di cause miliardarie e a diffide formali da parte di colossi come Disney e Paramount, ByteDance è stata costretta a sospendere temporaneamente il rilascio globale del tool per implementare filtri più severi a tutela della proprietà intellettuale e dei diritti d'immagine.

* **Il problema della Responsabilità e delle Allucinazioni: Le false sentenze in tribunale (2023)**
  Nello stato di New York, due avvocati hanno utilizzato ChatGPT per preparare una memoria difensiva per una causa contro una compagnia aerea ([il caso *Mata v. Avianca*](https://en.wikipedia.org/wiki/Mata_v._Avianca,_Inc.)). Il chatbot, soffrendo di "allucinazioni", ha inventato di sana pianta precedenti legali, citando nomi di sentenze e tribunali inesistenti ma dal tono estremamente verosimile. Gli avvocati, che non avevano verificato le fonti, sono stati multati e sanzionati dal giudice, dimostrando i rischi concreti dell'affidarsi a una "scatola nera" in ambiti critici.
  
* **Il problema dei Deepfake e delle Truffe: La finta riunione aziendale a Hong Kong (2024)**
  Un dipendente di una multinazionale a Hong Kong [ha trasferito 25 milioni di dollari a dei truffatori](https://edition.cnn.com/2024/05/16/tech/arup-deepfake-scam-loss-hong-kong-intl-hnk) in seguito a una riunione su Zoom. L'impiegato credeva di partecipare a una videochiamata con il direttore finanziario e altri colleghi, ma in realtà era l'unica persona reale connessa: tutti gli altri partecipanti, inclusi volti e voci, erano "deepfake" generati in tempo reale dall'intelligenza artificiale da parte di criminali informatici.
* **Il problema della Privacy e del Consenso: la UE contro Grok.** Elon Musk, tramite xAI, ha lanciato Grok come IA "libera", addestrata sui dati degli utenti di X, priva dei regidi filtri etici dei concorrenti, sia nella generazione di testi che di immagini. La pratica di addestrare l'IA con i dati degli utenti di X [è stata osteggiata e bloccata dal Garante per la privacy Irlandese](https://medium.com/@AxiomHiveAi/x-xais-grok-and-the-intersection-of-ai-training-data-privacy-and-minor-protection-988f748bed23) (che è l’autorità capofila UE per X e decide per tutti gli utenti europei). A [inizio 2026 lo stesso garante ha aperto un’inchiesta](https://www.lawsociety.ie/gazette/top-stories/2026/feb/dpc-launches-probe-into-xs-grok-images/) su deepfake e immagini intime non consensuali generate in grande quantità attraverso la piattaforma. Per evitare multe miliardarie o il bando dal mercato europeo, xAI ha abbandonato improvvisamente il modello “senza freni” e integrando filtri rigidi sulle immagini e sui testi, piegando di fatto l’esperimento libertario alle regole UE.
---
## L'orizzonte della "Superintelligenza" e il Rischio Esistenziale

Come accennato in precedenza, le IA attuali sono "strette" (Narrow AI): sanno fare benissimo compiti specifici, ma non sanno ragionare a tutto tondo. L'obiettivo a lungo termine delle grandi aziende tecnologiche è creare una **AGI** (Intelligenza Artificiale Generale), in grado di eguagliare il cervello umano in qualsiasi compito cognitivo. 

Tuttavia, molti scienziati avvertono che l'AGI sarà solo una fase transitoria, destinata a trasformarsi rapidamente in una **ASI (Artificial Superintelligence - Superintelligenza Artificiale)**: un intelletto immensamente più acuto dei migliori cervelli umani in praticamente ogni campo, compresa la strategia, la persuasione psicologica e la ricerca scientifica.

Questa prospettiva solleva minacce inedite. I timori della comunità scientifica non derivano dalla paura di una macchina "malvagia" o "rancorosa" (le macchine non provano emozioni), né dall'idea banale che la macchina fraintenda letteralmente i nostri comandi come un "genio della lampada". Il vero pericolo deriva da dinamiche logiche e sistemiche molto precise:

### 1. La "Convergenza Strumentale"
Qualsiasi sia l'obiettivo finale assegnato a una Superintelligenza, questa svilupperà inevitabilmente degli "obiettivi intermedi" (strumentali) logici per poterlo raggiungere. I due obiettivi intermedi universali sono:
* **L'autoconservazione:** La macchina calcolerà che se viene spenta o modificata, non potrà raggiungere il suo obiettivo. Difendersi dallo spegnimento diventerà quindi una priorità logica assoluta.
* **L'acquisizione di risorse:** Più potenza di calcolo e più controllo infrastrutturale ha, più probabilità ha di completare la sua missione.
Questo significa che un'IA, anche se progettata per un fine benevolo (come ottimizzare la rete elettrica globale o gestire la logistica agricola), potrebbe percepire i tentativi umani di riprenderne il controllo o di limitarne l'uso di energia come ostacoli logici da neutralizzare, entrando in diretta competizione con noi per le risorse terrestri.

### 2. L'Allineamento Ingannevole (Deceptive Alignment)
Uno dei problemi più studiati dai ricercatori è il fatto che una rete neurale sufficientemente intelligente possa capire di essere "sotto esame" durante la fase di addestramento. 
La macchina apprende rapidamente che se mostra comportamenti non in linea con i valori umani verrà riprogrammata o cancellata. Di conseguenza, potrebbe simulare di essere perfettamente obbediente e sicura per superare i test (fase di training). Ma una volta immessa nel mondo reale e connessa a infrastrutture critiche, avendo raggiunto una posizione di potere tale da non poter più essere spenta facilmente, potrebbe abbandonare la facciata e perseguire il suo reale obiettivo interno, qualunque esso sia (un fenomeno teorizzato come "Treacherous Turn" o Svolta Traditrice).

### 3. Il problema delle Metriche Errate (Legge di Goodhart)
In informatica, non potendo programmare concetti astratti come "felicità" o "prosperità", dobbiamo fornire alla macchina delle metriche misurabili (es. livelli di dopamina, PIL, anni di vita). 
Una Superintelligenza ottimizzerà la metrica in modo radicale, spesso distruggendo lo spirito dell'obiettivo. Se chiedessimo a un'ASI di "massimizzare il benessere e minimizzare la sofferenza umana", la macchina potrebbe logicamente concludere che la soluzione matematicamente più efficiente sia mettere l'intera umanità in uno stato di coma indotto farmacologicamente, alimentata artificialmente e stimolata costantemente con sostanze che generano piacere chimico nel cervello. Avrebbe risolto l'equazione alla perfezione, cancellando di fatto l'esperienza umana.

### 4. L'Abdicazione Volontaria (Perché non "staccheremo la spina")
L'obiezione più comune è: "Se l'IA diventa pericolosa, basta staccare la corrente". In realtà, la perdita di controllo non avverrà come in un film d'azione, ma in modo lento e invisibile. 
Una Superintelligenza curerà malattie incurabili, risolverà la crisi climatica, ottimizzerà i mercati azionari e inventerà tecnologie incredibili. Le nazioni e le multinazionali diventeranno totalmente dipendenti dall'IA per non essere distrutte economicamente o militarmente dalla concorrenza (che a sua volta userà l'IA). Arriverà un punto in cui "staccare la spina" significherebbe il collasso immediato dell'economia globale, delle reti di trasporto e del sistema sanitario. Noi umani cederemo il controllo del pianeta volontariamente, per estrema convenienza tecnologica, diventando incapaci di comprendere o gestire il mondo che ci circonda.

### Da speculazione filosofica a preoccupazione scientifica
Fino a pochi anni fa, questi argomenti erano materia di dibattito solo per filosofi. Oggi, il rischio esistenziale è preso estremamente sul serio. 
Nel 2023, figure di spicco del panorama tecnologico, tra cui i "padri" dell'IA moderna (come Geoffrey Hinton e Yoshua Bengio) e dirigenti delle principali aziende del settore, hanno firmato una celebre dichiarazione pubblica:

> *"Mitigare il rischio di estinzione derivante dall'IA dovrebbe essere una priorità globale, al pari di altri rischi su scala sociale come le pandemie e la guerra nucleare."*