import { useState } from "react"
import "../estilos/productos.css"

export const Productos = ()=>{

    const endpointProducto = "http://localhost:4000/productos"

    const [producto, SetProducto] = useState({
        noProducto: undefined,
        nombreProducto: "",
        marca: "",
        modelo: "",
        color: "",
        precio: 0,
        descripcionExtra: "",
        cantidad: 0
    })

    const cambioDatos = (e) =>{
        e.preventDefault()
        SetProducto({
            ...producto,
            [e.target.name]: e.target.value
        })
    }

    const formSubmit = async(e) => {
        e.preventDefault()

        console.log(producto)

        let fetchResp = await fetch(endpointProducto, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(producto),
            credentials: 'include'
        })
        let respJson = await fetchResp.json()
        console.log(respJson)
    }

    return(
        <form className="flex flex-wrap border-4 space-x-5 space-y-5 ml-72 mr-72 rounded-md justify-center" onSubmit={formSubmit}>
            <div className="flex flex-col mt-5">
                <label htmlFor="noProducto">Numero del Producto</label>
                <input name="noProducto" type="text" 
                        id="noProducto"
                        value={producto.noProducto}
                        onChange={cambioDatos}
                        className="border-2 border-b-sky-500 rounded-md"/>
            </div>
            <div className="flex flex-col">
                <label className="ingresoProducto" htmlFor="nombreProducto">Nombre del Producto</label>
                <input name="nombreProducto" type="text" 
                        id="nombreProducto"
                        value={producto.nombreProducto}
                        onChange={cambioDatos}
                        className="border-2 border-b-sky-500 rounded-md"/>
            </div>
            <div className="flex flex-col">
                <label className="ingresoProducto" htmlFor="marca">Marca</label>
                <input name="marca" type="text" 
                        id="marca"
                        value={producto.marca}
                        onChange={cambioDatos}
                        className="border-2 border-b-sky-500 rounded-md"/>
            </div>
            <div className="flex flex-col">
                <label className="ingresoProducto" htmlFor="modelo">Modelo</label>
                <input name="modelo" type="text" 
                        id="modelo"
                        value={producto.modelo}
                        onChange={cambioDatos}
                        className="border-2 border-b-sky-500 rounded-md"/>
            </div>
            <div className="flex flex-col">
                <label className="ingresoProducto" htmlFor="color">Color</label>
                <input name="color" type="text" 
                        id="color"
                        value={producto.color}
                        onChange={cambioDatos}
                        className="border-2 border-b-sky-500 rounded-md"/>
            </div>
            <div className="flex flex-col">
                <label className="ingresoProducto" htmlFor="precio">Precio</label>
                <input name="precio" type="text" 
                        id="precio"
                        value={producto.precio}
                        onChange={cambioDatos}
                        className="border-2 border-b-sky-500 rounded-md"/>
            </div>
            <div className="flex flex-col">
                <label className="ingresoProducto" htmlFor="Producto">Cantidad a Ingresar</label>
                <input name="cantidad" type="text" 
                        id="cantidad"
                        value={producto.existencia}
                        onChange={cambioDatos}
                        className="border-2 border-b-sky-500 rounded-md"/>
            </div>
            <br />
            <div className="flex flex-col">
                <label className="ingresoProducto" htmlFor="Producto">Descripcion Adicional</label>
                <textarea name="descripcionExtra" type="text" 
                        id="descripcionExtra"
                        value={producto.descripcionExtra}
                        onChange={cambioDatos}
                        className="border-2 border-b-sky-500 rounded-md h-20 w-80"></textarea>
            </div>
            <button className="rounded-full bg-green-500 place-self-end px-2 py-2">Guardar</button>
        </form>
    )
}