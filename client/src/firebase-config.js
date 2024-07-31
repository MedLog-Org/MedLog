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


// import { initializeApp } from 'firebase/app';
// import { 
//   getAuth, 
//   signInWithEmailAndPassword, 
//   GoogleAuthProvider, 
//   signInWithPopup, 
//   createUserWithEmailAndPassword 
// } from 'firebase/auth';
// import firebaseConfig from '../firebase-config';



// const app = initializeApp(firebaseConfig);
//   const auth = getAuth(app);
 // const handleGoogleLogin = async () => {
  //   try {
  //     const provider = new GoogleAuthProvider();
  //     const userCredential = await signInWithPopup(auth, provider);
  //     const user = userCredential.user;

  //     // Send user data to server
  //     sendUserDataToServer(user);

  //   } catch (error) {
  //     // Handle login errors (e.g., display an error message)
  //     console.error('Login error:', error);
  //   }
  // };

  // const sendUserDataToServer = async (user) => {
  //   try {
  //     const response = await fetch(`${url}/login`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         uid: user.uid,
  //         email: user.email,
  //         displayName: user.displayName,
  //         photoURL: user.photoURL,
  //       }),
  //     });

  //     if (response.ok) {
  //       // Handle successful response (e.g., redirect to another page)
  //       console.log('User data sent successfully!');
  //     } else {
  //       // Handle error response
  //       console.error('Error sending user data:', response.status);
  //     }
  //   } catch (error) {
  //     console.error('Error sending user data:', error);
  //   }
  // };