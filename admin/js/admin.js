// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { app } from "./firebase-config.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA3AuU1ZUK23LqewXhUPLeC_q3BG6mBN2I",
  authDomain: "aj-jernigan-site.firebaseapp.com",
  projectId: "aj-jernigan-site",
  storageBucket: "aj-jernigan-site.appspot.com",
  messagingSenderId: "823081137921",
  appId: "1:823081137921:web:8dc8a9d7fdddbf49048d00",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Select DOM elements
const loginSection = document.getElementById("loginSection");
const dashboardSection = document.getElementById("dashboardSection");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loginStatus = document.getElementById("loginStatus");

// Login handler
loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    loginStatus.textContent = err.message;
  }
});

// Logout handler
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
});

// Auth state listener
onAuthStateChanged(auth, user => {
  if (user) {
    loginSection.style.display = "none";
    dashboardSection.style.display = "block";
  } else {
    loginSection.style.display = "block";
    dashboardSection.style.display = "none";
  }
});
