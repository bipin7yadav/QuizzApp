import { Link } from "react-router-dom"
import "./auth.css"
import {useQuest} from "../../context/context"

function SignUp() {
    const {arrayState:{mode}}=useQuest()
    return (
        <div className="loginForm" >
            <div className="scontent" style={{backgroundColor:mode?"inherit":"seashell"}}>
                <div>
                    <h2>SignUp</h2>
                </div>
                <div className="inp">
                    <label>First Name*</label>
                    <input type="text" className="inputs" />
                </div>
                <div className="inp">
                    <label>Last Name*</label>
                    <input type="text" className="inputs" />
                </div>
                <div className="inp">
                    <label>Password*</label>
                    <input type="password" className="inputs" />
                </div>
                <div className="inp">
                    <label>Set Password*</label>
                    <input type="password" className="inputs" />
                </div>

                <div>
                    <Link to="/login">
                        <button className="btns">
                            SIGN UP
                        </button>
                    </Link>
                </div>
                <div>
                    <p>Already have an account <Link to="/login"> Login</Link> </p>
                </div>
            </div>
        </div>
    )
}

export { SignUp }