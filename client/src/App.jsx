import './App.css'
import LandingPage from './assets/LandingPage'
import Login from './assets/Login'
import Appointments from './assets/Appointments'
import Dashboard from './assets/User/Dashboard'
import Doc from './assets/Doc/Doc'
import NotFound from './assets/NotFound'
import Doc_appointment from './assets/Doc/Doc_appointment'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { server_URL } from './var'

function App() {
  const Home = <LandingPage></LandingPage>
  const appointments = <Appointments></Appointments>
  const patient = <Dashboard></Dashboard>
  const doc = <Doc></Doc>
  const login = <Login></Login>
  const docAppointment = <Doc_appointment></Doc_appointment>
  const [component,setComponent] = useState(null)
  const [isLogged, setIsLogged] = useState(false);
  const [path,setPath] = useState('');
  const [appointmentType,setAppointmentType] = useState(login);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(server_URL, {
          method: 'GET',
          credentials: 'include',
        });
        const result = await response.json();

        if(result.isLoggedIn){
          const userType = result.user.userType;
          setIsLogged(true);
          // const str = `/dashboard/${result.user._id}`;
          const str = '/dashboard';
          setPath(str);
          
          if(userType === 'patient'){
            setComponent(patient);
            setAppointmentType(appointments)
          }
          else if(userType === 'doctor'){
            setComponent(doc);
            setAppointmentType(docAppointment)
          }
          else{
            console.log(userType);
          }
        }
        
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={Home} />
          <Route path='/login' element={login} />
          <Route path='/appointments' element={appointmentType} />
          {isLogged && <Route path={path} element={component} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
