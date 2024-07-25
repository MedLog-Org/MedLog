import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "./Navbar";
import '../styles/Appointments.css';
import Footer from "./Footer";

function Appointments() {
    return (
        <div className='appointments'>
            <Navbar/>
            <div className='box'>
                <h2 className='title'>Doctor Specialities</h2>
                <div className='grid'>
                <div className="card">
                        <img src="/genphysician.png" alt="Dentist" />
                        <a href="">General Physician</a>
                    </div>
                    <div className="card">
                        <img src="/dentist.png" alt="Dentist" />
                        <a href="">Dentist</a>
                    </div>
                    <div className="card">
                        <img src="/ortho.png" alt="Dentist" />
                        <a href="">Ortho</a>
                    </div>
                    <div className="card">
                        <img src="/gynac.png" alt="Dentist" />
                        <a href="">Gynac</a>
                    </div>
                </div>
                <div className='grid'>
                    <div className="card">
                        <img src="/pedia.png" alt="Dentist" />
                        <a href="">Pedia</a>
                    </div>
                    <div className="card">
                        <img src="/urologist.png" alt="Dentist" />
                        <a href="">Urologist</a>
                    </div>
                    <div className="card">
                        <img src="/opthamology.png" alt="Dentist" />
                        <a href="">Opthamologist</a>
                    </div>
                    <div className="card">
                        <img src="/more.png" alt="Dentist" />
                        <a href="">More</a>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Appointments;