import '../../styles/User/List_Card.css'
import { useEffect, useState } from 'react';

function List_Card({appointment}){
    
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [slot,setSlot] = useState('');
    const [room,setRoom] = useState('');
    const [date,setDate] = useState('');

    useEffect(()=>{
        setName(appointment.doc_name);
        setEmail(appointment.doc_email);
        setPhone(appointment.doc_phone);
        setSlot(appointment.slot);
        setRoom(appointment.room_number);
        const today = new Date();
        setDate(today.toLocaleDateString());
    })
    
    return (
        <div className="user-appointment">
            <img src="/doc.png" alt="" />
            <div className="doc-data">
                <p>Name: {name}</p>
                <p>Email: {email}</p>
                <p>Phone: {phone}</p>
                <p>Date: {date}</p>
                <p>Slot Time: {slot}</p>
                <p>Room Number: {room}</p>
            </div>
        </div>
    )
}
export default List_Card;