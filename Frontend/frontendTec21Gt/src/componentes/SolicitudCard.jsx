const getColorByStatus = (status) => {
    console.log(`Estado recibido: ${status}`);
    switch (status) {
        case 'Completado':
            return 'text-green-500'; // Verde
        case 'Pendiente':
            return 'text-blue-600'; // Azul
        case 'Iniciado':
            return 'text-yellow-500'; // Rojo
        case 'Cancelado':
            return 'text-red-500'; // Rojo
        default:
            return 'text-gray-500'; // Color por defecto
    }
};

function SolicitudCard ({ solicitud }) {
    console.log(solicitud)
    return(
        <div className="border-4 border-gray-300 bg-white max-w-md p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <header className="mb-4">
                <h1 className="text-2xl font-bold text-gray-800">
                    Solicitud No. {solicitud.noSolicitud}
                </h1>
                <h1 className="text-2xl font-bold text-gray-800">
                    Equipo: {solicitud.equipoSerial}
                </h1>
            </header>
            <p className="text-gray-600 mb-2">
                Fecha de Ingreso: {new Date(solicitud.fechaIngreso).toLocaleDateString(
                    'es-ES', {
                    timeZone: 'UTC'
                })}
            </p>
            <p className="text-gray-600 mb-2">
                Fecha de Entrega: {new Date(solicitud.fechaEntrega).toLocaleDateString(
                    'es-ES', {
                   timeZone: 'UTC'
                })}
            </p>
            <p className="text-gray-600 mb-2">
                Presupuesto: {solicitud.presupuesto}
            </p>
            <p className={`text-gray-600 mb-2 ${getColorByStatus(solicitud.estadoSolicitud)}`}>
                Estado: {solicitud.estadoSolicitud}
            </p>
        </div>
    );

}

export default SolicitudCard;