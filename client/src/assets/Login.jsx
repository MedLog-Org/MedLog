import '../styles/Login.css';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import firebaseConfig from '../firebase-config';

function Login() {
  const URL ="https://medlog.onrender.com";
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleEmailLogin = async (event) => {
    event.preventDefault();
    const UserData = {email,password};
    console.log(UserData);
    const response = await fetch(`${URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(UserData),
    });
    const data = await response.json();
    console.log(data);

    if (data.success) {
      console.log('User Created');
      setEmail('');
      setPassword('')
    }
    else{
        console.error('Error', data.error);
        setMessage('Please try again');
    }
  };
  

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Send user data to server
      sendUserDataToServer(user);

    } catch (error) {
      // Handle login errors (e.g., display an error message)
      console.error('Login error:', error);
    }
  };

  const sendUserDataToServer = async (user) => {
    try {
      const response = await fetch(`${URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }),
      });

      if (response.ok) {
        // Handle successful response (e.g., redirect to another page)
        console.log('User data sent successfully!');
      } else {
        // Handle error response
        console.error('Error sending user data:', response.status);
      }
    } catch (error) {
      console.error('Error sending user data:', error);
    }
  };

  return (
    <div className="Login">
      <Navbar />
      <div className="login-card">
        <div className="cross">
          <Link to={'/'}>
            <img src="/cross.png" alt="Close" />
          </Link>
        </div>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleEmailLogin}>Login/Sign in</button>
        <div className="or">
          <hr />
          <p>Or</p>
          <hr />
        </div>
        <div className="google">
          <img src="/google.png" alt="" />
          <p onClick={handleGoogleLogin}>Login with Google</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
