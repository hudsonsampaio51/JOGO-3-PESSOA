// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Adicione a configuração do seu projeto Firebase aqui
// Você pode obter isso no console do Firebase: Configurações do Projeto > Geral > Seus aplicativos > SDK de configuração
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
export const db = getFirestore(app);
