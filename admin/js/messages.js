import { db } from "./firebase-config.js";
import { collection, getDocs, query, orderBy } 
  from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const messagesContainer = document.getElementById("messagesContainer");

async function loadMessages() {
  try {
    const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      messagesContainer.innerHTML = "<p>No messages yet.</p>";
      return;
    }

    let html = "<ul>";
    snapshot.forEach(doc => {
      const msg = doc.data();
      html += `
        <li style="margin-bottom: 1em; padding: 0.5em; border: 1px solid #ccc;">
          <strong>From:</strong> ${msg.name || "Anonymous"}<br>
          <strong>Email:</strong> ${msg.email || "N/A"}<br>
          <strong>Message:</strong> ${msg.message}<br>
          <em>Sent: ${msg.timestamp?.toDate().toLocaleString() || "Unknown"}</em>
        </li>
      `;
    });
    html += "</ul>";

    messagesContainer.innerHTML = html;
  } catch (err) {
    console.error("Error loading messages:", err);
    messagesContainer.innerHTML = "<p> Failed to load messages.</p>";
  }
}

loadMessages();
