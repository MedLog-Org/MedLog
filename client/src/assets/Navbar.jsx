import '../styles/Navbar.css';
import { Link } from 'react-router-dom';
import React from 'react';
import { useState,useEffect } from 'react';
function Navbar() {
    const [isLoggedIn,setisLoggedIn] = useState(false);
    useEffect(() => {
    const fetchUser = async () => {
        try {
        const URL = "http://localhost:8000/";
        const response = await fetch(`${URL}`, {
            method: 'GET',
            credentials: 'include',
        });
        const result = await response.json();
        console.log(result);
        setisLoggedIn(result.isLoggedIn)
        } catch (err) {
        console.error(err);
        }
    };
    fetchUser();
    }, []);

  return (
    <div className="Navbar">
      <h1>MedLog</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/appointments">Appointments</Link></li>
        <li><Link to="/pharmacy">Pharmacy</Link></li>
        <li><Link to="#">Help</Link></li>
        {isLoggedIn ? <li><Link to="/dashboard" id='btn'>Profile</Link></li>: <li><Link to="/login" id='btn'>Sign in</Link></li>}
      </ul>
    </div>
  );
}

export default Navbar;