import './App.css'
import LandingPage from './assets/LandingPage'
import Login from './assets/Login'
import Appointments from './assets/Appointments'
import {BrowserRouter, Route,Routes} from 'react-router-dom'

function App() {
  const Home = <LandingPage></LandingPage>
  const login = <Login></Login>
  const appointments=<Appointments></Appointments>
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={Home}/>
          <Route path='/login' element={login}/>
          <Route path='/appointments' element={appointments}/>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
