const express = require('express');
const router = express.Router();
const sql = require('mssql')
const {config} = require("../config/sql_server")

/* GET users listing. */
router.get('/', async (req, res, next) => {
  let data = []

  try {
    await sql.connect(config)
    const equipos = await sql.query(`select equipoSerial, modelo, tipoEquipo, problema from Equipo`)
    data = equipos.recordset
    await sql.close()

  } catch (err) {
    console.error(err)
    data = err
    res.statusCode = 500
  }

  res.send(data)
});

router.post("/", async (req, res, next)=>{
  const Equipos = req.body;
  let resultado = {}
  try {
    let connection = await sql.connect(config)
    const result = await connection
                                  .request()
                                  .input('equipoSerial', sql.VarChar, Equipos.equipoSerial)
                                  .input('marca', sql.VarChar, Equipos.marca)
                                  .input('modelo', sql.VarChar, Equipos.modelo)
                                  .input('procesador', sql.VarChar, Equipos.procesador)
                                  .input('ram', sql.VarChar, Equipos.ram)
                                  .input('almacenamiento', sql.VarChar, Equipos.almacenamiento)
                                  .input('tipoEquipo', sql.VarChar, Equipos.tipoEquipo)
                                  .input('otrasCaracteristicas', sql.VarChar, Equipos.otrasCaracteristicas)
                                  .input('passwordEquipo', sql.VarChar, Equipos.passwordEquipo)
                                  .input('problema', sql.VarChar, Equipos.problema)
                                  .query(`Insert Into Equipo (equipoSerial, marca, modelo, procesador, ram, almacenamiento, tipoEquipo, otrasCaracteristicas, passwordEquipo, problema)
                                  values (@equipoSerial, @marca, @modelo, @procesador, @ram, @almacenamiento, @tipoEquipo, @otrasCaracteristicas, @passwordEquipo, @problema)`)
    resultado = result.rowsAffected
    await connection.close()

  } catch (error) {
    console.error(error)
    res.statusCode = 500
    resultado = res
  }
  res.send(resultado)
})

module.exports = router;