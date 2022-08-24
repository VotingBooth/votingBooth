import { useContext, createContext, useState } from "react";
import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup, 
    // signInAnonymously, signOut, onAuthStateChanged 
} from "firebase/auth";



const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState({});

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
    }


    return (
        <AuthContext.Provider value={{googleSignIn, user}}>
            {children}
        </AuthContext.Provider>
    )
}


export const UserAuth = () => {
    return useContext(AuthContext);
}