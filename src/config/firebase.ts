// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCT8QNhv-NDlFtx5-ZKEnI5fGWwBRTNLzo",
  authDomain: "kiroku-planner.firebaseapp.com",
  databaseURL: "https://kiroku-planner-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kiroku-planner",
  storageBucket: "kiroku-planner.firebasestorage.app",
  messagingSenderId: "132178836027",
  appId: "1:132178836027:web:b0ae61a04232c015d63a1e",
  measurementId: "G-1W3RRMQ8RR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
