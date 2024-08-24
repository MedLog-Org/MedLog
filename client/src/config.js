import {getAuth} from "firebase/auth";
import { initializeApp } from "firebase/app";


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
export const auth = getAuth(app);
export default app;