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

exports.crearOpotunidad = async (req, res) => {
    try {
        const pool = await sql.connect(config);
        // Stored procedure
        const result2 = await pool.request()
            .input("Descripcion", sql.VarChar, req.body.Descripcion)
            .input("Responsable", sql.UniqueIdentifier, req.body.Responsable)
            .input("UsuarioCreacion", sql.VarChar, req.Usuario.user.Id)
            .execute("SeguridadPaciente.dbo.createOpotunidad");
        res.status(200).send(result2.recordsets[0][0]);
    } catch (err) {
        res.status(400).send(`${err} ${req.body}`);
    }
};

exports.getAllOportunidades = async (req, res) => {
    try {
        const pool = await sql.connect(config);
        // Stored procedure
        const result2 = await pool.request()
            .input("Descripcion", sql.VarChar, req.body.Descripcion)
            .input("Responsable", sql.UniqueIdentifier, req.body.Responsable)
            .input("Fecha_Inicial", sql.Int, req.body.Start_Date)
            .input("Fecha_Final", sql.Int, req.body.End_Date)
            .input("Page", sql.Int, req.body.Page)
            .input("RowsByPag", sql.Int, req.body.RowsByPag)
            .execute("SeguridadPaciente.dbo.getAllOportunidades");
        // eslint-disable-next-line max-len
        res.status(200).send({ count: result2.recordsets[0][0].Count, data: result2.recordsets[1] });
    } catch (err) {
        res.status(400).send(`${err} ${req.body}`);
    }
};

exports.getOportunidad = async (req, res) => {
    try {
        const pool = await sql.connect(config);
        // Stored procedure
        const result2 = await pool.request()
            .input("Id", sql.UniqueIdentifier, req.params.Id)
            .execute("SeguridadPaciente.dbo.getOportunidad");
        let data = result2.recordsets[0][0];
        data.Planes = result2.recordsets[1];
        res.status(200).send(data);
    } catch (err) {
        res.status(400).send(`${err} ${req.body}`);
    }
};