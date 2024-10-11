// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrrJHRMaVsRj3jy7NWy3JfYrK2kU668nM",
  authDomain: "swiggy0752.firebaseapp.com",
  projectId: "swiggy0752",
  storageBucket: "swiggy0752.appspot.com",
  messagingSenderId: "786308619181",
  appId: "1:786308619181:web:54c7e3c67d6545768ddf24",
  measurementId: "G-DC2ER6BHX2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
