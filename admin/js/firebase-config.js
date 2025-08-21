import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";


const firebaseConfig = {
  apiKey: "AIzaSyA3AuU1ZUK23LqewXhUPLeC_q3BG6mBN2I",
  authDomain: "aj-jernigan-site.firebaseapp.com",
  projectId: "aj-jernigan-site",
  storageBucket: "aj-jernigan-site.firebasestorage.app",
  messagingSenderId: "823081137921",
  appId: "1:823081137921:web:8dc8a9d7fdddbf49048d00",
  measurementId: "G-H7EZQPLXY8"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
