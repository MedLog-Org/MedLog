import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "./Navbar";
import '../styles/Appointments.css';

function Appointments() {
    return (
        <>
            <Navbar />
            <div className='box'>
                <h2>Doctor Specialities</h2>
                <div className='grid'>
                    <div className="card">
                        <img src="" alt="" />
                        <a href="">Dichjsj</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Appointments;