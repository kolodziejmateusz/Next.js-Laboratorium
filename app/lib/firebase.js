require("dotenv").config();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "nextjs-laboratorium.firebaseapp.com",
  projectId: "nextjs-laboratorium",
  storageBucket: "nextjs-laboratorium.firebasestorage.app",
  messagingSenderId: "824097786755",
  appId: process.env.APP_ID,
  measurementId: "G-V3JSSDYPXT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
