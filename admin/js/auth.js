import { auth, provider } from "./firebase-config.js";
import { signInWithPopup, signOut, onAuthStateChanged } 
  from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

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

// Protect private pages (redirect if not logged in)
onAuthStateChanged(auth, (user) => {
  const protectedPages = ["dashboard.html", "messages.html", "editor.html", "analytics.html"];
  const isProtected = protectedPages.some(page => window.location.pathname.includes(page));
  if (isProtected && !user) {
    window.location.href = "login.html";
  }
});
