// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4Qk_K8tVDB1tuKNXhyLpgFko6fATUpn8",
  authDomain: "medlog-v1.firebaseapp.com",
  projectId: "medlog-v1",
  storageBucket: "medlog-v1.appspot.com",
  messagingSenderId: "22368445512",
  appId: "1:22368445512:web:704472ad5a350e9409e47d",
  measurementId: "G-B89NGZWV12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);