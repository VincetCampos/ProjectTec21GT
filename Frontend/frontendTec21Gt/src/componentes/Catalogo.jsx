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
        <div>
            <div className="p-6">
                <Link to={"/Producto"}>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out my-5">Ingresar Nuevo Producto</button>
                </Link>
                <h1 className="text-2xl font-bold">Productos</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-6 p-4 bg-gray-100 rounded-lg shadow-lg" >
                {producto.map((producto) => (
                    <Link to={`/producto/${producto.noProducto}`} key={producto.noProducto}>
                        <CatalogoCard producto={producto} key={producto.noProducto}/>
                    </Link>
                ))}
            </div>
        </div>
    )
}