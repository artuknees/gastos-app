// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// const isLocal = window.location.origin.includes('localhost');
// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyDIZtYDiIo9UMX6Aawnf42izVugodgHbgk",
  // authDomain: "gastos-637d4.firebaseapp.com",
  // projectId: "gastos-637d4",
  // storageBucket: "gastos-637d4.appspot.com",
  // messagingSenderId: "473655721023",
  // appId: "1:473655721023:web:86e2c2324647818d444c8a"
  apiKey: process.env.NEXT_PUBLIC_API_KEY ,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);