//client-side JS for encryption
async function encryptAndUpload() {
    const file = document.getElementById("fileInput").files[0];
    if (!file) return alert("No file selected");
  
    const key = await crypto.subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );
  
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
  
    const res = await fetch("/upload", {
      method: "POST",
      body: formData
    });
  
    if (res.ok) {
      alert("Encrypted file uploaded!");
    } else {
      alert("Upload failed");
    }
  }
  