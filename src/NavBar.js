import { Link } from "react-router-dom";


const NavBar = () => {
    return (
        <>
            <nav>
                <Link to="/">Voting Booth</Link>            
                <ul>
                    <li>
                        <a href="#">Login</a>
                    </li>
                    <li>
                        <a href="#">About</a>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default NavBar;