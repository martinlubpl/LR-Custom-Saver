from flask import Flask, request, jsonify
from flask_cors import CORS
import csv
import os

app = Flask(__name__)
CORS(app)

CSV_FILE = "mywords.csv"


@app.route("/add", methods=["POST"])
def add_word():
    data = request.json
    word = data.get("word", "").strip()
    translation = data.get("translation", "").strip()
    context = data.get("context", "").strip()

    if not word:
        return jsonify({"status": "error"}), 400

    # Łączymy krótkie tłumaczenie i długi opis w jeden ciąg
    # Używamy " | " jako separatora wizualnego wewnątrz komórki
    full_definition = translation
    if context:
        full_definition += f" | {context}"

    # Zapis do CSV (Tylko 2 kolumny: Słowo; PełnaDefinicja)
    file_exists = os.path.isfile(CSV_FILE)
    with open(CSV_FILE, mode="a", newline="", encoding="utf-8") as file:
        writer = csv.writer(file, delimiter=";")

        # Jeśli plik jest pusty, tworzymy nagłówek 2-kolumnowy
        if not file_exists:
            writer.writerow(["Word", "Translation"])

        writer.writerow([word, full_definition])

    print(f"Zapisano: {word} -> {full_definition[:50]}...")
    return jsonify({"status": "success"})


if __name__ == "__main__":
    app.run(port=5000)
