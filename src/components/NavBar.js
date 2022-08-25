import { Link } from "react-router-dom";
import '.././styling/NavBar.scss'


const NavBar = () => {
    const {user, logOut} = UserAuth();
    const handleSignOut = async() => {
        try {
            await logOut()
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
                        { user?.displayName ? 
                        <button onClick={handleSignOut}>Logout</button>
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