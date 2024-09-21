import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import logoTec21GT from "../assets/imagenes/LogoTec21GT.png"

function Narbar() {

    const { isAuthenticated, isAdmin, logout, user} = useAuth()

    return (
        <nav className="bg-blue-500 text-white p-4 shadow-lg">
            <img src={logoTec21GT} className="object-contain h-32"/>
            <ul ul className="flex space-x-4 justify-end text-white">
                {isAuthenticated ? (
                    <>
                        <li>
                            Bienvenido {user.usuarioEmpleado}
                        </li>
                        <li>
                            <Link to='/' className="hover:text-gray-200 transition duration-300">Home</Link>
                        </li>
                        <li>
                            <Link to= '/Catalogo' className="hover:text-gray-200 transition duration-300">Catalogo</Link>
                        </li>
                        <li>
                            <Link to= '/Solicitud' className="hover:text-gray-200 transition duration-300">Solicitudes R/M</Link>
                        </li>
                        <li>
                            <Link to='/Ventas' className="hover:text-gray-200 transition duration-300"> Ventas</Link>
                        </li>
                        {isAdmin && (
                            <li>
                                <Link to='/Empleado' className="hover:text-gray-200 transition duration-300">Empleados</Link>
                            </li>
                        )}
                        <li>
                            <Link to="/" onClick={() => {
                                logout()
                            }} className="hover:text-gray-200 transition duration-300"> Logout</Link>
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