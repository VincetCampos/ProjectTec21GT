const express = require('express');
const router = express.Router();
const sql = require('mssql')
const {config} = require("../config/sql_server")

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
                                          OUTPUT INSERTED.noEquipo AS equipoNo
                                          values (@equipoSerial, @marca, @modelo, @procesador, @ram, @almacenamiento, @tipoEquipo, @otrasCaracteristicas, @passwordEquipo, @problema)`)
    if(result.recordset.length > 0){
        const equipoNo = result.recordset[0].equipoNo
        const resultadoSolicitud = await connection.request()
                                                  .input('noEquipo', sql.Int, equipoNo)
                                                  .input('fechaIngreso', sql.Date, Equipos.fechaIngreso)
                                                  .input('fechaEntrega', sql.Date, Equipos.fechaEntrega)
                                                  .input('presupuesto', sql.Money, Equipos.presupuesto)
                                                  .input('estadoSolicitud', sql.VarChar, Equipos.estadoSolicitud)
                                                  .query(`Insert Into Solicitud (noEquipo, fechaIngreso, fechaEntrega, presupuesto, estadoSolicitud)
                                                          Values (@noEquipo, @fechaIngreso, @fechaEntrega, @presupuesto, @estadoSolicitud)`)
    }
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