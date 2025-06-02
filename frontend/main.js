//client-side JS for encryption
async function encryptAndUpload() {
    const file = document.getElementById("fileInput").files[0];
    if (!file) return alert("No file selected");
  
    const key = await crypto.subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );

    // convert the key to raw bytes
const rawKey = await crypto.subtle.exportKey("raw", key);
const keyBlob = new Blob([rawKey]);
const keyUrl = URL.createObjectURL(keyBlob);
const keyLink = document.createElement("a");
keyLink.href = keyUrl;
keyLink.download = file.name + ".key"; // match file name
// add it to the DOM, trigger download, then remove
document.body.appendChild(keyLink);
keyLink.click();
document.body.removeChild(keyLink);
URL.revokeObjectURL(keyUrl); // cleanup
  
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const fileBuffer = await file.arrayBuffer();
  
    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      fileBuffer
    );
  
    const blob = new Blob([iv, new Uint8Array(encrypted)]);
    const formData = new FormData();
    formData.append("file", blob, file.name + ".enc");
  
    const BACKEND_URL = "https://secvault-0wk4.onrender.com";    // actual Render backend URL

    const res = await fetch(`${BACKEND_URL}/upload`, {
      method: "POST",
      body: formData,
    });
    ;
  
    if (res.ok) {
      alert("Encrypted file uploaded!");
    } else {
      alert("Upload failed");
    }
  }
  