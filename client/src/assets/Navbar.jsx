import '../styles/Navbar.css'
import {Link} from 'react-router-dom'
function Navbar(){
    return(
        <>
        <div className="Navbar">
            <h1>MedLog</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/appointments">Appointments</Link></li>
                <li><Link to="/pharmacy">Pharmacy</Link></li>
                <li><Link to="/help">Help</Link></li>
                <li><Link to="/login" id='btn'>Sign in</Link></li>
            </ul>
        </div>
        <div className="toggle">
        <h1>MedLog</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/appointments">Appointments</Link></li>
                <li><Link to="/pharmacy">Pharmacy</Link></li>
                <li><Link to="/help">Help</Link></li>
                <li><Link to="/login" id='btn'>Sign in</Link></li>
            </ul>
        </div>
        </>
    )
}
export default Navbar;