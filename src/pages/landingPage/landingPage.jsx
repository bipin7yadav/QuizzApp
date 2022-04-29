import "./landingPage.css"
import {Link} from "react-router-dom"
function LandingPage(){
    return(
        <div className="logo">
            <div className="main-img">
                <img src="./assets/math.svg" alt="nothing" className="mimg"/>
            </div>
            <div className="btn">
                <div>
                    <h1>Extraordinary Creative Quiz Games</h1>
                </div>
                <div>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt, enim?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis dolorem ratione magni ab in quaerat pariatur expedita ipsa odio obcaecati.
                    </p>
                </div>
                <div>
                    <Link to="/category">
                    <button className="start"><strong>Explore</strong></button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export {LandingPage}