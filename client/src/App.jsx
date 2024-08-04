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

  const [user, setUser] = useState(null);

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
        setUser(result.user);
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
          <Route path='/dashboard' element={
            user ? (
              user.userType === 'patient' ? patient : doc
            ) : (
              <Navigate to='/login' replace />
            )
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
