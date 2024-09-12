import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const InfoProducto = () => {
    const { noProducto } = useParams();

    // Aquí puedes cargar los detalles del producto usando el noProducto
    // por ejemplo, buscando en un array de productos o haciendo una petición a un API.
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
                            <th className="py-2 px-4 border-b">Precio</th>
                            <th className="py-2 px-4 border-b">Fecha de Ingreso</th>
                            <th className="py-2 px-4 border-b">Cantidad Ingresada</th>
                        </tr>
                    </thead>
                    <tbody>
                        {producto.map((producto) => (
                            <tr key={producto.noProducto}>
                                <td className="py-2 px-4 border-b">{producto.nombreProducto}</td>
                                <td className="py-2 px-4 border-b">{producto.marca}</td>
                                <td className="py-2 px-4 border-b">{producto.modelo}</td>
                                <td className="py-2 px-4 border-b">{producto.descripcionExtra}</td>
                                <td className="py-2 px-4 border-b">{producto.precio}</td>
                                <td className="py-2 px-4 border-b">{producto.fechaIngreso}</td>
                                <td className="py-2 px-4 border-b">{producto.cantidad}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
        
    );

}