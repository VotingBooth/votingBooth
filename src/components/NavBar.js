import { Link } from "react-router-dom";
<<<<<<< HEAD:src/NavBar.js
import './NavBar.scss'
=======
import '.././styling/NavBar.scss'
>>>>>>> 097b955a2c34c20461a3adabbc23b3334fba61ea:src/components/NavBar.js


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