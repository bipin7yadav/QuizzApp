import "./header.css"
import {Link} from "react-router-dom"
function Header() {
    return (
        <div className="header">
            <div className="webName">
                <Link to="/"><span className='material-icons icon'>sports_esports</span></Link>
            </div>
            <div className="rightIcons">
                <span class='material-icons icon'>dark_mode</span>
                <Link to="/login"><span class='material-icons icon'>person</span></Link>
            </div>
        </div>
    )
}

export { Header }