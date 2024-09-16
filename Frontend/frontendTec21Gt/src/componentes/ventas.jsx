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
        <div>
            <Link to='/Ventas/CrearVentas'>
                <button>Crear Venta</button>
            </Link>
            <h1>Ventas</h1>
            <div>
                {ventas.map((venta) => (
                    <Link to={`/ventas/${venta.noVenta}`} key={venta.noVenta}>
                        <VentasCard venta={venta} key={venta.noVenta}/>
                    </Link>
                ))}
            </div>
        </div>
    )
}