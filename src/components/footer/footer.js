import "./footer.css"
import {useQuest} from "../../context/context"

function Footer() {
    const {arrayState:{mode}}=useQuest()
    return (
        <div className="footer" style={{backgroundColor:mode ? "skyBlue":"midNightBlue",color:mode?"inherit":"white"}}>
            <div>
                <h2>Made With {`</>`} By Bipin Yadav </h2>
            </div>
            <div className="social">
                <a href="https://www.linkedin.com/in/bipin-yadav-07a08217a/">
                    <i className="fa fa-linkedin footIcons" style={{color:mode?"inherit":"white"}}></i>
                </a>

                <a href="https://twitter.com/bipinyadav9769">
                    <i className="fa fa-twitter footIcons" style={{color:mode?"inherit":"white"}}></i>
                </a>

                <a href="https://github.com/bipin7yadav">
                    <i className="fa fa-github footIcons" style={{color:mode?"inherit":"white"}}></i>
                </a>

            </div>
        </div>
    )
}

export { Footer }