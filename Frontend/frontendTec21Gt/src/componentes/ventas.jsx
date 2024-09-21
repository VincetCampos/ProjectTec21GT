import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import VentasCard from "./VentasCard"

export const Ventas = () => {
    const [ventas, setVentas] = useState([])
    useEffect(() => {
        (async () => {
            let fetchVentas = await fetch("http://localhost:4000/ventas", { credentials: 'include' })
            let dataVentas = await fetchVentas.json()
            setVentas(dataVentas)
        })()
    }, [])

    return (
        <div className="p-6">
            <Link to='/Ventas/CrearVentas'>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out my-2">
                    Crear Venta
                </button>
            </Link>
            <h1 className="text-2xl font-bold mb-4">Ventas</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-6 p-4 bg-gray-100 rounded-lg shadow-lg">
                {ventas.map((venta) => (
                    <Link to={`/ventas/${venta.noVenta}`} key={venta.noVenta}>
                        <VentasCard venta={venta} key={venta.noVenta}/>
                    </Link>
                ))}
            </div>
        </div>
    )
}