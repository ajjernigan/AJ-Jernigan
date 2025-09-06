import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Firebase config - FIXED to use consistent storage bucket
const firebaseConfig = {
  apiKey: "AIzaSyA3AuU1ZUK23LqewXhUPLeC_q3BG6mBN2I",
  authDomain: "aj-jernigan-site.firebaseapp.com",
  projectId: "aj-jernigan-site",
  storageBucket: "aj-jernigan-site.appspot.com", // CONSISTENT WITH OTHER FILES
  messagingSenderId: "823081137921",
  appId: "1:823081137921:web:8dc8a9d7fdddbf49048d00",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Load page content from Firestore
 * @param {string} pageName - document id in 'edits' collection
 * @param {string} containerId - id of the element to insert content into
 */
export async function loadPageContent(pageName, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const docRef = doc(db, "edits", pageName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      container.innerHTML = docSnap.data().content || "";
    } else {
      container.innerHTML = "<p>Content not yet available.</p>";
    }
  } catch (err) {
    console.error("Error loading content:", err);
    container.innerHTML = "<p>Error loading content.</p>";
  }
}