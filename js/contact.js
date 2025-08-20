import { db } from "../admin/js/firebase-config.js";
import { collection, addDoc, serverTimestamp } 
  from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // stop default browser submission

    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    try {
      // Save to Firestore
      await addDoc(collection(db, "messages"), {
        name,
        email,
        message,
        timestamp: serverTimestamp(),
      });

      // Send to Formspree
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" },
      });

      if (response.ok) {
        formStatus.textContent = "Message sent successfully!";
        contactForm.reset();
      } else {
        formStatus.textContent = "Message saved, but email delivery failed.";
      }
    } catch (err) {
      console.error("Error:", err);
      formStatus.textContent = "Could not send message. Try again later.";
    }
  });
}
