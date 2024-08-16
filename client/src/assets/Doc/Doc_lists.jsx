import '../../styles/User/DocList.css'
import { useEffect, useState } from 'react';
function Doc_lists({appointment}){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [dob,setDOB] = useState('');
    const [slot,setSlot] = useState('');
    const [blood,setBlood] = useState('');
    const [date,setDate] = useState('');

    useEffect(()=>{
        setName(appointment.user_name);
        setEmail(appointment.user_email);
        setDOB(appointment.dob);
        setSlot(appointment.slot);
        setBlood(appointment.bloodGroup);
        const today = new Date();
        setDate(today.toLocaleDateString());
    })
    
    return (
        <div className="doc-appointment">
            <img src="/BlueSkull.png" alt="" />
            <div className="user-data">
                <p>Name: {name}</p>
                <p>Email: {email}</p>
                <p>Date: {date}</p>
                <p>Slot Time: {slot}</p>
                <p>Data of Birth: {dob}</p>
                <p>Blood Group: {blood}</p>
            </div>
        </div>
    )
}
export default Doc_lists;