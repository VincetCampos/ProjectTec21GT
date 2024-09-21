const getColorByStatus = (status) => {
    switch (status) {
        case 'Completado':
            return 'text-green-500'; // Verde
        case 'Pendiente':
            return 'text-blue-500'; // Azul
        case 'Cancelado':
            return 'text-red-500'; // Rojo
        default:
            return 'text-gray-500'; // Color por defecto
    }
};

function VentasCard ({ venta }) {
    console.log(venta)
    return(
        <div className="border-4 border-gray-300 bg-white max-w-md p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <header className="mb-4">
                <h1 className="text-2xl font-bold text-gray-800">
                    {"venta No. " + venta.noVenta}
                </h1>
            </header>
            <p className={`text-gray-600 mb-2 ${getColorByStatus(venta.estado)}`}>Estado: {venta.estado}</p>
            <p className="text-gray-600 mb-2">Fecha: {new Date(venta.fechaVenta).toLocaleDateString('es-ES', {
                timeZone: 'UTC'
            })}</p>
        </div>
    );

}

export default VentasCard;