import '../../styles/Dashboard.css';
import Navbar from '../Navbar';
import Profile from './Profile';
import List from './List';
import Records from './Records';
import Footer from '../Footer';
import { useState,useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import { server_URL } from '../../var'

function Dashboard() {
  const [selectedComponent, setSelectedComponent] = useState('Profile');
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [sex,setSex] = useState('');
  const [dob,setDOB] = useState('');
  const [bloodGroup,setBloodGroup] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
        try {
          const response = await fetch(`${server_URL}`, {
              method: 'GET',
              credentials: 'include',
          });
          const result = await response.json();
          const user = result.user;
          setName(user.name);
          setEmail(user.email);
          setSex(user.sex);
          setDOB(user.dob);
          setBloodGroup(user.bloodGroup);      
        } 
        catch (err) {
          console.error(err);
        }
    };
    fetchUser();
    }, [name, email, sex, dob, bloodGroup]);
  
    const logout = async () => {
      try {
        const response = await fetch(`${server_URL}logout`, {
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
    
  const handleClick = (component) => {
    setSelectedComponent(component);
  };

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'Profile':
        return <Profile/>;
      case 'Appointments':
        return <List />;
      case 'Records':
        return <Records />;
      default:
        return <Profile />;
    }
  };

  return (
    <>
      <Navbar />
      <div className="Dashboard"> 
        <div className="Board">
          <div className="user">
            <img src="/BlueSkull.png" alt="" />
            <div className="user-data">
              <p>Name: {name}</p>
              <p>Email: {email}</p>
              <p>Sex: {sex}</p>
              <p>Date of Birth: {dob}</p>
              <p>Blood Group: {bloodGroup}</p>
              <button onClick={logout}>Logout</button>
            </div>
          </div>
          <hr />
          <ul>
            <li onClick={() => handleClick('Profile')}>Profile</li>
            <li onClick={() => handleClick('Appointments')}>Appointments</li>
            <li onClick={() => handleClick('Records')}>Medical Records</li>
          </ul>
          {renderSelectedComponent()}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
