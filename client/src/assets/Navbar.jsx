import '../styles/Navbar.css'
import {Link} from 'react-router-dom'
import React,{useEffect, useState} from 'react'
import axios from 'axios';
function Navbar(){

    // useEffect(() => {
    //     const fetchUser = async () => {
    //       try {
    //         const URL = "http://localhost:8000"
    //         const response = await axios.get(`${URL}/login`);
    //         console.log(response.data);
    //       }catch (err) {
    //         console.error(err);
    //       }
    //     };
    
    //     fetchUser();
    //   }, []);
    return(
        <div className="Navbar">
            <h1>MedLog</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/appointments">Appointments</Link></li>
                <li><Link to="/pharmacy">Pharmacy</Link></li>
                <li><Link to="/help">Help</Link></li>
                <li><Link to="/login" id='btn'>Sign in</Link></li>
            </ul>
        </div>
    )
}
export default Navbar;