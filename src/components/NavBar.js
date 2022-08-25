import { Link } from "react-router-dom";
import '.././styling/NavBar.scss'

const NavBar = () => {
    return (
        <nav>
            <div className="wrapper navContent">
                <Link to="/" className="homeButton">Voting Booth</Link>
                <ul>
                    <li>
                        Login
                    </li>
                    <li>
                        About
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;