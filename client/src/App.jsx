import './App.css'
import LandingPage from './assets/LandingPage'
import Login from './assets/Login'
import Appointments from './assets/Appointments'
import Dashboard from './assets/User/Dashboard'
import Doc from './assets/Doc/Doc'
import {BrowserRouter, Route,Routes} from 'react-router-dom'
import { useState,useEffect } from 'react'

function App() {
  const Home = <LandingPage></LandingPage>
  const appointments = <Appointments></Appointments>
  const patient = <Dashboard></Dashboard>
  const doc = <Doc></Doc>
  const login = <Login></Login>

  const [userComponent,setUserComponent] = useState(patient);

  useEffect(() => {
    const fetchUser = async () => {
        try {
          const URL = "http://localhost:8000/";
          const response = await fetch(`${URL}`, {
              method: 'GET',
              credentials: 'include',
          });
          const result = await response.json();
          const data = result.user;
          console.log(data.userType);
          if(data.userType=='patient')
            setUserComponent(patient);
          else if(data.userType=='doctor')
            setUserComponent(doc);
          else
          console.log(result);

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
          <Route path='/' element={Home}/>
          <Route path='/login' element={login}/>
          <Route path='/appointments' element={appointments}/>
          <Route path='/dashboard' element={userComponent} /> 
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
