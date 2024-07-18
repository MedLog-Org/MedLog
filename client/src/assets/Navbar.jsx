import '../styles/Navbar.css';
function Navbar(){
    return(
        <div className="Navbar">
            <h1>MedLog</h1>
            <ul>
                <li>Home</li>
                <li>Appointments</li>
                <li>Pharmacy</li>
                <li>Help</li>
                <li id="login-btn">Sign in</li>
            </ul>
        </div>
    )
}
export default Navbar;