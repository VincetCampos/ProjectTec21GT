import { Link, Outlet } from "react-router-dom";
import logoTec21GT from "../assets/imagenes/LogoTec21GT.png"

function Narbar() {
    return (
        <nav className="bg-sky-400 my-3 flex justify-between content-center py-2 px-5 rounded-lg">
            <img src={logoTec21GT} className="object-contain h-32"/>
            <ul className="flex gap-x-2">
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to= '/Catalogo'>Catalogo</Link>
                </li>
                <li>
                    <Link to= '/Producto'>Ingreso Producto</Link>
                </li>
                <li>
                    <Link to= '/equipos'>Ingreso equipos</Link>
                </li>
                <li>
                    <Link to='/Empleado'>Empleados</Link>
                </li>
                <Outlet/>
            </ul>
        </nav>
    )
}

export default Narbar;