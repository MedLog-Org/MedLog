import '../styles/Login.css'
import Navbar from './Navbar';
import {Link} from 'react-router-dom'
function Login(){
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
    
        try {
          const result = await signInWithPopup(auth,   
     provider);
          const   
     user = result.user;
          // Handle successful sign-in, e.g., redirect to home page or store user data
          console.log(user);
        } catch (error) {
          // Handle errors, e.g., display an error message
          console.error(error);
        }
      };
    
    return(
        <div className="Login">
            <Navbar></Navbar>
            <div className="login-card">
                <div className="cross"><Link to={'/'}><img src="/cross.png"/></Link></div>
                <input type="email" placeholder='Email' required />
                <input type="password" placeholder='Password' required />
                <button>Login/Sign in</button>
                <div className="or"> <hr /><p>Or</p><hr /> </div>
                <div className="google">
                    <img src="/google.png" alt=""/>
                    <p onClick={handleGoogleSignIn}>Login with Google</p>
                </div>
            </div>
        </div>
    )
}
export default Login;