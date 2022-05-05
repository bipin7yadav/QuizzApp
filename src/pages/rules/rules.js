import "./rules.css"
import {Link}from "react-router-dom"

function Rules(){
    return(
        <div className="content">
            <div className="Rule">
                <div className="imgC" >
                    <img src="./assets/rules.jpg" alt="none" className="Rulesimg"/>
                </div>
                <div >
                    <ul >
                        <li><h3 className="terms">You will get 60 seconds for each question</h3></li>
                        <li><h3 className="terms">You will get 10 points for each right answer</h3></li>
                        <li><h3 className="terms">You can select only one option at a time </h3></li>
                        <li><h3 className="terms">You cannot go to your previous question</h3></li>
                        <li><h3 className="terms">Dont cheat</h3></li>
                        <li><h3 className="terms">You cannot quit once you start the quiz</h3></li>
                    </ul>
                </div>
                <div>
                    <Link to="/quiz"><button className="begin">Start</button></Link>
                </div>
            </div>
        </div>
    )
}

export {Rules}