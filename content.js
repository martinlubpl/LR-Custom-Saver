console.log("--- LR CSV: Script Loaded v5 (Pancerny) ---");

function addSaveButton() {
  // 1. Szukamy kontenera (okienko słownika)
  const container = document.querySelector(".lln-dict-contextual");

  if (!container) return; // Nie ma okienka -> nic nie robimy
  if (container.querySelector("#my-save-btn")) return; // Przycisk już jest -> nic nie robimy

  // 2. Tworzymy przycisk
  const btn = document.createElement("button");
  btn.id = "my-save-btn";
  btn.innerHTML = "💾 SAVE";
  btn.style.cssText = `
        position: absolute; top: 5px; right: 5px; z-index: 9999;
        background: #27ae60; color: white; border: none; padding: 5px 10px;
        border-radius: 4px; font-weight: bold; cursor: pointer;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    `;

  // 3. Logika kliknięcia
  btn.onclick = () => {
    try {
      // A. Słowo (np. "performance")
      const word =
        container.querySelector("span:nth-child(1) > span")?.innerText || "";

      // B. Krótkie tłumaczenie
      const trans =
        container.querySelector(".lln-dict-contextual-trans")?.innerText || "";

      // C. Długi opis (TWOJA ŚCIEŻKA + alternatywa)
      // Próbujemy Twojej ścieżki:
      let longDescElement = document.querySelector(
        "#root > main > div.MuiDrawer-root.MuiDrawer-docked.lri-Main-dict.css-pkea7b > div > div:nth-child(2) > div > div.lln-full-dict > div:nth-child(5) > div > div > p"
      );

      // Jeśli Twoja nie zadziała (bo np. React zmienił ID klasy), próbujemy prostszej:
      if (!longDescElement) {
        longDescElement = document.querySelector(".lln-full-dict .lexa-html p");
      }

      // Pobieramy tekst i czyścimy z HTML (innerText usuwa tagi, ale zachowuje formatowanie)
      const contextDesc = longDescElement
        ? longDescElement.innerText.trim()
        : "";

      console.log("ZNALAZŁEM:");
      console.log("Słowo:", word);
      console.log("Tłumaczenie:", trans);
      console.log("Opis (Długi):", contextDesc); // Sprawdź w konsoli F12 czy to nie jest puste!

      if (word) {
        // Wysyłamy do background.js
        chrome.runtime.sendMessage({
          action: "saveWord",
          word: word,
          translation: trans,
          context: contextDesc,
        });

        // Efekt wizualny
        btn.style.background = "#2ecc71";
        btn.innerText = "✅ OK";
        setTimeout(() => {
          btn.style.background = "#27ae60";
          btn.innerText = "💾 SAVE";
        }, 1000);
      }
    } catch (e) {
      console.error("Błąd krytyczny w content.js:", e);
      alert("Błąd wtyczki - sprawdź konsolę F12");
    }
  };

  container.style.position = "relative";
  container.appendChild(btn);
}

// Sprawdzamy co 1 sekundę
setInterval(addSaveButton, 1000);
