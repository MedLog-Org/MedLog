import '../styles/Login.css'
function Login(){
    return(
        <div className="Login">
            <div className="login-card">
                <div className="cross"><img src="/cross.png"/></div>
                <input type="email" placeholder='Email' required />
                <input type="password" placeholder='Password' required />
                <button>Login/Sign in</button>
                
                <div className="google">
                    <img src="/google.png" alt="" id='google'/>
                    <p>Login with Google</p>
                </div>
            </div>
        </div>
    )
}
export default Login;