import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC2lPo7671AdiuvCefGnHp1EelxchHWUPo",
  authDomain: "med-log-v1.firebaseapp.com",
  projectId: "med-log-v1",
  storageBucket: "med-log-v1.appspot.com",
  messagingSenderId: "1089355940503",
  appId: "1:1089355940503:web:8f70a77d2c08b837c99fd2",
  measurementId: "G-TNFJN1J3KM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get the authentication object
const db = getFirestore(app); // Get the Firestore object (if using)
export default firebaseConfig; 