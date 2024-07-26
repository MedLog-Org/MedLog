import Navbar from "./Navbar";
import '../styles/LandingPage.css';
import Footer from "./Footer";
function LandingPage(){
    return(
        <>
            <div className="Home">
                <img src="/BG.png" id="bg"/>
                <Navbar></Navbar>
                <button>Book Appointment</button>
                <img src="/BG2.png" id="bg"/>
                <img src="/BG3.png" id="bg" />
            </div>
            <Footer></Footer>
        </>
        
        
    )
}
export default LandingPage;