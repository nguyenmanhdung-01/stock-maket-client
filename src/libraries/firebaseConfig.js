// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAOOuhP5eoovvepTX4J13wt2cMNUEWuk4",
  authDomain: "image-stock-d55ab.firebaseapp.com",
  projectId: "image-stock-d55ab",
  storageBucket: "image-stock-d55ab.appspot.com",
  messagingSenderId: "897767010090",
  appId: "1:897767010090:web:05a60acadf8974e3827853",
  measurementId: "G-4G69JC6R9T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
