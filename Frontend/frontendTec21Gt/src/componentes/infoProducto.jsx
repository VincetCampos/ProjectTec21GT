import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const InfoProducto = () => {
    const { noProducto } = useParams();
    
    const [producto, SetProducto] = useState([])
    useEffect( () => {

        (async () =>{
            let fetchProduc = await fetch(`http://localhost:4000/Productos/${noProducto}`, {credentials: 'include'})
            let dataProduct = await fetchProduc.json()
            SetProducto(dataProduct)
        })()

    }, [])

    return (
        <>
            <div>
                <h1> Producto</h1>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Nombre Producto</th>
                            <th className="py-2 px-4 border-b">Marca</th>
                            <th className="py-2 px-4 border-b">Modelo</th>
                            <th className="py-2 px-4 border-b">Descripcion Extra</th>
                            <th className="py-2 px-4 border-b">Color</th>
                            <th className="py-2 px-4 border-b">Precio</th>
                            <th className="py-2 px-4 border-b">Fecha de Ingreso</th>
                            <th className="py-2 px-4 border-b">Cantidad Ingresada</th>
                        </tr>
                    </thead>
                    <tbody>
                        {producto.map((producto) => (
                            <tr key={producto.noDetalleProducto}>
                                <td className="py-2 px-4 border-b">{producto.nombreProducto}</td>
                                <td className="py-2 px-4 border-b">{producto.marca}</td>
                                <td className="py-2 px-4 border-b">{producto.modelo}</td>
                                <td className="py-2 px-4 border-b">{producto.descripcionExtra}</td>
                                <td className="py-2 px-4 border-b">{producto.color}</td>
                                <td className="py-2 px-4 border-b">{producto.precio}</td>
                                <td className="py-2 px-4 border-b">{new Date(producto.fechaIngreso).toLocaleDateString()}</td>
                                <td className="py-2 px-4 border-b">{producto.cantidad}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
        
    );

}