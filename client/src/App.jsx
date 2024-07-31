import './App.css'
import LandingPage from './assets/LandingPage'
import Login from './assets/Login'
import Appointments from './assets/Appointments'
import Dashboard from './assets/User/Dashboard'
import Doc from './assets/Doc/Doc'
import {BrowserRouter, Route,Routes} from 'react-router-dom'

function App() {
  const Home = <LandingPage></LandingPage>
  const login = <Login></Login>
  const appointments = <Appointments></Appointments>
  const dashboard = <Dashboard></Dashboard>
  const doc = <Doc></Doc>
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={Home}/>
          <Route path='/login' element={login}/>
          <Route path='/appointments' element={appointments}/>
          <Route path='/dashboard' element={dashboard}/>
          <Route path='/pharmacy' element={doc}/>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
