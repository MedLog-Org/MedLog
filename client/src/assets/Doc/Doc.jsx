import '../../styles/Dashboard.css'
import Navbar from '../Navbar'
import Profile from './Profile';
import Card_List from './Card_List'
import Footer from '../Footer'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function Doc(){
    const [selectedComponent, setSelectedComponent] = useState('Profile');
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
                        <p>Name: Dr. Vansh Gupta</p>
                        <p>Email: v.vansh@iitg.ac.in</p>
                        <p>Phone: 1234567890</p>
                        <p>Speciality: Dentist</p>
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