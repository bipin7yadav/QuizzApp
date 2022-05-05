import "./result.css"
import {useQuest} from "../../context/context"
import {response} from "../../quizPage/mathsquiz"

function Result(){
    const {questions,Fscore,arrayState:{array}}=useQuest()
    return(
        <div className="Result">
            <div className="card"><div className="scoreCard">You Scored {Fscore} out of 10</div></div>
            <div className="mapping label">
                <div>Response</div>
                <div>question</div>
                <div>Answer</div>
            </div>
            {questions.map((a,index)=>
            <div className="mapping">
                <div> {array[index]}</div>
                <div className="question">{a.question}</div>
                <div className="isCorrect">{a.options.map((a)=>
                a.isCorrect?<div>{a.answer}</div>:null
                // <div>{a.answer}</div>
                )}
                </div>
            </div>
            )}
        </div>

    )
}

export {Result}