import { Link } from "react-router-dom";
import { logout } from "../helpers/firebase";
import { useContext, useState } from "react";
import { AuthContext } from './AuthContext';
import "../styling/NavBar.scss"
import { ReactComponent as CloseMenu } from ".././assets/closeButton.svg";
import { ReactComponent as OpenMenu } from ".././assets/burgerBars.svg";

const NavBar = () => {

    const { currentUser } = useContext(AuthContext);
    const [click, setClick] = useState(false);


    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const handleSignOut = async () => {
        try {
            await logout()
            setClick(false)
        } catch (error) {
            console.log(error)
            setClick(false)
        }
    }

    return (

        <nav>
            <div className="navContent">
                <h1>
                    <Link to="/" className="homeButton">Voting Booth</Link>
                </h1>
                <div onClick={handleClick}>
                    {click ? (
                        <CloseMenu className='burgerButton'><p className='sr-only'>Close</p></CloseMenu>
                    ) : (
                        <OpenMenu className='burgerButton'><p className='sr-only'>Open</p></OpenMenu>
                    )}
                </div>
                <ul className={click ? 'navmobile' : 'nav'}>
                    <li>
                        <Link to="/about" onClick={closeMobileMenu} >About</Link>
                    </li>
                    <li>
                        <Link to="/saved" onClick={closeMobileMenu} >Saved Polls</Link>
                    </li>
                    <li>
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