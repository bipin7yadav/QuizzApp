import "./categories.css"
function Category(){
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
                    <p>Maths Quiz</p>
                    <button className="play">Lets Play</button>
                </div>
                <div className="c1">
                    <img className="cimg2" src="./assets/coding_game.svg" alt="none"/>
                    <p>React Quiz</p>
                    <button className="play">Lets Play</button>
                </div>
                <div className="c1">
                    <img className="cimg3" src="./assets/html.svg" alt="none"/>
                    <p>HTML ,CSS , AND JS QUIZ</p>
                    <button className="play">Lets Play</button>
                </div>
            </div>
        </div>
    )
}

export {Category}