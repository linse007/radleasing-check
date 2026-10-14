function euro(n) {
  return n.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}

function berechnen() {
  const km = parseFloat(document.getElementById("km").value) || 0;
  const tage = parseFloat(document.getElementById("tage").value) || 0;
  const verbrauch = parseFloat(document.getElementById("verbrauch").value) || 0;
  const spritpreis = parseFloat(document.getElementById("spritpreis").value) || 0;
  const autofix = parseFloat(document.getElementById("autofix").value) || 0;
  const radkosten = parseFloat(document.getElementById("radkosten").value) || 0;

  const kmProMonat = km * 2 * tage;
  const spritkosten = (kmProMonat / 100) * verbrauch * spritpreis;
  const autoGesamt = spritkosten + autofix;

  const ersparnis = autoGesamt - radkosten;
  const ersparnisJahr = ersparnis * 12;

  document.getElementById("r-auto").textContent = euro(autoGesamt);
  document.getElementById("r-rad").textContent = euro(radkosten);
  document.getElementById("r-ersparnis").textContent = euro(ersparnis);
  document.getElementById("r-jahr").textContent = euro(ersparnisJahr);
  document.getElementById("ergebnis").classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("berechnen").addEventListener("click", berechnen);
});
