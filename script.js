// CHAGA (JUODOJO BERŽO GRYBO) PREKIŲ SĄRAŠAS
const prekes = [
  {
    id: 1,
    zyme: "POPULIARIAUSIAS",
    pavadinimas: "Skystas Chaga Ekstraktas (500 ml)",
    kaina: 24.99,
    aprasymas: "Dvigubos ekstrakcijos koncentruotas eliksyras. Be alkoholio ir pridėtinio cukraus. Užtenka visam mėnesiui.",
    nuotrauka: "https://unsplash.com"
  },
  {
    id: 2,
    zyme: "100% NATŪRALU",
    pavadinimas: "Smulkinta Chaga Arbata (150 g)",
    kaina: 14.50,
    aprasymas: "Lėtai džiovintas ir smulkintas juodasis beržo grybas. Puikiai tinka plikyti termose vietoj rytinės kavos.",
    nuotrauka: "https://unsplash.com"
  },
  {
    id: 3,
    zyme: "STIPRIAUSIAS",
    pavadinimas: "Chaga Tinktūra su Pipete (50 ml)",
    kaina: 19.90,
    aprasymas: "Ypač stiprios koncentracijos lašai po liežuviu arba į vandenį. Greitam imuniteto ir energijos palaikymui.",
    nuotrauka: "https://unsplash.com"
  },
  {
    id: 4,
    zyme: "RINKINYS -15%",
    pavadinimas: "Imuniteto Kursas (Ekstraktas + Arbata)",
    kaina: 33.50,
    aprasymas: "Pilnas 30 dienų sveikatinimosi rinkinys: 500 ml skysto eliksyro ir 150 g birios Chaga arbatos pakuotė.",
    nuotrauka: "https://unsplash.com"
  }
];

let pasirinktaPreke = null;

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
        <span class="price">${p.kaina.toFixed(2)} €</span>
        <button class="btn-buy" onclick="atidarytiPirkima(${p.id})">Pirkti</button>
      </div>
    </div>
  `;
});

function atidarytiPirkima(id) {
  pasirinktaPreke = prekes.find(p => p.id === id);
  document.getElementById("modal-pavadinimas").innerText = pasirinktaPreke.pavadinimas;
  document.getElementById("modal-kaina").innerText = "Suma apmokėjimui: " + pasirinktaPreke.kaina.toFixed(2) + " €";
  document.getElementById("pirkimo-langas").style.display = "flex";
}

function uzdaryti() {
  document.getElementById("pirkimo-langas").style.display = "none";
}

function pateiktiUzsakyma(e) {
  e.preventDefault();
  const vardas = document.getElementById("vardas").value;
  const tel = document.getElementById("telefonas").value;
  const pastomatas = document.getElementById("pastomatas").value;
  
  alert(
    "UŽSAKYMAS PARUOŠTAS!\n\n" +
    "Prekė: " + pasirinktaPreke.pavadinimas + "\n" +
    "Suma: " + pasirinktaPreke.kaina.toFixed(2) + " €\n" +
    "Pirkėjas: " + vardas + " (" + tel + ")\n" +
    "Paštomatas: " + pastomatas + "\n\n" +
    "Kai prijungsime Paysera, čia pirkėjas bus nukreiptas į banką!"
  );
  uzdaryti();
}
