import "./error.css"
function Error(){
    return(
        <div className="Broken">
            <div>
                <img src="./assets/Broken.svg" alt="none"/>
                <div>
                <h1>Looks Like Your Link is Broken</h1>
            </div>
            </div>
        </div>
    )
}

export {Error}