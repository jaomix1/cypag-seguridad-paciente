/* eslint-disable padded-blocks */
/* eslint-disable space-before-blocks */
/* eslint-disable indent */
/* eslint-disable camelcase */
const jwt = require("jsonwebtoken");

const sql = require("mssql");
const dotenv = require("dotenv");

dotenv.config();
const config = {
    user: process.env.USER,
    password: process.env.PASS,
    server: process.env.SERVER_SQL,
    database: process.env.BDLogin,
    options: {
        encrypt: false,
        enableArithAbort: true,
    },
};

exports.crearAccion = async (req, res) => {
    try {
        const pool = await sql.connect(config);
        // Stored procedure
        const result2 = await pool.request()
            .input("Descripcion", sql.VarChar, req.body.Descripcion)
            .input("Responsable", sql.UniqueIdentifier, req.body.Responsable)
            .input("FechaVencimiento", sql.DateTime, req.body.FechaVencimiento)
            .input("PlanAccionId", sql.UniqueIdentifier, req.params.PlanAccionId)
            .input("UsuarioCreacion", sql.VarChar, req.Usuario.user.Id)
            .execute("SeguridadPaciente.dbo.SP_CreateAccion");
        res.status(200).send(result2.recordsets[0][0]);
    } catch (err) {
        res.status(400).send(`${err} ${req.body}`);
    }
};


exports.getAccion = async (req, res) => {
    try {
        const pool = await sql.connect(config);
        // Stored procedure
        const result2 = await pool.request()
            .input("AccionId", sql.Int, req.params.Id)
            .execute("SeguridadPaciente.dbo.SP_GetAccion");
        let data = result2.recordsets[0][0];
        data.Seguimientos = result2.recordsets[1];
        res.status(200).send(data);
    } catch (err) {
        res.status(400).send(`${err} ${req.body}`);
    }
};

exports.crearSeguimiento = async (req, res) => {
    try {
        const pool = await sql.connect(config);
        // Stored procedure
        const result2 = await pool.request()
            .input("AccionId", sql.Int, req.params.AccionId)
            .input("Descripcion", sql.VarChar, req.body.Seguimiento)
            .input("UsuarioCreacion", sql.VarChar, req.Usuario.user.Id)
            .input("TieneEvidencia", sql.Bit, req.body.TieneEvidencia)
            .input("EsCierre", sql.Bit, req.body.EsCierre)
            .execute("SeguridadPaciente.dbo.SP_CreateAccionSeguimiento");
        res.status(200).send(result2.recordsets[0][0]);
    } catch (err) {
        res.status(400).send(`${err} ${req.body}`);
    }
};


exports.UpdateAccion = async (req, res) => {
    try {
        const pool = await sql.connect(config);
        // Stored procedure
        const result2 = await pool.request()
            .input("AccionId", sql.Int, req.body.AccionId)
            .input("PorcentajeMejora", sql.Int, req.body.PorcentajeMejora)
            .input("UsuarioCreacion", sql.VarChar, req.Usuario.user.Id)
            .execute("SeguridadPaciente.dbo.SP_UpdateAccion");
        res.status(200).send(result2.recordsets[0][0]);
    } catch (err) {
        res.status(400).send(`${err} ${req.body}`);
    }
};