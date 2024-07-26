import '../../styles/Dashboard.css';
import Navbar from '../Navbar';
import Profile from './Profile';
import List from './List';
import Records from './Records';
import Footer from '../Footer';
import { useState } from 'react';

function Dashboard() {
  const [selectedComponent, setSelectedComponent] = useState('Profile');

  const [userData, setUserData] = useState({
    name: 'Sumit Kumar',
    email: 'sumit.bio21@iitg.ac.in',
    sex: 'Male',
    dob: '01/01/2000',
    bloodGroup: 'B+',
  });

  const handleClick = (component) => {
    setSelectedComponent(component);
  };

  const handleSaveProfile = (updatedProfile) => {
    setUserData(updatedProfile);
  };

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'Profile':
        return <Profile onSave={handleSaveProfile} userData={userData} />;
      case 'Appointments':
        return <List />;
      case 'Records':
        return <Records />;
      default:
        return <Profile onSave={handleSaveProfile} userData={userData} />;
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
              <p>Name: {userData.name}</p>
              <p>Email: {userData.email}</p>
              <p>Sex: {userData.sex}</p>
              <p>Date of Birth: {userData.dob}</p>
              <p>Blood Group: {userData.bloodGroup}</p>
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
