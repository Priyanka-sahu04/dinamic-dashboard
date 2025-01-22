// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

// Firebase configuration (Replace with your Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyChsA63RNeGb4Dp5HwtE-9saAdSZK4yUBg",
  authDomain: "dashboard-dbe07.firebaseapp.com",
  projectId: "dashboard-dbe07",
  storageBucket: "dashboard-dbe07.firebasestorage.app",
  messagingSenderId: "427869902286",
  appId: "1:427869902286:web:2797806b50a534de4c879f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign-Up
document.getElementById("signup-btn").addEventListener("click", () => {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Sign-Up Successful!");
      // Redirect to index.html after sign-up
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert("Email is already in use");
    });
});

// Login
document.getElementById("login-btn").addEventListener("click", () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login Successful!");
      // Redirect to index.html after login
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Logout
document.getElementById("logout-btn").addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      alert("Logged Out Successfully!");
      document.getElementById("logout-btn").style.display = "none";
    })
    .catch((error) => {
      alert(error.message);
    });
});
