chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "saveWord") {
    console.log("Background otrzymał:", request); // Logowanie w tle

    fetch("http://127.0.0.1:5000/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        word: request.word,
        translation: request.translation,
        context: request.context,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Wysłano do Pythona:", data))
      .catch((err) => console.error("Błąd połączenia z Pythonem:", err));
  }
  return true;
});
