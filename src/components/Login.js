import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router-dom';
import { signInWithGoogle, signInAnon } from '../helpers/firebase';
import { Helmet } from 'react-helmet-async';

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
            <p>Login below to see your saved polls and results</p>
            <p>You can also Login Anonymously, please note that this will be a one time Login only </p>
            {/* Buttons below use functions imported from firebase helper to initiate firebase login flow */}
            <button onClick={signInWithGoogle}> Login with Google</button>
            <button onClick={signInAnon}> Anonymous Login</button>

        </>
    )
}

export default Login;