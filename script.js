const tijdperken = [
    {
        jaar: "1600",
        afbeelding: "images/1600.png",
        hotspots: [
            {
                x: 50,
                y: 35,
                titel: "Het dak",
                tekst: "Het Schielandshuis had in deze periode een statige en symmetrische opbouw. Het dak en de gevel laten de rijkdom en status van het gebouw zien.",
                bigTekst1: "Hier komt een uitgebreid verhaal over het dak en waarom het belangrijk was in deze periode.",
                bigTekst2: "Extra verdieping over architectuur, status en betekenis.",
                bigImgRight: "images/detail-rechts.png",
                bigImgBottom: "images/detail-onder.png",
                afbeelding: "images/dak.png"
            },
            {
                x: 65,
                y: 40,
                titel: "De gevel",
                tekst: "De gevel van het Schielandshuis straalde macht en orde uit en liet de bestuurlijke functie van het gebouw zien."
            },
            {
                x: 50,
                y: 60,
                titel: "De ingang",
                tekst: "Via deze ingang kwamen belangrijke bezoekers en bestuurders het gebouw binnen."
            },
            {
                x: 30,
                y: 70,
                titel: "De omgeving",
                tekst: "Rondom het Schielandshuis zag Rotterdam er in deze periode heel anders uit dan nu."
            }
        ]
    },
    {
        jaar: "1700",
        afbeelding: "images/1700.png",
        hotspots: [
            {
                x: 20,
                y: 62,
                titel: "De straat",
                tekst: "In deze periode begon de omgeving rondom het Schielandshuis steeds drukker te worden. Mensen liepen door de straten, handel kwam op gang en de stad begon langzaam te groeien. Wat eerst open en rustig was, werd steeds levendiger."
            },
            {
                x: 32,
                y: 52,
                titel: "De zijkant van het gebouw",
                tekst: "Aan de zijkant van het Schielandshuis zie je hoe het gebouw echt midden in de stad stond. Het was niet alleen een mooi gebouw, maar ook een plek waar belangrijke beslissingen werden genomen."
            },
            {
                x: 50,
                y: 60,
                titel: "De ingang",
                tekst: "De ingang bleef een belangrijk punt. Hier kwamen bestuurders en belangrijke bezoekers binnen. Het gebouw had nog steeds een functie die te maken had met macht en bestuur."
            },
            {
                x: 30,
                y: 70,
                titel: "Het dagelijks leven",
                tekst: "Als je naar de mensen kijkt zie je hoe het dagelijks leven eruit zag. Mensen werkten, liepen rond en deden hun eigen dingen. Dit geeft een beeld van hoe Rotterdam toen echt voelde."
            }
        ]
    },
    {
        jaar: "1800",
        afbeelding: "images/1800.png",
        hotspots: [
            {
                x: 13,
                y: 49,
                titel: "De omgeving verandert",
                tekst: "In de 19e eeuw veranderde de stad steeds meer. Nieuwe gebouwen kwamen erbij en de omgeving van het Schielandshuis begon er anders uit te zien dan voorheen."
            },
            {
                x: 81,
                y: 32,
                titel: "De gevel",
                tekst: "De gevel bleef herkenbaar, maar kreeg door de tijd een andere betekenis. Het gebouw werd minder een plek van bestuur en begon langzaam een andere rol te krijgen."
            },
            {
                x: 49,
                y: 22,
                titel: "Het dak en details",
                tekst: "De details van het gebouw laten nog steeds de oude stijl zien. Ondanks alle veranderingen bleef het Schielandshuis een belangrijk herkenningspunt in de stad."
            },
            {
                x: 50,
                y: 70,
                titel: "Nieuwe functie",
                tekst: "In deze periode veranderde de functie van het gebouw. Het werd niet meer alleen gebruikt voor bestuur, maar kreeg een nieuwe betekenis binnen Rotterdam."
            }
        ]
    },
    {
        jaar: "heden",
        afbeelding: "images/heden.png",
        hotspots: [
            {
                x: 23,
                y: 37,
                titel: "Het Schielandshuis vandaag",
                tekst: "Vandaag de dag is het Schielandshuis een plek vol geschiedenis. Het gebouw wordt gezien als een belangrijk onderdeel van het verleden van Rotterdam."
            },
            {
                x: 71,
                y: 52,
                titel: "De stad eromheen",
                tekst: "De omgeving is compleet veranderd. Waar vroeger open ruimte was, is nu een drukke stad ontstaan met moderne gebouwen en veel activiteit."
            },
            {
                x: 47,
                y: 65,
                titel: "Het gebouw als erfgoed",
                tekst: "Het Schielandshuis wordt nu vooral gezien als erfgoed. Het vertelt het verhaal van hoe Rotterdam zich door de jaren heen heeft ontwikkeld."
            },
            {
                x: 14,
                y: 75,
                titel: "Van toen naar nu",
                tekst: "Als je kijkt naar vroeger en nu zie je hoeveel er is veranderd. Het Schielandshuis is één van de weinige plekken die die hele geschiedenis nog zichtbaar maakt."
            }
        ]
    }
];

let current = 0;
let currentHotspot = null;

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
    document.getElementById("popup-img").src = hotspot.afbeelding || "";

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

    document.getElementById("big-img-left").src = currentHotspot.afbeelding || "";
    document.getElementById("big-img-right").src = currentHotspot.bigImgRight || "";
    document.getElementById("big-img-bottom").src = currentHotspot.bigImgBottom || "";

    document.getElementById("big-popup").classList.remove("hidden");
});

document.getElementById("close-big-popup").addEventListener("click", closeBigPopup);

// eerste keer laden
render();