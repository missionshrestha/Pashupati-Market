import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";

// Create an AuthContext
const AuthContext = createContext();

// Define the AuthProvider component
const AuthProvider = ({ children }) => {
    // Define initial state for auth object
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    });

    //default axios equivalent of code in private.js
    axios.defaults.headers.common["Authorization"] = auth?.token;

    useEffect(() => {
        const data = localStorage.getItem('auth')
        if (data) {
            const parseData = JSON.parse(data)
            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    /* 
        useEffect(() => {
            const data = localStorage.getItem('auth');
            if (data) {
                const parseData = JSON.parse(data);
                setAuth(prevAuth => ({
                    ...prevAuth,
                    user: parseData.user,
                    token: parseData.token,
                }));
            }
        }, [setAuth]);
     */
    return (
        // Provide AuthContext with auth state and setAuth function using value prop
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
}

// Define useAuth hook to easily access auth state and setAuth function
const useAuth = () => useContext(AuthContext)

// Export useAuth and AuthProvider for use elsewhere in the application
export { useAuth, AuthProvider }