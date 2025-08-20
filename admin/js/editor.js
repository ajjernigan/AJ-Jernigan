//  Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

//  Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "aj-jernigan-site.firebaseapp.com",
  projectId: "aj-jernigan-site",
  storageBucket: "aj-jernigan-site.appspot.com",
  messagingSenderId: "823081137921",
  appId: "1:823081137921:web:8dc8a9d7fdddbf49048d00",
};

//  Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

//  Get page parameter
const params = new URLSearchParams(window.location.search);
const page = params.get("page") || "index";

//  Select DOM elements
const pageTitle = document.getElementById("pageTitle");
const editorArea = document.getElementById("editorArea");
const saveBtn = document.getElementById("saveBtn");
const saveStatus = document.getElementById("saveStatus");
const logoutBtn = document.getElementById("logoutBtn");

pageTitle.textContent = `Editing Page: ${page}`;

//  Auth check
onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "index.html";
  }
});

//  Load content
async function loadContent() {
  const docRef = doc(db, "edits", page);
  const docSnap = await getDoc(docRef);
  editorArea.value = docSnap.exists() ? docSnap.data().content || "" : "";
}

loadContent();

//  Save content
saveBtn.addEventListener("click", async () => {
  const docRef = doc(db, "edits", page);
  await setDoc(docRef, { content: editorArea.value });
  saveStatus.textContent = "Changes saved!";
});

//  Logout
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "index.html";
});
