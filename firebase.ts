// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhuR9Hyao-1pQ9weISzDYsFYRS982aMp4",
  authDomain: "jogo-3-pessoa.firebaseapp.com",
  projectId: "jogo-3-pessoa",
  storageBucket: "jogo-3-pessoa.firebasestorage.app",
  messagingSenderId: "61972191701",
  appId: "1:61972191701:web:ea272cdfbe413fef75855c",
  measurementId: "G-9XR4BNYNST"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);