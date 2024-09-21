import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const CrearVentas = () => {
    const endpointVentas = "http://localhost:4000/ventas";

    const [ventas, SetVentas] = useState({
        fechaVenta: "",
        estado: "",
        gui: "",
        tipoVenta: ""
    })
    const navigate = useNavigate();

    const cambioDatos = (e) =>{
        e.preventDefault()
        SetVentas({
            ...ventas,
            [e.target.name]: e.target.value
        })
    }

    const formSubmit = async(e) => {
        e.preventDefault()

        console.log(ventas)

        let fetchResp = await fetch(endpointVentas, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(ventas),
            credentials: 'include'
        })
        let respJson = await fetchResp.json()
        console.log(respJson)
        navigate('/Ventas')
    }

    return(
        <form className="flex flex-col border-4 border-gray-300 p-6 rounded-lg shadow-md max-w-3xl mx-auto" onSubmit={formSubmit}>
            <h2 className="text-2xl font-bold w-full text-center mb-4">Registrar Producto</h2>
            <div className="flex flex-col mb-4">
                <label className="mb-1" htmlFor="fechaVenta">Fecha de venta</label>
                <input 
                    name="fechaVenta" 
                    type="text" 
                    id="fechaVenta"
                    value={ventas.fechaVenta}
                    onChange={cambioDatos}
                    className="border-2 border-sky-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                />
            </div>
            <div className="flex flex-col mb-4">
                <label className="mb-1" htmlFor="estado">Estado de la Venta</label>
                <input 
                    name="estado" 
                    type="text" 
                    id="estado"
                    value={ventas.estado}
                    onChange={cambioDatos}
                    className="border-2 border-sky-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                />
            </div>
            <div className="flex flex-col mb-4">
                <label className="mb-1" htmlFor="gui">GUI</label>
                <input 
                    name="gui" 
                    type="text" 
                    id="gui"
                    value={ventas.gui}
                    onChange={cambioDatos}
                    className="border-2 border-sky-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                />
            </div>
            <div className="flex flex-col mb-4">
                <label className="mb-1" htmlFor="tipoVenta">Tipo de Venta</label>
                <input 
                    name="tipoVenta" 
                    type="text" 
                    id="tipoVenta"
                    value={ventas.tipoVenta}
                    onChange={cambioDatos}
                    className="border-2 border-sky-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                />
            </div >
            <div className="flex flex-col w-full mt-5 items-end">
                <button className="rounded-full bg-green-500 hover:bg-green-700 text-white ms-24 font-bold py-2 px-4 transition duration-300 ease-in-out mt-5">
                    Crear venta
                </button>
            </div>
        </form>
    )
}