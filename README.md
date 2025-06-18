# 🔐 SecVault

This is a secure file vault web app for uploading, encrypting, and decrypting files all within your browser using AES-GCM (industry-standard symmetric encryption). Built with Flask + WebCrypto.

---

## Features

- Upload any file securely
- Client-side encryption using WebCrypto API
- Encrypted file + key download
- Decrypt files using uploaded key
- Clean & modern UI with HTML/CSS/JS

---

## Tech Stack

- Python + Flask (Backend)
- HTML, CSS, JS (Frontend)
- WebCrypto API for AES encryption
- `uploads/` folder stores encrypted files

---

## Running Locally

There are two ways to run this project locally:

---

### 1. Easiest: Using the Makefile (Recommended)

If you have `make` installed, which is the default on macOS & Linux, you can use built-in shortcuts:

#### make init: Sets up virtual environment and installs dependencies

#### make backend: Starts the Flask backend (http://127.0.0.1:5000)

#### make frontend: Serves the frontend (http://localhost:3000)

### First time? Make sure to run make init once before anything else.
 ##### Open two terminals to run make backend and make frontend at the same time.
 ##### Then visit http://localhost:3000 in your browser to use SecVault.

 ### Manual Run (If You Don’t Want to Use Make)

If you prefer setting it up yourself? Follow these steps to run the project manually:

#### 1. Clone the repo

git clone https://github.com/your-username/secure-file-vault.git

cd secure-file-vault

#### 2. Set up the Python environment:

python3 -m venv venv

source venv/bin/activate           # Or on Windows: venv\Scripts\activate

pip install -r requirements.txt

### 3. Start the backend (Flask API): 
export FLASK_APP=app.py           # On Windows: set FLASK_APP=app.py

flask run                         # Runs at http://127.0.0.1:5000

### 4. Serve the frontend
-Open a separate terminal window. 

python3 -m http.server 3000       # Runs at http://localhost:3000





