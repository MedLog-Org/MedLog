import '../styles/Login.css';
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';



function Login({userType,updateUser}) {
  const URL = "http://localhost:8000";
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] =useState('');

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const UserData = { email, password, userType };
    console.log(UserData);

    const response = await fetch(`${URL}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(UserData),
    });
    const data = await response.json();
    console.log(data);

    if (data.success) {
      console.log(data.message);
      setEmail('');
      setPassword('');
      setMessage('');

      navigate('/');
    } else {
      setPassword('');
      console.error('Error', data.error);
      setMessage('Wrong Password, try again!');
    }
  };

  const handleUserTypeChange = (userType) => { // More descriptive function name
    setUser(userType)
    updateUser(userType);
    console.log(userType);
  };

  return (
    <div className="Login">
      <Navbar />
      <div className="login-card">
        <div className="cross">
          <Link to={'/'}><img src="/cross.png" alt="Close" /></Link>
        </div>
        {!userType && ( // Check for userType instead of box
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
              <p>Login with Google</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
