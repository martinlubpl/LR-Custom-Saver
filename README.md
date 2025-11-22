# LR Custom Saver (Language Reactor to CSV/Anki)

**LR Custom Saver** is a free, open-source tool that allows you to save words and context from [Language Reactor](https://languagereactor.com/) (Netflix/YouTube) directly to a CSV file, ready for Anki import.

This is a workaround for the paid "Save" feature (Pro), created for learners who want to build their own vocabulary decks without monthly subscriptions.

## 🚀 How it works
The system consists of two parts:
1.  **Chrome Extension** – injects a green `SAVE` button into the Language Reactor panel.
2.  **Python Server** – a small script running in the background that receives data from the browser and saves it to a `moje_slowka.csv` file on your drive.

## 📦 Features
*   ✅ Saves the selected word.
*   ✅ Saves the short translation.
*   ✅ **Saves full context/definition** (automatically extracts the "In this sentence..." description from the LR panel).
*   ✅ Formats data into a CSV file (semicolon `;` separator), perfect for Anki.
*   ✅ Works on Netflix and YouTube (wherever Language Reactor works).

---

## 🛠️ Installation

### Step 1: Download files
Clone this repository or download it as a ZIP and extract it to any folder.

### Step 2: Start the Save Server (Python)
You need to have [Python](https://www.python.org/) installed.

1.  Open a terminal in the project folder.
2.  Install required libraries:
    ```
    pip install flask flask-cors
    ```
3.  Run the server:
    ```
    python server.py
    ```
    *Keep this window open while learning!*

### Step 3: Install the extension in your browser
1.  Open your browser (Chrome, Brave, Edge) and go to extensions management (type `chrome://extensions` or `brave://extensions` in the address bar).
2.  Enable **Developer mode** in the top right corner.
3.  Click **Load unpacked**.
4.  Select the folder containing the downloaded files (where `manifest.json` is located).

---

## 📖 How to use?
1.  Make sure `python server.py` is running in the background.
2.  Go to Netflix or YouTube with Language Reactor enabled.
3.  Click on any word in the subtitles to open the LR side panel.
4.  In the top right corner of the panel, you will see a new green button **[💾 SAVE]**.
5.  Click it! The button will change to **[✅ OK]**.
6.  The word has been saved to the `mywords.csv` file in the project folder.

## 📤 Import to Anki
1.  Open Anki on your computer.
2.  Click **File -> Import**.
3.  Select the `mywords.csv` file.
4.  Import settings:
    *   **Separator:** Semicolon (`;`)
    *   **Allow HTML in fields:** Checked (optional).
5.  Field mapping:
    *   Field 1 (Word) -> Front
    *   Field 2 (Translation + Context) -> Back

---

## 📝 File Structure
*   `server.py` – Backend in Python (Flask).
*   `manifest.json` – Chrome extension configuration.
*   `content.js` – Script that injects the button and retrieves data from the page.
*   `background.js` – Communication between the page and the server.

## ❤️ Attribution
Created for my own language learning journey (B1 -> C1) to bypass Free version limitations. Sharing because knowledge should be free!
