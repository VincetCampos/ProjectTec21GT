const sql = require('mssql');
var express = require('express');
var router = express.Router();
const { config } = require("../config/sql_server");

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const connection = await sql.connect(config);

    // Consultamos el usuario en la tabla Empleado
    const resultadoUsuario = await connection
      .request()
      .input("noEmpleado", sql.Int, req.user.noEmpleado)
      .query("SELECT noEmpleado, usuarioEmpleado FROM Empleado WHERE noEmpleado = @noEmpleado");

    if (resultadoUsuario.recordset.length > 0) {
      const { noEmpleado, usuarioEmpleado } = resultadoUsuario.recordset[0];

        const data = { noEmpleado, usuarioEmpleado };
        console.log(data);
        res.send(data);

    } else {
      res.status(404).send("Usuario no encontrado.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

module.exports = router;
