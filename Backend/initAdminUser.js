const sql = require('mssql');
const {config} = require('./config/sql_server');
const bcrypt = require('bcryptjs');

async function initAdminUser () {
    const password = 'admin'
    const saltsRounds = 10

    try {
        const connection = await sql.connect(config);

        const result = await connection.request().query(`SELECT 1 FROM Empleado WHERE usuarioEmpleado = 'admin'`)

        if (result.recordset.length === 0) {
            const passwordHash = await bcrypt.hash(password, saltsRounds)
            
            const creacionAdmin = await connection.request().query(`
                                    Insert into Usuario (nombreUsuario) values ('admin')
                                    Declare @UsuarioID INT
                                    Select @UsuarioID = noUsuario from Usuario where nombreUsuario = 'admin'
                                    IF @UsuarioID IS NOT NULL
                                    BEGIN
                                     INSERT INTO Empleado(noUsuario, usuarioEmpleado, passwordEmpleado, tipoEmpleado)
                                     VALUES (@UsuarioID, 'admin', '${passwordHash}', 'Administrador');
                                    END`)
            console.log('Admin creado ', creacionAdmin.rowsAffected)
        } else {
            console.log('Admin user already exists.');
        }
    } catch (error) {
        console.log(error)
    }
};

module.exports = initAdminUser