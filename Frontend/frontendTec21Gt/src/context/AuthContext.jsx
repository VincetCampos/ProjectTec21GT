import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest } from '../api/auth';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            const data = await res.json();
            console.log(data);
            setUser(data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

    }, [])

    return (
        <AuthContext.Provider value={{
            signin,
            user,
            isAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    )
}
