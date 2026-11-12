// IV "ANDREDA" - ARBATOS "MOTERS ŠVELNUMAS" PAKUOTĖS
const prekes = [
  {
    id: 1,
    zyme: "GRYNASIS KIEKIS: 100 g",
    pavadinimas: "Arbata „MOTERS ŠVELNUMAS“ (100 g)",
    kaina: 7.90,
    aprasymas: "100 % natūrali gaivinanti vaisinė-mėtinė biri arbata su hibisko žiedais (45 %), arbūzų skoniu (30 %), apelsinų žievelėmis (15 %) ir pipirmėte (10 %).",
    nuotrauka: "etikete.png"
  },
  {
    id: 2,
    zyme: "ŠEIMOS PAKUOTĖ: 200 g",
    pavadinimas: "Arbata „MOTERS ŠVELNUMAS“ (200 g)",
    kaina: 13.90,
    aprasymas: "Didesnė pakuotė ilgesniam harmonijos ritualui – sutaupote pirkdami daugiau! Puikiai tinka tiek karštam vakarui, tiek gaiviam gėrimui su ledukais.",
    nuotrauka: "etikete.png"
  }
];

let pasirinktaPreke = null;

// Patikriname, ar pirkėjas ką tik grįžo po sėkmingo apmokėjimo
window.onload = function() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('sekme') === '1') {
    alert("🎉 AČIŪ! Jūsų mokėjimas gautas. Netrukus supakuosime arbatą „MOTERS ŠVELNUMAS“ ir išsiųsime į jūsų pasirinktą paštomatą!");
    window.history.replaceState({}, document.title, "/");
  }
};

// Atvaizduojame prekes
const sarasas = document.getElementById("prekiu-sarasas");
prekes.forEach(p => {
  sarasas.innerHTML += `
    <div class="card">
      <div>
        <div class="img-wrap">
          <span class="tag">${p.zyme}</span>
          <img src="${p.nuotrauka}" alt="${p.pavadinimas}">
        </div>
        <div class="card-body">
          <h3>${p.pavadinimas}</h3>
          <p>${p.aprasymas}</p>
        </div>
      </div>
      <div class="card-footer">
        <span class="price">${p.kaina.toFixed(2).replace('.', ',')} €</span>
        <button class="btn-buy" onclick="atidarytiPirkima(${p.id})">Pirkti</button>
      </div>
    </div>
  `;
});

function atidarytiPirkima(id) {
  pasirinktaPreke = prekes.find(p => p.id === id);
  document.getElementById("modal-pavadinimas").innerText = pasirinktaPreke.pavadinimas;
  document.getElementById("modal-kaina").innerText = "Suma apmokėjimui: " + pasirinktaPreke.kaina.toFixed(2).replace('.', ',') + " €";
  document.getElementById("pirkimo-langas").style.display = "flex";
}

function uzdaryti() {
  document.getElementById("pirkimo-langas").style.display = "none";
}

async function pateiktiUzsakyma(e) {
  e.preventDefault();
  const mygtukas = document.querySelector(".pay-btn");
  mygtukas.innerText = "Jungiamasi prie Paysera...";
  mygtukas.disabled = true;

  const duomenys = {
    prekeId: pasirinktaPreke.id,
    vardas: document.getElementById("vardas").value,
    telefonas: document.getElementById("telefonas").value,
    pastomatas: document.getElementById("pastomatas").value
  };

  try {
    const atsakas = await fetch('/api/paysera', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(duomenys)
    });

    const rezultatas = await atsakas.json();

    if (rezultatas.url) {
      window.location.href = rezultatas.url;
    } else {
      alert("Klaida ruošiant mokėjimą. Patikrinkite serverio nustatymus.");
      mygtukas.innerText = "Apmokėti per Paysera";
      mygtukas.disabled = false;
    }
  } catch (err) {
    alert("Nepavyko susisiekti su serveriu. Įsitikinkite, kad svetainė jau įkelta į Vercel.");
    mygtukas.innerText = "Apmokėti per Paysera";
    mygtukas.disabled = false;
  }
}
