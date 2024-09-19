const express = require('express');
const router = express.Router();
const sql = require('mssql');
const bcrypt = require('bcryptjs');
const { config } = require("../config/sql_server");
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = require('../config.js')

const secretKey = TOKEN_SECRET;

router.post('/', async (req, res) => {
  let { usuarioEmpleado, passwordEmpleado } = req.body;
  
  try {
    const connection = await sql.connect(config);

    // Consultamos el usuario en la tabla Empleado
    const resultadoUsuario = await connection
      .request()
      .input("usuarioEmpleado", sql.VarChar, usuarioEmpleado)
      .query("SELECT noEmpleado, usuarioEmpleado, passwordEmpleado, tipoEmpleado FROM Empleado WHERE usuarioEmpleado = @usuarioEmpleado");

    if (resultadoUsuario.recordset.length > 0) {
      const { noEmpleado, usuarioEmpleado, passwordEmpleado: hashedPassword, tipoEmpleado } = resultadoUsuario.recordset[0];
      
      // Comparar la contraseña proporcionada con la almacenada en la base de datos
      const isMatch = await bcrypt.compare(passwordEmpleado, hashedPassword);

      if (isMatch) {
        const token = jwt.sign({ noEmpleado, usuarioEmpleado, tipoEmpleado }, secretKey, { expiresIn: '5h' });

        const data = { noEmpleado, usuarioEmpleado, tipoEmpleado, token };
        console.log(data);
        res.cookie("token", token)
        res.send(data);
      } else {
        res.status(401).send("Contraseña incorrecta.");
      }
    } else {
      res.status(404).send("Usuario no encontrado.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

router.post('/logout', (req, res) => {
  res.cookie("token", "", {
    expiresIn: new Date(0)
  })
  return res.sendStatus(200);
})

router.get('/verify', async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
      return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);

    // Conectarse a la base de datos y buscar el usuario por su ID
    const connection = await sql.connect(config);
    const result = await connection
        .request()
        .input('noEmpleado', sql.Int, decoded.noEmpleado)
        .query('SELECT noEmpleado, usuarioEmpleado, tipoEmpleado FROM Empleado WHERE noEmpleado = @noEmpleado');

    if (result.recordset.length > 0) {
        const user = result.recordset[0];
        res.json({ user });
    } else {
        res.status(404).send('Usuario no encontrado');
    }
  } catch (err) {
      console.error(err);
      res.status(401).send('Failed to authenticate token');
  }
});
module.exports = router;