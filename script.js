// Leasingfaktoren der Hauptanbieter, Stand 2026 (regelmäßig prüfen/aktualisieren)
const ANBIETER = [
  { name: "BusinessBike", faktor: 3.48, versicherung: 12.90, restwert: 15 },
  { name: "Lease a Bike", faktor: 3.52, versicherung: 13.50, restwert: 17 },
  { name: "Eurorad", faktor: 3.60, versicherung: 13.00, restwert: 17 },
  { name: "JobRad", faktor: 3.75, versicherung: 14.90, restwert: 18 },
  { name: "Mein Dienstrad", faktor: 3.70, versicherung: 14.00, restwert: 18 },
];

function euro(n) {
  return n.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}

function populateAnbieter() {
  const select = document.getElementById("anbieter");
  ANBIETER.forEach((a, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `${a.name} (Faktor ${a.faktor}%)`;
    select.appendChild(opt);
  });
}

function populateCompareTable() {
  const body = document.getElementById("compare-body");
  ANBIETER.slice().sort((a, b) => a.faktor - b.faktor).forEach(a => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${a.name}</td><td>${a.faktor}%</td><td>${euro(a.versicherung)}</td><td>${a.restwert}%</td>`;
    body.appendChild(tr);
  });
}

function berechnen() {
  const preis = parseFloat(document.getElementById("preis").value) || 0;
  const anbieterIdx = parseInt(document.getElementById("anbieter").value, 10);
  const abgaben = parseFloat(document.getElementById("abgaben").value);
  const a = ANBIETER[anbieterIdx];

  const bruttorate = preis * (a.faktor / 100);
  const gwvBasis = Math.ceil(preis / 100) * 100;
  const gwv = gwvBasis * 0.0025;

  const steuerpflichtigerAnteil = Math.max(bruttorate - gwv, 0);
  const ersparnisProMonat = steuerpflichtigerAnteil * abgaben;
  const nettobelastung = bruttorate - ersparnisProMonat;
  const ersparnis36 = ersparnisProMonat * 36;

  document.getElementById("r-brutto").textContent = euro(bruttorate);
  document.getElementById("r-gwv").textContent = euro(gwv);
  document.getElementById("r-netto").textContent = euro(nettobelastung) + " / Monat";
  document.getElementById("r-ersparnis").textContent = euro(ersparnis36);
  document.getElementById("ergebnis").classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  populateAnbieter();
  populateCompareTable();
  document.getElementById("berechnen").addEventListener("click", berechnen);
});
