import "./categories.css"
import {Link} from "react-router-dom"
import {useQuest} from "../../context/context"
import {MathsQues,ReactQues,JSQues} from "../../db/db"


function Category(){
    function ReactHandler(){
        console.log("react")
        setQuestions(ReactQues)
        dispatchArray({
            type:"Clear"
        })
    }

    function MathsHandler(){
        console.log("maths")
        setQuestions(MathsQues)
        dispatchArray({
            type:"Clear"
        })
    }

    function JsHandler(){
        console.log("js")
        setQuestions(JSQues)
        dispatchArray({
            type:"Clear"
        })
    }


    const {setQuestions,dispatchArray}=useQuest()
    return(
        <div className="cont">
            <div>
                <h1>Aren't you Bored ?, Lets Have Some Fun</h1>
                <p>Getting started is free and easy</p>
            </div>
            <div>
                <h2 className="">Categories Available</h2>
            </div>
            <div className="categories">
                <div className="c1">
                    <img className="cimg" src="./assets/bargraph.svg" alt="none"/>
                    <p>Maths </p>
                    <Link to="/rules"><button className="play" onClick={()=>MathsHandler()} >Lets Play</button></Link>
                </div>
                <div className="c1">
                    <img className="cimg2" src="./assets/coding_game.svg" alt="none"/>
                    <p>React </p>
                    <Link to="/rules"><button className="play" onClick={()=>ReactHandler()}>Lets Play</button></Link>
                </div>
                <div className="c1">
                    <img className="cimg3" src="./assets/html.svg" alt="none"/>
                    <p>HTML-CSS & JS</p>
                    <Link to="/rules"><button className="play" onClick={()=>JsHandler()}>Lets Play</button></Link>
                </div>
            </div>
        </div>
    )
}

export {Category}