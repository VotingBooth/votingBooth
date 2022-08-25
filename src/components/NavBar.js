import { Link } from "react-router-dom";
import { logout } from "../helpers/firebase";
import { useContext } from "react";
import { AuthContext} from './AuthContext';

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
            <div className="wrapper navContent">
                <Link to="/" className="homeButton">Voting Booth</Link>
                <ul>
                    <li>
                        { currentUser ?
                        <button to="/" onClick={handleSignOut}>Logout</button>
                        : 
                        <Link to="/login">Login</Link>
                        }
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