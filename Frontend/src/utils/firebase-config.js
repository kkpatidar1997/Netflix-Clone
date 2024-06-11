// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7Hu_wVonewahDaPahA9EN2sNwF3ZLRNg",
  authDomain: "react-entertainment-app-9d027.firebaseapp.com",
  projectId: "react-entertainment-app-9d027",
  storageBucket: "react-entertainment-app-9d027.appspot.com",
  messagingSenderId: "388884993363",
  appId: "1:388884993363:web:81787788829e03a3e0bda6",
  measurementId: "G-MDWS6CBE6V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth =getAuth(app)
