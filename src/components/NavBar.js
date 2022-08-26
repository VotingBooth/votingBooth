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
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;