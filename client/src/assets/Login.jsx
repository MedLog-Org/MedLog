import '../styles/Login.css';
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

function Login() {
  const URL = "http://localhost:8000";
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const handleLogin = async (event) => {
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
      console.log(data.message);
      setEmail('');
      setPassword('')
      setMessage('')
      navigate('/')
    }
    else{
      setPassword('');
      console.error('Error', data.error);
      setMessage('Wrong Password, try again!');
    }
  };
  
  return (
    <div className="Login">
      <Navbar />
      <div className="login-card">
        <div className="cross">
          <Link to={'/'}><img src="/cross.png" alt="Close" /></Link>
        </div>
        <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
        {message && <p id='message'>{message}</p>}
        <button onClick={handleLogin}>Login/Sign in</button>

        <div className="or">
          <hr/><p>Or</p><hr/>
        </div>

        <div className="google">
          <img src="/google.png" alt="" />
          <p>Login with Google</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
