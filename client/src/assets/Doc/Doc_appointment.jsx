import Doc_lists from "./Doc_lists";
import '../../styles/User/DocList.css'
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import { server_URL } from '../../var'

function Doc_appointment(){
    const [appointments,setAppointments]= useState([]);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${server_URL}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const result = await response.json();
                const doc = result.user;   
                setAppointments(doc.appointments);

            } 
            catch (err) {
                console.error(err);
            }
        };
        fetchUser();
    }, []);
    return (
        <div className="doc-list">
            <Navbar></Navbar>
            <h1 id="doc-appointment">Your Appointments</h1>
            {appointments.map((appointment, index) => (
            <Doc_lists key={index} appointment={appointment} />
            ))}
        </div>
    );
      
}
export default Doc_appointment;