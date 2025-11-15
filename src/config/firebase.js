// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8ldpmPsGJrvzepFZyZLg_ayJEQWu_en8",
  authDomain: "web-to-do-app-74e05.firebaseapp.com",
  projectId: "web-to-do-app-74e05",
  storageBucket: "web-to-do-app-74e05.firebasestorage.app",
  messagingSenderId: "942280791303",
  appId: "1:942280791303:web:a26d6922a9e8ee618a61a2",
  measurementId: "G-CJDLVTXHS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app)