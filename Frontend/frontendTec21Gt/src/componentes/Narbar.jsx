import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import logoTec21GT from "../assets/imagenes/LogoTec21GT.png"

function Narbar() {

    const { isAuthenticated, isAdmin, logout, user} = useAuth()

    return (
        <nav className="bg-sky-400 my-3 flex justify-between content-center py-2 px-5 rounded-lg">
            <img src={logoTec21GT} className="object-contain h-32"/>
            <ul className="flex gap-x-2">
                {isAuthenticated ? (
                    <>
                        <li>
                            Bienvenido {user.usuarioEmpleado}
                        </li>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to= '/Catalogo'>Catalogo</Link>
                        </li>
                        <li>
                            <Link to= '/Solicitud'>Solicitudes R/M</Link>
                        </li>
                        <li>
                            <Link to='/Ventas'> Ventas</Link>
                        </li>
                        {isAdmin && (
                            <li>
                                <Link to='/Empleado'>Empleados</Link>
                            </li>
                        )}
                        <li>
                            <Link to="/" onClick={() => {
                                logout()
                            }}> Logout</Link>
                        </li>
                    </>
                ):(
                    <>
                        <li>
                            Inicie sesion
                        </li>
                    </>
                )}
                <Outlet/>
            </ul>
        </nav>
    )
}

export default Narbar;