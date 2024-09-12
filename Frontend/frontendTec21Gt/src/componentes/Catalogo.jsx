import { useEffect, useState } from "react"
import CatalogoCard from "./CatalogoCard"
import "../estilos/productos.css"
import { Link } from 'react-router-dom'

export const Catalogo = () => {

    const [producto, SetProducto] = useState([])
    useEffect( () => {

        (async () =>{
            let fetchProduc = await fetch("http://localhost:4000/Productos", {credentials: 'include'})
            let dataProduct = await fetchProduc.json()
            SetProducto(dataProduct)
        })()

    }, [])

    return (
        <>
            <div className="grid grid-cols-3 gap-2 m-6" >
                {producto.map((producto) => (
                    <Link to={`/producto/${producto.noProducto}`} key={producto.noProducto}>
                        <CatalogoCard producto={producto} key={producto.noProducto}/>
                    </Link>
                ))}
            </div>
        </>
    )
}