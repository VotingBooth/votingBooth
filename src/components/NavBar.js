import { Link } from "react-router-dom";
import { logout } from "../helpers/firebase";
import { useContext } from "react";
import { AuthContext} from './AuthContext';
import "../styling/NavBar.scss"

const NavBar = () => {

    const { currentUser } = useContext(AuthContext);

    const handleSignOut = async() => {
        try {
            await logout()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <nav>
            <div className="navContent">
                <h1>
                    <Link to="/" className="homeButton">Voting Booth</Link>
                </h1>
                <ul>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/saved">Saved Polls</Link>
                    </li>
                    <li>
                        { currentUser ?
                        <Link to="/" onClick={handleSignOut}>Logout</Link>
                        : 
                        <Link to="/login">Login</Link>
                        }
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;