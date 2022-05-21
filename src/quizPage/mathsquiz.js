import "./mathsquiz.css"
import {Link,useNavigate} from "react-router-dom"
import {useQuest} from "../context/context"
import { useState } from "react"


var response=[]
function MathsQuiz() {
    const {questions,active,setActive,setFscore,dispatchArray,arrayState:{mode}}=useQuest()
    
    const [curQuest,setCurQuest]=useState(0)

    const [score,setscore]=useState(0)


    function scoreHandle(a){
        console.log(a.answer)
        console.log("qustion : ",curQuest)
        if(a.isCorrect & curQuest<10) {
            console.log(curQuest)
            setscore(score+1)
            setActive(true)
        }else{
            setActive(true)
        }

        dispatchArray({
            type:"Add_Me",
            payload:a.answer
        })
    }

    const navigate=useNavigate()

    function nextBtn(){
        if (curQuest ===9){
            setFscore(score)
            setCurQuest(0)
            setActive(false)
            navigate("/result")
        }
        else{
            setActive(false)
            setCurQuest(curQuest+1)
        }
    }
    return (
        <div className="questionCon">
            <div className="curQues" style={{backgroundColor:mode?"":"Lavender"}}>
                <div className="score">
                    <h1 className="count" >{score}</h1>
                </div>
                <div className="quest">
                    <h3 className="questn">{curQuest+1}) {questions[curQuest].question} </h3>
                </div>
                <div className="options">
                    {
                        questions[curQuest].options.map((a)=>(
                            <button className="option" key={a.answer} onClick={()=>{scoreHandle(a)}} disabled={active} >{a.answer}</button>
                        ))
                    }
                </div>
                <div className="extBtns">
                    <Link to="/category"><button className="extBtn" >Exit </button></Link>
                    <button className="extBtn2" onClick={()=>nextBtn()} disabled={!active}>Next</button>
                </div>
            </div>
        </div>
    )
}

export { MathsQuiz,response }