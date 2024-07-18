import Navbar from "./Navbar";
import '../styles/LandingPage.css';
function LandingPage(){
    return(
        <div className="Home">
            <img src="/BG.png"/>
            <Navbar></Navbar>
            <button>Book Appointment</button>
            <img src="/BG2.png"/>
            <img src="/BG3.png" alt="" />
        </div>
        
    )
}
export default LandingPage;