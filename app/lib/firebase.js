// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Add this import for Firebase Authentication

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1x7WnxeD9VrTnE0Ll8HnppnkpFUzV918",
  authDomain: "frontend-app-next.firebaseapp.com",
  projectId: "frontend-app-next",
  storageBucket: "frontend-app-next.firebasestorage.app",
  messagingSenderId: "264290008741",
  appId: "1:264290008741:web:72c2601484e5e80fad574c",
  measurementId: "G-NJHEKVK75K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize auth and export it

export { auth };
