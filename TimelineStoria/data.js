
function toNumber(dateString) {
    if (typeof dateString !== 'string') return dateString;
    
    // Supporta "g/m/anno" o "gg/mm/anno", con l'anno eventualmente negativo e con zeri iniziali (es. -0044, 0878)
    const dateMatch = dateString.match(/^(\d{1,2})\/(\d{1,2})\/(-?)0*(\d+)$/);
    
    if (dateMatch) {
        const day = parseInt(dateMatch[1], 10);
        const month = parseInt(dateMatch[2], 10);
        const year = parseInt(dateMatch[3] + dateMatch[4], 10);

        const isLeapYear = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
        const daysInYear = isLeapYear ? 366 : 365;
        const daysInMonth = [31, (isLeapYear ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        let dayOfYear = day;
        for (let i = 0; i < month - 1; i++) {
            dayOfYear += daysInMonth[i];
        }

        const fraction = (dayOfYear - 1) / daysInYear;
        let decimalYear = year + fraction;

        return Math.round(decimalYear * 1000) / 1000;
    }

    // Fallback per anni semplici passando un solo numero
    const parts = dateString.split("/");
    if (parts.length === 1) {
        return parseFloat(parts[0]);
    }

    return parseFloat(dateString);
}

const timelineData = [
    // Formazione della Terra ed evoluzione primordiale (-4540000000 a -1000000001)
    { year: -4540000000, title: "Formazione della Terra e del Sistema Solare", category: "scienza", importance: 1 },
    { year: -4500000000, title: "Formazione della Luna (Ipotesi dell'impatto gigante con Theia)", category: "scienza", importance: 1 },
    { year: -4200000000, title: "Formazione del campo magnetico terrestre (protezione dell'atmosfera)", category: "scienza", importance: 2 },
    { year: -4000000000, title: "Fine dell'Intenso bombardamento tardivo e formazione dei primi oceani", category: "scienza", importance: 2 },
    { year: -3800000000, title: "Prime possibili tracce di vita (organismi unicellulari procarioti)", category: "scienza", importance: 1 },
    { year: -3500000000, title: "Formazione delle stromatoliti (più antichi fossili diretti conosciuti)", category: "scienza", importance: 2 },
    { year: -2400000000, title: "Grande Evento di Ossidazione (accumulo di ossigeno nell'atmosfera)", category: "scienza", importance: 1 },
    { year: -2000000000, title: "Comparsa delle prime cellule eucariote (con nucleo)", category: "scienza", importance: 1 },
    { year: -1500000000, title: "Sviluppo della riproduzione sessuata negli eucarioti", category: "scienza", importance: 2 },

    // Precambriano ed Eoni Geologici (-1000000000 a -1000001)
    { year: -1100000000, title: "Formazione del supercontinente Rodinia", category: "scienza", importance: 2 },
    { year: -1000000000, title: "Comparsa delle prime alghe pluricellulari", category: "scienza", importance: 2 },
    { year: -600000000, title: "Comparsa della Biota di Ediacara (primi organismi multicellulari complessi)", category: "scienza", importance: 2 },
    { year: -600000000, title: "Formazione dello strato di ozono (fondamentale per la vita sulle terre emerse)", category: "scienza", importance: 2 },
    { year: -600000000, title: "Comparsa dei primi animali semplici (es. spugne)", category: "scienza", importance: 2 },
    { year: -541000000, title: "Esplosione Cambriana (rapida diversificazione della vita)", category: "scienza", importance: 1 },
    { year: -485000000, title: "Diversificazione dei primi vertebrati (Agnati/Pesci senza mascelle)", category: "scienza", importance: 2 },
    { year: -440000000, title: "Estinzione di massa dell'Ordoviciano-Siluriano", category: "scienza", importance: 2 },
    { year: -400000000, title: "Primi insetti e piante terrestri vascolari", category: "scienza", importance: 2 },
    { year: -375000000, title: "Estinzione di massa del Devoniano superiore", category: "scienza", importance: 2 },
    { year: -360000000, title: "Primi tetrapodi (vertebrati terrestri)", category: "scienza", importance: 2 },
    { year: -252000000, title: "Estinzione di massa del Permiano-Triassico (la più letale)", category: "scienza", importance: 1 },
    { year: -230000000, title: "Comparsa dei primi dinosauri", category: "scienza", importance: 1 },
    { year: -201300000, title: "Estinzione di massa del Triassico-Giurassico", category: "scienza", importance: 2 },
    { year: -200000000, title: "Inizio della frammentazione della Pangea", category: "scienza", importance: 2 },
    { year: -200000000, title: "Comparsa dei primi mammiferi", category: "scienza", importance: 2 },
    { year: -150000000, title: "Comparsa dei primi uccelli (Archaeopteryx)", category: "scienza", importance: 2 },
    { year: -55500000, title: "Massimo termico del Paleocene-Eocene (rapido riscaldamento globale)", category: "scienza", importance: 2 },
    { year: -55000000, title: "Comparsa dei primi primati", category: "scienza", importance: 2 },
    { year: -50000000, title: "Collisione tra India e Asia e inizio della formazione dell'Himalaya", category: "scienza", importance: 2 },
    { year: -49000000, title: "Evento Azolla: massiccio assorbimento di CO2 e raffreddamento globale", category: "scienza", importance: 3 },
    { year: -34000000, title: "Apertura del Passaggio di Drake e inizio della glaciazione permanente dell'Antartide", category: "scienza", importance: 2 },
    { year: -20000000, title: "Comparsa delle prime grandi scimmie (Hominidae)", category: "scienza", importance: 2 },
    { year: -14000000, title: "Separazione della linea evolutiva di scimpanzé, umani e gorilla da quella degli oranghi", category: "scienza", importance: 3 },
    { year: -10000000, title: "Separazione della linea evolutiva di umani e scimpanzé da quella dei gorilla", category: "scienza", importance: 3 },
    { year: -7000000, title: "Separazione tra la linea evolutiva umana e quella degli scimpanzé", category: "scienza", importance: 2 },
    { year: -7000000, title: "Primi ominidi bipedi (es. Sahelanthropus)", category: "scienza", importance: 1 },
    { year: -5960000, title: "Crisi di salinità del Messiniano (prosciugamento del Mar Mediterraneo)", category: "scienza", importance: 3 },
    { year: -5330000, title: "Inondazione Zancleana: riempimento catastrofico del Mar Mediterraneo", category: "scienza", importance: 3 },
    { year: -3900000, title: "Comparsa di Australopithecus afarensis (es. fossile 'Lucy')", category: "scienza", importance: 2 },
    { year: -3300000, title: "Primi utensili in pietra (Lomekwi)", category: "tecnologia", importance: 2 },
    { year: -3000000, title: "Grande scambio biotico americano (connessione tra Nord e Sud America)", category: "scienza", importance: 3 },
    { year: -3000000, title: "Perdita della pelliccia corporea negli ominidi (adattamento alla savana e sudorazione)", category: "scienza", importance: 2 },
    { year: -2600000, title: "Comparsa di Homo habilis e sviluppo della tecnologia litica olduvaiana (chopper)", category: "scienza", importance: 1 },
    { year: -1900000, title: "Comparsa di Homo erectus e prime migrazioni fuori dall'Africa", category: "scienza", importance: 2 },
    { year: -1500000, title: "Sviluppo dell'industria litica acheuleana (amigdale)", category: "tecnologia", importance: 3 },
    { year: -1200000, title: "Evoluzione della pelle scura negli ominidi (protezione UV)", category: "scienza", importance: 2 },

    // Paleolitico e Prima Evoluzione Umana (-1000000 a -10001)
    { year: -1000000, title: "Scoperta e controllo del fuoco (Homo erectus)", category: "tecnologia", importance: 1 },
    { year: -600000, title: "Comparsa dell'Homo heidelbergensis", category: "scienza", importance: 3 },
    { year: -500000, title: "Sviluppo dei primi ripari artificiali e lance in legno", category: "tecnologia", importance: 2 },
    { year: -400000, title: "Comparsa dell'Uomo di Neanderthal in Eurasia", category: "scienza", importance: 2 },
    { year: -300000, title: "Comparsa dei primi Homo sapiens (Africa)", category: "scienza", importance: 1 },
    { year: -160000, title: "Homo sapiens idaltu (Africa), sottospecie di Homo sapiens", category: "scienza", importance: 2 },
    { year: -100000, title: "Prime sepolture umane intenzionali", category: "cultura", importance: 2 },
    { year: -74000, title: "Eruzione del supervulcano Toba e possibile collo di bottiglia genetico umano", category: "scienza", importance: 2 },
    { year: -70000, title: "Inizio della Rivoluzione Cognitiva e linguaggio complesso", category: "cultura", importance: 1 },
    { year: -65000, title: "Invenzione dell'arco e delle frecce", category: "tecnologia", importance: 2 },
    { year: -65000, title: "Principale ondata migratoria fuori dall'Africa e popolamento dell'Australia", category: "politica", importance: 2 },
    { year: -60000, title: "Ibridazione genetica tra Homo sapiens, Neanderthal e Denisoviani", category: "scienza", importance: 2 },
    { year: -50000, title: "Inizio del Paleolitico superiore (piena modernità comportamentale)", category: "cultura", importance: 2 },
    { year: -50000, title: "Estinzione dell'Homo floresiensis ('Hobbit')", category: "scienza", importance: 3 },
    { year: -50000, title: "Invenzione dell'ago da cucito e primi vestiti complessi", category: "tecnologia", importance: 3 },
    { year: -40000, title: "Presenza dei Denisoviani in Asia", category: "scienza", importance: 2 },
    { year: -40000, title: "Fioritura dell'arte parietale (pitture rupestri in Europa e Asia)", category: "cultura", importance: 1 },
    { year: -30000, title: "Scomparsa definitiva dell'Uomo di Neanderthal", category: "scienza", importance: 2 },
    { year: -30000, title: "Evoluzione della pelle chiara nelle popolazioni migrate alle alte latitudini", category: "scienza", importance: 2 },
    { year: -25000, title: "Realizzazione delle prime Veneri paleolitiche (es. Venere di Willendorf)", category: "cultura", importance: 3 },
    { year: -20000, title: "Osso di Ishango (prime evidenze di conteggio matematico e calcolo)", category: "scienza", importance: 3 },
    { year: -15000, title: "Prime migrazioni umane nelle Americhe (Beringia)", category: "politica", importance: 2 },
    { year: -14000, title: "Cultura natufiana nel Levante (primi segni di sedentarizzazione pre-agricola)", category: "cultura", importance: 3 },
    { year: -12000, title: "Addomesticamento del lupo (primi cani)", category: "tecnologia", importance: 2 },

    // Preistoria e Protostoria (-10000 a -2001)
    { year: -9700, title: "Estinzione della megafauna del Pleistocene", category: "scienza", importance: 2 },
    { year: -10000, title: "Rivoluzione Neolitica: nascita di agricoltura e allevamento", category: "scienza", importance: 1 },
    { year: -9000, title: "Primi insediamenti a Gerico", category: "cultura", importance: 2 },
    { year: -8000, title: "Prime imbarcazioni note (es. Canoa di Pesse)", category: "tecnologia", importance: 3 },
    { year: -8000, title: "Addomesticamento del riso in Asia orientale", category: "tecnologia", importance: 2 },
    { year: -7500, title: "Addomesticamento del gatto nel Vicino Oriente", category: "tecnologia", importance: 2 },
    { year: -7000, title: "Addomesticamento del teosinte (primo mais) in Mesoamerica", category: "tecnologia", importance: 2 },
    { year: -6000, title: "Invenzione della tessitura e dei primi telai manuali", category: "tecnologia", importance: 2 },
    { year: -6000, title: "Diffusione della ceramica nel Vicino Oriente (inizio del Neolitico ceramico)", category: "tecnologia", importance: 3 },
    { year: -4000, title: "Sviluppo della città di Uruk in Mesopotamia", category: "politica", importance: 2 },
    { year: -4000, title: "Invenzione dell'aratro in Mesopotamia", category: "tecnologia", importance: 1 },
    { year: -3800, title: "Inizio dell'Età del Bronzo antico nel Vicino Oriente", category: "tecnologia", importance: 2 },
    { year: -3600, title: "Costruzione dei Templi megalitici di Malta", category: "cultura", importance: 3 },
    { year: -3500, title: "Invenzione della barca a vela in Mesopotamia ed Egitto", category: "tecnologia", importance: 1 },
    { year: -3500, title: "Inizio delle migrazioni indoeuropee (Cultura Kurgan/Yamnaya)", category: "politica", importance: 2 },
    { year: -3500, title: "Invenzione della ruota in Mesopotamia per il trasporto su carro", category: "tecnologia", importance: 1 },
    { year: -3200, title: "Invenzione della scrittura cuneiforme a Uruk", category: "cultura", importance: 1 },
    { year: -3150, title: "Invenzione della scrittura geroglifica in Egitto", category: "cultura", importance: 2 },
    { year: -3000, title: "Inizio della costruzione di Stonehenge", category: "cultura", importance: 2 },
    { year: -3000, title: "Addomesticamento del cavallo", category: "tecnologia", importance: 2 },
    { year: -3000, title: "Fioritura della civiltà di Caral-Supe in Perù (la più antica civiltà delle Americhe)", category: "cultura", importance: 3 },
    { year: -2900, title: "Inizio del Periodo Protodinastico in Mesopotamia (Città-stato sumere)", category: "politica", importance: 2 },
    { year: -2800, title: "Sviluppo della civiltà minoica a Creta", category: "cultura", importance: 3 },
    { year: -2700, title: "Regno del faraone Djoser (costruzione della Piramide a gradoni di Saqqara)", category: "politica", importance: 2 },
    { year: -2600, title: "Costruzione della Grande Piramide di Giza (Faraone Cheope)", category: "tecnologia", importance: 1 },
    { year: -2500, title: "Fioritura della civiltà della valle dell'Indo (città di Mohenjo-daro e Harappa)", category: "cultura", importance: 2 },
    { year: -2400, title: "Codice di Urukagina (prima riforma legislativa nota)", category: "politica", importance: 3 },
    { year: -2334, title: "Sargon di Akkad fonda l'Impero Accadico (primo impero della storia)", category: "politica", importance: 1 },
    { year: -2250, title: "Regno di Naram-Sin di Akkad (massima espansione dell'Impero Accadico)", category: "politica", importance: 3 },
    { year: -2150, title: "Caduta dell'Impero Accadico e inizio del Primo periodo intermedio in Egitto", category: "politica", importance: 2 },
    { year: -2112, title: "Fondazione della Terza dinastia di Ur (Ur-Nammu)", category: "politica", importance: 2 },
    { year: -2100, title: "Costruzione della Ziggurat di Ur", category: "cultura", importance: 2 },
    { year: -2100, title: "Codice di Ur-Nammu (più antico codice di leggi scritto giunto a noi)", category: "politica", importance: 2 },
    { year: -2100, title: "Prime versioni scritte dell'Epopea di Gilgamesh", category: "cultura", importance: 1 },
    { year: -2070, title: "Fondazione tradizionale della Dinastia Xia in Cina (Yu il Grande)", category: "politica", importance: 2 },

    // Età Antica (-2000 a -1)
    { year: -2000, title: "Costruzione dei primi palazzi cretesi (Cnosso, Festo, Mallia) - inizio della fase protopalaziale minoica", category: "cultura", importance: 3 },
    { year: -1850, title: "Sviluppo dell'alfabeto proto-sinaitico (primo sistema alfabetico)", category: "tecnologia", importance: 2 },
    { year: -1700, title: "Distruzione e ricostruzione dei palazzi cretesi - inizio della fase neopalaziale (massimo splendore minoico)", category: "cultura", importance: 2 },
    { year: -1700, title: "Declino della Civiltà della Valle dell'Indo", category: "cultura", importance: 2 },
    { year: -1650, title: "Ascesa dell'Antico Regno Ittita in Anatolia", category: "politica", importance: 3 },
    { year: -1600, title: "Sviluppo della civiltà micenea in Grecia", category: "politica", importance: 2 },
    { year: -1600, title: "Eruzione vulcanica di Thera (Santorini) e inizio del declino minoico", category: "scienza", importance: 2 },
    { year: -1595, title: "Sacco di Babilonia da parte degli Ittiti", category: "politica", importance: 3 },
    // { year: -1500, title: "Composizione dei primi Veda in India", category: "cultura", importance: 2 },
    { year: -1550, title: "Più antichi reperti in ceramica rinvenuti a Roma (Area di Sant'Omobono)", category: "cultura", importance: 2 },
    { year: -1535, title: "Piramide di Ahmose I, ultima piramide regale costruita in Egitto", category: "cultura", importance: 2 },
    { year: -1478, title: "Inizio del regno del faraone donna Hatshepsut in Egitto", category: "politica", importance: 3 },
    { year: -1450, title: "Crollo della civiltà minoica e dominio miceneo a Creta", category: "politica", importance: 2 },
    { year: -1353, title: "Riforma religiosa di Akhenaton in Egitto (Atonismo)", category: "cultura", importance: 2 },
    { year: -1336, title: "Tutankhamon diventa Faraone", category: "politica", importance: 3 },
    { year: -1300, title: "Sviluppo della scrittura sulle ossa oracolari in Cina", category: "cultura", importance: 2 },
    { year: -1279, title: "Inizio del regno di Ramses II in Egitto (promotore di grandi opere come Abu Simbel)", category: "politica", importance: 2 },
    { year: -1274, title: "Battaglia di Qadesh (Egizi contro Ittiti) e primo trattato di pace noto", category: "politica", importance: 2 },
    { year: -1250, title: "Datazione tradizionale dell'Esodo biblico", category: "cultura", importance: 3 },
    { year: -1200, title: "Collasso dell'Età del Bronzo (Invasioni dei Popoli del Mare)", category: "politica", importance: 2 },
    { year: -1200, title: "Nascita dello Zoroastrismo (Zarathustra), tra le prime religioni monoteistiche", category: "cultura", importance: 2 },
    { year: -1184, title: "Caduta di Troia (data tradizionale)", category: "cultura", importance: 3 },
    { year: -1050, title: "Sviluppo dell'alfabeto fenicio", category: "tecnologia", importance: 1 },
    { year: -1046, title: "Battaglia di Muye: ascesa della dinastia Zhou in Cina", category: "politica", importance: 2 },
    { year: -1000, title: "Inizio dell'Età del Ferro in Grecia", category: "tecnologia", importance: 2 },
    { year: -1000, title: "Regno di Davide in Israele", category: "politica", importance: 2 },
    { year: -957, title: "Completamento del Tempio di Salomone a Gerusalemme", category: "cultura", importance: 2 },
    { year: -931, title: "Divisione in Regno di Israele e Regno di Giuda", category: "politica", importance: 3 },
    { year: -911, title: "Nascita dell'Impero Neo-Assiro", category: "politica", importance: 2 },
    { year: -814, title: "Fondazione di Cartagine da parte dei Fenici", category: "politica", importance: 2 },
    { year: -800, title: "Poemi omerici (Iliade e Odissea)", category: "cultura", importance: 1 },
    { year: -776, title: "Si disputano a Olimpia i primi Giochi Olimpici antichi in onore di Zeus, tregua tra le poleis greche", category: "cultura", importance: 1 },
    { year: -753, title: "Fondazione di Roma da parte di Romolo secondo la leggenda", category: "politica", importance: 1 },
    { year: -722, title: "Caduta del Regno di Israele", category: "politica", importance: 2 },
    { year: -722, title: "Inizio periodo delle Primavere e Autunni in Cina", category: "politica", importance: 2 },
    { year: -660, title: "Fondazione tradizionale del Giappone (Imperatore Jimmu)", category: "politica", importance: 3 },
    { year: -650, title: "Invenzione delle prime monete metalliche in Lidia", category: "tecnologia", importance: 1 },
    { year: -612, title: "Caduta di Ninive e fine dell'Impero Neo-Assiro", category: "politica", importance: 2 },
    { year: -605, title: "Nabucodonosor II diventa re di Babilonia", category: "politica", importance: 3 },
    { year: -600, title: "Giardini pensili di Babilonia", category: "cultura", importance: 3 },
    { year: -594, title: "Riforme di Solone ad Atene", category: "politica", importance: 3 },
    { year: -586, title: "Distruzione del Primo Tempio di Gerusalemme e prigionia babilonese", category: "politica", importance: 2 },
    { year: toNumber("28/05/-584"), title: "Talete di Mileto predice un'eclissi solare totale, nasce la filosofia presocratica", category: "scienza", importance: 2 },
    { year: -551, title: "Nascita di Confucio", category: "cultura", importance: 2 },
    { year: -550, title: "Ciro il Grande fonda l'Impero Achemenide (Persiano)", category: "politica", importance: 2 },
    { year: -528, title: "Siddhartha Gautama raggiunge l'illuminazione (Buddha)", category: "cultura", importance: 2 },
    { year: -509, title: "Nascita della Repubblica Romana", category: "politica", importance: 1 },
    { year: -508, title: "Riforme di Clistene e democrazia ateniese", category: "politica", importance: 2 },
    { year: -500, title: "Stesura de 'L'Arte della Guerra' di Sun Tzu", category: "cultura", importance: 3 },
    { year: -499, title: "Inizio della Rivolta Ionica contro l'Impero Persiano", category: "politica", importance: 3 },
    { year: toNumber("12/09/-490"), title: "Battaglia di Maratona", category: "politica", importance: 2 },
    { year: toNumber("27/08/-479"), title: "Battaglia di Platea e fine dell'invasione persiana in Grecia", category: "politica", importance: 3 },
    { year: -461, title: "Inizio dell'Età di Pericle ad Atene (apogeo democratico e culturale greco)", category: "politica", importance: 2 },
    { year: -460, title: "Democrito formula la teoria atomica dell'universo", category: "scienza", importance: 3 },
    { year: -451, title: "Stesura delle Leggi delle XII tavole a Roma", category: "politica", importance: 3 },
    { year: -449, title: "Pace di Callia (fine delle guerre greco-persiane)", category: "politica", importance: 4 },
    { year: -432, title: "Completamento del Partenone ad Atene", category: "cultura", importance: 2 },
    { year: -431, title: "Inizio Guerra del Peloponneso", category: "politica", importance: 2 },
    { year: toNumber("25/04/-404"), title: "Fine della Guerra del Peloponneso (vittoria di Sparta)", category: "politica", importance: 3 },
    { year: -400, title: "Ippocrate stabilisce i fondamenti della medicina", category: "scienza", importance: 3 },
    { year: toNumber("15/02/-399"), title: "Morte di Socrate (data stimata)", category: "cultura", importance: 2 },
    { year: toNumber("18/07/-390"), title: "Sacco di Roma da parte dei Galli Senoni di Brenno (Dies Alliensis)", category: "politica", importance: 3 },
    { year: -343, title: "Inizio delle Guerre Sannitiche (affermazione dell'egemonia romana in Italia)", category: "politica", importance: 3 },
    { year: toNumber("02/08/-338"), title: "Battaglia di Cheronea (Macedonia conquista la Grecia)", category: "politica", importance: 3 },
    { year: -332, title: "Alessandro Magno conquista l'Egitto", category: "politica", importance: 1 },
    { year: toNumber("01/10/-331"), title: "Battaglia di Gaugamela (Alessandro Magno sconfigge l'Impero Persiano)", category: "politica", importance: 2 },
    { year: toNumber("07/04/-331"), title: "Fondazione di Alessandria d'Egitto", category: "politica", importance: 2 },
    { year: toNumber("10/06/-323"), title: "Morte di Alessandro Magno", category: "politica", importance: 1 },
    { year: -322, title: "Inizio delle Guerre dei Diadochi (spartizione dell'impero di Alessandro Magno)", category: "politica", importance: 3 },
    { year: -312, title: "Inizio della costruzione della Via Appia", category: "tecnologia", importance: 3 },
    { year: -285, title: "Fondazione della Biblioteca di Alessandria d'Egitto", category: "cultura", importance: 2 },
    { year: -280, title: "Inizio della Guerra pirrica", category: "politica", importance: 3 },
    { year: -280, title: "Costruzione del Faro di Alessandria", category: "tecnologia", importance: 3 },
    { year: -268, title: "Ashoka il Grande sale al trono (apogeo dell'Impero Maurya)", category: "politica", importance: 2 },
    { year: -264, title: "Inizio Prima Guerra Punica", category: "politica", importance: 2 },
    { year: toNumber("10/03/-241"), title: "Fine della Prima Guerra Punica (Battaglia delle Egadi)", category: "politica", importance: 3 },
    { year: -240, title: "Eratostene calcola la circonferenza della Terra", category: "scienza", importance: 2 },
    { year: -221, title: "Unificazione della Cina (Dinastia Qin)", category: "politica", importance: 1 },
    { year: -218, title: "Inizio Seconda Guerra Punica: Annibale attraversa le Alpi", category: "politica", importance: 2 },
    { year: toNumber("02/08/-216"), title: "Battaglia di Canne", category: "politica", importance: 2 },
    { year: -214, title: "Inizio costruzione della Grande Muraglia Cinese (dinastia Qin)", category: "tecnologia", importance: 2 },
    { year: -210, title: "Completamento dell'Esercito di Terracotta per la tomba di Qin Shi Huang", category: "cultura", importance: 3 },
    { year: toNumber("28/02/-206"), title: "Fondazione della Dinastia Han in Cina", category: "politica", importance: 2 },
    { year: toNumber("19/10/-202"), title: "Battaglia di Zama (Scipione sconfigge Annibale)", category: "politica", importance: 2 },
    { year: toNumber("22/06/-168"), title: "Battaglia di Pidna (i Romani sconfiggono la Macedonia)", category: "politica", importance: 3 },
    { year: -150, title: "Creazione della Macchina di Anticitera (primo calcolatore analogico)", category: "tecnologia", importance: 2 },
    { year: -149, title: "Inizio della Terza Guerra Punica", category: "politica", importance: 2 },
    { year: -146, title: "Distruzione di Cartagine e Corinto (fine delle Guerre Puniche)", category: "politica", importance: 1 },
    { year: -133, title: "Assassinio di Tiberio Gracco (inizio crisi della Repubblica Romana)", category: "politica", importance: 3 },
    { year: -130, title: "Apertura della Via della Seta", category: "tecnologia", importance: 2 },
    { year: -130, title: "Primo catalogo stellare di Ipparco", category: "scienza", importance: 2 },
    { year: -104, title: "Riforme dell'esercito romano di Gaio Mario", category: "politica", importance: 3 },
    { year: -73, title: "Rivolta di Spartaco", category: "politica", importance: 2 },
    { year: -60, title: "Formazione del Primo Triumvirato a Roma (Cesare, Pompeo, Crasso)", category: "politica", importance: 2 },
    { year: -50, title: "Giulio Cesare completa la conquista della Gallia", category: "politica", importance: 2 },
    { year: toNumber("10/01/-49"), title: "Giulio Cesare attraversa il Rubicone (inizio della Guerra Civile)", category: "politica", importance: 2 },
    { year: toNumber("15/03/-44"), title: "Idi di marzo, una congiura guidata da Bruto e Cassio uccide Giulio Cesare ai piedi della statua di Pompeo", category: "politica", importance: 1 },
    { year: toNumber("27/11/-43"), title: "Formazione del Secondo Triumvirato a Roma (Lex Titia)", category: "politica", importance: 3 },
    { year: toNumber("16/01/-27"), title: "Nascita dell'Impero Romano (Augusto)", category: "politica", importance: 1 },
    { year: -18, title: "Fondazione dei Tre Regni di Corea (Silla, Goguryeo, Baekje)", category: "politica", importance: 3 },
    { year: -4, title: "Nascita di Gesù di Nazareth (data stimata)", category: "cultura", importance: 1 },

    // I Millennio d.C. (1 - 1000)
    { year: 9, title: "Battaglia della foresta di Teutoburgo (i Germani fermano l'espansione romana)", category: "politica", importance: 2 },
    // CORRETTO: Augusto si spense a Nola il 19 agosto del 14 d.C.
    { year: toNumber("19/08/14"), title: "Morte di Augusto e successione di Tiberio (consolidamento del sistema imperiale romano)", category: "politica", importance: 2 },
    { year: 25, title: "Restaurazione della Dinastia Han in Cina (Han Orientali)", category: "politica", importance: 2 },
    // CORRETTO: La datazione astronomica e storica più accreditata la colloca al 3 aprile del 33 d.C.
    { year: toNumber("03/04/33"), title: "Crocifissione di Gesù", category: "cultura", importance: 1 },
    { year: 43, title: "Inizio della conquista romana della Britannia", category: "politica", importance: 2 },
    { year: 47, title: "Fondazione di Londinium (Londra) da parte dei Romani", category: "politica", importance: 2 },
    { year: 69, title: "Anno dei quattro imperatori a Roma", category: "politica", importance: 3 },
    // CORRETTO: Le mura crollarono e il Tempio bruciò il 30 agosto del 70 d.C. (9 di Av nel calendario ebraico)
    { year: toNumber("30/08/70"), title: "Distruzione del Tempio di Gerusalemme e inizio della grande diaspora", category: "politica", importance: 1 },
    // CORRETTO: La datazione archeologica e numismatica moderna attesta l'evento al 24 ottobre del 79 d.C.
    { year: toNumber("24/10/79"), title: "Eruzione del Vesuvio (Pompei)", category: "scienza", importance: 2 },
    { year: 80, title: "Completamento del Colosseo a Roma", category: "cultura", importance: 2 },
    { year: 105, title: "Invenzione della carta in Cina (Cai Lun)", category: "tecnologia", importance: 1 },
    // CORRETTO: Traiano morì l'8 agosto 117 d.C., momento in cui l'Impero raggiunse i suoi confini massimi
    { year: toNumber("08/08/117"), title: "Massima espansione dell'Impero Romano", category: "politica", importance: 1 },
    { year: 122, title: "Inizio della costruzione del Vallo di Adriano in Britannia", category: "politica", importance: 3 },
    { year: 125, title: "Completamento del Pantheon a Roma sotto Adriano", category: "cultura", importance: 2 },
    { year: 132, title: "Zhang Heng inventa il primo sismoscopio della storia in Cina", category: "tecnologia", importance: 3 },
    { year: 135, title: "Fine della Rivolta di Bar Kokhba e definitiva espulsione degli Ebrei dalla Giudea", category: "politica", importance: 2 },
    // CORRETTO: Marco Aurelio salì al trono il 7 marzo 161 d.C. dopo la morte di Antonino Pio
    { year: toNumber("07/03/161"), title: "Marco Aurelio imperatore", category: "politica", importance: 3 },
    { year: 166, title: "Peste Antonina nell'Impero Romano", category: "scienza", importance: 2 },
    { year: 184, title: "Rivolta dei Turbanti Gialli in Cina", category: "politica", importance: 3 },

    
    { year: 202, title: "Editto di Settimio Severo (inizio persecuzioni contro cristiani ed ebrei nell'Impero)", category: "politica", importance: 3 },
    // CORRETTO: La battaglia si consumò nell'inverno del 208 d.C. Mantenuto l'anno intero per precisione.
    { year: 208, title: "Battaglia delle Scogliere Rosse: Cao Cao viene sconfitto, ponendo le basi per i Tre Regni in Cina", category: "politica", importance: 2 },
    // CORRETTO: Promulgata dall'imperatore Caracalla nel corso del 212 d.C. (lasciato intero per mancanza di datazione giornaliera certa)
    { year: 212, title: "Constitutio Antoniniana (cittadinanza romana a tutti gli uomini liberi dell'Impero)", category: "politica", importance: 2 },
    { year: 220, title: "Fine della Dinastia Han e inizio del periodo dei Tre Regni in Cina", category: "politica", importance: 2 },
    // CORRETTO: Il regno di Alessandro Severo iniziò formalmente il 13 marzo 222 dopo l'assassinio di Eliogabalo
    { year: toNumber("13/03/222"), title: "Inizio del regno di Alessandro Severo, sincretismo e tolleranza religiosi a Roma", category: "politica", importance: 3 },
    { year: 224, title: "Fondazione dell'Impero Sasanide in Persia", category: "politica", importance: 2 },
    { year: 226, title: "Ardashir I incoronato 'Re dei Re', si consolida l'espansione dell'Impero Sasanide", category: "politica", importance: 3 },
    { year: 235, title: "Inizio della Crisi del III secolo nell'Impero Romano", category: "politica", importance: 2 },
    { year: 239, title: "La regina Himiko di Yamatai (Giappone) invia i primi ambasciatori alla corte Wei in Cina", category: "politica", importance: 2 },
    { year: 250, title: "Inizio del Periodo Classico della civiltà Maya", category: "cultura", importance: 2 },
    // CORRETTO: L'editto sistematico venne emanato il 20 gennaio 250
    { year: toNumber("20/01/250"), title: "Editto di Decio (gennaio): impone sacrifici agli dei di Stato, innesca la prima persecuzione sistematica dei cristiani", category: "politica", importance: 3 },
    { year: 250, title: "Diofanto di Alessandria scrive l''Arithmetica', getta le basi dell'algebra", category: "scienza", importance: 3 },
    // CORRETTO: Il secondo editto repressivo fu emesso ad agosto del 258; Papa Sisto II fu giustiziato il 6 agosto 258
    { year: toNumber("06/08/258"), title: "Secondo editto di Valeriano: inasprimento delle persecuzioni, esecuzione di papa Sisto II e San Cipriano ", category: "politica", importance: 3 },
    // CORRETTO: La cattura di Valeriano ad opera di Sapore I avvenne tra maggio e giugno del 260 d.C.
    { year: toNumber("01/06/260"), title: "Battaglia di Edessa: l'imperatore romano Valeriano catturato da Shapur I", category: "politica", importance: 2 },
    // CORRETTO: La ribellione e proclamazione di Postumo avvenne nell'estate del 260 d.C.
    { year: toNumber("01/07/260"), title: "Secessione dell'Impero delle Gallie sotto Postumo, apice della Crisi del III secolo", category: "politica", importance: 2 },
    { year: 267, title: "Zenobia avvia l'espansione dell'Impero di Palmira in Medio Oriente", category: "politica", importance: 3 },
    { year: 270, title: "Plotino e Porfirio sistematizzano il pensiero neoplatonico con la stesura delle 'Enneadi'", category: "cultura", importance: 3 },
    // CORRETTO: La costruzione fu avviata nella primavera del 271 d.C.
    { year: toNumber("01/04/271"), title: "Aureliano avvia la costruzione delle Mura Aureliane per difendere Roma dalle incursioni barbare", category: "tecnologia", importance: 2 },
    // CORRETTO: La caduta di Jianye e la resa di Sun Hao avvennero il 1° maggio 280 d.C.
    { year: toNumber("01/05/280"), title: "La dinastia Jin conquista il regno di Wu, fine del periodo dei Tre Regni", category: "politica", importance: 2 },
    { year: 284, title: "Diocleziano imperatore (fine della Crisi del III secolo e istituzione della Tetrarchia)", category: "politica", importance: 2 },
    { year: 301, title: "L'Armenia è la prima nazione ad adottare il Cristianesimo come religione di Stato", category: "politica", importance: 3 },
    // CORRETTO: Lo scontro celebre avvenne il 28 ottobre 312
    { year: toNumber("28/10/312"), title: "Battaglia di Ponte Milvio (Costantino sconfigge Massenzio)", category: "politica", importance: 2 },

    { year: toNumber("13/06/0313"), title: "Editto di Milano (Costantino)", category: "cultura", importance: 1 },
    { year: toNumber("20/05/0325"), title: "Concilio di Nicea", category: "cultura", importance: 2 },
    { year: toNumber("11/05/0330"), title: "Costantinopoli diventa la nuova capitale dell'Impero Romano", category: "politica", importance: 2 },
    { year: toNumber("09/08/0378"), title: "Battaglia di Adrianopoli (i Goti sconfiggono l'imperatore Valente)", category: "politica", importance: 2 },
    { year: toNumber("27/02/0380"), title: "Editto di Tessalonica (il Cristianesimo diventa religione di Stato romana)", category: "politica", importance: 2 },
    { year: toNumber("17/01/0395"), title: "Morte di Teodosio I e definitiva divisione tra Impero d'Occidente e d'Oriente", category: "politica", importance: 1 },
    { year: 397, title: "'Le Confessioni' (Sant'Agostino)", category: "cultura", importance: 3 },
    { year: toNumber("01/03/415"), title: "Assassinio della filosofa e matematica Ipazia ad Alessandria d'Egitto", category: "cultura", importance: 3 },
    { year: toNumber("25/03/421"), title: "Fondazione tradizionale di Venezia con la consacrazione della chiesa di San Giacometto a Rialto", category: "politica", importance: 3 },
    { year: toNumber("20/06/0451"), title: "Battaglia dei Campi Catalaunici (Attila viene fermato da Romani e Visigoti)", category: "politica", importance: 2 },

    { year: toNumber("04/09/476"), title: "Caduta dell'Impero Romano d'Occidente con la deposizione di Romolo Augustolo da parte di Odoacre", category: "politica", importance: 1 },
    { year: toNumber("01/05/481"), title: "Clodoveo I succede al padre Childerico I come re dei Franchi Sali, avviando la dinastia merovingia", category: "politica", importance: 3 },
    { year: toNumber("15/03/493"), title: "Teodorico il Grande uccide Odoacre a Ravenna, fondazione del Regno Ostrogoto in Italia", category: "politica", importance: 3 },
    
    { year: toNumber("01/05/529"), title: "Benedetto da Norcia fonda l'Abbazia di Montecassino e redige la Regola benedettina", category: "cultura", importance: 3 },
    { year: toNumber("01/08/535"), title: "Inizio della Guerra Gotica in Italia con lo sbarco del generale Belisario in Sicilia", category: "politica", importance: 2 },
    { year: toNumber("13/10/538"), title: "Introduzione ufficiale del Buddismo in Giappone secondo la cronologia tradizionale dell'universo Heian", category: "cultura", importance: 3 },
    { year: toNumber("18/06/618"), title: "Il generale Li Yuan si proclama imperatore Gaozu, fondando la Dinastia Tang in Cina", category: "politica", importance: 2 },
    { year: toNumber("16/07/622"), title: "L'Egira: Maometto e i suoi seguaci lasciano la Mecca per Medina, data di inizio del calendario islamico", category: "cultura", importance: 1 },
    { year: toNumber("12/12/627"), title: "Battaglia di Ninive: decisiva vittoria bizantina di Eraclio I contro l'Impero Sasanide", category: "politica", importance: 3 },
    { year: toNumber("20/08/636"), title: "Battaglia dello Yarmuk: decisiva vittoria araba contro i bizantini e conquista della Siria", category: "politica", importance: 2 },
    { year: toNumber("01/05/642"), title: "Battaglia di Nihavand: i musulmani sconfiggono i Sasanidi, segnando il crollo dell'Impero persiano", category: "politica", importance: 2 },
    { year: toNumber("01/07/661"), title: "L'ascesa del califfo Mu'awiya I a Gerusalemme segna la fondazione del Califfato Omayyade a Damasco", category: "politica", importance: 2 },
    { year: toNumber("10/10/680"), title: "Battaglia di Kerbela e martirio di al-Husayn, evento cardine dello scisma tra sunniti e sciiti", category: "cultura", importance: 2 },
    { year: toNumber("30/04/711"), title: "Il condottiero Tariq ibn Ziyad sbarca a Gibilterra, iniziando la conquista islamica della Penisola Iberica", category: "politica", importance: 2 },
    { year: toNumber("25/10/732"), title: "Battaglia di Poitiers: Carlo Martello sconfigge le forze del Califfato Omayyade arrestandone l'avanzata", category: "politica", importance: 2 },
    { year: toNumber("25/01/750"), title: "La dinastia Abbaside sconfigge gli Omayyadi nella battaglia del Grande Zab, assumendo il controllo del Califfato", category: "politica", importance: 2 },
    { year: toNumber("01/07/751"), title: "Battaglia del Talas: le forze islamiche bloccano l'espansione cinese e introducono la produzione della carta", category: "tecnologia", importance: 2 },
    { year: toNumber("30/07/762"), title: "Fondazione di Baghdad da parte del califfo al-Mansur, secondo precisi calcoli astrologici", category: "politica", importance: 2 },
    { year: toNumber("08/06/793"), title: "Il saccheggio vichingo del monastero di Lindisfarne in Inghilterra segna l'inizio dell'Era Vichinga", category: "politica", importance: 2 },
    { year: toNumber("18/11/794"), title: "L'imperatore Kanmu trasferisce la corte imperiale a Heian-kyō (Kyoto), dando inizio al periodo Heian", category: "politica", importance: 3 },

    { year: toNumber("25/12/0800"), title: "Carlo Magno incoronato imperatore dei Romani da Papa Leone III", category: "politica", importance: 1 },
    
    { year: 830, title: "Espansione scientifica della Casa della Sapienza a Baghdad sotto l'impulso del califfo al-Ma'mun", category: "cultura", importance: 2 },
    { year: toNumber("10/08/843"), title: "Trattato di Verdun: spartizione dell'Impero carolingio tra i tre figli di Ludovico il Pio", category: "politica", importance: 2 },
    { year: toNumber("20/07/911"), title: "Trattato di Saint-Clair-sur-Epte: il re Carlo il Semplice concede a Rollo il Ducato di Normandia", category: "politica", importance: 2 },
    { year: toNumber("04/02/960"), title: "Il generale Zhao Kuangyin si proclama imperatore Taizu, fondando la Dinastia Song in Cina", category: "politica", importance: 2 },
    { year: toNumber("02/02/962"), title: "Ottone I di Sassonia viene incoronato da papa Giovanni XII, fondando il Sacro Romano Impero", category: "politica", importance: 1 },
    { year: toNumber("06/07/969"), title: "Il generale fatimide Jawhar al-Siqilli traccia le fondamenta della nuova città fortificata del Cairo", category: "politica", importance: 3 },
    { year: 988, title: "Battesimo di massa a Kiev e conversione della Rus' al cristianesimo ortodosso", category: "cultura", importance: 2 },
    { year: 1000, title: "L'esploratore vichingo Leif Erikson raggiunge le coste del Nord America", category: "tecnologia", importance: 2 },


// Basso Medioevo (1001 - 1400)
    { year: 1008, title: "Composizione del Genji monogatari (Giappone), considerato il primo romanzo", category: "cultura", importance: 3 },
    { year: 1025, title: "Avicenna completa il 'Canone della Medicina'", category: "scienza", importance: 2 },
    { year: toNumber("16/07/1054"), title: "Grande Scisma (Chiesa Cattolica e Ortodossa)", category: "cultura", importance: 1 },
    { year: toNumber("14/10/1066"), title: "Battaglia di Hastings (Conquista normanna)", category: "politica", importance: 1 },
    { year: toNumber("26/08/1071"), title: "Battaglia di Manzicerta (inizio della turcizzazione dell'Anatolia)", category: "politica", importance: 2 },
    { year: toNumber("28/01/1077"), title: "Dictatus Papae ed episodio di Canossa (Lotta per le investiture)", category: "politica", importance: 3 },
    { year: 1088, title: "Fondazione Università di Bologna", category: "cultura", importance: 2 },
    { year: toNumber("15/07/1099"), title: "Presa di Gerusalemme (Prima Crociata)", category: "politica", importance: 1 },
    { year: 1115, title: "Fondazione dell'Ordine dei Cavalieri Templari", category: "politica", importance: 3 },
    { year: toNumber("09/01/1127"), title: "Incidente di Jingkang: fine dei Song Settentrionali e inizio dei Song Meridionali in Cina", category: "politica", importance: 3 },
    { year: toNumber("25/12/1130"), title: "Nascita del Regno di Sicilia (incoronazione di Ruggero II d'Altavilla)", category: "politica", importance: 3 },
    { year: 1147, title: "Prima menzione storica di Mosca", category: "politica", importance: 3 },
    { year: 1150, title: "Inizio della costruzione del tempio di Angkor Wat (Impero Khmer)", category: "cultura", importance: 2 },
    { year: toNumber("19/12/1154"), title: "Incoronazione di Enrico II e nascita dell'Impero Angioino (Plantageneti)", category: "politica", importance: 3 },
    { year: 1163, title: "Inizio della costruzione della Cattedrale di Notre-Dame a Parigi", category: "cultura", importance: 2 },
    { year: 1185, title: "Inizio del Periodo Kamakura in Giappone (primo Shogunato)", category: "politica", importance: 3 },
    { year: toNumber("02/10/1187"), title: "Saladino riconquista Gerusalemme", category: "politica", importance: 2 },
    { year: toNumber("11/05/1189"), title: "Inizio della Terza Crociata (Crociata dei Re)", category: "politica", importance: 2 },
    { year: 1192, title: "Seconda Battaglia di Tarain: inizio della conquista islamica nel Nord dell'India", category: "politica", importance: 3 },
    { year: toNumber("12/04/1204"), title: "Quarta Crociata: Sacco di Costantinopoli", category: "politica", importance: 2 },
    { year: 1206, title: "Gengis Khan viene proclamato sovrano dei Mongoli", category: "politica", importance: 2 },
    { year: toNumber("16/04/1209"), title: "Approvazione della prima Regola francescana (nascita degli Ordini mendicanti)", category: "cultura", importance: 2 },
    { year: toNumber("27/07/1214"), title: "Battaglia di Bouvines (decisiva vittoria francese contro inglesi e imperiali)", category: "politica", importance: 3 },
    { year: toNumber("15/06/1215"), title: "Magna Carta in Inghilterra", category: "politica", importance: 1 },
    { year: toNumber("11/11/1215"), title: "IV Concilio Lateranense", category: "cultura", importance: 1 },
    { year: toNumber("18/08/1227"), title: "Morte di Gengis Khan", category: "politica", importance: 1 },
    { year: 1230, title: "Fondazione dell'Impero del Mali in Africa occidentale", category: "politica", importance: 3 },
    { year: toNumber("10/02/1258"), title: "I Mongoli saccheggiano Baghdad (fine del Califfato Abbaside)", category: "politica", importance: 2 },
    { year: 1265, title: "Tommaso d'Aquino inizia la stesura della 'Summa Theologiae'", category: "cultura", importance: 2 },
    { year: 1271, title: "Marco Polo intraprende il suo viaggio in Asia lungo la Via della Seta", category: "cultura", importance: 2 },
    { year: 1279, title: "Kublai Khan fonda la Dinastia Yuan in Cina (fine della Dinastia Song)", category: "politica", importance: 2 },
    { year: 1308, title: "Dante inizia la composizione della Divina Commedia", category: "cultura", importance: 1 },
    { year: toNumber("09/03/1309"), title: "Inizio della 'Cattività avignonese' del Papato", category: "politica", importance: 3 },
    { year: toNumber("14/09/1321"), title: "Morte di Dante Alighieri", category: "cultura", importance: 2 },
    { year: 1324, title: "Pellegrinaggio di Mansa Musa (apogeo dell'Impero del Mali)", category: "politica", importance: 3 },
    { year: toNumber("13/03/1325"), title: "Fondazione di Tenochtitlan (Impero Azteco)", category: "politica", importance: 2 },
    { year: toNumber("24/05/1337"), title: "Inizio Guerra dei Cent'Anni", category: "politica", importance: 1 },
    { year: toNumber("01/11/1347"), title: "Peste Nera in Europa (arrivo a Messina)", category: "scienza", importance: 1 },
    { year: 1353, title: "Il Decameron (Giovanni Boccaccio)", category: "cultura", importance: 3 },
    { year: toNumber("10/01/1356"), title: "Bolla d'oro di Carlo IV (fissa l'elezione imperiale a 7 Principi Elettori)", category: "politica", importance: 2 },
    { year: 1356, title: "Formalizzazione della Lega Anseatica (dominio commerciale nel Nord Europa)", category: "politica", importance: 3 },
    { year: toNumber("23/01/1368"), title: "Inizio Dinastia Ming in Cina", category: "politica", importance: 1 },
    { year: toNumber("20/09/1378"), title: "Inizio del Grande Scisma d'Occidente (papi a Roma e Avignone)", category: "politica", importance: 2 },
    { year: toNumber("30/05/1381"), title: "Rivolta dei contadini in Inghilterra (Peasants' Revolt)", category: "politica", importance: 4 },


    // 1400s
    { year: toNumber("25/10/1415"), title: "Battaglia di Azincourt (Jan Hus fu arso il 06/07/1415)", category: "politica", importance: 3 },
    { year: 1420, title: "Completamento della Città Proibita a Pechino", category: "cultura", importance: 2 },
    { year: toNumber("30/05/1431"), title: "Giovanna d'Arco viene arsa al rogo a Rouen", category: "politica", importance: 2 },
    { year: toNumber("30/08/1436"), title: "Completamento della Cupola del Brunelleschi a Firenze (Consacrazione)", category: "tecnologia", importance: 2 },
    { year: 1438, title: "Nascita dell'Impero Inca sotto Pachacútec", category: "politica", importance: 2 },
    { year: 1450, title: "Costruzione di Machu Picchu", category: "cultura", importance: 2 },
    { year: toNumber("29/05/1453"), title: "Caduta di Costantinopoli", category: "politica", importance: 1 },
    { year: 1455, title: "Gutenberg completa la stampa della Bibbia a 42 linee, primo grande libro stampato in Occidente con caratteri mobili", category: "tecnologia", importance: 2 },
    { year: 1485, title: "La Nascita di Venere (Sandro Botticelli)", category: "cultura", importance: 3 },
    { year: toNumber("12/10/1492"), title: "Scoperta dell'America: Cristoforo Colombo sbarca sull'isola di San Salvador", category: "cultura", importance: 1 },
    { year: toNumber("02/01/1492"), title: "Fine della Reconquista a Granada", category: "politica", importance: 1 },
    { year: toNumber("03/09/1494"), title: "Discesa di Carlo VIII in Italia (ingresso nel territorio italiano)", category: "politica", importance: 2 },
    { year: toNumber("07/06/1494"), title: "Trattato di Tordesillas", category: "politica", importance: 2 },
    { year: toNumber("20/05/1498"), title: "Vasco da Gama raggiunge l'India via mare doppiando l'Africa", category: "tecnologia", importance: 2 },
    { year: 1498, title: "'L'Ultima Cena' (Leonardo da Vinci)", category: "cultura", importance: 3 },

// 1500s
    { year: 1503, title: "Leonardo da Vinci inizia a dipingere La Gioconda", category: "cultura", importance: 3 },
    { year: toNumber("31/10/1512"), title: "Volta della Cappella Sistina (Inaugurazione di Michelangelo)", category: "cultura", importance: 3 },
    { year: 1513, title: "'Il Principe' (Machiavelli)", category: "cultura", importance: 3 },
    { year: toNumber("31/10/1517"), title: "Le 95 tesi (Lutero) - Riforma Protestante", category: "cultura", importance: 1 },
    { year: toNumber("22/04/1519"), title: "Hernán Cortés sbarca in Messico e inizia la conquista dell'Impero Azteco", category: "politica", importance: 2 },
    { year: toNumber("06/09/1522"), title: "Prima circumnavigazione del globo (Magellano)", category: "tecnologia", importance: 1 },
    { year: toNumber("03/11/1534"), title: "Atto di Supremazia: la Chiesa d'Inghilterra si separa da Roma", category: "politica", importance: 2 },
    { year: 1543, title: "Niccolò Copernico pubblica 'De revolutionibus orbium coelestium' con prefazione del teologo Osiander che precisa che la teoria eliocentrica è solo di un modello di calcolo", category: "scienza", importance: 1 },
    { year: toNumber("13/12/1545"), title: "Inizio del Concilio di Trento e della Controriforma", category: "cultura", importance: 2 },
    { year: toNumber("16/01/1547"), title: "Ivan IV il Terribile viene incoronato primo Zar di tutte le Russie", category: "politica", importance: 2 },
    { year: toNumber("07/10/1571"), title: "Battaglia di Lepanto (Lega Santa contro gli Ottomani)", category: "politica", importance: 2 },
    { year: 1580, title: "'Saggi' (Montaigne)", category: "cultura", importance: 3 },
    { year: toNumber("04/10/1582"), title: "Calendario Gregoriano (Ultimo giorno del calendario giuliano)", category: "cultura", importance: 2 },
    { year: toNumber("08/08/1588"), title: "Sconfitta dell'Invincibile Armata spagnola contro l'Inghilterra", category: "politica", importance: 3 },
    { year: toNumber("13/04/1598"), title: "Editto di Nantes (fine delle guerre di religione in Francia)", category: "politica", importance: 3 },
    
// 1600s
    { year: toNumber("17/02/1600"), title: "Rogo di Giordano Bruno", category: "cultura", importance: 3 },
    { year: toNumber("20/03/1602"), title: "Fondazione della Compagnia Olandese delle Indie Orientali (VOC)", category: "politica", importance: 3 },
    { year: 1605, title: "Pubblicazione del 'Don Chisciotte' di Cervantes (prima parte)", category: "cultura", importance: 3 },
    { year: toNumber("25/08/1609"), title: "Prime osservazioni col telescopio (Galileo)", category: "scienza", importance: 1 },
    { year: toNumber("05/04/1614"), title: "Matrimonio di Pocahontas con John Rolfe: inizio di un periodo di pace tra coloni e nativi", category: "politica", importance: 3 },
    { year: toNumber("23/04/1616"), title: "Morte di William Shakespeare e di Cervantes", category: "cultura", importance: 4 },
    { year: toNumber("23/05/1618"), title: "Inizio Guerra dei Trent'anni", category: "politica", importance: 2 },
    { year: toNumber("11/11/1620"), title: "I Padri Pellegrini arrivano in Nord America sulla Mayflower", category: "politica", importance: 3 },
    { year: toNumber("08/11/1623"), title: "Pubblicazione del 'First Folio' di Shakespeare", category: "cultura", importance: 2 },
    { year: 1624, title: "Fondazione di Nuova Amsterdam (futura New York)", category: "politica", importance: 2 },
    { year: 1628, title: "Circolazione sanguigna scoperta", category: "scienza", importance: 3 },
    { year: toNumber("22/02/1632"), title: "'Dialogo sopra i due massimi sistemi' (Galileo)", category: "scienza", importance: 2 },
    { year: toNumber("05/02/1637"), title: "Scoppia la Bolla dei tulipani in Olanda", category: "politica", importance: 4 },
    { year: toNumber("22/08/1642"), title: "Inizio della Guerra Civile Inglese", category: "politica", importance: 3 },
    { year: toNumber("25/04/1644"), title: "Caduta dei Ming e inizio della dinastia Qing in Cina", category: "politica", importance: 2 },
    { year: toNumber("24/10/1648"), title: "Pace di Vestfalia", category: "politica", importance: 1 },
    { year: toNumber("30/01/1649"), title: "Esecuzione di Re Carlo I d'Inghilterra", category: "politica", importance: 3 },
    { year: 1650, title: "James Ussher calcola la data della creazione al 23 ottobre 4004 a.C. contando genealogie e regni della Bibbia negli 'Annales Veteris Testamenti'", category: "cultura", importance: 4 },
    { year: 1651, title: "'Leviatano' (Thomas Hobbes)", category: "cultura", importance: 3 },
    { year: 1653, title: "Completamento del Taj Mahal in India", category: "cultura", importance: 2 },
    { year: toNumber("02/09/1666"), title: "Grande incendio di Londra", category: "politica", importance: 4 },
    { year: toNumber("12/09/1683"), title: "Battaglia di Vienna (fermata l'avanzata dell'Impero Ottomano)", category: "politica", importance: 3 },
    { year: toNumber("05/07/1687"), title: "'Principia Mathematica' di Newton (gravitazione e leggi del moto)", category: "scienza", importance: 1 },
    
    // 1700s
    { year: toNumber("27/05/1703"), title: "Fondazione di San Pietroburgo (Pietro il Grande)", category: "politica", importance: 2 },
    { year: toNumber("01/05/1707"), title: "Atto di Unione: Inghilterra e Scozia formano la Gran Bretagna", category: "politica", importance: 3 },
    { year: toNumber("01/09/1712"), title: "Thomas Newcomen installa la prima macchina a vapore atmosferica per il pompaggio dell'acqua dalle miniere", category: "tecnologia", importance: 2 },
    { year: toNumber("25/04/1719"), title: "'Robinson Crusoe' (Daniel Defoe)", category: "cultura", importance: 5 },
    { year: toNumber("30/09/1720"), title: "Scoppio della bolla della South Sea Company (crisi finanziaria)", category: "politica", importance: 5 },
    { year: toNumber("28/10/1726"), title: "I viaggi di Gulliver di Jonathan Swift", category: "cultura", importance: 5 },
    { year: toNumber("01/12/1735"), title: "Systema Naturae di Linneo (classificazione biologica)", category: "scienza", importance: 3 },
    { year: toNumber("27/01/1739"), title: "Trattato sulla natura umana di David Hume", category: "cultura", importance: 4 },
    { year: toNumber("01/11/1755"), title: "Terremoto a Lisbona che causa incendi e tsunami, devasta il Portogallo e le coste atlantiche", category: "scienza", importance: 2 },    
    { year: toNumber("15/01/1759"), title: "'Candido' (Voltaire)", category: "cultura", importance: 4 },
    { year: toNumber("15/04/1762"), title: "'Il contratto sociale' (Jean-Jacques Rousseau)", category: "cultura", importance: 3 },
    { year: 1762, title: "Jean-Jacques Rousseau pubblica 'Emilio o dell'educazione' (fondazione della pedagogia moderna)", category: "cultura", importance: 3 },
    { year: toNumber("15/07/1764"), title: "'Dei delitti e delle pene' (Cesare Beccaria)", category: "cultura", importance: 2 },
    { year: toNumber("26/08/1768"), title: "Primo viaggio di esplorazione del Capitano James Cook", category: "scienza", importance: 4 },
    { year: toNumber("05/01/1769"), title: "Macchina a vapore migliorata (Watt)", category: "tecnologia", importance: 2 },
    { year: toNumber("04/07/1776"), title: "Dichiarazione d'Indipendenza degli Stati Uniti d'America", category: "politica", importance: 1 },
    { year: toNumber("09/03/1776"), title: "'La ricchezza delle nazioni' di Adam Smith, fondazione dell'economia moderna", category: "cultura", importance: 3 },
    { year: 1778, title: "Buffon, nelle 'Époques de la nature', calcola l'età della Terra in 75.000 anni in base ad una stima sul tempo di raffreddamento del ferro, valore lontano dalla realtà", category: "scienza", importance: 3 },
    { year: toNumber("13/03/1781"), title: "Scoperta di Urano", category: "scienza", importance: 3 },
    { year: toNumber("17/09/1787"), title: "Stesura della Costituzione degli Stati Uniti d'America a Philadelphia", category: "politica", importance: 1 },
    { year: toNumber("26/01/1788"), title: "Fondazione di Sydney (prima colonia penale britannica in Australia)", category: "politica", importance: 3 },
    { year: toNumber("22/08/1791"), title: "Inizio Rivoluzione Haitiana", category: "politica", importance: 3 },
    { year: toNumber("03/05/1791"), title: "Costituzione polacca di maggio (prima costituzione moderna e scritta in Europa)", category: "politica", importance: 3 },
    { year: toNumber("14/05/1796"), title: "Primo vaccino (vaiolo, Jenner)", category: "scienza", importance: 1 },
    { year: 1798, title: "'Saggio sul principio di popolazione' di Malthus", category: "cultura", importance: 5 },
    { year: toNumber("15/07/1799"), title: "Ritrovamento della Stele di Rosetta in Egitto", category: "cultura", importance: 3 },

// 1800s
    { year: toNumber("26/01/1802"), title: "Napoleone costituisce la Repubblica Italiana con capitale Milano", category: "politica", importance: 3 },
    { year: toNumber("16/03/1802"), title: "Fondazione della United States Military Academy a West Point", category: "politica", importance: 3 },
    { year: toNumber("25/03/1802"), title: "Trattato di Amiens: fine temporanea delle ostilità tra Francia e Gran Bretagna", category: "politica", importance: 2 },
    { year: toNumber("10/05/1801"), title: "Inizio della Prima guerra barbaresca", category: "politica", importance: 3 },
    { year: toNumber("12/05/1802"), title: "Terremoto di Soncino: forte sisma colpisce il nord Italia", category: "scienza", importance: 4 },
    { year: toNumber("19/05/1802"), title: "Napoleone istituisce la Legion d'Onore", category: "politica", importance: 3 },
    { year: toNumber("02/08/1802"), title: "Napoleone Bonaparte viene proclamato Console a vita", category: "politica", importance: 4 },
    { year: toNumber("11/09/1802"), title: "Il Piemonte viene annesso alla Francia", category: "politica", importance: 3 },
    { year: toNumber("24/10/1802"), title: "Morte di Ludovico Manin, l'ultimo doge della Repubblica di Venezia", category: "politica", importance: 4 },
    { year: toNumber("19/02/1803"), title: "Il Canton Ticino diventa cantone ufficiale della Svizzera (Atto di Mediazione)", category: "politica", importance: 4 },
    { year: toNumber("01/03/1803"), title: "L'Ohio viene ammesso come 17º stato degli Stati Uniti", category: "politica", importance: 4 },
    { year: toNumber("18/05/1803"), title: "La Gran Bretagna dichiara guerra alla Francia (fine della Pace di Amiens)", category: "politica", importance: 3 },
    { year: toNumber("09/06/1803"), title: "Matthew Flinders completa la prima circumnavigazione dell'Australia", category: "scienza", importance: 3 },
    { year: toNumber("26/07/1803"), title: "Inaugurazione della Surrey Iron Railway, prima ferrovia pubblica (a trazione animale)", category: "tecnologia", importance: 3 },
    { year: 1803, title: "'A Zacinto' (Ugo Foscolo)", category: "cultura", importance: 4 },
    { year: toNumber("02/12/1804"), title: "Napoleone si autoincorona imperatore nella cattedrale di Notre-Dame di Parigi", category: "politica", importance: 1 },
    { year: toNumber("01/01/1804"), title: "Indipendenza di Haiti (prima repubblica nera libera)", category: "politica", importance: 3 },
    { year: 1808, title: "'Faust', Parte I (Goethe)", category: "cultura", importance: 3 },
    { year: 1809, title: "'Le affinità elettive' (Goethe)", category: "cultura", importance: 4 },
    { year: toNumber("20/12/1812"), title: "'Fiabe del focolare' (Fratelli Grimm)", category: "cultura", importance: 2 },
    { year: toNumber("28/01/1813"), title: "'Orgoglio e pregiudizio' (Jane Austen)", category: "cultura", importance: 3 },
    { year: toNumber("18/06/1815"), title: "Battaglia di Waterloo (sconfitta definitiva di Napoleone)", category: "politica", importance: 1 },
    { year: toNumber("09/06/1815"), title: "Atto finale del Congresso di Vienna", category: "politica", importance: 1 },
    { year: 1818, title: "'Il mondo come volontà e rappresentazione' (Schopenhauer)", category: "cultura", importance: 4 },
    { year: 1819, title: "'L'infinito' (Giacomo Leopardi)", category: "cultura", importance: 4 },
    { year: toNumber("18/12/1819"), title: "'Ivanoe' (Walter Scott)", category: "cultura", importance: 3 },
    { year: toNumber("02/12/1823"), title: "Dottrina Monroe ('L'America agli Americani')", category: "politica", importance: 3 },
    { year: toNumber("27/09/1825"), title: "Prima ferrovia pubblica (Stephenson)", category: "tecnologia", importance: 1 },
    { year: 1827, title: "Prima fotografia permanente (Nicéphore Niépce)", category: "tecnologia", importance: 2 },
    { year: 1827, title: "'I Promessi Sposi' (Alessandro Manzoni)", category: "cultura", importance: 3 },
    { year: toNumber("15/11/1830"), title: "'Il rosso e il nero' (Stendhal)", category: "cultura", importance: 4 },
    { year: toNumber("28/08/1833"), title: "Abolizione della schiavitù nell'Impero Britannico", category: "politica", importance: 2 },
    { year: toNumber("08/05/1835"), title: "Pubblicazione delle 'Fiabe' di Hans Christian Andersen", category: "cultura", importance: 2 },
    { year: toNumber("31/03/1836"), title: "Inizio pubblicazione de 'Il Circolo Pickwick' (Charles Dickens)", category: "cultura", importance: 3 },
    { year: toNumber("01/02/1837"), title: "Inizio pubblicazione di 'Oliver Twist' (Charles Dickens)", category: "cultura", importance: 3 },
    { year: toNumber("25/07/1837"), title: "Invenzione del telegrafo elettrico via cavo (Samuel Morse e Cooke/Wheatstone)", category: "tecnologia", importance: 1 },
    { year: toNumber("04/09/1839"), title: "Inizio della Prima Guerra dell'Oppio tra Gran Bretagna e Cina", category: "politica", importance: 2 },
    { year: toNumber("15/06/1844"), title: "Invenzione della vulcanizzazione della gomma (Charles Goodyear)", category: "tecnologia", importance: 5 },
    { year: 1847, title: "'Cime tempestose' (Emily Brontë)", category: "cultura", importance: 3 },
    { year: toNumber("24/02/1848"), title: "Moti europei del 48", category: "politica", importance: 1 },
    { year: toNumber("04/03/1848"), title: "Promulgazione dello Statuto Albertino (futura Costituzione del Regno d'Italia)", category: "politica", importance: 2 },
    // 1850s - 1890s
    { year: toNumber("18/10/1851"), title: "Pubblicazione di 'Moby Dick' di Herman Melville", category: "cultura", importance: 3 },
    { year: toNumber("01/05/1851"), title: "Inaugurazione della Grande Esposizione di Londra al Crystal Palace", category: "cultura", importance: 4 },
    { year: toNumber("16/10/1853"), title: "L'Impero Ottomano dichiara guerra alla Russia: inizio della Guerra di Crimea", category: "politica", importance: 3 },
    { year: toNumber("08/10/1856"), title: "Incidente della nave Arrow: inizio della Seconda Guerra dell'Oppio", category: "politica", importance: 3 },
    { year: toNumber("11/08/1856"), title: "Henry Bessemer presenta il processo per la produzione economica dell'acciaio", category: "tecnologia", importance: 3 },
    { year: toNumber("15/04/1857"), title: "Gustave Flaubert pubblica 'Madame Bovary' in volume", category: "cultura", importance: 4 },
    { year: toNumber("25/06/1857"), title: "Pubblicazione de 'I fiori del male' di Charles Baudelaire", category: "cultura", importance: 4 },
    { year: toNumber("24/11/1859"), title: "Charles Darwin pubblica 'L'Origine delle Specie'", category: "scienza", importance: 1 },
    { year: toNumber("01/02/1859"), title: "Pubblicazione del 'Saggio sulla libertà' di John Stuart Mill", category: "cultura", importance: 4 },
    { year: toNumber("17/03/1861"), title: "Proclamazione del Regno d'Italia", category: "politica", importance: 1 },
    { year: toNumber("12/04/1861"), title: "Attacco a Fort Sumter: inizio della Guerra Civile Americana", category: "politica", importance: 1 },
    { year: toNumber("03/04/1862"), title: "Victor Hugo pubblica 'I miserabili'", category: "cultura", importance: 3 },
    { year: 1862, title: "Lord Kelvin stima fra 20 e 400 milioni di anni dal tempo di raffreddamento di una Terra inizialmente fusa, valore rivelatosi sottostimato", category: "scienza", importance: 2 },
    { year: toNumber("20/04/1864"), title: "Louis Pasteur e Claude Bernard completano il primo test della pastorizzazione", category: "scienza", importance: 3 },
    { year: toNumber("15/01/1866"), title: "Inizia la pubblicazione a puntate di 'Delitto e castigo' di Dostoevskij", category: "cultura", importance: 3 },
    { year: toNumber("03/01/1868"), title: "Restaurazione Meiji: l'Imperatore riprende il potere, inizia la modernizzazione del Giappone", category: "politica", importance: 2 },
    { year: toNumber("10/12/1869"), title: "Lev Tolstoj completa la pubblicazione di 'Guerra e pace'", category: "cultura", importance: 2 },
    { year: toNumber("17/11/1869"), title: "Inaugurazione del Canale di Suez", category: "tecnologia", importance: 2 },
    { year: toNumber("06/03/1869"), title: "Mendeleev presenta la prima Tavola Periodica alla Società Chimica Russa", category: "scienza", importance: 1 },
    { year: toNumber("15/04/1872"), title: "Prima esposizione degli Impressionisti: il quadro di Monet dà il nome al movimento", category: "cultura", importance: 3 },
    { year: toNumber("07/03/1876"), title: "Alexander Graham Bell ottiene il brevetto per il telefono", category: "tecnologia", importance: 2 },
    { year: toNumber("09/06/1876"), title: "Pubblicazione de 'Le avventure di Tom Sawyer' di Mark Twain", category: "cultura", importance: 4 },
    { year: toNumber("24/01/1878"), title: "Completamento della pubblicazione di 'Anna Karenina' di Tolstoj", category: "cultura", importance: 3 },
    { year: toNumber("21/10/1879"), title: "Thomas Edison testa con successo la prima lampadina a incandescenza con una durata di 13 ore", category: "tecnologia", importance: 1 },
    { year: toNumber("01/12/1880"), title: "Pubblicazione di 'Washington Square' di Henry James", category: "cultura", importance: 4 },
    { year: toNumber("07/07/1881"), title: "Inizia la pubblicazione sul Giornale per i bambini de 'Le avventure di Pinocchio'", category: "cultura", importance: 3 },
    { year: toNumber("19/03/1882"), title: "Posa della prima pietra della Sagrada Família a Barcellona", category: "cultura", importance: 2 },
    { year: toNumber("15/11/1884"), title: "Apertura della Conferenza di Berlino per la spartizione dell'Africa", category: "politica", importance: 2 },
    { year: toNumber("29/01/1886"), title: "Karl Benz deposita il brevetto per la prima automobile a scoppio", category: "tecnologia", importance: 1 },
    { year: toNumber("06/07/1885"), title: "Louis Pasteur testa con successo il primo vaccino contro la rabbia su un essere umano", category: "scienza", importance: 4 },
    { year: toNumber("28/10/1886"), title: "Inaugurazione della Statua della Libertà a New York", category: "cultura", importance: 3 },
    { year: toNumber("31/03/1889"), title: "Inaugurazione e completamento della Torre Eiffel a Parigi", category: "cultura", importance: 2 },
    { year: toNumber("18/06/1889"), title: "Vincent van Gogh dipinge 'La Notte stellata' nel manicomio di Saint-Rémy", category: "cultura", importance: 3 },
    { year: toNumber("20/06/1890"), title: "Pubblicazione de 'Il ritratto di Dorian Gray' di Oscar Wilde sulla rivista Lippincott's", category: "cultura", importance: 3 },
    { year: toNumber("01/11/1893"), title: "Edvard Munch espone per la prima volta 'L'urlo' a Berlino", category: "cultura", importance: 3 },
    { year: toNumber("19/09/1893"), title: "La Nuova Zelanda concede il diritto di voto alle donne", category: "politica", importance: 3 },
    { year: toNumber("30/06/1894"), title: "Inaugurazione del Tower Bridge a Londra", category: "tecnologia", importance: 3 },
    { year: toNumber("08/11/1895"), title: "Wilhelm Röntgen scopre i Raggi X nel suo laboratorio", category: "scienza", importance: 1 },
    { year: toNumber("06/04/1896"), title: "Cerimonia di apertura delle prime Olimpiadi moderne ad Atene", category: "cultura", importance: 2 },
    { year: toNumber("10/08/1896"), title: "Composizione della poesia 'X agosto' di Giovanni Pascoli", category: "cultura", importance: 4 },
    { year: toNumber("28/08/1898"), title: "Composizione della celebre canzone ''O sole mio' a Odessa", category: "cultura", importance: 4 },
    { year: toNumber("06/03/1899"), title: "La Bayer registra il marchio Aspirina", category: "scienza", importance: 3 },


    // 1900s
    { year: toNumber("04/11/1899"), title: "Sigmund Freud pubblica 'L'interpretazione dei sogni', fondando la psicoanalisi", category: "cultura", importance: 3 },
    { year: toNumber("23/03/1900"), title: "Arthur Evans inizia gli scavi a Cnosso, riportando alla luce la civiltà minoica", category: "scienza", importance: 3 },
    { year: toNumber("17/05/1900"), title: "Pubblicazione de 'Il meraviglioso mago di Oz' di L. Frank Baum", category: "cultura", importance: 3 },
    { year: toNumber("14/12/1900"), title: "Max Planck espone la teoria dei quanti alla Società Tedesca di Fisica come modello esplicativo della radiazione del corpo nero", category: "scienza", importance: 1 },
    { year: toNumber("10/12/1901"), title: "Conferimento dei primi Premi Nobel a Stoccolma e Oslo", category: "cultura", importance: 3 },
    { year: toNumber("17/12/1903"), title: "Primo volo aereo a motore dei fratelli Wright a Kitty Hawk", category: "tecnologia", importance: 1 },
    // 1905: Annus Mirabilis
    { year: toNumber("09/06/1905"), title: "Einstein spiega l'effetto fotoelettrico ipotizzando i quanti di luce (fotoni), esordio del il suo 'Annus Mirabilis'", category: "scienza", importance: 2 },
    { year: toNumber("18/07/1905"), title: "Einstein elabora un modello matematico per il moto browniano", category: "scienza", importance: 3 },
    { year: toNumber("26/09/1905"), title: "Einstein espone la Teoria della Relatività Ristretta riconciliando meccanica e elettrodinamica", category: "scienza", importance: 1 },
    { year: toNumber("21/11/1905"), title: "Einstein ricava l'equivalenza massa-energia E=mc²", category: "scienza", importance: 1 },

    { year: toNumber("01/07/1907"), title: "Picasso completa 'Les Demoiselles d'Avignon', l'opera che fonda il Cubismo", category: "cultura", importance: 4 },
    { year: toNumber("01/10/1908"), title: "Ford lancia il Modello T, dando inizio all'era della motorizzazione di massa", category: "tecnologia", importance: 2 },

    // 1910s
    { year: toNumber("04/06/1911"), title: "Inaugurazione dell'Altare della Patria (Vittoriano) a Roma", category: "cultura", importance: 3 },
    { year: toNumber("15/04/1912"), title: "Affondamento del Titanic", category: "cultura", importance: 2 },
    { year: toNumber("01/12/1913"), title: "Inaugurazione della catena di montaggio mobile alla Ford", category: "tecnologia", importance: 3 },
    { year: toNumber("14/11/1913"), title: "Pubblicazione di 'Dalla parte di Swann', primo volume de 'Alla ricerca del tempo perduto' di Proust", category: "cultura", importance: 3 },
    { year: 1913, title: "Arthur Holmes, in 'The Age of the Earth', in base al decadimento dell'uranio in piombo nelle rocce propone almeno 1,6 miliardi di anni, stima che sarà corretta al rialzo", category: "scienza", importance: 3 },
    { year: toNumber("28/06/1914"), title: "Attentato di Sarajevo (assassinio dell'arciduca Francesco Ferdinando)", category: "politica", importance: 2 },
    { year: toNumber("28/07/1914"), title: "L'Austria-Ungheria dichiara guerra alla Serbia (inizio della I Guerra Mondiale)", category: "politica", importance: 1 },
    { year: toNumber("15/08/1914"), title: "Apertura del Canale di Panama", category: "tecnologia", importance: 4 },
    { year: toNumber("24/04/1915"), title: "Inizio del genocidio armeno: deportazioni e massacri sistematici della popolazione armena nell'Impero Ottomano", category: "politica", importance: 2 },
    { year: 1916, title: "Pubblicazione de 'I fondamenti della teoria della relatività generale' di Albert Einstein", category: "scienza", importance: 1 },
    { year: 1915, title: "'La metamorfosi' (Franz Kafka)", category: "cultura", importance: 3 },
    { year: toNumber("26/01/1917"), title: "'Mattina' (Giuseppe Ungaretti)", category: "cultura", importance: 4 },
    { year: toNumber("11/11/1918"), title: "Armistizio di Compiègne (fine Prima Guerra Mondiale)", category: "politica", importance: 2 },
    { year: 1918, title: "Picco dell'influenza Spagnola", category: "scienza", importance: 1 },
    { year: toNumber("11/08/1919"), title: "Costituzione di Weimar (nascita della Repubblica in Germania)", category: "politica", importance: 3 },
    
    // 1920s
    { year: toNumber("10/01/1920"), title: "Fondazione della Società delle Nazioni", category: "politica", importance: 3 },
    { year: toNumber("18/08/1920"), title: "Suffragio femminile negli USA", category: "politica", importance: 3 },
    { year: 1922, title: "Pubblicazione di 'Ulisse' (Joyce) e 'La terra desolata' (Eliot)", category: "cultura", importance: 4 },
    { year: 1922, title: "Pubblicazione di 'Siddharta' (Hermann Hesse)", category: "cultura", importance: 4 },
    { year: toNumber("06/10/1927"), title: "Primo film sonoro ('Il cantante di jazz')", category: "cultura", importance: 2 },
    { year: toNumber("03/09/1928"), title: "Scoperta della Penicillina (Fleming)", category: "scienza", importance: 1 },
    { year: toNumber("18/11/1928"), title: "Debutto di Mickey Mouse in 'Steamboat Willie'", category: "cultura", importance: 4 },
    { year: toNumber("24/10/1929"), title: "Giovedì nero di Wall Street (inizio del grande crollo borsistico)", category: "politica", importance: 1 },

    
    // 1930s
    { year: toNumber("01/05/1931"), title: "Inaugurazione dell'Empire State Building (New York)", category: "cultura", importance: 3 },
    { year: toNumber("12/10/1931"), title: "Inaugurazione del Cristo Redentore (Rio de Janeiro)", category: "cultura", importance: 3 },
    { year: toNumber("30/01/1933"), title: "Hitler diventa Cancelliere in Germania", category: "politica", importance: 1 },
    { year: 1933, title: "Inizio del New Deal (Roosevelt) e sospensione del Gold Standard negli USA", category: "politica", importance: 2 },
    { year: toNumber("17/07/1936"), title: "Inizio della Guerra Civile Spagnola", category: "politica", importance: 3 },
    { year: 1936, title: "'Teoria generale dell'occupazione, dell'interesse e della moneta' (John Maynard Keynes)", category: "scienza", importance: 2 },
    { year: 1937, title: "Guernica di Picasso", category: "cultura", importance: 3 },
    { year: toNumber("27/05/1937"), title: "Inaugurazione del Golden Gate Bridge a San Francisco", category: "tecnologia", importance: 2 },
    { year: toNumber("21/12/1937"), title: "Esce al cinema 'Biancaneve e i sette nani' (Disney)", category: "cultura", importance: 5 },
    { year: toNumber("01/09/1939"), title: "Hitler invade la Polonia, inizia la Seconda Guerra Mondiale", category: "politica", importance: 1 },
    { year: toNumber("25/08/1939"), title: "Uscita del film 'Il mago di Oz'", category: "cultura", importance: 4 },

    // 1940s
    { year: toNumber("13/08/1942"), title: "Istituzione del Progetto Manhattan per la realizzazione di armi nucleari", category: "tecnologia", importance: 3 },
    { year: toNumber("07/12/1941"), title: "Attacco a Pearl Harbor e ingresso degli USA nella Seconda Guerra Mondiale", category: "politica", importance: 2 },
    { year: toNumber("01/07/1944"), title: "Conferenza di Bretton Woods: il dollaro diventa moneta di riserva globale ancorata all'oro, istituzione di FMI e Banca Mondiale", category: "politica", importance: 2 },
    { year: toNumber("21/04/1944"), title: "Il diritto di voto alle donne viene sancito in Francia", category: "politica", importance: 3 },
    { year: toNumber("06/08/1945"), title: "Gli USA sganciano la prima bomba atomica su Hiroshima (seguita da Nagasaki il 09/08)", category: "politica", importance: 1 },
    { year: toNumber("24/10/1945"), title: "Entra in vigore lo Statuto delle Nazioni Unite: nasce l'ONU", category: "politica", importance: 1 },
    { year: toNumber("16/12/1947"), title: "Invenzione del Transistor: prima dimostrazione nei Bell Labs", category: "tecnologia", importance: 1 },
    { year: toNumber("29/11/1947"), title: "Approvazione del Piano di partizione della Palestina (Risoluzione ONU 181)", category: "politica", importance: 2 },
    { year: toNumber("15/08/1947"), title: "Indipendenza dell'India dal dominio britannico", category: "politica", importance: 2 },
    { year: toNumber("17/08/1947"), title: "Pubblicazione della Linea Radcliffe: partizione tra India e Pakistan", category: "politica", importance: 3 },
    { year: toNumber("10/12/1948"), title: "L'Assemblea Generale dell' ONU approva la Dichiarazione Universale dei Diritti Umani, pilastro del diritto internazionale", category: "politica", importance: 2 },
    { year: toNumber("01/01/1948"), title: "Entrata in vigore della Costituzione della Repubblica Italiana", category: "politica", importance: 2 },
    { year: toNumber("14/05/1948"), title: "Dichiarazione d'Indipendenza di Israele e inizio della Prima Guerra Arabo-Israeliana", category: "politica", importance: 2 },
    { year: toNumber("01/10/1949"), title: "Mao Zedong proclama la fondazione della Repubblica Popolare Cinese", category: "politica", importance: 2 },
    { year: toNumber("04/04/1949"), title: "Firma del Patto Atlantico a Washington: nasce la NATO", category: "politica", importance: 2 },
    { year: toNumber("08/06/1949"), title: "Pubblicazione di '1984' di George Orwell", category: "cultura", importance: 3 },
    
// 1950s
    { year: toNumber("25/04/1953"), title: "Prima descrizione della struttura del DNA, Watson e Crick su Nature", category: "scienza", importance: 1 },
    { year: toNumber("29/05/1953"), title: "Edmund Hillary e Tenzing Norgay raggiungono la vetta del Monte Everest", category: "scienza", importance: 3 },
    { year: toNumber("12/04/1955"), title: "Annuncio del successo del vaccino antipolio di Jonas Salk", category: "scienza", importance: 2 },
    { year: toNumber("29/07/1954"), title: "Pubblicazione de 'La Compagnia dell'Anello', primo volume del Signore degli Anelli", category: "cultura", importance: 4 },
    { year: toNumber("27/06/1954"), title: "Colpo di Stato in Guatemala: le forze appoggiate dalla CIA depongono Jacobo Árbenz", category: "politica", importance: 3 },
    { year: toNumber("29/10/1956"), title: "Inizio della Crisi di Suez con l'invasione israeliana del Sinai", category: "politica", importance: 3 },
    { year: 1956, title: "Clair Patterson stima per l'età della Terra in 4,5 miliardi di anni in base agli isotopi del piombo nei meteoriti, valore oggi accettato come corretto", category: "scienza", importance: 2 },
    { year: toNumber("04/10/1957"), title: "L'URSS lancia lo Sputnik 1, il primo satellite artificiale", category: "tecnologia", importance: 1 },
    { year: toNumber("31/01/1958"), title: "Domenico Modugno vince Sanremo con 'Nel blu dipinto di blu'", category: "cultura", importance: 4 },
    { year: toNumber("06/03/1957"), title: "Il Ghana dichiara l'indipendenza: primo Paese dell'Africa subsahariana a liberarsi dal colonialismo", category: "politica", importance: 3 },

    // 1960s
    { year: toNumber("09/05/1960"), title: "La FDA approva la prima pillola anticoncezionale (Enovid) per uso commerciale", category: "scienza", importance: 2 },
    { year: 1960, title: "'Anno dell'Africa': inizia l'indipendenza di 17 nazioni africane (prima il Camerun)", category: "politica", importance: 2 },
    { year: toNumber("12/04/1961"), title: "Yuri Gagarin nello spazio: primo uomo in orbita terrestre sulla Vostok 1", category: "tecnologia", importance: 2 },
    { year: toNumber("16/10/1962"), title: "Crisi dei missili di Cuba: inizio dei tredici giorni che portarono il mondo sull'orlo nucleare", category: "politica", importance: 3 },
    { year: toNumber("05/07/1962"), title: "Indipendenza dell'Algeria: fine della guerra contro la Francia e degli accordi di Evian", category: "politica", importance: 3 },
    { year: toNumber("28/08/1963"), title: "'I Have a Dream': Martin Luther King Jr. parla alla marcia su Washington", category: "cultura", importance: 2 },
    { year: toNumber("28/05/1964"), title: "Fondazione dell'Organizzazione per la Liberazione della Palestina (OLP) a Gerusalemme", category: "politica", importance: 3 },
    { year: toNumber("05/06/1967"), title: "Guerra dei Sei Giorni: Israele lancia l'attacco preventivo contro l'Egitto", category: "politica", importance: 2 },
    { year: toNumber("30/05/1967"), title: "Pubblicazione di 'Cent'anni di solitudine' di Gabriel García Márquez a Buenos Aires", category: "cultura", importance: 4 },
    { year: toNumber("09/10/1967"), title: "Esecuzione di Ernesto 'Che' Guevara in Bolivia dopo la cattura a opera della CIA", category: "politica", importance: 3 },
    { year: toNumber("03/12/1967"), title: "Christiaan Barnard esegue il primo trapianto di cuore umano al mondo a Città del Capo", category: "scienza", importance: 2 },
    { year: toNumber("04/04/1968"), title: "Assassinio di Martin Luther King Jr. a Memphis", category: "politica", importance: 2 },
    { year: toNumber("03/05/1968"), title: "Maggio francese: l'occupazione della Sorbona dà il via alle proteste del Sessantotto", category: "politica", importance: 3 },
    { year: toNumber("20/07/1969"), title: "Sbarco sulla Luna: Neil Armstrong e Buzz Aldrin camminano sul suolo lunare", category: "tecnologia", importance: 1 },
    { year: toNumber("15/08/1969"), title: "Inizio del Festival di Woodstock nelle campagne di Bethel", category: "cultura", importance: 3 },
    { year: toNumber("29/10/1969"), title: "Nascita di ARPANET: primo messaggio inviato tra i computer di UCLA e Stanford", category: "tecnologia", importance: 4 },
    { year: toNumber("12/12/1969"), title: "Strage di Piazza Fontana a Milano: strategia della tensione in Italia ad opera di gruppi neofascisti e servizi segreti deviati", category: "politica", importance: 3 },

    
    // 1970s
    { year: toNumber("15/08/1971"), title: "Nixon Shock: gli USA sospendono la convertibilità del dollaro in oro, fine di Bretton Woods", category: "politica", importance: 2 },
    { year: toNumber("07/02/1971"), title: "Il suffragio femminile viene approvato tramite referendum federale in Svizzera", category: "politica", importance: 3 },
    { year: toNumber("06/10/1973"), title: "Guerra dello Yom Kippur e conseguente Crisi petrolifera", category: "politica", importance: 2 },
    { year: toNumber("11/09/1973"), title: "Colpo di Stato in Cile: le forze di Pinochet assaltano il palazzo della Moneda", category: "politica", importance: 2 },
    { year: toNumber("09/08/1974"), title: "Dimissioni di Richard Nixon a seguito dello scandalo Watergate", category: "politica", importance: 2 },
    { year: toNumber("11/11/1975"), title: "Indipendenza dell'Angola: fine formale dell'impero coloniale portoghese in Africa", category: "politica", importance: 3 },
    { year: toNumber("20/08/1977"), title: "Lancio della sonda Voyager 2 (seguita dalla Voyager 1 il 5 settembre)", category: "scienza", importance: 2 },
    { year: toNumber("17/09/1978"), title: "Firma degli Accordi di Camp David tra Anwar al-Sadat e Menachem Begin", category: "politica", importance: 3 },
    { year: toNumber("11/02/1979"), title: "Rivoluzione Islamica in Iran: le forze di Khomeini prendono il controllo definitivo", category: "politica", importance: 3 },
    { year: toNumber("01/07/1979"), title: "Sony lancia il Walkman TPS-L2, rivoluzionando l'ascolto personale della musica", category: "tecnologia", importance: 4 },

    // 1980s
    { year: toNumber("08/05/1980"), title: "L'OMS dichiara eradicato il vaiolo nel mondo", category: "scienza", importance: 2 },
    { year: toNumber("12/04/1981"), title: "Lancio del primo Space Shuttle (Columbia), inizia l'era dei velivoli riutilizzabili", category: "tecnologia", importance: 2 },
    { year: toNumber("01/08/1981"), title: "Nasce MTV: il primo video trasmesso è 'Video Killed the Radio Star'", category: "cultura", importance: 5 },
    { year: toNumber("20/05/1983"), title: "Il team di Luc Montagnier isola il virus HIV, articolo su Science", category: "scienza", importance: 2 },
    { year: toNumber("13/07/1985"), title: "Concerto Live Aid: il più grande evento rock a scopo benefico della storia", category: "cultura", importance: 5 },
    { year: toNumber("13/09/1985"), title: "Uscita di Super Mario Bros. in Giappone, rivoluzione dell'industria dei videogiochi", category: "cultura", importance: 5 },
    { year: toNumber("28/01/1986"), title: "Disastro dello Space Shuttle Challenger: esplosione 73 secondi dopo il lancio", category: "tecnologia", importance: 3 },
    { year: toNumber("26/04/1986"), title: "Disastro di Chernobyl", category: "politica", importance: 1 },
    { year: toNumber("01/09/1989"), title: "Pubblicazione de 'I pilastri della terra' di Ken Follett", category: "cultura", importance: 3 },
    { year: toNumber("09/11/1989"), title: "Caduta del Muro di Berlino: la Germania Est apre i confini con l'Ovest, crollo del blocco sovietico e avvio della riunificazione tedesca", category: "politica", importance: 1 },

    // 1990s
    { year: toNumber("24/04/1990"), title: "Lancio del Telescopio Spaziale Hubble a bordo dello Space Shuttle Discovery", category: "scienza", importance: 3 },
    { year: toNumber("26/12/1991"), title: "Dissoluzione dell'Unione Sovietica: il Soviet Supremo dichiara la fine dell'URSS", category: "politica", importance: 1 },
    { year: toNumber("25/06/1991"), title: "Inizio della dissoluzione della Jugoslavia: Slovenia e Croazia dichiarano l'indipendenza", category: "politica", importance: 2 },
    { year: toNumber("06/08/1991"), title: "Nascita del World Wide Web: Tim Berners-Lee pubblica il primo sito web", category: "tecnologia", importance: 1 },
    { year: toNumber("06/04/1992"), title: "Inizio della guerra in Bosnia ed Erzegovina con l'assedio di Sarajevo", category: "politica", importance: 2 },
    { year: toNumber("10/05/1994"), title: "Fine dell'Apartheid: Nelson Mandela giura come primo presidente nero del Sudafrica", category: "politica", importance: 2 },
    { year: toNumber("07/04/1994"), title: "Inizio del genocidio in Ruanda dopo l'abbattimento dell'aereo presidenziale", category: "politica", importance: 3 },
    { year: toNumber("11/07/1995"), title: "Massacro di Srebrenica: le forze serbo-bosniache occupano la zona protetta ONU", category: "politica", importance: 2 },
    { year: toNumber("05/07/1996"), title: "Nascita della pecora Dolly: nei laboratori del Roslin Institute nasce il primo clone", category: "scienza", importance: 2 },
    { year: toNumber("04/09/1998"), title: "Fondazione di Google: Larry Page e Sergey Brin registrano la società in California", category: "tecnologia", importance: 5 },
    { year: toNumber("24/03/1999"), title: "Guerra del Kosovo: la NATO inizia i bombardamenti contro la Jugoslavia", category: "politica", importance: 2 },
    { year: toNumber("31/03/1999"), title: "Esce nei cinema statunitensi 'Matrix', rivoluzionando la fantascienza e l'estetica cyberpunk", category: "cultura", importance: 5 },

    
    // 2000s
    { year: toNumber("15/01/2001"), title: "Lancio di Wikipedia", category: "tecnologia", importance: 4 },
    { year: toNumber("11/09/2001"), title: "Attentati dell'11 settembre: terroristi dirottano aerei di linea contro le Torri Gemelle, evento che cambia la geopolitica mondiale", category: "politica", importance: 1 },
    { year: toNumber("07/10/2001"), title: "Inizio della Guerra in Afghanistan (Operazione Enduring Freedom)", category: "politica", importance: 2 },
    { year: toNumber("20/03/2003"), title: "Inizio della Guerra in Iraq (Operazione Iraqi Freedom)", category: "politica", importance: 2 },
    { year: toNumber("14/04/2003"), title: "Completamento del Progetto Genoma Umano", category: "scienza", importance: 2 },
    { year: toNumber("04/02/2004"), title: "Fondazione di Facebook (lancio originale di 'TheFacebook')", category: "tecnologia", importance: 2 },
    { year: toNumber("14/02/2005"), title: "Lancio di YouTube (registrazione del dominio e rivoluzione video)", category: "tecnologia", importance: 4 },
    { year: toNumber("21/03/2006"), title: "Lancio di Twitter (pubblicazione del primo tweet di Jack Dorsey)", category: "tecnologia", importance: 4 },
    { year: toNumber("09/01/2007"), title: "Steve Jobs presenta il primo iPhone al Macworld", category: "tecnologia", importance: 1 },
    { year: toNumber("31/10/2008"), title: "Nascita di Bitcoin: Satoshi Nakamoto pubblica il whitepaper", category: "tecnologia", importance: 2 },

        // 2010s
    { year: toNumber("04/01/2010"), title: "Completamento del Burj Khalifa a Dubai (il grattacielo più alto del mondo)", category: "tecnologia", importance: 2 },
    { year: toNumber("17/12/2010"), title: "Primavera Araba", category: "politica", importance: 2 },
    { year: toNumber("11/03/2011"), title: "Disastro nucleare di Fukushima", category: "scienza", importance: 2 },
    { year: toNumber("14/10/2011"), title: "Pubblicazione de 'L'amica geniale' (Elena Ferrante)", category: "cultura", importance: 4 },
    { year: toNumber("28/06/2012"), title: "Sviluppo della tecnica CRISPR-Cas9 per l'editing genetico (Charpentier e Doudna)", category: "scienza", importance: 2 },
    { year: toNumber("18/03/2014"), title: "Annessione russa della Crimea", category: "politica", importance: 3 },
    { year: toNumber("21/12/2015"), title: "Primo atterraggio morbido e riutilizzo di un razzo orbitale (Falcon 9 di SpaceX)", category: "tecnologia", importance: 3 },
    { year: toNumber("10/04/2019"), title: "Prima foto di un buco nero", category: "scienza", importance: 2 },

    
// 2020s
    { year: toNumber("29/04/2020"), title: "Boom di TikTok: l'app supera i 2 miliardi di download e impone il modello del feed algoritmico", category: "cultura", importance: 5 },
    { year: toNumber("25/12/2021"), title: "Lancio del Telescopio Spaziale James Webb dalla base di Kourou", category: "scienza", importance: 2 },
    { year: toNumber("15/08/2021"), title: "Caduta di Kabul e ritorno al potere dei Talebani in Afghanistan", category: "politica", importance: 3 },
    { year: toNumber("24/02/2022"), title: "Invasione russa dell'Ucraina", category: "politica", importance: 1 },
    { year: toNumber("30/11/2022"), title: "OpenAI lancia ChatGPT, segnando l'inizio della diffusione di massa dell'IA generativa", category: "tecnologia", importance: 2 },
    { year: toNumber("26/07/2024"), title: "Cerimonia di apertura dei Giochi della XXXIII Olimpiade a Parigi", category: "cultura", importance: 3 },
    { year: toNumber("18/01/2024"), title: "BMW integra i robot umanoidi Figure 01 nella produzione negli Stati Uniti", category: "tecnologia", importance: 3 },
    { year: toNumber("08/12/2023"), title: "La FDA approva Casgevy, la prima terapia genica basata su CRISPR per l'uso umano", category: "scienza", importance: 3 },
    { year: toNumber("04/09/2026"), title: "Missione Artemis II: record previsto di distanza umana dalla Terra (406.773 km)", category: "scienza", importance: 2 }
];

const frenchRevolutionEvents = [
    { year: toNumber("05/05/1789"), title: "Apertura degli Stati Generali a Versailles: l'ultima assemblea dei tre ordini prima della rottura", category: "politica", importance: 3 },
    { year: toNumber("20/06/1789"), title: "Giuramento della Pallacorda: il Terzo Stato si impegna a dare una Costituzione alla Francia", category: "politica", importance: 3 },
    { year: toNumber("14/07/1789"), title: "Presa della Bastiglia: il popolo di Parigi insorge e distrugge il simbolo dell'assolutismo", category: "politica", importance: 1 },
    { year: toNumber("26/08/1789"), title: "L'Assemblea Costituente francese approva la 'Dichiarazione dei diritti dell'uomo e del cittadino', sancendo i principi di libertà e uguaglianza", category: "politica", importance: 2 },
    { year: toNumber("02/11/1789"), title: "Nazionalizzazione dei beni della Chiesa: l'Assemblea dichiara le proprietà ecclesiastiche a disposizione della nazione", category: "cultura", importance: 3 },
    { year: toNumber("03/09/1791"), title: "Sanzione della Costituzione del 1791: la Francia diventa formalmente una monarchia costituzionale", category: "politica", importance: 2 },
    { year: toNumber("25/04/1792"), title: "Primo utilizzo della ghigliottina: viene introdotta come metodo di esecuzione 'umanitario' e scientifico", category: "tecnologia", importance: 3 },
    { year: toNumber("10/08/1792"), title: "Assalto alle Tuileries: caduta della monarchia e arresto della famiglia reale", category: "politica", importance: 3 },
    { year: toNumber("21/01/1793"), title: "Esecuzione di Luigi XVI: il re viene ghigliottinato in Place de la Révolution", category: "politica", importance: 2 },
    { year: toNumber("01/08/1793"), title: "Istituzione del Sistema Metrico Decimale: la Convenzione adotta standard uniformi per pesi e misure", category: "scienza", importance: 2 },
    { year: toNumber("05/10/1793"), title: "Introduzione del Calendario Repubblicano: la Rivoluzione riscrive il tempo eliminando i riferimenti religiosi", category: "cultura", importance: 3 },
    { year: toNumber("10/08/1793"), title: "Inaugurazione del Museo del Louvre: il palazzo reale diventa il primo grande museo pubblico d'arte", category: "cultura", importance: 4 },
    { year: toNumber("08/06/1794"), title: "Festa dell'Essere Supremo: Robespierre tenta di instaurare una nuova religione di Stato deista", category: "cultura", importance: 4 },
    { year: toNumber("26/06/1794"), title: "Battaglia di Fleurus: primo impiego militare di un aerostato (pallone frenato) per l'osservazione", category: "tecnologia", importance: 4 },
    { year: toNumber("27/07/1794"), title: "Caduta di Robespierre (9 Termidoro): fine del Regime del Terrore e inizio della fase moderata", category: "politica", importance: 2 },
    { year: toNumber("07/04/1795"), title: "Adozione definitiva del metro e del chilogrammo come unità di misura ufficiali in Francia", category: "scienza", importance: 4 },
    { year: toNumber("09/11/1799"), title: "Colpo di Stato del 18 brumaio: Napoleone Bonaparte prende il potere e segna la fine della Rivoluzione", category: "politica", importance: 2 }
];


const mancanti_900_949 = [
    // 900s
    { year: toNumber("12/05/907"), title: "Caduta della Dinastia Tang: il generale Zhu Wen depone l'imperatore Ai, ponendo fine a un'era imperiale", category: "politica", importance: 1 },
    
    // 910s
    { year: toNumber("02/09/910"), title: "Fondazione dell'Abbazia di Cluny: il duca Guglielmo d'Aquitania firma l'atto di donazione per il nuovo monastero", category: "cultura", importance: 2 },
    { year: toNumber("16/10/912"), title: "Ascesa di Abd al-Rahman III come emiro di Cordova, segnando l'inizio di un'epoca di stabilità in al-Andalus", category: "politica", importance: 1 },
    { year: toNumber("24/05/919"), title: "Elezione di Enrico I l'Uccellatore: i duchi di Franconia e Sassonia lo scelgono come Re dei Franchi Orientali", category: "politica", importance: 1 },
    
    // 920s
    { year: toNumber("12/07/927"), title: "Unificazione dell'Inghilterra: il re Athelstan riceve la sottomissione dei sovrani britannici a Eamont Bridge", category: "politica", importance: 1 },
    { year: toNumber("16/01/929"), title: "Proclamazione del Califfato di Cordova: Abd al-Rahman III assume il titolo di Califfo", category: "politica", importance: 1 },
    
    // 930s
    { year: toNumber("07/08/936"), title: "Incoronazione di Ottone I il Grande ad Aquisgrana, successore di Enrico l'Uccellatore", category: "politica", importance: 1 },
    { year: toNumber("31/12/938"), title: "Battaglia del fiume Bach Dang: Ngô Quyền sconfigge i cinesi, sancendo l'indipendenza del Vietnam", category: "politica", importance: 2 },
    
    // 940s
    { year: toNumber("27/01/945"), title: "Costantino VII Porfirogenito depone i co-imperatori Lecapeni e diventa unico sovrano bizantino", category: "politica", importance: 2 },
    { year: toNumber("01/10/945"), title: "Olga di Kiev assume la reggenza della Rus' dopo l'uccisione del marito Igor per mano dei Drevliani", category: "politica", importance: 2 },
    { year: toNumber("03/11/946"), title: "Eruzione del Monte Paektu: la 'Grande Eruzione' deposita ceneri fino in Giappone (data stimata all'inizio dell'anno)", category: "scienza", importance: 2 },
    { year: 948, title: "Fondazione del Regno di Nri in Nigeria ad opera di Eri, figura semimitica del popolo Igbo", category: "politica", importance: 3 }
];


const mancanti_950_999 = [
    // 950s
    { year: toNumber("10/08/955"), title: "Battaglia di Lechfeld: Ottone I sconfigge definitivamente i Magiari", category: "politica", importance: 1 },
    
    // 960s
    { year: toNumber("07/03/961"), title: "Riconquista di Creta: Niceforo Foca strappa l'isola ai Saraceni", category: "politica", importance: 2 },
    { year: toNumber("15/07/965"), title: "Crollo del Khaganato Khazaro: Svjatoslav I di Kiev distrugge la potenza khazara", category: "politica", importance: 2 },
    { year: toNumber("14/04/966"), title: "Battesimo della Polonia: Mieszko I si converte, nasce lo stato polacco moderno", category: "cultura", importance: 2 },
    
    // 970s
    { year: toNumber("24/07/971"), title: "Battaglia di Dorostolon: Giovanni I Zimisce sconfigge Svjatoslav I di Kiev", category: "politica", importance: 2 },
    { year: toNumber("24/06/972"), title: "Battaglia di Cedynia: prima vittoria documentata dei polacchi contro i tedeschi", category: "politica", importance: 3 },
    { year: toNumber("07/05/973"), title: "Morte di Ottone I il Grande: gli succede Ottone II", category: "politica", importance: 2 },
    
    // 980s
    { year: toNumber("01/06/982"), title: "Erik il Rosso scopre la Groenlandia e inizia la colonizzazione norrena", category: "scienza", importance: 2 },
    { year: toNumber("03/07/987"), title: "Incoronazione di Ugo Capeto: inizia la dinastia dei Capetingi in Francia", category: "politica", importance: 1 },
    
    // 990s
    { year: toNumber("03/05/996"), title: "Consacrazione di Gregorio V: Ottone III nomina il primo papa tedesco", category: "politica", importance: 2 },
    { year: toNumber("01/02/997"), title: "Stefano I diventa Gran Principe degli Ungheresi", category: "politica", importance: 2 },
    { year: toNumber("02/04/999"), title: "Elezione di Papa Silvestro II: il primo papa francese e grande scienziato", category: "cultura", importance: 2 }
];


const mancanti_1000_1049 = [
    // 1000s
    { year: toNumber("01/01/1001"), title: "Stefano I viene incoronato Re d'Ungheria: nascita del Regno d'Ungheria", category: "politica", importance: 2 },
    { year: toNumber("27/11/1001"), title: "Battaglia di Peshawar: Mahmud di Ghazna sconfigge la Confederazione Hindu", category: "politica", importance: 3 },
    { year: toNumber("23/01/1005"), title: "Trattato di Shanyuan: pace tra la Dinastia Song e la Dinastia Liao", category: "politica", importance: 2 },
    
    // 1010s
    { year: toNumber("23/04/1014"), title: "Battaglia di Clontarf: Brian Boru sconfigge i vichinghi in Irlanda", category: "politica", importance: 3 },
    { year: toNumber("29/07/1014"), title: "Battaglia di Kleidion: Basilio II annienta l'esercito bulgaro", category: "politica", importance: 2 },
    { year: toNumber("30/11/1016"), title: "Cnut il Grande diventa Re d'Inghilterra dopo la morte di Edmondo Ironside", category: "politica", importance: 2 },
    
    // 1020s
    { year: toNumber("04/09/1024"), title: "Elezione di Corrado II: inizia la Dinastia Salica nel Sacro Romano Impero", category: "politica", importance: 3 },
    { year: toNumber("26/03/1027"), title: "Coronazione imperiale di Corrado II a Roma", category: "politica", importance: 3 },
    
    // 1030s
    { year: toNumber("30/11/1031"), title: "Crollo del Califfato di Cordova e inizio del periodo dei Regni di Taifa", category: "politica", importance: 2 },
    { year: toNumber("15/05/1037"), title: "Tughril Beg si proclama Sultano: ascesa dell'Impero Selgiuchide", category: "politica", importance: 2 },
    
    // 1040s
    { year: toNumber("23/05/1040"), title: "Battaglia di Dandanaqan: i Selgiuchidi sconfiggono i Ghaznavidi", category: "politica", importance: 3 },
    { year: toNumber("08/06/1042"), title: "Edoardo il Confessore sale al trono d'Inghilterra", category: "politica", importance: 2 },
    { year: toNumber("10/09/1048"), title: "Battaglia di Kapetron: primo grande scontro tra Bizantini e Selgiuchidi", category: "politica", importance: 3 }
];

const mancanti_1050_1099 = [
    // 1050s
    { year: toNumber("18/06/1053"), title: "Battaglia di Civitate: i Normanni sconfiggono le forze pontificie di Leone IX", category: "politica", importance: 3 },
    { year: toNumber("04/07/1054"), title: "Osservazione della supernova SN 1054 (Nebulosa del Granchio) da parte di astronomi cinesi e arabi", category: "scienza", importance: 2 },
    { year: toNumber("15/12/1055"), title: "I turchi selgiuchidi guidati da Tughril Beg conquistano Baghdad, ponendo fine al dominio buwayhide", category: "politica", importance: 2 },
    { year: toNumber("23/08/1059"), title: "Trattato di Melfi: Papa Niccolò II riconosce ufficialmente i possedimenti normanni nel Sud Italia", category: "politica", importance: 3 },
    
    // 1060s
    { year: 1061, title: "Inizio della conquista normanna della Sicilia con la presa di Messina da parte di Ruggero I", category: "politica", importance: 2 },
    { year: 1062, title: "Fondazione di Marrakech da parte degli Almoravidi, che ne fanno la loro capitale", category: "cultura", importance: 3 },
    { year: toNumber("05/01/1066"), title: "Morte di Edoardo il Confessore e crisi di successione al trono d'Inghilterra", category: "politica", importance: 2 },
    { year: toNumber("25/09/1066"), title: "Battaglia di Stamford Bridge: Harald III di Norvegia viene sconfitto, fine dell'era delle invasioni vichinghe in Inghilterra", category: "politica", importance: 2 },
    { year: 1069, title: "Devastazione dell'Inghilterra settentrionale ('Harrying of the North') per ordine di Guglielmo il Conquistatore", category: "politica", importance: 3 },
    
    // 1070s
    { year: 1070, title: "Fondazione della città di Bergen in Norvegia", category: "cultura", importance: 3 },
    { year: toNumber("16/04/1071"), title: "Caduta di Bari: i Normanni conquistano l'ultimo avamposto bizantino nell'Italia meridionale", category: "politica", importance: 2 },
    { year: toNumber("10/01/1072"), title: "Presa di Palermo da parte dei Normanni di Roberto il Guiscardo e Ruggero I", category: "politica", importance: 2 },
    { year: 1077, title: "Fondazione del Sultanato di Rum in Anatolia da parte dei turchi selgiuchidi", category: "politica", importance: 2 },
    { year: 1078, title: "Inizio della costruzione della Torre Bianca all'interno della Torre di Londra", category: "tecnologia", importance: 3 },
    
    // 1080s
    { year: toNumber("04/04/1081"), title: "Ascesa al trono di Alessio I Comneno a Bisanzio, inizio della restaurazione comnena", category: "politica", importance: 2 },
    { year: toNumber("25/05/1085"), title: "Riconquista di Toledo da parte di Alfonso VI di Castiglia, momento chiave della Reconquista", category: "politica", importance: 1 },
    { year: 1086, title: "Completamento del Domesday Book, il grande censimento dell'Inghilterra voluto da Guglielmo I", category: "politica", importance: 2 },
    { year: toNumber("23/10/1086"), title: "Battaglia di Sagrajas: gli Almoravidi sconfiggono le forze castigliane, frenando temporaneamente la Reconquista", category: "politica", importance: 2 },
    { year: toNumber("12/03/1088"), title: "Elezione di Papa Urbano II, futuro promotore della Prima Crociata", category: "politica", importance: 2 },
    
    // 1090s
    { year: toNumber("04/09/1090"), title: "Hassan-i Sabbah conquista la fortezza di Alamut, stabilendo lo stato degli 'Assassini'", category: "politica", importance: 3 },
    { year: toNumber("29/04/1091"), title: "Battaglia di Levounion: l'imperatore Alessio I annienta i Pecheneghi con l'aiuto dei Cumani", category: "politica", importance: 3 },
    { year: toNumber("15/06/1094"), title: "El Cid completa la conquista di Valencia, governandola fino alla morte", category: "politica", importance: 3 },
    { year: toNumber("27/11/1095"), title: "Concilio di Clermont: Papa Urbano II lancia l'appello per la Prima Crociata", category: "politica", importance: 1 },
    { year: toNumber("03/06/1098"), title: "Presa di Antiochia da parte dei crociati dopo un lungo assedio", category: "politica", importance: 2 },
    { year: toNumber("13/04/1059"), title: "Bolla 'In nomine Domini': Papa Niccolò II stabilisce che l'elezione del Papa spetta esclusivamente ai cardinali", category: "politica", importance: 2 }
];


const mancanti_1100_1140 = [
    { year: 1101, title: "Crociata del 1101: Sconfitta dei crociati da parte dei turchi selgiuchidi in Anatolia", category: "politica", importance: 4 },
    // CORRETTO: Battaglia combattuta il 28 settembre 1106
    { year: toNumber("28/09/1106"), title: "Battaglia di Tinchebray: Enrico I d'Inghilterra sconfigge e cattura il fratello Roberto II, reuniﬁcando Inghilterra e Normandia", category: "politica", importance: 3 },
    // CORRETTO: Trattato siglato nel settembre 1108 (usato convenzionalmente il 15/09)
    { year: toNumber("15/09/1108"), title: "Trattato di Devol: Boemondo I d'Antiochia riconosce la sovranità dell'Impero Bizantino sul suo principato", category: "politica", importance: 3 },
    // CORRETTO: Il patto fu siglato il 9 febbraio 1111
    { year: toNumber("09/02/1111"), title: "Patto di Sutri tra l'imperatore Enrico V e papa Pasquale II (tentativo fallito di risolvere la lotta per le investiture)", category: "politica", importance: 3 },
    // CORRETTO: Riconoscimento ufficiale nel Concilio di Nablus del 16 gennaio 1120 (il 1119/1118 è l'anno di associazione iniziale, usato intero per tradizione)
    { year: 1119, title: "Fondazione dell'Ordine dei Cavalieri Templari a Gerusalemme (data tradizionale 1119)", category: "politica", importance: 4 },
    // CORRETTO: Lo scontro sanguinoso avvenne il 28 giugno 1119
    { year: toNumber("28/06/1119"), title: "Battaglia dell'Ager Sanguinis (Campo del Sangue): grave sconfitta del Principato d'Antiochia contro i turchi", category: "politica", importance: 3 },
    // CORRETTO: Spostato all'anno reale di fondazione (1115). Aguda proclama la dinastia Jīn il 28 gennaio 1115
    { year: toNumber("28/01/1115"), title: "I ribelli Jurchen fondano la dinastia Jīn in Cina e distruggono la dinastia Liao", category: "politica", importance: 4 },
    // CORRETTO: Lo scisma inizia con la doppia elezione papale del 14 febbraio 1130
    { year: toNumber("14/02/1130"), title: "Inizio dello scisma papale tra Papa Innocenzo II e l'antipapa Anacleto II", category: "politica", importance: 3 },
    { year: 1132, title: "Inizio della dinastia dei Song Meridionali in Cina, con capitale a Lin'an (Hangzhou)", category: "politica", importance: 4 },
    // CORRETTO: Il sovrano si spense in Normandia il 1° dicembre 1135
    { year: toNumber("01/12/1135"), title: "Morte di Enrico I d'Inghilterra e inizio del periodo di guerra civile noto come 'L'Anarchia' (1135-1153)", category: "politica", importance: 4 },
    // CORRETTO: Accordo firmato l'11 agosto 1137
    { year: toNumber("11/08/1137"), title: "Unione della Catalogna e dell'Aragona tramite il matrimonio di Petronilla d'Aragona e Raimondo Berengario IV di Barcellona", category: "politica", importance: 3 },
    // CORRETTO: La storica battaglia si consumò il 25 luglio 1139
    { year: toNumber("25/07/1139"), title: "Battaglia di Ourique: Alfonso I del Portogallo sconfigge gli Almoravidi e si proclama Re del Portogallo", category: "politica", importance: 4 },
    // CORRETTO: Battaglia combattuta il 2 febbraio 1141
    { year: toNumber("02/02/1141"), title: "Battaglia di Lincoln: Re Stefano d'Inghilterra viene sconfitto e catturato dalle forze di Matilde", category: "politica", importance: 3 },
    // CORRETTO: Lo scontro vicino a Samarcanda avvenne il 9 settembre 1141
    { year: toNumber("09/09/1141"), title: "Battaglia di Qatwan: I Kara Khitai (Liao Occidentali) sconfiggono l'Impero Selgiuchide", category: "politica", importance: 4 },
    // CORRETTO: Le truppe di Zengi espugnarono la città il 24 dicembre 1144
    { year: toNumber("24/12/1144"), title: "Caduta di Edessa, conquistata da Zengi, che causerà la Seconda Crociata", category: "politica", importance: 4 },
    // CORRETTO: La bolla papale fu promulgata a Vetralla il 1° dicembre 1145
    { year: toNumber("01/12/1145"), title: "Papa Eugenio III emette la bolla Quantum praedecessores, chiamando alla Seconda Crociata", category: "politica", importance: 3 },
    // CORRETTO: L'assedio si concluse con la resa della città il 25 ottobre 1147
    { year: toNumber("25/10/1147"), title: "Conquista di Lisbona da parte di Alfonso I del Portogallo, aiutato dai crociati", category: "politica", importance: 4 },
    // CORRETTO: Convenzionalmente avviata con la partenza delle armate papali/regali a maggio 1147 (usato il 01/05)
    { year: toNumber("01/05/1147"), title: "Inizio della Seconda Crociata guidata da Luigi VII di Francia e Corrado III di Germania", category: "politica", importance: 4 }
];


const late16thCenturyEvents = [
    { year: toNumber("12/06/1560"), title: "Battaglia di Okehazama (Oda Nobunaga inizia l'unificazione del Giappone)", category: "politica", importance: 3 },
    { year: toNumber("26/04/1564"), title: "Battesimo di William Shakespeare", category: "cultura", importance: 4 },
    { year: toNumber("06/09/1566"), title: "Morte di Solimano il Magnifico (fine dell'apogeo ottomano)", category: "politica", importance: 3 },
    { year: toNumber("24/06/1571"), title: "Fondazione di Manila da parte degli spagnoli (Legazpi)", category: "politica", importance: 3 },
    { year: toNumber("24/08/1572"), title: "Massacro di San Bartolomeo in Francia (strage di Ugonotti)", category: "politica", importance: 3 },
    { year: toNumber("04/11/1576"), title: "Sacco di Anversa (Spaanse Furie) durante la Guerra degli Ottant'anni", category: "politica", importance: 4 },
    { year: toNumber("13/12/1577"), title: "Francis Drake inizia la sua circumnavigazione del globo", category: "tecnologia", importance: 4 },
    { year: toNumber("21/06/1582"), title: "Incidente di Honnō-ji: assassinio di Oda Nobunaga in Giappone", category: "politica", importance: 4 },
    { year: toNumber("10/07/1584"), title: "Assassinio di Guglielmo I d'Orange (il Taciturno)", category: "politica", importance: 3 },
    { year: toNumber("08/02/1587"), title: "Decapitazione di Maria Stuarda (Regina di Scozia)", category: "politica", importance: 3 },
    { year: toNumber("14/03/1590"), title: "Battaglia di Ivry (Enrico IV di Francia sconfigge la Lega Cattolica)", category: "politica", importance: 3 },
    { year: toNumber("12/03/1591"), title: "Battaglia di Tondibi (il Marocco sconfigge l'Impero Songhai)", category: "politica", importance: 3 },
    { year: toNumber("31/03/1596"), title: "Nascita di René Descartes (Cartesio)", category: "cultura", importance: 4 },
    { year: toNumber("18/09/1598"), title: "Morte di Toyotomi Hideyoshi", category: "politica", importance: 4 }
];


const extraEvents = [
    // Pre-1900s extra
    { year: toNumber("01/11/1478"), title: "Sisto IV emana la bolla che istituisce l'Inquisizione Spagnola", category: "politica", importance: 4 },
    { year: toNumber("03/02/1488"), title: "Bartolomeo Diaz doppia il Capo di Buona Speranza", category: "tecnologia", importance: 3 },
    { year: toNumber("24/06/1497"), title: "Giovanni Caboto approda sulle coste del Nord America", category: "politica", importance: 3 },
    { year: toNumber("15/05/1503"), title: "Amerigo Vespucci definisce le nuove terre 'Mundus Novus' in una lettera ai Medici", category: "cultura", importance: 3 },
    { year: toNumber("08/09/1504"), title: "Michelangelo svela al pubblico il David a Firenze", category: "cultura", importance: 3 },
    { year: toNumber("18/04/1506"), title: "Posa della prima pietra della nuova Basilica di San Pietro a Roma", category: "cultura", importance: 3 },
    { year: toNumber("25/04/1507"), title: "Waldseemüller pubblica la mappa che utilizza per la prima volta il nome 'America'", category: "cultura", importance: 3 },
    { year: toNumber("01/12/1516"), title: "Pubblicazione de 'L'Utopia' di Thomas More a Lovanio", category: "cultura", importance: 4 },
    { year: toNumber("13/08/1521"), title: "Caduta di Tenochtitlán: Hernán Cortés conquista l'Impero Azteco", category: "politica", importance: 3 },
    { year: toNumber("24/02/1525"), title: "Battaglia di Pavia: vittoria imperiale e cattura di Francesco I di Francia", category: "politica", importance: 3 },
    { year: toNumber("29/08/1526"), title: "Battaglia di Mohács: gli Ottomani travolgono il Regno d'Ungheria", category: "politica", importance: 3 },
    { year: toNumber("27/09/1529"), title: "Suleimane il Magnifico inizia il primo assedio di Vienna", category: "politica", importance: 3 },
    { year: toNumber("15/11/1532"), title: "Incontro di Cajamarca: Pizarro cattura Atahualpa, crolla l'Impero Inca", category: "politica", importance: 3 },
    { year: toNumber("01/03/1536"), title: "Calvino pubblica l''Istituzione della religione cristiana' a Basilea", category: "cultura", importance: 3 },
    { year: toNumber("27/09/1540"), title: "Approvazione papale della Compagnia di Gesù (Gesuiti)", category: "cultura", importance: 3 },
    { year: toNumber("01/06/1543"), title: "Vesalio pubblica il 'De humani corporis fabrica', rivoluzionando l'anatomia", category: "scienza", importance: 3 },
    { year: toNumber("16/01/1556"), title: "Carlo V abdica formalmente al trono di Spagna a favore del figlio Filippo II", category: "politica", importance: 3 },
    { year: toNumber("21/10/1600"), title: "Battaglia di Sekigahara: inizia l'era dello Shogunato Tokugawa in Giappone", category: "politica", importance: 3 },
    { year: toNumber("03/07/1608"), title: "Samuel de Champlain fonda Québec, nucleo della Nuova Francia", category: "politica", importance: 4 },
    { year: toNumber("12/03/1610"), title: "Galileo pubblica il Sidereus Nuncius con le prime osservazioni telescopiche", category: "scienza", importance: 4 },
    { year: toNumber("20/01/1665"), title: "Robert Hooke pubblica Micrographia, introducendo il termine 'cellula'", category: "scienza", importance: 4 },
    { year: toNumber("15/06/1752"), title: "Benjamin Franklin dimostra la natura elettrica dei fulmini tramite un aquilone", category: "tecnologia", importance: 3 },
    { year: toNumber("04/06/1783"), title: "I fratelli Montgolfier effettuano la prima dimostrazione pubblica della mongolfiera", category: "tecnologia", importance: 3 },
    { year: toNumber("11/01/1818"), title: "Pubblicazione di 'Frankenstein' di Mary Shelley", category: "cultura", importance: 4 },
    { year: toNumber("08/02/1865"), title: "Gregor Mendel espone le leggi sull'ereditarietà a Brno", category: "scienza", importance: 3 },
    { year: toNumber("04/09/1882"), title: "Edison attiva a New York la prima centrale elettrica commerciale", category: "tecnologia", importance: 2 },
    { year: toNumber("26/08/1895"), title: "Tesla e Westinghouse attivano la centrale idroelettrica alle Cascate del Niagara", category: "tecnologia", importance: 2 },

    // Post-1900s extra
    { year: toNumber("01/09/1902"), title: "Proiezione di 'Viaggio nella Luna' di Georges Méliès, capolavoro del cinema fantastico", category: "cultura", importance: 3 },
    { year: toNumber("15/10/1924"), title: "André Breton pubblica il Manifesto del Surrealismo", category: "cultura", importance: 4 },
    { year: toNumber("18/02/1930"), title: "Clyde Tombaugh identifica Plutone analizzando lastre fotografiche", category: "scienza", importance: 3 },
    { year: toNumber("26/02/1935"), title: "Robert Watson-Watt dimostra per la prima volta l'efficacia del radar", category: "tecnologia", importance: 3 },
    { year: toNumber("02/12/1942"), title: "Enrico Fermi innesca la prima reazione nucleare a catena autoalimentata a Chicago", category: "scienza", importance: 3 },
    { year: toNumber("25/06/1950"), title: "Inizio della Guerra di Corea con l'invasione del Sud da parte delle truppe del Nord", category: "politica", importance: 3 },
    { year: toNumber("14/05/1955"), title: "Firma del Patto di Varsavia tra i paesi del blocco sovietico", category: "politica", importance: 4 },
    { year: toNumber("15/11/1971"), title: "Intel lancia il 4004, il primo microprocessore commerciale della storia", category: "tecnologia", importance: 3 },
    { year: toNumber("01/04/1976"), title: "Steve Jobs, Steve Wozniak e Ronald Wayne fondano la Apple Computer", category: "tecnologia", importance: 3 },
    { year: toNumber("24/01/1984"), title: "Apple lancia il Macintosh, il primo computer di massa con interfaccia grafica e mouse", category: "tecnologia", importance: 4 },
    { year: toNumber("07/02/1992"), title: "Firma del Trattato di Maastricht: nasce l'Unione Europea", category: "politica", importance: 3 },
    { year: toNumber("20/11/1998"), title: "Lancio del modulo Zarja: inizia la costruzione della Stazione Spaziale Internazionale (ISS)", category: "tecnologia", importance: 3 },
    { year: toNumber("24/08/2006"), title: "L'Unione Astronomica Internazionale declassa Plutone a pianeta nano", category: "scienza", importance: 4 },
    { year: toNumber("03/04/2010"), title: "Apple lancia l'iPad, definendo il mercato dei tablet moderni", category: "tecnologia", importance: 4 },
    { year: toNumber("15/12/1939"), title: "Anteprima mondiale di 'Via col vento' ad Atlanta", category: "cultura", importance: 4 },
    { year: toNumber("02/04/1968"), title: "Esce nei cinema '2001: Odissea nello spazio' di Stanley Kubrick", category: "cultura", importance: 4 },
    { year: toNumber("25/05/1977"), title: "Esce negli USA 'Guerre stellari' (Star Wars) di George Lucas", category: "cultura", importance: 4 },
    { year: toNumber("21/12/1925"), title: "Prima proiezione de 'La corazzata Potëmkin' di Sergej Ėjzenštejn a Mosca", category: "cultura", importance: 5 },
    { year: toNumber("26/06/1997"), title: "Pubblicazione di 'Harry Potter e la pietra filosofale' di J.K. Rowling nel Regno Unito", category: "cultura", importance: 4 },

    // Eventi storici aggiuntivi (Secoli passati)
    { year: -1200, title: "Ascesa della civiltà Olmeca in Mesoamerica", category: "cultura", importance: 3 },
    { year: 1040, title: "Invenzione della stampa a caratteri mobili in Cina (Bi Sheng)", category: "tecnologia", importance: 2 },
    { year: 1100, title: "Sviluppo e fioritura del Grande Zimbabwe", category: "politica", importance: 3 },
    { year: 1464, title: "Fondazione dell'Impero Songhai sotto Sonni Ali", category: "politica", importance: 3 },
    { year: toNumber("23/05/1568"), title: "Inizio della Guerra degli Ottant'anni (Rivolta olandese)", category: "politica", importance: 3 },
    { year: toNumber("23/05/1592"), title: "Inizio della Guerra Imjin (invasione giapponese della Corea)", category: "politica", importance: 3 },
    { year: toNumber("27/08/1689"), title: "Trattato di Nerčinsk tra Russia e Cina", category: "politica", importance: 3 },
    { year: toNumber("11/04/1713"), title: "Trattato di Utrecht (fine della Guerra di Successione Spagnola)", category: "politica", importance: 3 },
    { year: toNumber("30/11/1803"), title: "Inizio della Spedizione Balmis (prima campagna di vaccinazione globale)", category: "scienza", importance: 3 },
    { year: toNumber("05/04/1815"), title: "Eruzione del vulcano Tambora (causerà l''Anno senza estate')", category: "scienza", importance: 2 },
    { year: toNumber("08/10/1871"), title: "Grande incendio di Chicago (distruzione di gran parte della città e svolta nell'architettura moderna)", category: "cultura", importance: 3 },
    { year: toNumber("18/09/1873"), title: "Inizio della Lunga Depressione (Panico del 1873, grave crisi economica mondiale)", category: "politica", importance: 3 },
    { year: toNumber("22/01/1879"), title: "Battaglia di Isandlwana: i guerrieri Zulu sconfiggono l'esercito britannico", category: "politica", importance: 3 },
    { year: toNumber("13/03/1881"), title: "Assassinio dello Zar Alessandro II di Russia a San Pietroburgo", category: "politica", importance: 3 },
    { year: toNumber("20/05/1882"), title: "Firma della Triplice Alleanza tra Germania, Austria-Ungheria e Italia", category: "politica", importance: 2 },
    { year: toNumber("24/05/1883"), title: "Inaugurazione del Ponte di Brooklyn a New York", category: "tecnologia", importance: 4 },
    { year: toNumber("27/08/1883"), title: "Eruzione del vulcano Krakatoa (Krakatau) in Indonesia", category: "scienza", importance: 2 },
    { year: toNumber("15/08/1888"), title: "L'Associazione Fonetica Internazionale pubblica la prima versione dell'Alfabeto Fonetico Internazionale", category: "cultura", importance: 3 },
    { year: toNumber("31/08/1888"), title: "Omicidi di Jack lo Squartatore nel quartiere di Whitechapel a Londra", category: "cultura", importance: 4 },
    { year: toNumber("21/12/1891"), title: "James Naismith inventa la Pallacanestro (pubblicazione delle 13 regole originali)", category: "cultura", importance: 4 },
    { year: toNumber("01/01/1892"), title: "Apertura del centro di immigrazione di Ellis Island a New York", category: "politica", importance: 3 },
    { year: toNumber("01/03/1896"), title: "Henri Becquerel scopre la radioattività naturale (proprietà dell'uranio)", category: "scienza", importance: 2 },
    { year: toNumber("29/08/1897"), title: "Primo Congresso Sionista Mondiale organizzato da Theodor Herzl a Basilea", category: "politica", importance: 3 },
    { year: toNumber("18/09/1898"), title: "Incidente di Fascioda: massima tensione coloniale tra Francia e Regno Unito", category: "politica", importance: 3 },
    { year: toNumber("28/06/1919"), title: "Trattato di Versailles", category: "politica", importance: 2 },
    { year: 1816, title: "Shaka Zulu fonda l'Impero Zulu in Sudafrica", category: "politica", importance: 3 },
    { year: toNumber("27/01/1820"), title: "Scoperta dell'Antartide (primo avvistamento confermato da von Bellingshausen)", category: "scienza", importance: 3 },
    { year: toNumber("16/10/1846"), title: "Prima operazione chirurgica in anestesia generale (etere, W.T.G. Morton a Boston)", category: "scienza", importance: 2 },
    { year: toNumber("31/03/1854"), title: "Convenzione di Kanagawa (fine dell'isolazionismo giapponese)", category: "politica", importance: 3 },
    { year: toNumber("11/10/1899"), title: "Inizio della Seconda Guerra Boera in Sudafrica", category: "politica", importance: 3 },
    { year: toNumber("14/12/1911"), title: "Roald Amundsen raggiunge per primo il Polo Sud", category: "scienza", importance: 3 },


    // Storia della Matematica
    { year: -530, title: "Pitagora fonda la sua scuola a Crotone, unendo matematica, musica e filosofia", category: "scienza", importance: 1 },
    { year: -300, title: "Euclide scrive 'Gli Elementi', formalizzando la geometria e il metodo deduttivo", category: "scienza", importance: 1 },
    { year: -250, title: "Archimede definisce il metodo di esaustione e le basi della statica e dell'idrostatica", category: "scienza", importance: 2 },
    { year: toNumber("24/05/1684"), title: "Leibniz pubblica il primo trattato sul calcolo infinitesimale (Nova Methodus)", category: "scienza", importance: 1 },
    { year: 1748, title: "Eulero pubblica 'Introductio in analysin infinitorum', fondando l'analisi matematica moderna", category: "scienza", importance: 4 },
    { year: toNumber("29/09/1801"), title: "Gauss pubblica 'Disquisitiones Arithmeticae', opera fondamentale della teoria dei numeri", category: "scienza", importance: 4 }
];

const mancanti_600_699 = [
    { year: toNumber("23/11/602"), title: "Foca viene incoronato Imperatore Bizantino", category: "politica", importance: 3 },
    { year: toNumber("12/03/604"), title: "Morte di Papa Gregorio Magno", category: "cultura", importance: 3 },
    { year: toNumber("05/10/610"), title: "Eraclio I diventa Imperatore Bizantino", category: "politica", importance: 3 },
    { year: 613, title: "Maometto inizia la predicazione pubblica", category: "cultura", importance: 2 },
    { year: toNumber("07/08/626"), title: "Fine dell'assedio di Costantinopoli (Avari/Sassanidi)", category: "politica", importance: 3 },
    { year: toNumber("08/06/632"), title: "Morte di Maometto; elezione di Abu Bakr", category: "cultura", importance: 1 },
    { year: 637, title: "Distruzione o trasferimento della biblioteca di Ctesifonte (appross.)", category: "scienza", importance: 3 },
    { year: toNumber("08/11/641"), title: "Capitolazione di Alessandria d'Egitto", category: "politica", importance: 2 },
    { year: 642, title: "Prime evidenze dell'uso di mulini a vento ad asse verticale in Persia", category: "tecnologia", importance: 3 },
    { year: toNumber("03/11/644"), title: "Assassinio del Califfo Umar", category: "politica", importance: 3 },
    { year: 651, title: "Canonizzazione del testo scritto del Corano (metà anno)", category: "cultura", importance: 2 },
    { year: toNumber("17/06/656"), title: "Assassinio di Uthman; inizia la Prima Fitna", category: "politica", importance: 3 },
    { year: toNumber("26/01/661"), title: "Assassinio di Ali; nasce il Califfato Omayyade", category: "politica", importance: 2 },
    { year: toNumber("15/09/668"), title: "Assassinio dell'Imperatore Costante II a Siracusa", category: "politica", importance: 3 },
    { year: 672, title: "Callinico di Eliopoli sviluppa il 'Fuoco Greco'", category: "tecnologia", importance: 2 },
    { year: toNumber("01/04/674"), title: "Inizio del primo assedio arabo pluriennale a Costantinopoli", category: "politica", importance: 2 },
    { year: toNumber("20/05/685"), title: "Battaglia di Dun Nechtain: i Pitti fermano i Northumbri", category: "politica", importance: 3 },
    { year: 691, title: "Completamento della Cupola della Roccia a Gerusalemme", category: "cultura", importance: 3 },
    { year: 692, title: "Concilio Quinisesto: definisce la disciplina ecclesiastica d'Oriente", category: "politica", importance: 3 },
    { year: 695, title: "Riforma monetaria di Abd al-Malik: nasce il Dinar d'oro aniconico", category: "politica", importance: 3 },
    { year: 698, title: "Gli Arabi conquistano Cartagine, fine del dominio bizantino in Africa", category: "politica", importance: 2 }
];


const mancanti_700_799 = [
    { year: 701, title: "Promulgazione del Codice Taihō in Giappone (riorganizzazione statale)", category: "politica", importance: 2 },
    // CORRETTO: La deposizione ufficiale per colpo di stato è del 23 febbraio 705
    { year: toNumber("23/02/705"), title: "Deposizione dell'imperatrice Wu Zetian e restaurazione della dinastia Tang", category: "politica", importance: 2 },
    // CORRETTO: Coniazione avviata formalmente il 29 agosto 708
    { year: toNumber("29/08/708"), title: "Inizio della coniazione delle monete Wadōkaichin in Giappone", category: "tecnologia", importance: 3 },
    { year: 712, title: "Completamento del Kojiki, il più antico testo letterario giapponese", category: "cultura", importance: 2 },
    // CORRETTO: L'uso massiccio avvenne durante l'assedio culminato nell'agosto del 717 (usato convenzionalmente il 15/08)
    { year: toNumber("15/08/717"), title: "Uso del Fuoco Greco per respingere l'assedio arabo a Costantinopoli", category: "tecnologia", importance: 2 },
    { year: 720, title: "Completamento del Nihon Shoki (Annali del Giappone)", category: "cultura", importance: 2 },
    { year: 726, title: "Leone III emana il primo editto contro le immagini (inizio dell'Iconoclastia)", category: "cultura", importance: 2 },
    // CORRETTO: San Beda morì nell'abbazia di Jarrow il 26 maggio 735
    { year: toNumber("26/05/735"), title: "Morte di Beda il Venerabile, pioniere della datazione 'Anno Domini'", category: "scienza", importance: 3 },
    { year: 744, title: "Crollo del secondo Khaganato Turco e ascesa dell'Impero Uiguro", category: "politica", importance: 3 },
    { year: 748, title: "Prima stampa xilografica documentata di un giornale a Pechino", category: "tecnologia", importance: 3 },
    // CORRETTO: Incoronato re dei Franchi a Noyon il 9 ottobre 768
    { year: toNumber("09/10/768"), title: "Carlo Magno viene incoronato Re dei Franchi", category: "politica", importance: 2 },
    { year: 772, title: "Inizio delle Guerre Sassoni condotte da Carlo Magno", category: "politica", importance: 3 },
    // CORRETTO: La caduta di Pavia e la resa di Desiderio risalgono al 5 giugno 774
    { year: toNumber("05/06/774"), title: "Conquista di Pavia da parte di Carlo Magno e fine del Regno Longobardo", category: "politica", importance: 2 },
    { year: 785, title: "Inizio della costruzione della Grande Moschea di Cordova", category: "cultura", importance: 2 },
    // CORRETTO: Spostato dal 325 all'anno corretto 787. Il Concilio si chiuse il 23 ottobre 787
    { year: toNumber("23/10/787"), title: "Secondo Concilio di Nicea: fine temporanea dell'iconoclastia", category: "cultura", importance: 2 },
    { year: 797, title: "Irene di Atene depone il figlio e si dichiara Imperatrice (Basileus)", category: "politica", importance: 3 }
];


extraEvents.push(...mancanti_600_699);
extraEvents.push(...mancanti_700_799);

const mathHistoryEvents = [
    { year: toNumber("01/03/1874"), title: "'Sopra una proprietà della collezione di tutti i numeri algebrici reali' (Cantor fonda la teoria degli insiemi)", category: "scienza", importance: 2 },
        // La nascita dell'ipotesi del continuo (Epocale)
    { year: toNumber("01/03/1878"), title: "Georg Cantor pubblica l'articolo 'Un contributo alla teoria degli insiemi', formulando per la prima volta l'ipotesi del continuo", category: "scienza", importance: 3 },
    { year: toNumber("01/05/1895"), title: "'Contributi alla fondazione della teoria degli insiemi transfiniti' (Cantor)", category: "scienza", importance: 3 },
        // La formalizzazione del sistema assiomatico standard della matematica (Epocale)
    { year: toNumber("01/07/1922"), title: "Thoralf Skolem presenta il saggio 'Alcune osservazioni sulla teoria assiomatica degli insiemi', introducendo la logica del primo ordine e perfezionando gli assiomi di Zermelo e Fraenkel nel sistema standard ZFC", category: "scienza", importance: 3 },
    { year: toNumber("08/08/1900"), title: "David Hilbert presenta i 'Problemi matematici' al Congresso di Parigi", category: "scienza", importance: 3 },
    { year: toNumber("17/06/1899"), title: "David Hilbert presenta i 'Fondamenti della geometria' (Grundlagen della Geometrie) all'inaugurazione del monumento Gauss-Weber", category: "scienza", importance: 3 },
    { year: toNumber("15/01/1931"), title: "Pubblicazione dei Teoremi di incompletezza di Gödel", category: "scienza", importance: 2 },
    { year: toNumber("12/11/1936"), title: "Modello matematico della Macchina di Turing (articolo 'Sui numeri computabili')", category: "scienza", importance: 3 },
    { year: toNumber("14/01/1940"), title: "Prima decifrazione dei messaggi Enigma a Bletchley Park (Alan Turing)", category: "scienza", importance: 3 },
    { year: toNumber("24/10/1994"), title: "Andrew Wiles pubblica la dimostrazione corretta dell'Ultimo Teorema di Fermat", category: "scienza", importance: 3 },
    // La fondazione della teoria della complessità computazionale moderna (Epocale)
    { year: toNumber("03/05/1971"), title: "Stephen Cook pubblica il saggio 'The Complexity of Theorem-Proving Procedures', nasce il concetto di NP-completezza", category: "scienza", importance: 2 },
        // La formulazione dell'ipotesi di Riemann sui numeri primi (Epocale)
    { year: toNumber("01/11/1859"), title: "Bernhard Riemann presenta il saggio 'Circa il numero di numeri primi inferiori a una data grandezza' dove formula l' 'ipotesi di Riemann' sui numeri primi", category: "scienza", importance: 1 },
    { year: toNumber("15/01/1950"), title: "John Nash pubblica il saggio fondamentale sull'Equilibrio di Nash", category: "scienza", importance: 2 },
    { year: toNumber("01/05/1958"), title: "John Nash pubblica i teoremi di immersione geometrica", category: "scienza", importance: 3 },
    { year: toNumber("11/10/1994"), title: "John Nash riceve il Premio Nobel per l'Economia grazie alla teoria dei giochi", category: "scienza", importance: 4 },
    { year: toNumber("25/03/2015"), title: "John Nash vince il Premio Abel per i contributi alle equazioni differenziali", category: "scienza", importance: 5 },
    { year: toNumber("01/05/1975"), title: "Benoît Mandelbrot conia il termine 'frattale' e pubblica il primo saggio", category: "scienza", importance: 3 },
    { year: toNumber("01/03/1980"), title: "Benoît Mandelbrot visualizza per la prima volta l'Insieme di Mandelbrot nei laboratori IBM", category: "scienza", importance: 2 },
    { year: toNumber("01/01/1982"), title: "Benoît Mandelbrot pubblica 'The Fractal Geometry of Nature'", category: "scienza", importance: 3 },
    // La dimostrazione dell'indipendenza dell'ipotesi del continuo (Epocale)
    { year: toNumber("01/12/1963"), title: "Paul Cohen pubblica 'The Independence of the Continuum Hypothesis', dimostrando che l'ipotesi del continuo di Cantor non può essere confutata in ZFC", category: "scienza", importance: 3 },
        // La prima metà della dimostrazione sull'indipendenza dell'ipotesi del continuo (Epocale)
    { year: toNumber("15/06/1940"), title: "Kurt Gödel pubblica  'The Consistency of the Continuum Hypothesis', dimostrando che l'ipotesi del continuo di Cantor è coerente con gli assiomi di ZFC", category: "scienza", importance: 3},
    { year: 1546, title: "Niccolò Tartaglia pubblica a Venezia i 'Quesiti et inventioni diverse': nel libro IX espone la regola per le cubiche e accusa Cardano di aver violato il giuramento di segretezza", category: "scienza", importance: 3 },
    { year: 1711, title: "William Jones pubblica a Londra il 'De analysi per aequationes numero terminorum infinitas' di Newton, prima stampa del metodo delle flussioni", category: "scienza", importance: 2 },
    { year: toNumber("23/12/1763"), title: "Alla Royal Society Richard Price legge il saggio postumo di Bayes 'An Essay towards solving a Problem in the Doctrine of Chances'", category: "scienza", importance: 3 },
    { year: 1821, title: "Augustin-Louis Cauchy pubblica il 'Cours d'analyse de l'École Royale Polytechnique', fondando il rigore moderno di limiti, continuità e serie", category: "scienza", importance: 3 },
    { year: 1889, title: "Giuseppe Peano pubblica 'Arithmetices principia, nova methodo exposita', assiomatizzando formalmente i numeri naturali", category: "scienza", importance: 2 },
    { year: 1933, title: "Andrej Kolmogorov pubblica i 'Grundbegriffe der Wahrscheinlichkeitsrechnung', assiomatizzando il calcolo delle probabilità", category: "scienza", importance: 2 },
    { year: 1822, title: "Joseph Fourier pubblica il trattato 'Théorie analytique de la chaleur', fondando l'analisi armonica", category: "scienza", importance: 4 },
    { year: 1846, title: "Joseph Liouville pubblica sul Journal de mathématiques le memorie di Galois sulla risolubilità delle equazioni per radicali", category: "scienza", importance: 4 },
    { year: toNumber("18/07/1872"), title: "Karl Weierstrass presenta all'Accademia di Berlino una memoria su una funzione continua in nessun punto derivabile", category: "scienza", importance: 4 },
    { year: 1585, title: "Simon Stevin pubblica a Leida 'L'Arithmétique', formalizzando l'algoritmo della divisione euclidea tra polinomi e generalizzando il metodo di Euclide al massimo comun divisore algebrico", category: "scienza", importance: 3 },
{ year: 1804, title: "Paolo Ruffini pubblica a Modena la memoria 'Sopra la determinazione delle radici nelle equazioni numeriche di qualunque grado', descrivendo il metodo di Ruffini per la divisione rapida di un polinomio", category: "scienza", importance: 3 },

{ year: 1750, title: "Gabriel Cramer pubblica a Ginevra l''Introduction à l'analyse des lignes courbes algébriques' contenente la 'regola di Cramer' per risolvere i sistemi lineari n × n", category: "scienza", importance: 4 },

{ year: 1809, title: "Carl Friedrich Gauss pubblica la 'Theoria motus corporum coelestium' dove enuncia il 'metodo di eliminazione di Gauss' per i sistemi lineari", category: "scienza", importance: 4 },

{ year: 1888, title: "Giuseppe Peano pubblica a Torino il 'Calcolo geometrico secondo l'Ausdehnungslehre di H. Grassmann', prima assiomatizzazione rigorosa degli spazi vettoriali reali", category: "scienza", importance: 4 },

{ year: 1882, title: "Walther von Dyck pubblica i 'Gruppentheoretische Studien', prima definizione assiomatica rigorosa e generale di 'gruppo' in algebra astratta", category: "scienza", importance: 4 },

{ year: 1893, title: "Heinrich Weber pubblica 'Die allgemeinen Grundlagen der Galois'schen Gleichungstheorie', prima definizione assiomatica astratta di campo indipendente dal significato numerico degli elementi", category: "scienza", importance: 5 },

{ year: 1914, title: "Abraham Fraenkel pubblica 'Über die Teiler der Null und die Zerlegung von Ringen', prima definizione assiomatica della struttura di anello", category: "scienza", importance: 5 }
];



timelineData.push(...mathHistoryEvents);

const philosophyHistoryEvents = [
    // Storia della Filosofia
    { year: -387, title: "Platone fonda l'Accademia di Atene", category: "cultura", importance: 2 },
    { year: -335, title: "Aristotele fonda la scuola peripatetica (Il Liceo)", category: "cultura", importance: 2 },
    { year: toNumber("28/08/1641"), title: "'Meditazioni metafisiche' di Descartes", category: "cultura", importance: 3 },
    { year: 1677, title: "Pubblicazione postuma dell''Ethica' di Spinoza", category: "cultura", importance: 4 },
    { year: toNumber("17/12/1689"), title: "'Saggio sull'intelletto umano' di Locke", category: "cultura", importance: 4 },
    { year: toNumber("15/05/1781"), title: "'Critica della ragion pura' di Kant", category: "cultura", importance: 3 },
    { year: toNumber("14/04/1807"), title: "'Fenomenologia dello spirito' di Hegel", category: "cultura", importance: 4 },
    { year: toNumber("21/02/1848"), title: "'Manifesto del Partito Comunista' (Marx ed Engels)", category: "cultura", importance: 3 },
    { year: toNumber("14/09/1867"), title: "Pubblicazione de 'Il Capitale' di Marx", category: "cultura", importance: 3 },
    { year: toNumber("15/08/1883"), title: "'Così parlò Zarathustra' di Nietzsche", category: "cultura", importance: 4 },
    { year: toNumber("12/11/1921"), title: "'Tractatus Logico-Philosophicus' di Wittgenstein", category: "cultura", importance: 5 },
    { year: toNumber("15/02/1927"), title: "'Essere e tempo' di Heidegger", category: "cultura", importance: 4 },
    { year: toNumber("19/09/1648"), title: "L'esperimento sul Puy-de-Dôme di Pascal dimostra la variazione della pressione atmosferica e l'esistenza del vuoto", category: "scienza", importance: 2 },
    { year: 1653, title: "Pascal scrive il 'Trattato del triangolo aritmetico', ponendo le basi del calcolo delle probabilità", category: "scienza", importance: 3 },
    { year: toNumber("23/11/1654"), title: "Pascal vive una travolgente conversione mistica e si ritira a vita spirituale a Port-Royal", category: "cultura", importance: 4 },
    { year: 1670, title: "Pubblicazione postuma dei 'Pensieri' di Pascal, contiene la celebre 'Scommessa su Dio'", category: "cultura", importance: 3 },
    { year: toNumber("01/06/1963"), title: "Edmund Gettier pubblica 'Is Justified True Belief Knowledge?', rivoluzionando l'epistemologia con i suoi controesempi", category: "cultura", importance: 2 },
    { year: toNumber("15/04/1994"), title: "David Chalmers formula la distinzione tra problemi 'hard' e 'soft' della coscienza, rivoluzionando la filosofia della mente", category: "cultura", importance: 3 },
    { year: toNumber("01/10/1974"), title: "Thomas Nagel pubblica 'Cosa si prova a essere un pipistrello?', ponendo il problema della soggettività della coscienza", category: "cultura", importance: 3 },
    { year: toNumber("01/04/1982"), title: "Frank Jackson propone l'esperimento mentale della 'Stanza di Mary' a sostegno dell'esistenza dei qualia", category: "cultura", importance: 3 },
    { year: toNumber("01/06/1980"), title: "Il filosofo John Searle propone l'esperimento mentale della 'Stanza Cinese' contro l'Intelligenza Artificiale forte", category: "cultura", importance: 2 },
    { year: toNumber("26/04/1979"), title: "Pubblicazione di 'Gödel, Escher, Bach' di Douglas Hofstadter (vincitore del Premio Pulitzer 1980)", category: "cultura", importance: 3 },
    { year: -550, title: "Anassimandro scrive il trattato 'Sulla natura', introducendo l'apeiron come principio originario della cosmologia razionale", category: "cultura", importance: 4 },
    { year: -500, title: "Eraclito compone il trattato 'Sulla natura': dottrina del divenire e del logos (nella tradizione scolastica, 'panta rei')", category: "cultura", importance: 4 },
    { year: -445, title: "Empedocle compone il poema 'Sulla natura', proponendo i quattro elementi e le forze di Amore e Odio", category: "cultura", importance: 4 },
    { year: -55, title: "Lucrezio compone il 'De rerum natura', esposizione poetica dell'atomismo epicureo in latino", category: "cultura", importance: 4 },
    { year: 1323, title: "Guglielmo di Ockham compone la 'Summa logicae', sistemando il nominalismo e il principio di economia (rasoio di Ockham)", category: "cultura", importance: 4 },
    { year: 1710, title: "George Berkeley pubblica 'A Treatise Concerning the Principles of Human Knowledge', radicalizzando l'empirismo nell'immaterialismo", category: "cultura", importance: 5 },
    { year: 1720, title: "Heinrich Köhler pubblica in tedesco la 'Monadologia' di Leibniz, scritta nel 1714 e rimasta inedita", category: "cultura", importance: 4 },
    { year: 1788, title: "Immanuel Kant pubblica la 'Critica della ragion pratica' (fondazione della legge morale e dell'imperativo categorico)", category: "cultura", importance: 4 },
    { year: 1794, title: "Johann Gottlieb Fichte pubblica la 'Grundlage der gesamten Wissenschaftslehre' ('Dottrina della scienza'), avvio dell'idealismo tedesco post-kantiano", category: "cultura", importance: 5 },
    { year: toNumber("20/02/1843"), title: "Søren Kierkegaard pubblica 'Enten-Eller' ('Aut-Aut'), sulla scelta tra vita estetica e vita etica", category: "cultura", importance: 4 },
    { year: 1830, title: "Auguste Comte pubblica il primo volume del 'Cours de philosophie positive', fondando il positivismo", category: "cultura", importance: 4 },
    { year: 1900, title: "Edmund Husserl pubblica il primo volume delle 'Logische Untersuchungen' ('Ricerche logiche'), avvio della fenomenologia", category: "cultura", importance: 5 },
    { year: 1902, title: "Benedetto Croce pubblica 'Estetica come scienza dell'espressione e linguistica generale', avvio della Filosofia dello spirito", category: "cultura", importance: 4 },
    { year: 1934, title: "Karl Popper pubblica 'Logik der Forschung' ('Logica della scoperta scientifica'), enunciando il falsificazionismo", category: "cultura", importance: 4 },
    { year: 1943, title: "Jean-Paul Sartre pubblica da Gallimard 'L'être et le néant' ('L'essere e il nulla'), trattato dell'esistenzialismo ateo", category: "cultura", importance: 4 },
    { year: 1953, title: "A Oxford escono postume le 'Philosophical Investigations' di Wittgenstein ('Ricerche filosofiche'), svolta dal Tractatus al linguaggio ordinario", category: "cultura", importance: 5 },
    { year: 1790, title: "Immanuel Kant pubblica la 'Critica del giudizio' (estetica e teleologia)", category: "cultura", importance: 5 },
    { year: 1800, title: "Friedrich Schelling pubblica il 'Sistema dell'idealismo trascendentale'", category: "cultura", importance: 6 },
    { year: 1913, title: "Edmund Husserl pubblica nel Jahrbuch le 'Ideen', sistematizzando il metodo fenomenologico", category: "cultura", importance: 6 },
    { year: 1916, title: "Giovanni Gentile pubblica la 'Teoria generale dello spirito come atto puro' (attualismo)", category: "cultura", importance: 5 },
    { year: 1966, title: "Michel Foucault pubblica 'Le parole e le cose', archeologia delle scienze umane", category: "cultura", importance: 5 }
];

timelineData.push(...philosophyHistoryEvents);

const physicsHistoryEvents = [
    { year: toNumber("19/05/1609"), title: "Prima e seconda legge di Keplero sul moto dei pianeti", category: "scienza", importance: 2 },
    { year: toNumber("15/06/1638"), title: "Galileo Galilei enuncia le leggi del moto e della caduta dei gravi", category: "scienza", importance: 3 },
    { year: toNumber("21/06/1798"), title: "Esperimento di Cavendish (misurazione della costante gravitazionale)", category: "scienza", importance: 3 },
    { year: toNumber("24/11/1801"), title: "Scoperta della radiazione ultravioletta (Ritter) e dell'interferenza (Young)", category: "scienza", importance: 3 },
    { year: toNumber("25/09/1820"), title: "André-Marie Ampère dimostra l'attrazione e repulsione tra fili percorsi da corrente", category: "scienza", importance: 2 },
    { year: toNumber("01/10/1821"), title: "Il fisico inglese Michael Faraday pubblica 'On some new Electro-Magnetical Motions' descrivendo come un magnete muove un filo percorso da corrente", category: "scienza", importance: 3 },
    { year: toNumber("12/06/1824"), title: "'Riflessioni sulla potenza motrice del fuoco': il fisico francese Sadi Carnot fonda la termodinamica", category: "scienza", importance: 3 },
    { year: toNumber("24/11/1831"), title: "Il fisico inglese Michael Faraday legge alla Royal Society 'Experimental Researches in Electricity' descrivendo per la prima volta l'induzione elettromagnetica", category: "scienza", importance: 2 },
    { year: toNumber("23/07/1849"), title: "Il fisico francese Hippolyte Fizeau presenta all'Académie des Sciences la prima misura terrestre della velocità della luce da lui effettuata", category: "scienza", importance: 3 },
    { year: toNumber("08/01/1851"), title: "Il fisico francese Léon Foucault osserva per la prima volta lo spostamento del piano di oscillazione di un pendolo per effetto della rotazione terrestre", category: "scienza", importance: 3 },
    { year: toNumber("01/01/1865"), title: "'A Dynamical Theory of the Electromagnetic Field': il fisico scozzese James Clerk Maxwell formula le equazioni di Maxwell che unificano elettromagnetismo e ottica", category: "scienza", importance: 2 },
   
    { year: toNumber("01/11/1887"), title: "Pubblicazione di 'On the Relative Motion of the Earth and the Luminiferous Ether': Michelson e Morley espongono l'esperimento da loro condotto in cui non si rileva alcun vento d'etere", category: "scienza", importance: 2 },

    { year: toNumber("15/03/1888"), title: "Resoconto di Heinrich Hertz sugli Annalen der Physik circa il suo esperimento sulla propagazione a distanza di un'onda elettromagnetica a velocità finita", category: "scienza", importance: 3 },

    { year: toNumber("01/10/1897"), title: "Il fisico inglese J.J. Thomson pubblica 'Cathode Rays' dove descrive i raggi catodici come particelle di carica negativa molto più leggere dell'atomo", category: "scienza", importance: 2 },

    { year: toNumber("26/12/1898"), title: "Marie e Pierre Curie presentano all'Académie des Sciences una nuova sostanza fortemente radioattiva estratta dalla pechblenda che chiamano 'radio'", category: "scienza", importance: 3 },

    { year: toNumber("18/07/1898"), title: "Marie e Pierre Curie presentano all'Académie des Sciences una nuova sostanza radioattiva vicina al bismutoche chiamano 'polonio'" },

    { year: toNumber("15/05/1911"), title: "Esperimento di Rutherford e scoperta del nucleo atomico", category: "scienza", importance: 2 },
    { year: toNumber("01/07/1913"), title: "Niels Bohr propone la sua teoria atomica", category: "scienza", importance: 2 },
    { year: toNumber("11/12/1919"), title: "Hendrika van Leeuwen dimostra l'impossibilità del magnetismo classico", category: "scienza", importance: 3 },
    { year: toNumber("25/11/1924"), title: "Ipotesi di de Broglie: natura ondulatoria della materia", category: "scienza", importance: 2 },
    { year: toNumber("23/03/1927"), title: "Principio di indeterminazione di Heisenberg", category: "scienza", importance: 2 },
    { year: toNumber("01/02/1928"), title: "Equazione di Dirac (previsione dell'antimateria)", category: "scienza", importance: 3 },
    { year: toNumber("15/03/1929"), title: "Legge di Hubble e scoperta dell'espansione dell'Universo", category: "scienza", importance: 2 },
    { year: toNumber("27/02/1932"), title: "Scoperta del neutrone (Chadwick) e del positrone (Anderson)", category: "scienza", importance: 2 },
    { year: toNumber("22/12/1938"), title: "Scoperta della fissione nucleare (Hahn e Strassmann)", category: "scienza", importance: 2 },
    { year: toNumber("01/02/1964"), title: "Proposta del modello a quark (Gell-Mann / Zweig)", category: "scienza", importance: 3 },
    { year: toNumber("13/05/1965"), title: "Scoperta della radiazione cosmica di fondo (Penzias e Wilson)", category: "scienza", importance: 2 },
    { year: toNumber("20/11/1967"), title: "Teoria elettrodebole (Weinberg, Salam, Glashow)", category: "scienza", importance: 3 },
    { year: toNumber("06/10/1995"), title: "Scoperta del primo esopianeta (51 Pegasi b)", category: "scienza", importance: 3 },
    { year: toNumber("12/01/1998"), title: "Gli astronomi dell'High-Z Supernova Search Team annunciano la scoperta dell'espansione accelerata dell'universo, ipotesi teorica dell'energia oscura", category: "scienza", importance: 2 },
    { year: toNumber("14/09/2015"), title: "Prima rilevazione diretta delle onde gravitazionali (LIGO)", category: "scienza", importance: 1 },
    { year: toNumber("15/01/1952"), title: "David Bohm pubblica la teoria dell'onda pilota e delle variabili nascoste", category: "scienza", importance: 3 },
    { year: toNumber("01/08/1959"), title: "David Bohm e Yakir Aharonov formulano l'effetto Aharonov-Bohm", category: "scienza", importance: 3 },
    { year: 1621, title: "Willebrord Snell ricava nel manoscritto inedito 'Libellus de refractione' la legge della rifrazione (legge di Snell; prima stampa nella 'Diottrica' di Descartes, 1637)", category: "scienza", importance: 3 },
    { year: 1662, title: "Robert Boyle pubblica la 'Defence of the Doctrine Touching the Spring of the Air', enunciando la legge inversa tra pressione e volume dei gas", category: "scienza", importance: 2 },
    { year: 1678, title: "Robert Hooke pubblica le 'Lectures de Potentia Restitutiva, or of Spring', enunciando la 'legge di Hooke'", category: "scienza", importance: 3 },
    { year: 1738, title: "Daniel Bernoulli pubblica 'Hydrodynamica', enunciando la relazione tra pressione, velocità e altezza in un fluido", category: "scienza", importance: 3 },
    { year: 1827, title: "Georg Ohm pubblica 'Die galvanische Kette, mathematisch bearbeitet', enunciando la 'legge di Ohm' sulla resistenza elettrica", category: "scienza", importance: 3 },
    { year: 1845, title: "Gustav Kirchhoff pubblica sugli Annalen der Physik 'Ueber den Durchgang eines elektrischen Stromes durch eine Ebene', enunciando le leggi dei circuiti", category: "scienza", importance: 3 },
    { year: 1850, title: "Rudolf Clausius pubblica 'Ueber die bewegende Kraft der Wärme', formulando il Secondo Principio della Termodinamica", category: "scienza", importance: 2 },
    { year: toNumber("27/01/1926"), title: "Erwin Schrödinger invia agli Annalen der Physik la memoria 'Quantisierung als Eigenwertproblem', introducendo l'equazione d'onda della meccanica quantistica", category: "scienza", importance: 2 },
    { year: 1834, title: "Heinrich Lenz pubblica sugli Annalen der Physik un articolo sulla direzione delle correnti indotte (legge di Lenz)", category: "scienza", importance: 4 },
    { year: 1895, title: "Hendrik Lorentz pubblica il trattato sulla forza elettromagnetica su una carica in moto (forza di Lorentz)", category: "scienza", importance: 4 },
    { year: 1923, title: "Arthur Compton pubblica su Physical Review un articolo sullo scattering quantistico dei raggi X (effetto Compton)", category: "scienza", importance: 4 },
    { year: 1913, title: "Robert Millikan pubblica su Physical Review un articolo sulla misura della carica elementare con la goccia d'olio", category: "scienza", importance: 4 }
];

timelineData.push(...physicsHistoryEvents);

const musicHistoryEvents = [
    // Storia della Musica
    { year: -40000, title: "Costruzione dei flauti del Giura Svevo (i più antichi strumenti musicali noti)", category: "cultura", importance: 3 },
    { year: -1400, title: "Inno hurrita alla dea Nikkal (la più antica melodia scritta parzialmente giunta a noi)", category: "cultura", importance: 4 },
    { year: 100, title: "Epitaffio di Sicilo (la più antica composizione musicale completa sopravvissuta)", category: "cultura", importance: 4 },
    { year: 1025, title: "Basi della notazione musicale moderna (Guido d'Arezzo)", category: "cultura", importance: 3 },
    { year: 1597, title: "'La Dafne' di Jacopo Peri (prima opera lirica della storia)", category: "cultura", importance: 5 },
    { year: 1700, title: "Invenzione del pianoforte (Bartolomeo Cristofori)", category: "tecnologia", importance: 3 },
    { year: 1722, title: "'Il clavicembalo ben temperato' di Johann Sebastian Bach", category: "cultura", importance: 4 },
    { year: toNumber("01/05/1786"), title: "'Le nozze di Figaro' di Wolfgang Amadeus Mozart", category: "cultura", importance: 4 },
    { year: toNumber("15/02/1867"), title: "Prima esecuzione de 'Sul bel Danubio blu' di Johann Strauss jr", category: "cultura", importance: 4 },
    { year: toNumber("13/08/1876"), title: "Prima esecuzione completa de 'L'anello del Nibelungo' di Richard Wagner", category: "cultura", importance: 4 },
    { year: toNumber("01/04/1898"), title: "Presentazione di 'O sole mio' alla Festa di Piedigrotta", category: "cultura", importance: 4 },
    { year: toNumber("26/02/1917"), title: "Prima registrazione jazz della storia (Original Dixieland Jass Band)", category: "cultura", importance: 3 },
    { year: 1954, title: "Nascita e diffusione del Rock and Roll (es. Rock Around the Clock)", category: "cultura", importance: 3 },
    { year: toNumber("12/10/1964"), title: "Presentazione del sintetizzatore Moog", category: "tecnologia", importance: 3 },
    { year: toNumber("01/06/1967"), title: "Pubblicazione di 'Sgt. Pepper's Lonely Hearts Club Band' dei Beatles", category: "cultura", importance: 4 },
    { year: toNumber("11/08/1973"), title: "Nascita dell'Hip Hop (festa di DJ Kool Herc nel Bronx)", category: "cultura", importance: 4 },
    { year: toNumber("01/10/1982"), title: "Lancio commerciale del Compact Disc (CD) in Giappone", category: "tecnologia", importance: 4 },
    { year: toNumber("30/11/1982"), title: "Uscita di 'Thriller' di Michael Jackson", category: "cultura", importance: 4 },
    { year: toNumber("01/06/1999"), title: "Lancio di Napster (rivoluzione del file sharing musicale)", category: "tecnologia", importance: 5 },
    { year: toNumber("07/10/2008"), title: "Lancio di Spotify in Europa", category: "tecnologia", importance: 4 },
    { year: toNumber("11/12/1984"), title: "Leonard Cohen pubblica il brano 'Hallelujah' all'interno del suo album 'Various Positions'", category: "cultura", importance: 4 },
    { year: toNumber("26/06/1870"), title: "Prima assoluta della 'Cavalcata delle Valchirie' di Richard Wagner a Monaco di Baviera", category: "cultura", importance: 3 }

];

timelineData.push(...musicHistoryEvents);

const aiHistoryEvents = [
    // Storia dell'Intelligenza Artificiale
    { year: toNumber("01/10/1950"), title: "Alan Turing propone il Test di Turing ('Computing Machinery and Intelligence')", category: "scienza", importance: 3 },
    { year: toNumber("18/06/1956"), title: "Conferenza di Dartmouth: nascita del termine Intelligenza Artificiale", category: "tecnologia", importance: 4 },
    { year: toNumber("01/11/1958"), title: "Invenzione del Percettrone (Frank Rosenblatt), la prima rete neurale artificiale", category: "tecnologia", importance: 3 },
    { year: toNumber("09/10/1986"), title: "Rumelhart, Hinton e Williams formalizzano l'algoritmo di backpropagation per l'apprendimento automatico, base del deep learning", category: "tecnologia", importance: 2 },
    { year: toNumber("01/06/1989"), title: "Yann LeCun crea LeNet, la prima rete neurale convoluzionale per il riconoscimento dei caratteri (OCR)", category: "tecnologia", importance: 3 },
    { year: toNumber("11/05/1997"), title: "Deep Blue (IBM) sconfigge il campione mondiale di scacchi Garry Kasparov", category: "tecnologia", importance: 4 },
    { year: toNumber("30/09/2012"), title: "AlexNet vince ImageNet, inizia la rivoluzione del Deep Learning", category: "tecnologia", importance: 4 },
    { year: toNumber("15/03/2016"), title: "AlphaGo (DeepMind) sconfigge il campione mondiale di Go Lee Sedol", category: "tecnologia", importance: 4 },
    { year: toNumber("12/06/2017"), title: "Introduzione dell'architettura Transformer ('Attention Is All You Need')", category: "tecnologia", importance: 4 },
];

timelineData.push(...aiHistoryEvents);

const earthTimelineEvents = [
    // Timeline of Earth (Geologia e Biologia preistorica)
    { year: -4400000000, title: "Formazione dei minerali più antichi conosciuti (zirconi) e prime evidenze di acqua liquida", category: "scienza", importance: 2 },
    { year: -3800000000, title: "Separazione tra Batteri e Archea (LUCA, Last Universal Common Ancestor)", category: "scienza", importance: 2 },
    { year: -3200000000, title: "Sviluppo della prima fotosintesi (batteri fotosintetici anossigenici)", category: "scienza", importance: 2 },
    { year: -2900000000, title: "Formazione del supercontinente Kenorland", category: "scienza", importance: 3 },
    { year: -2100000000, title: "Fossili del biota gabonese (primi possibili organismi macroscopici pluricellulari)", category: "scienza", importance: 3 },
    { year: -1800000000, title: "Formazione del supercontinente Columbia", category: "scienza", importance: 3 },
    { year: -600000000, title: "Formazione del supercontinente Pannotia", category: "scienza", importance: 3 },
    { year: -530000000, title: "Comparsa dei primi pesci (es. Myllokunmingia)", category: "scienza", importance: 2 },
    { year: -521000000, title: "Comparsa dei Trilobiti", category: "scienza", importance: 2 },
    { year: -475000000, title: "Comparsa delle prime piante terrestri non vascolari (briofite)", category: "scienza", importance: 2 },
    { year: -450000000, title: "Comparsa dei primi squali", category: "scienza", importance: 2 },
    { year: -375000000, title: "Comparsa del Tiktaalik (fossile transizionale tra pesci e tetrapodi)", category: "scienza", importance: 3 },
    { year: -335000000, title: "Formazione del supercontinente Pangea", category: "scienza", importance: 2 },
    { year: -312000000, title: "Comparsa dei primi amnioti (rettili in grado di riprodursi completamente fuori dall'acqua)", category: "scienza", importance: 2 },
    { year: -245000000, title: "Comparsa degli Ittiosauri", category: "scienza", importance: 2 },
    { year: -228000000, title: "Evoluzione degli Pterosauri (primi vertebrati volanti)", category: "scienza", importance: 2 },
    { year: -227000000, title: "Comparsa dei Plesiosauri", category: "scienza", importance: 2 },
    { year: -215000000, title: "Comparsa delle prime tartarughe", category: "scienza", importance: 2 },
    { year: -90000000, title: "Evoluzione dei serpenti", category: "scienza", importance: 2 },
    { year: -68000000, title: "Comparsa di Tyrannosaurus rex e Triceratops", category: "scienza", importance: 2 },
    { year: -49000000, title: "Gli antenati di balene e delfini tornano nell'oceano", category: "scienza", importance: 2 },
    { year: -35000000, title: "Comparsa e diffusione delle praterie (fondamentale per gli erbivori moderni)", category: "scienza", importance: 2 },
    { year: -23000000, title: "Evoluzione del Megalodonte", category: "scienza", importance: 2 },
    // { year: -2580000, title: "Inizio del Quaternario (fase di cicliche glaciazioni e periodi interglaciali)", category: "scienza", importance: 2 },
    //{ year: -11700, title: "Fine dell'ultima era glaciale e inizio dell'epoca geologica dell'Olocene", category: "scienza", importance: 1 },
];

// NOTA: In questo array, i numeri negativi indicano l'anno esatto a.C.
// I numeri positivi indicano l'anno esatto d.C.
const Glaciazioni = [
  { year: -2400000000, title: "Inizio della Glaciazione Uroniana", category: "scienza", importance: 2 },
  { year: -2100000000, title: "Fine della Glaciazione Uroniana", category: "scienza", importance: 2 },
  { year: -717000000, title: "Inizio della Glaciazione Sturtiana (Criogeniano)", category: "scienza", importance: 2 },
  { year: -660000000, title: "Fine della Glaciazione Sturtiana", category: "scienza", importance: 2 },
  { year: -650000000, title: "Inizio della Glaciazione Marinoana (Terra a palla di neve)", category: "scienza", importance: 2 },
  { year: -635000000, title: "Fine della Glaciazione Marinoana", category: "scienza", importance: 2 },
  { year: -460000000, title: "Inizio della Glaciazione Andino-Sahariana", category: "scienza", importance: 2 },
  { year: -430000000, title: "Fine della Glaciazione Andino-Sahariana", category: "scienza", importance: 2 },
  { year: -360000000, title: "Inizio della Glaciazione del Paleozoico superiore (Karoo)", category: "scienza", importance: 2 },
  { year: -260000000, title: "Fine della Glaciazione del Paleozoico superiore", category: "scienza", importance: 2 },
  { year: -2580000, title: "Inizio della Glaciazione Quaternaria e del Pleistocene", category: "scienza", importance: 2 },
  { year: -1200000, title: "Massimo Glaciale Donau (stima)", category: "scienza", importance: 1 },
  { year: -650000, title: "Massimo Glaciale Günz", category: "scienza", importance: 1 },
  { year: -350000, title: "Massimo Glaciale Mindel", category: "scienza", importance: 1 },
  { year: -150000, title: "Massimo Glaciale Riss", category: "scienza", importance: 1 },
  { year: -130000, title: "Inizio dell'Interglaciale Eemiano (Riss-Würm)", category: "scienza", importance: 2 },
  { year: -115000, title: "Fine dell'Interglaciale Eemiano, inizio della Glaciazione Würm", category: "scienza", importance: 2 },
  { year: -19000, title: "LGM - Ultimo Massimo Glaciale (picco Würm)", category: "scienza", importance: 2 }, // Corretto: 19000 a.C.
  { year: -9700, title: "Fine della Glaciazione Würm, inizio dell'Olocene", category: "scienza", importance: 1 },  // Corretto: 9700 a.C.
  { year: 12000, title: "Tempo teorico previsto per la prossima glaciazione su base astronomica (senza effetto antropico)", category: "scienza", importance: 2 } // Corretto: 12000 d.C.
];


const eventiFuturi=[
  { year: 13700,       title: "Vega diventa la stella polare a causa della precessione degli equinozi (previsione)", category: "scienza", importance: 2 },
  { year: 250000000,   title: "Formazione del prossimo supercontinente (Pangea Ultima o Amasia) (previsione)", category: "scienza", importance: 2 },
  { year: 2061,       title: "Prossimo ritorno della cometa di Halley (previsione)", category: "scienza", importance: 2 },
  { year: 8000000,    title: "La Rift Valley africana diventa un nuovo oceano (previsione)", category: "scienza", importance: 2 },
  { year: 50000000,   title: "Il Mar Mediterraneo si chiude e forma una catena montuosa (previsione)", category: "scienza", importance: 2 },
  { year: 200000000,  title: "La durata del giorno terrestre raggiunge le 25 ore per rallentamento della rotazione (previsione)", category: "scienza", importance: 2 }
]

const PEG=[
  { year: 1257, title: "Eruzione del vulcano Samalas (Rinjani) - probabile innesco della Piccola Era Glaciale", category: "scienza", importance: 2 },
  { year: 1309, title: "Prima gelata documentata del Tamigi a Londra (inizio della fase fredda)", category: "scienza", importance: 3 },
  { year: 1315, title: "Inizio della Grande Carestia in Europa (1315–1317), legata a piogge incessanti e freddo", category: "scienza", importance: 2 },
  { year: 1460, title: "Inizio del Minimo di Spörer (bassa attività solare, 1460–1550)", category: "scienza", importance: 3 },
  { year: 1565, title: "Inizio del 'Secolo glaciale': avanzata dei ghiacciai alpini e inverni rigidissimi", category: "scienza", importance: 2 },
  { year: 1607, title: "Grande gelo in Europa: il Tamigi ghiaccia e si svolge la prima 'Fiera del Gelo'", category: "scienza", importance: 3 },
  { year: 1645, title: "Inizio del Minimo di Maunder (1645–1715), culmine del freddo", category: "scienza", importance: 2 },
  { year: 1683, title: "Grande Gelo: il Tamigi ghiacciato per due mesi. Fiera del Gelo con carrozze sul fiume", category: "scienza", importance: 3 },
  { year: toNumber("05/01/1709"), title: "Inverno del 'Grande Gelo': temperature polari in tutta Europa e carestia diffusa", category: "scienza", importance: 2 },
  { year: 1790, title: "Inizio del Minimo di Dalton (1790–1830) e ultima fase di freddo", category: "scienza", importance: 3 },
  { year: toNumber("01/02/1814"), title: "Ultima 'Fiera del Gelo' sul Tamigi a Londra", category: "scienza", importance: 3 },
  { year: 1850, title: "Massima espansione dei ghiacciai alpini e fine della Piccola Era Glaciale", category: "scienza", importance: 3 }
];

const Halley = [
  { year: -240, title: "Primo avvistamento documentato della cometa di Halley, registrato dagli astronomi cinesi nel 240 a.C.", category: "scienza", importance: 4 },
  { year: toNumber("20/03/1066"), title: "Avvistamento della cometa di Halley, raffigurata nell'Arazzo di Bayeux come presagio della battaglia di Hastings e della conquista normanna dell'Inghilterra", category: "scienza", importance: 3 },
  { year: toNumber("25/10/1301"), title: "Avvistamento della cometa di Halley, dipinta da Giotto come Stella di Betlemme nella Cappella degli Scrovegni a Padova", category: "scienza", importance: 4 },
  { year: toNumber("15/09/1682"), title: "Edmond Halley osserva il passaggio della cometa, inizia lo studio che porterà alla previsione del suo ritorno", category: "scienza", importance: 3 },
  { year: 1705, title: "Edmond Halley predice il ritorno della cometa nel 1758, prima previsione esatta di un corpo celeste basata sulla legge di Newton", category: "scienza", importance: 2 },
  { year: toNumber("25/12/1758"), title: "Ritorno della cometa di Halley  osservato da Johann Palitzsch: conferma della predizione di Halley e della teoria di Newton", category: "scienza", importance: 3 },
  { year: toNumber("16/11/1835"), title: "Avvistamento della cometa di Halley legato alla biografia di Mark Twain: lo scrittore nacque durante questo passaggio e morì nel successivo (1910)", category: "scienza", importance: 4 },
  { year: toNumber("20/04/1910"), title: "Avvistamento della cometa di Halley, la Terra attraversò la coda cometaria, suscitando spettacolo mondiale e timori di avvelenamento da cianogeno (poi rivelatisi infondati)", category: "scienza", importance: 3 },
  { year: toNumber("09/02/1986"), title: "Primo passaggio della cometa di Halley esplorato da sonde spaziali (Giotto, Vega, Suisei) che rivelarono la struttura del nucleo", category: "scienza", importance: 3 }
]

timelineData.push(...earthTimelineEvents, ...Glaciazioni, ...eventiFuturi, ...PEG, ...Halley);

const lifeTimelineEvents = [
    // Timeline of Life (Aggiunte da Wikipedia)
    { year: -530000000, title: "Prime impronte fossili sulla terraferma", category: "scienza", importance: 3 },
    { year: -520000000, title: "Comparsa dei primi graptoliti", category: "scienza", importance: 3 },
    { year: -511000000, title: "Comparsa dei primi crostacei", category: "scienza", importance: 3 },
    { year: -505000000, title: "Fossilizzazione delle Argilliti di Burgess (Burgess Shale)", category: "scienza", importance: 2 },
    { year: -450000000, title: "Primi conodonti ed echinoidi (ricci di mare)", category: "scienza", importance: 3 },
    { year: -410000000, title: "Primi segni di denti nei pesci, primi nautiloidi e licofite", category: "scienza", importance: 3 },
    { year: -395000000, title: "Primi licheni, acari, collemboli e ammonoidi", category: "scienza", importance: 3 },
    { year: -363000000, title: "Inizio del Carbonifero: insetti sulla terraferma, piante da seme, fitte foreste", category: "scienza", importance: 2 },
    { year: -305000000, title: "Collasso delle foreste pluviali del Carbonifero (minor estinzione, ascesa degli amnioti)", category: "scienza", importance: 3 },
    { year: -265000000, title: "I Gorgonopsidi, rettili sinapsidi dai denti a sciabola, appaiono nei reperti fossili del Permiano", category: "scienza", importance: 3 },
    { year: -250000000, title: "Appare il Triadobatrachus in Madagascar, il più antico fossile capostipite della linea degli anuri (rane)", category: "scienza", importance: 3 },
    { year: -240000000, title: "Si registra un forte aumento della diversità dei cinodonti, gli antenati diretti dei mammiferi", category: "scienza", importance: 3 },
    { year: -200000000, title: "La Rivoluzione marina mesozoica innesca una massiccia corsa agli armamenti evolutiva negli oceani", category: "scienza", importance: 3 },
    { year: -240000000, title: "Comparsa di Megachirella nel Triassico, il più antico fossile di squamato (lucertola) finora scoperto", category: "scienza", importance: 3 },
    { year: -328000000, title: "Comparsa di Syllipsimopodi, il più antico antenato fossile noto dei calamari vampiro e degli ottoni", category: "scienza", importance: 3 },
    { year: -165000000, title: "Comparsa delle prime razze e diversificazione dei pesci cartilaginei marini", category: "scienza", importance: 3 },
    { year: -130000000, title: "Primi insetti ematofagi: i fossili di zanzara in ambra libanese rivelano apparati boccali succhiatori di sangue", category: "scienza", importance: 3 },
    { year: -140000000, title: "Primi reperti in ambra di ragnatele tessute da antenati dei ragni orbicolari", category: "scienza", importance: 3 },
    { year: -135000000, title: "Ascesa delle Angiosperme (piante da fiore) e radiazione adattativa dei primi insetti impollinatori", category: "scienza", importance: 2 },
    { year: -130000000, title: "Stima molecolare della divergenza evolutiva del krill (Euphausiacea) negli oceani", category: "scienza", importance: 3 },
    { year: -114000000, title: "Comparsa delle prime api primitive in concomitanza con la diffusione delle piante da fiore", category: "scienza", importance: 3 },
    { year: -100000000, title: "Comparsa delle prime formiche fossili conservate in giacimenti di ambra del Cretacico", category: "scienza", importance: 3 },
    { year: -230000000, title: "Si evolvono i primi crocodilomorfi, gli antenati terrestri dei moderni coccodrilli", category: "scienza", importance: 2 },
    { year: -63000000, title: "Evoluzione dei creodonti, importanti mammiferi carnivori dominanti del Paleocene ed Eocene", category: "scienza", importance: 3 },
    { year: -62000000, title: "Evoluzione dei primi pinguini arcaici (Waimanu) subito dopo l'estinzione dei dinosauri", category: "scienza", importance: 3 },
    { year: -56000000, title: "Compare il Gastornis, grande uccello predatore gigante e incapace di volare", category: "scienza", importance: 3 },
    { year: -52000000, title: "Comparsa di Onychonycteris, il più antico fossile di pipistrello in grado di volare", category: "scienza", importance: 3 },
    { year: -40000000, title: "Appaiono farfalle e falene di tipo moderno (Lepidoptera) nei reperti fossili", category: "scienza", importance: 3 },
    { year: -38000000, title: "Comparsa dei primi orsi primitivi (Ursidae) dall'evoluzione dei caniformi arcaici", category: "scienza", importance: 3 },

    { year: -28000000, title: "Appare il Paraceratherium, il più grande mammifero terrestre mai vissuto", category: "scienza", importance: 3 },
    { year: -25000000, title: "Pelagornis sandersi, il più grande uccello volante mai vissuto, solca i cieli del Miocene", category: "scienza", importance: 3 },
    { year: -10000000, title: "Espansione globale delle savane tropicali ed erbe con ciclo fotosintetico C4", category: "scienza", importance: 3 },
    { year: -10500000, title: "Stima molecolare della divergenza evolutiva tra le iguane marine e quelle terrestri delle Galapagos", category: "scienza", importance: 3 },
    { year: -4500000, title: "I misticeti (balene con i fanoni) iniziano la transizione evolutiva verso il gigantismo moderno", category: "scienza", importance: 3 },
    { year: -1000000, title: "Comparsa dei primi coyote (Canis latrans) nei reperti fossili del Pleistocene", category: "scienza", importance: 3 },
    { year: -810000, title: "Comparsa dei primi lupi grigi arcaici derivati dalla linea dei canidi eurasiatici", category: "scienza", importance: 3 },
    { year: -400000, title: "Comparsa dei primi orsi polari dalla divergenza evolutiva con l'orso bruno", category: "scienza", importance: 3 },
    { year: -14000, title: "Estinzione del rinoceronte lanoso (Coelodonta antiquitatis) nei rifugi della Siberia nord-orientale", category: "scienza", importance: 3 },
    { year: -11000, title: "Estinzione dell'orso dal muso corto (Arctodus simus) in Nord America", category: "scienza", importance: 3 }

];

timelineData.push(...lifeTimelineEvents);

const early20thCenturyEvents = [
    // 1900s
    { year: toNumber("08/09/1900"), title: "Uragano di Galveston (disastro naturale più letale degli USA)", category: "scienza", importance: 3 },
    { year: toNumber("28/07/1900"), title: "Louis Lassen inventa il moderno hamburger a New Haven servendo carne macinata tra due fette di pane tostato", category: "cultura", importance: 5 },
    { year: toNumber("22/01/1901"), title: "Morte della Regina Vittoria e fine dell'epoca vittoriana", category: "politica", importance: 3 },
    { year: toNumber("08/05/1902"), title: "Eruzione del Monte Pelée in Martinica (30.000 vittime)", category: "scienza", importance: 3 },
    { year: toNumber("14/07/1902"), title: "Agustín Lizárraga scopre Machu Picchu (prima di Hiram Bingham)", category: "cultura", importance: 3 },
    { year: toNumber("10/10/1903"), title: "Emmeline Pankhurst fonda la WSPU (movimento delle Suffragette)", category: "politica", importance: 2 },
    { year: toNumber("01/12/1903"), title: "Esce 'The Great Train Robbery', primo grande successo del cinema americano", category: "cultura", importance: 3 },
    { year: toNumber("08/04/1904"), title: "Firma dell'Entente Cordiale tra Francia e Gran Bretagna", category: "politica", importance: 2 },
    { year: toNumber("18/04/1906"), title: "Grande terremoto di San Francisco", category: "scienza", importance: 2 },
    { year: toNumber("20/07/1906"), title: "La Finlandia è il primo paese europeo a concedere il voto alle donne", category: "politica", importance: 3 },
    { year: toNumber("26/12/1906"), title: "Esce 'The Story of the Kelly Gang', primo lungometraggio della storia", category: "cultura", importance: 3 },
    { year: toNumber("30/06/1908"), title: "Evento di Tunguska (misteriosa esplosione in Siberia)", category: "scienza", importance: 3 },
    { year: toNumber("28/12/1908"), title: "Terremoto di Messina (il più grave in Europa per numero di vittime)", category: "scienza", importance: 2 },

    // 1910s
    { year: toNumber("05/10/1910"), title: "Rivoluzione Portoghese: fine della monarchia e nascita della Repubblica", category: "politica", importance: 3 },
    { year: toNumber("24/07/1911"), title: "Hiram Bingham riscopre Machu Picchu", category: "cultura", importance: 3 },
    { year: toNumber("29/09/1911"), title: "Inizio della Guerra Italo-Turca per la conquista della Libia", category: "politica", importance: 3 },
    { year: toNumber("23/12/1913"), title: "Il presidente Wilson firma il Federal Reserve Act negli Stati Uniti", category: "politica", importance: 2 },
    { year: toNumber("07/05/1915"), title: "Il transatlantico Lusitania viene silurato da un U-boat tedesco", category: "politica", importance: 2 },
    { year: toNumber("13/04/1919"), title: "Massacro di Amritsar in India (punto di svolta per l'indipendenza)", category: "politica", importance: 2 },
    { year: toNumber("16/01/1919"), title: "Inizio del proibizionismo negli USA (XVIII Emendamento)", category: "politica", importance: 3 },

    // 1920s
    { year: toNumber("06/12/1922"), title: "Nascita dello Stato Libero d'Irlanda", category: "politica", importance: 3 },
    { year: toNumber("04/11/1922"), title: "Howard Carter scopre la tomba intatta di Tutankhamon", category: "cultura", importance: 2 },
    { year: toNumber("24/07/1923"), title: "Trattato di Losanna e nascita della moderna Repubblica di Turchia", category: "politica", importance: 2 },
    { year: toNumber("01/09/1923"), title: "Grande terremoto del Kantō (distruzione di Tokyo e Yokohama)", category: "scienza", importance: 2 },
    { year: toNumber("21/01/1924"), title: "Morte di Lenin e inizio della lotta per il potere in URSS", category: "politica", importance: 2 },
    { year: toNumber("10/07/1925"), title: "Processo Scopes ('Processo della Scimmia') sull'insegnamento dell'evoluzionismo", category: "cultura", importance: 3 },
    { year: toNumber("20/05/1927"), title: "Charles Lindbergh compie la prima trasvolata atlantica in solitaria", category: "tecnologia", importance: 2 },
];


const wikiEvents = [
    { year: 301, title: "Fondazione della Repubblica di San Marino (la più antica repubblica sopravvissuta)", category: "politica", importance: 4 },
    { year: 697, title: "La Repubblica di Venezia si rende indipendente", category: "politica", importance: 3 },
    { year: toNumber("27/12/1282"), title: "Ascesa della casata d'Asburgo in Austria", category: "politica", importance: 3 },
    { year: toNumber("14/05/1607"), title: "Inizio della colonizzazione inglese in America (Jamestown)", category: "politica", importance: 2 },
    { year: toNumber("28/02/1633"), title: "Primo editto di Sakoku in Giappone: divieto di espatrio e ritorno per i giapponesi", category: "politica", importance: 3 },
    { year: toNumber("30/04/1803"), title: "Gli USA acquistano la Louisiana dalla Francia (espansione verso ovest)", category: "politica", importance: 3 },
    { year: toNumber("25/03/1821"), title: "Inizio della Guerra d'Indipendenza Greca contro l'Impero Ottomano", category: "politica", importance: 3 },
    { year: toNumber("25/04/1846"), title: "Guerra Messicano-Statunitense (gli USA raggiungono il Pacifico)", category: "politica", importance: 3 },
    { year: 1864, title: "Inizio della Guerra della Triplice Alleanza (Guerra del Paraguay)", category: "politica", importance: 4 },
    { year: toNumber("25/04/1898"), title: "Guerra Ispano-Americana (la Spagna perde Cuba e le Filippine, ascesa degli USA)", category: "politica", importance: 2 },
    { year: toNumber("08/02/1904"), title: "Attacco a Port Arthur e inizio della Guerra Russo-Giapponese", category: "politica", importance: 2 },
    { year: toNumber("28/06/1969"), title: "Moti di Stonewall (nascita del movimento per i diritti LGBTQIA+)", category: "cultura", importance: 4 },
    { year: toNumber("24/12/1979"), title: "Invasione sovietica dell'Afghanistan", category: "politica", importance: 2 },
    { year: toNumber("04/06/1989"), title: "Proteste di Piazza Tienanmen in Cina", category: "politica", importance: 2 },
    { year: toNumber("02/08/1990"), title: "Invasione irachena del Kuwait e inizio della Guerra del Golfo", category: "politica", importance: 2 },
    { year: toNumber("11/12/1994"), title: "Inizio della Prima Guerra Cecena", category: "politica", importance: 3 },
    { year: toNumber("01/01/1995"), title: "Fondazione dell'Organizzazione Mondiale del Commercio (WTO)", category: "politica", importance: 3 },
    { year: toNumber("24/10/1996"), title: "Inizio delle Guerre del Congo", category: "politica", importance: 3 },
    { year: toNumber("07/10/2023"), title: "Attentati del 7 ottobre: miliziani di Hamas superano le barriere difensive di Israele uccidendo 1.200 persone e catturando 251 ostaggi, inizio del'invasione militare di Gaza", category: "politica", importance: 2 }
];

const wikiTechEvents = [
    { year: -4500, title: "Invenzione del tornio da vasaio (prima ruota) in Mesopotamia", category: "tecnologia", importance: 2 },
    { year: -2000, title: "Primi usi della carrucola in Mesopotamia", category: "tecnologia", importance: 3 },
    { year: -350, title: "Primi mulini ad acqua (Persia e Mesopotamia)", category: "tecnologia", importance: 2 },
    { year: -250, title: "Invenzione della vite di Archimede", category: "tecnologia", importance: 2 },
    { year: -100, title: "Sviluppo del calcestruzzo romano (Opus caementicium)", category: "tecnologia", importance: 2 },
    { year: 850, title: "Invenzione dei mulini a vento nel mondo islamico (Persia)", category: "tecnologia", importance: 2 },
    { year: 1206, title: "Al-Jazari inventa automi programmabili e l'albero a camme/manovella", category: "tecnologia", importance: 2 },
    { year: 1286, title: "Invenzione degli occhiali da vista in Italia", category: "tecnologia", importance: 3 },
    { year: 1300, title: "Diffusione dei primi orologi meccanici pubblici in Europa", category: "tecnologia", importance: 2 },
    { year: 1709, title: "Abraham Darby utilizza il coke per la fusione del ferro (nascita della siderurgia moderna)", category: "tecnologia", importance: 3 },
    { year: 1733, title: "Invenzione della spoletta volante (John Kay)", category: "tecnologia", importance: 3 },
    { year: toNumber("17/07/1761"), title: "Apertura del Bridgewater Canal (inizio dell'era dei canali in Inghilterra)", category: "tecnologia", importance: 3 },
    { year: 1764, title: "Invenzione del filatoio meccanico Spinning Jenny (James Hargreaves)", category: "tecnologia", importance: 3 },
    { year: toNumber("02/07/1779"), title: "Completamento dell'Iron Bridge (primo ponte in ghisa al mondo)", category: "tecnologia", importance: 3 },
    { year: 1787, title: "Invenzione del telaio meccanico (Edmund Cartwright)", category: "tecnologia", importance: 3 },
    { year: toNumber("17/08/1807"), title: "Il battello a vapore 'Clermont' di Robert Fulton inizia il servizio commerciale", category: "tecnologia", importance: 2 },
    { year: toNumber("21/06/1834"), title: "Cyrus McCormick brevetta la mietitrice meccanica (rivoluzione agricola industriale)", category: "tecnologia", importance: 3 },
    { year: toNumber("14/08/1834"), title: "Brevetto della prima macchina frigorifera a compressione di vapore (Jacob Perkins)", category: "tecnologia", importance: 3 },
    { year: toNumber("12/08/1851"), title: "Brevetto della macchina da cucire moderna (Isaac Singer)", category: "tecnologia", importance: 3 },
    { year: toNumber("12/03/1856"), title: "William Perkin scopre la mauveina (nascita dell'industria chimica dei coloranti sintetici)", category: "tecnologia", importance: 3 },
    { year: toNumber("27/07/1866"), title: "Posa del primo cavo telegrafico transatlantico permanente e funzionante", category: "tecnologia", importance: 2 },
    { year: toNumber("21/11/1877"), title: "Invenzione del fonografo (Thomas Edison)", category: "tecnologia", importance: 2 },
    { year: toNumber("08/11/1887"), title: "Invenzione del grammofono a dischi piatti (Emile Berliner)", category: "tecnologia", importance: 3 },
    { year: toNumber("01/01/1927"), title: "Introduzione del frigorifero domestico di massa (General Electric 'Monitor Top')", category: "tecnologia", importance: 3 },
    { year: toNumber("21/06/1948"), title: "Introduzione del disco in vinile LP a 33 giri (Columbia Records)", category: "tecnologia", importance: 3 },
    { year: toNumber("30/08/1963"), title: "Presentazione della Musicassetta (Compact Cassette, Philips)", category: "tecnologia", importance: 3 },
    { year: toNumber("25/07/1978"), title: "Nascita del primo bambino in provetta (FIV - Fecondazione in vitro)", category: "scienza", importance: 3 },
    { year: toNumber("06/03/1983"), title: "Lancio commerciale del primo telefono cellulare portatile (Motorola DynaTAC)", category: "tecnologia", importance: 2 }
];


const computingHistoryEvents = [
    // Storia dell'Informatica e Calcolo
    { year: -2700, title: "Invenzione dell'abaco in Mesopotamia", category: "tecnologia", importance: 2 },
    { year: 1642, title: "Blaise Pascal inventa la Pascalina, la prima calcolatrice meccanica", category: "tecnologia", importance: 3 },
    { year: 1801, title: "Telaio Jacquard programmabile tramite schede perforate", category: "tecnologia", importance: 4 },
    { year: 1837, title: "Charles Babbage progetta la Macchina Analitica", category: "tecnologia", importance: 3 },
    { year: 1842, title: "Ada Lovelace scrive il primo algoritmo (prima programmatrice della storia)", category: "scienza", importance: 3 },
    { year: 1847, title: "'Le leggi del pensiero' (Boole inventa l'algebra booleana)", category: "scienza", importance: 3 },
    { year: 1868, title: "Invenzione della tastiera con layout QWERTY (Christopher Sholes)", category: "tecnologia", importance: 4 },
    { year: 1890, title: "Macchina tabulatrice a schede perforate di Hollerith (origini dell'IBM)", category: "tecnologia", importance: 4 },
    { year: toNumber("10/12/1945"), title: "Completamento dell'ENIAC (primo computer elettronico general-purpose)", category: "tecnologia", importance: 3 },
    { year: toNumber("30/06/1945"), title: "John von Neumann pubblica il 'First Draft of a Report on the EDVAC', delineando l'architettura dei moderni computer", category: "scienza", importance: 2 },
    { year: toNumber("14/06/1951"), title: "UNIVAC I: il primo computer commerciale della storia", category: "tecnologia", importance: 4 },
    { year: toNumber("09/12/1968"), title: "Invenzione del mouse per computer(Douglas Engelbart)", category: "tecnologia", importance: 4 },
    { year: 1970, title: "Nasce UNIX (Ken Thompson e Dennis Ritchie)", category: "tecnologia", importance: 3 },
    { year: toNumber("29/11/1972"), title: "Uscita di Pong della Atari (inizio dell'industria dei videogiochi)", category: "cultura", importance: 4 },
    { year: toNumber("17/10/1979"), title: "Creazione di VisiCalc, il primo foglio elettronico", category: "tecnologia", importance: 4 },
    { year: toNumber("12/08/1981"), title: "Debutta l'IBM Personal Computer (PC)", category: "tecnologia", importance: 3 },
    { year: toNumber("04/08/1982"), title: "Esce il Commodore 64 (modello di computer più venduto della storia)", category: "tecnologia", importance: 4 },
    { year: toNumber("01/01/1983"), title: "Adozione universale del protocollo TCP/IP (le fondamenta di Internet)", category: "tecnologia", importance: 3 },
    { year: toNumber("20/11/1985"), title: "Microsoft rilascia Windows 1.0", category: "tecnologia", importance: 3 },
    { year: toNumber("22/04/1993"), title: "Rilascio di NCSA Mosaic, primo browser web grafico diffuso", category: "tecnologia", importance: 5 },
    { year: toNumber("16/07/1995"), title: "Nascono Amazon ed eBay (alba dell'e-commerce moderno)", category: "tecnologia", importance: 3 },
    { year: 1895, title: "Guglielmo Marconi effettua la prima trasmissione radiotelegrafica (telegrafo senza fili)", category: "tecnologia", importance: 2 },
    { year: toNumber("12/12/1901"), title: "Prima trasmissione radiotelegrafica transatlantica ad opera di Guglielmo Marconi", category: "tecnologia", importance: 2 },
    { year: toNumber("24/12/1906"), title: "Prima trasmissione radiofonica della voce umana (AM) ad opera di Reginald Fessenden", category: "tecnologia", importance: 2 },
    { year: toNumber("02/11/1920"), title: "Inizio delle prime trasmissioni radiofoniche commerciali regolari (stazione KDKA)", category: "tecnologia", importance: 3 },
    { year: toNumber("26/01/1926"), title: "Prima dimostrazione pubblica di televisione (elettromeccanica) ad opera di John Logie Baird", category: "tecnologia", importance: 3 },
    { year: toNumber("26/12/1933"), title: "Edwin Armstrong inventa e brevetta la radio FM", category: "tecnologia", importance: 3 },
    { year: toNumber("02/11/1936"), title: "La BBC inizia il primo servizio regolare di trasmissioni televisive pubbliche al mondo", category: "tecnologia", importance: 2 },
    { year: toNumber("03/01/1954"), title: "Inizio delle trasmissioni televisive regolari in Italia da parte della RAI", category: "tecnologia", importance: 3 }
];


const italianHistoryEvents = [
    { year: 756, title: "Donazione di Pipino (nascita dello Stato Pontificio)", category: "politica", importance: 3 },
    { year: toNumber("30/03/1282"), title: "Vespri Siciliani", category: "politica", importance: 3 },
    { year: toNumber("09/04/1454"), title: "Pace di Lodi (equilibrio tra gli Stati italiani)", category: "politica", importance: 3 },
    { year: toNumber("06/05/1527"), title: "Sacco di Roma: i Lanzichenecchi di Carlo V invadono la città", category: "politica", importance: 3 },
    { year: toNumber("03/04/1559"), title: "Pace di Cateau-Cambrésis (inizio dominio spagnolo in Italia)", category: "politica", importance: 3 },
    { year: toNumber("17/10/1797"), title: "Trattato di Campoformio (fine della Repubblica di Venezia)", category: "politica", importance: 3 },
    { year: toNumber("18/03/1848"), title: "Cinque Giornate di Milano e Prima Guerra d'Indipendenza", category: "politica", importance: 3 },
    { year: toNumber("11/05/1860"), title: "Spedizione dei Mille (sbarco a Marsala)", category: "politica", importance: 2 },
    { year: toNumber("20/09/1870"), title: "Breccia di Porta Pia (fine dello Stato Pontificio)", category: "politica", importance: 2 },
    { year: toNumber("24/05/1915"), title: "L'Italia entra nella Prima Guerra Mondiale", category: "politica", importance: 3 },
    { year: toNumber("02/06/1946"), title: "Proclamazione della Repubblica Italiana: Referendum istituzionale, primo voto alle donne in Italia", category: "politica", importance: 2 },
    { year: toNumber("25/03/1957"), title: "Trattati di Roma (nascita della CEE)", category: "politica", importance: 2 },
    { year: toNumber("09/10/1963"), title: "Tragedia del Vajont", category: "politica", importance: 3 },
    { year: toNumber("16/03/1978"), title: "Rapimento di Aldo Moro in via Fani a Roma da parte delle Brigate Rosse, uccisi i cinque agenti della sua scorta", category: "politica", importance: 2 },
    { year: toNumber("09/05/1978"), title: "Ritrovamento del cadavere di Aldo Moro a Roma dopo 55 giorni di prigionia", category: "politica", importance: 2 },
    { year: toNumber("17/02/1992"), title: "Arresto di Mario Chiesa (inizio di Mani Pulite)", category: "politica", importance: 3 },
    { year: toNumber("23/05/1992"), title: "Strage di Capaci: ucciso il giudice antimafia Falcone", category: "politica", importance: 2 },
    { year: toNumber("19/07/1992"), title: "Strage di via D'Amelio: ucciso il giudice antimafia Borsellino", category: "politica", importance: 2 },
    { year: toNumber("06/04/2009"), title: "Terremoto dell'Aquila (forte scossa in Abruzzo e lunga sequenza di repliche)", category: "scienza", importance: 2 },
    { year: toNumber("27/06/1980"), title: "Strage di Ustica: volo civile Bologna - Palermo esplode in volo sopra il mar Tirreno", category: "politica", importance: 3},
    { year: toNumber("30/04/1993"), title: "Contestazione a Bettino Craxi davanti all'Hotel Raphael di Roma (lancio delle monetine)", category: "politica", importance: 4 },
    { year: toNumber("13/12/2009"), title: "Aggressione a Silvio Berlusconi (a capo del governo Italiano) in piazza Duomo", category: "politica", importance: 4 },
    { year: toNumber("20/07/2001"), title: "G8 di Genova: ucciso il manifestante Carlo Giuliani durante gli scontri con le forze dell'ordine", category: "politica", importance: 3 },
    { year: toNumber("21/07/2001"), title: "G8 di Genova: blitz della polizia nella scuola Diaz contro manifestanti e giornalisti (la più grave sospensione dei diritti umani in Occidente dopo il 1945 secondo Amnesty International)", category: "politica", importance: 3 },
    { year: toNumber("22/07/2001"), title: "G8 di Genova: violenze e torture contro i manifestanti arrestati all'interno della caserma di Bolzaneto", category: "politica", importance: 3 },
    { year: toNumber("17/09/1985"), title: "Il Tribunale di Napoli condanna Enzo Tortora a 10 anni di carcere basandosi su accuse di pentiti di camorra", category: "politica", importance: 3 },
    { year: toNumber("15/09/1986"), title: "La Corte d'Appello di Napoli assolve Enzo Tortora con formula piena", category: "politica", importance: 3 }

];


const preUSHistoryEvents = [
    { year: toNumber("28/08/1565"), title: "Fondazione di St. Augustine (Florida, primo insediamento europeo permanente in USA)", category: "politica", importance: 4 },
    { year: toNumber("20/08/1619"), title: "Arrivo dei primi schiavi africani a Jamestown (Virginia)", category: "politica", importance: 3 },
    { year: toNumber("07/09/1630"), title: "Fondazione di Boston e della Massachusetts Bay Colony", category: "cultura", importance: 4 },
    { year: toNumber("26/05/1636"), title: "Inizio della Guerra Pequot nel New England tra coloni e indigeni", category: "politica", importance: 3 },
    { year: toNumber("26/05/1637"), title: "Massacro di Mystic (coloni inglesi incendiano un villaggio Pequot, svolta nella guerra)", category: "politica", importance: 2 },
    { year: toNumber("21/09/1638"), title: "Trattato di Hartford: dissoluzione della nazione Pequot ad opera dei coloni inglesi", category: "politica", importance: 3 },
    { year: toNumber("29/02/1692"), title: "Inizio dei processi alle streghe di Salem", category: "cultura", importance: 4 },
    { year: toNumber("17/05/1754"), title: "Inizio della Guerra franco-indiana", category: "politica", importance: 3 },
    { year: toNumber("05/03/1770"), title: "Massacro di Boston (truppe britanniche uccidono civili americani)", category: "politica", importance: 4 },
    { year: toNumber("16/12/1773"), title: "Boston Tea Party (protesta contro l'imposta sul tè)", category: "politica", importance: 3 },
    { year: toNumber("19/04/1775"), title: "Battaglie di Lexington e Concord (inizio Guerra d'Indipendenza)", category: "politica", importance: 2 }
];

const americanRevolutionEvents = [
    { year: toNumber("22/03/1765"), title: "Stamp Act (inizio delle proteste fiscali nelle colonie americane)", category: "politica", importance: 4 },
    { year: toNumber("05/09/1774"), title: "Primo Congresso Continentale a Filadelfia", category: "politica", importance: 3 },
    { year: toNumber("19/09/1777"), title: "Battaglia di Saratoga (svolta della Rivoluzione Americana)", category: "politica", importance: 3 },
    { year: toNumber("06/02/1778"), title: "Trattato di Alleanza tra Stati Uniti e Francia", category: "politica", importance: 3 },
    { year: toNumber("19/10/1781"), title: "Assedio di Yorktown (resa decisiva dei britannici)", category: "politica", importance: 3 },
    { year: toNumber("03/09/1783"), title: "Trattato di Parigi (riconoscimento formale dell'indipendenza USA)", category: "politica", importance: 3 },
    { year: toNumber("30/04/1789"), title: "George Washington diventa il primo Presidente degli Stati Uniti", category: "politica", importance: 2 },
    { year: toNumber("15/12/1791"), title: "Ratifica del Bill of Rights (primi 10 emendamenti alla Costituzione USA)", category: "politica", importance: 3 }
];


const americanOldWestEvents = [
    { year: toNumber("14/05/1804"), title: "Spedizione di Lewis e Clark (esplorazione dell'ovest americano)", category: "scienza", importance: 3 },
    { year: toNumber("28/05/1830"), title: "Indian Removal Act (deportazione dei Nativi Americani, 'Sentiero delle lacrime')", category: "politica", importance: 3 },
    { year: toNumber("24/01/1848"), title: "Inizio della Corsa all'oro in California", category: "cultura", importance: 3 },
    { year: toNumber("20/05/1862"), title: "Homestead Act (legge che incentiva la colonizzazione del West)", category: "politica", importance: 3 },
    { year: toNumber("10/05/1869"), title: "Completamento della Prima Ferrovia Transcontinentale negli USA", category: "tecnologia", importance: 3 },
    { year: toNumber("25/06/1876"), title: "Battaglia del Little Bighorn (vittoria dei Nativi su Custer)", category: "politica", importance: 4 },
    { year: toNumber("29/12/1890"), title: "Massacro di Wounded Knee (fine delle Guerre Indiane)", category: "politica", importance: 3 }
];

const earlyUSHistoryEvents = [
    { year: toNumber("14/03/1793"), title: "Invenzione della sgranatrice di cotone (Cotton gin) di Eli Whitney", category: "tecnologia", importance: 3 },
    { year: toNumber("01/11/1800"), title: "Washington D.C. diventa la capitale degli USA", category: "politica", importance: 3 },
    { year: toNumber("01/01/1808"), title: "Entra in vigore il divieto federale di importare schiavi negli Stati Uniti", category: "politica", importance: 3 },
    { year: toNumber("18/06/1812"), title: "Inizio della Guerra del 1812 contro la Gran Bretagna", category: "politica", importance: 3 },
    { year: toNumber("24/08/1814"), title: "Incendio di Washington (le truppe britanniche bruciano la Casa Bianca)", category: "politica", importance: 4 },
    { year: toNumber("22/02/1819"), title: "Trattato Adams-Onís (gli Stati Uniti acquisiscono la Florida dalla Spagna)", category: "politica", importance: 3 }
];


const missing19thCenturyEvents = [
    // Scienza e Tecnologia
    { year: 1824, title: "Louis Braille inventa il sistema di lettura per non vedenti", category: "tecnologia", importance: 3 },
    { year: toNumber("27/12/1831"), title: "Charles Darwin salpa sul HMS Beagle per il suo viaggio intorno al mondo", category: "scienza", importance: 3 },
    { year: toNumber("01/10/1848"), title: "'Sopra una scala termometrica assoluta' (William Thomson noto come Lord Kelvin)", category: "scienza", importance: 3 },
    { year: toNumber("10/01/1863"), title: "Inaugurazione della prima metropolitana al mondo a Londra", category: "tecnologia", importance: 2 },
    { year: toNumber("07/05/1867"), title: "Alfred Nobel brevetta la dinamite", category: "tecnologia", importance: 3 },
    { year: toNumber("11/07/1899"), title: "Fondazione della FIAT a Torino", category: "tecnologia", importance: 3 },

    // Politica e Storia d'Italia
    { year: toNumber("29/06/1857"), title: "Spedizione di Sapri di Carlo Pisacane", category: "politica", importance: 4 },
    { year: toNumber("24/06/1859"), title: "Battaglia di Solferino: vittoria franco-piemontese contro l'Austria", category: "politica", importance: 3 },
    { year: toNumber("26/10/1863"), title: "Fondazione della Croce Rossa Internazionale a Ginevra", category: "politica", importance: 3 },
    { year: toNumber("28/09/1864"), title: "Fondazione della Prima Internazionale (Associazione Internazionale dei Lavoratori)", category: "politica", importance: 3 },
    { year: toNumber("04/05/1886"), title: "Rivolta di Haymarket a Chicago: origine della festa del 1° Maggio", category: "politica", importance: 3 },
    { year: toNumber("01/01/1889"), title: "Promulgazione del Codice Zanardelli (abolizione della pena di morte in Italia)", category: "politica", importance: 3 },
    { year: toNumber("06/05/1898"), title: "Fatti di maggio: Bava Beccaris ordina di sparare sulla folla a Milano", category: "politica", importance: 3 },

    // Cultura e Costume
    { year: toNumber("26/11/1865"), title: "'Alice nel Paese delle Meraviglie' (Lewis Carroll)", category: "cultura", importance: 3 },
    { year: toNumber("20/05/1873"), title: "Levi Strauss e Jacob Davis brevettano i Blue Jeans", category: "cultura", importance: 4 },
    { year: toNumber("21/11/1887"), title: "Prima apparizione di Sherlock Holmes in 'Uno studio in rosso'", category: "cultura", importance: 4 },
    { year: toNumber("26/05/1897"), title: "Pubblicazione di 'Dracula' di Bram Stoker", category: "cultura", importance: 4 }
];


const missing20thCenturyEvents = [
    { year: toNumber("21/01/1921"), title: "Fondazione del Partito Comunista d'Italia (PCdI) a Livorno", category: "politica", importance: 4 },
    { year: toNumber("27/07/1921"), title: "Prima estrazione dell'insulina: rivoluzione per la cura del diabete", category: "scienza", importance: 2 },
    { year: toNumber("16/05/1929"), title: "Prima cerimonia di premiazione degli Oscar a Los Angeles", category: "cultura", importance: 3 },
    { year: toNumber("13/07/1930"), title: "Primo Campionato mondiale di calcio (Uruguay sconfigge Argentina)", category: "cultura", importance: 4 },
    { year: toNumber("18/04/1951"), title: "Trattato di Parigi: nascita della CECA (primo nucleo dell'Unione Europea)", category: "politica", importance: 4 },
    { year: toNumber("17/05/1954"), title: "Brown v. Board of Education: fine della segregazione razziale nelle scuole USA", category: "politica", importance: 3 },
    { year: toNumber("23/10/1956"), title: "Rivoluzione Ungherese contro l'occupazione sovietica", category: "politica", importance: 3 },
    { year: toNumber("11/10/1962"), title: "Inizio del Concilio Vaticano II: profondo rinnovamento della Chiesa", category: "cultura", importance: 3 },
    { year: toNumber("01/12/1970"), title: "Introduzione del divorzio in Italia (Legge Fortuna-Baslini)", category: "politica", importance: 3 },
    { year: toNumber("22/05/1978"), title: "Approvazione della Legge 194 sull'interruzione volontaria di gravidanza in Italia", category: "politica", importance: 3 },
    { year: toNumber("16/10/1978"), title: "Elezione di Papa Giovanni Paolo II (Karol Wojtyła), primo papa polacco", category: "cultura", importance: 3 },
    { year: toNumber("04/05/1979"), title: "Margaret Thatcher diventa la prima donna Primo Ministro del Regno Unito", category: "politica", importance: 3 },
    { year: toNumber("02/08/1980"), title: "Strage della stazione di Bologna: il più grave attentato degli Anni di Piombo", category: "politica", importance: 3 },
    { year: toNumber("17/09/1980"), title: "Nascita di Solidarność in Polonia sotto la guida di Lech Wałęsa", category: "politica", importance: 3 },
    { year: toNumber("16/09/1987"), title: "Protocollo di Montréal per la protezione dello strato di ozono", category: "scienza", importance: 3 }
];


const antebellumUSHistoryEvents = [
    { year: toNumber("03/03/1820"), title: "Compromesso del Missouri (equilibrio tra Stati liberi e schiavisti)", category: "politica", importance: 3 },
    { year: toNumber("19/07/1848"), title: "Convenzione di Seneca Falls (primo congresso per i diritti delle donne negli USA)", category: "politica", importance: 3 },
    { year: toNumber("09/09/1850"), title: "Compromesso del 1850 tra stati USA del nord e del sud, approvazione del 'Fugitive Slave Act'", category: "politica", importance: 3 },
    { year: toNumber("20/03/1852"), title: "'La capanna dello zio Tom' (Harriet Beecher Stowe)", category: "cultura", importance: 3 },
    { year: toNumber("30/05/1854"), title: "Kansas-Nebraska Act (annulla il Compromesso del Missouri, nascono i Repubblicani)", category: "politica", importance: 3 },
    { year: toNumber("06/03/1857"), title: "Sentenza Dred Scott (gli afroamericani non possono essere cittadini USA)", category: "politica", importance: 3 },
    { year: toNumber("16/10/1859"), title: "Raid abolizionista di John Brown ad Harpers Ferry", category: "politica", importance: 3 }
];


const civilWarAndGildedAgeEvents = [
    { year: toNumber("06/11/1860"), title: "Elezione di Abraham Lincoln (causa della secessione del Sud)", category: "politica", importance: 3 },
    { year: toNumber("01/01/1863"), title: "Proclama di Emancipazione (liberazione degli schiavi nei territori ribelli in America)", category: "politica", importance: 3 },
    { year: toNumber("09/04/1865"), title: "Fine della Guerra Civile Americana (resa di Lee ad Appomattox)", category: "politica", importance: 3 },
    { year: toNumber("14/04/1865"), title: "Assassinio di Abraham Lincoln", category: "politica", importance: 3 },
    { year: toNumber("06/12/1865"), title: "Ratifica del 13° Emendamento (abolizione definitiva della schiavitù negli USA)", category: "politica", importance: 3 },
    { year: toNumber("30/03/1867"), title: "Acquisto dell'Alaska dall'Impero Russo", category: "politica", importance: 3 },
    { year: toNumber("18/05/1896"), title: "Sentenza Plessy v. Ferguson (la Corte Suprema USA legalizza la segregazione razziale)", category: "politica", importance: 4 }
];


const southAmericanHistoryEvents = [
    { year: 400, title: "Fioritura della civiltà di Tiwanaku e Nazca nelle Ande", category: "cultura", importance: 3 },
    { year: toNumber("18/01/1535"), title: "Francisco Pizarro fonda Lima (Perù)", category: "politica", importance: 4 },
    { year: toNumber("20/11/1542"), title: "Istituzione del Vicereame del Perù (dominio spagnolo in Sud America)", category: "politica", importance: 3 },
    { year: toNumber("01/08/1776"), title: "Creazione del Vicereame del Río de la Plata", category: "politica", importance: 3 },
    { year: toNumber("04/11/1780"), title: "Ribellione di Túpac Amaru II in Perù contro l'Impero spagnolo", category: "politica", importance: 3 },
    { year: toNumber("25/05/1810"), title: "Rivoluzione di Maggio a Buenos Aires (inizio moti d'indipendenza in Sud America)", category: "politica", importance: 3 },
    { year: toNumber("07/08/1819"), title: "Battaglia di Boyacá: decisiva per l'indipendenza della Nuova Granada (Colombia)", category: "politica", importance: 4 },
    { year: toNumber("26/07/1822"), title: "Incontro di Guayaquil tra Simón Bolívar e José de San Martín", category: "politica", importance: 3 },
    { year: toNumber("07/09/1822"), title: "Indipendenza del Brasile e fondazione dell'Impero", category: "politica", importance: 3 },
    { year: toNumber("09/12/1824"), title: "Battaglia di Ayacucho: fine definitiva del dominio spagnolo in Sud America", category: "politica", importance: 3 },
    { year: toNumber("05/04/1879"), title: "Inizio della Guerra del Pacifico (Cile contro Perù e Bolivia)", category: "politica", importance: 3 },
    { year: toNumber("13/05/1888"), title: "Legge d'Oro (Lei Áurea) abolisce la schiavitù in Brasile", category: "politica", importance: 3 },
    { year: toNumber("15/11/1889"), title: "Proclamazione della Repubblica in Brasile (fine dell'Impero)", category: "politica", importance: 3 },
    { year: toNumber("15/06/1932"), title: "Inizio della Guerra del Chaco tra Bolivia e Paraguay", category: "politica", importance: 3 },
    { year: toNumber("09/04/1948"), title: "Il 'Bogotazo' (inizio de La Violencia in Colombia)", category: "politica", importance: 4 },
    { year: toNumber("01/04/1964"), title: "Colpo di Stato in Brasile, inizio della dittatura militare di Castelo Branco", category: "politica", importance: 3 },
    { year: toNumber("25/11/1975"), title: "Formalizzazione dell'Operazione Condor (repressione coordinata dalle dittature sudamericane)", category: "politica", importance: 3 },
    { year: toNumber("24/03/1976"), title: "Colpo di Stato in Argentina di Videla (Processo di Riorganizzazione Nazionale)", category: "politica", importance: 3 },
    { year: toNumber("02/04/1982"), title: "Inizio della Guerra delle Falkland (Malvinas) tra Argentina e Regno Unito", category: "politica", importance: 3 },
    { year: toNumber("05/10/1988"), title: "Plebiscito in Cile (il 'No' segna la fine della dittatura di Pinochet)", category: "politica", importance: 3 },
    { year: toNumber("06/12/1998"), title: "Elezione di Hugo Chávez in Venezuela (inizio della Rivoluzione Bolivariana)", category: "politica", importance: 3 },
    { year: toNumber("01/12/2001"), title: "Il 'Corralito' e crisi economica, politica e sociale in Argentina", category: "politica", importance: 3 }
];


const newZealandHistoryEvents = [
    { year: 1280, title: "Primi insediamenti polinesiani in Nuova Zelanda (nascita della cultura Māori)", category: "cultura", importance: 3 },
    // CORRETTO: Abel Tasman avvista la Nuova Zelanda il 13/12/1642.
    { year: toNumber("13/12/1642"), title: "Abel Tasman avvista la Nuova Zelanda (primo contatto europeo)", category: "cultura", importance: 3 },
    // CORRETTO: Il Trattato di Waitangi viene firmato il 06/02/1840.
    { year: toNumber("06/02/1840"), title: "Trattato di Waitangi tra capi Māori e la Corona Britannica", category: "politica", importance: 3 }
];

const culturalGapsEvents = [
    { year: -500, title: "Laozi e la nascita del Taoismo (composizione tradizionaele del Tao Te Ching)", category: "cultura", importance: 3 },
    { year: toNumber("01/04/1748"), title: "Inizio degli scavi archeologici di Pompei sotto Carlo di Borbone", category: "cultura", importance: 3 },
    { year: 1831, title: "La grande onda di Kanagawa di Hokusai (pubblicazione della serie delle 36 vedute)", category: "cultura", importance: 4 },
    { year: toNumber("26/04/1925"), title: "Pubblicazione postuma de 'Il processo' di Franz Kafka", category: "cultura", importance: 4 },
    { year: toNumber("25/06/1947"), title: "Prima pubblicazione del 'Diario' di Anna Frank nei Paesi Bassi", category: "cultura", importance: 3 },
    { year: toNumber("11/10/1947"), title: "Prima edizione di 'Se questo è un uomo' di Primo Levi", category: "cultura", importance: 3 },
    { year: -400, title: "Fase principale di composizione del Mahabharata e del Ramayana in India", category: "cultura", importance: 3 },
    { year: 1180, title: "Averroè completa i commentari ad Aristotele (ponte tra mondo arabo ed europeo)", category: "cultura", importance: 3 },
    { year: 1377, title: "Ibn Khaldun termina la 'Muqaddimah' (fondamento della storiografia e sociologia)", category: "cultura", importance: 3 },
    { year: 1792, title: "Mary Wollstonecraft pubblica 'A Vindication of the Rights of Woman'", category: "cultura", importance: 3 },
    { year: toNumber("12/04/1919"), title: "Fondazione del Bauhaus a Weimar da parte di Walter Gropius", category: "cultura", importance: 4 },
    { year: 1949, title: "Pubblicazione de 'Il secondo sesso' di Simone de Beauvoir", category: "cultura", importance: 4 },
    { year: toNumber("10/09/1951"), title: "Akira Kurosawa vince il Leone d'Oro con 'Rashomon' (il cinema asiatico si svela all'Occidente)", category: "cultura", importance: 4 },
    { year: toNumber("27/09/1962"), title: "Pubblicazione di 'Primavera silenziosa' di Rachel Carson", category: "cultura", importance: 3 },
    { year: toNumber("09/02/1964"), title: "The Beatles all'Ed Sullivan Show: picco della British Invasion negli USA", category: "cultura", importance: 4 },
    { year: toNumber("30/01/1873"), title: "Pubblicazione di 'Il giro del mondo in 80 giorni' di Jules Verne", category: "cultura", importance: 4 },
    { year: toNumber("13/04/1973"), title: "Uscita di 'Catch a Fire' dei Wailers: il Reggae diventa globale", category: "cultura", importance: 4 },
    { year: toNumber("01/01/1963"), title: "Inizio trasmissioni di 'Astro Boy' di Osamu Tezuka, prima serie anime TV", category: "cultura", importance: 4 },
    { year: toNumber("15/01/1974"), title: "Pubblicazione di 'Dungeons & Dragons' (Gary Gygax e Dave Arneson)", category: "cultura", importance: 4 },
    { year: toNumber("29/09/1964"), title: "Debutto di Mafalda di Quino sulla rivista Primera Plana", category: "cultura", importance: 3 },
    { year: toNumber("23/10/1958"), title: "Prima apparizione dei Puffi nel fumetto 'Johan et Pirlouit'", category: "cultura", importance: 4 },
    { year: 1976, title: "Pubblicazione di 'Avere o essere?' di Erich Fromm", category: "cultura", importance: 4 },
    { year: 1980, title: "Pubblicazione de 'Il nome della rosa' di Umberto Eco", category: "cultura", importance: 3 },
    { year: toNumber("22/11/1995"), title: "Uscita di 'Toy Story', primo lungometraggio interamente in CGI", category: "cultura", importance: 4 },
    { year: toNumber("22/10/1982"), title: "Uscita nelle sale USA di 'Rambo' (First Blood)", category: "cultura", importance: 3 },
    { year: toNumber("14/03/1844"), title: "Inizio della pubblicazione a puntate de 'I tre moschettieri' di Dumas", category: "cultura", importance: 4 },
    { year: toNumber("28/08/1844"), title: "Inizio della pubblicazione a puntate de 'Il Conte di Montecristo'", category: "cultura", importance: 4 },
    { year: 1697, title: "Charles Perrault pubblica 'I racconti di Mamma l'Oca'", category: "cultura", importance: 3 },
    { year: 1902, title: "Peter Pan appare per la prima volta nel romanzo 'L'uccellino bianco'", category: "cultura", importance: 4 },
    { year: 1947, title: "Uscita del disco 'La Vie en rose' di Édith Piaf", category: "cultura", importance: 3 },
    { year: toNumber("01/05/1918"), title: "Bertrand Russell imprigionato a Londra per scontare una condanna a sei mesi a causa dei suoi scritti pacifisti", category: "politica", importance: 3 },
    { year: toNumber("31/03/1952"), title: "Alan Turing processato e condannato in Inghilterra per 'grave indecenza' per la sua omosessualità, accetta la castrazione chimica come alternativa alla carcerazione", category: "politica", importance: 3 },
    { year: toNumber("12/09/1961"), title: "Bertrand Russell a 89 anni viene condannato e incarcerato per una settimana dopo essersi rifiutato di firmare una promessa di buona condotta a seguito di una manifestazione anti-nucleare a Londra", category: "politica", importance: 3 },
    { year: toNumber("25/05/1895"), title: "Oscar Wilde condannato a Londra a due anni di lavori forzati per omosessualità", category: "cultura", importance: 3 },
    { year: toNumber("08/11/1926"), title: "Antonio Gramsci incarcerato a Roma dal regime fascista per le sei idee politiche", category: "politica", importance: 3 },
    { year: toNumber("29/06/1954"), title: "Revoca del nulla osta di sicurezza al Robert Oppenheimer a causa delle sue passate simpatie di sinistra", category: "politica", importance: 3 },
    { year: toNumber("27/10/1947"), title: "Totò (Antonio de Curtis) deposita la celebre canzone Malafemmena alla SIAE", category: "cultura", importance: 5 },
    { year: toNumber("17/04/1967"), title: "Il funerale di Totò a Napoli unisce oltre duecentomila persone in un tributo storico", category: "cultura", importance: 4 },
    { year: toNumber("22/12/1970"), title: "Esce nei cinema 'Lo chiamavano Trinità...', nasce il mito di Bud Spencer e Terence Hill", category: "cultura", importance: 3 },
    { year: toNumber("25/02/2007"), title: "Ennio Morricone riceve il Premio Oscar alla carriera", category: "cultura", importance: 3 },
    { year: toNumber("28/02/2016"), title: "Ennio Morricone vince l'Oscar per la colonna sonora di The Hateful Eight a 87 anni", category: "cultura", importance: 4 },
    { year: toNumber("23/02/2026"), title: "John Williams stabilisce il record storico assoluto di 55 nomination ai Premi Oscar", category: "cultura", importance: 5 },
    { year: 1906, title: "L'artista svedese Hilma af Klint dipinge la serie 'Primordial Chaos', realizzando le prime opere interamente astratte della storia dell'arte moderna", category: "cultura", importance: 3 },
    { year: toNumber("01/01/1947"), title: "Jackson Pollock realizza i primi dipinti con la tecnica del dripping, dando vita all'Action Painting e all'Espressionismo Astratto", category: "cultura", importance: 3 }
];


const techGapsEvents = [
    { year: -312, title: "Costruzione dell'Acquedotto Appio (prima grande opera idraulica romana)", category: "tecnologia", importance: 3 },
    { year: 300, title: "Diffusione della staffa in metallo in Cina (rivoluzione della cavalleria)", category: "tecnologia", importance: 3 },
    { year: 1088, title: "Shen Kuo descrive la bussola magnetica per la navigazione in Cina", category: "tecnologia", importance: 2 },
    { year: 1816, title: "Invenzione dello stetoscopio (René Laennec)", category: "tecnologia", importance: 3 },
    { year: toNumber("27/08/1859"), title: "Edwin Drake perfora il primo pozzo petrolifero moderno a Titusville", category: "tecnologia", importance: 2 },
    { year: toNumber("28/02/1892"), title: "Rudolf Diesel deposita il brevetto per il motore Diesel (DE 67207)", category: "tecnologia", importance: 3 },
    { year: toNumber("13/07/1907"), title: "Leo Baekeland brevetta la bachelite, la prima plastica sintetica", category: "tecnologia", importance: 3 },
    { year: toNumber("12/04/1937"), title: "Primo test riuscito del motore a reazione di Frank Whittle", category: "tecnologia", importance: 2 },
    { year: toNumber("26/06/1954"), title: "Entra in funzione la prima centrale nucleare civile (Obninsk, URSS)", category: "tecnologia", importance: 2 },
    { year: toNumber("12/09/1958"), title: "Jack Kilby realizza il primo circuito integrato (microchip) funzionante", category: "tecnologia", importance: 1 },
    { year: toNumber("16/05/1960"), title: "Theodore Maiman aziona il primo laser (a rubino) funzionante", category: "tecnologia", importance: 2 },
    { year: toNumber("03/04/1973"), title: "Prima chiamata da un telefono cellulare portatile (Martin Cooper, Motorola)", category: "tecnologia", importance: 2 },
    { year: toNumber("22/02/1978"), title: "Lancio del primo satellite Navstar (inizio dell'era del GPS)", category: "tecnologia", importance: 2 },
    { year: toNumber("15/01/1996"), title: "Rilascio delle specifiche USB 1.0", category: "tecnologia", importance: 3 },
    { year: toNumber("26/06/1997"), title: "Rilascio dello standard IEEE 802.11 (nascita del Wi-Fi)", category: "tecnologia", importance: 3 },
    { year: toNumber("22/10/2004"), title: "Pubblicazione su Science della ricerca sull'isolamento del grafene", category: "tecnologia", importance: 3 },
    { year: toNumber("05/12/2022"), title: "Prima ignizione per fusione nucleare con guadagno energetico netto (NIF)", category: "tecnologia", importance: 3 },
    { year: toNumber("28/12/1895"), title: "Prima proiezione pubblica del Cinematografo dei fratelli Lumière a Parigi", category: "tecnologia", importance: 2 }
];


const scienceGapsEvents = [
    { year: -270, title: "Aristarco di Samo propone il primo modello eliocentrico noto", category: "scienza", importance: 2 },
    { year: 1021, title: "Ibn al-Haytham pubblica il 'Libro dell'ottica' (nascita del metodo scientifico sperimentale)", category: "scienza", importance: 2 },
    { year: toNumber("07/09/1674"), title: "Anton van Leeuwenhoek osserva i batteri (nascita della microbiologia)", category: "scienza", importance: 2 },
    { year: 1783, title: "Antoine Lavoisier enuncia la legge di conservazione della massa", category: "scienza", importance: 1 },
    { year: 1803, title: "John Dalton formula la teoria atomica moderna", category: "scienza", importance: 1 },
    { year: toNumber("23/09/1846"), title: "Scoperta del pianeta Nettuno (Urbain Le Verrier e Johann Galle)", category: "scienza", importance: 2 },
    { year: toNumber("24/03/1882"), title: "Robert Koch scopre il bacillo della tubercolosi", category: "scienza", importance: 2 },
    { year: 1915, title: "Alfred Wegener pubblica 'La formazione dei continenti e degli oceani', la sua teoria viene rifiutata dalla comunità scientifica per 50 anni", category: "scienza", importance: 1 },
    { year: 1962, title: "Harry Hess formula la teoria dell'espansione dei fondali oceanici, fornendo il meccanismo fisico che convalida la deriva dei continenti di Wegener", category: "scienza", importance: 3 },
    { year: toNumber("11/11/1966"), title: "Il simposio di New York sancisce il consenso scientifico definitivo sulla tettonica a placche, riabilitando postumamente le idee di Wegener", category: "scienza", importance: 3 },
    { year: toNumber("30/12/1923"), title: "Edwin Hubble dimostra che Andromeda è una galassia esterna alla Via Lattea", category: "scienza", importance: 1 },
    { year: toNumber("15/05/1927"), title: "Georges Lemaître propone la teoria dell'espansione dell'universo (Big Bang)", category: "scienza", importance: 2 },
    { year: toNumber("01/03/1958"), title: "Inizio delle misurazioni della Curva di Keeling (accumulo di CO2 atmosferica)", category: "scienza", importance: 2 },
    { year: 1965, title: "Accettazione della Tettonica delle Placche come paradigma geologico", category: "scienza", importance: 2 },
    { year: 1970, title: "Vera Rubin fornisce prove osservative dell'esistenza della materia oscura", category: "scienza", importance: 2 },
    { year: toNumber("01/03/1974"), title: "Stephen Hawking pubblica la teoria sulla radiazione dei buchi neri", category: "scienza", importance: 2 },
    { year: 1983, title: "Invenzione della PCR (Reazione a Catena della Polimerasi) da parte di Kary Mullis", category: "scienza", importance: 2 },
    { year: toNumber("11/08/2006"), title: "Shinya Yamanaka annuncia la creazione delle cellule staminali iPSC", category: "scienza", importance: 1 },
    { year: toNumber("1785"), title: "Charles-Augustin de Coulomb pubblica il 'Premier Mémoire' in cui ricava la legge della forza tra cariche con la bilancia di torsione", category: "scienza", importance: 1 },
    { year: toNumber("18/09/1820"), title: "André-Marie Ampère legge all'Académie des Sciences le 'Notes' in cui presenta l'equivalenza tra bobine e magneti", category: "scienza", importance: 3 },
    { year: toNumber("29/10/1832"), title: "André-Marie Ampère pubblica la 'Note sur une expérience de Pixii' in cui descrive l'alternatore a magnete rotante", category: "tecnologia", importance: 3 },
    { year: toNumber("01/01/1835"), title: "Moritz von Jacobi pubblica il Mémoire sull'elettromagnetismo applicato alle macchine, in cui descrive il motore elettrico rotante", category: "tecnologia", importance: 3 },
    { year: toNumber("13/09/1838"), title: "Moritz von Jacobi dimostra sul fiume Neva il primo battello elettrico a ruote", category: "tecnologia", importance: 3 },
    { year: toNumber("20/03/1886"), title: "William Stanley illumina Main Street a Great Barrington con la prima rete a corrente alternata", category: "tecnologia", importance: 2 },
    { year: toNumber("21/09/1908"), title: "Hermann Minkowski tiene a Colonia la conferenza 'Raum und Zeit' in cui presenta la sua rappresentazione matematica dello spaziotempo a quattro dimensioni", category: "scienza", importance: 3 },
    { year: toNumber("21/09/1881"), title: "Il Congresso Internazionale di Elettricità di Parigi adotta il coulomb, l'ampere e il farad, e conferma le unità già in uso ohm e volt", category: "scienza", importance: 4 },
    { year: 1690, title: "Jacob Bernoulli scopre la costante matematica e (poi detto numero di Nepero) studiando la capitalizzazione continua degli interessi", category: "scienza", importance: 3 },
    { year: toNumber("31/12/1808"), title: "Gay-Lussac legge alla Société philomathique il 'Mémoire sur la combinaison des substances gazeuses', enunciando la legge dei volumi di combinazione", category: "scienza", importance: 2 },
    { year: 1828, title: "Friedrich Wöhler pubblica 'Ueber künstliche Bildung des Harnstoffs': sintesi dell'urea da cianato di ammonio, i composti organici si ottengono in laboratorio", category: "scienza", importance: 2 },
    { year: toNumber("03/09/1860"), title: "Al Congresso di Karlsruhe viene distribuito il 'Sunto di un corso di filosofia chimica' di Cannizzaro (già sul Nuovo Cimento nel 1858), che distingue pesi atomici e molecolari", category: "scienza", importance: 3 },
    { year: 1865, title: "August Kekulé pubblica 'Sur la constitution des substances aromatiques', proponendo la struttura ciclica del benzene", category: "scienza", importance: 3 },
    { year: 1884, title: "Henri Le Chatelier pubblica sui Comptes rendus 'Sur un énoncé général des lois des équilibres chimiques'", category: "scienza", importance: 3 },
    { year: 1887, title: "Svante Arrhenius pubblica 'Über die Dissociation der in Wasser gelösten Stoffe', base della definizione moderna di acidi e basi", category: "scienza", importance: 2 },
    { year: 1939, title: "Linus Pauling pubblica 'The Nature of the Chemical Bond', fondando la teoria moderna del legame chimico", category: "scienza", importance: 2 },
    { year: 1788, title: "James Hutton pubblica sulle Transactions of the Royal Society of Edinburgh 'Theory of the Earth', fondando l'uniformitarismo", category: "scienza", importance: 3 },
    { year: 1809, title: "Jean-Baptiste Lamarck pubblica la 'Philosophie zoologique', prima teoria sistematica dell'evoluzione per adattamento all'ambiente", category: "scienza", importance: 3 },
    { year: toNumber("01/07/1858"), title: "Alla Linnean Society Lyell e Hooker presentano 'On the Tendency of Species to form Varieties' di Darwin e Wallace, prima esposizione pubblica della selezione naturale", category: "scienza", importance: 3 },
    { year: toNumber("22/07/1910"), title: "Thomas Hunt Morgan pubblica su Science 'Sex Limited Inheritance in Drosophila', localizzando i geni sui cromosomi", category: "scienza", importance: 2 },
    { year: 1937, title: "Hans Krebs e William Johnson pubblicano su Enzymologia 'The role of citric acid in intermediate metabolism in animal tissues' (ciclo di Krebs)", category: "scienza", importance: 3 },
    { year: toNumber("15/02/2001"), title: "Nature pubblica 'Initial sequencing and analysis of the human genome', bozza della sequenza a opera del consorzio pubblico internazionale", category: "scienza", importance: 2 },
    { year: 1882, title: "Walther Flemming pubblica il trattato sulla divisione cellulare, descrivendo la mitosi e i cromosomi", category: "scienza", importance: 4 },
    { year: 1905, title: "Farmer e Moore pubblicano un articolo sulla divisione riduzionale, introducendo il termine meiosi", category: "scienza", importance: 4 },
    { year: 1948, title: "Melvin Calvin e Andrew Benson pubblicano su Science un articolo sul percorso del carbonio nella fotosintesi (ciclo di Calvin)", category: "scienza", importance: 4 },
    { year: 1902, title: "Giuseppe Mercalli pubblica un articolo che definisce la scala di intensità macrosismica dei terremoti", category: "scienza", importance: 4 },
    { year: 1935, title: "Charles Richter pubblica un articolo che introduce la scala di magnitudo strumentale dei terremoti", category: "scienza", importance: 4 },
    { year: toNumber("17/01/1803"), title: "Giovanni Aldini applica la pila di Volta al cadavere del condannato George Forster nella prigione di Newgate a Londra, dimostrazione pubblica del galvanismo", category: "scienza", importance: 3 }
];

const politicalGapsEvents = [
    { year: toNumber("21/03/1804"), title: "Promulgazione del Codice Civile Napoleonico", category: "politica", importance: 2 },
    { year: toNumber("29/08/1842"), title: "Trattato di Nanchino: fine della prima guerra dell'oppio e apertura della Cina", category: "politica", importance: 2 },
    { year: toNumber("03/03/1861"), title: "Abolizione della servitù della gleba nell'Impero Russo", category: "politica", importance: 2 },
    { year: toNumber("20/11/1910"), title: "Inizio della Rivoluzione Messicana", category: "politica", importance: 3 },
    { year: toNumber("04/02/1945"), title: "Conferenza di Yalta tra Roosevelt, Churchill e Stalin", category: "politica", importance: 1 },
    { year: toNumber("05/06/1947"), title: "Annuncio del Piano Marshall", category: "politica", importance: 2 },
    { year: toNumber("12/08/1949"), title: "Convenzioni di Ginevra (diritto internazionale umanitario)", category: "politica", importance: 1 },
    { year: toNumber("18/04/1955"), title: "Conferenza di Bandung e nascita del movimento dei Non Allineati", category: "politica", importance: 2 },
    { year: toNumber("01/07/1968"), title: "Trattato di non proliferazione nucleare (TNP)", category: "politica", importance: 2 },
    { year: toNumber("21/02/1972"), title: "Viaggio di Richard Nixon in Cina (apertura diplomatica tra USA e Cina)", category: "politica", importance: 2 },
    { year: toNumber("01/08/1975"), title: "Accordi di Helsinki", category: "politica", importance: 2 },
    { year: toNumber("14/06/1985"), title: "Accordo di Schengen (libera circolazione in Europa)", category: "politica", importance: 2 },
    { year: toNumber("11/02/1990"), title: "Nelson Mandela viene liberato dopo 27 anni di prigionia", category: "politica", importance: 1 },
    { year: toNumber("17/07/1998"), title: "Approvazione dello Statuto di Roma (istituzione della Corte Penale Internazionale)", category: "politica", importance: 2 },
    { year: toNumber("01/01/2002"), title: "L'Euro entra in circolazione in 12 paesi UE", category: "politica", importance: 1 },
    { year: toNumber("09/07/2011"), title: "Il Sud Sudan ottiene l'indipendenza e diventa lo stato più giovane al mondo", category: "politica", importance: 3 }
];

const australianHistoryEvents = [
    { year: toNumber("26/02/1606"), title: "Primo sbarco europeo documentato in Australia (Willem Janszoon)", category: "scienza", importance: 3 },
    { year: toNumber("29/04/1770"), title: "James Cook sbarca a Botany Bay e rivendica l'Australia Orientale", category: "scienza", importance: 3 },
    { year: toNumber("12/02/1851"), title: "Inizio della Corsa all'oro australiana", category: "cultura", importance: 3 },
    { year: toNumber("01/01/1901"), title: "Federazione dell'Australia (nascita del Commonwealth dell'Australia)", category: "politica", importance: 3 },
    { year: toNumber("27/05/1967"), title: "Referendum in Australia per l'inclusione dei diritti civili degli Aborigeni", category: "politica", importance: 4 },
    { year: toNumber("13/02/2008"), title: "Scuse formali del governo australiano alle 'Generazioni rubate' aborigene", category: "politica", importance: 3 }
];


const chineseHistoryEvents = [
    { year: toNumber("11/01/1851"), title: "Inizio della Rivolta dei Taiping (devastante guerra civile in Cina)", category: "politica", importance: 3 },
    { year: toNumber("02/11/1899"), title: "Inizio della Ribellione dei Boxer (rivolta cinese anti-straniera e anti-cristiana)", category: "politica", importance: 3 },
    { year: toNumber("10/10/1911"), title: "Rivoluzione Xinhai (Rivolta di Wuchang, crollo dell'Impero Cinese)", category: "politica", importance: 3 },
    { year: toNumber("01/01/1912"), title: "Fondazione della Repubblica di Cina (Sun Yat-sen presidente provvisorio)", category: "politica", importance: 2 },
    { year: toNumber("16/10/1934"), title: "Inizio della Lunga Marcia dell'Esercito Rosso Cinese sotto Mao Zedong", category: "politica", importance: 3 },
    { year: toNumber("07/07/1937"), title: "Incidente del ponte di Marco Polo (inizio invasione giapponese della Cina)", category: "politica", importance: 2 },
    { year: toNumber("23/05/1958"), title: "Mao Zedong lancia il 'Grande balzo in avanti': inizia la collettivizzazione che porterà alla Grande carestia", category: "politica", importance: 2 },
    { year: toNumber("16/05/1966"), title: "Inizio della Rivoluzione Culturale sotto Mao Zedong", category: "politica", importance: 2 },
    { year: toNumber("18/12/1978"), title: "Approvazione delle riforme economiche di Deng Xiaoping ('Socialismo con caratteristiche cinesi')", category: "politica", importance: 2 },
    { year: toNumber("01/07/1997"), title: "Trasferimento della sovranità di Hong Kong dal Regno Unito alla Cina", category: "politica", importance: 3 }
];

const asianHistoryEvents = [
    { year: toNumber("24/03/1603"), title: "Istituzione dello Shogunato Tokugawa (inizio del periodo Edo in Giappone)", category: "politica", importance: 3 },
    { year: toNumber("10/05/1857"), title: "Moti indiani del 1857 (Rivolta dei Sepoy) contro il dominio britannico", category: "politica", importance: 3 },
    { year: toNumber("12/03/1930"), title: "Marcia del Sale di Mahatma Gandhi (disobbedienza civile pacifica in India)", category: "politica", importance: 3 },
    { year: toNumber("01/11/1955"), title: "Inizio della Guerra del Vietnam", category: "politica", importance: 2 },
    { year: toNumber("17/04/1975"), title: "I Khmer Rossi prendono il potere in Cambogia (inizio del genocidio cambogiano)", category: "politica", importance: 3 }
];

const frenchHistoryEvents = [
    { year: toNumber("10/03/1661"), title: "Inizio del governo personale di Luigi XIV, il 'Re Sole' in Francia (apogeo dell'assolutismo)", category: "politica", importance: 2 },
    { year: toNumber("19/07/1870"), title: "Inizio della Guerra franco-prussiana (crollo del Secondo Impero francese)", category: "politica", importance: 3 },
    { year: toNumber("18/03/1871"), title: "Nascita della Comune di Parigi (primo governo socialista della storia)", category: "politica", importance: 3 },
    { year: toNumber("22/06/1940"), title: "Armistizio di Compiègne (nascita della Francia di Vichy e inizio della Resistenza di De Gaulle)", category: "politica", importance: 3 },
    { year: toNumber("04/10/1958"), title: "Nascita della Quinta Repubblica francese (presidenza di Charles de Gaulle)", category: "politica", importance: 3 }
];

const germanHistoryEvents = [
    { year: toNumber("23/09/1122"), title: "Concordato di Worms (fine della lotta per le investiture)", category: "politica", importance: 3 },
    { year: toNumber("16/07/1338"), title: "Dichiarazione di Rhense (indipendenza dell'elezione imperiale dal Papa)", category: "politica", importance: 4 },
    { year: toNumber("23/06/1524"), title: "Inizio della Guerra dei contadini tedeschi (grande rivolta popolare)", category: "politica", importance: 4 },
    { year: toNumber("25/09/1555"), title: "Pace di Augusta (cuius regio, eius religio)", category: "politica", importance: 3 },
    { year: toNumber("18/01/1701"), title: "Fondazione del Regno di Prussia (Federico I incoronato re)", category: "politica", importance: 3 },
    { year: toNumber("29/08/1756"), title: "Inizio della Guerra dei Sette Anni (ascesa della Prussia come grande potenza)", category: "politica", importance: 3 },
    { year: toNumber("06/08/1806"), title: "Scioglimento del Sacro Romano Impero", category: "politica", importance: 3 },
    { year: toNumber("18/10/1817"), title: "Festa della Wartburg (proteste studentesche e nazionalismo tedesco)", category: "politica", importance: 4 },
    { year: 1834, title: "Zollverein: entra in vigore l'Unione Doganale Tedesca", category: "politica", importance: 4 },
    { year: toNumber("18/05/1848"), title: "Parlamento di Francoforte (tentativo liberale di unificazione)", category: "politica", importance: 3 },
    { year: toNumber("14/06/1866"), title: "Guerra Austro-Prussiana (vittoria di Sadowa ed egemonia prussiana)", category: "politica", importance: 3 },
    { year: toNumber("18/01/1871"), title: "Unificazione della Germania (Proclamazione dell'Impero Tedesco a Versailles)", category: "politica", importance: 3 },
    { year: toNumber("15/06/1883"), title: "Bismarck introduce l'assicurazione sanitaria (nascita del welfare moderno)", category: "politica", importance: 4 },
    { year: toNumber("15/11/1923"), title: "Picco dell'Iperinflazione nella Repubblica di Weimar, i prezzi raddoppiano ogni 3,7 giorni", category: "politica", importance: 3 },
    { year: toNumber("15/09/1935"), title: "Leggi di Norimberga (istituzionalizzazione dell'antisemitismo)", category: "politica", importance: 2 },
    { year: toNumber("09/11/1938"), title: "Notte dei Cristalli: pogrom contro gli ebrei", category: "politica", importance: 3 },
    { year: toNumber("23/05/1949"), title: "Divisione della Germania (nascita BRD e DDR)", category: "politica", importance: 2 },
    { year: toNumber("17/06/1953"), title: "Moti operai del 17 giugno nella Germania Est", category: "politica", importance: 3 },
    { year: toNumber("13/08/1961"), title: "Costruzione del Muro di Berlino", category: "politica", importance: 2 },
    { year: toNumber("21/12/1972"), title: "Trattato Base (Grundlagenvertrag) tra le due Germanie", category: "politica", importance: 3 },
    { year: toNumber("03/10/1990"), title: "Riunificazione Tedesca", category: "politica", importance: 2 },
    { year: toNumber("22/11/2005"), title: "Angela Merkel diventa la prima donna Cancelliere della Germania", category: "politica", importance: 4 },
    { year: toNumber("15/04/2023"), title: "La Germania chiude le sue ultime centrali nucleari", category: "politica", importance: 3 }
];

const caribbeanHistoryEvents = [
    { year: -4000, title: "Primi insediamenti precolombiani nei Caraibi (popoli Ortoiroidi)", category: "cultura", importance: 3 },
    { year: toNumber("05/08/1496"), title: "Fondazione di Santo Domingo (primo insediamento europeo permanente)", category: "politica", importance: 3 },
    { year: toNumber("28/08/1518"), title: "Re Carlo I di Spagna autorizza il trasporto diretto di schiavi dall'Africa ai Caraibi", category: "politica", importance: 2 },
    { year: toNumber("10/05/1655"), title: "Conquista inglese della Giamaica", category: "politica", importance: 3 },
    { year: toNumber("20/09/1697"), title: "Trattato di Ryswick (la Francia acquisisce Saint-Domingue)", category: "politica", importance: 3 },
    { year: 1715, title: "Picco dell'Età d'oro della pirateria nei Caraibi", category: "politica", importance: 4 },
    { year: toNumber("27/02/1844"), title: "Indipendenza della Repubblica Dominicana da Haiti", category: "politica", importance: 3 },
    { year: toNumber("06/08/1962"), title: "Indipendenza della Giamaica (inizio decolonizzazione dei Caraibi anglofoni)", category: "politica", importance: 3 },
    { year: toNumber("25/10/1983"), title: "Invasione statunitense di Grenada (Operazione Urgent Fury)", category: "politica", importance: 3 },
    { year: toNumber("12/01/2010"), title: "Devastante terremoto di Haiti", category: "scienza", importance: 2 }
];


const spanishHistoryEvents = [
    { year: -218, title: "Inizio della conquista romana della penisola iberica (Hispania)", category: "politica", importance: 3 },
    { year: 415, title: "I Visigoti fondano il Regno Visigoto in Hispania", category: "politica", importance: 3 },
    { year: toNumber("19/10/1469"), title: "Matrimonio tra Isabella I di Castiglia e Ferdinando II d'Aragona (i Re Cattolici)", category: "politica", importance: 2 },
    { year: toNumber("31/03/1492"), title: "Decreto di Alhambra: espulsione degli ebrei dalla Spagna", category: "politica", importance: 3 },
    { year: toNumber("14/03/1516"), title: "Carlo I d'Asburgo diventa re, unificando le corone (inizio Impero spagnolo)", category: "politica", importance: 2 },
    { year: 1701, title: "Inizio della Guerra di Successione Spagnola", category: "politica", importance: 3 },
    { year: toNumber("02/05/1808"), title: "Inizio della Guerra d'indipendenza Spagnola contro Napoleone", category: "politica", importance: 3 },
    { year: toNumber("19/03/1812"), title: "Costituzione di Cadice (una delle prime costituzioni liberali)", category: "politica", importance: 3 },
    { year: toNumber("14/04/1931"), title: "Proclamazione della Seconda Repubblica Spagnola", category: "politica", importance: 3 },
    { year: toNumber("20/11/1975"), title: "Morte di Francisco Franco, fine della dittatura in Spagna", category: "politica", importance: 2 },
    { year: toNumber("06/12/1978"), title: "Approvazione della Costituzione democratica spagnola", category: "politica", importance: 2 },
    { year: toNumber("11/03/2004"), title: "Attentati terroristici dell'11 marzo a Madrid (11-M)", category: "politica", importance: 2 }
];

const portugueseHistoryEvents = [
    { year: toNumber("05/10/1143"), title: "Trattato di Zamora (riconoscimento dell'indipendenza del Portogallo)", category: "politica", importance: 4 },
    { year: toNumber("22/04/1500"), title: "Pedro Álvares Cabral sbarca in Brasile", category: "scienza", importance: 3 },
    { year: toNumber("25/08/1580"), title: "Inizio dell'Unione Iberica (Filippo II di Spagna diventa Re del Portogallo)", category: "politica", importance: 3 },
    { year: toNumber("01/12/1640"), title: "Guerra di Restaurazione (il Portogallo riottiene l'indipendenza dalla Spagna)", category: "politica", importance: 3 },
    { year: toNumber("19/03/1933"), title: "Approvazione della Costituzione dell'Estado Novo, inizio della dittatura di Salazar in Portogallo", category: "politica", importance: 4 },
    { year: toNumber("25/04/1974"), title: "Rivoluzione dei Garofani (fine della dittatura in Portogallo)", category: "politica", importance: 3 },
    { year: toNumber("01/01/1986"), title: "Il Portogallo (insieme alla Spagna) entra nella Comunità Economica Europea (CEE)", category: "politica", importance: 4 },
    { year: toNumber("20/12/1999"), title: "Restituzione di Macao alla Cina (fine dell'Impero coloniale portoghese)", category: "politica", importance: 4 }
];

const balkanHistoryEvents = [
    { year: toNumber("09/08/681"), title: "Fondazione del Primo Impero Bulgaro", category: "politica", importance: 4 },
    { year: toNumber("26/10/1185"), title: "Rivolta di Asen e Pietro e nascita del Secondo Impero Bulgaro", category: "politica", importance: 4 },
    { year: toNumber("16/04/1346"), title: "Incoronazione di Stefan Dušan e fondazione dell'Impero Serbo", category: "politica", importance: 3 },
    { year: toNumber("15/06/1389"), title: "Battaglia della Piana dei Merli (Kosovo Polje) tra l'Impero Ottomano e le forze serbe", category: "politica", importance: 3 },
    { year: toNumber("02/03/1444"), title: "Creazione della Lega di Alessio (Lezhë) sotto Scanderbeg contro l'Impero Ottomano", category: "politica", importance: 3 },
    { year: toNumber("13/07/1878"), title: "Trattato di Berlino: ridefinizione dei confini balcanici e indipendenza di Serbia, Montenegro e Romania", category: "politica", importance: 3 },
    { year: toNumber("08/10/1912"), title: "Inizio della Prima Guerra Balcanica", category: "politica", importance: 3 }
];


const middleEasternHistoryEvents = [
    { year: -7500, title: "Insediamento neolitico di Çatalhöyük in Anatolia", category: "cultura", importance: 2 },
    { year: toNumber("08/06/632"), title: "Inizio del Califfato dei Rashidun (I quattro califfi ben guidati)", category: "politica", importance: 3 },
    { year: 900, title: "Prima stesura organica de \"Le mille e una notte\" (nucleo originario arabo e persiano)", category: "cultura", importance: 2 },
    { year: toNumber("05/01/909"), title: "Fondazione del Califfato Fatimide in Nord Africa", category: "politica", importance: 3 },
    { year: toNumber("03/09/1260"), title: "Battaglia di Ayn Jalut, i Mamelucchi fermano l'avanzata mongola nel Levante", category: "politica", importance: 3 },
    { year: 1299, title: "Fondazione dell'Impero Ottomano sotto Osman I", category: "politica", importance: 2 },
    { year: 1501, title: "Fondazione dell'Impero Safavide in Persia", category: "politica", importance: 2 },
    { year: toNumber("22/01/1517"), title: "L'Impero Ottomano sconfigge i Mamelucchi conquistando l'Egitto (inizio del Califfato ottomano)", category: "politica", importance: 3 },
    { year: toNumber("02/11/1917"), title: "Dichiarazione Balfour: un documento del governo britannico esprime sostegno a una ptria nazionale ebraica in Palestina", category: "politica", importance: 2 },
    { year: toNumber("29/10/1923"), title: "Fondazione della Repubblica di Turchia sotto Mustafa Kemal Atatürk", category: "politica", importance: 3 },
    { year: toNumber("03/03/1924"), title: "Abolizione formale del Califfato islamico da parte della Turchia", category: "politica", importance: 4 },
    { year: toNumber("23/09/1932"), title: "Fondazione e unificazione del Regno dell'Arabia Saudita", category: "politica", importance: 3 },
    { year: toNumber("19/08/1953"), title: "Colpo di Stato in Iran: l'operazione Ajax di CIA e MI6 rovescia il governo Mossadeq", category: "politica", importance: 3 },
    { year: toNumber("13/04/1975"), title: "Inizio della Guerra Civile Libanese", category: "politica", importance: 3 },
    { year: toNumber("22/09/1980"), title: "Inizio della Guerra Iran-Iraq", category: "politica", importance: 3 },
    { year: toNumber("13/09/1993"), title: "Accordi di Oslo tra Israele e l'OLP", category: "politica", importance: 2 },
    { year: toNumber("29/06/2014"), title: "Ascesa dell'ISIS e proclamazione del Califfato in Siria e Iraq", category: "politica", importance: 3 },
    { year: toNumber("15/09/2020"), title: "Accordi di Abramo tra Israele, Emirati Arabi Uniti e Bahrein", category: "politica", importance: 3 },
    { year: toNumber("08/12/2024"), title: "Caduta del regime di Bashar al-Assad in Siria", category: "politica", importance: 3 }
];



const southeastAsianHistoryEvents = [
    { year: -3500, title: "Inizio dell'espansione austronesiana verso il Sud-est asiatico marittimo", category: "politica", importance: 3 },
    { year: -500, title: "Sviluppo della cultura di Dong Son in Vietnam (industria del bronzo)", category: "cultura", importance: 3 },
    { year: 50, title: "Nascita del Regno di Funan nel delta del Mekong", category: "politica", importance: 4 },
    { year: 683, title: "Ascesa dell'Impero Srivijaya a Sumatra (dominio sulle rotte commerciali dello Stretto di Malacca)", category: "politica", importance: 4 },
    { year: 825, title: "Completamento del tempio di Borobudur a Giava (Dinastia Shailendra)", category: "cultura", importance: 3 },
    { year: toNumber("10/11/1293"), title: "Fondazione dell'Impero Majapahit a Giava", category: "politica", importance: 3 },
    { year: 1350, title: "Fondazione del Regno di Ayutthaya (Siam)", category: "politica", importance: 4 },
    { year: 1400, title: "Fondazione del Sultanato di Malacca (centro del commercio delle spezie e diffusione dell'Islam)", category: "politica", importance: 3 },
    { year: toNumber("15/08/1511"), title: "Conquista portoghese di Malacca (inizio dell'era coloniale europea nel Sud-est asiatico)", category: "politica", importance: 3 },
    { year: toNumber("30/05/1619"), title: "La VOC olandese fonda Batavia (Giacarta) in Indonesia", category: "politica", importance: 4 },
    { year: toNumber("29/01/1819"), title: "Sir Stamford Raffles fonda la moderna Singapore", category: "politica", importance: 4 },
    { year: toNumber("07/05/1954"), title: "Battaglia di Dien Bien Phu (fine del dominio francese in Indocina)", category: "politica", importance: 3 },
    { year: toNumber("01/10/1965"), title: "Massacri anticomunisti in Indonesia e ascesa del generale Suharto (Nuovo Ordine)", category: "politica", importance: 3 },
    { year: toNumber("08/08/1967"), title: "Fondazione dell'ASEAN (Associazione delle Nazioni del Sud-est asiatico)", category: "politica", importance: 3 }
];



const indianHistoryEvents = [
    { year: -3300, title: "Inizio della Civiltà della Valle dell'Indo (Harappa e Mohenjo-daro)", category: "cultura", importance: 3 },
    { year: -1500, title: "Inizio del Periodo Vedico (migrazione indo-ariana e composizione dei Veda)", category: "cultura", importance: 3 },
    { year: toNumber("15/05/-326"), title: "Battaglia dell'Idaspe (Campagna indiana di Alessandro Magno)", category: "politica", importance: 3 },
    { year: -322, title: "Fondazione dell'Impero Maurya da parte di Chandragupta Maurya (primo grande impero pan-indiano)", category: "politica", importance: 3 },
    { year: 320, title: "Fondazione dell'Impero Gupta (inizio dell'Età dell'oro indiana per cultura e scienza)", category: "politica", importance: 3 },
    { year: 711, title: "Conquista omayyade del Sindh (primo ingresso politico dell'Islam nel subcontinente indiano)", category: "politica", importance: 3 },
    { year: 1000, title: "Apogeo dell'Impero Chola nel sud dell'India sotto Rajaraja Chola I (grande potenza navale)", category: "politica", importance: 4 },
    { year: 1206, title: "Fondazione del Sultanato di Delhi (inizio del dominio islamico nel nord dell'India)", category: "politica", importance: 4 },
    { year: 1336, title: "Fondazione dell'Impero Vijayanagara (grande impero indù del sud dell'India)", category: "politica", importance: 4 },
    { year: toNumber("25/11/1510"), title: "Conquista portoghese di Goa (inizio del colonialismo territoriale europeo in India)", category: "politica", importance: 3 },
    { year: toNumber("21/04/1526"), title: "Prima battaglia di Panipat, Babur fonda l'Impero Moghul in India", category: "politica", importance: 3 },
    { year: toNumber("06/06/1674"), title: "Incoronazione di Shivaji e fondazione dell'Impero Maratha (rinascita del potere indù)", category: "politica", importance: 4 },
    { year: toNumber("23/06/1757"), title: "Battaglia di Plassey (inizio del dominio territoriale della Compagnia Britannica delle Indie Orientali in Bengala)", category: "politica", importance: 2 },
    { year: toNumber("07/07/1799"), title: "Fondazione dell'Impero Sikh da parte del Maharaja Ranjit Singh nel nord-ovest", category: "politica", importance: 4 },
    { year: toNumber("02/08/1858"), title: "Inizio del British Raj (l'India passa sotto il controllo diretto della Corona Britannica)", category: "politica", importance: 3 },
    { year: toNumber("28/12/1885"), title: "Fondazione del Congresso Nazionale Indiano (INC)", category: "politica", importance: 4 },
    { year: toNumber("30/12/1906"), title: "Fondazione della Lega Musulmana Panindiana", category: "politica", importance: 3 },
    { year: toNumber("30/01/1948"), title: "Assassinio di Mahatma Gandhi", category: "politica", importance: 3 },
    { year: toNumber("26/03/1971"), title: "Inizio della Guerra di liberazione del Bangladesh", category: "politica", importance: 3 },
    { year: toNumber("25/06/1975"), title: "Proclamazione dello Stato di Emergenza in India da parte di Indira Gandhi", category: "politica", importance: 3 },
    { year: toNumber("23/07/1983"), title: "Inizio della Guerra civile in Sri Lanka (conflitto etnico contro le Tigri Tamil)", category: "politica", importance: 3 },
    { year: toNumber("24/07/1991"), title: "Avvio delle riforme di liberalizzazione economica in India", category: "politica", importance: 3 },
    { year: toNumber("11/05/1998"), title: "Test nucleari Pokhran-II, l'India diventa una potenza nucleare, seguita dal Pakistan", category: "politica", importance: 2 }
];



const missing16thCenturyEvents = [
    { year: toNumber("22/04/1516"), title: "Prima edizione dell''Orlando Furioso' di Ludovico Ariosto", category: "cultura", importance: 3 },
    
    { year: toNumber("15/03/1550"), title: "Giorgio Vasari pubblica 'Le vite' (fondazione della storia dell'arte)", category: "cultura", importance: 3 },
    
    { year: toNumber("17/11/1558"), title: "Elisabetta I d'Inghilterra sale al trono (inizio dell'Età elisabettiana)", category: "politica", importance: 3 },
    
    { year: 1559, title: "Papa Paolo IV promulga l'Indice dei libri proibiti dalla Chiesa Cattolica (Index Librorum Prohibitorum)", category: "cultura", importance: 2 },
    
    { year: toNumber("11/11/1572"), title: "Tycho Brahe osserva la Supernova SN 1572 (crisi del sistema cosmologico aristotelico)", category: "scienza", importance: 3 },
    
    { year: toNumber("26/07/1581"), title: "Atto di Abiura: le Province Unite (Paesi Bassi) dichiarano l'indipendenza dalla Spagna", category: "politica", importance: 3 },
    
    { year: 1590, title: "Invenzione del microscopio composto (attribuita a Zacharias Janssen)", category: "tecnologia", importance: 3 }
];

const missing17thCenturyEvents = [
    // Politica e Storia Globale
    { year: toNumber("31/12/1600"), title: "Fondazione della Compagnia Britannica delle Indie Orientali (EIC)", category: "politica", importance: 3 },
    { year: toNumber("24/03/1603"), title: "Unione delle corone di Inghilterra e Scozia (Giacomo I Stuart)", category: "politica", importance: 4 },
    { year: toNumber("03/03/1613"), title: "Michele I viene eletto Zar dal Zemskij Sobor, dando inizio alla Dinastia Romanov in Russia", category: "politica", importance: 4 },
    { year: toNumber("15/01/1648"), title: "Inizio della Fronda in Francia: il Parlamento di Parigi si oppone ai nuovi editti fiscali", category: "politica", importance: 4 },
    { year: toNumber("06/04/1652"), title: "Fondazione di Città del Capo da parte di Jan van Riebeeck (inizio colonizzazione olandese in Sudafrica)", category: "politica", importance: 3 },
    { year: toNumber("27/05/1679"), title: "Approvazione dell'Habeas Corpus Act in Inghilterra (tutela delle libertà personali)", category: "politica", importance: 3 },
    { year: toNumber("18/10/1685"), title: "Editto di Fontainebleau: Luigi XIV revoca l'Editto di Nantes", category: "politica", importance: 4 },
    { year: toNumber("26/01/1699"), title: "Pace di Carlowitz: inizio del declino dell'Impero Ottomano in Europa", category: "politica", importance: 4 },

    // Scienza e Tecnologia
    { year: 1643, title: "Invenzione del barometro a mercurio (Evangelista Torricelli)", category: "tecnologia", importance: 3 },
    { year: 1656, title: "Christiaan Huygens inventa l'orologio a pendolo", category: "tecnologia", importance: 3 },
    { year: toNumber("15/07/1662"), title: "Fondazione della Royal Society a Londra con il primo Royal Charter", category: "scienza", importance: 4 },
    { year: toNumber("21/11/1676"), title: "Ole Rømer presenta alla Royal Academy la dimostrazione che la velocità della luce è finita", category: "scienza", importance: 3 }
];

const missing18thCenturyEvents = [
    // Politica
    { year: toNumber("12/02/1700"), title: "Inizio della Grande Guerra del Nord (ascesa della Russia come potenza europea)", category: "politica", importance: 2 },
    { year: toNumber("16/12/1740"), title: "Inizio della Guerra di Successione Austriaca", category: "politica", importance: 3 },
    { year: toNumber("05/08/1772"), title: "Prima spartizione della Polonia tra Russia, Prussia e Austria", category: "politica", importance: 3 },

    // Scienza e Tecnologia
    { year: toNumber("01/08/1774"), title: "Scoperta dell'ossigeno (Priestley e Lavoisier)", category: "scienza", importance: 2 },
    { year: 1789, title: "'Traité élémentaire de chimie' (Antoine Lavoisier)", category: "scienza", importance: 2 },

    // Cultura e Musica
    { year: toNumber("30/09/1791"), title: "Prima esecuzione de 'Il flauto magico' di Wolfgang Amadeus Mozart", category: "cultura", importance: 4 }
];


const missing2000sEvents = [
    { year: 2000, title: "Passaggio al nuovo millennio e allarme 'Millennium Bug' (Y2K)", category: "tecnologia", importance: 4 },
    { year: toNumber("26/03/2000"), title: "Vladimir Putin viene eletto Presidente della Russia per la prima volta", category: "politica", importance: 2 },
    { year: toNumber("11/12/2001"), title: "La Cina entra nell'Organizzazione Mondiale del Commercio (WTO)", category: "politica", importance: 3 },
    { year: toNumber("20/05/2002"), title: "Indipendenza di Timor Est dopo decenni di conflitto", category: "politica", importance: 4},
    { year: toNumber("01/02/2003"), title: "Disastro dello Space Shuttle Columbia durante il rientro in atmosfera", category: "scienza", importance: 3 },
    { year: toNumber("12/03/2003"), title: "Diffusione dell'epidemia di SARS (Sindrome Respiratoria Acuta Grave)", category: "scienza", importance: 3 },
    { year: toNumber("01/05/2004"), title: "Grande allargamento dell'Unione Europea a 10 nuovi stati membri", category: "politica", importance: 3 },
    { year: toNumber("26/12/2004"), title: "Un terremoto al largo di Sumatra genera uno tsunami nell'Oceano Indiano che devasta le coste di 14 paesi", category: "scienza", importance: 2 },
    { year: toNumber("19/04/2005"), title: "Morte di Papa Giovanni Paolo II ed elezione di Benedetto XVI", category: "cultura", importance: 3 },
    { year: toNumber("07/07/2005"), title: "Attentati terroristici coordinati a Londra del 7 luglio", category: "politica", importance: 3 },
    { year: toNumber("29/08/2005"), title: "L'uragano Katrina devasta New Orleans e la costa del Golfo degli USA", category: "scienza", importance: 3 },
    { year: toNumber("04/11/2008"), title: "Barack Obama viene eletto primo presidente afroamericano degli Stati Uniti", category: "politica", importance: 2 },
    { year: toNumber("25/04/2009"), title: "Inizio della pandemia di influenza A H1N1 (febbre suina)", category: "scienza", importance: 3 }
];

const missing15thCenturyEvents = [
    // Cultura e Rinascimento
    { year: 1401, title: "Concorso per la porta nord del Battistero di Firenze (inizio simbolico del Rinascimento)", category: "cultura", importance: 4 },
    { year: 1486, title: "Giovanni Pico della Mirandola scrive la 'Oratio de hominis dignitate'", category: "cultura", importance: 4 },
    { year: toNumber("10/11/1494"), title: "Pubblicazione della 'Summa de arithmetica' di Luca Pacioli (formalizzazione della partita doppia)", category: "scienza", importance: 3 },

    // Politica Italia
    { year: toNumber("05/10/1434"), title: "Cosimo de' Medici rientra dall'esilio e assume il controllo di Firenze", category: "politica", importance: 3 },
    { year: toNumber("03/12/1469"), title: "Lorenzo il Magnifico assume la signoria di Firenze", category: "politica", importance: 3 },
    { year: toNumber("26/04/1478"), title: "Congiura dei Pazzi a Firenze (tentato omicidio di Lorenzo il Magnifico)", category: "politica", importance: 3 },
    { year: toNumber("08/04/1492"), title: "Morte di Lorenzo il Magnifico (fine dell'equilibrio politico della Pace di Lodi)", category: "politica", importance: 3 },

    // Politica Europea
    { year: toNumber("05/01/1477"), title: "Battaglia di Nancy e morte di Carlo il Temerario (fine dell'indipendenza borgognona)", category: "politica", importance: 3 }
];

const missing4thCenturyEvents = [
    { year: 304, title: "Inizio della Rivolta dei Wu Hu e del periodo dei Sedici Regni in Cina", category: "politica", importance: 3 },
    { year: 350, title: "Apogeo dell'Impero di Aksum in Etiopia sotto re Ezanà (adozione del Cristianesimo e fine di Kush)", category: "politica", importance: 3 },
    { year: toNumber("03/11/361"), title: "Regno di Giuliano l'Apostata (ultimo tentativo di restaurare il paganesimo nell'Impero Romano)", category: "politica", importance: 3 },
    { year: 375, title: "Gli Unni superano il Volga ed entrano in Europa (innesco delle Invasioni Barbariche)", category: "politica", importance: 2 },
    { year: toNumber("15/01/378"), title: "Intervento e conquista di Teotihuacan a Tikal (stravolgimento politico della civiltà Maya)", category: "politica", importance: 3 },
    { year: 383, title: "Battaglia del fiume Fei (il Sud della Cina respinge l'invasione, preservando la cultura Han)", category: "politica", importance: 3 },
    { year: 393, title: "Teodosio I abolisce le Olimpiadi antiche (repressione definitiva dei culti pagani)", category: "cultura", importance: 2 }
];

const missing13thCenturyEvents = [
    { year: 1202, title: "Fibonacci pubblica il 'Liber Abaci' (introduzione dei numeri arabi e dello zero in Europa)", category: "scienza", importance: 2 },
    { year: toNumber("05/06/1224"), title: "Federico II fonda l'Università di Napoli (prima università statale e laica)", category: "cultura", importance: 3 },
    { year: toNumber("02/05/1250"), title: "I Mamelucchi prendono il potere in Egitto (fondazione del Sultanato Mamelucco)", category: "politica", importance: 3 },
    { year: toNumber("15/08/1281"), title: "Seconda invasione mongola del Giappone respinta grazie al tifone 'Kamikaze'", category: "politica", importance: 3 },
    { year: toNumber("18/05/1291"), title: "Caduta di San Giovanni d'Acri (fine degli Stati Crociati e delle Crociate in Terra Santa)", category: "politica", importance: 2 },
    { year: 1298, title: "Rustichello da Pisa scrive 'Il Milione' sotto dettatura di Marco Polo", category: "cultura", importance: 3 }
];

const recentHistoryEvents = [
    // Geopolitica e Politica
    { year: toNumber("02/05/2011"), title: "Uccisione di Osama bin Laden (Operazione Neptune Spear)", category: "politica", importance: 3 },
    { year: toNumber("06/01/2021"), title: "Assalto al Campidoglio degli Stati Uniti (Capitol Hill)", category: "politica", importance: 2 },
    { year: toNumber("16/09/2022"), title: "Inizio delle proteste in Iran in seguito alla morte di Mahsa Amini", category: "politica", importance: 3 },

    // Società e Cultura
    { year: toNumber("13/03/2013"), title: "Dimissioni del Papa Benedetto XVI ed elezione di Papa Francesco (Jorge Mario Bergoglio), primo papa sudamericano", category: "cultura", importance: 2 },
    { year: toNumber("15/04/2019"), title: "Devastante incendio alla Cattedrale di Notre-Dame a Parigi", category: "cultura", importance: 3 },
    { year: toNumber("25/05/2020"), title: "Morte di George Floyd e proteste globali del movimento Black Lives Matter", category: "cultura", importance: 3 },
    { year: toNumber("06/02/2023"), title: "Devastante terremoto in Turchia meridionale e Siria", category: "scienza", importance: 3 },

    // Scienza e Tecnologia
    { year: toNumber("06/08/2012"), title: "Il rover Curiosity atterra con successo su Marte", category: "scienza", importance: 3 },
    { year: toNumber("17/03/2018"), title: "Esplosione dello scandalo Cambridge Analytica su Facebook", category: "tecnologia", importance: 3 },
    { year: toNumber("28/01/2024"), title: "Neuralink impianta per la prima volta un chip cerebrale in un essere umano", category: "tecnologia", importance: 3 },
    { year: toNumber("14/02/2019"), title: "OpenAI annuncia un nuovo modello così potente da non poter essere pubblicato per motivi di sicurezza, è GPT-2", category: "tecnologia", importance: 5 }
];


const missing1810sEvents = [
    // 1810
    { year: toNumber("20/07/1810"), title: "Dichiarazione d'indipendenza della Colombia (Congresso di Nuova Granada)", category: "politica", importance: 3 },
    { year: toNumber("21/08/1810"), title: "Bernadotte viene eletto principe ereditario di Svezia (inizio della dinastia attuale)", category: "politica", importance: 3 },
    { year: toNumber("12/10/1810"), title: "Primo Oktoberfest a Monaco di Baviera", category: "cultura", importance: 4 },

    // 1811
    { year: toNumber("05/02/1811"), title: "Inizio della Reggenza nel Regno Unito (il Principe di Galles assume i poteri)", category: "politica", importance: 4 },
    { year: toNumber("16/12/1811"), title: "Terremoto di New Madrid (uno dei più potenti sismi registrati negli USA)", category: "scienza", importance: 3 },

    // 1814
    { year: toNumber("14/01/1814"), title: "Trattato di Kiel: la Danimarca cede la Norvegia alla Svezia", category: "politica", importance: 3 },
    { year: toNumber("17/05/1814"), title: "Firma della Costituzione della Norvegia a Eidsvoll", category: "politica", importance: 3 },
    { year: toNumber("25/07/1814"), title: "George Stephenson collauda la 'Blücher', la sua prima locomotiva a vapore", category: "tecnologia", importance: 3 },
    { year: toNumber("24/12/1814"), title: "Trattato di Ghent: fine formale della guerra del 1812 tra USA e Regno Unito", category: "politica", importance: 3 },

    // 1815
    { year: toNumber("08/01/1815"), title: "Battaglia di New Orleans: vittoria decisiva americana (combattuta dopo il trattato di pace)", category: "politica", importance: 3 },
    { year: 1815, title: "Humphry Davy inventa la lampada di sicurezza per i minatori", category: "tecnologia", importance: 3 },

    // 1816
    { year: toNumber("20/02/1816"), title: "Prima rappresentazione de 'Il barbiere di Siviglia' di Gioachino Rossini a Roma", category: "cultura", importance: 4 },
    { year: toNumber("09/07/1816"), title: "Dichiarazione d'indipendenza dell'Argentina (Province Unite del Río de la Plata)", category: "politica", importance: 3 },

    // 1817
    { year: toNumber("12/02/1817"), title: "Battaglia di Chacabuco: l'esercito di San Martín sconfigge gli spagnoli in Cile", category: "politica", importance: 3 },
    { year: toNumber("04/07/1817"), title: "Inizio dei lavori di costruzione del Canale Erie negli Stati Uniti", category: "tecnologia", importance: 4 },

    // 1818
    { year: toNumber("12/01/1818"), title: "Karl Drais brevetta la 'Laufmaschine' (Draisina), antenata della bicicletta", category: "tecnologia", importance: 3 },
    { year: toNumber("24/12/1818"), title: "Prima esecuzione del canto natalizio 'Stille Nacht' (Astro del Ciel) in Austria", category: "cultura", importance: 4 },

    // 1819
    { year: toNumber("22/05/1819"), title: "La SS Savannah parte per la prima traversata atlantica di una nave a vapore", category: "tecnologia", importance: 3 },
    { year: toNumber("16/08/1819"), title: "Massacro di Peterloo a Manchester: sanguinosa repressione di una protesta popolare", category: "politica", importance: 3 },
    { year: toNumber("20/09/1819"), title: "Decreti di Carlsbad: restrizioni alla libertà di stampa e associazione in Germania", category: "politica", importance: 3 },
    { year: toNumber("14/12/1819"), title: "L'Alabama viene ammessa come 22º stato degli Stati Uniti", category: "politica", importance: 4 }
];


const missing1820sEvents = [
    { year: toNumber("21/07/1820"), title: "Il fisico danese Hans Christian Ørsted pubblica un opuscolo circa gli effetti di una corrente elettrica sui magneti", category: "scienza", importance: 2 },
    { year: toNumber("08/04/1820"), title: "Ritrovamento della Venere di Milo sull'isola di Milos", category: "cultura", importance: 4 },
    { year: toNumber("05/05/1821"), title: "Morte di Napoleone Bonaparte in esilio a Sant'Elena", category: "politica", importance: 2 },
    { year: toNumber("24/08/1821"), title: "Indipendenza del Messico (Trattato di Córdoba)", category: "politica", importance: 3 },
    { year: toNumber("15/09/1821"), title: "Indipendenza delle nazioni dell'America Centrale (Guatemala, El Salvador, Honduras, Nicaragua e Costa Rica)", category: "politica", importance: 3 },
    { year: toNumber("27/09/1822"), title: "Jean-François Champollion annuncia la decifrazione dei geroglifici egizi", category: "scienza", importance: 2 },
    { year: toNumber("01/11/1823"), title: "William Webb Ellis 'inventa' il Rugby football a Rugby, in Inghilterra", category: "cultura", importance: 5 },
    { year: toNumber("21/10/1824"), title: "Joseph Aspdin ottiene il brevetto per il cemento Portland", category: "tecnologia", importance: 3 },
    { year: toNumber("06/08/1825"), title: "Dichiarazione d'indipendenza della Bolivia", category: "politica", importance: 3 },
    { year: toNumber("26/12/1825"), title: "Rivolta dei Decabristi a San Pietroburgo contro il nuovo zar Nicola I", category: "politica", importance: 3 },
    { year: toNumber("14/04/1828"), title: "Noah Webster pubblica il suo celebre dizionario della lingua inglese (American Dictionary)", category: "cultura", importance: 5 },
    { year: toNumber("27/08/1828"), title: "Il Brasile e l'Argentina riconoscono l'indipendenza dell'Uruguay", category: "politica", importance: 3 },
    { year: toNumber("19/06/1829"), title: "Metropolitan Police Act: Robert Peel istituisce la moderna forza di polizia di Londra", category: "politica", importance: 3 },
    { year: toNumber("14/10/1829"), title: "La locomotiva 'Rocket' di George Stephenson vince i Rainhill Trials", category: "tecnologia", importance: 4 }
];


const planetaryMusicEvents = [
    { year: toNumber("27/01/1956"), title: "Uscita di 'Heartbreak Hotel' di Elvis Presley", category: "cultura", importance: 5 },
    { year: toNumber("06/06/1965"), title: "Uscita di '(I Can't Get No) Satisfaction' dei Rolling Stones", category: "cultura", importance: 4 },
    { year: toNumber("20/07/1965"), title: "Uscita di 'Like a Rolling Stone' di Bob Dylan", category: "cultura", importance: 4 },
    { year: toNumber("12/05/1967"), title: "Uscita di 'Are You Experienced' di Jimi Hendrix", category: "cultura", importance: 5 },
    { year: toNumber("08/11/1971"), title: "Uscita di 'Led Zeppelin IV' dei Led Zeppelin (contiene 'Stairway to Heaven')", category: "cultura", importance: 5 },
    { year: toNumber("16/06/1972"), title: "Uscita di 'The Rise and Fall of Ziggy Stardust and the Spiders from Mars' di David Bowie", category: "cultura", importance: 5 },
    { year: toNumber("01/03/1973"), title: "Uscita di 'The Dark Side of the Moon' dei Pink Floyd", category: "cultura", importance: 5 },
    { year: toNumber("31/10/1975"), title: "Uscita di 'Bohemian Rhapsody' dei Queen", category: "cultura", importance: 4 },
    { year: toNumber("16/08/1976"), title: "Uscita di 'Dancing Queen' degli ABBA", category: "cultura", importance: 5 },
    { year: toNumber("12/11/1984"), title: "Uscita di 'Like a Virgin' di Madonna", category: "cultura", importance: 5 },
    { year: toNumber("24/09/1991"), title: "Uscita di 'Nevermind' dei Nirvana (esplosione del Grunge)", category: "cultura", importance: 5 }
];

const missingUSHistoryEvents = [
    { year: toNumber("06/05/1882"), title: "Firma del Chinese Exclusion Act (prima legge a vietare l'immigrazione per razza)", category: "politica", importance: 3 },
    { year: toNumber("06/04/1917"), title: "Gli Stati Uniti entrano nella Prima Guerra Mondiale", category: "politica", importance: 2 },
    { year: toNumber("17/01/1920"), title: "Inizio dell'Era del Proibizionismo negli USA (18° Emendamento)", category: "politica", importance: 3 },
    { year: toNumber("31/05/1921"), title: "Massacro di Tulsa (distruzione di 'Black Wall Street')", category: "politica", importance: 4 },
    { year: toNumber("02/07/1964"), title: "Firma del Civil Rights Act (fine legale della segregazione razziale negli USA)", category: "politica", importance: 2 },
    { year: toNumber("22/01/1973"), title: "Sentenza Roe v. Wade della Corte Suprema USA sull'aborto", category: "politica", importance: 3 },
    { year: toNumber("19/04/1995"), title: "Attentato di Oklahoma City (grave attacco di terrorismo interno)", category: "politica", importance: 3 }
];

const missingScienceMilestones = [
    { year: 150, title: "L''Almagesto' di Claudio Tolomeo fissa il modello astronomico geocentrico per 14 secoli", category: "scienza", importance: 2 },
    { year: toNumber("14/07/1811"), title: "Amedeo Avogadro formula l'omonima legge distinguendo atomi e molecole", category: "scienza", importance: 2 },
    { year: toNumber("13/07/1830"), title: "Pubblicazione del primo volume dei 'Principi di geologia' (Charles Lyell fonda la geologia moderna)", category: "scienza", importance: 3 },
    { year: 1839, title: "Schwann pubblica le 'Ricerche microscopiche': formalizzazione definitiva della Teoria Cellulare", category: "scienza", importance: 1 },
    { year: toNumber("21/08/1843"), title: "James Prescott Joule pubblica 'Sul valore meccanico del calore' (Primo Principio della Termodinamica)", category: "scienza", importance: 2 },
    { year: toNumber("21/09/1867"), title: "Joseph Lister pubblica 'Sul principio antisettico nella pratica chirurgica' sulla rivista The Lancet", category: "scienza", importance: 2 },
    { year: toNumber("14/11/1901"), title: "'Sui fenomeni di agglutinazione del sangue umano normale' (Landsteiner, scoperta dei gruppi sanguigni)", category: "scienza", importance: 1 },
    { year: toNumber("03/07/1909"), title: "Fritz Haber brevetta il processo di sintesi dell'ammoniaca (base per la produzione industriale di fertilizzanti)", category: "tecnologia", importance: 2 },
    { year: toNumber("24/02/1968"), title: "Pubblicazione su Nature di 'Osservazione di una sorgente radio a pulsazione rapida' (scoperta delle Pulsar)", category: "scienza", importance: 3 },
    { year: 1847, title: "Ignaz Semmelweis scopre il lavaggio delle mani con cloruro di calce a Vienna come rimedio per abbattere la febbre puerperale, la teoria viene rifiutata dalla comunità medica per 20 anni", category: "scienza", importance: 3 },
    { year: 1878, title: "Louis Pasteur formula la teoria dei germi, dimostrando che i microrganismi sono responsabili delle malattie infettive", category: "scienza", importance: 3 }

];

const missingModernHistoryEvents = [
    // Istituzioni, Finanza e Assolutismo
    { year: toNumber("06/05/1682"), title: "Luigi XIV trasferisce la corte a Versailles (apogeo dell'Assolutismo)", category: "politica", importance: 3 },
    { year: toNumber("16/12/1689"), title: "Approvazione del Bill of Rights in Inghilterra (nascita della monarchia costituzionale)", category: "politica", importance: 2 },
    { year: toNumber("27/07/1694"), title: "Fondazione della Banca d'Inghilterra (nascita della finanza e del debito pubblico moderni)", category: "politica", importance: 3 },

    // Geopolitica del Settecento e Assolutismo Illuminato
    { year: toNumber("19/04/1713"), title: "Prammatica Sanzione di Carlo VI d'Asburgo (garantisce la successione femminile a Maria Teresa)", category: "politica", importance: 3 },
    { year: 1733, title: "Inizio della Guerra di Successione Polacca", category: "politica", importance: 4 },
    { year: toNumber("13/10/1781"), title: "Patente di Tolleranza di Giuseppe II d'Asburgo (libertà di culto per le minoranze)", category: "politica", importance: 3 },

    // Diritti Sociali
    { year: toNumber("05/09/1791"), title: "Pubblicazione della 'Dichiarazione dei diritti della donna e della cittadina' di Olympe de Gouges", category: "cultura", importance: 3 },

    // Il culmine e declino dell'Età Napoleonica
    { year: toNumber("21/10/1805"), title: "Battaglia di Trafalgar (Nelson sconfigge la flotta franco-spagnola)", category: "politica", importance: 2 },
    { year: toNumber("02/12/1805"), title: "Battaglia di Austerlitz (il capolavoro tattico di Napoleone contro la Terza Coalizione)", category: "politica", importance: 2 },
    { year: toNumber("24/06/1812"), title: "Inizio della Campagna di Russia (inizio del declino napoleonico)", category: "politica", importance: 2 },
    { year: toNumber("16/10/1813"), title: "Battaglia di Lipsia o 'delle Nazioni' (pesante sconfitta per Napoleone)", category: "politica", importance: 2 }
];


const missingPrehistoryEvents = [
    { year: -4400000, title: "Comparsa di Ardipithecus ramidus (fossile 'Ardi', prime evidenze di bipedismo)", category: "scienza", importance: 2 },
    { year: -190000, title: "Comparsa di Homo floresiensis (l''Hobbit' di Flores) in Indonesia", category: "scienza", importance: 3 },
    { year: -20000, title: "Prima produzione di ceramica da parte dei cacciatori-raccoglitori in Cina (Xianrendong)", category: "tecnologia", importance: 2 },
    { year: -10000, title: "Primi segni di addomesticamento di pecore e capre nella Mezzaluna Fertile", category: "tecnologia", importance: 2 },
    { year: -8500, title: "Addomesticamento di bovini e suini", category: "tecnologia", importance: 2 },
    { year: -4500, title: "Necropoli di Varna (Bulgaria): il più antico oro lavorato al mondo (prime prove di forte disuguaglianza sociale)", category: "tecnologia", importance: 3 },
    { year: -6250, title: "Evento climatico 8.2 ka BP: improvviso raffreddamento globale durato 150 anni", category: "scienza", importance: 2 },
    { year: -5600, title: "Inizio della desertificazione del Sahara", category: "scienza", importance: 2 },
    { year: -4500, title: "Formazione del proto-indoeuropeo, lingua madre delle lingue indoeuropee", category: "scienza", importance: 2 },
    { year: -3400000, title: "Sito di Dikika: prime evidenze indirette di consumo di carne e macellazione da parte degli australopitechi", category: "scienza", importance: 2 },
    { year: -2800000, title: "Fossile di Ledi-Geraru (Etiopia): la più antica testimonianza ossea mai ritrovata del genere Homo", category: "scienza", importance: 1 },
    { year: -2500000, title: "Coesistenza di specie: compare l'Homo rudolfensis contemporaneamente all'Homo habilis", category: "scienza", importance: 2 },
    { year: -15000, title: "Creazione delle pitture rupestri nella Grotta di Lascaux in Francia, apice dell'arte paleolitica europea", category: "cultura", importance: 3 },
    { year: -10000, title: "Diffusione dell'arco e della freccia in Eurasia, rivoluzione della caccia dopo la fine dell'era glaciale", category: "tecnologia", importance: 3 },
    { year: -6000, title: "Primi manufatti in rame nativo martellato a freddo nel Vicino Oriente", category: "tecnologia", importance: 3 },


];

const missingEastAsianEvents = [
    { year: toNumber("05/08/1392"), title: "Fondazione della Dinastia Joseon in Corea", category: "politica", importance: 3 },
    { year: 1443, title: "Creazione dell'alfabeto Hangul (Re Sejong il Grande)", category: "cultura", importance: 3 },
    { year: toNumber("05/03/1467"), title: "Inizio della Guerra Ōnin (inizio del periodo Sengoku in Giappone)", category: "politica", importance: 3 },
    { year: toNumber("25/07/1894"), title: "Inizio della Prima Guerra Sino-Giapponese", category: "politica", importance: 3 },
    { year: toNumber("22/08/1910"), title: "Annessione della Corea all'Impero Giapponese", category: "politica", importance: 3 },
    { year: toNumber("12/04/1927"), title: "Guerra Civile Cinese tra Nazionalisti (Chiang Kai-shek) e Comunisti (Mao Zedong)", category: "politica", importance: 2 },
    { year: toNumber("03/05/1947"), title: "Entrata in vigore della Costituzione pacifista del Giappone", category: "politica", importance: 3 },
    { year: toNumber("07/10/1950"), title: "Intervento dell'Esercito Popolare di Liberazione cinese in Tibet", category: "politica", importance: 3 },
    { year: toNumber("27/07/1953"), title: "Armistizio di Panmunjom (fine dei combattimenti della Guerra di Corea)", category: "politica", importance: 2 },
    { year: toNumber("08/08/2008"), title: "Olimpiadi di Pechino (consacrazione della Cina come superpotenza globale)", category: "cultura", importance: 3 }
];


const africanHistoryEvents = [
    { year: -727, title: "Piye, re di Kush, conquista l'Egitto fondando la XXV dinastia egizia (Faraoni Neri)", category: "politica", importance: 3 },
    { year: 900, title: "Apogeo del Regno di Ghana (Wagadou), primo grande impero commerciale dell'Africa Occidentale", category: "politica", importance: 3 },
    { year: 1200, title: "Fioritura delle città-stato Swahili sulla costa dell'Africa Orientale (es. Kilwa, Mombasa)", category: "cultura", importance: 3 },
    { year: toNumber("13/03/1591"), title: "Battaglia di Tondibi: l'esercito marocchino sconfigge l'Impero Songhai (fine dell'ultimo grande impero pre-coloniale dell'Africa Occidentale)", category: "politica", importance: 3 },
    { year: toNumber("21/02/1804"), title: "Inizio della Jihad Fulani di Usman dan Fodio e nascita del Califfato di Sokoto", category: "politica", importance: 3 },
    { year: toNumber("26/01/1885"), title: "Caduta di Khartum: la ribellione mahdista in Sudan sconfigge le forze anglo-egiziane", category: "politica", importance: 3 },
    { year: toNumber("01/07/1885"), title: "Istituzione dello Stato Libero del Congo (dominio personale e brutale sfruttamento di Leopoldo II del Belgio)", category: "politica", importance: 2 },
    { year: toNumber("01/03/1896"), title: "Battaglia di Adua: l'Impero Etiope di Menelik II sconfigge l'esercito italiano", category: "politica", importance: 3 },
    { year: toNumber("12/01/1904"), title: "Inizio della rivolta e del successivo Genocidio degli Herero e dei Nama ad opera delle truppe coloniali tedesche", category: "politica", importance: 3 },
    { year: toNumber("20/10/1952"), title: "Inizio della Rivolta dei Mau Mau in Kenya contro il dominio coloniale britannico", category: "politica", importance: 3 },
    { year: toNumber("25/05/1963"), title: "Fondazione dell'Organizzazione dell'Unità Africana (OUA) ad Addis Abeba", category: "politica", importance: 3 },
    { year: toNumber("06/07/1967"), title: "Inizio della Guerra civile nigeriana (Guerra del Biafra)", category: "politica", importance: 3 },
    { year: toNumber("12/09/1974"), title: "Caduta dell'Impero Etiope: la giunta militare del Derg depone l'imperatore Haile Selassie", category: "politica", importance: 3 }
];

const centralAmericanHistoryEvents = [
    { year: 900, title: "Collasso Classico dei Maya (declino e abbandono delle grandi città delle pianure)", category: "cultura", importance: 3 },
    { year: toNumber("01/07/1823"), title: "Nascita della Repubblica Federale del Centro America", category: "politica", importance: 3 },
    { year: toNumber("11/04/1856"), title: "Guerra contro il filibustiere William Walker in Nicaragua", category: "politica", importance: 4 },
    { year: toNumber("07/09/1977"), title: "Firma dei Trattati Torrijos-Carter (restituzione del Canale di Panama)", category: "politica", importance: 3 },
    { year: toNumber("19/07/1979"), title: "Vittoria della Rivoluzione Sandinista in Nicaragua (caduta di Somoza)", category: "politica", importance: 3 },
    { year: toNumber("15/10/1979"), title: "Inizio della guerra civile in El Salvador", category: "politica", importance: 3 },
    { year: toNumber("07/08/1987"), title: "Accordi di pace di Esquipulas (fine dei conflitti civili centroamericani)", category: "politica", importance: 3 },
    { year: toNumber("20/12/1989"), title: "Invasione statunitense di Panama (Operazione Just Cause contro Noriega)", category: "politica", importance: 3 }
];

const missingEuropeanEvents = [
    // Età Moderna
    { year: toNumber("16/12/1653"), title: "Oliver Cromwell diventa Lord Protettore (inizio del Protettorato, unico periodo repubblicano britannico)", category: "politica", importance: 3 },
    
    // Primo Novecento e periodo tra le due guerre
    { year: toNumber("30/12/1922"), title: "Trattato di fondazione dell'URSS: Russia, Ucraina, Bielorussia e Transcaucasia si uniscono in un unico Stato", category: "politica", importance: 1 },
    
    // Seconda Guerra Mondiale
    { year: toNumber("20/01/1942"), title: "Conferenza di Wannsee, pianificazione della 'Soluzione Finale' e della Shoah", category: "politica", importance: 2 },
    { year: toNumber("02/02/1943"), title: "Fine della Battaglia di Stalingrado, svolta decisiva della Seconda Guerra Mondiale in Europa", category: "politica", importance: 3 },
    { year: toNumber("06/06/1944"), title: "Sbarco in Normandia (D-Day) e inizio della liberazione dell'Europa occidentale", category: "politica", importance: 2 },
    
    // Guerra Fredda e Storia Recente
    { year: toNumber("20/08/1968"), title: "Primavera di Praga (invasione del Patto di Varsavia per stroncare le riforme in Cecoslovacchia)", category: "politica", importance: 3 },
    { year: toNumber("10/04/1998"), title: "Accordo del Venerdì Santo (Good Friday Agreement, fine dei 'Troubles' in Irlanda del Nord)", category: "politica", importance: 3 }
];

const scientificEnlightenmentGaps = [
    // Rivoluzione Scientifica
    { year: toNumber("17/05/1619"), title: "Keplero pubblica 'Harmonices Mundi' (contenente la Terza legge del moto planetario)", category: "scienza", importance: 2 },
    { year: 1620, title: "Francis Bacon pubblica 'Novum Organum' (fondamentale per il metodo scientifico induttivo)", category: "scienza", importance: 2 },
    { year: 1661, title: "Robert Boyle pubblica 'The Sceptical Chymist' (transizione dall'alchimia alla chimica moderna)", category: "scienza", importance: 2 },
    { year: toNumber("22/12/1666"), title: "Fondazione dell'Académie des Sciences a Parigi sotto Luigi XIV", category: "scienza", importance: 3 },

    // Illuminismo
    { year: 1725, title: "Giambattista Vico pubblica la prima edizione della 'Scienza Nuova'", category: "cultura", importance: 3 },
    { year: 1748, title: "Montesquieu pubblica 'Lo spirito delle leggi' (definizione della separazione dei poteri)", category: "cultura", importance: 2 },
    { year: 1791, title: "Luigi Galvani pubblica 'De viribus electricitatis in motu musculari' (elettricità animale)", category: "scienza", importance: 3 }
];

const russianRevolutionEvents = [
    { year: toNumber("08/03/1917"), title: "Rivoluzione di Febbraio: caduta dello Zar Nicola II e fine della dinastia Romanov", category: "politica", importance: 2 },
    { year: toNumber("16/04/1917"), title: "Ritorno di Lenin a Pietrogrado e pubblicazione delle 'Tesi di Aprile'", category: "politica", importance: 3 },
    { year: toNumber("07/11/1917"), title: "Rivoluzione d'Ottobre: i Bolscevichi prendono il Palazzo d'Inverno", category: "politica", importance: 1 },
    { year: toNumber("03/03/1918"), title: "Trattato di Brest-Litovsk: la Russia esce dalla Grande Guerra", category: "politica", importance: 2 },
    { year: toNumber("17/07/1918"), title: "Esecuzione della famiglia Romanov a Ekaterinburg", category: "politica", importance: 3 }
];


const ukHistoryEvents = [
    { year: toNumber("23/04/871"), title: "Alfredo il Grande sale al trono del Wessex (fondatore dell'Inghilterra moderna)", category: "politica", importance: 2 },
    { year: toNumber("19/03/1284"), title: "Statuto di Rhuddlan: l'Inghilterra formalizza il controllo sul Galles", category: "politica", importance: 3 },
    { year: toNumber("24/06/1314"), title: "Battaglia di Bannockburn: Robert Bruce sconfigge gli inglesi (indipendenza scozzese)", category: "politica", importance: 2 },
    { year: toNumber("05/11/1605"), title: "Arresto di Guy Fawkes e fallimento della Congiura delle Polveri (Gunpowder Plot) a Londra", category: "politica", importance: 3 },
    { year: toNumber("01/01/1801"), title: "Atto di Unione: nascita del Regno Unito di Gran Bretagna e Irlanda", category: "politica", importance: 1 },
    { year: toNumber("20/06/1837"), title: "Ascesa al trono della Regina Vittoria (inizio dell'Età Vittoriana)", category: "politica", importance: 2 },
    { year: toNumber("06/02/1918"), title: "Diritto di voto alle donne nel Regno Unito", category: "politica", importance: 3 },
    { year: toNumber("10/05/1940"), title: "Winston Churchill diventa Primo Ministro e inizia la Battaglia d'Inghilterra", category: "politica", importance: 1 },
    { year: toNumber("05/07/1948"), title: "Fondazione del National Health Service (NHS): nasce il welfare state britannico", category: "politica", importance: 2 },
    { year: toNumber("12/03/1984"), title: "Inizio del grande sciopero dei minatori britannici contro il governo Thatcher", category: "politica", importance: 3 },
    { year: toNumber("31/08/1997"), title: "Morte della principessa Diana in un incidente stradale a Parigi", category: "cultura", importance: 3 },
    { year: toNumber("04/07/2012"), title: "Scoperta del Bosone di Higgs al CERN", category: "scienza", importance: 1 },
    { year: toNumber("23/06/2016"), title: "Referendum sulla Brexit: vittoria del Leave", category: "politica", importance: 2 },
    { year: toNumber("08/09/2022"), title: "Morte di Elisabetta II e proclamazione Carlo III come re del Regno Unito", category: "politica", importance: 2 }
];


const missing1830sEvents = [
    { year: toNumber("03/02/1830"), title: "Indipendenza della Grecia (riconosciuta formalmente)", category: "politica", importance: 3 },
    { year: toNumber("06/04/1830"), title: "Pubblicazione del Libro di Mormon e fondazione del movimento mormone", category: "cultura", importance: 4 },
    { year: toNumber("27/07/1830"), title: "Rivoluzione di Luglio in Francia: Carlo X viene deposto, sale Luigi Filippo", category: "politica", importance: 2 },
    { year: toNumber("04/10/1830"), title: "Dichiarazione d'indipendenza del Belgio dal Regno dei Paesi Bassi", category: "politica", importance: 3 },
    { year: toNumber("08/11/1830"), title: "Ferdinando II diventa Re delle Due Sicilie", category: "politica", importance: 4 },
    { year: toNumber("05/12/1830"), title: "Prima esecuzione della Symphonie fantastique di Hector Berlioz", category: "cultura", importance: 4 },
    { year: toNumber("16/03/1831"), title: "Pubblicazione di 'Notre-Dame de Paris' di Victor Hugo", category: "cultura", importance: 4 },
    { year: toNumber("27/04/1831"), title: "Carlo Alberto diventa Re di Sardegna", category: "politica", importance: 4 },
    { year: toNumber("07/06/1832"), title: "Approvazione del Reform Act in Gran Bretagna (estensione del suffragio)", category: "politica", importance: 3 },
    { year: toNumber("30/12/1833"), title: "Joseph Plateau inventa il fenachistoscopio (precursore del cinema)", category: "tecnologia", importance: 4 },
    { year: toNumber("03/02/1834"), title: "Fallimento della sommossa mazziniana in Piemonte (prima azione di Garibaldi)", category: "politica", importance: 4 },
    { year: toNumber("02/03/1836"), title: "Il Texas dichiara l'indipendenza dal Messico (Battaglia di Alamo)", category: "politica", importance: 3 },
    { year: toNumber("25/02/1836"), title: "Samuel Colt ottiene il brevetto per la rivoltella (revolver)", category: "tecnologia", importance: 3 },
    { year: toNumber("28/06/1838"), title: "Solenne cerimonia di incoronazione della Regina Vittoria del Regno Unito all'Abbazia di Westminster", category: "politica", importance: 2 },
    { year: toNumber("21/08/1838"), title: "Friedrich Bessel misura per la prima volta la distanza di una stella (61 Cygni)", category: "scienza", importance: 3 },
    { year: toNumber("23/03/1839"), title: "Primo uso documentato del termine 'OK' (oll korrect) a Boston", category: "cultura", importance: 5 },
    { year: toNumber("03/10/1839"), title: "Inaugurazione della ferrovia Napoli-Portici (prima linea in Italia)", category: "tecnologia", importance: 3 },
    { year: toNumber("17/11/1839"), title: "Prima dell'Oberto, opera d'esordio di Giuseppe Verdi, alla Scala di Milano", category: "cultura", importance: 4 }
];


const missingMid19thCenturyEvents = [
    { year: 1845, title: "Inizio della Grande Carestia in Irlanda (Irish Potato Famine)", category: "politica", importance: 3 },
    { year: toNumber("29/12/1845"), title: "Annessione del Texas agli Stati Uniti", category: "politica", importance: 3 },
    { year: toNumber("23/01/1849"), title: "Elizabeth Blackwell è la prima donna a laurearsi in medicina negli USA", category: "scienza", importance: 4 },
    { year: toNumber("07/09/1854"), title: "John Snow identifica la fonte del colera a Londra (nascita dell'epidemiologia moderna)", category: "scienza", importance: 3 },
    { year: 1856, title: "Scoperta dei primi fossili di Uomo di Neanderthal nella valle di Neander, Germania", category: "scienza", importance: 3 },
    { year: toNumber("26/06/1858"), title: "Trattato di Tientsin: fine della prima fase della Seconda Guerra dell'Oppio", category: "politica", importance: 4 },
    { year: toNumber("01/07/1863"), title: "Inizio della Battaglia di Gettysburg: punto di svolta della Guerra Civile Americana", category: "politica", importance: 3 },
    { year: toNumber("22/08/1864"), title: "Firma della Prima Convenzione di Ginevra (nascita del diritto internazionale umanitario)", category: "politica", importance: 3 },
    { year: toNumber("08/02/1867"), title: "Compromesso austro-ungarico (Ausgleich): nasce l'Impero Austro-Ungarico", category: "politica", importance: 3 },
    { year: toNumber("01/07/1867"), title: "Nascita del Dominion del Canada (British North America Act)", category: "politica", importance: 3 }
];

const mid20thCenturyEvents = [
    { year: toNumber("11/12/1931"), title: "Statuto di Westminster: indipendenza legislativa dei Dominion britannici", category: "politica", importance: 3 },
    { year: 1932, title: "Stalin induce una grave carestia (Holodomor) in Ucraina requisendo cibo, sigillando i confini ed esportando il grano per finanziare l'industria sovietica", category: "politica", importance: 2 },
    { year: 1934, title: "Dust Bowl: tempeste di sabbia devastano le Grandi Pianure americane", category: "scienza", importance: 2 },
    { year: 1936, title: "Inge Lehmann scopre che la Terra ha un nucleo interno solido", category: "scienza", importance: 3 },
    { year: toNumber("06/05/1937"), title: "Disastro del dirigibile Hindenburg: fine dell'era dei dirigibili", category: "tecnologia", importance: 3 },
    { year: toNumber("12/03/1938"), title: "Anschluss: la Germania nazista annette l'Austria", category: "politica", importance: 3 },
    { year: toNumber("18/04/1938"), title: "Debutto di Superman in Action Comics #1", category: "cultura", importance: 3 },
    { year: toNumber("22/06/1941"), title: "Operazione Barbarossa: la Germania invade l'Unione Sovietica", category: "politica", importance: 2 },
    { year: toNumber("04/06/1942"), title: "Inizio della Battaglia di Midway: svolta decisiva nella guerra del Pacifico", category: "politica", importance: 3 },
    { year: toNumber("23/10/1942"), title: "Inizio della Seconda Battaglia di El Alamein: le forze alleate fermano l'avanzata dell'Asse in Africa", category: "politica", importance: 2 },
    { year: toNumber("19/04/1943"), title: "Rivolta del Ghetto di Varsavia contro l'occupazione nazista", category: "politica", importance: 2 },
    { year: toNumber("06/04/1943"), title: "Pubblicazione de 'Il Piccolo Principe' di Antoine de Saint-Exupéry", category: "cultura", importance: 3 },
    { year: 1946, title: "Willard Libby sviluppa la datazione al radiocarbonio (C-14)", category: "scienza", importance: 2 },
    { year: toNumber("14/10/1947"), title: "Chuck Yeager supera per la prima volta il muro del suono sul Bell X-1", category: "tecnologia", importance: 2 },
    { year: toNumber("13/05/1950"), title: "Inaugurazione del primo campionato mondiale di Formula 1 a Silverstone", category: "cultura", importance: 4 },
    { year: toNumber("02/10/1950"), title: "Debutto della striscia a fumetti 'Peanuts' di Charles M. Schulz", category: "cultura", importance: 3 },
    { year: toNumber("05/03/1953"), title: "Morte di Stalin e inizio del processo di destalinizzazione in URSS", category: "politica", importance: 2 },
    { year: toNumber("01/12/1955"), title: "Rosa Parks rifiuta di cedere il posto: inizia il boicottaggio dei bus a Montgomery", category: "politica", importance: 2 },
    { year: toNumber("29/07/1958"), title: "Fondazione della NASA negli Stati Uniti", category: "scienza", importance: 2 },
    { year: toNumber("03/02/1959"), title: "'The Day the Music Died': incidente aereo di Buddy Holly e Ritchie Valens", category: "cultura", importance: 4 },
    { year: 1959, title: "Invenzione del MOSFET (transistor MOS) ai Bell Labs", category: "tecnologia", importance: 1 }
];


const missingDecadesEvents = [
    // 1960s
    { year: toNumber("23/01/1960"), title: "Il batiscafo Trieste raggiunge il fondo della Fossa delle Marianne", category: "scienza", importance: 2 },
    { year: toNumber("17/04/1961"), title: "Invasione della Baia dei Porci a Cuba, tentativo fallito di rovesciare il governo di Fidel Castro", category: "politica", importance: 2 },
    { year: toNumber("10/07/1962"), title: "Lancio di Telstar 1, il primo satellite per comunicazioni attive", category: "tecnologia", importance: 2 },
    { year: toNumber("16/06/1963"), title: "Valentina Tereshkova è la prima donna nello spazio (Vostok 6)", category: "scienza", importance: 2 },
    { year: toNumber("07/08/1964"), title: "Risoluzione del Golfo del Tonchino: escalation del coinvolgimento USA in Vietnam", category: "politica", importance: 2 },
    { year: toNumber("27/01/1967"), title: "Firma del Trattato sullo spazio extra-atmosferico", category: "politica", importance: 3 },
    
    // 1970s
    { year: toNumber("22/04/1970"), title: "Istituzione del primo Giorno della Terra (Earth Day)", category: "cultura", importance: 3 },
    { year: toNumber("04/05/1970"), title: "Sparatoria della Kent State University durante le proteste anti-Vietnam", category: "politica", importance: 3 },
    { year: toNumber("05/09/1972"), title: "Massacro di Monaco: attacco terroristico alle Olimpiadi", category: "politica", importance: 2 },
    { year: toNumber("30/04/1975"), title: "Caduta di Saigon e fine della Guerra del Vietnam", category: "politica", importance: 1 },
    { year: toNumber("09/09/1976"), title: "Morte di Mao Zedong in Cina", category: "politica", importance: 1 },
    
    // 1980s
    { year: toNumber("18/05/1980"), title: "Eruzione catastrofica del vulcano Mount St. Helens negli USA", category: "scienza", importance: 2 },
    { year: toNumber("08/12/1980"), title: "Assassinio di John Lennon a New York", category: "cultura", importance: 2 },
    { year: toNumber("11/03/1985"), title: "Mikhail Gorbachev diventa Segretario Generale del PCUS", category: "politica", importance: 1 },
    { year: toNumber("30/03/1981"), title: "Attentato a Ronald Reagan a Washington", category: "politica", importance: 3 },
    { year: toNumber("03/12/1984"), title: "Disastro di Bhopal: fuga di gas tossico in India", category: "scienza", importance: 2 },
    { year: toNumber("16/05/1985"), title: "Pubblicazione della scoperta del buco nell'ozono sopra l'Antartide", category: "scienza", importance: 2 },
    { year: toNumber("19/10/1987"), title: "Lunedì Nero: crollo delle borse mondiali", category: "politica", importance: 2 },
    { year: toNumber("21/12/1988"), title: "Attentato al volo Pan Am 103 sopra Lockerbie", category: "politica", importance: 2 },
    
    // 1990s
    { year: toNumber("06/05/1994"), title: "Inaugurazione dell'Eurotunnel sotto il Canale della Manica", category: "tecnologia", importance: 2 },
    { year: toNumber("04/11/1995"), title: "Assassinio del primo ministro israeliano Yitzhak Rabin", category: "politica", importance: 2 },
    { year: toNumber("04/07/1997"), title: "Il rover Mars Pathfinder atterra con successo su Marte", category: "scienza", importance: 2 },
    { year: toNumber("05/09/1997"), title: "Morte di Madre Teresa di Calcutta", category: "cultura", importance: 2 }
];

const mid18thCenturyWikiEvents = [
    { year: toNumber("03/04/1721"), title: "Robert Walpole diventa il primo 'Primo Ministro' della Gran Bretagna", category: "politica", importance: 3 },
    { year: toNumber("02/11/1721"), title: "Pietro il Grande viene proclamato Imperatore (nascita dell'Impero Russo)", category: "politica", importance: 2 },
    { year: toNumber("05/04/1722"), title: "L'ammiraglio olandese Jacob Roggeveen sbarca sull'Isola di Pasqua", category: "politica", importance: 3 },
    { year: toNumber("08/02/1725"), title: "Caterina I diventa la prima Imperatrice regnante di Russia", category: "politica", importance: 3 },
    { year: toNumber("22/06/1727"), title: "Giorgio II sale al trono di Gran Bretagna", category: "politica", importance: 3 },
    { year: toNumber("26/02/1730"), title: "Inizio del regno dell'imperatrice Anna di Russia", category: "politica", importance: 3 },
    { year: toNumber("12/02/1733"), title: "Fondazione di Savannah e della colonia della Georgia", category: "politica", importance: 3 },
    { year: toNumber("04/08/1735"), title: "Assoluzione di John Peter Zenger (pietra miliare per la libertà di stampa)", category: "politica", importance: 3 },
    { year: toNumber("18/10/1735"), title: "Inizio del regno dell'imperatore Qianlong in Cina", category: "politica", importance: 2 },
    { year: toNumber("23/10/1739"), title: "Inizio della Guerra dell'orecchio di Jenkins (Gran Bretagna vs Spagna)", category: "politica", importance: 3 },
    { year: toNumber("31/05/1740"), title: "Federico il Grande diventa Re di Prussia", category: "politica", importance: 3 },
    { year: toNumber("20/10/1740"), title: "Maria Teresa d'Austria eredita i domini asburgici (Prammatica Sanzione)", category: "politica", importance: 2 },
    { year: toNumber("13/04/1742"), title: "Prima esecuzione del Messia di Handel a Dublino", category: "cultura", importance: 3 },
    { year: toNumber("19/08/1745"), title: "Inizio della Seconda rivolta giacobita ('Bonnie Prince Charlie')", category: "politica", importance: 3 },
    { year: toNumber("16/04/1746"), title: "Battaglia di Culloden (fine delle speranze giacobite in Gran Bretagna)", category: "politica", importance: 3 },
    { year: 1747, title: "Elezione di Ahmad Shah Durrani, fondazione dell'Impero Durrani (Afghanistan)", category: "politica", importance: 3 },
    { year: toNumber("14/09/1752"), title: "L'Impero Britannico adotta il calendario gregoriano", category: "tecnologia", importance: 3 },
    { year: toNumber("25/01/1755"), title: "Fondazione dell'Università di Mosca", category: "cultura", importance: 3 },
    { year: toNumber("10/08/1755"), title: "Inizio dell'espulsione degli Acadiani dal Canada francese", category: "politica", importance: 3 },
    { year: toNumber("02/01/1757"), title: "Robert Clive cattura Calcutta per la Compagnia delle Indie", category: "politica", importance: 2 },
    { year: toNumber("15/01/1759"), title: "Apertura al pubblico del British Museum a Londra", category: "cultura", importance: 3 },
    { year: toNumber("13/09/1759"), title: "Battaglia della Piana di Abramo (caduta di Quebec in mano britannica)", category: "politica", importance: 2 }
];

const early18thCenturyWikiEvents = [
    { year: toNumber("27/01/1700"), title: "Terremoto di Cascadia (magnitudo 9.0), colpisce il Pacifico nord-occidentale", category: "scienza", importance: 3 },
    { year: 1701, title: "Jethro Tull inventa la seminatrice meccanica, accelerando la Rivoluzione Agricola", category: "tecnologia", importance: 2 },
    { year: toNumber("08/03/1702"), title: "Salita al trono della Regina Anna di Gran Bretagna", category: "politica", importance: 2 },
    { year: toNumber("11/03/1702"), title: "Fondazione di 'The Daily Courant', primo quotidiano regolare in inglese", category: "cultura", importance: 3 },
    { year: toNumber("27/11/1703"), title: "La 'Grande Tempesta' del 1703 devasta l'Inghilterra meridionale", category: "scienza", importance: 3 },
    { year: toNumber("04/08/1704"), title: "Forze anglo-olandesi catturano la Rocca di Gibilterra", category: "politica", importance: 2 },
    { year: toNumber("13/08/1704"), title: "Battaglia di Blenheim: vittoria decisiva dell'Alleanza contro la Francia", category: "politica", importance: 2 },
    { year: 1704, title: "Isaac Newton pubblica 'Opticks', definendo le basi dell'ottica moderna", category: "scienza", importance: 1 },
    { year: toNumber("03/03/1707"), title: "Morte dell'imperatore Aurangzeb e inizio del declino dell'Impero Moghul", category: "politica", importance: 2 },
    { year: toNumber("28/10/1707"), title: "Terremoto di Hoei in Giappone e ultima eruzione del Monte Fuji", category: "scienza", importance: 3 },
    { year: 1709, title: "Il 'Grande Gelo': l'inverno più freddo degli ultimi 500 anni in Europa", category: "scienza", importance: 3 },
    { year: toNumber("08/07/1709"), title: "Battaglia di Poltava: la Russia di Pietro il Grande sconfigge definitivamente la Svezia", category: "politica", importance: 2 },
    { year: 1709, title: "Riscoperta accidentale degli scavi di Ercolano, sepolta dal Vesuvio", category: "cultura", importance: 3 },
    { year: toNumber("10/04/1710"), title: "Entra in vigore lo 'Statute of Anne', la prima legge moderna sul copyright", category: "cultura", importance: 2 },
    { year: toNumber("01/08/1714"), title: "Morte della Regina Anna e ascesa di Giorgio I (inizio della Dinastia Hannover)", category: "politica", importance: 2 },
    { year: toNumber("01/09/1715"), title: "Morte di Luigi XIV, il 'Re Sole', dopo il regno più lungo della storia europea", category: "politica", importance: 1 },
    { year: toNumber("24/06/1717"), title: "Fondazione della Gran Loggia d'Inghilterra, nascita della massoneria moderna", category: "cultura", importance: 3 },
    { year: toNumber("07/05/1718"), title: "Fondazione della città di New Orleans da parte dei francesi", category: "politica", importance: 3 },
    { year: toNumber("22/11/1718"), title: "Uccisione del pirata Barbanera durante una battaglia a Ocracoke Inlet", category: "cultura", importance: 3 },
    { year: toNumber("23/01/1719"), title: "Creazione del Principato del Liechtenstein all'interno del Sacro Romano Impero", category: "politica", importance: 3 }
];



// Uniamo gli array e li ordiniamo per anno

const late18thCenturyWikiEvents = [
    { year: toNumber("14/01/1761"), title: "Terza battaglia di Panipat: i Durrani sconfiggono i Maratha in India", category: "politica", importance: 3 },
    { year: toNumber("10/02/1763"), title: "Trattato di Parigi: fine della Guerra dei Sette Anni e trionfo coloniale britannico", category: "politica", importance: 2 },
    { year: toNumber("15/02/1763"), title: "Trattato di Hubertusburg: fine delle ostilità tra Prussia e Austria", category: "politica", importance: 3 },
    { year: toNumber("10/12/1768"), title: "Fondazione della Royal Academy of Arts a Londra", category: "cultura", importance: 4 },
    { year: toNumber("06/12/1768"), title: "Prima edizione dell'Encyclopædia Britannica", category: "cultura", importance: 3 },
    { year: toNumber("22/06/1772"), title: "Sentenza del caso Somersett: la schiavitù viene dichiarata incompatibile con la legge inglese", category: "politica", importance: 3 },
    { year: toNumber("21/07/1773"), title: "Papa Clemente XIV sopprime la Compagnia di Gesù (Gesuiti)", category: "cultura", importance: 3 },
    { year: toNumber("10/05/1774"), title: "Morte di Luigi XV e ascesa al trono di Luigi XVI di Francia", category: "politica", importance: 2 },
    { year: toNumber("04/09/1781"), title: "Fondazione di Los Angeles da parte di coloni spagnoli in California", category: "politica", importance: 3 },
    { year: toNumber("21/04/1782"), title: "Rama I fonda la città di Bangkok e diventa re del Siam (Thailandia)", category: "politica", importance: 3 },
    { year: toNumber("08/06/1783"), title: "Eruzione del vulcano Laki in Islanda: gravi CONSEQUENZE climatiche in Europa", category: "scienza", importance: 2 },
    { year: toNumber("01/01/1785"), title: "Fondazione del quotidiano britannico 'The Times'", category: "cultura", importance: 4 },
    { year: 1790, title: "Francia: l'Assemblea Costituente crea gli 83 dipartimenti originali", category: "politica", importance: 3 },
    { year: 1792, title: "Claude Joseph Rouget de Lisle compone 'La Marsigliese'", category: "cultura", importance: 3 },
    { year: toNumber("21/09/1792"), title: "Proclamazione della Prima Repubblica Francese e abolizione della monarchia", category: "politica", importance: 1 },
    { year: toNumber("13/07/1793"), title: "Assassinio di Jean-Paul Marat da parte di Charlotte Corday", category: "politica", importance: 3 },
    { year: toNumber("28/07/1794"), title: "Caduta ed esecuzione di Robespierre (Reazione termidoriana) e fine del Terrore in Francia", category: "politica", importance: 2 },
    { year: toNumber("24/10/1795"), title: "Terza spartizione della Polonia: lo stato polacco scompare dalle mappe europee", category: "politica", importance: 3 },
    { year: toNumber("10/05/1796"), title: "Battaglia di Lodi: vittoria di Napoleone che apre la conquista del Nord Italia", category: "politica", importance: 3 },
    { year: toNumber("21/07/1798"), title: "Battaglia delle Piramidi: Napoleone sconfigge i Mamelucchi durante la campagna d'Egitto", category: "politica", importance: 2 }
];


const late17thCenturyWikiEvents = [
    { year: toNumber("29/05/1660"), title: "Restaurazione inglese: Carlo II rientra a Londra e sale al trono", category: "politica", importance: 2 },
    { year: toNumber("05/02/1661"), title: "L'imperatore Kangxi succede all'imperatore Shunzhi in Cina", category: "politica", importance: 2 },
    { year: toNumber("19/05/1662"), title: "Approvazione dell'Atto di Uniformità in Inghilterra", category: "politica", importance: 3 },
    { year: toNumber("24/03/1663"), title: "Carlo II emette lo Statuto della Carolina in Nord America", category: "politica", importance: 3 },
    { year: toNumber("01/08/1664"), title: "Battaglia di San Gottardo e Pace di Vasvár tra Asburgo e Ottomani", category: "politica", importance: 3 },
    { year: toNumber("27/08/1664"), title: "Gli inglesi catturano Nuova Amsterdam, rinominandola New York", category: "politica", importance: 2 },
    { year: toNumber("12/04/1665"), title: "Inizio della Grande Peste di Londra", category: "scienza", importance: 2 },
    { year: toNumber("27/04/1667"), title: "John Milton pubblica il poema epico 'Paradiso Perduto'", category: "cultura", importance: 2 },
    { year: toNumber("24/05/1667"), title: "Inizio della Guerra di Devoluzione tra Francia e Spagna", category: "politica", importance: 3 },
    { year: toNumber("23/01/1668"), title: "Formazione della Triplice Alleanza contro l'espansionismo francese", category: "politica", importance: 3 },
    { year: toNumber("04/10/1669"), title: "Morte del celebre pittore olandese Rembrandt van Rijn", category: "cultura", importance: 3 },
    { year: toNumber("02/05/1670"), title: "Fondazione della Compagnia della Baia di Hudson", category: "politica", importance: 3 },
    { year: toNumber("01/06/1670"), title: "Trattato segreto di Dover tra Inghilterra e Francia", category: "politica", importance: 3 },
    { year: toNumber("17/03/1672"), title: "Inizio della Terza guerra anglo-olandese", category: "politica", importance: 3 },
    { year: toNumber("20/08/1672"), title: "Assassinio di Johan de Witt a L'Aia durante il 'Rampjaar'", category: "politica", importance: 3 },
    { year: toNumber("17/02/1673"), title: "Morte di Molière dopo la recita de 'Il malato immaginario'", category: "cultura", importance: 3 },
    { year: toNumber("21/06/1675"), title: "Inizio della ricostruzione della Cattedrale di San Paolo a Londra", category: "cultura", importance: 3 },
    { year: toNumber("22/06/1675"), title: "Fondazione dell'Osservatorio Reale di Greenwich", category: "scienza", importance: 3 },
    { year: 1678, title: "Pubblicazione de 'Il viaggio del pellegrino' di John Bunyan", category: "cultura", importance: 3 },
    { year: toNumber("04/03/1681"), title: "William Penn riceve lo statuto reale per la Pennsylvania", category: "politica", importance: 2 },
    { year: toNumber("07/05/1682"), title: "Pietro il Grande diventa co-Tsar di Russia", category: "politica", importance: 2 },
    { year: toNumber("06/02/1685"), title: "Giacomo II sale al trono d'Inghilterra e Scozia", category: "politica", importance: 2 },
    { year: toNumber("30/06/1688"), title: "Gloriosa Rivoluzione: invito a Guglielmo d'Orange di intervenire in Inghilterra", category: "politica", importance: 2 },
    { year: toNumber("13/02/1689"), title: "Guglielmo III e Maria II proclamati co-regnanti d'Inghilterra (Gloriosa Rivoluzione)", category: "politica", importance: 2 },
    { year: toNumber("13/02/1692"), title: "Massacro di Glencoe nelle Highlands scozzesi", category: "politica", importance: 3 },
    { year: toNumber("11/01/1693"), title: "Terremoto della Val di Noto: distruzione di Catania e della Sicilia orientale", category: "scienza", importance: 3 },
    { year: toNumber("29/03/1699"), title: "Guru Gobind Singh fonda il Khalsa, pilastro della religione Sikh", category: "cultura", importance: 3 }
];

const missingMid17thCenturyEvents = [
    
    // 1620s
    { year: toNumber("08/11/1620"), title: "Battaglia della Montagna Bianca: vittoria imperiale decisiva nella Guerra dei Trent'anni", category: "politica", importance: 2 },
    { year: toNumber("03/06/1621"), title: "Fondazione della Compagnia Olandese delle Indie Occidentali (WIC)", category: "politica", importance: 3 },
    { year: toNumber("13/08/1624"), title: "Il Cardinale Richelieu viene nominato Primo Ministro dal re Luigi XIII", category: "politica", importance: 2 },
    { year: toNumber("18/11/1626"), title: "Papa Urbano VIII consacra la nuova Basilica di San Pietro in Vaticano", category: "cultura", importance: 2 },
    { year: toNumber("06/03/1629"), title: "Ferdinando II emana l'Editto di Restituzione durante la Guerra dei Trent'anni", category: "politica", importance: 3 },

// 1630s
    { year: 1630, title: "Picco della 'Grande Peste' in Italia settentrionale (Peste manzoniana)", category: "scienza", importance: 2 },
    { year: toNumber("20/05/1631"), title: "Sacco di Magdeburgo: massacro e distruzione della città durante la Guerra dei Trent'anni", category: "politica", importance: 2 },
    { year: toNumber("17/09/1631"), title: "Battaglia di Breitenfeld: vittoria svedese che ribalta le sorti della Guerra dei Trent'anni", category: "politica", importance: 2 },
    { year: toNumber("16/11/1632"), title: "Battaglia di Lützen: vittoria svedese e morte del re Gustavo II Adolfo", category: "politica", importance: 2 },
    { year: toNumber("22/06/1633"), title: "Condanna di Galileo Galilei e sua abiura davanti all'Inquisizione romana", category: "scienza", importance: 1 },
    { year: toNumber("22/02/1635"), title: "Fondazione dell'Académie française tramite lettera patente di Luigi XIII", category: "cultura", importance: 3 },
    { year: toNumber("08/09/1636"), title: "Fondazione dell'Università di Harvard (New College) nel Massachusetts", category: "cultura", importance: 3 },
    { year: toNumber("08/06/1637"), title: "René Descartes pubblica il 'Discorso sul metodo' e i tre Saggi (Diottrica, Meteore e Geometria) in un unico volume", category: "cultura", importance: 2 },
    { year: toNumber("31/10/1639"), title: "Battaglia delle Dune: la flotta olandese annienta la flotta spagnola", category: "politica", importance: 3 },

    // 1640s
    { year: toNumber("04/12/1642"), title: "Morte di Richelieu; il Cardinale Mazzarino gli succede come primo ministro", category: "politica", importance: 2 },
    { year: 1642, title: "Rembrandt completa 'La ronda di notte', capolavoro del Secolo d'oro olandese", category: "cultura", importance: 3 },
    { year: toNumber("14/05/1643"), title: "Morte di Luigi XIII; Luigi XIV diventa Re di Francia", category: "politica", importance: 2 },
    { year: toNumber("19/05/1643"), title: "Battaglia di Rocroi: le forze francesi pongono fine alla supremazia dei tercios spagnoli", category: "politica", importance: 3 },
    { year: toNumber("07/07/1647"), title: "Inizio della rivolta di Masaniello a Napoli contro il peso fiscale spagnolo", category: "politica", importance: 4 },
    { year: toNumber("30/01/1648"), title: "Pace di Münster: la Spagna riconosce l'indipendenza delle Province Unite", category: "politica", importance: 3 },
// 1650s
    { year: toNumber("29/05/1652"), title: "Inizio della Prima guerra anglo-olandese con lo scontro di Goodwin Sands", category: "politica", importance: 3 },
    { year: toNumber("06/06/1654"), title: "Abdicazione della regina Cristina di Svezia e conversione al cattolicesimo", category: "politica", importance: 3 },
    { year: toNumber("25/03/1655"), title: "Christiaan Huygens scopre Titano, la luna più grande di Saturno", category: "scienza", importance: 3 },
    { year: toNumber("27/07/1656"), title: "Scomunica di Baruch Spinoza dalla comunità ebraica di Amsterdam per le sue tesi eretiche", category: "cultura", importance: 3 },
    { year: toNumber("02/03/1657"), title: "Grande incendio di Meireki a Edo: distruzione di gran parte della capitale giapponese", category: "cultura", importance: 3 },
    { year: toNumber("03/09/1658"), title: "Morte di Oliver Cromwell, Lord Protettore d'Inghilterra", category: "politica", importance: 3 },
    { year: toNumber("07/11/1659"), title: "Firma del Trattato dei Pirenei: fine della guerra franco-spagnola", category: "politica", importance: 3 }
];

const newEvents1600_1619 = [
    { year: toNumber("19/02/1600"), title: "Eruzione del vulcano Huaynaputina in Perù (la più grande registrata in Sud America)", category: "scienza", importance: 3 },
    { year: toNumber("06/10/1600"), title: "Prima dell'Euridice di Jacopo Peri a Firenze, la più antica opera lirica interamente sopravvissuta", category: "cultura", importance: 3 },
    { year: 1600, title: "William Gilbert pubblica 'De Magnete', fondando lo studio moderno del magnetismo terrestre", category: "scienza", importance: 2 },
    { year: toNumber("09/10/1604"), title: "Osservazione della Supernova di Keplero (SN 1604), l'ultima visibile a occhio nudo nella nostra galassia", category: "scienza", importance: 3 },
    { year: toNumber("27/10/1605"), title: "Morte di Akbar il Grande e ascesa di Jahangir nell'Impero Moghul", category: "politica", importance: 3 },
    { year: toNumber("02/10/1608"), title: "Hans Lippershey presenta il primo brevetto per un telescopio (cannocchiale)", category: "tecnologia", importance: 2 },
    { year: toNumber("09/04/1609"), title: "Firma della Tregua dei dodici anni tra Spagna e Province Unite (Olanda)", category: "politica", importance: 3 },
    { year: toNumber("14/05/1610"), title: "Assassinio di Enrico IV di Francia ad opera di François Ravaillac", category: "politica", importance: 3 },
    { year: toNumber("02/05/1611"), title: "Pubblicazione della Bibbia di Re Giacomo (King James Bible), pietra miliare linguistica e culturale", category: "cultura", importance: 3 },
    { year: toNumber("30/10/1611"), title: "Gustavo II Adolfo diventa Re di Svezia", category: "politica", importance: 3 },
    { year: 1614, title: "John Napier pubblica 'Mirifici Logarithmorum Canonis Descriptio', introducendo i logaritmi", category: "scienza", importance: 2 },
    { year: toNumber("05/03/1616"), title: "L'opera di Copernico viene messa nell'Indice dei libri proibiti dalla Chiesa Cattolica", category: "scienza", importance: 2 },
    { year: toNumber("03/07/1619"), title: "Prima convocazione della Virginia General Assembly, la prima assemblea legislativa rappresentativa nelle Americhe", category: "politica", importance: 3 }
];



// Eventi aggiunti da Wikipedia 1520-1559
const nuoviEventi1520_1550 = [
    { year: toNumber("07/06/1520"), title: "Campo del Drappo d'Oro (incontro diplomatico tra Enrico VIII e Francesco I)", category: "politica", importance: 4 },
    { year: toNumber("30/09/1520"), title: "Solimano il Magnifico diventa Sultano dell'Impero Ottomano", category: "politica", importance: 3 },
    { year: toNumber("08/11/1520"), title: "Bagno di sangue di Stoccolma (esecuzioni svedesi da parte dei Danesi)", category: "politica", importance: 4 },
    { year: toNumber("03/01/1521"), title: "Scomunica di Martin Lutero (bolla Decet Romanum Pontificem)", category: "cultura", importance: 3 },
    { year: toNumber("25/05/1521"), title: "Editto di Worms, Lutero bandito dal Sacro Romano Impero", category: "politica", importance: 3 },
    { year: toNumber("06/06/1523"), title: "Gustavo Vasa eletto Re di Svezia, fine dell'Unione di Kalmar", category: "politica", importance: 4 },
    { year: toNumber("25/06/1530"), title: "Confessione augustana, presentazione dei principi della fede luterana", category: "cultura", importance: 4 },
    { year: toNumber("27/02/1531"), title: "Formazione della Lega di Smalcalda (alleanza principi protestanti)", category: "politica", importance: 3 },
    { year: 1534, title: "Jacques Cartier esplora il Golfo di San Lorenzo (Canada)", category: "tecnologia", importance: 4 },
    { year: toNumber("03/02/1536"), title: "Fondazione di Buenos Aires da parte di Pedro de Mendoza", category: "politica", importance: 4 },
    { year: toNumber("06/08/1538"), title: "Fondazione di Bogotà in Colombia", category: "politica", importance: 4 },
    { year: toNumber("12/02/1541"), title: "Fondazione di Santiago del Cile da parte di Pedro de Valdivia", category: "politica", importance: 4 },
    { year: 1541, title: "Hernando de Soto scopre il fiume Mississippi", category: "tecnologia", importance: 4 },
    { year: toNumber("21/07/1542"), title: "Papa Paolo III istituisce l'Inquisizione Romana (Sant'Uffizio)", category: "cultura", importance: 3 },
    { year: 1545, title: "Scoperta delle enormi miniere d'argento di Potosí in Bolivia", category: "tecnologia", importance: 3 },
    { year: toNumber("24/04/1547"), title: "Battaglia di Mühlberg (vittoria di Carlo V sulla Lega di Smalcalda)", category: "politica", importance: 4 },
    { year: toNumber("19/07/1553"), title: "Maria I Tudor (Bloody Mary) sale al trono tentando la restaurazione cattolica", category: "politica", importance: 4 },
    { year: toNumber("25/01/1554"), title: "Fondazione di San Paolo in Brasile da parte dei Gesuiti", category: "politica", importance: 4 },
    { year: toNumber("23/01/1556"), title: "Terremoto dello Shaanxi in Cina (~830.000 morti, il più mortifero della storia)", category: "scienza", importance: 4 },
    { year: 1557, title: "I Portoghesi fondano il primo insediamento a Macao (primo avamposto europeo in Asia)", category: "politica", importance: 3 },
    { year: toNumber("07/01/1558"), title: "I Francesi riconquistano Calais (ultimo possedimento inglese sul continente)", category: "politica", importance: 4 }
];

const eventi_1500_1510 = [
    { year: toNumber("03/02/1509"), title: "Battaglia di Diu (vittoria portoghese e controllo dell'Oceano Indiano)", category: "politica", importance: 3 },
    { year: toNumber("21/04/1509"), title: "Enrico VIII diventa re d'Inghilterra", category: "politica", importance: 3 },
    { year: 1511, title: "Erasmo da Rotterdam pubblica l'Elogio della Follia", category: "cultura", importance: 3 },
    { year: toNumber("02/04/1513"), title: "Juan Ponce de León scopre la Florida", category: "scienza", importance: 3 },
    { year: toNumber("25/09/1513"), title: "Vasco Núñez de Balboa scopre l'Oceano Pacifico attraversando l'istmo di Panama", category: "scienza", importance: 2 },
    { year: toNumber("23/08/1514"), title: "Battaglia di Cialdiran (gli Ottomani sconfiggono i Safavidi)", category: "politica", importance: 3 },
    { year: toNumber("14/09/1515"), title: "Battaglia di Marignano (vittoria francese e neutralità svizzera)", category: "politica", importance: 3 },
    { year: toNumber("02/05/1519"), title: "Morte di Leonardo da Vinci in Francia", category: "cultura", importance: 3 },
    { year: toNumber("28/06/1519"), title: "Carlo V viene eletto Sacro Romano Imperatore", category: "politica", importance: 2 },
    { year: toNumber("20/09/1519"), title: "Partenza della spedizione di Ferdinando Magellano", category: "tecnologia", importance: 2 }
];


const eventiMancanti1420_1450 = [
    { year: toNumber("21/05/1420"), title: "Trattato di Troyes: re Carlo VI di Francia riconosce Enrico V d'Inghilterra come suo erede e sovrano di gran parte della Francia", category: "politica", importance: 3 },
    { year: toNumber("14/07/1420"), title: "Battaglia della collina di Vítkov: gli hussiti sconfiggono le forze imperiali a Praga", category: "politica", importance: 3 },
    { year: toNumber("17/08/1424"), title: "Battaglia di Verneuil: decisiva vittoria inglese contro francesi e scozzesi nella Guerra dei Cent'anni", category: "politica", importance: 3 },
    { year: toNumber("13/02/1429"), title: "Giovanna d'Arco inizia il viaggio da Vaucouleurs per raggiungere la corte a Chinon e incontrare il Delfino Carlo", category: "cultura", importance: 3 },
    { year: toNumber("08/05/1429"), title: "Presa delle Tourelles e liberazione di Orléans: Giovanna d'Arco respinge l'assedio inglese nella Guerra dei Cent'anni", category: "politica", importance: 4 },
    { year: toNumber("18/06/1429"), title: "Battaglia di Patay: vittoria francese sull'esercito inglese che si ritira dalla Valle della Loira", category: "politica", importance: 3 },
    { year: toNumber("17/07/1429"), title: "Il Delfino viene incoronato re come Carlo VII di Francia nella cattedrale di Reims", category: "politica", importance: 3 },
    { year: toNumber("23/05/1430"), title: "Cattura di Giovanna d'Arco a Compiègne e successiva vendita al Regno d'Inghilterra da parte dei Borgognoni", category: "politica", importance: 3 },
    { year: toNumber("21/09/1435"), title: "Trattato di Arras: alleanza tra Carlo VII di Francia e Filippo il Buono di Borgogna", category: "politica", importance: 3 },
    { year: toNumber("07/07/1438"), title: "Prammatica Sanzione di Bourges: Carlo VII limita il potere papale sulla Chiesa francese (Gallicanesimo)", category: "politica", importance: 3 },
    { year: 1440, title: "Johannes Gutenberg realizza il primo sistema per la stampa a caratteri mobili in metallo", category: "tecnologia", importance: 1 },
    { year: toNumber("10/11/1444"), title: "Battaglia di Varna: l'esercito crociato annientato dagli Ottomani del sultano Murad II", category: "politica", importance: 3 },
    { year: toNumber("15/04/1450"), title: "Battaglia di Formigny: le forze francesi sconfiggono gli inglesi, passo fondamentale per la riconquista della Normandia", category: "politica", importance: 3 },
    { year: toNumber("17/07/1453"), title: "Battaglia di Castillon: vittoria decisiva francese che pone fine alla Guerra dei Cent'anni", category: "politica", importance: 4 },
    { year: toNumber("22/05/1455"), title: "Prima battaglia di St Albans: inizio della Guerra delle Due Rose in Inghilterra", category: "politica", importance: 3 }
];



const eventiMancanti1460_1490 = [
    { year: toNumber("14/01/1460"), title: "Papa Pio II proclama una crociata per riprendere Costantinopoli", category: "politica", importance: 2 },
    { year: toNumber("15/01/1460"), title: "Battaglia di Sandwich", category: "politica", importance: 2 },
    { year: toNumber("04/04/1460"), title: "Fondazione dell'Università di Basilea", category: "cultura", importance: 2 },
    { year: toNumber("10/07/1460"), title: "Battaglia di Northampton (Guerra delle due rose)", category: "politica", importance: 2 },
    { year: toNumber("04/03/1461"), title: "Edoardo IV diventa re d'Inghilterra", category: "politica", importance: 3 },
    { year: toNumber("29/03/1461"), title: "Battaglia di Towton (Guerra delle due rose)", category: "politica", importance: 3 },
    { year: toNumber("15/08/1461"), title: "Caduta dell'Impero di Trebisonda (ultimo residuo bizantino)", category: "politica", importance: 3 },
    { year: toNumber("17/06/1462"), title: "Vlad III Dracula attacca l'accampamento di Maometto II (Attacco Notturno di Târgoviște)", category: "politica", importance: 3 },
    { year: toNumber("05/01/1463"), title: "Il poeta francese François Villon viene bandito da Parigi dopo una rissa", category: "cultura", importance: 4 },
    { year: toNumber("01/08/1464"), title: "Piero il Gottoso succede a Cosimo de' Medici a Firenze", category: "politica", importance: 3 },
    { year: toNumber("16/07/1465"), title: "Battaglia di Montlhéry tra Luigi XI e la Lega del Bene Pubblico", category: "politica", importance: 3 },
    { year: toNumber("17/01/1468"), title: "Morte di Skanderbeg, eroe nazionale albanese", category: "politica", importance: 4 },
    { year: toNumber("12/07/1470"), title: "Battaglia di Negroponte: gli ottomani conquistano l'isola ai veneziani", category: "politica", importance: 3 },
    { year: toNumber("14/04/1471"), title: "Battaglia di Barnet (Guerra delle due rose): muore il Conte di Warwick", category: "politica", importance: 3 },
    { year: toNumber("04/05/1471"), title: "Battaglia di Tewkesbury: Edoardo IV sconfigge i Lancaster", category: "politica", importance: 3 },
    { year: toNumber("11/08/1473"), title: "Battaglia di Otlukbeli: Maometto II sconfigge gli Ak Koyunlu", category: "politica", importance: 3 },
    { year: toNumber("19/02/1474"), title: "Trattato di Utrecht tra la Lega Anseatica e l'Inghilterra", category: "politica", importance: 3 },
    { year: toNumber("15/06/1475"), title: "Viene fondata la Biblioteca Vaticana da Papa Sisto IV", category: "cultura", importance: 4 },
    { year: toNumber("02/03/1476"), title: "Battaglia di Grandson: gli Svizzeri sconfiggono Carlo il Temerario", category: "politica", importance: 3 },
    { year: toNumber("22/06/1476"), title: "Battaglia di Morat: gli Svizzeri sconfiggono nuovamente la Borgogna", category: "politica", importance: 3 },
    { year: toNumber("25/01/1479"), title: "Trattato di Costantinopoli tra Venezia e l'Impero Ottomano", category: "politica", importance: 3 },
    { year: toNumber("11/08/1480"), title: "Gli Ottomani catturano Otranto in Puglia", category: "politica", importance: 4 },
    { year: toNumber("11/11/1480"), title: "Grande stallo sul fiume Ugra: fine del giogo tartaro sulla Russia", category: "politica", importance: 3 },
    { year: toNumber("03/05/1481"), title: "Morte del sultano ottomano Maometto II il Conquistatore", category: "politica", importance: 4 },
    { year: toNumber("10/09/1481"), title: "Gli Aragonesi riprendono Otranto agli Ottomani", category: "politica", importance: 3 },
    { year: toNumber("25/06/1483"), title: "Edoardo V d'Inghilterra viene deposto da Riccardo III", category: "politica", importance: 3 },
    { year: toNumber("15/08/1483"), title: "Papa Sisto IV inaugura la Cappella Sistina a Roma", category: "cultura", importance: 3 },
    { year: toNumber("22/08/1485"), title: "Battaglia di Bosworth Field: Enrico VII sconfigge Riccardo III (Fine della Guerra delle due rose)", category: "politica", importance: 4 },
    { year: toNumber("16/06/1487"), title: "Battaglia di Stoke Field: ultima battaglia della Guerra delle due rose", category: "politica", importance: 3 },
    { year: toNumber("11/06/1488"), title: "Battaglia di Sauchieburn: morte di Giacomo III di Scozia", category: "politica", importance: 3 },
    { year: toNumber("11/08/1492"), title: "Alessandro VI (Rodrigo Borgia) viene eletto Papa", category: "politica", importance: 4 },
    { year: toNumber("22/02/1495"), title: "Re Carlo VIII di Francia entra a Napoli", category: "politica", importance: 3 },
    { year: toNumber("06/07/1495"), title: "Battaglia di Fornovo: la Lega Santa respinge Carlo VIII in Francia", category: "politica", importance: 3 },
    { year: toNumber("07/02/1497"), title: "Falò delle vanità a Firenze organizzato da Girolamo Savonarola", category: "cultura", importance: 3 },
    { year: toNumber("22/09/1499"), title: "Trattato di Basilea: la Confederazione Svizzera ottiene l'indipendenza de facto dal Sacro Romano Impero", category: "politica", importance: 3 }
];


const eventiMancanti1400_1419 = [
    // 1400s
    { year: toNumber("20/07/1402"), title: "Battaglia di Ankara: Tamerlano sconfigge e cattura il sultano ottomano Bayezid I", category: "politica", importance: 3 },
    { year: toNumber("02/02/1403"), title: "L'imperatore Yongle ordina il trasferimento della capitale a Pechino e l'inizio dell'Enciclopedia Yongle", category: "politica", importance: 2 },
    { year: toNumber("11/07/1405"), title: "Inizio delle spedizioni navali cinesi dell'ammiraglio Zheng He nell'Oceano Indiano", category: "politica", importance: 3 },
    { year: toNumber("25/03/1409"), title: "Apertura del Concilio di Pisa per risolvere lo Scisma d'Occidente", category: "politica", importance: 2 },
    
    // 1410s
    { year: toNumber("15/07/1410"), title: "Battaglia di Grunwald: l'alleanza polacco-lituana sconfigge l'Ordine Teutonico", category: "politica", importance: 3 },
    { year: toNumber("05/11/1414"), title: "Apertura del Concilio di Costanza per porre fine al Grande Scisma", category: "politica", importance: 2 },
    { year: toNumber("21/08/1415"), title: "Conquista portoghese di Ceuta: inizio dell'espansione coloniale europea", category: "politica", importance: 3 },
    { year: toNumber("11/11/1417"), title: "Elezione di Papa Martino V: fine formale del Grande Scisma d'Occidente", category: "politica", importance: 3 },
    { year: toNumber("30/07/1419"), title: "Prima defenestrazione di Praga: inizio delle Guerre Hussite", category: "politica", importance: 3 }
];


const eventiMancanti1350_1399 = [
    { year: toNumber("19/09/1356"), title: "Battaglia di Poitiers: gli inglesi catturano re Giovanni II di Francia", category: "politica", importance: 3 },
    { year: toNumber("28/05/1358"), title: "La Jacquerie: grande rivolta contadina nel nord della Francia", category: "politica", importance: 3 },
    { year: toNumber("08/05/1360"), title: "Trattato di Brétigny: fine della prima fase della Guerra dei cent'anni", category: "politica", importance: 2 },
    { year: toNumber("26/09/1371"), title: "Battaglia della Marizza: gli Ottomani sconfiggono i serbi e dilagano nei Balcani", category: "politica", importance: 3 },
    { year: toNumber("20/07/1378"), title: "Tumulto dei Ciompi a Firenze: rivolta dei lavoratori della lana", category: "politica", importance: 3 },
    { year: toNumber("08/09/1380"), title: "Battaglia di Kulikovo: vittoria russa contro i Mongoli dell'Orda d'Oro", category: "politica", importance: 3 },
    { year: toNumber("17/05/1382"), title: "Traduzione della Bibbia di Wycliffe e condanna delle sue tesi (Lollardismo)", category: "cultura", importance: 2 },
    { year: toNumber("26/08/1382"), title: "Il Khan Tokhtamysh saccheggia Mosca ristabilendo il controllo mongolo", category: "politica", importance: 2 },
    { year: toNumber("14/08/1385"), title: "Unione di Krewo: inizio del legame dinastico tra Polonia e Lituania", category: "politica", importance: 2 },
    { year: toNumber("25/09/1396"), title: "Battaglia di Nicopoli: disfatta dell'ultima grande crociata contro gli Ottomani", category: "politica", importance: 2 },
    { year: toNumber("17/06/1397"), title: "Unione di Kalmar: Margherita I unifica Danimarca, Svezia e Norvegia", category: "politica", importance: 3 },
    { year: toNumber("17/12/1398"), title: "Tamerlano saccheggia Delhi, segnando il declino del Sultanato", category: "politica", importance: 3 }
];


const eventiMancanti1300_1349 = [
    { year: toNumber("22/02/1300"), title: "Papa Bonifacio VIII indice il primo Giubileo della storia", category: "politica", importance: 3 },
    { year: toNumber("18/11/1302"), title: "Bolla Unam Sanctam: supremazia papale su ogni potere terreno", category: "politica", importance: 3 },
    { year: toNumber("07/09/1303"), title: "Schiaffo di Anagni: Filippo il Bello fa imprigionare Bonifacio VIII", category: "politica", importance: 2 },
    { year: toNumber("13/10/1307"), title: "Arresto in massa dei Cavalieri Templari in Francia", category: "politica", importance: 2 },
    { year: toNumber("22/03/1312"), title: "Soppressione dei Templari durante il Concilio di Vienne", category: "politica", importance: 3 },
    { year: toNumber("14/04/1315"), title: "Inizio della Grande Carestia in Europa (piogge incessanti e crisi agricola)", category: "politica", importance: 2 },
    { year: toNumber("01/05/1328"), title: "Trattato di Edimburgo-Northampton: l'Inghilterra riconosce la Scozia sovrana", category: "politica", importance: 3 },
    { year: toNumber("04/07/1333"), title: "Caduta dello Shogunato Kamakura e inizio della restaurazione imperiale Kenmu", category: "politica", importance: 3 },
    { year: toNumber("07/11/1336"), title: "Inizio dello Shogunato Ashikaga in Giappone (Periodo Muromachi)", category: "politica", importance: 3 },
    { year: toNumber("07/04/1348"), title: "Fondazione dell'Università Carlo di Praga", category: "cultura", importance: 3 }
];


const proposte_1200_1249 = [
    { year: toNumber("16/07/1212"), title: "Battaglia di Las Navas de Tolosa: vittoria cristiana decisiva per la Reconquista spagnola", category: "politica", importance: 2 },
    { year: toNumber("18/02/1229"), title: "Sesta Crociata: Federico II recupera Gerusalemme tramite il Trattato di Giaffa", category: "politica", importance: 2 },
    { year: toNumber("06/12/1240"), title: "I Mongoli di Batu Khan distruggono Kiev, ponendo fine alla Rus' di Kiev", category: "politica", importance: 2 },
    { year: toNumber("11/04/1241"), title: "Battaglia di Mohi: i Mongoli travolgono l'esercito ungherese e devastano l'Europa orientale", category: "politica", importance: 2 },
    { year: toNumber("15/07/1244"), title: "Caduta definitiva di Gerusalemme per mano dei mercenari corasmi", category: "politica", importance: 2 }
];


const proposte_1250_1290 = [
    { year: 1252, title: "Firenze conia il primo fiorino d'oro, che diventerà una valuta standard in Europa", category: "politica", importance: 3 },
    { year: toNumber("25/07/1261"), title: "Michele VIII Paleologo riconquista Costantinopoli restaurando l'Impero Bizantino", category: "politica", importance: 2 },
    { year: toNumber("20/01/1265"), title: "Primo parlamento eletto in Inghilterra (Parlamento di De Montfort), pietra miliare nello sviluppo democratico", category: "politica", importance: 3 },
    { year: toNumber("18/05/1268"), title: "Caduta del Principato di Antiochia per mano dei Mamelucchi del sultano Baibars", category: "politica", importance: 3 },
    { year: toNumber("06/08/1284"), title: "Battaglia della Meloria: la flotta genovese distrugge quella pisana, segnando il declino di Pisa", category: "politica", importance: 3 },
    { year: toNumber("18/07/1290"), title: "Editto di Espulsione: re Edoardo I bandisce tutti gli ebrei dall'Inghilterra", category: "politica", importance: 3 },
    { year: 1291, title: "Firma del Patto federale svizzero (inizio agosto), documento fondativo della Vecchia Confederazione", category: "politica", importance: 3 },
    { year: toNumber("24/12/1294"), title: "Elezione di Papa Bonifacio VIII a seguito dell'abdicazione di Celestino V", category: "politica", importance: 3 },
    { year: toNumber("11/09/1297"), title: "Battaglia di Stirling Bridge: gli scozzesi guidati da William Wallace sconfiggono gli inglesi", category: "politica", importance: 3 }
];


const nuovi_eventi_800_960 = [
    { year: 813, title: "Consolidamento della Casa della Sapienza a Baghdad: inizia la traduzione di massa di testi greci e indiani", category: "cultura", importance: 2 },
    { year: 820, title: "Al-Khwarizmi pubblica il trattato 'Al-Jabr', fondamento dell'algebra moderna", category: "scienza", importance: 1 },
    { year: 830, title: "Introduzione del sistema di numerazione posizionale indo-arabo (con lo zero) nel mondo islamico", category: "scienza", importance: 1 },
    { year: 840, title: "L'astronomo Al-Farghani scrive 'Elementi di astronomia', testo base per secoli anche in Europa", category: "scienza", importance: 2 },
    { year: 848, title: "Leone il Matematico perfeziona a Bisanzio il telegrafo ottico (fari) per segnalazioni rapide tra i confini", category: "tecnologia", importance: 3 },
    { year: 850, title: "Al-Kindi scrive i primi trattati scientifici sulla crittografia e sulla frequenza delle lettere", category: "scienza", importance: 3 },
    { year: 859, title: "Fatima al-Fihri fonda l'Università di al-Qarawiyyin a Fez, considerata la più antica ancora attiva", category: "cultura", importance: 2 },
    { year: 860, title: "I fratelli Banu Musa pubblicano il 'Libro dei dispositivi ingegnosi' su automazione e idraulica", category: "tecnologia", importance: 2 },
    { year: 864, title: "Al-Razi (Rhazes) inizia i suoi studi pionieristici in medicina, isolando i sintomi di vaiolo e rosolia", category: "scienza", importance: 2 },
    { year: toNumber("11/05/868"), title: "Stampa in Cina del 'Sutra del Diamante', il più antico libro a stampa datato giunto fino a noi", category: "tecnologia", importance: 2 },
    { year: 870, title: "Il filosofo Al-Farabi inizia a integrare la logica aristotelica con il pensiero islamico", category: "cultura", importance: 3 },
    { year: 880, title: "Al-Battani compie osservazioni astronomiche che migliorano la misurazione dell'inclinazione dell'eclittica", category: "scienza", importance: 3 },
    { year: 885, title: "In Bulgaria, i discepoli di Cirillo e Metodio sviluppano l'alfabeto cirillico per tradurre i testi sacri", category: "cultura", importance: 2 },
    { year: 890, title: "Diffusione dell'aratro pesante (carruca) nell'Europa del Nord, che trasforma radicalmente l'agricoltura", category: "tecnologia", importance: 2 },
    { year: 950, title: "Diffusione in Andalusia (Spagna) di sistemi avanzati di irrigazione (noria) e nuove colture come il cotone", category: "tecnologia", importance: 2 },
    { year: 953, title: "Prima descrizione documentata di una penna stilografica (con serbatoio) costruita per il Califfo fatimide", category: "tecnologia", importance: 3 },
    { year: 955, title: "Al-Uqlidisi scrive il primo libro che utilizza le frazioni decimali invece delle sessagesimali", category: "scienza", importance: 3 },
    { year: 960, title: "Consolidamento dei monasteri come centri di produzione di codici miniati (es. il Beatus di Valeranica)", category: "cultura", importance: 3 }
];


const mancanti_400_499 = [
    { year: toNumber("31/12/406"), title: "Invasione della Gallia: Vandali e Alani attraversano il Reno ghiacciato", category: "politica", importance: 2 },
    { year: toNumber("24/08/410"), title: "Sacco di Roma da parte dei Visigoti di Alarico", category: "politica", importance: 2 },
    { year: toNumber("15/04/413"), title: "Completamento delle Mura Teodosiane a Costantinopoli (data convenzionale)", category: "tecnologia", importance: 2 },
    { year: toNumber("30/09/420"), title: "Morte di San Girolamo, autore della Vulgata", category: "cultura", importance: 3 },
    { year: toNumber("22/06/431"), title: "Apertura del Concilio di Efeso", category: "cultura", importance: 2 },
    { year: toNumber("15/02/438"), title: "Promulgazione del Codex Theodosianus a Costantinopoli", category: "politica", importance: 2 },
    { year: toNumber("29/09/440"), title: "Elezione di Papa Leone I", category: "cultura", importance: 2 },
    { year: toNumber("08/10/451"), title: "Apertura del Concilio di Calcedonia", category: "cultura", importance: 2 },
    { year: toNumber("02/06/455"), title: "Inizio del Sacco di Roma da parte dei Vandali di Genserico", category: "politica", importance: 3 },
    { year: toNumber("17/03/461"), title: "Morte di San Patrizio (data tradizionale)", category: "cultura", importance: 3 },
    { year: toNumber("13/04/476"), title: "Nascita di Aryabhata, matematico e astronomo indiano", category: "scienza", importance: 3 },
    { year: toNumber("01/09/486"), title: "Battaglia di Soissons: Clodoveo I sconfigge Siagrio", category: "politica", importance: 2 },
    { year: toNumber("25/12/496"), title: "Battesimo di Clodoveo I a Reims (data tradizionale)", category: "cultura", importance: 2 }
];


const eventiMancantiVI_Secolo = [
    { year: toNumber("01/05/507"), title: "Battaglia di Vouillé: Clodoveo sconfigge i Visigoti e conquista l'Aquitania", category: "politica", importance: 2 },
    { year: toNumber("27/11/511"), title: "Morte di Clodoveo I", category: "politica", importance: 3 },
    { year: toNumber("09/07/518"), title: "Giustino I diventa Imperatore d'Oriente", category: "politica", importance: 3 },
    { year: toNumber("23/10/524"), title: "Esecuzione di Severino Boezio a Pavia sotto il re Teodorico, dopo aver composto il De consolatione philosophiae", category: "cultura", importance: 3 },
    { year: toNumber("01/08/527"), title: "Giustiniano I sale al trono", category: "politica", importance: 2 },
    { year: toNumber("07/04/529"), title: "Promulgazione del primo Codex Justinianus", category: "politica", importance: 2 },
    { year: toNumber("13/01/532"), title: "Rivolta di Nika a Costantinopoli", category: "politica", importance: 3 },
    { year: toNumber("23/02/532"), title: "Inizio lavori Basilica Santa Sofia", category: "tecnologia", importance: 3 },
    { year: toNumber("16/12/533"), title: "Promulgazione del Digesto e delle Istituzioni da parte dell'imperatore Giustiniano I", category: "politica", importance: 3 },
    { year: toNumber("01/03/534"), title: "Resa del re Gelimero al generale Belisario e fine del Regno dei Vandali", category: "politica", importance: 3 },
    { year: toNumber("27/12/537"), title: "Solenne consacrazione della Basilica di Santa Sofia a Costantinopoli", category: "tecnologia", importance: 2 },
    { year: toNumber("01/10/541"), title: "La peste di Giustiniano si manifesta a Pelusio in Egitto, dando inizio alla pandemia", category: "scienza", importance: 1 },
    { year: toNumber("01/04/552"), title: "Monaci nestoriani contrabbandano uova di baco da seta dalla Cina a Costantinopoli", category: "tecnologia", importance: 3 },
    { year: toNumber("05/05/553"), title: "Inizio del Secondo Concilio di Costantinopoli", category: "cultura", importance: 3 },
    { year: toNumber("13/08/554"), title: "Prammatica Sanzione di Giustiniano", category: "politica", importance: 3 },
    { year: toNumber("01/04/568"), title: "Alboino e i Longobardi entrano in Italia", category: "politica", importance: 2 },
    { year: toNumber("20/04/571"), title: "Nascita di Maometto alla Mecca, fondatore dell'Islam e figura chiave della storia mondiale", category: "politica", importance: 1 },
    { year: toNumber("04/03/581"), title: "Fondazione della Dinastia Sui in Cina", category: "politica", importance: 2 },
    { year: toNumber("08/05/589"), title: "Terzo Concilio di Toledo: conversione Visigoti", category: "cultura", importance: 3 },
    { year: toNumber("03/09/590"), title: "Elezione di Papa Gregorio Magno", category: "politica", importance: 2 },
    { year: toNumber("01/05/597"), title: "Sbarco di sant'Agostino di Canterbury nel Kent e inizio della conversione degli anglosassoni", category: "politica", importance: 3 }
];

const proposte_1150_1190 = [
    { year: toNumber("18/06/1155"), title: "Federico Barbarossa viene incoronato Imperatore del Sacro Romano Impero", category: "politica", importance: 2 },
    { year: toNumber("16/04/1162"), title: "Nascita di Temüjin (il futuro Gengis Khan) in Mongolia", category: "politica", importance: 2 },
    { year: toNumber("29/12/1170"), title: "Assassinio dell'arcivescovo Thomas Becket nella Cattedrale di Canterbury", category: "politica", importance: 3 },
    { year: toNumber("10/09/1171"), title: "Saladino depone l'ultimo califfo fatimide e fonda la dinastia Ayyubide in Egitto", category: "politica", importance: 2 },
    { year: toNumber("29/05/1176"), title: "Battaglia di Legnano: la Lega Lombarda sconfigge Federico Barbarossa", category: "politica", importance: 2 },
    { year: toNumber("17/09/1176"), title: "Battaglia di Miriocefalo: decisiva vittoria dei Selgiuchidi con l'Impero Bizantino", category: "politica", importance: 3 },
    { year: toNumber("04/07/1187"), title: "Battaglia di Hattin: disastrosa sconfitta dei crociati ad opera di Saladino", category: "politica", importance: 2 },
    { year: toNumber("10/06/1190"), title: "Morte di Federico Barbarossa in Asia Minore durante la Terza Crociata", category: "politica", importance: 3 },
    { year: toNumber("08/01/1198"), title: "Inizio del pontificato di Innocenzo III, apogeo del potere temporale della Chiesa", category: "politica", importance: 2 }
];


const mancanti_211_395 = [
    { year: toNumber("04/02/211"), title: "Morte di Settimio Severo a York; i figli Caracalla e Geta diventano co-imperatori", category: "politica", importance: 2 },
    { year: toNumber("28/04/224"), title: "Battaglia di Hormozdgan: Ardashir I sconfigge i Parti, nasce l'Impero Sassanide", category: "politica", importance: 2 },
    { year: toNumber("18/03/235"), title: "Massacro di Alessandro Severo a opera delle truppe; inizia l'Anarchia Militare", category: "politica", importance: 2 },
    { year: toNumber("12/04/238"), title: "Battaglia di Cartagine: morte di Gordiano I e Gordiano II nell'anno dei sei imperatori", category: "politica", importance: 3 },
    { year: toNumber("11/02/244"), title: "Firma del trattato di pace tra l'imperatore Filippo l'Arabo e Shapur I di Persia", category: "politica", importance: 3 },
    { year: toNumber("26/12/274"), title: "Aureliano celebra il trionfo a Roma (fine anno) dopo aver riconquistato l'Impero delle Gallie e Palmira", category: "politica", importance: 2 },
    { year: toNumber("01/12/301"), title: "Emanazione dell'Editto sui prezzi massimi da parte di Diocleziano per frenare l'inflazione", category: "politica", importance: 3 },
    { year: toNumber("24/02/303"), title: "Pubblicazione del primo editto contro i cristiani; inizia la 'Grande Persecuzione'", category: "cultura", importance: 2 },
    { year: toNumber("22/05/337"), title: "Morte di Costantino il Grande; l'impero passa ai suoi tre figli", category: "politica", importance: 2 },
    { year: toNumber("28/09/351"), title: "Battaglia di Mursa Maggiore: Costanzo II sconfigge l'usurpatore Magnenzio", category: "politica", importance: 3 },
    { year: toNumber("26/06/363"), title: "Morte di Giuliano l'Apostata durante la ritirata dalla campagna contro i Sassanidi", category: "politica", importance: 2 },
    { year: toNumber("16/06/364"), title: "Eclissi solare registrata da Teon d'Alessandria, usata per calcoli astronomici antichi", category: "scienza", importance: 3 },
    { year: toNumber("16/06/391"), title: "Decreto di Teodosio I che proibisce i sacrifici pagani e l'accesso ai templi", category: "cultura", importance: 2 },
    { year: toNumber("06/09/394"), title: "Battaglia del Frigido: Teodosio I sconfigge Eugenio, riunificando l'impero per l'ultima volta", category: "politica", importance: 2 }
];

const timeline_nazismo_early = [
    { year: toNumber("01/10/1907"), title: "Hitler viene respinto dall'Accademia delle Belle Arti di Vienna", category: "cultura", importance: 4 },
    { year: toNumber("05/01/1919"), title: "Fondazione del Partito Tedesco dei Lavoratori (DAP) a Monaco", category: "politica", importance: 4 },
    { year: toNumber("12/09/1919"), title: "Adolf Hitler partecipa per la prima volta a una riunione del Partito Tedesco dei Lavoratori come informatore militare", category: "politica", importance: 4 },
    { year: toNumber("24/02/1920"), title: "Il Partito Tedesco dei Lavoratori diventa partito Nazionalsocialista", category: "politica", importance: 3 },
    { year: toNumber("17/12/1920"), title: "Il partito Nazionalsocialista tedesco acquista il quotidiano Völkischer Beobachter", category: "cultura", importance: 5 },
    { year: toNumber("29/07/1921"), title: "Hitler eletto primo segretario del partito NSDAP", category: "politica", importance: 3 },
    { year: toNumber("04/11/1921"), title: "Formazione delle Sturmabteilung (SA) come braccio paramilitare del partito nazista", category: "politica", importance: 3 },
    { year: toNumber("08/11/1923"), title: "Putsch di Monaco: tentativo fallito di colpo di stato; Hitler viene arrestato", category: "politica", importance: 3 },
    { year: toNumber("01/04/1924"), title: "Inizio della detenzione di Hitler nella fortezza di Landsberg; inizia la stesura di Mein Kampf", category: "politica", importance: 3 },
    { year: toNumber("27/02/1925"), title: "Hitler rifonda il NSDAP dopo la revoca del bando", category: "politica", importance: 3 },
    { year: toNumber("18/07/1925"), title: "Esce il primo volume di 'Mein Kampf' di Hitler", category: "cultura", importance: 3 },
    { year: toNumber("14/02/1926"), title: "Conferenza di Bamberga: Hitler sconfigge l'ala 'sinistra' del partito guidata da Strasser", category: "politica", importance: 4 },
    { year: toNumber("04/07/1926"), title: "Fondazione della Hitlerjugend, organizzazione per l'indottrinamento culturale dei giovani", category: "cultura", importance: 3 },
];


const timeline_covid_pandemic = [
    { year: toNumber("31/12/2019"), title: "L'OMS riceve segnalazioni di casi di polmonite atipica a Wuhan, Cina", category: "scienza", importance: 4 },
    { year: toNumber("11/01/2020"), title: "Scienziati cinesi pubblicano la sequenza genetica del SARS-CoV-2", category: "scienza", importance: 4 },
    { year: toNumber("23/01/2020"), title: "Lockdown di Wuhan: il governo cinese impone la prima quarantena di massa della storia moderna", category: "politica", importance: 2 },
    { year: toNumber("09/03/2020"), title: "L'Italia prima nazione occidentale a imporre un lockdown nazionale", category: "politica", importance: 3 },
    { year: toNumber("11/03/2020"), title: "COVID-19: L'OMS dichiara lo stato di pandemia globale", category: "politica", importance: 1 },
    { year: toNumber("23/03/2020"), title: "Il Regno Unito annuncia il lockdown nazionale; gran parte dell'Europa entra in isolamento", category: "politica", importance: 4 },
    { year: toNumber("02/12/2020"), title: "Approvazione del primo vaccino anti COVID-19 (Pfizer-BioNTech) nel Regno Unito", category: "scienza", importance: 3 },
    { year: toNumber("22/01/2022"), title: "Picco storico dei casi di COVID-19", category: "scienza", importance: 3 },
    { year: toNumber("05/05/2023"), title: "L'OMS dichiara la fine del COVID-19 come emergenza sanitaria globale", category: "politica", importance: 3 }
];

const preWWIIEvents = [
    { year: toNumber("16/03/1926"), title: "Lancio del primo razzo a propellente liquido da parte di Robert Goddard", category: "tecnologia", importance: 3 },
    { year: toNumber("28/03/1935"), title: "Uscita di 'Triumph des Willens': apogeo della propaganda cinematografica nazista", category: "cultura", importance: 4 },
    { year: toNumber("03/10/1935"), title: "Invasione italiana dell'Etiopia: crisi definitiva della Società delle Nazioni", category: "politica", importance: 3 },
    { year: toNumber("29/09/1938"), title: "Conferenza di Monaco: politica di appeasement e smembramento della Cecoslovacchia", category: "politica", importance: 3 },
    { year: toNumber("23/08/1939"), title: "Patto Molotov-Ribbentrop: accordo di non aggressione tra Germania e URSS", category: "politica", importance: 3 },
    { year: toNumber("27/08/1939"), title: "Volo dell'Heinkel He 178: primo aereo al mondo con motore a turbogetto", category: "tecnologia", importance: 3 }
];

const financialCrisisEvents = [
    { year: toNumber("16/03/2008"), title: "Salvataggio di Bear Stearns: inizio dell'intervento massiccio della Fed nel mercato privato", category: "politica", importance: 4 },
    { year: toNumber("07/09/2008"), title: "Nazionalizzazione di Fannie Mae e Freddie Mac: il governo USA assume il controllo dei giganti dei mutui", category: "politica", importance: 3 },
    { year: toNumber("15/09/2008"), title: "Fallimento di Lehman Brothers: il più grande collasso bancario della storia e inizio della crisi globale", category: "politica", importance: 1 },
    { year: toNumber("16/09/2008"), title: "Salvataggio di AIG: la Fed interviene per evitare il collasso del sistema assicurativo globale", category: "politica", importance: 3 },
    { year: toNumber("03/10/2008"), title: "Approvazione del TARP (Troubled Asset Relief Program) negli USA: piano di salvataggio da 700 miliardi", category: "politica", importance: 3 },
    { year: toNumber("20/10/2009"), title: "Il governo Papandreou ammette conti truccati per la Grecia innescando la crisi dell'Euro", category: "politica", importance: 2 },
    { year: toNumber("21/07/2010"), title: "Firma del Dodd-Frank Act: la più vasta riforma della regolamentazione finanziaria statunitense dagli anni '30", category: "politica", importance: 3 },
    { year: toNumber("17/09/2011"), title: "Inizio di 'Occupy Wall Street': movimento di protesta globale contro le disuguaglianze economiche", category: "cultura", importance: 3 },
    { year: toNumber("12/11/2011"), title: "Dimissioni di Silvio Berlusconi: crisi politica italiana sotto la pressione dello spread", category: "politica", importance: 3 },
    { year: toNumber("26/07/2012"), title: "Discorso 'Whatever it takes' di Mario Draghi: la BCE salva l'Eurozona dalla speculazione", category: "politica", importance: 1 },
    { year: toNumber("08/10/2012"), title: "Istituzione del Meccanismo Europeo di Stabilità (MES): creazione di un fondo salva-stati permanente", category: "politica", importance: 3 }
];

const timeline_fascismo_italiano = [
    { year: toNumber("23/03/1919"), title: "Benito Mussolini fonda a Milano il movimento politico dei 'Fasci italiani di combattimento'", category: "politica", importance: 4 },
    { year: toNumber("12/09/1919"), title: "Il poeta Gabriele D'Annunzio guida l'occupazione della città di Fiume", category: "politica", importance: 4 },
    { year: toNumber("09/11/1921"), title: "Congresso di Roma: il movimento fascista diventa Partito Nazionale Fascista (PNF)", category: "politica", importance: 4 },
    { year: toNumber("28/10/1922"), title: "Marcia su Roma delle camicie nere, il Re Vittorio Emanuele III affida a Benito Mussolini l'incarico di formare un governo", category: "politica", importance: 2 },
    { year: toNumber("06/05/1923"), title: "Riforma Gentile del sistema scolastico italiano", category: "politica", importance: 4 },
    { year: toNumber("18/11/1923"), title: "Istituito il Consiglio Nazionale delle Ricerche (CNR) con lo scopo di coordinare e promuovere le attività scientifiche in Italia", category: "tecnologia", importance: 4 },
    { year: toNumber("10/06/1924"), title: "Il deputato socialista Giacomo Matteotti viene rapito e ucciso dopo aver denunciato i brogli elettorali del PNF in Parlamento", category: "politica", importance: 3 },
    { year: toNumber("03/01/1925"), title: "Mussolini si assume la responsabilità morale dell'omicidio Matteotti, inizio della dittatura autoritaria e fine dello stato liberale", category: "politica", importance: 2 },
    { year: toNumber("11/02/1929"), title: "Patti Lateranensi: regolano i rapporti tra stato italiano e Chiesa Cattolica", category: "politica", importance: 4 },
    { year: toNumber("28/04/1937"), title: "Inaugurati a Roma gli studi di Cinecittà, centro della produzione cinematografica italiana e strumento di propaganda del regime", category: "cultura", importance: 4 },
    { year: toNumber("14/07/1938"), title: "'Manifesto della razza': documento prodotto e firmato da diversi scienziati per dare basi biologiche alla superiorità della razza ariana", category: "cultura", importance: 3 },
    { year: toNumber("17/11/1938"), title: "Leggi Razziali in Italia: cittadini di origine ebraica esclusi da scuole, uffici pubblici e vita civile", category: "politica", importance: 2 },
    { year: toNumber("10/06/1940"), title: "Mussolini dichiara l'entrata dell'Italia nella Seconda Guerra Mondiale a fianco della Germania nazista", category: "politica", importance: 2 },
    { year: toNumber("25/07/1943"), title: "Il Gran Consiglio del Fascismo vota la sfiducia a Mussolini (Ordine Grandi); il Re ne ordina l'arresto", category: "politica", importance: 3 },
    { year: toNumber("28/04/1945"), title: "Mussolini catturato e fucilato dai partigiani a Giulino di Mezzegra mentre tentava la fuga in Svizzera", category: "politica", importance: 3 }
];

const japaneseMilitarismEvents = [
    { year: toNumber("10/01/1873"), title: "Leva obbligatoria in Giappone: lo Stato crea un esercito moderno di cittadini, abolendo il primato dei Samurai", category: "politica", importance: 4 },
    { year: toNumber("04/01/1882"), title: "Rescritto Imperiale ai soldati: il Giappone impone ai militari l'obbligo etico di obbedienza assoluta all'Imperatore", category: "politica", importance: 4 },
    { year: toNumber("05/09/1905"), title: "Trattato di Portsmouth: la fine della guerra russo-giapponese, il Giappone diventa potenza globale", category: "politica", importance: 3 },
    { year: toNumber("18/09/1931"), title: "Incidente di Mukden: il Giappone inscena un finto attentato per giustificare l'invasione militare della Manciuria", category: "politica", importance: 3 },
    { year: toNumber("15/05/1932"), title: "Incidente del 15 maggio in Giappone: ufficiali ribelli uccidono il Primo Ministro eliminando il controllo civile sul governo", category: "politica", importance: 3 },
    { year: toNumber("26/02/1936"), title: "Tentato colpo di Stato in Giappone: i militari estremisti prendono il controllo di Tokyo, militarizzando lo Stato", category: "politica", importance: 3 },
    { year: toNumber("30/03/1937"), title: "Diffusione del 'Kokutai no Hongi' in Giappone: culto della nazione e della divinità imperiale nelle scuole", category: "politica", importance: 4 },
    { year: toNumber("02/09/1945"), title: "Resa del Giappone, fine del militarismo giapponese e del sistema imperiale assoluto", category: "politica", importance: 3 }
];

const missingLiteratureEvents = [
    // --- ORIGINI E RINASCIMENTO ---
    { year: toNumber("19/07/1374"), title: "Morte di Petrarca e assetto definitivo de 'Il Canzoniere'", category: "cultura", importance: 5 },
    { year: toNumber("25/10/1400"), title: "Morte di Geoffrey Chaucer, lascia incompiuti 'I racconti di Canterbury'", category: "cultura", importance: 4 },
    { year: 1532, title: "Prima pubblicazione di 'Pantagruel', inizio del ciclo di 'Gargantua e Pantagruel' (François Rabelais)", category: "cultura", importance: 5 },
    { year: toNumber("24/06/1581"), title: "Prima edizione completa e autorizzata della 'Gerusalemme liberata' di Torquato Tasso", category: "cultura", importance: 5 },
    { year: 1597, title: "Prima pubblicazione (in-quarto) di 'Romeo e Giulietta' (William Shakespeare)", category: "cultura", importance: 4 },
    
    // --- SEICENTO E SETTECENTO ---
    { year: 1603, title: "Prima pubblicazione (in-quarto) dell''Amleto' (William Shakespeare)", category: "cultura", importance: 3 },
    { year: toNumber("04/06/1666"), title: "Prima rappresentazione teatrale de 'Il misantropo' di Molière", category: "cultura", importance: 5 },
    { year: 1678, title: "Pubblicazione (anonima) de 'La principessa di Clèves' di Madame de La Fayette", category: "cultura", importance: 6 },
    { year: toNumber("26/12/1752"), title: "Prima rappresentazione de 'La locandiera' al Teatro Sant'Angelo di Venezia (Carlo Goldoni)", category: "cultura", importance: 5 },
    { year: toNumber("23/03/1782"), title: "Pubblicazione del romanzo epistolare 'Le relazioni pericolose' di Pierre Choderlos de Laclos", category: "cultura", importance: 5 },
    
    // --- OTTOCENTO ---
    { year: 1802, title: "Prima edizione completa e 'vera' delle 'Ultime lettere di Jacopo Ortis' (Ugo Foscolo)", category: "cultura", importance: 5 },
    { year: 1831, title: "Prima edizione fiorentina dei 'Canti' (Giacomo Leopardi)", category: "cultura", importance: 4 },
    { year: 1841, title: "Pubblicazione de 'I delitti della Rue Morgue' di Edgar Allan Poe, il primo racconto poliziesco", category: "cultura", importance: 4 },
    { year: toNumber("16/10/1847"), title: "Pubblicazione del romanzo 'Jane Eyre' (Charlotte Brontë)", category: "cultura", importance: 4 },
    { year: toNumber("16/03/1850"), title: "Pubblicazione de 'La lettera scarlatta' (Nathaniel Hawthorne)", category: "cultura", importance: 5 },
    { year: toNumber("14/11/1850"), title: "Pubblicazione in unico volume di 'David Copperfield' (Charles Dickens)", category: "cultura", importance: 4 },
    { year: toNumber("04/07/1855"), title: "Prima edizione della raccolta poetica 'Foglie d'erba' (Walt Whitman)", category: "cultura", importance: 4 },
    { year: toNumber("30/07/1861"), title: "Pubblicazione in unico volume di 'Grandi speranze' (Charles Dickens)", category: "cultura", importance: 4 },
    { year: 1881, title: "Pubblicazione del romanzo verista 'I Malavoglia' (Giovanni Verga)", category: "cultura", importance: 5 },
    { year: toNumber("10/12/1884"), title: "Prima pubblicazione (nel Regno Unito) de 'Le avventure di Huckleberry Finn' (Mark Twain)", category: "cultura", importance: 4 },
    { year: 1889, title: "Pubblicazione de 'Il piacere' (Gabriele D'Annunzio)", category: "cultura", importance: 5 },

    // --- NOVECENTO ---
    { year: toNumber("09/05/1921"), title: "Prima rappresentazione teatrale di 'Sei personaggi in cerca d'autore' (Luigi Pirandello)", category: "cultura", importance: 4 },
    { year: toNumber("01/05/1923"), title: "Pubblicazione de 'La coscienza di Zeno' (Italo Svevo)", category: "cultura", importance: 5 },
    { year: toNumber("10/04/1925"), title: "Pubblicazione de 'Il grande Gatsby' (F. Scott Fitzgerald)", category: "cultura", importance: 4 },
    { year: toNumber("15/06/1925"), title: "Pubblicazione della raccolta 'Ossi di seppia' (Eugenio Montale)", category: "cultura", importance: 5 },
    { year: toNumber("05/05/1927"), title: "Pubblicazione del romanzo 'La gita al faro' (Virginia Woolf)", category: "cultura", importance: 4 },
    { year: 1932, title: "Pubblicazione del romanzo distopico 'Il mondo nuovo' (Aldous Huxley)", category: "cultura", importance: 4 },
    { year: 1938, title: "Pubblicazione de 'La nausea', manifesto letterario dell'esistenzialismo (Jean-Paul Sartre)", category: "cultura", importance: 5 },
    { year: toNumber("14/04/1939"), title: "Pubblicazione di 'Furore' (John Steinbeck)", category: "cultura", importance: 4 },
    { year: toNumber("25/05/1942"), title: "Pubblicazione de 'Lo straniero' (Albert Camus)", category: "cultura", importance: 4 },
    { year: toNumber("16/07/1951"), title: "Pubblicazione del romanzo di formazione 'Il giovane Holden' (J.D. Salinger)", category: "cultura", importance: 4 },
    { year: toNumber("01/09/1952"), title: "Pubblicazione de 'Il vecchio e il mare' (Ernest Hemingway)", category: "cultura", importance: 4 },
    { year: toNumber("17/10/1952"), title: "Pubblicazione (in francese) dell'opera teatrale 'Aspettando Godot' (Samuel Beckett)", category: "cultura", importance: 4 },
    { year: toNumber("19/10/1953"), title: "Pubblicazione del romanzo distopico 'Fahrenheit 451' (Ray Bradbury)", category: "cultura", importance: 4 },
    { year: toNumber("15/09/1955"), title: "Prima pubblicazione (a Parigi) del romanzo 'Lolita' (Vladimir Nabokov)", category: "cultura", importance: 4 },
    { year: toNumber("05/09/1957"), title: "Pubblicazione del manifesto della Beat Generation 'Sulla strada' (Jack Kerouac)", category: "cultura", importance: 4 },
    { year: toNumber("04/06/1957"), title: "Pubblicazione de 'Il barone rampante' (Italo Calvino)", category: "cultura", importance: 5 },
    { year: toNumber("11/07/1960"), title: "Pubblicazione de 'Il buio oltre la siepe' (Harper Lee)", category: "cultura", importance: 4 },
    { year: toNumber("01/02/1996"), title: "Pubblicazione del romanzo massimalista 'Infinite Jest' (David Foster Wallace)", category: "cultura", importance: 6 }
];

const napoleonBiographyEvents = [
    // --- ASCESA MILITARE ---
    { year: toNumber("15/08/1769"), title: "Nascita di Napoleone Bonaparte ad Ajaccio, in Corsica", category: "politica", importance: 3 },
    { year: toNumber("19/12/1793"), title: "Vittoria all'Assedio di Tolone: primo grande successo militare del giovane capitano Bonaparte", category: "politica", importance: 4 },
    { year: toNumber("09/03/1796"), title: "Matrimonio tra Napoleone e Giuseppina di Beauharnais", category: "politica", importance: 5 },
    
    // --- CONSOLATO ---
    { year: toNumber("14/06/1800"), title: "Battaglia di Marengo: vittoria decisiva contro gli austriaci che consolida il potere di Napoleone in Francia", category: "politica", importance: 3 },
    { year: toNumber("15/07/1801"), title: "Firma del Concordato con Papa Pio VII: pacificazione religiosa dopo gli strappi della Rivoluzione", category: "politica", importance: 4 },
    
    // --- APOGEO DELL'IMPERO ---
    { year: toNumber("26/05/1805"), title: "Incoronazione di Napoleone a Re d'Italia nel Duomo di Milano", category: "politica", importance: 4 },
    { year: toNumber("14/10/1806"), title: "Battaglie di Jena e Auerstedt: Napoleone annienta l'esercito prussiano", category: "politica", importance: 3 },
    { year: toNumber("21/11/1806"), title: "Decreto di Berlino: istituzione del Blocco Continentale per isolare economicamente la Gran Bretagna", category: "politica", importance: 2 },
    { year: toNumber("07/07/1807"), title: "Trattati di Tilsit: pace con la Russia e massima espansione dell'influenza napoleonica in Europa", category: "politica", importance: 3 },
    { year: toNumber("05/07/1809"), title: "Battaglia di Wagram: decisiva vittoria francese contro l'Impero Austriaco nella Quinta Coalizione", category: "politica", importance: 3 },
    { year: toNumber("02/04/1810"), title: "Matrimonio con Maria Luisa d'Asburgo-Lorena per assicurarsi un erede e un'alleanza con l'Austria", category: "politica", importance: 5 },
    { year: toNumber("20/03/1811"), title: "Nascita di Napoleone Francesco (Napoleone II), designato 'Re di Roma'", category: "politica", importance: 5 },
    
    // --- DECLINO E CADUTA ---
    { year: toNumber("07/09/1812"), title: "Battaglia di Borodino: scontro sanguinoso che apre ai francesi la via per Mosca, ma senza distruggere l'esercito russo", category: "politica", importance: 3 },
    { year: toNumber("11/04/1814"), title: "Trattato di Fontainebleau: prima abdicazione di Napoleone e suo esilio sull'Isola d'Elba", category: "politica", importance: 2 },
    { year: toNumber("01/03/1815"), title: "Sbarco a Golfe-Juan: fuga dall'Elba e inizio del periodo dei 'Cento Giorni'", category: "politica", importance: 3 },
    { year: toNumber("15/10/1815"), title: "Arrivo in esilio sull'isola di Sant'Elena nell'Oceano Atlantico", category: "politica", importance: 3 }
];

const conquistaCanarie = [
    { year: 1312, title: "Riscoperta delle Canarie: il genovese Lanzarotto Malocello approda a Lanzarote", category: "cultura", importance: 4 },
    { year: toNumber("01/07/1341"), title: "Spedizione di Nicoloso da Recco: il Portogallo finanzia la prima mappatura scientifica delle Canarie", category: "tecnologia", importance: 4 },
    { year: toNumber("04/09/1479"), title: "Trattato di Alcáçovas: il Portogallo riconosce la sovranità castigliana sulle Canarie", category: "politica", importance: 4 },
    { year: 1402, title: "Inizio della conquista delle Canarie: sbarco dei normanni a Lanzarote", category: "politica", importance: 4 },
    { year: 1483, title: "Resa di Gran Canaria: sottomissione definitiva dell'isola alla Corona di Castiglia", category: "politica", importance: 4 },
    { year: toNumber("03/05/1493"), title: "Sottomissione di La Palma: Alonso Fernández de Lugo completa la conquista dell'isola", category: "politica", importance: 4 },
    { year: 1496, title: "Pace de Los Realejos: fine della conquista di Tenerife e sottomissione definitiva dei Guanci", category: "politica", importance: 5 },
    { year: toNumber("09/08/1492"), title: "Sosta di Colombo alle Canarie: rifornimento a La Gomera", category: "politica", importance: 4 }
];

const xerxesEvents = [
    { year: toNumber("01/11/-486"), title: "Serse I sale al trono dell'Impero Persiano dopo la morte di Dario I", category: "politica", importance: 2 },
    { year: toNumber("01/06/-480"), title: "Serse fa costruire il ponte di barche sull'Ellesponto per invadere la Grecia", category: "politica", importance: 3 },
    // Termopili e Artemisio (Agosto)
    { year: toNumber("21/09/-480"), title: "Serse ordina l'incendio e la distruzione di Atene", category: "politica", importance: 2 },
    { year: toNumber("24/09/-480"), title: "Battaglia di Salamina: la flotta persiana viene sconfitta dai Greci", category: "politica", importance: 2 },
    { year: toNumber("14/08/-465"), title: "Assassinio di Serse I in una congiura di palazzo", category: "politica", importance: 3 }
];

const leonidasEvents = [
    { year: toNumber("15/10/-489"), title: "Leonida I succede al fratellastro Cleomene I e diventa re di Sparta", category: "politica", importance: 4 },
    { year: toNumber("15/08/-480"), title: "Leonida guida i 300 Spartani e gli alleati al passo delle Termopili", category: "politica", importance: 3 },
    { year: toNumber("19/08/-480"), title: "Inizio dei combattimenti al passo delle Termopili", category: "politica", importance: 2 },
    { year: toNumber("20/08/-480"), title: "Battaglia delle Termopili: Leonida cade in combattimento difendendo il passo", category: "politica", importance: 2 },
    { year: toNumber("15/08/-440"), title: "I resti di Leonida vengono portati a Sparta e gli viene dedicato un monumento", category: "cultura", importance: 4 }
];


// Per aggiungerlo al tuo blocco principale:
// timelineData.push(...napoleonBiographyEvents);

const missingImportantEvents = [
    // --- Età antica ---
    { year: toNumber("29/10/-539"), title: "Ciro il Grande conquista Babilonia e pone fine all'esilio ebraico, autorizzando il ritorno in Giudea", category: "politica", importance: 2 },
    { year: -167, title: "Inizio della Rivolta dei Maccabei contro l'Impero Seleucide", category: "politica", importance: 2 },
    { year: toNumber("14/12/-164"), title: "Riconsacrazione del Tempio di Gerusalemme (origine di Hanukkah)", category: "cultura", importance: 3 },
    { year: 100, title: "Massima fioritura commerciale del Regno di Axum", category: "politica", importance: 3 },

    // --- Alto Medioevo ---
    { year: toNumber("12/09/668"), title: "Caduta di Pyongyang: Silla pone fine al periodo dei Tre Regni in Corea", category: "politica", importance: 2 },
    { year: 802, title: "Jayavarman II fonda l'Impero Khmer in Cambogia", category: "politica", importance: 3 },
    { year: 833, title: "Inizio della Mihna: il califfo al-Ma'mun impone il dogma mu'tazilita", category: "politica", importance: 3 },
    { year: 873, title: "Morte di Hunayn ibn Ishaq, traduttore chiave della cultura greca in arabo", category: "cultura", importance: 3 },
    { year: 1242, title: "Ibn al-Nafis descrive la circolazione polmonare nel suo Commentario al Canone", category: "scienza", importance: 3 },

    // --- Età moderna ---
    { year: 1419, title: "Enrico il Navigatore avvia le attività esplorative a Sagres", category: "tecnologia", importance: 3 },
    { year: toNumber("04/08/1639"), title: "Ultimo editto di Sakoku in Giappone: espulsione dei portoghesi e divieto di ingresso a ogni nave occidentale", category: "politica", importance: 2 },
    { year: toNumber("01/11/1700"), title: "Morte di Carlo II e inizio della dinastia Borbone in Spagna", category: "politica", importance: 3 },

    // --- Età contemporanea ---
    { year: toNumber("28/11/1876"), title: "Inizio del Porfiriato in Messico dopo il successo del Piano di Tuxtepec", category: "politica", importance: 3 },
    { year: toNumber("24/11/2016"), title: "Firma dell'Accordo di Pace tra il governo colombiano e le FARC", category: "politica", importance: 3 }
];


// Unione con la timeline principale
timelineData.push(...missingImportantEvents);

const additionalMinorEvents = [
    // Tratta atlantica
    { year: toNumber("15/06/1441"), title: "Prima tratta di schiavi africani verso l'Europa ad opera dei portoghesi (carico a Lagos)", category: "politica", importance: 3 },

    // Africa
    { year: toNumber("01/01/1390"), title: "Fondazione del Regno di Kongo, struttura politica chiave dell'Africa centrale precoloniale", category: "politica", importance: 3 },

    // Scienza
    { year: 1593, title: "Invenzione del termoscopio (termometro ad acqua) da parte di Galileo Galilei", category: "scienza", importance: 3 },
    //Arte
    { year: 1413, title: "Filippo Brunelleschi sviluppa la prospettiva lineare a punto unico di fuga",     category: "cultura", importance: 3 }
];

// Unione finale
timelineData.push(...additionalMinorEvents);

const missingPreColumbianNAEvents = [
    // Civiltà del Mississippi e Cahokia
    { year: 800, title: "Inizio del Periodo Mississippiano: fioritura delle culture dei tumuli nel Nord America orientale", category: "cultura", importance: 3 },
    { year: 1050, title: "Fondazione di Cahokia, la più grande città precolombiana a nord del Messico", category: "cultura", importance: 3 },
    { year: 1150, title: "Massimo splendore di Cahokia con una popolazione stimata di 20.000 abitanti", category: "cultura", importance: 3 },

    // Civiltà Pueblo ancestrale (Anasazi)
    { year: 900, title: "Inizio della costruzione dei grandi complessi pueblo nel Chaco Canyon (Nuovo Messico)", category: "cultura", importance: 3 },

    { year: 1300, title: "Grande Siccità nel Sud-Ovest (Nuovo Messico): abbandono dei grandi complessi Anasazi come Chaco Canyon e Mesa Verde", category: "cultura", importance: 3 }

];

timelineData.push(...missingPreColumbianNAEvents);

const possibleMissingEvents = [
    // Esplorazione polare
    { year: toNumber("06/04/1909"), title: "Robert Peary e Matthew Henson raggiungono il Polo Nord", category: "cultura", importance: 4 },
    
    // Alpinismo
    { year: toNumber("31/07/1954"), title: "Prima ascensione del K2: la spedizione italiana di Ardito Desio raggiunge la vetta", category: "cultura", importance: 4 },
    
    // Informatica
    { year: toNumber("15/10/1957"), title: "IBM rilascia Fortran: nasce il primo linguaggio di programmazione di alto livello", category: "tecnologia", importance: 4 },
    { year: toNumber("01/03/1971"), title: "Creeper, il primo virus informatico, si diffonde su ARPANET", category: "tecnologia", importance: 4 },
    
    // Esplorazione spaziale
    { year: toNumber("12/11/2014"), title: "La sonda Rosetta rilascia il lander Philae sulla cometa 67P", category: "scienza", importance: 3 },
    
    // Scienza e filosofia
    { year: toNumber("14/08/1962"), title: "Thomas Kuhn pubblica 'La struttura delle rivoluzioni scientifiche'", category: "cultura", importance: 4 },
    
    // Cultura e sport
    { year: toNumber("01/07/1903"), title: "Partenza del primo Tour de France", category: "cultura", importance: 5 },
    
    // Ambientalismo
    { year: toNumber("15/09/1971"), title: "Fondazione di Greenpeace: spedizione contro i test nucleari ad Amchitka", category: "politica", importance: 3 },
    
    // Paleontologia
    { year: toNumber("20/02/1824"), title: "William Buckland descrive il Megalosaurus, il primo dinosauro riconosciuto", category: "scienza", importance: 3 },

    // Tempesta solare di Carrington (1-2 settembre 1859)
    { year: toNumber("01/09/1859"), title: "Evento di Carrington: la più potente tempesta geomagnetica mai registrata colpisce la Terra", category: "scienza", importance: 2 },

    // Conferenza Internazionale dei Meridiani (ottobre 1884)
    { year: toNumber("01/10/1884"), title: "Apertura della Conferenza dei Meridiani a Washington: il meridiano di Greenwich adottato come riferimento mondiale", category: "politica", importance: 2 },

    // Primo SMS (3 dicembre 1992)
    { year: toNumber("03/12/1992"), title: "Invio del primo SMS della storia ('Merry Christmas') sulla rete Vodafone britannica", category: "tecnologia", importance: 2 }
];

const additionalKeyEvents = [
    // Esplorazione e aviazione
    { year: toNumber("15/06/1919"), title: "Alcock e Brown compiono la prima trasvolata atlantica senza scalo", category: "tecnologia", importance: 2 },
    
    // Archeologia
    { year: toNumber("12/09/1940"), title: "Scoperta della Grotta di Lascaux: capolavoro dell'arte paleolitica", category: "cultura", importance: 3 },
    
    // Scienza
    { year: toNumber("17/05/1861"), title: "James Clerk Maxwell realizza la prima fotografia a colori", category: "tecnologia", importance: 3 },
    
    // Esplorazione spaziale
    { year: toNumber("20/07/1976"), title: "Viking 1 atterra su Marte: primo atterraggio riuscito e analisi del suolo", category: "scienza", importance: 2 },
    
    // Grande scienza
    { year: toNumber("29/09/1954"), title: "Fondazione del CERN (Organizzazione Europea per la Ricerca Nucleare) a Ginevra", category: "scienza", importance: 2 },
    
    // Sport e istituzioni
    { year: toNumber("23/06/1894"), title: "Fondazione del Comitato Olimpico Internazionale (CIO) di de Coubertin", category: "cultura", importance: 3 },
    
    // Innovazione industriale
    { year: toNumber("07/10/1952"), title: "Brevetto del primo codice a barre per l'identificazione automatica dei prodotti", category: "tecnologia", importance: 3 }
];

const additionalHumanitarianEvents = [
    // Diritti umani e umanitari
    { year: toNumber("28/05/1961"), title: "Fondazione di Amnesty International: Peter Benenson lancia l'appello per i prigionieri dimenticati", category: "politica", importance: 3 },
    { year: toNumber("21/12/1971"), title: "Fondazione di Medici Senza Frontiere (MSF) a Parigi: soccorso medico indipendente", category: "politica", importance: 3 },
    { year: toNumber("26/07/1990"), title: "Firma dell'Americans with Disabilities Act (ADA): tutela contro le discriminazioni per disabilità", category: "politica", importance: 3 },
    { year: toNumber("01/04/2001"), title: "I Paesi Bassi legalizzano il matrimonio egualitario, prima nazione al mondo", category: "politica", importance: 2 },
    { year: toNumber("19/05/1919"), title: "Eglantyne Jebb fonda Save the Children a Londra per proteggere i bambini", category: "scienza", importance: 3 },
    { year: toNumber("15/05/1994"), title: "Gino Strada e colleghi fondano EMERGENCY a Milano per assistere le vittime civili di guerra", category: "scienza", importance: 3 },

    
    // Memoria e diritti
    { year: toNumber("27/01/1945"), title: "Liberazione di Auschwitz: l'Armata Rossa scopre l'orrore del campo di sterminio nazista", category: "politica", importance: 2 },
    
    // Ambiente
    { year: toNumber("03/06/1992"), title: "Inizio del Summit della Terra a Rio de Janeiro: prima grande conferenza ONU sul clima", category: "politica", importance: 2 },
    { year: toNumber("11/12/1997"), title: "Adozione del Protocollo di Kyoto: primo impegno globale vincolante contro il riscaldamento globale", category: "politica", importance: 2 },
    
    // Aviazione
    { year: toNumber("14/11/1910"), title: "Eugene Ely compie il primo decollo da una nave: nasce l'aviazione imbarcata", category: "tecnologia", importance: 3 }
];

const combinedExtinctAnimalsAndDinos = [
    // --- Mammiferi estinti ---
    { year: -400000, title: "Comparsa del Mammut lanoso (Mammuthus primigenius) nelle steppe eurasiatiche", category: "scienza", importance: 3 },
    { year: -1700, title: "Estinzione degli ultimi mammut lanosi sull'Isola di Wrangel, sopravvissuti alle estinzioni continentali", category: "scienza", importance: 3 },

    // --- Uccelli estinti ---
    { year: toNumber("18/09/1598"), title: "Primo avvistamento europeo del dodo (Raphus cucullatus) sull'isola Mauritius", category: "scienza", importance: 3 },
    { year: 1681, title: "Estinzione del dodo, icona delle specie spazzate via dall'arrivo dell'uomo", category: "scienza", importance: 2 },
    { year: toNumber("03/06/1844"), title: "Uccisione degli ultimi due esemplari di Alca impenne (Great Auk) a Eldey, Islanda", category: "scienza", importance: 3 },

    // --- Marsupiali estinti ---
    { year: toNumber("07/09/1936"), title: "Morte dell'ultimo tilacino (Tigre della Tasmania) nello zoo di Hobart", category: "scienza", importance: 3 },

    // --- Mammiferi marini estinti ---
    { year: 1768, title: "Estinzione della Ritina di Steller (Hydrodamalis gigas), il più grande mammifero marino sterminato dall'uomo", category: "scienza", importance: 3 },

    // --- Dinosauri: nuove specie (Anni puri per ere geologiche) ---
    { year: -155000000, title: "Comparsa dello Stegosauro (Stegosaurus stenops), iconico erbivoro corazzato del Giurassico", category: "scienza", importance: 3 },
    { year: -152000000, title: "Comparsa dell'Apatosauro (Apatosaurus ajax), gigantesco sauropode del Giurassico superiore", category: "scienza", importance: 3 },
    { year: -112000000, title: "Comparsa dello Spinosauro (Spinosaurus aegyptiacus), il più grande dinosauro carnivoro noto", category: "scienza", importance: 3 },
    { year: -75000000, title: "Comparsa del Velociraptor (Velociraptor mongoliensis), predatore piumato del tardo Cretaceo", category: "scienza", importance: 3 },

    // --- Scoperte paleontologiche storiche (Date documentate) ---
    { year: toNumber("15/07/1902"), title: "Scoperto il primo scheletro parziale di Tyrannosaurus rex a Hell Creek, Montana", category: "scienza", importance: 3 },
    { year: toNumber("13/07/1923"), title: "Scoperta delle prime uova di dinosauro nel deserto del Gobi (Mongolia)", category: "scienza", importance: 3 }
];

const tecnologiaEBellicaIndustriale = [
    // --- Età dei Metalli e Meccanica Antica ---
    { year: -3000, title: "Sviluppo dei primi pugnali a doppio taglio in bronzo in Mesopotamia", category: "tecnologia", importance: 4 },
    { year: -1600, title: "Comparsa delle spade lunghe a doppio taglio (Tipo A) nella civiltà micenea", category: "tecnologia", importance: 3 },
    { year: -399, title: "Dionisio il Vecchio commissiona a Siracusa l'invenzione del Gastraphetes (arco da pancia)", category: "tecnologia", importance: 3 },
    { year: -350, title: "Sviluppo della catapulta a torsione con matasse di tendini sotto Filippo II di Macedonia", category: "scienza", importance: 3 },

    // --- Sviluppo del Diritto e dei Brevetti ---
    { year: toNumber("19/06/1421"), title: "La Signoria di Firenze concede a Brunelleschi il primo brevetto per il 'Badalone'", category: "tecnologia", importance: 3 },
    { year: toNumber("19/03/1474"), title: "Emanazione dello Statuto dei Brevetti a Venezia, prima legge strutturata al mondo", category: "politica", importance: 2 },
    { year: 1594, title: "Galileo Galilei ottiene dal Senato veneziano un brevetto per una macchina per sollevare acqua", category: "scienza", importance: 2 },

    // --- Chimica e Armi da Fuoco ---
    { year: 850, title: "Prima formulazione della polvere da sparo da parte di alchimisti cinesi della Dinastia Tang", category: "scienza", importance: 2 },
    { year: 1126, title: "Inizio dell'uso di cilindri metallici per il lancio di proiettili durante l'assedio di Kaifeng", category: "tecnologia", importance: 3 },
    { year: toNumber("26/08/1346"), title: "Battaglia di Crécy: vittoria degli inglesi sui francesi, debutto dei cannoni campali negli scontri europei", category: "politica", importance: 2 },

    // --- Vapore, Elettricità e Scienza Moderna ---
    { year: toNumber("02/07/1698"), title: "Thomas Savery brevetta la macchina a vapore 'The Miner's Friend'", category: "tecnologia", importance: 2 },
    { year: 1769, title: "Nicolas-Joseph Cugnot testa il Fardier, il primo carro a vapore semovente", category: "tecnologia", importance: 3 },
    { year: toNumber("20/03/1800"), title: "Alessandro Volta comunica alla Royal Society l'invenzione della pila elettrica", category: "scienza", importance: 1 },
    { year: toNumber("02/05/1800"), title: "Nicholson e Carlisle realizzano la prima elettrolisi dell'acqua usando la pila di Volta", category: "scienza", importance: 2 },
    { year: toNumber("21/02/1804"), title: "Richard Trevithick fa correre la prima locomotiva a vapore su rotaie in Galles", category: "tecnologia", importance: 3 }
];

const events2015_2018 = [
  // --- 2015 ---
  { year: toNumber("07/01/2015"), title: "Attentato terroristico alla redazione di Charlie Hebdo a Parigi.", category: "politica", importance: 3 },
  { year: toNumber("25/04/2015"), title: "Terremoto di magnitudo 7.8 in Nepal: quasi 9.000 vittime.", category: "scienza", importance: 3 },
  { year: toNumber("14/07/2015"), title: "Accordo sul nucleare iraniano (P5+1).", category: "politica", importance: 3 },
  { year: toNumber("13/11/2015"), title: "Attentati coordinati a Parigi (Bataclan e altri siti).", category: "politica", importance: 3 },
  { year: toNumber("12/12/2015"), title: "Adozione dell'Accordo di Parigi sul clima (COP21).", category: "politica", importance: 3 },
  // --- 2016 ---
  { year: toNumber("22/03/2016"), title: "Attentati a Bruxelles (aeroporto e metro).", category: "politica", importance: 3 },
  { year: toNumber("14/07/2016"), title: "Strage sulla Promenade des Anglais a Nizza.", category: "politica", importance: 3 },
  { year: toNumber("24/08/2016"), title: "Terremoto in Centro Italia: distrutta Amatrice.", category: "scienza", importance: 3 },
  { year: toNumber("08/11/2016"), title: "Donald Trump eletto 45° Presidente USA.", category: "politica", importance: 3},
  // --- 2017 ---
  { year: toNumber("21/08/2017"), title: "Grande Eclissi Solare totale negli Stati Uniti.", category: "scienza", importance: 4 },
  { year: toNumber("25/08/2017"), title: "L'uragano Harvey tocca terra in Texas.", category: "scienza", importance: 4 },
  { year: toNumber("01/10/2017"), title: "Referendum per l'indipendenza della Catalogna, vittoria del 'Sì', dichiarato illegale dal governo spagnolo", category: "politica", importance: 4 },
  { year: toNumber("05/10/2017"), title: "Inchiesta Weinstein: esplode il movimento #MeToo.", category: "cultura", importance: 4 },
  // --- 2018 ---
  { year: toNumber("14/08/2018"), title: "Crollo del Viadotto Polcevera (Ponte Morandi) a Genova.", category: "politica", importance: 3 },
  { year: toNumber("28/10/2018"), title: "Jair Bolsonaro eletto Presidente del Brasile.", category: "politica", importance: 3 }
];


const events2024 = [
  { year: toNumber("01/01/2024"), title: "Terremoto di magnitudo 7.6 nella Prefettura di Ishikawa, Giappone: oltre 200 vittime e gravi danni strutturali.", category: "scienza", importance: 3 },
  { year: toNumber("16/02/2024"), title: "Morte di Alexei Navalny in un carcere siberiano: scompare il principale volto dell'opposizione russa.", category: "politica", importance: 3 },
  { year: toNumber("22/02/2024"), title: "Il lander Odysseus (Intuitive Machines) atterra sulla Luna: primo veicolo privato a compiere l'impresa.", category: "scienza", importance: 3 },
  { year: toNumber("07/03/2024"), title: "La Svezia entra nella NATO, diventando il 32° Stato membro.", category: "politica", importance: 4 },
  { year: toNumber("22/03/2024"), title: "Attentato dell'ISIS-K alla Crocus City Hall di Mosca: 145 morti, l'attacco più grave in Russia dal 2004.", category: "politica", importance: 3 },
  { year: toNumber("26/03/2024"), title: "Crollo del Francis Scott Key Bridge a Baltimora dopo l'urto della nave Dali: sei vittime.", category: "scienza", importance: 4 },
  { year: toNumber("08/04/2024"), title: "Eclissi solare totale in Nord America: evento astronomico mediatico con milioni di osservatori.", category: "scienza", importance: 4 },
  { year: toNumber("19/04/2024"), title: "Inizio delle elezioni in India: Narendra Modi ottiene il terzo mandato consecutivo.", category: "politica", importance: 5 },
  { year: toNumber("30/05/2024"), title: "Donald Trump condannato a New York per 34 capi d'accusa (caso Stormy Daniels): prima volta per un ex presidente.", category: "politica", importance: 3 },
  { year: toNumber("13/07/2024"), title: "Attentato a Donald Trump a Butler (PA): l'ex presidente sopravvive a un colpo d'arma da fuoco all'orecchio.", category: "politica", importance: 2 },
  { year: toNumber("11/10/2024"), title: "Il Premio Nobel per la Pace va a Nihon Hidankyo (sopravvissuti di Hiroshima e Nagasaki).", category: "cultura", importance: 4 },
  { year: toNumber("29/10/2024"), title: "Alluvione catastrofica (DANA) a Valencia, Spagna: oltre 220 morti e polemiche sulla gestione dell'allerta.", category: "scienza", importance: 3 },
  { year: toNumber("05/11/2024"), title: "Elezioni USA: Donald Trump sconfigge Kamala Harris e ottiene la maggioranza anche nel voto popolare.", category: "politica", importance: 2 },
  { year: toNumber("03/12/2024"), title: "Crisi in Corea del Sud: il presidente Yoon dichiara la legge marziale, revocata dopo poche ore dal Parlamento.", category: "politica", importance: 4 },
  { year: toNumber("07/12/2024"), title: "Riapertura solenne della Cattedrale di Notre-Dame a Parigi, cinque anni dopo l'incendio.", category: "cultura", importance: 4 }
];

const events2025_2026 = [
  // --- 2025 ---
  { year: toNumber("07/01/2025"), title: "Incendi devastanti a Los Angeles (Palisades): danni record stimati tra 150 e 250 miliardi di dollari.", category: "scienza", importance: 3 },
  { year: toNumber("23/01/2025"), title: "La Thailandia legalizza il matrimonio egualitario, prima nazione nel Sud-est asiatico.", category: "politica", importance: 3 },
  { year: toNumber("02/03/2025"), title: "Il lander Blue Ghost (Firefly Aerospace) effettua il primo allunaggio commerciale di successo nel Mare Crisium.", category: "scienza", importance: 3 },
  { year: toNumber("08/05/2025"), title: "Elezione di Papa Leone XIV (Robert Francis Prevost): primo Pontefice statunitense della storia.", category: "politica", importance: 3 },
  { year: toNumber("01/07/2025"), title: "Scoperta della cometa interstellare 3I/ATLAS, oggetto antichissimo risalente agli albori della galassia.", category: "scienza", importance: 4 },
  { year: toNumber("01/07/2025"), title: "Chiusura di USAID: l'agenzia governativa statunitense cessa le operazioni ufficiali.", category: "politica", importance: 4 },
  { year: toNumber("21/10/2025"), title: "Sanae Takaichi diventa la prima donna Primo Ministro nella storia del Giappone.", category: "politica", importance: 4 },
  { year: toNumber("10/10/2025"), title: "Accordo per il cessate il fuoco permanente nella guerra Israele-Hamas.", category: "politica", importance: 3 },
  // --- 2026 ---
  { year: toNumber("06/02/2026"), title: "Inaugurazione dei XXV Giochi Olimpici Invernali di Milano-Cortina 2026.", category: "cultura", importance: 5 },
  { year: toNumber("10/09/2026"), title: "Il servizio climatico europeo Copernicus registra agosto 2026 come il mese più caldo mai misurato, a pari merito con luglio 2023", category: "scienza", importance: 3 }
];


const cleopatraEvents = [
  { year: -69, title: "Nascita di Cleopatra VII ad Alessandria d'Egitto", category: "politica", importance: 4 },
  { year: -48, title: "Cleopatra incontra Giulio Cesare ad Alessandria e si alleano politicamente", category: "politica", importance: 2 },
  { year: -47, title: "Nascita di Cesarione, figlio di Cleopatra e Giulio Cesare", category: "politica", importance: 3 },
  { year: -44, title: "Cleopatra torna in Egitto e fa assassinare il fratello Tolomeo XIV, elevando Cesarione a co-reggente", category: "politica", importance: 3 },
  { year: -41, title: "Incontro tra Cleopatra e Marco Antonio a Tarso: inizio della loro relazione politica e amorosa", category: "politica", importance: 2 },
  { year: -40, title: "Nascita dei gemelli Alessandro Helios e Cleopatra Selene, figli di Cleopatra e Marco Antonio", category: "politica", importance: 4 },
  { year: -34, title: "Donazione di Alessandria: Marco Antonio riconosce Cleopatra come sovrana d'Egitto e dei territori orientali di Roma", category: "politica", importance: 2 },
  { year: toNumber("02/09/-31"), title: "Battaglia di Azio: la flotta di Ottaviano sconfigge quella di Cleopatra e Marco Antonio", category: "politica", importance: 2 },
  { year: toNumber("10/08/-30"), title: "Morte di Cleopatra, si suicida ad Alessandria per non essere portata a Roma come prigioniera. L'Egitto diventa una provincia romana", category: "politica", importance: 3 }
]

const middleBronzeAgeEvents = [
    // Politica e Storia Globale
    { year: -1900, title: "Gli Amorrei fondano la prima dinastia della città di Babilonia in Mesopotamia", category: "politica", importance: 2 },
    { year: -1792, title: "Hammurabi sale sul trono di Babilonia", category: "politica", importance: 3 },
    { year: -1650, title: "Gli Hyksos invadono il Basso Egitto, stabilendo la capitale ad Avaris e introducendo il carro da guerra", category: "politica", importance: 3 },
    { year: -1600, title: "Fondazione della Dinastia Shang in Cina, la prima dinastia storica supportata da prove archeologiche stabili", category: "politica", importance: 3 },
    { year: -1595, title: "Gli Ittiti guidati da Mursili I saccheggiano Babilonia, decretando la fine della dinastia di Hammurabi", category: "politica", importance: 3 },
    { year: -1550, title: "Ahmose I espelle gli Hyksos e fonda la XVIII Dinastia, inizio del Nuovo Regno d'Egitto", category: "politica", importance: 2 },

    // Cultura, Legge e Scienza
    { year: -1750, title: "Promulgazione del Codice di Hammurabi a Babilonia", category: "politica", importance: 1 },
    { year: -1750, title: "Redazione del Papiro matematico di Rhind, il testo scientifico egizio più completo su frazioni, algebra e geometria", category: "scienza", importance: 3 },
    { year: -1700, title: "Edificazione dei Secondi Palazzi a Creta: la Civiltà Minoica tocca l'apice del suo splendore architettonico", category: "cultura", importance: 2 },
    { year: -1600, title: "Creazione del Disco di Nebra in Germania centrale, la più antica rappresentazione accurata della volta celeste", category: "scienza", importance: 3 },
    { year: -3000, title: "Fioritura della civiltà di Los Millares in Spagna,  primo grande insediamento fortificato ed estrattivo d'Europa", category: "cultura", importance: 4 },
    { year: -2700, title: "Nascita della civiltà e del Regno di Elam nell'attuale Iran sud-occidentale", category: "politica", importance: 4 },
    { year: -2700, title: "Inizio della produzione della seta in Cina e sviluppo delle prime rotte commerciali", category: "tecnologia", importance: 4 },
    { year: -2200, title: "Evento climatico del 4.2 ka BP: siccità globale causa il collasso dell'Antico Regno egizio e accelera la fine di Akkad", category: "scienza", importance: 2 },
    { year: -3500, title: "Fase di Naqada II in Egitto: nascita dei primi proto-stati dinastici lungo il Nilo e prime reti commerciali stabili con il Levante", category: "politica", importance: 4 },
    { year: -3300, title: "Epoca di Ötzi (Uomo del Similaun): testimonianza biologica e tecnologica dell'Età del Rame in Europa centrale", category: "scienza", importance: 3 },
    { year: -3300, title: "Sviluppo della cultura di Liangzhu in Cina: edificazione del più antico sistema monumentale di dighe della storia", category: "tecnologia", importance: 3 }
];

const unifiedAgesTransitions = [
    { year: -2500000, title: "Inizio dell'Età della Pietra (Paleolitico)", category: "tecnologia", importance: 1 },
    // ==========================================
    // LE ETÀ DEI METALLI (Preistoria / Protostoria)
    // ==========================================
    { year: -5000, title: "Inizio dell'Età del Rame (Calcolitico) nel Vicino Oriente ed Europa", category: "tecnologia", importance: 1 },
    { year: -3000, title: "Inizio dell'Età del Bronzo e della 'Storia Antica'", category: "tecnologia", importance: 1 },
    { year: -1200, title: "Inizio dell'Età del Ferro nel Mediterraneo e nel Vicino Oriente", category: "tecnologia", importance: 1 },

    // ==========================================
    // LE GRANDI EPOCHE STORICHE
    // ==========================================
    { year: -479, title: "Inizio dell'Età Classica in Grecia (fine delle Guerre Persiane)", category: "politica", importance: 1 },
    { year: 476, title: "Inizio del Medioevo: la caduta dell'Impero Romano d'Occidente chiude l'Antichità Classica", category: "politica", importance: 1 },
    { year: 1492, title: "Inizio dell'Età Moderna: la scoperta delle Americhe chiude il Medioevo", category: "politica", importance: 1 },
    { year: 1789, title: "Inizio dell'Età Contemporanea: la Rivoluzione Francese chiude l'Età Moderna", category: "politica", importance: 1 }
];

const nuoviEventiAntichi = [
        // Nuovi eventi del I secolo (0s)
    { year: 30, title: "Nascita dell'Impero Kushan nell'Asia centrale", category: "politica", importance: 3 },
    { year: 40, title: "Rivolta delle sorelle Trung in Vietnam contro il dominio cinese Han", category: "politica", importance: 3 },
    { year: 49, title: "Concilio di Gerusalemme (il Cristianesimo inizia a separarsi dal Giudaismo)", category: "cultura", importance: 2 },
    { year: 62, title: "Il Buddismo viene introdotto ufficialmente in Cina dall'imperatore Ming", category: "cultura", importance: 2 },
    { year: toNumber("18/07/0064"), title: "Grande incendio di Roma", category: "politica", importance: 2 },
    { year: 77, title: "Plinio il Vecchio pubblica la 'Naturalis Historia', la prima enciclopedia della storia", category: "scienza", importance: 2 },
    { year: 96, title: "Nerva diventa imperatore: inizia l'era degli Imperatori Adottivi a Roma", category: "politica", importance: 2 },

    // Nuovi eventi del II secolo (100s)
    { year: 120, title: "Galeno di Pergamo inizia gli studi che rivoluzioneranno la medicina antica", category: "scienza", importance: 2 },
    { year: toNumber("31/12/0192"), title: "Assassinio di Commodo e fine della dinastia degli Antonini a Roma", category: "politica", importance: 3 },

        // Nuovi eventi del I secolo a.C.
    { year: -86, title: "Silla saccheggia Atene e sottomette la Grecia definitivamente a Roma", category: "politica", importance: 2 },
    { year: -63, title: "Pompeo conquista Gerusalemme: la Giudea diventa uno stato protetto da Roma", category: "politica", importance: 2 },
    { year: -53, title: "Disastrosa Battaglia di Carre: Crasso viene ucciso dai Parti", category: "politica", importance: 2 },
    { year: -45, title: "Entra in vigore il Calendario Giuliano, antenato del nostro calendario", category: "tecnologia", importance: 2 },
    { year: toNumber("23/10/-42"), title: "Battaglia di Filippi: Bruto e Cassio vengono sconfitti da Antonio e Ottaviano", category: "politica", importance: 2 },
    { year: -20, title: "Introduzione del Buddismo in Sri Lanka e prima scrittura del Canone Pali", category: "cultura", importance: 3 },
    { year: -12, title: "Inizio della costruzione della città maya di Teotihuacan in Messico", category: "cultura", importance: 3 },
    { year: toNumber("01/08/-30"), title: "Suicidio di Marco Antonio ad Alessandria d'Egitto dopo la sconfitta di Azio", category: "politica", importance: 4 },
        // Nuovi eventi del II secolo a.C. (200 a.C. - 101 a.C.)
    { year: toNumber("22/05/-197"), title: "Battaglia di Cinocefale: i Romani sconfiggono la Macedonia di Filippo V", category: "politica", importance: 3 },
    { year: -190, title: "Battaglia di Magnesia: i Romani sconfiggono l'Impero Seleucide di Antioco III", category: "politica", importance: 2 },
    { year: -166, title: "Terenzio mette in scena l'Andria a Roma, rivoluzionando la commedia latina", category: "cultura", importance: 3 },
    { year: -155, title: "L'ambasceria dei filosofi greci a Roma introduce ufficialmente la filosofia stoica ed epicurea nell'élite romana", category: "cultura", importance: 3 },
    { year: -113, title: "Inizio delle guerre cimbriche: le tribù germaniche dei Cimbri e dei Teutoni invadono i confini romani", category: "politica", importance: 2 },
        // Nuovi eventi del III secolo a.C.
    { year: -293, title: "Costruzione del primo orologio solare (meridiana) pubblico a Roma", category: "tecnologia", importance: 3 },
    { year: -261, title: "Battaglia di Agrigento: prima grande vittoria terrestre di Roma contro Cartagine", category: "politica", importance: 3 },
    { year: -244, title: "Completamento della Via Appia fino a Brindisi, asse strategico per l'espansione romana", category: "tecnologia", importance: 3 },
    { year: -230, title: "Il filosofo Crisippo diventa capo della Stoa, formalizzando la logica stoica", category: "cultura", importance: 4 },
    { year: toNumber("22/06/-217"), title: "Battaglia di Rafah: Tolomeo IV sconfigge Antioco III nel più grande scontro tra elefanti della storia", category: "politica", importance: 2 },
        // Nuovi eventi del IV secolo a.C.
    { year: -371, title: "Battaglia di Leuttra: l'esercito tebano di Epaminonda distruge il mito dell'invincibilità spartana", category: "politica", importance: 3 },
    { year: toNumber("07/08/-338"), title: "Battaglia di Crannon: i Macedoni sconfiggono Atene, segnando la fine definitiva della democrazia ateniese", category: "politica", importance: 2 },
    { year: toNumber("22/05/-334"), title: "Battaglia del Granico: primo scontro campale e vittoria di Alessandro Magno contro l'Impero Persiano", category: "politica", importance: 2 },
    { year: -326, title: "La Lex Poetelia-Papiria abolisce a Roma la schiavitù per debiti (nexum), rivoluzionando la società romana", category: "politica", importance: 3 },
    { year: toNumber("28/09/-301"), title: "Battaglia di Ipso: scontro finale e definitivo tra i Diadochi che sancisce la divisione permanente dell'impero di Alessandro", category: "politica", importance: 2 },
    { year: -306, title: "Epicuro fonda la sua scuola ad Atene ('Il Giardino'), basata sulla ricerca del piacere e sull'assenza di dolore", category: "cultura", importance: 2 },
    { year: -300, title: "Zenone di Cizio fonda la scuola dello Stoicismo ad Atene presso la Stoà Poikìle", category: "cultura", importance: 3 },
    { year: -340, title: "Diogene di Sinope sviluppa il Cinismo, predicando l'autarchia e il rifiuto radicale delle convenzioni sociali", category: "cultura", importance: 3 },
    

    // Nuovi eventi del V secolo a.C. (500 a.C.)
    { year: -450, title: "Zenone di Elea formula i suoi celebri paradossi contro il movimento, inventando la dimostrazione per assurdo", category: "cultura", importance: 2 },
    { year: -450, title: "Protagora formula il principio dell'uomo-misura ('l'uomo è misura di tutte le cose'), fondando il relativismo occidentale", category: "cultura", importance: 3 },
    { year: -444, title: "Gorgia scrive il trattato 'Sul non essere', fondando il nichilismo e portando la retorica sofistica al suo culmine", category: "cultura", importance: 4 },

        // Nuovi eventi del VI secolo a.C.
    { year: -547, title: "Battaglia di Thymbra: Ciro il Grande sconfigge Creso, re di Lidia, conquistando l'Asia Minore", category: "politica", importance: 2 },
    { year: toNumber("15/05/-525"), title: "Battaglia di Pelusio: i Persiani sconfiggono gli Egizi usando scudi con l'immagine di gatti sacri, annettendo l'Egitto", category: "politica", importance: 2 },
    { year: -520, title: "Consacrazione del Secondo Tempio di Gerusalemme, centro della rinascita spirituale ebraica", category: "cultura", importance: 2 },
    { year: -515, title: "Il filosofo Parmenide scrive il poema 'Sulla Natura', fondando l'ontologia", category: "cultura", importance: 3 },
    { year: -500, title: "Fioritura della civiltà Zapoteca a Monte Albán (Messico) con i primi sistemi di scrittura americani", category: "cultura", importance: 3 },
        // Nuovi eventi del VII secolo a.C. (600 a.C.)
    { year: -700, title: "Esiodo scrive la Teogonia, codificando per la prima volta i miti degli dei greci", category: "cultura", importance: 2 },
    { year: -673, title: "Tullo Ostilio diventa terzo re di Roma: inizia l'espansione militare romana nel Lazio", category: "politica", importance: 3 },
    { year: -657, title: "Fondazione di Bisanzio (futura Costantinopoli) da parte dei coloni greci di Megara", category: "politica", importance: 2 },
    { year: -625, title: "Inizio della fioritura della civiltà Etrusca in Italia centrale", category: "cultura", importance: 2 },
    { year: -621, title: "Codice di Dracone ad Atene: prime leggi scritte della città, celebri per la loro severità", category: "politica", importance: 2 },
        // Nuovi eventi dell'VIII secolo a.C. (800 a.C.)
    { year: -750, title: "I coloni greci fondano Ischia (Pithecusa) e Cuma, dando inizio alla colonizzazione della Magna Grecia", category: "politica", importance: 2 },
    { year: -745, title: "Tiglat-pileser III sale al trono: nasce il potente Impero Neo-Assiro come prima superpotenza militare moderna", category: "politica", importance: 2 },
    { year: -734, title: "I Corinzi fondano Siracusa, destinata a diventare la più potente polis della Sicilia", category: "politica", importance: 3 },
    { year: -715, title: "Numa Pompilio diventa secondo re di Roma: istituisce i principali culti religiosi e il calendario romano", category: "politica", importance: 2 },
    { year: -701, title: "Il re assiro Sennacherib cinge d'assedio Gerusalemme, ma la città resiste miracolosamente", category: "politica", importance: 3 },
    // Nuovi eventi del IX secolo a.C. (900 a.C.)
    { year: -900, title: "Inizio della cultura di Villanova in Italia, base dello sviluppo della civiltà etrusca", category: "cultura", importance: 3 },
    { year: -875, title: "Fondazione di Samaria, che diventa la capitale stabile del Regno d'Israele", category: "politica", importance: 3 },
    { year: -853, title: "Battaglia di Qarqar: una coalizione di dodici re ferma temporaneamente l'avanzata assira", category: "politica", importance: 2 },
    { year: -841, title: "Il re assiro Salmanassar III riceve il tributo di Jehu, re d'Israele (documentato sull'Obelisco Nero)", category: "politica", importance: 4 },
        // Nuovi eventi del X secolo a.C. (1000 a.C.)
    { year: -1000, title: "I Fenici stabiliscono le prime rotte commerciali stabili oltre lo Stretto di Gibilterra", category: "politica", importance: 2 },
    { year: -1000, title: "Nascita della cultura dei Campi d'Urne nell'Europa centrale, che diffonde la lavorazione del bronzo", category: "cultura", importance: 3 },
    { year: -950, title: "Fondazione della città di Sparta in Laconia da parte dei Dori", category: "politica", importance: 2 },
    { year: -950, title: "Primi insediamenti stabili sul colle Palatino (nucleo protostorico della futura Roma)", category: "politica", importance: 3 },
    { year: -945, title: "Il faraone Sheshonq I fonda la XXII dinastia in Egitto, ridando vigore alla geopolitica egizia", category: "politica", importance: 3 },
        // Nuovi eventi dell'XI secolo a.C. (1100 a.C.)
    { year: -1100, title: "I Popoli del Mare distruggono definitivamente l'Impero Ittita e devastano il Vicino Oriente", category: "politica", importance: 1 },
    { year: -1077, title: "Inizio del Terzo Periodo Intermedio in Egitto e frammentazione del potere dei faraoni", category: "politica", importance: 2 },
    { year: -1050, title: "I Filistei sconfiggono gli Israeliti nella Battaglia di Afek e catturano l'Arca dell'Alleanza", category: "politica", importance: 3 },
    { year: -1020, title: "Saul viene consacrato primo re d'Israele, unificando le dodici tribù contro la minaccia filistea", category: "politica", importance: 2 },
        // Nuovi eventi del XII secolo a.C. (1200 a.C.)
    { year: -1200, title: "Distruzione dei palazzi micenei di Micene e Tirinto (inizio del Medioevo ellenico)", category: "politica", importance: 2 },
    { year: -1175, title: "Battaglia del Delta: Ramses III sconfigge i Popoli del Mare, salvando l'Egitto dall'invasione", category: "politica", importance: 2 },
    { year: -1155, title: "Gli Elamiti saccheggiano Babilonia e rubano la stele del Codice di Hammurabi", category: "politica", importance: 3 },
    { year: -1125, title: "Nabucodonosor I diventa re di Babilonia e sconfigge l'Impero Elamita, restaurando l'orgoglio babilonese", category: "politica", importance: 3 },
        // Nuovi eventi del XIII secolo a.C. (1300 a.C.)
    { year: -1300, title: "Fioritura della Civiltà Nuragica in Sardegna con la costruzione dei complessi nuragici più monumentali", category: "cultura", importance: 3 },
    { year: -1250, title: "Costruzione della Porta dei Leoni a Micene, massima espressione dell'architettura monumentale achea", category: "cultura", importance: 3 },
    { year: -1237, title: "Battaglia di Nihriya: l'Impero Assiro sconfigge gli Ittiti, avviando la propria ascesa come superpotenza mesopotamica", category: "politica", importance: 2 },
    { year: -1213, title: "Morte di Ramses II dopo 66 anni di regno: inizia il lento declino politico del Nuovo Regno egizio", category: "politica", importance: 2 },
        // Nuovi eventi del XIV secolo a.C. (1400 a.C.)
    { year: -1400, title: "Costruzione della rocca monumentale di Micene e inizio dell'apogeo della civiltà micenea", category: "politica", importance: 2 },
    { year: -1350, title: "Šuppiluliuma I sale al trono degli Ittiti, trasformando il regno in un impero dominante nel Vicino Oriente", category: "politica", importance: 2 },
    { year: -1323, title: "La misteriosa morte di Zannanza, principe ittita inviato a sposare la vedova di Tutankhamon, scatena la guerra tra Egizi e Ittiti", category: "politica", importance: 3 },
    { year: toNumber("24/06/-1312"), title: "Eclissi solare di Mursili: rarissimo evento astronomico registrato negli annali ittiti che fissa la cronologia assoluta del Vicino Oriente", category: "scienza", importance: 2 },
        // Nuovi eventi del XV secolo a.C. (1500 a.C.)
    { year: -1500, title: "Fioritura della civiltà dei Tumuli nell'Europa centrale e diffusione della metallurgia avanzata", category: "cultura", importance: 3 },
    { year: -1500, title: "I Cassiti conquistano definitivamente Babilonia, avviando una dinastia stabile che durerà secoli", category: "politica", importance: 2 },
    { year: toNumber("16/04/-1457"), title: "Battaglia di Megiddo: Thutmose III sconfigge una coalizione di principi cananei guidata dal re di Qadesh", category: "politica", importance: 2 },
    { year: -1401, title: "La dinastia Shang in Cina trasferisce la propria capitale a Yin (Anyang), iniziando il suo massimo apogeo archeologico", category: "politica", importance: 2 },
    // Nuovi eventi del XIX secolo a.C. (1900 a.C.)
    { year: -1900, title: "Sviluppo della cultura dei Tumuli di Armorica in Francia, che dà inizio all'Età del Bronzo nel Nord-Ovest europeo", category: "cultura", importance: 3 },
    { year: -1813, title: "Shamshi-Adad I sale al trono, fondando il Primo Impero Assiro e conquistando l'alta Mesopotamia", category: "politica", importance: 2 },

    // Nuovi eventi del XVIII secolo a.C. (1800 a.C.)
    { year: -1764, title: "Hammurabi sconfigge una coalizione guidata da Elam, stabilendo la supremazia totale di Babilonia", category: "politica", importance: 2 },
    { year: -1720, title: "Gli Hyksos invadono l'Egitto e si insediano nel Delta, introducendo l'uso militare del cavallo e del carro", category: "politica", importance: 1 },
    // Nuovi eventi del XXI secolo a.C. (2100 a.C.)
    { year: -2040, title: "Mentuhotep II sconfigge i sovrani di Eracleopoli e unifica l'Egitto, fondando il Medio Regno", category: "politica", importance: 2 },
    { year: -2004, title: "Gli Elamiti saccheggiano la città di Ur, provocando il crollo definitivo della Terza Dinastia di Ur e dell'Impero Sumero", category: "politica", importance: 1 },

    // Nuovi eventi del XX secolo a.C. (2000 a.C.)
    { year: -1900, title: "Inizio del declino della Civiltà della Valle dell'Indo (Mohenjo-daro e Harappa) a causa di mutamenti climatici", category: "politica", importance: 2 },
    { year: -1900, title: "Nascita della cultura di Unetice nell'Europa centrale, considerata l'alba della vera Età del Bronzo europea", category: "cultura", importance: 3 },
    // Nuovi eventi del XXVI secolo a.C. (2600 a.C.)
    { year: -2580, title: "Completamento della Sfinge di Giza e della Piramide di Chefren in Egitto", category: "cultura", importance: 2 },

    // Nuovi eventi del XXV secolo a.C. (2500 a.C.)
    { year: -2494, title: "Inizio della V dinastia in Egitto: i Faraoni incidono i Testi delle Piramidi, la più antica letteratura religiosa nota", category: "cultura", importance: 2 },

    // Nuovi eventi del XXIV secolo a.C. (2400 a.C.)
    { year: -2350, title: "Urukagina diventa re di Lagash e promulga i suoi editti contro la corruzione e gli abusi di potere", category: "politica", importance: 3 },
    { year: -2300, title: "La principessa Enheduanna, figlia di Sargon, compone i suoi inni sacri diventando la prima scrittrice della storia firmata con un nome", category: "cultura", importance: 2 },
    // Nuovi eventi del XXXI/XXX secolo a.C. (3000 a.C.)
    { year: -3100, title: "Unificazione dell'Alto e Basso Egitto sotto il re Narmer (Menes): nasce la I dinastia e lo Stato egizio", category: "politica", importance: 1 },
    { year: -3000, title: "Fondazione della città di Menfi, prima grande capitale dell'Egitto unificato", category: "politica", importance: 3 },

    // Nuovi eventi del XXIX secolo a.C. (2900 a.C.)
    { year: -2900, title: "Grande alluvione mesopotamica a Shuruppak e Kish (evento storico all'origine del mito del Diluvio Universale)", category: "scienza", importance: 3 },

    // Nuovi eventi del XXVIII secolo a.C. (2800 a.C.)
    { year: -2800, title: "Regno del mitico re Gilgamesh a Uruk, che fa erigere le monumentali mura della città", category: "politica", importance: 2 },

        // === EVENTI MANCANTI INDIVIDUATI ===

    // Cultura & Religione Preistorica
    { year: -9500, title: "Costruzione del tempio megalitico di Göbekli Tepe in Turchia (primo luogo di culto monumentale della storia)", category: "cultura", importance: 1 },

    // Innovazioni Alimentari & Tecnologiche nel Vicino Oriente
    { year: -7000, title: "Invenzione della fermentazione e prima produzione controllata di birra e vino nel Vicino Oriente", category: "tecnologia", importance: 2 },

    // Sviluppo dell'Asia Orientale (Cina)
    { year: -7000, title: "Addomesticamento del maiale e del miglio lungo il Fiume Giallo (Cultura di Peiligang)", category: "tecnologia", importance: 2 },
    { year: -5000, title: "Sviluppo della Cultura di Yangshao in Cina: nascita dei primi villaggi stanziali complessi e ceramica dipinta", category: "cultura", importance: 2 },

    // Agricoltura nelle Americhe e in Africa
    { year: -5000, title: "Addomesticamento della patata nella regione andina, pilastro per le future civiltà sudamericane", category: "tecnologia", importance: 2 },
    { year: -4000, title: "Inizio della transizione agricola nell'Africa sub-sahariana con l'addomesticamento di sorgo e miglio nel Sahel", category: "tecnologia", importance: 2 },

    // Megalitismo Europeo
    { year: -4800, title: "Inizio del megalitismo in Europa atlantica (Bretagna e Portogallo): costruzione dei primi tumuli e menhir", category: "cultura", importance: 2 },

    // Grandi Svolte Tecnologiche ed Economiche della prima urbanizzazione
    { year: -4000, title: "Invenzione dei primi sistemi di irrigazione canalizzata in Mesopotamia, fondamentale per la nascita delle città", category: "tecnologia", importance: 1 },
    { year: -3400, title: "Rivoluzione dei prodotti secondari: sfruttamento intensivo degli animali vivi per latte, lana e forza motrice", category: "tecnologia", importance: 2 },
    { year: -3100, title: "Introduzione dei primi sistemi standardizzati di pesi e misure per il commercio e la tassazione a Sumer", category: "politica", importance: 2 },

    { year: -5500, title: "Nascita della vera metallurgia estrattiva tramite la fusione del rame in forni (Vicino Oriente e Balcani)", category: "tecnologia", importance: 1 },
    { year: -5000, title: "Introduzione dei primi mattoni di fango cotti al sole in Mesopotamia, rivoluzione per l'architettura domestica", category: "tecnologia", importance: 2 },
    { year: -4500, title: "Nascita delle prime reti commerciali a lunga distanza (ossidiana, lapislazzuli e rame) tra Anatolia, Iran ed Egitto", category: "cultura", importance: 2 },
    { year: -4500, title: "Transizione dall'egualitarismo alla stratificazione sociale stanziale con la nascita delle prime figure di capo-sacerdote", category: "politica", importance: 1 },
    { year: -3500, title: "Nascita della prima burocrazia a Uruk tramite l'uso di sigilli di argilla (cretulae) e gettoni di conto", category: "politica", importance: 1 },
    { year: -3100, title: "Sviluppo dei primi calendari solari e lunari in Egitto e Mesopotamia per il controllo dei cicli agricoli", category: "scienza", importance: 1 },

    { year: -45000, title: "Diffusione di Homo sapiens in Europa", category: "politica", importance: 2 },
    { year: -36000, title: "Realizzazione dei dipinti della Grotta Chauvet", category: "cultura", importance: 2 },
    { year: -12000, title: "Estinzione del mammut lanoso nella maggior parte dell'Eurasia", category: "scienza", importance: 2 },

   // --- EVOLUZIONE UMANA E STRUMENTI ---
    { year: -2000000, title: "Sviluppo definitivo del bipedismo obbligato e proporzioni corporee moderne (Homo ergaster)", category: "scienza", importance: 1 },
    { year: -1800000, title: "Fossili di Dmanisi (Georgia): prima testimonianza del genere Homo fuori dall'Africa", category: "scienza", importance: 2 },
    { year: -800000, title: "Primi insediamenti umani in Europa occidentale (Homo antecessor a Atapuerca)", category: "scienza", importance: 2 },
    { year: -300000, title: "Sviluppo della tecnologia litica di Modo 3 (Tecnica Levallois per scheggiatura predeterminata)", category: "tecnologia", importance: 2 },
    { year: -250000, title: "Evoluzione e divergenza dell'Uomo di Denisova in Asia (linea sorella dei Neanderthal)", category: "scienza", importance: 2 },

    // --- LINGUAGGIO E CULTURA (Mancano completamente) ---
    { year: -500000, title: "Presenza dell'osso ioide moderno in Homo heidelbergensis (potenziale origine del linguaggio articolato)", category: "scienza", importance: 2 },
    { year: -176000, title: "Strutture misteriose nella grotta di Bruniquel: prime prove di attività profonda e simbolica dei Neanderthal", category: "scienza", importance: 3 },
    { year: -120000, title: "Prime prove di utilizzo di pigmenti (ocra) e ornamenti personali (conchiglie forate) in Africa", category: "cultura", importance: 2 },

    // --- GEOLOGIA E AMBIENTE ---
    { year: -773000, title: "Inversione magnetica di Brunhes-Matuyama (ultimo scambio dei poli magnetici terrestri)", category: "scienza", importance: 1 },
    { year: -42000, title: "Escursione di Laschamp: inversione temporanea abortita (durata solo 440 anni)", category: "scienza", importance: 2 },
    { year: -1070000, title: "Inizio del Sub-crono di Jaramillo (breve fase di inversione del campo magnetico terrestre)", category: "scienza", importance: 3 },
    { year: -1950000, title: "Inizio del Sub-crono di Olduvai (breve fase di inversione del campo magnetico terrestre)", category: "scienza", importance: 3 },
    { year: -2581000, title: "Inversione Gauss-Matuyama: grande ribaltamento del campo magnetico terrestre all'inizio del Quaternario", category: "scienza", importance: 1 },
    { year: -3330000, title: "Inversione Gilbert-Gauss: il campo magnetico terrestre passa a polarità normale", category: "scienza", importance: 2 },
    { year: -83000000, title: "Fine del Supercrono Normale del Cretaceo (campo magnetico terrestre stabile per 40 milioni di anni)", category: "scienza", importance: 2 },
    { year: -262000000, title: "Fine del Supercrono Kiaman (campo magnetico terrestre bloccato in polarità inversa per 50 milioni di anni)", category: "scienza", importance: 2 },

    // ARCHEANO / PROTEROZOICO
    { year: -2023000000, title: "Impatto di Vredefort (il più antico e grande cratere da impatto verificato sulla Terra)", category: "scienza", importance: 3 },
    { year: -1400000000, title: "Comparsa dei primi funghi (organismi eucarioti eterotrofi terrestri e acquatici)", category: "scienza", importance: 2 },
    { year: -750000000, title: "Inizio della frammentazione del supercontinente Rodinia", category: "scienza", importance: 2 },

    // PALEOZOICO (Ordoviciano / Siluriano / Devoniano)
    { year: -465000000, title: "Grande evento di biodiversificazione dell'Ordoviciano (GOBE)", category: "scienza", importance: 2 },
    { year: -420000000, title: "Evoluzione delle mascelle nei pesci (Gnatostomi, rivoluzione nei predatori marini)", category: "scienza", importance: 1 },
    { year: -390000000, title: "Primi vertebrati che compiono le prime escursioni sulla terraferma", category: "scienza", importance: 2 },

    // PALEOZOICO (Carbonifero)
    { year: -320000000, title: "Gigantismo degli artropodi (insetti e millepiedi giganti favoriti dall'altissimo livello di ossigeno)", category: "scienza", importance: 2 },

    // MESOZOICO (Triassico)
    { year: -247000000, title: "Inizio del recupero biologico post-Permiano e comparsa dei primi veri rettili marini", category: "scienza", importance: 3 },
    { year: -234000000, title: "Evento Pluviale Carnico (crisi climatica globale che favorisce l'espansione dei dinosauri)", category: "scienza", importance: 2 },

    // GIURASSICO / CRETACEO
    { year: -180000000, title: "Frammentazione definitiva della Pangea in due supercontinenti: Laurasia e Gondwana", category: "scienza", importance: 1 },
    { year: -120000000, title: "Estinzione di massa del Aptiano-Albiano (crisi anossica oceanica)", category: "scienza", importance: 2 },
    { year: -91500000, title: "Evento Anossico Oceanico 2 (OAE2): collasso dell'ossigeno nei mari e picco dell'effetto serra cretaceo", category: "scienza", importance: 2 },
    { year: -66000000, title: "Estinzione di massa del Cretaceo-Paleogene (impatto dell'asteroide di Chicxulub e fine dei dinosauri non aviani)", category: "scienza", importance: 1 },

    // CENOZOICO (Eocene / Oligocene / Miocene)
    { year: -34000000, title: "Grande Rottura dell'Eocene-Oligocene: rapido raffreddamento globale ed estinzione di massa di molte specie marine e terrestri", category: "scienza", importance: 1 },
    { year: -15000000, title: "Ottimo climatico del Miocene: ultimo grande periodo caldo prima delle ere glaciali moderne", category: "scienza", importance: 2 },

    // PLIOCENE / PLEISTOCENE (Evoluzione Umana)
    { year: -1800000, title: "Grande migrazione di Homo erectus (Out of Africa I): colonizzazione di Eurasia e Sud-est asiatico", category: "scienza", importance: 1 }

];

const Cartoons = [
    // Fondazione della Warner Bros. (Evento epocale)
    { year: toNumber("04/04/1923"), title: "Fondazione di Warner Bros. Pictures", category: "cultura", importance: 3 },

    // Il debutto delle Silly Symphonies (Grande impatto storico)
    { year: toNumber("22/08/1929"), title: "Uscita di 'The Skeleton Dance' (Prima Silly Symphony)", category: "cultura", importance: 4 },

    // Il debutto delle Merrie Melodies (Grande impatto storico)
    { year: toNumber("13/06/1931"), title: "Uscita di 'Lady, Play Your Mandolin!' (Prima Merrie Melodie)", category: "cultura", importance: 4 },

    // Debutto di un personaggio iconico mondiale (Rilevanza alta)
    { year: toNumber("09/06/1934"), title: "Debutto di Paperino nel corto 'La gallinella saggia'", category: "cultura", importance: 4 },

    // Nascita del simbolo Warner Bros. (Rilevanza alta)
    { year: toNumber("27/07/1940"), title: "Debutto di Bugs Bunny in 'Caccia alla lepre'", category: "cultura", importance: 4 },

    // La nascita della prima serie storica di corti Warner (Grande impatto storico)
    { year: toNumber("19/04/1930"), title: "Uscita di 'Sinkin' in the Bathtub' (Prima Looney Tune)", category: "cultura", importance: 4 },

    // Debutto di un pilastro della Warner (Medio-alto interesse storico)
    { year: toNumber("17/04/1937"), title: "Debutto di Daffy Duck nel corto 'Porky's Duck Hunt'", category: "cultura", importance: 5 },

    { year: toNumber("15/06/1985"), title: "Hayao Miyazaki, Isao Takahata e Toshio Suzuki fondano lo Studio Ghibli a Tokyo", category: "cultura", importance: 4 },
    { year: toNumber("23/03/2003"), title: "'La città incantata' di Miyazaki vince il Premio Oscar come miglior film d'animazione", category: "cultura", importance: 4 },
    { year: toNumber("24/03/2002"), title: "Primo Premio Oscar della storia per il Miglior film d'animazione, assegnato a 'Shrek'", category: "cultura", importance: 4 }

];

const MeccanicaCeleste = [
    
    // Prima soluzione geometrica ai punti di equilibrio (Alta importanza)
    { year: toNumber("17/06/1767"), title: "Leonhard Euler scopre le prime tre soluzioni periodiche collineari per il problema dei tre corpi", category: "scienza", importance: 4 },

    // Scoperta dei punti lagrangiani (Alta importanza)
    { year: toNumber("01/03/1772"), title: "Joseph-Louis Lagrange scopre i punti di equilibrio orbitale a triangolo equilatero nel problema dei tre corpi", category: "scienza", importance: 4 },

    // Il teorema che dimostra l'impossibilità di una soluzione analitica generale (Epocale)
    { year: toNumber("20/01/1889"), title: "Henri Poincaré vince il premio di Re Oscar II dimostrando l'inesistenza di soluzioni matematiche generali per il problema dei tre corpi, scopre il caos deterministico", category: "scienza", importance: 3 },

    // Prima soluzione geometrica globale formale (Media importanza)
    { year: toNumber("20/12/1912"), title: "Karl Sundman pubblica la prima soluzione analitica globale del problema dei tre corpi tramite serie infinite convergenti", category: "scienza", importance: 5 },

    // Fondazione della moderna teoria della stabilità orbitale (Epocale)
    { year: toNumber("01/09/1954"), title: "Andrey Kolmogorov enuncia il Teorema KAM, definendo le condizioni di stabilità sul lungo termine dei sistemi dinamici e planetari", category: "scienza", importance: 2 },

    // La tecnologia dimostra che il Sistema Solare è caotico (Media importanza)
    { year: toNumber("03/07/1989"), title: "Jacques Laskar dimostra tramite simulazioni numeriche al computer che le orbite del Sistema Solare interno sono intrinsecamente caotiche", category: "scienza", importance: 4 },

    // Nuova spettacolare soluzione a forma di 'otto' (Importanza relativa)
    { year: toNumber("01/12/2000"), title: "Alain Chenciner e Richard Montgomery dimostrano che esiste una soluzione a forma di 'otto' per il problema dei tre corpi con masse uguali", category: "scienza", importance: 5 },

    // La quantificazione statistica del destino del Sistema Solare (Alta importanza)
    { year: toNumber("11/06/2009"), title: "Jacques Laskar e Mickaël Gastineau pubblicano uno studio basato su 2.501 simulazioni al computer, dimostrando una probabilità dell'1% che Mercurio causi il collasso orbitale dei pianeti interni entro 5 miliardi di anni", category: "scienza", importance: 3 }

];

const QuantumEPR = [
    // 1. L'origine del dibattito: Il Paradosso EPR (Importanza alta)
    { year: toNumber("15/05/1935"), title: "Albert Einstein, Boris Podolsky e Nathan Rosen pubblicano il paradosso EPR, contestando la completezza della meccanica quantistica e ipotizzando l'esistenza di variabili nascoste locali", category: "scienza", importance: 3 },

    // 2. La svolta teorica: Il Teorema di Bell (Epocale)
    { year: toNumber("04/11/1964"), title: "Il fisico John Stewart Bell pubblica il suo teorema, dimostrando che nessuna teoria fisica locale a variabili nascoste può riprodurre tutte le previsioni statistiche della meccanica quantistica", category: "scienza", importance: 2 },

    // 3. La primissima verifica pionieristica in laboratorio (Importanza media)
    { year: toNumber("03/04/1972"), title: "Stuart Freedman e John Clauser eseguono alla UC Berkeley il primo test sperimentale della disuguaglianza di Bell, registrando la prima violazione a favore della meccanica quantistica", category: "scienza", importance: 4 },

    // 4. L'esperimento definitivo senza scappatoie spaziali (Epocale)
    { year: toNumber("17/08/1981"), title: "Alain Aspect, Philippe Grangier e Gérard Roger spiegano lo storico esperimento di Orsay, confermando la violazione delle disuguaglianze di Bell", category: "scienza", importance: 2 }
];

const CryptographyTimeline = [
    // 1. La nascita della cifratura simmetrica antica (Importanza relativa)
    { year: -44, title: "Giulio Cesare introduce l'omonimo cifrario a sostituzione monoalfabetica per proteggere la corrispondenza militare dell'esercito romano", category: "scienza", importance: 4 },

    // 2. La nascita della crittoanalisi (Importanza media)
    { year: 850, title: "Il matematico arabo Al-Kindi pubblica il 'Manoscritto sulla decifrazione dei messaggi crittografati': tecnica dell'analisi delle frequenze, fonda la crittoanalisi", category: "scienza", importance: 3 },

    // 3. La meccanizzazione della crittografia (Importanza alta)
    { year: toNumber("23/02/1918"), title: "L'ingegnere tedesco Arthur Scherbius brevetta la macchina elettro-meccanica Enigma, che diventerà lo standard di cifratura militare della Germania nazista", category: "scienza", importance: 3 },

    // 4. La nascita della moderna teoria dell'informazione (Epocale)
    { year: toNumber("01/09/1949"), title: "Claude Shannon pubblica il saggio 'Communication Theory of Secrecy Systems', fondando matematicamente la crittografia moderna e definendo il concetto di segretezza perfetta", category: "scienza", importance: 3 },

    // 5. La nascita della crittografia a chiave pubblica (Epocale)
    { year: toNumber("01/06/1976"), title: "Whitfield Diffie e Martin Hellman pubblicano il saggio 'New Directions in Cryptography', introducendo per la prima volta il concetto di crittografia asimmetrica e lo scambio di chiavi", category: "scienza", importance: 2 },

    // 6. L'algoritmo RSA (Epocale)
    { year: toNumber("01/02/1978"), title: "Ron Rivest, Adi Shamir e Leonard Adleman presentano l'algoritmo RSA, prima implementazione pratica di crittografia asimmetrica basata sulla fattorizzazione dei numeri primi", category: "scienza", importance: 2 },

    // 7. La crittografia democratica per le masse (Importanza alta)
    { year: toNumber("01/06/1991"), title: "Il programmatore Phil Zimmermann rilascia pubblicamente in rete PGP (Pretty Good Privacy), il primo software che mette la crittografia di livello militare a disposizione dei cittadini", category: "scienza", importance: 4 }
];


const NonEuclideanGeometry = [
    // 1. Il tentativo fallito di Saccheri che conteneva le prime intuizioni (Importanza media)
    { year: toNumber("30/10/1733"), title: "Girolamo Saccheri pubblica postumo il saggio 'Euclides ab omni naevo vindicatus', tenta di dimostrare il quinto postulato di Euclide per assurdo e descrive inconsapevolmente i primi teoremi delle geometrie non euclidee", category: "scienza", importance: 4 },

    // 2. La prima presentazione pubblica di Lobacevskij (Importanza alta)
    { year: toNumber("23/02/1826"), title: "Nikolai Ivanovich Lobacevskij espone per la prima volta i fondamenti di una nuova geometria iperbolica indipendente dal quinto postulato di Euclide", category: "scienza", importance: 3 },

    // 3. La prima pubblicazione formale della storia (Epocale)
    { year: toNumber("31/10/1829"), title: "Nikolai Ivanovich Lobacevskij pubblica sulla rivista Kazan Messenger il saggio 'Sui principi della geometria', prima pubblicazione di un sistema coerente di geometria non euclidea iperbolica", category: "scienza", importance: 2 },

    // 4. L'Appendix di Bolyai (Epocale)
    { year: toNumber("24/06/1832"), title: "János Bolyai pubblica il trattato 'Appendix Scientiam Spatii Absolute Veram Exhibens' formulando in modo autonomo la propria geometria non euclidea iperbolica", category: "scienza", importance: 2 }
];

const ComplexNumbersTimeline = [
    // 1. La prima comparsa formale delle radici negative (Importanza alta)
    { year: toNumber("01/03/1545"), title: "Gerolamo Cardano pubblica 'Ars Magna', primi calcoli con le radici quadrate di numeri negativi per risolvere le equazioni", category: "scienza", importance: 2 },

    // 2. La prima trattazione sistematica e le regole dei segni (Epocale)
    { year: toNumber("28/01/1572"), title: "Rafael Bombelli pubblica  'L'Algebra', prima definizione formale delle regole di calcolo per i numeri complessi", category: "scienza", importance: 2 },

    // 3. L'introduzione del simbolo 'i' (Importanza media)
    { year: toNumber("20/03/1777"), title: "Leonhard Euler introduce per la prima volta l'utilizzo della lettera 'i' per rappresentare l'unità immaginaria della radice quadrata di meno uno", category: "scienza", importance: 3 },

    // 4. L'interpretazione geometrica sul piano cartesiano (Importanza alta)
    { year: toNumber("10/03/1797"), title: "Caspar Wessel presenta il primo saggio sulla rappresentazione geometrica dei numeri complessi come punti di un piano bidimensionale", category: "scienza", importance: 3 },

    // 5. La formalizzazione definitiva del termine "Complesso" (Epocale)
    { year: toNumber("15/04/1831"), title: "Carl Friedrich Gauss introduce il termine 'numero complesso' consolidando la legittimità logica dei numeri immaginari nella comunità scientifica", category: "scienza", importance: 2 }
];

const psychologyHistoryEvents = [
    // Fondazione della Psicologia Scientifica
    { year: 1879, title: "Wilhelm Wundt fonda il primo laboratorio di psicologia sperimentale a Lipsia, sancendo la nascita della psicologia come scienza autonoma", category: "scienza", importance: 3 },
    
    // Il Comportamentismo
    { year: 1904, title: "Ivan Pavlov riceve il Premio Nobel: le sue ricerche sui riflessi condizionati nei cani gettano le basi del comportamentismo", category: "scienza", importance: 3 },
    { year: toNumber("01/03/1913"), title: "John B. Watson pubblica il manifesto del comportamentismo, definendo la psicologia come pura scienza del comportamento osservabile", category: "scienza", importance: 4 },
    
    // La Psicologia della Gestalt
    { year: 1912, title: "Max Wertheimer pubblica gli studi sul movimento apparente (fenomeno Phi), fondando la Psicologia della Gestalt", category: "scienza", importance: 3 },
    
    // Lo Sviluppo Cognitivo e l'Epistemologia Genetica
    { year: 1936, title: "Jean Piaget pubblica 'La nascita dell'intelligenza nel bambino', pietra miliare della psicologia dello sviluppo e del cognitivismo", category: "scienza", importance: 3 },
    
    // Il Cognitivismo e la Metafora della Mente come Computer
    { year: toNumber("11/09/1956"), title: "Simposio sulla Teoria dell'Informazione al MIT: nasce convenzionalmente la psicologia cognitiva grazie ai contributi di Chomsky, Miller e Newell-Simon", category: "scienza", importance: 3 },
    { year: 1967, title: "Ulric Neisser pubblica 'Psicologia Cognitiva', il testo che formalizza il paradigma cognitivista", category: "scienza", importance: 3 },
    
    // Psicologia Umanistica
    { year: 1943, title: "Abraham Maslow propone la teoria della gerarchia dei bisogni umani ('Piramide di Maslow') nella rivista Psychological Review", category: "cultura", importance: 4 },
    
    // La Rivoluzione delle Neuroscienze Cognitive
    { year: 1992, title: "Giacomo Rizzolatti e il suo team dell'Università di Parma scoprono i neuroni specchio, rivoluzionando la neuropsicologia sociale", category: "scienza", importance: 2 }
];

const economicsHistoryEvents = [
    // L'Economia Pre-Classica
    { year: 1758, title: "François Quesnay pubblica il 'Tableau économique', primo modello matematico macroeconomico e manifesto della fisiocrazia", category: "cultura", importance: 3 },
    
    // La Nascita dell'Economia Classica
    { year: 1817, title: "David Ricardo pubblica i 'Principi di economia politica e dell'imposta', introducendo la legge dei vantaggi comparati nel commercio", category: "cultura", importance: 3 },
    
    
    // La Rivoluzione Marginalista (Nascita della Microeconomia Moderna)
    { year: 1871, title: "Carl Menger e William Stanley Jevons pubblicano indipendentemente le opere fondative del marginalismo, introducendo il concetto di utilità marginale", category: "scienza", importance: 3 },
    { year: 1890, title: "Alfred Marshall pubblica i 'Principi di economia', sintetizzando l'approccio classico e marginalista nel moderno diagramma di domanda e offerta", category: "scienza", importance: 3 },
    
    
    // Istituzionalizzazione e Matematizzazione
    { year: toNumber("10/12/1969"), title: "Viene assegnato il primo Premio Nobel per l'Economia a Ragnar Frisch e Jan Tinbergen per lo sviluppo dei modelli dinamici econometrici", category: "scienza", importance: 2 },
    
    // Il Monetarismo e la Nuova Macroeconomia Classica
    { year: toNumber("14/10/1976"), title: "Premio Nobel per l'Economia a Milton Friedman per i suoi contributi sul monetarismo e l'analisi dei consumi", category: "scienza", importance: 3 },
    
    // L'Economia Comportamentale
    { year: toNumber("01/03/1979"), title: "Daniel Kahneman e Amos Tversky pubblicano la 'Prospect Theory', integrando la ricerca psicologica all'interno della scienza economica", category: "cultura", importance: 4 }
];

const replicationCrisisEvents = [
    // L'allarme teorico iniziale
    { year: toNumber("30/08/2005"), title: "John Ioannidis pubblica 'Why Most Published Research Findings Are False', saggio teorico che anticipa la crisi della replicabilità nella scienza", category: "scienza", importance: 4 },
    
    // La prova empirica definitiva (2015)
    { year: toNumber("28/08/2015"), title: "L'Open Science Collaboration pubblica il 'Reproducibility Project: Psychology': solo il 36% di 100 storici studi di psicologia viene replicato con successo", category: "scienza", importance: 3 },

    { year: toNumber("11/03/2016"), title: "Meta-analisi di replica sull'economia sperimentale pubblicata su Science: il check di verifica conferma solo il 61% delle teorie analizzate", category: "scienza", importance: 4 },
    { year: toNumber("27/08/2018"), title: "Pubblicazione del Social Science Replication Project: il check su 21 storici studi di Nature e Science smentisce il 38% delle pubblicazioni", category: "scienza", importance: 4 }

];

const eventiMancanti = [
    { year: toNumber("31/08/2021"), title: "Gli Stati Uniti completano il ritiro dall'Afghanistan, finisce la guerra più lunga della loro storia", category: "politica", importance: 3 },
    { year: toNumber("15/11/2022"), title: "La popolazione mondiale supera gli 8 miliardi di persone", category: "scienza", importance: 3 },
    { year: toNumber("19/11/2023"), title: "Crisi del Mar Rosso: gli Houthi iniziano gli attacchi alle navi mercantili, deviando il commercio globale", category: "politica", importance: 3 },
    { year: toNumber("13/12/2023"), title: "COP28 di Dubai: approvato lo storico accordo globale per avviare la transizione fuori dai combustibili fossili", category: "politica", importance: 2 },
    { year: toNumber("09/01/2024"), title: "Il programma Copernicus conferma il 2023 come anno più caldo mai registrato", category: "scienza", importance: 3 },
    { year: toNumber("25/05/2018"), title: "Entra in vigore il GDPR nell'Unione Europea, ridefinendo la privacy digitale globale", category: "politica", importance: 3 },
    { year: toNumber("20/08/2018"), title: "Greta Thunberg inizia lo 'Sciopero della scuola per il clima', dando vita al movimento Fridays for Future", category: "cultura", importance: 3 },
    { year: toNumber("09/06/2019"), title: "Inizio delle storiche proteste di massa a Hong Kong contro la legge sull'estradizione", category: "politica", importance: 3 },
    { year: toNumber("04/07/2004"), title: "Inaugurazione della Freedom Tower (One World Trade Center) a New York sulle ceneri di Ground Zero", category: "cultura", importance: 5 },
    { year: toNumber("09/07/2006"), title: "L'Italia vince il Campionato Mondiale di Calcio FIFA in Germania per la quarta volta", category: "cultura", importance: 5 },
    { year: toNumber("26/03/1995"), title: "Entra in vigore lo spazio Schengen: aboliti i controlli alle frontiere interne tra i primi paesi europei", category: "politica", importance: 2 },
    { year: toNumber("19/12/1997"), title: "Esce nelle sale statunitensi 'Titanic' di James Cameron, film di maggior successo commerciale del XX secolo", category: "cultura", importance: 4 },
    { year: toNumber("17/09/1991"), title: "Linus Torvalds pubblica la prima versione del kernel Linux, fondamenta per lo sviluppo del software open-source", category: "tecnologia", importance: 3 },
    { year: toNumber("20/04/1999"), title: "Massacro della Columbine High School negli Stati Uniti", category: "politica", importance: 3 },
    { year: toNumber("01/01/1999"), title: "L'Euro viene introdotto come moneta virtuale per le transazioni finanziarie e bancarie in 11 paesi membri dell'UE", category: "politica", importance: 3 },
    { year: toNumber("23/11/1980"), title: "Terremoto dell'Irpinia: catastrofe nel Sud Italia che porta alla nascita della Protezione Civile", category: "politica", importance: 3 },
    { year: toNumber("13/05/1981"), title: "Attentato a Papa Giovanni Paolo II: il terrorista Mehmet Ali Ağca spara al pontefice in Piazza San Pietro", category: "politica", importance: 2 },
    { year: toNumber("15/02/1989"), title: "Ritiro delle truppe sovietiche dall'Afghanistan, fine a dieci anni di conflitto", category: "politica", importance: 3 },
    { year: toNumber("06/06/1984"), title: "Il programmatore sovietico Aleksej Pažitnov crea il videogioco 'Tetris'", category: "cultura", importance: 4 },
    { year: toNumber("20/02/1986"), title: "L'Unione Sovietica lancia il primo modulo della stazione spaziale Mir, primo laboratorio di ricerca orbitante abitato a lungo termine", category: "tecnologia", importance: 3 },
    { year: toNumber("13/05/1978"), title: "Approvazione della Legge Basaglia (Legge 180) in Italia: chiusura dei manicomi e riforma radicale dell'assistenza psichiatrica", category: "politica", importance: 4 },
    { year: toNumber("23/12/1978"), title: "Approvazione della Legge 833 in Italia: istituzione del Servizio Sanitario Nazionale (SSN) pubblico e universale", category: "politica", importance: 3 },
    { year: toNumber("11/04/1970"), title: "Lancio della missione Apollo 13 (incidente a bordo e miracoloso rientro in sicurezza dell'equipaggio)", category: "scienza", importance: 3 },
    { year: toNumber("10/07/1976"), title: "Disastro di Seveso: fuoriuscita di diossina dall'Icmesa e disastro ambientale, porta alla futura 'Direttiva Seveso' dell'UE", category: "scienza", importance: 3 },
    { year: toNumber("15/03/1972"), title: "Esce 'Il padrino' di Francis Ford Coppola", category: "cultura", importance: 4 },
    { year: toNumber("04/11/1966"), title: "Alluvione di Firenze: l'Arno esonda devastando la città e il suo patrimonio artistico, mobilitazione di giovani volontari da tutto il mondo", category: "politica", importance: 2 },
    { year: toNumber("21/02/1965"), title: "Assassinio di Malcolm X, portavoce della Nation of Islam e attivista per i diritti umani e il nazionalismo afroamericano, a New York", category: "politica", importance: 2 },
    { year: toNumber("30/01/1968"), title: "Guerra del Vietnam: le forze nordvietnamite e vietcong lanciano l'Offensiva del Tet, punto di svolta del conflitto", category: "politica", importance: 2 },
    { year: toNumber("01/05/1964"), title: "John Kemeny e Thomas Kurtz eseguono il primo programma in BASIC al Dartmouth College, semplificazione dell'accesso alla programmazione", category: "tecnologia", importance: 3 },
    { year: -2300, title: "Compilazione dell'Urra=hubullu a Ebla, il primo dizionario bilingue (sumero-accadico) della storia", category: "cultura",importance: 2 },
    {year: 850, title: "Prime testimonianze della Scuola Medica Salernitana, la più antica istituzione medica del mondo occidentale",  category: "scienza", importance: 2 },
    { year: -3000, title: "Primo uso documentato del papiro in Egitto come supporto per la scrittura", category: "tecnologia", importance: 2 },
    { year: -249, title: "L'imperatore Ashoka erige la colonna monumentale a Lumbini, luogo di nascita del Buddha", category: "cultura", importance: 2 },
    { year: -800, title: "Emerge Napata come capitale del secondo Regno di Kush, la potenza nubiana che conquisterà l'Egitto", category: "politica", importance: 3 },
    { year: toNumber("26/11/1975"), title: "Bill Gates e Paul Allen fondano Microsoft ad Albuquerque, New Mexico", category: "tecnologia", importance: 3 },
    { year: toNumber("02/05/1952"), title: "Rosalind Franklin e Raymond Gosling ottengono la 'Foto 51', immagine che rivela la struttura a doppia elica del DNA", category: "scienza", importance: 2 },
    { year: toNumber("24/12/1994"), title: "Membri del Gruppo Islamico Armato dirottano il volo Air France 8969 ad Algeri per realizzare un attentato suicida, piano sventato durante uno scalo a Marsiglia dalle forze speciali del GIGN", category: "politica", importance: 3 }

];

const jfkEvents = [
  { year: toNumber("22/11/1963"), title: "Il presidente USA John F. Kennedy viene assassinato a colpi di fucile mentre viaggia a bordo di un'auto scoperta", category: "politica", importance: 1 },
  { year: toNumber("22/11/1963"), title: "Lee Harvey Oswald viene arrestato poche ore dopo l'uccisione di JFK con l'accusa di aver ucciso il presidente e il poliziotto Tippit", category: "politica", importance: 3 },
  { year: toNumber("24/11/1963"), title: "Lee Harvey Oswald viene ucciso a colpi di pistola da Jack Ruby nei sotterranei della polizia di Dallas durante il suo trasferimento in diretta TV", category: "politica", importance: 2 },
  { year: toNumber("24/09/1964"), title: "La Commissione Warren consegna il rapporto sull'assassinio di JFK concludendo che Lee Harvey Oswald agì come unico esecutore", category: "politica", importance: 2 }
];

const governmentDeviationsEvents = [
  { year: toNumber("13/03/1954"), title: "Il presidente Eisenhower approva l'Operazione PBSUCCESS: la CIA organizza un colpo di Stato clandestino in Guatemala per rovesciare il presidente democratico Árbenz", category: "politica", importance: 3 },
  { year: toNumber("17/03/1981"), title: "Viene scoperta la loggia massonica occulta P2 di Licio Gelli, una struttura eversiva in cui erano infiltrati i massimi vertici dei servizi segreti, delle forze armate e dello Stato", category: "politica", importance: 3 },
  { year: toNumber("03/11/1986"), title: "Scandalo Iran-Contra: alti funzionari della sicurezza USA vendevano armi illegalmente all'Iran per finanziare i guerriglieri Contras in Nicaragua", category: "politica", importance: 3 },
  { year: toNumber("24/10/1990"), title: "Il presidente Giulio Andreotti rivela in Parlamento l'esistenza di Gladio, struttura paramilitare segreta della NATO operante in Italia fuori dal controllo parlamentare", category: "politica", importance: 3 },

  { year: toNumber("26/07/1947"), title: "Il presidente Truman firma il National Security Act: nasce la CIA", category: "politica", importance: 2 },
  { year: toNumber("13/04/1953"), title: "La CIA autorizza il progetto MKULTRA: programma illegale di sperimentazione su controllo mentale e lavaggio del cervello tramite droghe e torture", category: "scienza", importance: 3 },
  { year: toNumber("11/03/1956"), title: "L'FBI avvia il COINTELPRO: un programma segreto e illegale di sorveglianza, infiltrazione e sabotaggio dei movimenti politici domestici", category: "politica", importance: 3 },
  { year: toNumber("04/08/1964"), title: "Falso incidente del Golfo del Tonchino: l'amministrazione USA manipola i rapporti radar per ottenere il casus belli ed entrare nella guerra del Vietnam", category: "politica", importance: 1 },
  { year: toNumber("13/06/1971"), title: "Il New York Times inizia la pubblicazione dei 'Pentagon Papers': documenti segreti svelano menzogne del governo sulla guerra del Vietnam", category: "politica", importance: 3 },
  { year: toNumber("26/07/1972"), title: "Il giornalista Jean Heller rivela lo 'Studio di Tuskegee sulla sifilide': cure negate ad afroamericani malati per studiare gli effetti della patologia", category: "scienza", importance: 2 },
  { year: toNumber("19/02/1975"), title: "Commissione Church: l'indagine pubblica accerta i complotti della CIA per assassinare leader stranieri e lo spiare illegalmente cittadini", category: "politica", importance: 2 },
  { year: toNumber("05/02/2003"), title: "Il Segretario di Stato USA Colin Powell mostra all'ONU false prove sull'esistenza di armi di distruzione di massa in Iraq per legittimare l'invasione", category: "politica", importance: 2 },
  { year: toNumber("06/06/2013"), title: "Edward Snowden rivela file del programma segreto PRISM: la NSA intercettava illegalmente le comunicazioni di milioni di cittadini nel mondo", category: "politica", importance: 2 },

  { year: toNumber("10/07/1985"), title: "Opération Satanique: agenti segreti militari francesi (DGSE) fanno esplodere a Auckland la nave 'Rainbow Warrior' di Greenpeace, uccidendo un fotografo", category: "politica", importance: 2 },
  { year: toNumber("15/08/1998"), title: "Strage di Omagh in Irlanda del Nord: accertate gravi omissioni e la mancata condivisione di informazioni dell'intelligence britannica", category: "politica", importance: 3 },
  { year: toNumber("22/11/1990"), title: "Il Parlamento europeo approva una risoluzione di condanna contro Gladio, la rete paramilitare segreta della NATO accusata di interferenze politiche eversive in vari Stati membri", category: "politica", importance: 2 },
  { year: toNumber("14/11/1991"), title: "Belgio: commissione parlamentare d'inchiesta accerta che l'intelligence militare (SGRS) ha protetto frange estremiste e occultato prove sui massacri della banda di Brabante", category: "politica", importance: 2 },
  { year: toNumber("23/11/1995"), title: "Spagna: Scandalo del 'GAL' (Gruppi Anticorstituzionali di Liberazione): il Ministero dell'Interno finanziava una rete illegale di squadroni della morte", category: "politica", importance: 2 },
  { year: toNumber("08/11/2011"), title: " Germania: scandalo del gruppo terroristico neonazista NSU: i servizi segreti interni (BfV) distrussero i file legati agli informatori infiltrati", category: "politica", importance: 3 }


];

const hyperinflationEvents = [
  { year: 1946, title: "Iperinflazione in Ungheria: prezzi che raddoppiano ogni 15 ore", category: "politica", importance: 3 },
  { year: 1948, title: "Iperinflazione nella Cina nazionalista: il collasso dello yuan durante la guerra civile accelera l'ascesa al potere del Partito Comunista di Mao", category: "politica", importance: 2 },
  { year: 1989, title: "Iperinflazione in Argentina: l'inflazione annua oltre il 3000%, dimissioni anticipate del presidente Alfonsín", category: "politica", importance: 3 },
  { year: 2008, title: "Iperinflazione nello Zimbabwe: prezzi che raddoppiano ogni 24 ore, il governo adotta il dollaro statunitense e il rand sudafricano", category: "politica", importance: 3 },
  { year: 2018, title: "Iperinflazione in Venezuela", category: "politica", importance: 3 }
];

const exactCorporateBankruptciesEvents = [
  { year: toNumber("02/12/2001"), title: "Bancarotta Enron: il colosso dell'energia collassa a causa di una gigantesca frode contabile", category: "politica", importance: 3 },
  { year: toNumber("21/07/2002"), title: "Crack WorldCom: la compagnia telefonica deposita il Chapter 11 dopo la scoperta di irregolarità e falsificazioni contabili per 11 miliardi", category: "politica", importance: 3 },
  { year: toNumber("24/12/2003"), title: "Crack Parmalat: l'azienda di Calisto Tanzi dichiara insolvenza per un buco da 14 miliardi, il più grande scandalo societario d'Europa", category: "politica", importance: 3 },
  { year: toNumber("26/09/2008"), title: "Chiusura di Washington Mutual: l'istituto subisce una fuga di depositi da 16 miliardi in pochi giorni, determinando il più grande fallimento bancario commerciale USA", category: "politica", importance: 3 },
  { year: toNumber("23/09/2010"), title: "Bancarotta di Blockbuster: il colosso del noleggio video cede sotto il peso dei debiti per l'incapacità di adattarsi al mercato dello streaming digitale", category: "politica", importance: 4 },
  { year: toNumber("19/01/2012"), title: "La storica azienda fotografica Eastman Kodak dichiara bancarotta", category: "politica", importance: 4 },
  { year: toNumber("23/09/2019"), title: "Fallimento di Thomas Cook: l'agenzia di viaggi più antica del mondo dichiara la liquidazione giudiziale", category: "politica", importance: 4 },
  { year: toNumber("10/03/2023"), title: "Collasso della Silicon Valley Bank", category: "politica", importance: 4 }

];

const frodiElettoraliAccertate = [
  { year: toNumber("07/02/1986"), title: "Elezioni nelle Filippine: tecnici informatici denunciano la frode elettorale, contestazioni e caduta del regime", category: "politica", importance: 3 },
  { year: toNumber("06/07/1988"), title: "Elezioni in Messico: una manipolazione fraudolenta dello spoglio tramite il blocco pilotato del sistema informatico assegna la vittoria a Carlos Salinas", category: "politica", importance: 3 },
  { year: toNumber("31/10/2004"), title: "Elezioni in Ucraina: la Corte Suprema annulla il voto presidenziale vinto da Janukovyč, ordinando la ripetizione delle elezioni", category: "politica", importance: 3 },
  { year: toNumber("26/12/2004"), title: "Viktor Juščenko vince la ripetizione del ballottaggio presidenziale in Ucraina dopo l'annullamento del voto che lo dava sconfitto", category: "politica", importance: 3 },
  { year: toNumber("22/02/2014"), title: "Il Parlamento ucraino depone il presidente Viktor Janukovyč al culmine della Rivoluzione della Dignità (Euromaidan)", category: "politica", importance: 3 },
  { year: toNumber("21/04/2019"), title: "Volodymyr Zelensky vince le elezioni in Ucraina con il 73% dei voti, interpretava il presidente della Repubblica in una popolare serie TV", category: "politica", importance: 3 }
];

const successfulConspiraciesEvents = [
  { year: toNumber("17/01/1893"), title: "Un gruppo di piantatori di zucchero e uomini d'affari occidentali rovescia il Regno delle Hawaii, deponendo la regina Liliuokalani", category: "politica", importance: 3 }
];

const failedConspiraciesEvents = [
  { year: -63, title: "Congiura di Catilina: il console Cicerone scopre e denuncia in Senato la cospirazione ordita da Catilina per rovesciare la Repubblica romana con un colpo di Stato", category: "politica", importance: 2 },
  { year: toNumber("20/07/1944"), title: "Operazione Valchiria: il colonnello Claus von Stauffenberg fallisce l'attentato dinamitardo contro Adolf Hitler, portando alla fucilazione dei congiurati", category: "politica", importance: 3 },
  { year: toNumber("17/05/1974"), title: "Golpe Borghese: viene sventato in extremis un tentativo di colpo di Stato paramilitare in Italia guidato dal principe Junio Valerio Borghese con l'appoggio di servizi segreti", category: "politica", importance: 3 },
  { year: toNumber("19/08/1991"), title: "Golpe di agosto in URSS: il tentativo di cospirazione dei comunisti della linea dura per deporre Mikhail Gorbachev fallisce in tre giorni a causa della resistenza popolare guidata da Eltsin", category: "politica", importance: 3 },
  { year: toNumber("15/07/2016"), title: "Tentato colpo di Stato in Turchia: una fazione delle forze armate tenta di rovesciare il presidente Erdoğan, fallisce in poche ore per la reazione dei cittadini", category: "politica", importance: 3 }
];

const classicalMusicMasterpieces = [
  { year: toNumber("24/02/1607"), title: "Prima assoluta a Mantova de 'L'Orfeo' di Claudio Monteverdi, capolavoro che segna la nascita formale dell'Opera lirica moderna", category: "cultura", importance: 4 },
  { year: 1725, title: "Antonio Vivaldi pubblica ad Amsterdam 'Le quattro stagioni'", category: "cultura", importance: 3 },
  { year: toNumber("07/05/1824"), title: "Ludwig van Beethoven dirige a Vienna il debutto della 'Nona Sinfonia', introducendo per la prima volta le voci umane", category: "cultura", importance: 3 },
  { year: toNumber("06/03/1853"), title: "Prima assoluta de 'La traviata' di Giuseppe Verdi a Venezia:  clamoroso e storico fiasco", category: "cultura", importance: 4 },
  { year: toNumber("29/05/1913"), title: "Debutto de 'La sagra della primavera' di Igor Stravinskij a Parigi, violenta rissa a teatro tra il pubblico per via dei ritmi e suoni d'avanguardia", category: "cultura", importance: 4 },
  { year: toNumber("12/02/1924"), title: "George Gershwin esegue a New York la prima assoluta di 'Rapsodia in blu', prima fusione tra struttura classica e jazz americano", category: "cultura", importance: 5 },
  { year: toNumber("22/11/1928"), title: "Debutta all'Opéra di Parigi il 'Boléro' di Maurice Ravel", category: "cultura", importance: 3 }
];

const erroriGiudiziari = [
  { year: toNumber("23/05/1498"), title: "Girolamo Savonarola impiccato e bruciato sul rogo a Firenze per eresia dopo un processo inquisitorio", category: "politica", importance: 3 },
  { year: toNumber("22/12/1894"), title: "Condanna del capitano Dreyfus per alto tradimento: errore giudiziario basato su prove false e antisemitismo", category: "politica", importance: 3 },
  { year: toNumber("12/07/1906"), title: "La Corte di Cassazione francese annulla la condanna di Alfred Dreyfus, proclamando la sua innocenza", category: "politica", importance: 4 },
  { year: toNumber("23/08/1927"), title: "Gli anarchici italiani Sacco e Vanzetti vengono giustiziati sulla sedia elettrica negli Stati Uniti per un reato mai commesso", category: "politica", importance: 3 },
  { year: toNumber("16/06/1944"), title: "Il quattordicenne afroamericano George Stinney Jr. viene giustiziato sulla sedia elettrica: la condanna sarà annullata dopo 70 anni per totale assenza di prove", category: "politica", importance: 3 },
  { year: toNumber("10/01/1949"), title: "Timothy Evans viene arrestato a Londra per un omicidio commesso dal serial killer John Christie: la sua ingiusta impiccagione porterà all'abolizione della pena di morte nel Regno Unito", category: "politica", importance: 3 },
  { year: toNumber("12/06/1964"), title: "Nelson Mandela viene condannato all'ergastolo per sabotaggio e alto tradimento a Johannesburg", category: "politica", importance: 3 }
];

const dittaturaColonnelliIndipendenti = [
  { year: toNumber("21/04/1967"), title: "In Grecia un colpo di Stato guidato dal colonnello Georgios Papadopoulos rovescia la democrazia e instaura una dittatura militare", category: "politica", importance: 2 },
  { year: toNumber("13/12/1967"), title: "Il re Costantino II di Grecia fallisce un contro-colpo di Stato per rovesciare la giunta militare ed è costretto all'esilio", category: "politica", importance: 4 },
  { year: toNumber("13/08/1968"), title: "Il dissidente greco Alexandros Panagulis tenta invano di uccidere il dittatore Georgios Papadopoulos con un attentato dinamitardo ad Atene", category: "politica", importance: 3 },
  { year: toNumber("17/11/1973"), title: "Proteste degli studenti dell Politecnico di Atene contro il governo, rivolta repressa nel sangue con carri armati", category: "politica", importance: 2 },
  { year: toNumber("25/11/1973"), title: "In Grecia un golpe interno alla giunta militare guidato dal generale Dimitrios Ioannidis depone il dittatore Papadopoulos", category: "politica", importance: 3 },
  { year: toNumber("15/07/1974"), title: "La giunta militare che governa la Grecia organizza un colpo di Stato a Cipro, provocando l'immediata reazione e invasione dell'isola da parte della Turchia", category: "politica", importance: 3 },
  { year: toNumber("24/07/1974"), title: "Crolla la dittatura dei colonnelli in Grecia in seguito alla crisi di Cipro, ripristino della democrazia con il ritorno di Karamanlis", category: "politica", importance: 3 }
];

const stragePiazzaFontanaIndipendenti = [
  { year: toNumber("15/12/1969"), title: "L'anarchico Giuseppe Pinelli muore precipitando da una finestra della questura di Milano mentre era trattenuto per gli interrogatori sulla strage di piazza Fontana", category: "politica", importance: 3 },
  { year: toNumber("16/12/1969"), title: "Arrestato a Roma l'anarchico Pietro Valpreda, accusato ingiustamente dal tassista Cornelio Rolandi di essere l'esecutore materiale della strage di piazza Fontana", category: "politica", importance: 4 },
  { year: toNumber("03/03/1972"), title: "La magistratura di Treviso ordina l'arresto di Franco Freda e Giovanni Ventura, della cellula di Ordine Nuovo, accusati di aver organizzato la strage di piazza Fontana", category: "politica", importance: 4 },
  { year: toNumber("17/05/1972"), title: "Il commissario Luigi Calabresi, addetto alle indagini sulla strage di piazza Fontana, viene assassinato a Milano, agguato rivendicato da esponenti di Lotta Continua", category: "politica", importance: 3 },
  { year: toNumber("23/02/1979"), title: "La Corte d'Assise di Catanzaro emette la prima sentenza sulla strage di piazza Fontana, condannando all'ergastolo i neofascisti Freda, Ventura e l'informatore del SID Giannettini", category: "politica", importance: 4 },
  { year: toNumber("03/05/2005"), title: "La Corte di Cassazione chiude l'iter giudiziario sulla strage di piazza Fontana: assolti gli imputati di Ordine Nuovo ma dichiarati responsabili i neofascisti Freda e Ventura, non più processabili", category: "politica", importance: 3 }
];

const attacchiSpeculativiStatiAziende = [
  { year: toNumber("04/04/2001"), title: "Crisi finanziaria della Turchia, il governo di Ankara a svaluta la lira turca e chiede l'aiuto del FMI", category: "politica", importance: 4 },
  { year: toNumber("02/05/2010"), title: "Crollo dei titoli di Stato della Grecia, i paesi dell'Eurozona e il FMI approvano un primo pacchetto di aiuti da 110 miliardi di euro", category: "politica", importance: 2 },
  { year: toNumber("11/07/2011"), title: "Spread BTP-Bund oltre i 300 punti base, inizio della crisi del debito sovrano che porterà alle dimissioni del governo Berlusconi", category: "politica", importance: 3 },
  { year: toNumber("16/09/1992"), title: "Crisi del Sistema Monetario Europeo: Italia e Regno Unito escono dagli accordi di cambio, pesanti svalutazioni in Spagna, Portogallo e Irlanda", 
  category: "politica", importance: 2 }

];

const reazioniEconomicheCrisi1929 = [
  { year: toNumber("21/09/1931"), title: "Il Regno Unito è il primo paese ad abbandonare il Gold Standard con conseguente svalutazione della sterlina per stimolare le esportazioni dopo il crollo economico del 1929", category: "politica", importance: 2 },
  { year: toNumber("23/01/1933"), title: "Il governo italiano crea l'IRI (Istituto per la Ricostruzione Industriale) per rilevare le quote delle grandi aziende e delle banche in crisi, avviando la statalizzazione dell'economia", category: "politica", importance: 3 },
  { year: toNumber("05/04/1933"), title: "Il presidente statunitense Franklin Delano Roosevelt firma l'Ordine Esecutivo 6102, che vieta il possesso privato di oro ai cittadini USA per svalutare il dollaro e aumentare la moneta in circolazione", category: "politica", importance: 2 },
  { year: toNumber("16/06/1933"), title: "Il Congresso degli Stati Uniti approva il Glass-Steagall Act, la storica riforma bancaria che separa i depositi commerciali tradizionali dalle attività dei fondi d'investimento speculativi", category: "politica", importance: 1 },
  { year: toNumber("12/03/1936"), title: "La Banca d'Italia diventam un istituto di diritto pubblico, vietato il finanziamento diretto a lungo termine alle imprese private", category: "politica", importance: 3 },
  { year: toNumber("01/10/1936"), title: "La Francia abbandona l'aggancio all'oro e svaluta il franco francese di circa il 30%, ponendo fine al blocco difensivo dei paesi del 'Gold Bloc' rimasti legati al vecchio sistema aureo", category: "politica", importance: 2 }
];

const debitiInternazionali =[
{ year: toNumber("26/12/1945"), title: "Istituzione del Franco CFA (Colonies Françaises d'Afrique): controllo monetario francese delle colonie", category: "politica", importance: 3 },
{ year: toNumber("04/08/1983"), title: "Rivoluzione in Burkina Faso: Thomas Sankara prende il potere", category: "politica", importance: 4 },
 { year: toNumber("29/07/1987"), title: "Burkina Faso: il presidente Thomas Sankara tiene uno storico discorso sul rifiuto del debito estero all'OUA", category: "politica", importance: 3 },
{ year: toNumber("15/10/1987"), title: "Assassinio di Thomas Sankara e colpo di Stato in Burkina Faso", category: "politica", importance: 3 },
{ year: toNumber("11/01/1994"), title: "Svalutazione del 50% del Franco CFA: crisi economica e impennata del debito estero in Africa occidentale", category: "politica", importance: 3 },
{ year: toNumber("19/12/2025"), title: "Lancio della Banca d'Investimento dell'AES: pilastro per l'indipendenza finanziaria del Sahel", category: "politica", importance: 4 },
{ year: toNumber("01/03/1960"), title: "La Guinea abbandona il Franco CFA ed istituisce la propria valuta sovrana", category: "politica", importance: 4 },
{ year: toNumber("30/06/1962"), title: "Il Mali dichiara l'indipendenza monetaria uscendo dal Franco CFA per motivi di sovranità politica", category: "politica", importance: 4 },
{ year: toNumber("13/01/1963"), title: "Togo: assassinio del presidente Sylvanus Olympio tre giorni prima dell'abbandono pianificato del Franco CFA", category: "politica", importance: 3 },
{ year: toNumber("29/06/1973"), title: "La Mauritania esce dal blocco monetario coloniale del Franco CFA per riaffermare la sovranità nazionale", category: "politica", importance: 4 },
{ year: toNumber("30/12/1973"), title: "Il Madagascar abbandona il Franco CFA a seguito delle forti proteste nazionaliste e studentesche", category: "politica", importance: 4 },
{ year: toNumber("01/06/1984"), title: "Il Mali rientra nel Franco CFA cedendo alla pressione finanziaria francese", category: "politica", importance: 4 },

{ year: toNumber("01/10/1956"), title: "Crisi di Suez: il FMI concede il primo grande prestito d'emergenza della sua storia a Regno Unito e Francia", category: "politica", importance: 3 },
{ year: toNumber("12/08/1982"), title: "Crisi del debito in America Latina: il FMI interviene in Messico subordinando i prestiti a severe politiche di austerità", category: "politica", importance: 3 },
{ year: toNumber("01/02/1995"), title: "Il FMI guida un maxi-salvataggio da 18 miliardi di dollari per evitare default del Messico", category: "politica", importance: 3 },
{ year: toNumber("02/07/1997"), title: "Crisi finanziaria asiatica: il FMI interviene in Thailandia, Indonesia e Corea del Sud imponendo austerità", category: "politica", importance: 3 },
{ year: toNumber("17/08/1998"), title: "Default della Russia: il FMI interviene con un pacchetto di aiuti multimilionario per stabilizzare il rublo e frenare il contagio", category: "politica", importance: 3 },
{ year: toNumber("09/03/2022"), title: "Guerra in Ucraina: il FMI approva il primo stanziamento d'emergenza da 1,4 miliardi di dollari per sostenere l'economia di Kiev", category: "politica", importance: 4 },

{ year: toNumber("20/04/1977"), title: "Accordo su austerità tra Governo Andreotti III e FMI in Italia: il PCI di Berlinguer permette i tagli con l'astensione", category: "politica", importance: 3 },
{ year: toNumber("04/04/1974"), title: "L'Italia ottiene un prestito d'emergenza dal FMI da 1,2 miliardi di dollari per coprire il deficit energetico", category: "politica", importance: 3 },
{ year: toNumber("19/12/1980"), title: "Volcker Shock: i tassi d'interesse USA vengono portati al livello record del 21.5%, provocando una durissima recessione globale", category: "politica", importance: 1 }
]

const storia900 = [
{ year: toNumber("11/08/1878"), title: "Giovanni Verga pubblica la novella 'Rosso Malpelo' sulla rivista Nuova Antologia", category: "cultura", importance: 4 },
{ year: toNumber("16/04/1877"), title: "Émile Zola pubblica 'L'Assommoir' (L'Ammazzatoio)", category: "cultura", importance: 4 },
{ year: toNumber("26/04/1915"), title: "Firma del Patto di Londra: l'Italia si impegna segretamente a entrare nella Prima Guerra Mondiale a fianco dell'Intesa", category: "politica", importance: 2 },
{ year: toNumber("20/02/1909"), title: "Filippo Tommaso Marinetti pubblica il 'Manifesto del Futurismo' su Le Figaro, fondando il movimento letterario", category: "cultura", importance: 4 },
{ year: toNumber("17/07/1918"), title: "Giuseppe Ungaretti compone la celebre poesia 'Soldati' nel bosco di Courton durante i combattimenti sul fronte francese", category: "cultura", importance: 4 },
{ year: toNumber("10/05/1940"), title: "La Germania nazista di Hitler lancia il Fall Gelb (Piano Giallo), invadendo la Francia, il Belgio, l'Olanda e il Lussemburgo", category: "politica", importance: 2 },

{ year: toNumber("01/01/1951"), title: "Hannah Arendt pubblica 'Le origini del totalitarismo'", category: "cultura", importance: 4 },
{ year: toNumber("11/04/1961"), title: "Hannah Arendt segue a Gerusalemme il processo contro il criminale nazista Adolf Eichmann come inviata della rivista The New Yorker", category: "cultura", importance: 5 },
{ year: toNumber("17/05/1963"), title: "Pubblicazione di 'La banalità del male' di Hannah Arendt", category: "cultura", importance: 4 },
{ year: toNumber("31/05/1933"), title: "Arendt viene arrestata dalla Gestapo a Berlino per aver raccolto materiale sulla propaganda antisemita; rilasciata, fugge in Francia", category: "politica", importance: 4 },
{ year: toNumber("11/12/1951"), title: "Hannah Arendt ottiene la cittadinanza statunitense, dopo 18 anni di apolidia", category: "cultura", importance: 5 },

{ year: toNumber("14/04/1900"), title: "Inaugurazione dell'Esposizione Universale di Parigi: celebrazione delle innovazioni della Belle Époque", category: "cultura", importance: 3 },

{ year: toNumber("13/09/1914"), title: "Prima battaglia dell'Aisne: fallisce la guerra di movimento, si scavano le prime trincee, stallo sul fronte occidentale", category: "politica", importance: 3 },

{ year: toNumber("08/09/1943"), title: "Armistizio di Cassibile: l'Italia si arrende agli Alleati e le truppe tedesche avviano l'immediata occupazione militare del Paese", category: "politica", importance: 2 },
{ year: toNumber("12/09/1943"), title: "Operazione Quercia: un commando di paracadutisti tedeschi libera Benito Mussolini dalla prigionia sul Gran Sasso per ordine diretto di Hitler", category: "storia", importance: 2 },
{ year: toNumber("23/09/1943"), title: "Benito Mussolini costituisce il nuovo Stato fascista (Repubblica Sociale Italiana) con sede a Salò", category: "politica", importance: 3 },
{ year: toNumber("16/10/1943"), title: "Rastrellamento del ghetto di Roma: le truppe d'occupazione naziste deportano oltre mille ebrei romani verso il campo di sterminio di Auschwitz", category: "storia", importance: 2 },
{ year: toNumber("24/03/1944"), title: "Massacro delle Fosse Ardeatine: i soldati tedeschi guidati da Herbert Kappler fucilano 335 civili e militari italiani come rappresaglia per l'attentato di via Rasella", category: "storia", importance: 2 },
{ year: toNumber("25/04/1945"), title: "Liberazione dell'Italia: le forze partigiane liberano le principali città del nord, provocando il definitivo collasso della Repubblica di Salò", category: "politica", importance: 3 },

{ year: toNumber("01/07/1902"), title: "Gabriele D'Annunzio compone nella pineta di Marina di Pisa 'La pioggia nel pineto', lirica della raccolta Alcyone", category: "letteratura", importance: 4 },
{ year: toNumber("01/01/1913"), title: "Ezra Pound pubblica sulla rivista Poetry il manifesto dell'Imagismo, definendo i canoni della poesia modernista", category: "cultura", importance: 4 },
{ year: toNumber("03/05/1945"), title: "Ezra Pound viene arrestato dai partigiani italiani a Rapallo e consegnato all'esercito USA, che lo interna nel campo di Coltano con l'accusa di tradimento per i suoi discorsi alla radio", category: "politica", importance: 3 },
{ year: toNumber("21/01/1941"), title: "Ezra Pound avvia i suoi radiodiscorsi a Radio Roma (EIAR): interviene in lingua inglese per attaccare il presidente Roosevelt e la finanza internazionale", category: "politica", importance: 4 },

{ year: toNumber("28/04/1939"), title: "Discorso di Hitler al Reichstag in cui ripudia il patto di non aggressione con la Polonia e chiede l'annessione del Corridoio di Danzica", category: "politica", importance: 3 },
{ year: toNumber("17/09/1954"), title: "L'editore Faber and Faber pubblica nel Regno Unito 'Il signore delle mosche' del premio Nobel William Golding", category: "cultura", importance: 4 },

{ year: toNumber("01/09/1921"), title: "Umberto Saba pubblica a Trieste la prima edizione del 'Canzoniere'", category: "cultura", importance: 4 },

{ year: toNumber("27/03/1975"), title: "Esce al cinema 'Fantozzi', diretto da Luciano Salce", category: "cultura", importance: 4 },

{ year: toNumber("29/12/1967"), title: "Esce nei cinema degli Stati Uniti 'The Good, the Bad and the Ugly': successo planetario che ridefinisce i canoni del western", category: "cultura", importance: 4 },
{ year: 1959, title: "Ultimo aggiornamento dell'Indice dei libri proibiti dalla Chiesa Cattolica: vengono inseriti gli esistenzialisti (Sartre, de Beauvoir) e intellettuali italiani come Moravia", category: "cultura", importance: 3 },
{ year: toNumber("07/08/1948"), title: "Trionfo del lysenkoismo in URSS: la genetica classica viene bandita in favore di teorie pseudoscientifiche, collasso agricolo e gravissime carestie in tutto il blocco comunista", category: "scienza", importance: 3 },
{ year: 1975, title: "Edward O. Wilson pubblica 'Sociobiology', fondando la disciplina e scatenando un aspro dibattito sul legame tra genetica e comportamento umano", category: "scienza", importance: 3 },

{ year: toNumber("09/07/1955"), title: "Incontro a Città del Messico tra Che Guevara e Fidel Castro", category: "politica", importance: 4 },
{ year: toNumber("28/12/1958"), title: "Battaglia di Santa Clara: la decisiva vittoria militare guidata dal Che", category: "politica", importance: 3 },
{ year: toNumber("11/12/1964"), title: "Discorso di Che Guevara all'Assemblea Generale dell'ONU a New York", category: "politica", importance: 3 },
{ year: toNumber("24/04/1965"), title: "Che Guevara rinuncia alle cariche a Cuba e parte per il Congo", category: "politica", importance: 3 },
{ year: toNumber("08/10/1967"), title: "Cattura di Che Guevara nella gola del Yuro in Bolivia", category: "politica", importance: 3 },

{ year: toNumber("26/07/1953"), title: "Assalto alla Caserma Moncada guidato da Fidel Castro contro Batista", category: "politica", importance: 3 },
{ year: toNumber("01/01/1959"), title: "Trionfo della Rivoluzione Cubana: Fidel Castro prende il potere a L'Avana", category: "politica", importance: 1 },
{ year: toNumber("14/10/1962"), title: "Crisi dei missili di Cuba: inizio delle tensioni nucleari tra USA e URSS", category: "politica", importance: 1 },
{ year: toNumber("19/02/2008"), title: "Fidel Castro annuncia il suo ritiro definitivo dalla presidenza di Cuba", category: "politica", importance: 4 },

{ year: toNumber("02/10/1981"), title: "Ali Khamenei viene eletto Presidente dell'Iran durante la guerra Iran-Iraq", category: "politica", importance: 4 },
{ year: toNumber("04/06/1989"), title: "Morte di Khomeini: l'Assemblea degli Esperti elegge Ali Khamenei Guida Suprema", category: "politica", importance: 4 },
{ year: toNumber("13/06/2009"), title: "Inizio dell'Onda Verde: Khamenei reprime le massicce proteste post-elettorali", category: "politica", importance: 3 },
{ year: toNumber("16/09/2022"), title: "Morte di Mahsa Amini: esplodono in tutto l'Iran le proteste contro il regime", category: "politica", importance: 2 },
{ year: toNumber("28/02/2026"), title: "Morte di Ali Khamenei a Teheran a causa di un raid aereo di USA e Israele", category: "politica", importance: 3 },

{ year: toNumber("17/08/1998"), title: "Clinton ammette davanti al gran giurì una relazione extra-coniugale con una stagista, precedentemente negata sotto giuramento", category: "politica", importance: 3 },
{ year: toNumber("19/12/1998"), title: "La Camera dei Rappresentanti USA vota l'impeachment di Clinton per spergiuro", category: "politica", importance: 2 },
{ year: toNumber("12/02/1999"), title: "Il Senato degli Stati Uniti salva Clinton dalla procedura di impeachment", category: "politica", importance: 3 },
{ year: toNumber("05/03/1946"), title: "Discorso di Fulton: Churchill pronuncia la celebre frase sulla 'Iron Courtain'", category: "politica", importance: 1 },



]

const storia800 = [
{ year: toNumber("01/01/1850"), title: "Allan Pinkerton fonda a Chicago la Northwestern Police Agency, in seguito nota come Pinkerton National Detective Agency", category: "cultura", importance: 5 },
{ year: toNumber("23/02/1861"), title: "Sventato il Complotto di Baltimora: gli agenti Pinkerton salvano il presidente Abraham Lincoln da un tentativo di assassinio", category: "politica", importance: 3 },
{ year: toNumber("06/07/1892"), title: "Massacro di Homestead: scontro a fuoco tra 300 agenti Pinkerton assoldati come crumiri e gli operai delle acciaierie Carnegie, 12 morti", category: "politica", importance: 3 },
{ year: toNumber("03/03/1893"), title: "Il Congresso USA approva l'Anti-Pinkerton Act per vietare al governo federale di assumere dipendenti di agenzie investigative private", category: "politica", importance: 3 },
{ year: toNumber("15/04/1900"), title: "Caccia a Butch Cassidy: la Pinkerton viene ingaggiata dalle ferrovie per dare la caccia al Mucchio Selvaggio nell'Ovest americano", category: "storia", importance: 5 },

{ year: toNumber("01/01/1836"), title: "Giacomo Leopardi compone a Torre del Greco 'La ginestra o il fiore del deserto'", category: "letteratura", importance: 4 },

{ year: toNumber("28/06/1751"), title: "Pubblicato il primo volume dell'Encyclopédie di Diderot e d'Alembert, opera che diffonde le idee dell'Illuminismo in Europa", category: "cultura", importance: 2 },
{ year: toNumber("01/01/1802"), title: "François-René de Chateaubriand pubblica 'Il genio del Cristianesimo', segna la nascita del Romanticismo letterario in Francia", category: "cultura", importance: 3 },
{ year: toNumber("26/05/1883"), title: "Paul Verlaine pubblica sul periodico Le Chat Noir il sonetto 'Langueur', testo manifesto che dà inizio al Decadentismo", category: "cultura", importance: 3 },
{ year: toNumber("01/02/1896"), title: "Al Teatro Regio di Torino va in scena la prima assoluta de 'La bohème' di Giacomo Puccini, diretta dal giovane Arturo Toscanini", category: "cultura", importance: 4 },
{ year: toNumber("01/01/1848"), title: "Alexandre Dumas figlio pubblica il romanzo 'La signora delle camelie'", category: "cultura", importance: 4 }




]

const vladDraculaEvents = [
    { year: 1431, title: "Nascita a Sighișoara di Vlad III, detto in seguito l'Impalatore e Dracula ('figlio del Drago')", category: "cultura", importance: 5 },
    { year: toNumber("14/10/1488"), title: "A Norimberga viene stampato il pamphlet 'Dracole Wayda': la fama di crudeltà di Vlad III si diffonde in Europa", category: "cultura", importance: 5 },
    { year: toNumber("01/04/1819"), title: "John Polidori pubblica 'The Vampyre': nasce il vampiro aristocratico della letteratura moderna", category: "cultura", importance: 4 },
    { year: toNumber("04/03/1922"), title: "Prima di 'Nosferatu' di F. W. Murnau a Berlino: primo adattamento cinematografico (non autorizzato) di 'Dracula'", category: "cultura", importance: 3 },
    { year: toNumber("12/02/1931"), title: "Esce il film 'Dracula' di Tod Browning con Béla Lugosi: l'immagine moderna del Conte Dracula", category: "cultura", importance: 3 }
];

timelineData.push(...extraEvents, ...wikiEvents, ...wikiTechEvents, ...computingHistoryEvents, ...italianHistoryEvents, ...preUSHistoryEvents, ...americanRevolutionEvents, ...americanOldWestEvents, ...earlyUSHistoryEvents, ...missing15thCenturyEvents, ...missing16thCenturyEvents, ...missing17thCenturyEvents, ...missing18thCenturyEvents, ...missing19thCenturyEvents, ...missing1810sEvents, ...missing1820sEvents, ...missing1830sEvents, ...antebellumUSHistoryEvents, ...civilWarAndGildedAgeEvents, ...southAmericanHistoryEvents, ...newZealandHistoryEvents, ...australianHistoryEvents, ...chineseHistoryEvents, ...asianHistoryEvents, ...frenchHistoryEvents, ...germanHistoryEvents, ...caribbeanHistoryEvents, ...spanishHistoryEvents, ...portugueseHistoryEvents, ...balkanHistoryEvents, ...middleEasternHistoryEvents, ...southeastAsianHistoryEvents, ...indianHistoryEvents, ...culturalGapsEvents, ...techGapsEvents, ...scienceGapsEvents, ...politicalGapsEvents, ...missing20thCenturyEvents, ...missing2000sEvents, ...missing4thCenturyEvents, ...missing13thCenturyEvents, ...recentHistoryEvents, ...missingUSHistoryEvents, ...missingScienceMilestones, ...missingModernHistoryEvents, ...missingPrehistoryEvents, ...missingEastAsianEvents, ...africanHistoryEvents, ...centralAmericanHistoryEvents, ...missingEuropeanEvents, ...scientificEnlightenmentGaps, ...russianRevolutionEvents, ...ukHistoryEvents, ...planetaryMusicEvents, ...missingMid19thCenturyEvents, ...early20thCenturyEvents, ...mid20thCenturyEvents, ...missingDecadesEvents, ...mid18thCenturyWikiEvents, ...early18thCenturyWikiEvents, ...late18thCenturyWikiEvents, ...late17thCenturyWikiEvents, ...missingMid17thCenturyEvents, ...newEvents1600_1619, ...late16thCenturyEvents, ...eventi_1500_1510, ...eventiMancanti1420_1450, ...eventiMancanti1400_1419, ...eventiMancanti1350_1399, ...eventiMancanti1300_1349, ...proposte_1200_1249, ...proposte_1250_1290, ...mancanti_1100_1140, ...mancanti_900_949, ...mancanti_950_999, ...mancanti_1000_1049, ...mancanti_1050_1099, ...proposte_1150_1190, ...nuovi_eventi_800_960, ...mancanti_700_799, ...eventiMancantiVI_Secolo, ...mancanti_400_499, ...mancanti_211_395, ...timeline_nazismo_early , ...timeline_covid_pandemic, ...preWWIIEvents, ...financialCrisisEvents, ...frenchRevolutionEvents, ...timeline_fascismo_italiano, ...japaneseMilitarismEvents, ...missingLiteratureEvents, ...napoleonBiographyEvents, ...conquistaCanarie, ...xerxesEvents, ...leonidasEvents, ...possibleMissingEvents, ...additionalKeyEvents, ...additionalHumanitarianEvents, ...combinedExtinctAnimalsAndDinos, ...tecnologiaEBellicaIndustriale, ...events2025_2026, ...events2024, ...events2015_2018, ...cleopatraEvents, ...middleBronzeAgeEvents, ...unifiedAgesTransitions, ...nuoviEventiAntichi, ...Cartoons, ...MeccanicaCeleste, ...QuantumEPR, ...CryptographyTimeline, ...NonEuclideanGeometry, ...ComplexNumbersTimeline, ...psychologyHistoryEvents, ...economicsHistoryEvents, ...replicationCrisisEvents, ...eventiMancanti, ...jfkEvents, ...governmentDeviationsEvents, ...hyperinflationEvents, ...exactCorporateBankruptciesEvents, ...frodiElettoraliAccertate, ...successfulConspiraciesEvents, ...failedConspiraciesEvents, ...classicalMusicMasterpieces, ...erroriGiudiziari, ...dittaturaColonnelliIndipendenti, ...stragePiazzaFontanaIndipendenti, ...attacchiSpeculativiStatiAziende, ...reazioniEconomicheCrisi1929, ...debitiInternazionali, ...storia900, ...storia800, ...vladDraculaEvents);
