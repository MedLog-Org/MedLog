import '../../styles/Dashboard.css';
import Navbar from '../Navbar';
import Profile from './Profile';
import List from './List';
import Records from './Records';
import Footer from '../Footer';
import { useState,useEffect } from 'react';

function Dashboard() {
  const [selectedComponent, setSelectedComponent] = useState('Profile');
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [sex,setSex] = useState('');
  const [dob,setDOB] = useState('');
  const [bloodGroup,setBloodGroup] = useState('');

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
        const user = result.user;
        setName(user.name);
        setEmail(user.email);
        setSex(user.sex);
        setDOB(user.dob);
        setBloodGroup(user.bloodGroup);      
        } catch (err) {
        console.error(err);
        }
    };
    fetchUser();
    }, [name, email, sex, dob, bloodGroup]);

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
