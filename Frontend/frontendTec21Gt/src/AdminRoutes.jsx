import { useAuth } from "./context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

function AdminRoute(){
    const {isAdmin} = useAuth()
    if(!isAdmin) return <Navigate to="/" replace />

    return(
        <Outlet/>
    )
}

export default AdminRoute;