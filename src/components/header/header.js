import "./header.css"
import {Link} from "react-router-dom"
import {useQuest} from "../../context/context"

function Header() {
    // const [switcher,setSwitcher]=useState(false)
    function modeSwitcher(){
        dispatchArray({
            type:"DarkMode",

        })
    }
    
    
    const {arrayState:{mode},dispatchArray}=useQuest()
    return (
        <div className="header" style={{backgroundColor:mode ? "skyBlue":"midNightBlue",color:mode?"inherit":"white"}}>
            <div className="webName">
                <Link to="/" ><span className='material-icons icon' style={{color:mode?"inherit":"mintCream"}} >sports_esports</span></Link>
            </div>
            <div className="rightIcons">
                <button className="mode" style={{backgroundColor:mode?"inherit":"midNightBlue"}} onClick={()=>{modeSwitcher()}}><span class='material-icons icon' style={{color:mode?"inherit":"mintCream" ,backgroundColor:mode?"inherit":"midNightBlue"}}>dark_mode</span></button>
                <Link to="/login"><span class='material-icons icon' style={{color:mode?"inherit":"mintCream"}}>person</span></Link>
            </div>
        </div>
    )
}

export { Header }