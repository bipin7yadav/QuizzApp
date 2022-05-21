import { createContext, useContext, useReducer, useState } from "react"

import { MathsQues } from "../db/db"

const QuestContext= createContext()



const QuestProvider =({children})=>{

    const [questions,setQuestions]=useState(MathsQues)
    const [active,setActive]=useState(false)
    const [Fscore,setFscore]=useState(0)

    const reducer=(state,action)=>{
        switch(action.type){
            case "Add_Me":{
                return{
                    ...state,array:[...state.array,action.payload]
                }
            }
            case "Clear":{
                return{
                    ...state,array:[]
                }
            }
            case "DarkMode":{
                return{
                    ...state,mode:!state.mode
                }
            }
            default :{
                return state
            }
        }
    }


    const [arrayState,dispatchArray]=useReducer(reducer,
        {array:[],
        mode:false,
        })

    return(
        <QuestContext.Provider value={{questions,setQuestions,active,setActive,Fscore,setFscore,
        arrayState,dispatchArray}}>
            {children}
        </QuestContext.Provider>
    )
    
}

const useQuest=()=>useContext(QuestContext)

export {useQuest,QuestProvider}