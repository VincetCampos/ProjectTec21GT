import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Equipos = () =>{

    const endpointEquipos = "http://localhost:4000/equipos"

    const [equipo, SetEquipo] = useState({
        equipoSerial:"",
        marca: "",
        modelo: "",
        procesador: "",
        ram : "",
        almacenamiento : "",
        tipoEquipo : "",
        otrasCaracteristicas : "",
        passwordEquipo : "",
        problema : "",
        fechaIngreso: "",
        fechaEntrega: "",
        presupuesto: "",
        estadoSolicitud: ""
    })
    const [errores, setErrores] = useState({});
    const navigate = useNavigate();

    const cambioDatos = (e) =>{
        e.preventDefault()
        SetEquipo({
            ...equipo,
            [e.target.name]: e.target.value
        })
    }

    const formSubmit = async (e) => {
        e.preventDefault();
        
        const nuevosErrores = {};
        
        // Validar cada campo
        Object.keys(equipo).forEach((campo) => {
          if (!equipo[campo]) {
            nuevosErrores[campo] = 'Este campo es obligatorio';
          }
        });
        
        if (Object.keys(nuevosErrores).length > 0) {
          setErrores(nuevosErrores);
        } else {
          setErrores({});
          
          try {
            const fetchResp = await fetch(endpointEquipos, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(equipo),
              credentials: 'include',
            });
    
            const respJson = await fetchResp.json();
            console.log(respJson);
            
            if (fetchResp.ok) {
              console.log('Formulario enviado', equipo);
              navigate('/Solicitud');
            } else {
              // Manejar errores de respuesta del servidor aquí
              console.error('Error al enviar el formulario', respJson);
            }
          } catch (error) {
            // Manejar errores de la solicitud aquí
            console.error('Error en la solicitud', error);
          }
        }
      };

    return(
        <form
            className="flex flex-wrap border-4 border-gray-300 p-10 items-center justify-center mx-auto max-w-4xl rounded-lg shadow-lg bg-white"
            onSubmit={formSubmit}
            >
            <h2 className="text-2xl font-bold w-full text-center mb-4">Registrar Equipo</h2>

            <div className="flex flex-col max-w-sm mb-4 mx-2">
                <label htmlFor="equipoSerial" className="text-gray-700 font-medium mb-1">Número de Serie</label>
                <input 
                name="equipoSerial" 
                type="text" 
                id="equipoSerial" 
                value={equipo.equipoSerial}
                onChange={cambioDatos}
                className="border-2 border-sky-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                />
                {errores.equipoSerial && <p className="text-red-500 text-xs mt-1">{errores.equipoSerial}</p>}
            </div>

            <div className="flex flex-col max-w-sm mb-4 mx-2">
                <label htmlFor="marca" className="text-gray-700 font-medium mb-1">Marca</label>
                <input 
                name="marca" 
                type="text" 
                id="marca" 
                value={equipo.marca}
                onChange={cambioDatos}
                className="border-2 border-sky-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                />
                {errores.marca && <p className="text-red-500 text-xs mt-1">{errores.marca}</p>}
            </div>

            <div className="flex flex-col max-w-sm mb-4 mx-2">
                <label htmlFor="modelo" className="text-gray-700 font-medium mb-1">Modelo</label>
                <input 
                name="modelo" 
                type="text" 
                id="modelo" 
                value={equipo.modelo}
                onChange={cambioDatos}
                className="border-2 border-sky-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                />
                {errores.modelo && <p className="text-red-500 text-xs mt-1">{errores.modelo}</p>}
            </div>

            <div className="flex flex-col max-w-sm mb-4 mx-2">
                <label htmlFor="procesador" className="text-gray-700 font-medium mb-1">Procesador</label>
                <input 
                name="procesador" 
                type="text" 
                id="procesador" 
                value={equipo.procesador}
                onChange={cambioDatos}
                className="border-2 border-sky-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                />
                {errores.procesador && <p className="text-red-500 text-xs mt-1">{errores.procesador}</p>}
            </div>

            <div className="flex flex-col max-w-sm mb-4 mx-2">
                <label htmlFor="ram" className="text-gray-700 font-medium mb-1">Memoria RAM</label>
                <input 
                name="ram" 
                type="text" 
                id="ram" 
                value={equipo.ram}
                onChange={cambioDatos}
                className="border-2 border-sky-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                />
                {errores.ram && <p className="text-red-500 text-xs mt-1">{errores.ram}</p>}
            </div>

            <div className="flex flex-col max-w-sm mb-4 mx-2">
                <label htmlFor="almacenamiento" className="text-gray-700 font-medium mb-1">Almacenamiento</label>
                <input 
                name="almacenamiento" 
                type="text" 
                id="almacenamiento" 
                value={equipo.almacenamiento}
                onChange={cambioDatos}
                className="border-2 border-sky-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                />
                {errores.almacenamiento && <p className="text-red-500 text-xs mt-1">{errores.almacenamiento}</p>}
            </div>

            <div className="flex flex-col max-w-sm mb-4 mx-2">
                <label htmlFor="tipoEquipo" className="text-gray-700 font-medium mb-1">Tipo de Equipo</label>
                <input 
                name="tipoEquipo" 
                type="text" 
                id="tipoEquipo" 
                value={equipo.tipoEquipo}
                onChange={cambioDatos}
                className="border-2 border-sky-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                />
                {errores.tipoEquipo && <p className="text-red-500 text-xs mt-1">{errores.tipoEquipo}</p>}
            </div>

            <div className="flex flex-col max-w-sm mb-4 mx-2">
                <label htmlFor="passwordEquipo" className="text-gray-700 font-medium mb-1">Contraseña del Equipo</label>
                <input 
                name="passwordEquipo" 
                type="text" 
                id="passwordEquipo" 
                value={equipo.passwordEquipo}
                onChange={cambioDatos}
                className="border-2 border-sky-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                />
                {errores.passwordEquipo && <p className="text-red-500 text-xs mt-1">{errores.passwordEquipo}</p>}
            </div>

            <div className="flex flex-col max-w-sm mb-4 mx-2">
                <label htmlFor="fechaIngreso" className="text-gray-700 font-medium mb-1">Fecha de Ingreso</label>
                <input 
                name="fechaIngreso" 
                type="text" 
                id="fechaIngreso" 
                value={equipo.fechaIngreso}
                onChange={cambioDatos}
                className="border-2 border-sky-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                />
                {errores.fechaIngreso && <p className="text-red-500 text-xs mt-1">{errores.fechaIngreso}</p>}
            </div>

            <div className="flex flex-col max-w-sm mb-4 mx-2">
                <label htmlFor="fechaEntrega" className="text-gray-700 font-medium mb-1">Fecha de Entrega</label>
                <input 
                name="fechaEntrega" 
                type="text" 
                id="fechaEntrega" 
                value={equipo.fechaEntrega}
                onChange={cambioDatos}
                className="border-2 border-sky-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                />
                {errores.fechaEntrega && <p className="text-red-500 text-xs mt-1">{errores.fechaEntrega}</p>}
            </div>

            <div className="flex flex-col max-w-sm mb-4 mx-2">
                <label htmlFor="presupuesto" className="text-gray-700 font-medium mb-1">Presupuesto</label>
                <input 
                name="presupuesto" 
                type="text" 
                id="presupuesto" 
                value={equipo.presupuesto}
                onChange={cambioDatos}
                className="border-2 border-sky-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                />
                {errores.presupuesto && <p className="text-red-500 text-xs mt-1">{errores.presupuesto}</p>}
            </div>

            <div className="flex flex-col max-w-sm mb-4 mx-2">
                <label htmlFor="estadoSolicitud" className="text-gray-700 font-medium mb-1">Estado de la Solicitud</label>
                <input 
                name="estadoSolicitud" 
                type="text" 
                id="estadoSolicitud" 
                value={equipo.estadoSolicitud}
                onChange={cambioDatos}
                className="border-2 border-sky-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                />
                {errores.estadoSolicitud && <p className="text-red-500 text-xs mt-1">{errores.estadoSolicitud}</p>}
            </div>

            <div className="flex flex-col max-w-sm mb-4 mx-2">
                <label htmlFor="otrasCaracteristicas" className="text-gray-700 font-medium mb-1">Otras Características</label>
                <input 
                name="otrasCaracteristicas" 
                type="text" 
                id="otrasCaracteristicas" 
                value={equipo.otrasCaracteristicas}
                onChange={cambioDatos}
                className="border-2 border-sky-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                />
                {errores.otrasCaracteristicas && <p className="text-red-500 text-xs mt-1">{errores.otrasCaracteristicas}</p>}
            </div>

            <div className="flex flex-col max-w-sm mb-4 mx-2">
                <label htmlFor="problema" className="text-gray-700 font-medium mb-1">Problema</label>
                <input 
                name="problema" 
                type="text" 
                id="problema" 
                value={equipo.problema}
                onChange={cambioDatos}
                className="border-2 border-sky-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                />
                {errores.problema && <p className="text-red-500 text-xs mt-1">{errores.problema}</p>}
            </div>

            <div className="w-full flex justify-end mt-4">
                <button className="rounded-full bg-green-500 text-white font-bold py-2 px-6 hover:bg-green-600 transition duration-200">
                Guardar
                </button>
            </div>
            </form>
    )
}