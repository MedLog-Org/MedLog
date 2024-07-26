import '../../styles/Dashboard.css'
import Navbar from '../Navbar'
import Profile from './Profile';
import List from './List';
import Records from './Records';
import Footer from '../Footer'
import { useState } from 'react';
function Dashboard(){
    const [selectedComponent, setSelectedComponent] = useState('Profile');

    const handleClick = (component) => {
      setSelectedComponent(component);
    };
  
    const renderSelectedComponent = () => {
      switch (selectedComponent) {
        case 'Profile':
          return <Profile />;
        case 'Appointments':
          return <List />;
        case 'Records':
          return <Records />;
        default:
          return <Profile/>;
      }
    };
    
    return(
      <>
        <Navbar></Navbar>
        <div className="Dashboard"> 
            <div className="Board">
                <div className="user">
                    <img src="/BlueSkull.png" alt="" />
                    <div className="user-data">
                        <p>Name: Sumit Kumar</p>
                        <p>Email: sumit.bio21@iitg.ac.in</p>
                        <p>Sex: Male</p>
                        <p>Data of Birth: 01/01/2000</p>
                        <p>Blood Group: B+</p>
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
        <Footer></Footer>
        </>
    )
}
export default Dashboard;