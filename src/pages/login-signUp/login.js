import { Link, useLocation, useNavigate } from "react-router-dom"
import "./auth.css"
import {useAuth} from "../../Authentication/authContext"
function Login() {
    const {login,setLogin}=useAuth();
    const location=useLocation();
    const navigate=useNavigate()
    return (
        <div className="loginForm">
            <div className="lContent">
                <div>
                    <h2>Login</h2>
                </div>
                <div className="inp">
                    <label>Email*</label>
                    <input type="email" className="inputs" />
                </div>
                <div className="inp">
                    <label>Password*</label>
                    <input type="password" className="inputs" />
                </div>
                <div>
                    <button className="btns">Login</button>
                </div>
                <div>
                    <Link to="/category">
                        <button className="btns"
                        onClick={()=>{
                            setLogin(!login)
                            navigate(location.state.from.pathname)
                        }}
                        >
                            Login as Guest {login?"logout":"login"}
                        </button>
                    </Link>
                </div>
                <div>
                    <p>Don't have an account <Link to="/signup">Create One</Link> </p>
                </div>
            </div>
        </div>
    )
}

export { Login }