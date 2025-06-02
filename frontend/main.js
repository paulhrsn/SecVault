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
      // let user also download the encrypted file they just uploaded
      const encryptedUrl = URL.createObjectURL(blob);
      const encLink = document.createElement("a");
      encLink.href = encryptedUrl;
      encLink.download = file.name + ".enc";
      document.body.appendChild(encLink);
      encLink.click();
      document.body.removeChild(encLink);
      URL.revokeObjectURL(encryptedUrl); // cleanup
    
      alert("encrypted file uploaded and saved locally!");
    } else {
      alert("upload failed");
    }
    
  }
  