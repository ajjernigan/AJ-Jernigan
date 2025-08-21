import { auth, provider } from "./firebase-config.js";
import { signInWithPopup, signOut, onAuthStateChanged } 
  from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { app } from "./firebase-config.js";

const allowedEmails = ["aidan@aidanjernigan.com", "linkylie05@gmail.com"];

// Handle login (only on login.html)
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (allowedEmails.includes(user.email)) {
        window.location.href = "dashboard.html";
      } else {
        alert("You are not authorized.");
        await signOut(auth);
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  });
}

// Handle logout (only on dashboard.html)
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      window.location.href = "login.html";
    } catch (err) {
      console.error(err);
    }
  });
}

const firebaseConfig = {
  apiKey: "AIzaSyA3AuU1ZUK23LqewXhUPLeC_q3BG6mBN2I",
  authDomain: "aj-jernigan-site.firebaseapp.com",
  projectId: "aj-jernigan-site",
  storageBucket: "aj-jernigan-site.firebasestorage.app",
  messagingSenderId: "823081137921",
  appId: "1:823081137921:web:8dc8a9d7fdddbf49048d00",
  measurementId: "G-H7EZQPLXY8"
};

// Protect private pages (redirect if not logged in)
onAuthStateChanged(auth, (user) => {
  const protectedPages = ["dashboard.html", "messages.html", "editor.html", "analytics.html"];
  const isProtected = protectedPages.some(page => window.location.pathname.includes(page));
  if (isProtected && !user) {
    window.location.href = "login.html";
  }
});
