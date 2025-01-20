// require("dotenv").config();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "nextjs-laboratorium.firebaseapp.com",
  projectId: "nextjs-laboratorium",
  storageBucket: "nextjs-laboratorium.firebasestorage.app",
  messagingSenderId: "824097786755",
  appId: "1:824097786755:web:ecb256d733f7f31a7bc4b6",
  measurementId: "G-V3JSSDYPXT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
