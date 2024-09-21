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
            <div className="mt-10">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Producto: {producto.length > 0 ? producto[0].nombreProducto : "Producto"}</h1>
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 border-b text-left text-gray-600 font-medium">Marca</th>
                            <th className="py-3 px-4 border-b text-left text-gray-600 font-medium">Modelo</th>
                            <th className="py-3 px-4 border-b text-left text-gray-600 font-medium">Descripción Extra</th>
                            <th className="py-3 px-4 border-b text-left text-gray-600 font-medium">Color</th>
                            <th className="py-3 px-4 border-b text-left text-gray-600 font-medium">Precio</th>
                            <th className="py-3 px-4 border-b text-left text-gray-600 font-medium">Fecha de Ingreso</th>
                            <th className="py-3 px-4 border-b text-left text-gray-600 font-medium">Cantidad Ingresada</th>
                        </tr>
                    </thead>
                    <tbody>
                        {producto.map((producto) => (
                            <tr key={producto.noDetalleProducto} className="hover:bg-gray-50 transition duration-300 ease-in-out">
                                <td className="py-2 px-4 border-b">{producto.marca}</td>
                                <td className="py-2 px-4 border-b">{producto.modelo}</td>
                                <td className="py-2 px-4 border-b">{producto.descripcionExtra}</td>
                                <td className="py-2 px-4 border-b">{producto.color}</td>
                                <td className="py-2 px-4 border-b">{producto.precio}</td>
                                <td className="py-2 px-4 border-b">{new Date(producto.fechaIngreso).toLocaleDateString('es-ES', {
                                    timeZone: 'UTC'
                                })}</td>
                                <td className="py-2 px-4 border-b">{producto.cantidad}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
        
    );

}