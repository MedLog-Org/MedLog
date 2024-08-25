import '../styles/Login.css';
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { server_URL } from '../var'

import { auth } from '../config';
import { getAuth, GoogleAuthProvider,signInWithPopup } from 'firebase/auth';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [userType, setUserType] =useState('');

  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    const UserData = { email, password, userType };

    const response = await fetch(`${server_URL}login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(UserData),
    });
    const data = await response.json();
    console.log(data);
    if(data.success){
      console.log(data.message);
      setEmail('');
      setPassword('');
      setMessage('');

      navigate('/');
    } 
    else{
      setPassword('');
      console.error('Error', data.error);
      setMessage('Wrong Password, try again!');
    }
  };

  const handleUserTypeChange = (user) => {
    setUserType(user)
  };


  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider(auth);
    try{
      const result = await signInWithPopup(auth,provider);
      const user = result.user;
      console.log('User logged in with Google:', user);

      const goolgeId = user.email;
      const UserData = { goolgeId, userType };
      const response = await fetch(`${server_URL}google`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(UserData),
      });
      const data = await response.json();
      console.log(data);
      if(data.success){
        console.log(data.message);
        navigate('/');
      } 
      else{
        console.error('Error', data.error);
      }
    } 
    catch (error){
      console.log(error);
    }
  };

  return (
    <div className="Login">
      <Navbar />
      <div className="login-card">
        <div className="cross">
          <Link to={'/'}><img src="/cross.png" alt="Close" /></Link>
        </div>
        {!userType && ( 
          <>
            <p id='choose'>Login/Sign in as</p>
            <ul>
              <li onClick={() => handleUserTypeChange('patient')}>Patient</li>
              <li onClick={() => handleUserTypeChange('doctor')}>Doctor</li>
            </ul>
          </>
        )}
        {userType && (
          <>
            <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
            {message && <p id='message'>{message}</p>}
            <button onClick={handleLogin}>Login/Sign in {userType}</button>

            <div className="or">
              <hr/><p>Or</p><hr/>
            </div>

            <div className="google">
              <img src="/google.png" alt="" />
              <p onClick={handleGoogleLogin}>Login with Google</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
