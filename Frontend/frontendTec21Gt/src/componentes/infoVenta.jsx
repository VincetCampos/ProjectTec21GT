import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

export const InfoVenta = () =>{
    const { noVenta } = useParams();
    
    const [ventas, setVentas] = useState([])
    const [detalleVenta, setDetalleVenta] = useState({
        noVenta: 0,
        noProducto: 0,
        color: "",
        fechaVenta: "",
        cantidad: 0,
        precioUnitario: 0
    })
    const [detalleProducto, setDetalleProducto] = useState([])
    const [nuevoEstado, setNuevoEstado] = useState('');
    const [mensaje, setMensaje] = useState('');

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
        if (fetchResp.status === 404) {
        const result = await fetchResp.json();
        setMensaje(result.message);
        } else if (fetchResp.ok) {
            setMensaje('Producto ingresado correctamente');
        } else {
            setMensaje('Error al ingresar el producto');
        }

        if (fetchResp.ok) {
            let fetchDetalleProduct = await fetch(`http://localhost:4000/productos/detalleProducto/${noVenta}`, {credentials: 'include'})
            let dataDetalleProduct = await fetchDetalleProduct.json()
            setDetalleProducto(dataDetalleProduct)

            setDetalleVenta({
                noVenta: detalleVenta.noVenta,
                noProducto: 0,
                color: "",
                fechaVenta: detalleVenta.fechaVenta,
                cantidad: 0,
                precioUnitario: 0
            });
        }
    }
    const actualizarEstado = async () => {
        let fetchResp = await fetch(`http://localhost:4000/ventas/actualizar/${noVenta}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ estado: nuevoEstado }),
            credentials: 'include'
        });
        if (fetchResp.ok) {
            setVentas((prevVentas) => ({
                ...prevVentas,
                estado: nuevoEstado
            }));
            alert('El estado de la venta ha sido actualizado exitosamente');
        }
    };
    return(
        <div className="p-5 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-2">Venta No. {ventas.noVenta}</h1>
            <h2 className="text-lg">Fecha de Venta: <span className="font-semibold">{new Date(ventas.fechaVenta).toLocaleDateString()}</span></h2>
            <h2 className="text-lg">Estado de la Venta: <span className="font-semibold">{ventas.estado}</span></h2>
            <h2 className="text-lg">GUI: <span className="font-semibold">{ventas.GUI}</span></h2>
            <h2 className="text-lg">Tipo de la Venta: <span className="font-semibold">{ventas.tipoVenta}</span></h2>

            <div className="mt-5 flex items-center">
                <label htmlFor="estado" className="mr-2">Actualizar Estado de la Venta:</label>
                <select
                    id="estado"
                    name="estado"
                    value={nuevoEstado}
                    onChange={(e) => setNuevoEstado(e.target.value)}
                    className="border-2 border-b-sky-500 rounded-md p-2"
                >
                    <option value="">Seleccione un estado</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Completado">Completado</option>
                    <option value="Cancelado">Cancelado</option>
                </select>
                <button
                    onClick={actualizarEstado}
                    className="ml-2 bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition"
                >
                    Actualizar Estado
                </button>
            </div>

            <div className="mt-5">
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border-b">Nombre del Producto</th>
                            <th className="py-2 px-4 border-b">Marca</th>
                            <th className="py-2 px-4 border-b">Cantidad</th>
                            <th className="py-2 px-4 border-b">Precio del Producto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {detalleProducto.map((detalleProduct) => (
                            <tr key={detalleProduct.noDetalleVenta} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{detalleProduct.nombreProducto}</td>
                                <td className="py-2 px-4 border-b">{detalleProduct.marca}</td>
                                <td className="py-2 px-4 border-b">{detalleProduct.cantidad}</td>
                                <td className="py-2 px-4 border-b">{detalleProduct.precioUnitario}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-5">
                <form className="flex flex-wrap border-4 p-5 space-x-5 rounded-md justify-center bg-white shadow-md" onSubmit={formSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="noProducto">Numero de Producto</label>
                        <input name="noProducto" type="text" 
                                id="noProducto"
                                value={detalleVenta.noProducto}
                                onChange={cambioDatos}
                                className="border-2 border-b-sky-500 rounded-md p-2"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="color">Color</label>
                        <input name="color" type="text" 
                                id="color"
                                value={detalleVenta.color}
                                onChange={cambioDatos}
                                className="border-2 border-b-sky-500 rounded-md p-2"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="cantidad">Cantidad</label>
                        <input name="cantidad" type="text" 
                                id="cantidad"
                                value={detalleVenta.cantidad}
                                onChange={cambioDatos}
                                className="border-2 border-b-sky-500 rounded-md p-2"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="precioUnitario">Precio Unitario</label>
                        <input name="precioUnitario" type="text" 
                                id="precioUnitario"
                                value={detalleVenta.precioUnitario}
                                onChange={cambioDatos}
                                className="border-2 border-b-sky-500 rounded-md p-2"/>
                    </div>
                    <button className="rounded-full bg-green-500 text-white place-self-end px-4 py-2 hover:bg-green-600 transition">Ingresar producto</button>
                    {mensaje && <p>{mensaje}</p>}
                </form>
            </div>
        </div>
    )
}