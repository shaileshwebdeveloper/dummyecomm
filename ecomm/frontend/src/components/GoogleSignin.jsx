// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKQXI0Ba5g3VoHZvH4PMa6BXo63d2XUlk",
  authDomain: "dummyecom-f871f.firebaseapp.com",
  projectId: "dummyecom-f871f",
  storageBucket: "dummyecom-f871f.appspot.com",
  messagingSenderId: "350976838381",
  appId: "1:350976838381:web:fc5fbfde746a6198e19ae4",
  measurementId: "G-ZV41HPRQT5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth, provider}