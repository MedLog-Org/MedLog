import '../../styles/Dashboard.css'
import Navbar from '../Navbar'
import Profile from './Profile';
import Card_List from './Card_List'
import { server_URL } from '../../var'
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';

function Doc(){
    const [selectedComponent, setSelectedComponent] = useState('Profile');
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [phone,setPhone]=useState("");
    const [speciality,setSpeciality]=useState("");
    const [docId, setDocId] = useState("");
    const [time, setTime] = useState("");
    const [room, setRoom] = useState("");

    useEffect(() => {
      const fetchUser = async () => {
          try {
            const response = await fetch(`${server_URL}`, {
                method: 'GET',
                credentials: 'include',
            });
            const result = await response.json();
            const doctor = result.user;
            setName(doctor.name);
            setEmail(doctor.email);
            setPhone(doctor.phone);
            setSpeciality(doctor.speciality);  
            setDocId(doctor._id);   
            setRoom(doctor.roomNumber);
            const slotId = doctor.slotId;
            if(slotId=="1"){
              setTime("[08 - 14]")
            }
            else if(slotId=="2"){
              setTime("[14 - 20]");
            }
          } 
          catch (err) {
            console.error(err);
          }
      };
      fetchUser();
      }, [name, email, phone, speciality]);

    const navigate = useNavigate();
    
    const handleClick = (component) => {
      setSelectedComponent(component);
    };
  
    const renderSelectedComponent = () => {
      switch (selectedComponent) {
        case 'Profile':
          return <Profile />;
        case 'Appointments':
          return <Card_List speciality={speciality} docId={docId} />;
        default:
          return <Profile/>;
      }
    };
    const logout = async () => {
      try {
        const response = await fetch(`${server_URL}logout`, {
          method: 'POST',
          credentials: 'include'
        });
        const data = await response.json();
        if(data.success){
          navigate('/');
        }
      } 
      catch (error) {
        console.error(error);
      } 
    };

    return(
      <>
        <Navbar></Navbar>
        <div className="Dashboard"> 
            <div className="Board">
                <div className="user">
                    <img src="/doc.png" alt="" />
                    <div className="user-data">
                        <p>Name: {name}</p>
                        <p>Email: {email}</p>
                        <p>Phone: {phone}</p>
                        <p>Speciality: {speciality}</p>
                        <p>Room Number: {room} {time}</p>
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
                <hr />
                <ul>
                <li onClick={() => handleClick('Profile')}>Profile</li>
                <li onClick={() => handleClick('Appointments')}>Add Your Slot</li>
                </ul>
                {renderSelectedComponent()}
            </div>
        </div>
        {/* <Footer></Footer> */}
        </>
    )
}
export default Doc;