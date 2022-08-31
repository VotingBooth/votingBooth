import { Link } from "react-router-dom";
import { logout } from "../helpers/firebase";
import { useContext, useState } from "react";
import { AuthContext } from './AuthContext';
import "../styling/NavBar.scss";
import { ReactComponent as CloseMenu } from ".././assets/closeButton.svg";
import { ReactComponent as OpenMenu } from ".././assets/burgerBars.svg";

// NavBar Component that contains both full screen nav and mobile nav
function NavBar() {
    // Creating a variable containing currentUser item that is imported through the AuthContext Component.
    const { currentUser } = useContext(AuthContext);
    // Creating state variables that will be used to show and hide mobile menu dependent on "click" status.
    const [click, setClick] = useState(false);


    // handleClick that set's click to the opposite of it's current status.
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    // signOut function using the "logout" function that is imported from firebase. Also set's click to false to close mobile menu (irrelevent on full screen nav)
    const handleSignOut = async () => {
        try {
            await logout();
            setClick(false);
        } catch (error) {
            console.log(error);
            setClick(false);
        }
    }

    return (
        <nav>
            <div className="navContent">
                {/* H1 and Home Button in Nav */}
                <h1>
                    <Link to="/" className="homeButton">Voting Booth</Link>
                </h1>
                {/* onClick on this div set's click state to the opposite of it's existing state, this openeing or closing the hambirger menu. Conditional rendering decides whether to show hamburder button or close icon */}
                <div onClick={handleClick}>
                    {click ? (
                        <CloseMenu className='burgerButton'><p className='sr-only'>Close</p></CloseMenu>
                    ) : (
                        <OpenMenu className='burgerButton'><p className='sr-only'>Open</p></OpenMenu>
                    )}
                </div>
                {/* Depending on click state the ul will have a difference class. We use the differing classes (along with CSS) to render the mobile nav vs full screen nav */}
                <ul className={click ? 'navmobile' : 'nav'}>
                    {/* Each Link below has an onClick even that sets click status to false and as such (through CSS & the ul above) will close the mobilenav  */}
                    <li>
                        <Link to="/about" onClick={closeMobileMenu} >About</Link>
                    </li>
                    <li>
                        <Link to="/saved" onClick={closeMobileMenu} >Saved Polls</Link>
                    </li>
                    <li>
                        {/* Conditional Rendering to either show Logout or Login dependent on if user is logged in (determined through currentUser and Auth) */}
                        {currentUser ?
                            <Link to="/" onClick={handleSignOut} >Logout</Link>
                            :
                            <Link to="/login" onClick={closeMobileMenu}>Login</Link>
                        }
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;