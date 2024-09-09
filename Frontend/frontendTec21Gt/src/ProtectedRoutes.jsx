import { useAuth } from "./context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

function ProtectedRoute(){
    const {user, isAutenticated}= useAuth()

    if(!isAutenticated) return <Navigate to="/login" replace />

    return (
        <Outlet/>
    )
}
export default ProtectedRoute;