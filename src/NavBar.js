import { Link } from "react-router-dom";


const NavBar = () => {
    return (
        <>
            <nav>
                <Link to="/">Voting Booth</Link>            
                <ul>
                    <li>
                        Login
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