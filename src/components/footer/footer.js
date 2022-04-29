import "./footer.css"
function Footer() {
    return (
        <div className="footer">
            <div>
                <h2>Made With {`</>`} By Bipin Yadav </h2>
            </div>
            <div className="social">
                <a href="https://www.linkedin.com/in/bipin-yadav-07a08217a/">
                    <i className="fa fa-linkedin footIcons"></i>
                </a>

                <a href="https://twitter.com/bipinyadav9769">
                    <i className="fa fa-twitter footIcons"></i>
                </a>

                <a href="https://github.com/bipin7yadav">
                    <i className="fa fa-github footIcons"></i>
                </a>

            </div>
        </div>
    )
}

export { Footer }