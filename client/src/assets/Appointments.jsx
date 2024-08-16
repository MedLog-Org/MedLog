import React from 'react';
import Navbar from "./Navbar";
import '../styles/Appointments.css';
import Footer from "./Footer";
import PopCard from './PopCard';
import { useState } from 'react';
import { server_URL } from '../var'
function Appointments() {
    
    const [availableSlots,setAvailableSlots] = useState(null);

    const handle_appointment = async (speciality)=>{
        const response = await fetch(`${server_URL}appointment/slots`,{
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({speciality}),
        });

        const data = await response.json();
        setAvailableSlots(data);
    }

    return (
        <div className='appointments'>
            <Navbar/>
            {availableSlots && <PopCard availableSlots={availableSlots}/>}
            <div className='box'>
                <h2 className='title'>Doctor Specialities</h2>
                <div className='grid'>
                    <div className="card" onClick={()=> handle_appointment('genphysician')}>
                        <img src="/genphysician.png" alt="Dentist" />
                        <a href="">General Physician</a>
                    </div>
                    <div className="card" onClick={()=> handle_appointment('Dentist')}>
                        <img src="/dentist.png" alt="Dentist" />
                        <a href="">Dentist</a>
                    </div>
                    <div className="card" onClick={()=> handle_appointment('Ortho')}>
                        <img src="/ortho.png" alt="Dentist" />
                        <a href="">Ortho</a>
                    </div>
                    <div className="card" onClick={()=> handle_appointment('Gynac')}>
                        <img src="/gynac.png" alt="Dentist" />
                        <a href="">Gynac</a>
                    </div>
                </div>
                <div className='grid'>
                    <div className="card" onClick={()=> handle_appointment('Pedia')}>
                        <img src="/pedia.png" alt="Dentist" />
                        <a href="">Pedia</a>
                    </div>
                    <div className="card" onClick={()=> handle_appointment('Urologist')}>
                        <img src="/urologist.png" alt="Dentist" />
                        <a href="">Urologist</a>
                    </div>
                    <div className="card" onClick={()=> handle_appointment('Opthamologist')}>
                        <img src="/opthamology.png" alt="Dentist" />
                        <a href="">Opthamologist</a>
                    </div>
                    <div className="card" onClick={()=> handle_appointment('More')}>
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