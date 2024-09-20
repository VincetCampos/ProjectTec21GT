const express = require('express');
const router = express.Router();
const sql = require('mssql')
const {config} = require("../config/sql_server")
const bcrypt = require('bcryptjs')

router.get('/', async (req, res, next) => {
    let data = []
  
    try {
      const connection = await sql.connect(config)
      //ejecutamos la consulta
      const resultado = await connection.request()
                                                .query(`Select e.noEmpleado, u.nombreUsuario, e.usuarioEmpleado, e.tipoEmpleado from Usuario as u
                                                      join Empleado as e
                                                      on u.noUsuario = e.noUsuario
                                                      where e.tipoEmpleado != 'Borrado'`)
      data = resultado.recordset
      await sql.close()
  
    } catch (err) {
      console.error(err)
      data = err
      res.statusCode = 500
    }
  
    res.send(data)
  });

  router.post('/', async (req, res, next) => {
    let data = {};
    let { nombreUsuario, usuarioEmpleado, passwordEmpleado, tipoEmpleado } = req.body;
  
    try {
      // Abrimos la conexión
      const passwordHash = await bcrypt.hash(passwordEmpleado, 10)

      const connection = await sql.connect(config);
  
      // Insertamos el nuevo usuario en la tabla Usuario
      const resultadoUsuario = await connection
        .request()
        .input("nombreUsuario", sql.VarChar, nombreUsuario)
        .query("INSERT INTO Usuario (nombreUsuario) OUTPUT INSERTED.noUsuario AS UsuarioID VALUES (@nombreUsuario)");
  
      if (resultadoUsuario.recordset.length > 0) {
        const UsuarioID = resultadoUsuario.recordset[0].UsuarioID;
  
        // Insertamos los datos en la tabla Empleado si se obtuvo un UsuarioID
        const resultadoEmpleado = await connection
          .request()
          .input("UsuarioID", sql.Int, UsuarioID)
          .input("usuarioEmpleado", sql.VarChar, usuarioEmpleado)
          .input("passwordEmpleado", sql.VarChar, passwordHash)
          .input("tipoEmpleado", sql.VarChar, tipoEmpleado)
          .query(`
            INSERT INTO Empleado (noUsuario, usuarioEmpleado, passwordEmpleado, tipoEmpleado)
            VALUES (@UsuarioID, @usuarioEmpleado, @passwordEmpleado, @tipoEmpleado)
          `);
  
        data = resultadoEmpleado.rowsAffected;
      } else {
        res.statusCode = 404; // Not Found
        data = "Usuario no encontrado.";
      }
  
      // Cerramos la conexión
      // await sql.close();
    } catch (err) {
      console.error(err);
      data = err;
      res.statusCode = 500; // Internal server error
    }
  
    res.send(data);
  });
  
  router.put('/borrar/:noEmpleado', async (req, res) => {
    try {
        const connection = await sql.connect(config);
        const noEmpleado = req.params.noEmpleado;

        // Check if the employee exists
        const checkResult = await connection.request()
            .input("noEmpleado", sql.Int, noEmpleado)
            .query("SELECT noEmpleado FROM Empleado WHERE noEmpleado = @noEmpleado");

        if (checkResult.recordset.length === 0) {
            return res.status(404).send({ message: "Employee not found" });
        }

        // Update the employee type to "Borrado"
        const updateResult = await connection.request()
            .input("noEmpleado", sql.Int, noEmpleado)
            .query("UPDATE Empleado SET tipoEmpleado = 'Borrado' WHERE noEmpleado = @noEmpleado");

        res.send({ rowsAffected: updateResult.rowsAffected });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});
  /*router.put('borrar/:noEmpleado', async (req, res, next)=> {
    let data = {}

    try{
      //Abrimos la conexion
      const connection = await sql.connect(config)
      //ejecutamos la consulta
      const resultado = await connection.request()
                          .input("noEmpleado", sql.Int, req.params.noEmpleado)
                          .query("SELECT noEmpleado FROM Empleado WHERE noEmpleado = @noEmpleado")
      if (resultado.recordset.length > 0){
        const result = await connection.request()
                        .input("noEmpleado", sql.Int, )
                        .query("Update Empleado set tipoEmpleado = 'Borrado' Where noEmpleado = @noEmpleado")
        res.send({ rowsAffected: updateResult.rowsAffected });
      }
        //data = resultado.recordset
    }
    catch(err){
      console.error(err)
      data = err
      res.statusCode = 500 //Internal server error
    }
    res.send(data)
  });*/
  
  module.exports = router;
