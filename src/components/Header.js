import NavBar from "./NavBar";
<<<<<<< HEAD:src/Header.js
import './Header.scss'
=======
import '.././styling/Header.scss'
>>>>>>> 097b955a2c34c20461a3adabbc23b3334fba61ea:src/components/Header.js

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