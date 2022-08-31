import { createContext, useState, useEffect } from "react";
import { auth } from "./../helpers/firebase";

// Auth Context Component used to share logged in user status across components. Specifically the currentUser state.
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);


    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};