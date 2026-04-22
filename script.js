let audioStarted = false;
let bgAudio = null;
let currentPlaylist = [];
let currentSoundIndex = 0;
let currentPlayingYear = null;
let current = 0;
let currentHotspot = null;

const soundMap = {
    "1600": ["building.mp3", "rain.mp3"],
    "1700": ["waves.mp3", "marching.mp3"],
    "1800": ["fire.mp3", "bombardment.mp3"],
    "heden": ["museum.mp3"]
};

function fadeIn(audio, duration = 1000) {
    audio.volume = 0;

    audio.play().catch(err => {
        console.log("Audio kon niet starten:", err);
    });

    const step = 0.05;
    const intervalTime = Math.max(20, duration * step);

    const interval = setInterval(() => {
        if (audio.volume < 0.3) {
            audio.volume = Math.min(audio.volume + step, 0.3);
        } else {
            clearInterval(interval);
        }
    }, intervalTime);
}

function fadeOut(audio, duration = 1000) {
    return new Promise(resolve => {
        if (!audio) {
            resolve();
            return;
        }

        const step = 0.05;
        const intervalTime = Math.max(20, duration * step);

        const interval = setInterval(() => {
            if (audio.volume > step) {
                audio.volume -= step;
            } else {
                audio.volume = 0;
                audio.pause();
                audio.currentTime = 0;
                clearInterval(interval);
                resolve();
            }
        }, intervalTime);
    });
}

function playNextSound() {
    if (!audioStarted || currentPlaylist.length === 0) return;

    if (currentSoundIndex >= currentPlaylist.length) {
        currentSoundIndex = 0;
    }

    const file = currentPlaylist[currentSoundIndex];
    const newAudio = new Audio("sounds/" + file);

    newAudio.loop = false;
    newAudio.preload = "auto";

    fadeIn(newAudio);

    newAudio.onended = () => {
        currentSoundIndex++;
        playNextSound();
    };

    newAudio.onerror = () => {
        console.log("Kon audiobestand niet laden:", file);
        currentSoundIndex++;
        playNextSound();
    };

    bgAudio = newAudio;
}

async function startAmbientSound(jaar) {
    if (bgAudio) {
        await fadeOut(bgAudio);
    }

    currentPlaylist = soundMap[jaar] || [];
    currentSoundIndex = 0;

    if (currentPlaylist.length > 0 && audioStarted) {
        playNextSound();
    }
}

function tryStartAudio() {
    const immersiveAudio = localStorage.getItem("immersiveAudio");

    if (immersiveAudio === "true" && !audioStarted) {
        audioStarted = true;

        const data = tijdperken[current];
        if (data && data.jaar !== currentPlayingYear) {
            startAmbientSound(data.jaar);
            currentPlayingYear = data.jaar;
        }
    }
}

const tijdperken = [
    {
        jaar: "1600",
        afbeelding: "images/1600.png",
        hotspots: [
            {
                x: 43,
                y: 48,
                titel: "Opbouw van het Schielandshuis",
                tekst: "Rond 1665 werd het Schielandshuis gebouwd als een indrukwekkend en statig gebouw in Rotterdam.",
                bigTekst1: "In de 17e eeuw bestonden veel gebouwen in Rotterdam nog uit hout, waardoor grote stenen gebouwen zeldzaam waren. Het Schielandshuis viel daardoor direct op in het stadsbeeld. De grootte, symmetrie en rijke afwerking maakten duidelijk dat dit geen normaal huis was, maar een belangrijk gebouw.",
                bigTekst2: "De architectuur werd bewust gekozen om orde en controle uit te stralen. Rechte lijnen, grote ramen en een symmetrische opbouw zorgden voor een gevoel van structuur en stabiliteit. Dit paste bij de functie van het gebouw en de boodschap die het moest overbrengen. Daarnaast werd het Schielandshuis op een goed zichtbare plek gebouwd. Hierdoor kon iedereen zien dat hier een belangrijke organisatie gevestigd zat. Het gebouw was dus niet alleen praktisch, maar ook bedoeld om indruk te maken op de mensen in de stad.",
                bigImgRight: "",
                bigImgBottom: "",
                afbeelding: "images/voorkant1600.png"
            },
            {
                x: 54,
                y: 38,
                titel: "Wie en waarom",
                tekst: "Het Schielandshuis werd gebouwd in opdracht van het Hoogheemraadschap van Schieland.",
                bigTekst1: "Het Hoogheemraadschap van Schieland was verantwoordelijk voor het regelen en controleren van het water in de regio. Dit was in die tijd van levensbelang, omdat overstromingen grote schade konden veroorzaken.",
                bigTekst2: "Door een eigen gebouw te laten bouwen, kreeg het bestuur een vaste plek waar zij hun werk konden uitvoeren en samen konden komen. Maar het ging niet alleen om praktisch gebruik. Het gebouw moest ook laten zien dat zij een sterke en georganiseerde macht waren. Met het Schielandshuis maakten zij hun positie zichtbaar in de stad. Het gebouw straalde vertrouwen en autoriteit uit, waardoor inwoners wisten dat het waterbeheer in goede handen was.",
                bigImgRight: "",
                bigImgBottom: "",
                afbeelding: "images/pieter.png"
            },
            {
                x: 50,
                y: 68,
                titel: "Functie van het gebouw",
                tekst: "Het Schielandshuis werd gebruikt als plek waar belangrijke beslissingen werden genomen.",
                bigTekst1: "Binnen het Schielandshuis kwamen bestuurders samen om te overleggen over belangrijke onderwerpen die invloed hadden op de omgeving. Hier werden plannen gemaakt, problemen besproken en beslissingen genomen die direct effect hadden op het dagelijks leven.",
                bigTekst2: "Het gebouw diende als een centraal punt voor administratie en organisatie. Documenten werden hier bewaard en afspraken werden vastgelegd. Alles draaide om overzicht en controle. Omdat waterbeheer zo belangrijk was, had het werk dat hier werd gedaan grote gevolgen. Het Schielandshuis was daardoor niet alleen een werkplek, maar een plek waar de toekomst van de regio mede werd bepaald.",
                bigImgRight: "",
                bigImgBottom: "",
                afbeelding: "images/functie.png"
            },
            {
                x: 64,
                y: 57,
                titel: "Locatie en uitstraling",
                tekst: "Het Schielandshuis heeft een opvallende vorm en uitstraling die past bij een belangrijk bestuursgebouw.",
                bigTekst1: "De vormgeving van het Schielandshuis laat duidelijk zien dat het een belangrijk gebouw was. In de 17e eeuw werden bestuursgebouwen vaak ontworpen met een symmetrische opbouw, rechte lijnen en rijke details. Dit gaf een gevoel van orde, stabiliteit en gezag.",
                bigTekst2: "Ook de ligging van het gebouw in de stad speelde een rol. Het Schielandshuis stond op een plek waar het onderdeel werd van het stadsbeeld en herkenbaar was voor bewoners en bezoekers. Door deze combinatie van architectuur en locatie kreeg het gebouw een duidelijke uitstraling die paste bij de functie en het belang van het bestuur dat hier gevestigd was.",
                bigImgRight: "",
                bigImgBottom: "",
                afbeelding: "images/locatie.png"
            }
        ]
    },
    {
        jaar: "1700",
        afbeelding: "images/1700.png",
        hotspots: [
            {
                x: 31.5,
                y: 66,
                titel: "Bestuur en waterbeheer",
                tekst: "In de 18e eeuw was het Schielandshuis een belangrijk bestuursgebouw. Hier werden beslissingen genomen over waterbeheer en het onderhoud van dijken en polders.",
                afbeelding: "images/schieland_kaart_stampioen_1684.jpg",
                bigTekst1: "In de 18e eeuw speelde het Schielandshuis een belangrijke rol in het bestuur van de regio. Bestuurders van het waterschap kwamen hier samen om te overleggen over waterbeheer, zoals het onderhoud van dijken en polders. Deze beslissingen waren cruciaal, omdat grote delen van het land zonder goed beheer konden overstromen.",
                bigTekst2: "Het gebouw was een centrale plek waar belangrijke keuzes werden gemaakt die invloed hadden op het dagelijks leven van de inwoners. Zonder goed waterbeheer zouden steden en dorpen in gevaar komen door overstromingen.",
                bigImgRight: "images/polders_1700.jpg",
                bigImgBottom: "images/watermap_1700.webp"
            },
            {
                x: 39,
                y: 53,
                titel: "Nieuwe hotspot",
                tekst: "In de 18e eeuw was Rotterdam een groeiende handelsstad. Het Schielandshuis stond midden in een wereld van bestuur, handel en internationale verbindingen.",
                afbeelding: "images/haven.jpg",
                bigTekst1: "Het gebouw was niet alleen een plek voor waterbeheer, maar ook voor overleg tussen bestuurders die moesten omgaan met een snel veranderende stad. Handel, belastingen en stedelijke groei speelden een steeds grotere rol in de besluiten die hier werden genomen.",
                bigTekst2: "Door de ligging van Rotterdam als havenstad kwamen bestuurders regelmatig in aanraking met internationale handel en economische belangen. Het Schielandshuis stond zo letterlijk op het kruispunt van bestuur en handel in een groeiende Europese stad.",
                bigImgRight: "images/warehouses.webp",
                bigImgBottom: "images/engraving.jpg"
            },
            {
                x: 47,
                y: 65,
                titel: "Macht en rijkdom",
                tekst: "Het Schielandshuis was een symbool van macht en rijkdom. Het gebouw liet zien hoe belangrijk de bestuurders waren.",
                afbeelding: "images/regentes.jpg",
                bigTekst1: "In de 18e eeuw was het Schielandshuis niet alleen een praktisch gebouw, maar ook een statussymbool. De rijke en invloedrijke bestuurders kwamen hier samen om belangrijke beslissingen te nemen.",
                bigTekst2: "De uitstraling van het gebouw speelde hierbij een grote rol. Met indrukwekkende zalen en een statige gevel liet het zien wie de macht had. Ook werden hier belangrijke gasten ontvangen, wat het gebouw een representatieve functie gaf.",
                bigImgRight: "images/interieur.jpg",
                bigImgBottom: "images/council_chambers.jpg"
            },
            {
                x: 50,
                y: 50,
                titel: "Franse tijd en het Schielandshuis",
                tekst: "Aan het einde van de 18e eeuw veranderde de politieke situatie in Nederland ingrijpend. In 1795 werd de Bataafse Republiek uitgeroepen, waarmee Nederland onder sterke Franse invloed kwam te staan.",
                afbeelding: "images/batavian_republic.jpg",
                bigTekst1: "Ook het Schielandshuis in Rotterdam bleef in deze periode in gebruik als bestuurlijk en representatief gebouw. De functie bleef dus bestaan, maar de manier waarop het bestuur werkte veranderde mee met het nieuwe centrale systeem. Lokale instellingen moesten zich aanpassen aan regels en structuren die grotendeels door Frankrijk werden beïnvloed.",
                bigTekst2: "Tijdens de Franse periode vonden er ook officiële bezoeken en inspecties plaats van Franse autoriteiten en hoge functionarissen. Het Schielandshuis bleef daarbij een belangrijk gebouw binnen het stedelijke bestuur en protocol. Na de val van Napoleon in 1813 kwam er een einde aan de Franse overheersing en begon Nederland zich opnieuw als zelfstandig koninkrijk te vormen.",
                bigImgRight: "images/franse_tijd_in_nederland.jpg",
                bigImgBottom: "images/napoleon.jpg"
            }
        ]
    },
    {
        jaar: "1800",
        afbeelding: "images/1800.png",
        hotspots: [
            {
                x: 28.5,
                y: 52,
                titel: "De omgeving verandert",
                tekst: "In de 19e eeuw veranderde Rotterdam snel. Door handel, scheepvaart en nieuwe gebouwen werd de omgeving rond het Schielandshuis drukker en moderner.",
                afbeelding: "images/rotterdam_kaart_1800.jpg",
                bigTekst1: "In de 19e eeuw groeide Rotterdam uit tot een steeds belangrijkere handelsstad. De haven werd drukker, er kwamen meer mensen naar de stad en er werd steeds meer gebouwd. Daardoor veranderde ook de omgeving van het Schielandshuis. Waar het gebouw vroeger in een andere, rustigere omgeving stond, kwam het nu steeds meer midden in een stad te staan die in ontwikkeling was.",
                bigTekst2: "Deze verandering is belangrijk, omdat je eraan kunt zien hoe oud en nieuw Rotterdam in deze periode naast elkaar bestonden. Het Schielandshuis bleef een historisch gebouw uit een eerdere tijd, maar stond ondertussen in een stad die steeds moderner werd. Zo laat deze plek goed zien hoe Rotterdam zich in de 19e eeuw ontwikkelde.",
                bigImgRight: "images/haven_19e_eeuw.jpg",
                bigImgBottom: ""
            },
            {
                x: 71,
                y: 45,
                titel: "Van bestuursgebouw naar museum",
                tekst: "Het Schielandshuis kreeg in de 19e eeuw een nieuwe functie. Het gebouw werd gekocht door de gemeente en later gebruikt als museum.",
                afbeelding: "images/Schielandshuis_oud.jpg",
                bigTekst1: "In de 19e eeuw veranderde de rol van het Schielandshuis. Het gebouw was niet meer alleen een plek van bestuur en macht, maar kreeg ook een nieuwe culturele betekenis. De gemeente Rotterdam kocht het Schielandshuis in 1841 en richtte het in als museum. In 1849 opende hier Museum Boymans.",
                bigTekst2: "Daardoor werd het Schielandshuis meer dan alleen een oud gebouw. Het werd een plek waar kunst, geschiedenis en herinneringen aan de stad werden bewaard. Dat laat goed zien hoe gebouwen in een veranderende stad soms een nieuwe functie krijgen, zodat ze belangrijk blijven voor volgende generaties.",
                bigImgRight: "images/museum_interieur.jpg",
                bigImgBottom: "images/detail-onder.png"
            },
            {
                x: 49.5,
                y: 18,
                titel: "De brand van 1864",
                tekst: "In 1864 brak er een grote brand uit in het Schielandshuis. Daarbij gingen veel kunstwerken, documenten en delen van de inrichting verloren.",
                afbeelding: "images/brand_illustratie_1864.jpg",
                bigTekst1: "In de nacht van 15 op 16 februari 1864 werd het Schielandshuis getroffen door een grote brand. De brand richtte veel schade aan in het gebouw. Niet alleen delen van het pand gingen verloren, maar ook belangrijke documenten, kunstwerken en stukken van de oorspronkelijke inrichting. Dat maakte de brand tot een belangrijk moment in de geschiedenis van het Schielandshuis.",
                bigTekst2: "Na de brand moest het gebouw worden hersteld en opnieuw worden ingericht. In 1867 ging het weer open. Juist daardoor laat het Schielandshuis niet alleen een verhaal van rijkdom en geschiedenis zien, maar ook een verhaal van schade, herstel en doorzettingsvermogen. Het bleef bestaan, ondanks een grote ramp.",
                bigImgRight: "images/verwoesting_illustratie.jpg",
                bigImgBottom: "images/Na_de_brand.jpg"
            },
            {
                x: 50,
                y: 75,
                titel: "Bombardement van 1940",
                tekst: "In 1940 werd Rotterdam zwaar gebombardeerd. Veel van de stad werd verwoest, maar het Schielandshuis bleef staan. Dit maakte het een van de weinige historische gebouwen die nog intact waren.",
                afbeelding: "images/bombardment.jpg",
                bigTekst1: "Tijdens het bombardement op Rotterdam in mei 1940 werd een groot deel van de binnenstad verwoest. Veel gebouwen gingen verloren en het oude centrum van de stad veranderde voorgoed. Het Schielandshuis bleef echter als een van de weinige oude gebouwen overeind staan.",
                bigTekst2: "Daardoor kreeg het gebouw nog meer historische betekenis. Het werd een zichtbare herinnering aan het oude Rotterdam en aan alles wat de stad in de periode van 1800 tot 1940 had meegemaakt. Juist omdat zoveel andere gebouwen verdwenen, is het Schielandshuis vandaag een bijzonder overblijfsel van het verleden.",
                bigImgRight: "",
                bigImgBottom: ""
            }
        ]
    },
    {
        jaar: "heden",
        afbeelding: "images/heden.png",
        hotspots: [
            {
                x: 29.5,
                y: 30,
                titel: "Overleven van de Tweede Wereldoorlog",
                tekst: "Het Schielandshuis bleef staan tijdens het bombardement van Rotterdam in 1940.",
                bigTekst1: "Tijdens het bombardement op Rotterdam in 1940 werd een groot deel van de binnenstad verwoest. Veel historische gebouwen gingen verloren. Het Schielandshuis is een van de weinige gebouwen in dit gebied dat deze gebeurtenis heeft overleefd.",
                bigTekst2: "Hierdoor kreeg het gebouw extra waarde. Het werd niet alleen gezien als een oud bestuursgebouw, maar ook als een tastbare herinnering aan het Rotterdam van vóór de oorlog. Het contrast tussen de verwoeste stad en het nog overeind staande Schielandshuis maakte het een belangrijk historisch herkenningspunt.",
                bigImgRight: "",
                bigImgBottom: "",
                afbeelding: "images/oorlog.png"
            },
            {
                x: 73,
                y: 52,
                titel: "Museum",
                tekst: "Het Schielandshuis werd in de moderne tijd gebruikt als museum.",
                bigTekst1: "Na de periode als bestuursgebouw kreeg het Schielandshuis een culturele functie. Het werd gebruikt als museum waarin de geschiedenis van Rotterdam werd verzameld en tentoongesteld.",
                bigTekst2: "Bezoekers konden hier meer leren over de ontwikkeling van de stad, haar inwoners en belangrijke gebeurtenissen. Door deze functie veranderde het gebouw van een plek waar beslissingen werden genomen naar een plek waar verhalen werden verteld. Het museumgebruik zorgde ervoor dat het gebouw toegankelijk werd voor een breder publiek en een nieuwe rol kreeg binnen de stad.",
                bigImgRight: "",
                bigImgBottom: "",
                afbeelding: "images/boymans.png"
            },
            {
                x: 47,
                y: 55,
                titel: "Restauratie",
                tekst: "Het Schielandshuis is meerdere keren gerestaureerd om het te behouden.",
                bigTekst1: "Door de jaren heen heeft het Schielandshuis verschillende restauraties ondergaan. Deze waren nodig om het gebouw in goede staat te houden en te beschermen tegen slijtage en veroudering.",
                bigTekst2: "Bij restauraties wordt geprobeerd om het originele karakter van het gebouw zoveel mogelijk te behouden. Dit betekent dat materialen, vormen en details zorgvuldig worden hersteld of nagebootst. Dankzij dit onderhoud is het Schielandshuis vandaag de dag nog steeds te zien zoals het bedoeld was, en blijft het een belangrijk onderdeel van het historische erfgoed van Rotterdam.",
                bigImgRight: "",
                bigImgBottom: "",
                afbeelding: "images/Restaurantie.png"
            },
            {
                x: 24,
                y: 73,
                titel: "Betekenis in het heden",
                tekst: "Vandaag de dag is het Schielandshuis een belangrijk historisch en cultureel gebouw in Rotterdam.",
                bigTekst1: "In het huidige Rotterdam heeft het Schielandshuis vooral een symbolische en culturele betekenis. Het gebouw vormt een verbinding tussen het verleden en het heden van de stad.",
                bigTekst2: "In een moderne stad vol nieuwe architectuur herinnert het Schielandshuis aan de geschiedenis en oorsprong van Rotterdam. Het wordt gezien als een waardevol erfgoedobject dat laat zien hoe de stad zich door de eeuwen heen heeft ontwikkeld. Vandaag de dag wordt het gebouw gebruikt voor culturele doeleinden en blijft het een herkenbare plek voor zowel bewoners als bezoekers. Het Schielandshuis speelt daarmee nog steeds een rol in hoe de geschiedenis van Rotterdam wordt beleefd.",
                bigImgRight: "",
                bigImgBottom: "",
                afbeelding: "images/heden.png"
            }
        ]
    }
];

function render() {
    const data = tijdperken[current];

    document.getElementById("main-image").src = data.afbeelding;
    document.getElementById("year").textContent = data.jaar;

    const container = document.getElementById("hotspots");
    container.innerHTML = "";

    data.hotspots.forEach(h => {
        const dot = document.createElement("div");
        dot.classList.add("dot");

        dot.style.left = h.x + "%";
        dot.style.top = h.y + "%";

        dot.addEventListener("click", (event) => {
            openPopup(h, event);
        });

        container.appendChild(dot);
    });

    closePopup();
    closeBigPopup();

    if (audioStarted && data.jaar !== currentPlayingYear) {
        startAmbientSound(data.jaar);
        currentPlayingYear = data.jaar;
    }
}

// pijlen
document.getElementById("next").onclick = () => {
    current = (current + 1) % tijdperken.length;
    render();
};

document.getElementById("prev").onclick = () => {
    current = (current - 1 + tijdperken.length) % tijdperken.length;
    render();
};

function openPopup(hotspot, event) {
    currentHotspot = hotspot;

    document.getElementById("popup-title").textContent = hotspot.titel || "Meer info";
    document.getElementById("popup-text").textContent = hotspot.tekst || "";

    const popupImg = document.getElementById("popup-img");

    if (hotspot.afbeelding) {
        popupImg.src = hotspot.afbeelding;
        popupImg.style.display = "block";
    } else {
        popupImg.style.display = "none";
    }

    const popup = document.getElementById("popup");

    let x = event.clientX + 20;
    let y = event.clientY + 20;

    popup.style.left = x + "px";
    popup.style.top = y + "px";

    popup.classList.remove("hidden");
}

function closePopup() {
    document.getElementById("popup").classList.add("hidden");
}

function closeBigPopup() {
    document.getElementById("big-popup").classList.add("hidden");
}

document.getElementById("close-popup").addEventListener("click", closePopup);

document.getElementById("more-btn").addEventListener("click", () => {
    if (!currentHotspot) return;

    document.getElementById("popup").classList.add("hidden");

    document.getElementById("big-title").textContent = currentHotspot.titel || "";
    document.getElementById("big-text").textContent = currentHotspot.tekst || "";
    document.getElementById("big-text-extra-1").textContent = currentHotspot.bigTekst1 || "";
    document.getElementById("big-text-extra-2").textContent = currentHotspot.bigTekst2 || "";

    const bigImgLeft = document.getElementById("big-img-left");
    const bigImgRight = document.getElementById("big-img-right");
    const bigImgBottom = document.getElementById("big-img-bottom");

    if (currentHotspot.afbeelding) {
        bigImgLeft.src = currentHotspot.afbeelding;
        bigImgLeft.style.display = "block";
    } else {
        bigImgLeft.style.display = "none";
    }

    if (currentHotspot.bigImgRight) {
        bigImgRight.src = currentHotspot.bigImgRight;
        bigImgRight.style.display = "block";
    } else {
        bigImgRight.style.display = "none";
    }

    if (currentHotspot.bigImgBottom) {
        bigImgBottom.src = currentHotspot.bigImgBottom;
        bigImgBottom.style.display = "block";
    } else {
        bigImgBottom.style.display = "none";
    }

    document.getElementById("big-popup").classList.remove("hidden");
});

document.getElementById("close-big-popup").addEventListener("click", closeBigPopup);

// Start audio bij eerste klik als geluid aan stond op de homepage
document.addEventListener("click", () => {
    tryStartAudio();
}, { once: true });

// eerste keer laden
render();

// probeer meteen al te starten
tryStartAudio();