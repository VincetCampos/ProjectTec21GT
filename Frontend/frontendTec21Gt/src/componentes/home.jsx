import { Link } from "react-router-dom"
export const Home = () =>{

    return(
        <>
            <div className="">
                <header className="bg-white shadow-md py-12">
                    <div className="container mx-auto text-center my-5">
                        <h2 className="text-4xl font-bold mb-4">Bienvenido al Sistema de Gestión</h2>
                        <p className="text-lg text-gray-700 mb-8">Gestiona tus solicitudes y repuestos de manera eficiente y rápida.</p>
                        <Link to="/Equipos" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">
                            Crear Nueva Solicitud
                        </Link>
                    </div>
                    <div className="container mx-auto text-center my-5">
                        <p className="text-lg text-gray-700 mb-8">Ingresa los producto recien ingresados.</p>
                        <Link to="/Producto" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">
                            Ingresar Nuevo Producto
                        </Link>
                    </div>
                    <div className="container mx-auto text-center my-5">
                        <p className="text-lg text-gray-700 mb-8">Gestiona las ventas de manera rapida.</p>
                        <Link to="/Ventas/CrearVentas" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">
                            Crear Nueva Venta
                        </Link>
                    </div>
                </header>
            </div>
        </>
    )
}