import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router-dom';
import { signInWithGoogle, signInAnon } from '../helpers/firebase';
import { Helmet } from 'react-helmet-async';
import '.././styling/Login.scss';
import { FaGoogle, FaGhost } from 'react-icons/fa';

// Login Component to allow user to log in to account to save Polls
function Login() {
    // Creating a variable containing currentUser item that is imported through the AuthContext Component.
    const { currentUser } = useContext(AuthContext);
    // if currentUser exists (and as such they are already logged in) we navigate user directly to the saved polls page as they have no use for the login page
    if (currentUser) {
        return <Navigate to="/saved" replace />;
    }

    return (
        <>
            {/* Helmet used to update Document Title */}
            <Helmet>
                <title>Login to Save Polls</title>
            </Helmet>
            <section className='loginContainer'>
                <h2 className='loginTitle'>Login:</h2>
                <div className='signInContainer'>
                    <p>Login below to see your saved polls and results</p>
                    <button className="loginButton" onClick={signInWithGoogle}>
                        <div className='buttonText'>
                            <FaGoogle />Login with Google
                        </div>
                    </button>
                </div>
                <div className='signInContainer'>
                    <p>You can also login anonymously, please note that this will be a one time login only </p>
                    <button className='loginButton' onClick={signInAnon}>
                        <div className='buttonText'>
                            <FaGhost /> Anonymous Login
                        </div>
                    </button>
                </div>
            </section>
        </>
    )
}

export default Login;