import '../styles/Login.css'
import {Link} from 'react-router-dom'
function Login(){
    return(
        <div className="Login">
            <div className="login-card">
                <div className="cross"><Link to={'/'}><img src="/cross.png"/></Link></div>
                <input type="email" placeholder='Email' required />
                <input type="password" placeholder='Password' required />
                <button>Login/Sign in</button>
                
                <div className="or"> <hr /><p>Or</p><hr /> </div>

                <div className="google">
                    <img src="/google.png" alt=""/>
                    <p>Login with Google</p>
                </div>
            </div>
        </div>
    )
}
export default Login;