import './App.css'
import LandingPage from './assets/LandingPage'
import Login from './assets/Login'
import Appointments from './assets/Appointments'
import Dashboard from './assets/User/Dashboard'
import Doc from './assets/Doc/Doc'
import {BrowserRouter, Route,Routes} from 'react-router-dom'
import { useState } from 'react'

function App() {
  const Home = <LandingPage></LandingPage>
  const appointments = <Appointments></Appointments>
  const patient = <Dashboard></Dashboard>
  const doc = <Doc></Doc>
  
  const [userType, setUserType] = useState(''); // Use a more descriptive name
  const [board,setBoard] = useState(<Dashboard/>)
  
  const updateUser=(newUser)=>
  {
    console.log(newUser);

    setUserType(newUser);
    if(newUser=='patient')
    setBoard(patient)
    else if(newUser=='doctor')
    setBoard(doc)
    else
    console.log(newUser);
  };
  const login = <Login userType={userType} updateUser={updateUser}></Login>
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={Home}/>
          <Route path='/login' element={login}/>
          <Route path='/appointments' element={appointments}/>
          <Route path='/dashboard' element={board} /> 
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
