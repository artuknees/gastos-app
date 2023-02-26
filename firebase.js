// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIZtYDiIo9UMX6Aawnf42izVugodgHbgk",
  authDomain: "gastos-637d4.firebaseapp.com",
  projectId: "gastos-637d4",
  storageBucket: "gastos-637d4.appspot.com",
  messagingSenderId: "473655721023",
  appId: "1:473655721023:web:86e2c2324647818d444c8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);