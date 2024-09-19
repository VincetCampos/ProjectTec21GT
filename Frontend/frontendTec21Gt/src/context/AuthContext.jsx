import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest } from '../api/auth';
import Cookies from 'js-cookie';

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
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            const data = await res.json();
            Cookies.set('token', data.token, { expires: 5/24 });
            //console.log(data);
            setUser(data);
            setIsAuthenticated(true);
            setIsAdmin(data.tipoEmpleado === 'Administrador')
            console.log(isAuthenticated)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const token = Cookies.get('token');
        //console.log(token)
        if (!token) {
            setIsAuthenticated(false);
            setUser(null)
            setLoading(false)
            setIsAdmin(false)
            return;
        }
        const verifyToken = async () => {
            try {
                const res = await fetch('http://localhost:4000/login/verify', {
                        /*headers: {
                            'Authorization': `Bearer ${token}`
                        },*/
                    credentials: 'include'
                });
                const data = await res.json();
                if(!res.data){
                    setIsAuthenticated(false);
                    setLoading(false)
                    return
                }
                setUser(data.user);
                setIsAuthenticated(true);
                //console.log(isAuthenticated)
                setIsAdmin(data.user.tipoEmpleado === 'Administrador')
                setLoading(false)
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                setIsAdmin(false)
                setLoading(false)
            }
        }
            verifyToken();
    }, []);

    return (
        <AuthContext.Provider value={{
            signin,
            user,
            isAuthenticated,
            isAdmin,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}
