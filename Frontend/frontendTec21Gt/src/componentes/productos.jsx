import { useState } from "react"
import "../estilos/productos.css"
import { useNavigate } from "react-router-dom"

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
    const [mensaje, setMensaje] = useState('');

    const cambioDatos = (e) =>{
        e.preventDefault()
        SetProducto({
            ...producto,
            [e.target.name]: e.target.value
        })
    }
    const navigate = useNavigate();

    const formSubmit = async(e) => {
        e.preventDefault()

        setMensaje('');

        if (!producto.noProducto || !producto.color || !producto.precio || !producto.cantidad) {
          setMensaje('Se necesita de al menos el numero del producto, el color, el precio y la cantidad para continuar.');
          return;
        }
    
        try {
          const response = await fetch(endpointProducto, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(producto)
          });
    
          if (response.status === 404) {
            const result = await response.json();
            setMensaje(result.message);
          } else if (response.ok) {
            navigate('/Catalogo')
          } else {
            setMensaje('Error al ingresar el producto');
          }
        } catch (error) {
          console.error('Error:', error);
          setMensaje('Error al ingresar el producto');
        }
    }

    return(
<form className="flex flex-wrap border-4 border-gray-300 p-10 items-center justify-center mx-auto max-w-4xl rounded-lg shadow-lg bg-white" onSubmit={formSubmit}>
    <h2 className="text-2xl font-bold w-full text-center mb-4">Registrar Producto</h2>
    <div className="flex flex-col max-w-sm mb-4 mx-2">
        <label className="mb-2 font-semibold text-gray-700" htmlFor="noProducto">Número del Producto</label>
        <input name="noProducto" type="text" 
               id="noProducto"
               value={producto.noProducto}
               onChange={cambioDatos}
               className="border-2 border-sky-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"/>
    </div>
    <div className="flex flex-col max-w-sm mb-4 mx-2">
        <label className="mb-2 font-semibold text-gray-700" htmlFor="nombreProducto">Nombre del Producto</label>
        <input name="nombreProducto" type="text" 
               id="nombreProducto"
               value={producto.nombreProducto}
               onChange={cambioDatos}
               className="border-2 border-sky-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"/>
    </div>
    <div className="flex flex-col max-w-sm mb-4 mx-2">
        <label className="mb-2 font-semibold text-gray-700" htmlFor="marca">Marca</label>
        <input name="marca" type="text" 
               id="marca"
               value={producto.marca}
               onChange={cambioDatos}
               className="border-2 border-sky-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"/>
    </div>
    <div className="flex flex-col max-w-sm mb-4 mx-2">
        <label className="mb-2 font-semibold text-gray-700" htmlFor="modelo">Modelo</label>
        <input name="modelo" type="text" 
               id="modelo"
               value={producto.modelo}
               onChange={cambioDatos}
               className="border-2 border-sky-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"/>
    </div>
    <div className="flex flex-col max-w-sm mb-4 mx-2">
        <label className="mb-2 font-semibold text-gray-700" htmlFor="color">Color</label>
        <input name="color" type="text" 
               id="color"
               value={producto.color}
               onChange={cambioDatos}
               className="border-2 border-sky-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"/>
    </div>
    <div className="flex flex-col max-w-sm mb-4 mx-2">
        <label className="mb-2 font-semibold text-gray-700" htmlFor="precio">Precio</label>
        <input name="precio" type="text" 
               id="precio"
               value={producto.precio}
               onChange={cambioDatos}
               className="border-2 border-sky-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"/>
    </div>
    <div className="flex flex-col max-w-sm mb-4 mx-2">
        <label className="mb-2 font-semibold text-gray-700" htmlFor="cantidad">Cantidad a Ingresar</label>
        <input name="cantidad" type="text" 
               id="cantidad"
               value={producto.cantidad}
               onChange={cambioDatos}
               className="border-2 border-sky-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"/>
    </div>
    <div className="flex flex-col md:w-1/2 mb-4 mx-2">
        <label className="mb-2 font-semibold text-gray-700" htmlFor="descripcionExtra">Descripción Adicional</label>
        <textarea name="descripcionExtra" type="text" 
                  id="descripcionExtra"
                  value={producto.descripcionExtra}
                  onChange={cambioDatos}
                  className="border-2 border-sky-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"></textarea>
    </div>
    <div className="flex flex-col w-full mt-5 items-end">
        <button className="rounded-full bg-green-500 hover:bg-green-700 text-white ms-24 font-bold py-2 px-4 transition duration-300 ease-in-out mt-5">
            Guardar
        </button>
        {mensaje && <p className="mt-4 text-red-500">{mensaje}</p>}
    </div>
</form>
    )
}