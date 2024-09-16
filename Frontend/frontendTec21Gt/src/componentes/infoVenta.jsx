import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

export const InfoVenta = () =>{
    const { noVenta } = useParams();
    
    const [ventas, setVentas] = useState([])
    const [detalleVenta, setDetalleVenta] = useState({
        noVenta: ventas.noVenta,
        noProducto: 0,
        color: "",
        fechaVenta: ventas.fechaVenta,
        cantidad: 0,
        precioUnitario: 0
    })
    const [detalleProducto, setDetalleProducto] = useState([])

    useEffect( () => {

        (async () =>{
            let fetchVentas = await fetch(`http://localhost:4000/ventas/${noVenta}`, {credentials: 'include'})
            let dataVentas = await fetchVentas.json()
            setVentas(dataVentas)
            setDetalleVenta({
                noVenta: dataVentas.noVenta,
                noProducto: 0,
                color: "",
                fechaVenta: dataVentas.fechaVenta,
                cantidad: 0,
                precioUnitario: 0
            });
            let fetchDetalleProduct = await fetch(`http://localhost:4000/productos/detalleProducto/${noVenta}`, {credentials: 'include'})
            let dataDetalleProduct = await fetchDetalleProduct.json()
            setDetalleProducto(dataDetalleProduct)
        })()

    }, [])

    const cambioDatos = (e) =>{
        e.preventDefault()
        setDetalleVenta({
            ...detalleVenta,
            [e.target.name]: e.target.value
        })
    }

    const formSubmit = async(e) => {
        e.preventDefault()

        console.log(detalleVenta)

        let fetchResp = await fetch("http://localhost:4000/ventas/detalleVenta", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(detalleVenta),
            credentials: 'include'
        })
        let respJson = await fetchResp.json()
        console.log(respJson)
    }

    return(
        <div>
            <h1>Venta No. {ventas.noVenta}</h1>
            <h2>Fecha de Venta {ventas.fechaVenta}</h2>
            <h2>Estado de la Venta {ventas.estado}</h2>
            <h2>GUI {ventas.GUI}</h2>
            <h2>Tipo de la Venta {ventas.tipoVenta}</h2>

            <div>
            <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Nombre del Producto</th>
                            <th className="py-2 px-4 border-b">Marca</th>
                            <th className="py-2 px-4 border-b">Cantidad</th>
                            <th className="py-2 px-4 border-b">Precio del Producto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {detalleProducto.map((detalleProduct) => (
                            <tr key={detalleProduct.noDetalleVenta}>
                                <td className="py-2 px-4 border-b">{detalleProduct.nombreProducto}</td>
                                <td className="py-2 px-4 border-b">{detalleProduct.marca}</td>
                                <td className="py-2 px-4 border-b">{detalleProduct.cantidad}</td>
                                <td className="py-2 px-4 border-b">{detalleProduct.precioUnitario}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <form className="flex flex-wrap border-4 space-x-5 space-y-5 ml-72 mr-72 rounded-md justify-center" onSubmit={formSubmit}>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="noProducto">Numero de Producto</label>
                        <input name="noProducto" type="text" 
                                id="noProducto"
                                value={detalleVenta.noProducto}
                                onChange={cambioDatos}
                                className="border-2 border-b-sky-500 rounded-md"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="color">Color</label>
                        <input name="color" type="text" 
                                id="color"
                                value={detalleVenta.color}
                                onChange={cambioDatos}
                                className="border-2 border-b-sky-500 rounded-md"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="cantidad">Cantidad</label>
                        <input name="cantidad" type="text" 
                                id="cantidad"
                                value={detalleVenta.cantidad}
                                onChange={cambioDatos}
                                className="border-2 border-b-sky-500 rounded-md"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="precioUnitario">Precio Unitario</label>
                        <input name="precioUnitario" type="text" 
                                id="precioUnitario"
                                value={detalleVenta.precioUnitario}
                                onChange={cambioDatos}
                                className="border-2 border-b-sky-500 rounded-md"/>
                    </div>
                    <button className="rounded-full bg-green-500 place-self-end px-2 py-2">Crear venta</button>
                </form>
            </div>
        </div>
    )
}