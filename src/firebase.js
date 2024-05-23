// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBO2_q2xKxWvES4Cz1xJGsgjbsaxv0RsEU",
  authDomain: "reciguide-auth.firebaseapp.com",
  projectId: "reciguide-auth",
  storageBucket: "reciguide-auth.appspot.com",
  messagingSenderId: "322648145841",
  appId: "1:322648145841:web:d879c09d8c11f3b9e7c790",
  measurementId: "G-4CTNDMF5N2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
export { app, auth };