import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router-dom';
import { signInWithGoogle, signInAnon } from '../helpers/firebase';
import { Helmet } from 'react-helmet-async';


function Login() {
    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Navigate to="/saved" replace />;
    }


    return (
        <>
            <Helmet>
                <title>Login to Save Polls</title>
            </Helmet>
            <p>Login below to see your saved polls and results</p>
            <p>You can also Login Anonymously, please note that this will be a one time Login only </p>
            <button onClick={signInWithGoogle}> Login with Google</button>
            <button onClick={signInAnon}> Anonymous Login</button>

        </>
    )
}

export default Login;