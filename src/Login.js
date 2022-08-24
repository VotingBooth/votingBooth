import GoogleButton from 'react-google-button'; 
// https://www.npmjs.com/package/react-google-button
import { UserAuth } from './AuthContext';

function Login() {

    const handleGoogleSignIn = async () => {

        const { googleSignIn } = UserAuth();

        try {
            await googleSignIn()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <GoogleButton onClick={handleGoogleSignIn} />
        </>
    )
}

export default Login;