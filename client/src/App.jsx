import './App.css'
import LandingPage from './assets/LandingPage'
import Login from './assets/Login'
import Appointments from './assets/Appointments'
import Dashboard from './assets/User/Dashboard'
import Doc from './assets/Doc/Doc'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function App() {
  const Home = <LandingPage></LandingPage>
  const appointments = <Appointments></Appointments>
  const patient = <Dashboard></Dashboard>
  const doc = <Doc></Doc>
  const login = <Login></Login>

  const [component,setComponent] = useState(null)
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const URL = "http://localhost:8000/";
        const response = await fetch(`${URL}`, {
          method: 'GET',
          credentials: 'include',
        });
        const result = await response.json();
        console.log(result);
        if(result.isLoggedIn){
          const userType = result.user.userType;
          setIsLogged(true);
          if(userType === 'patient'){
            setComponent(patient);
          }
          else if(userType === 'doctor'){
            setComponent(doc);
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
          <Route path='/appointments' element={appointments} />
          {isLogged && <Route path='/dashboard' element={component} />}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
