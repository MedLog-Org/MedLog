import './App.css'
import LandingPage from './assets/LandingPage'
import Login from './assets/Login'
import {BrowserRouter, Route,Routes} from 'react-router-dom'

function App() {
  const Home = <LandingPage></LandingPage>
  const login = <Login></Login>
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={Home}/>
          <Route path='/login' element={login}/>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
