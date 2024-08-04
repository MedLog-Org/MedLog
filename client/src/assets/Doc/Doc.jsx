import '../../styles/Dashboard.css'
import Navbar from '../Navbar'
import Profile from './Profile';
import Card_List from './Card_List'

import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
function Doc(){
    const [selectedComponent, setSelectedComponent] = useState('Profile');
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [phone,setPhone]=useState("");
    const [speciality,setSpeciality]=useState("");

    useEffect(() => {
      const fetchUser = async () => {
          try {
            const URL = "http://localhost:8000/";
            const response = await fetch(`${URL}`, {
                method: 'GET',
                credentials: 'include',
            });
            const result = await response.json();
            console.log(result.user);
            const doctor = result.user;
            setName(doctor.name);
            setEmail(doctor.email);
            setPhone(doctor.phone);
            setSpeciality(doctor.speciality);    

          } catch (err) {
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
          return <Card_List />;
        default:
          return <Profile/>;
      }
    };
    const logout = async () => {
      try {
        const response = await fetch('http://localhost:8000/logout', {
          method: 'POST',
          credentials: 'include'
        });
        const data = await response.json();
        console.log(data);
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
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
                <hr />
                <ul>
                <li onClick={() => handleClick('Profile')}>Profile</li>
                <li onClick={() => handleClick('Appointments')}>Appointments</li>
                </ul>
                {renderSelectedComponent()}
            </div>
        </div>
        {/* <Footer></Footer> */}
        </>
    )
}
export default Doc;