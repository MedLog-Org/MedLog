import './App.css'
import LandingPage from './assets/LandingPage'
import Login from './assets/Login'
import Appointments from './assets/Appointments'
import Dashboard from './assets/User/Dashboard'
import Doc from './assets/Doc/Doc'
import NotFound from './assets/NotFound'
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
  const [path,setPath] = useState('');
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
          const str = `/dashboard/${result.user._id}`;
          setPath(str);
          console.log(path)
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
          {isLogged && <Route path={path} element={component} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
