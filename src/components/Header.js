import NavBar from "./NavBar";
import '.././styling/Header.scss'

function Header() {
    return (
        <>
            <NavBar />
            <div className="wrapper appInfo">
                <h2>Welcome to your favorite Anonymous Voting Booth</h2>
                <p>Enter your poll question below, along with options and we will create a shareable link.</p>
                <p>Reducing the stress of decision making, one poll at a time </p>
            </div>
        </>
    )
}

export default Header;