import { Link } from "react-router-dom";
import { UserAuth } from "./AuthContext";


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
        <>
            <nav>
                <Link to="/">Voting Booth</Link>            
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
            </nav>
        </>
    )
}

export default NavBar;