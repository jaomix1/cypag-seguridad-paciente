/* eslint-disable padded-blocks */
/* eslint-disable space-before-blocks */
/* eslint-disable indent */
/* eslint-disable camelcase */
const jwt = require("jsonwebtoken");
const XlsxPopulate = require('xlsx-populate');

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

exports.reporte = async (req, res) => {
    const Start_Date_F = req.params.Start_Date ? req.params.Start_Date.split("T")[0] : null;
    const End_Date_F = req.params.End_Date ? req.params.End_Date.split("T")[0] : null;
    try {
        const pool = await sql.connect(config);
        // Stored procedure
        const result2 = await pool.request()
            .input("fechasInicio", sql.DateTime, Start_Date_F)
            .input("fechasFin", sql.DateTime, End_Date_F)
            .execute("SeguridadPaciente.[dbo].[SP_Exportar_Excel]");


        let fields = [];
        let reportes = [];
        if (result2.recordsets[0][0] !== undefined) {
            fields = Object.keys(result2.recordsets[0][0]);
            reportes = result2.recordsets[0].map(function (row) {
                return fields.map(function (fieldName) {
                    return row[fieldName]
                })
            })
        }

        let Investigaciones_P5 = [];
        let fields_Investigaciones_P5 = [];
        if (result2.recordsets[1][0] !== undefined) {
            fields_Investigaciones_P5 = Object.keys(result2.recordsets[1][0]);
            Investigaciones_P5 = result2.recordsets[1].map(function (row) {
                return fields_Investigaciones_P5.map(function (fieldName) {
                    return row[fieldName]
                })
            })
        }

        let Investigaciones_Londres = [];
        let fields_Investigaciones_Londres = [];
        if (result2.recordsets[2][0] !== undefined) {
            fields_Investigaciones_Londres = Object.keys(result2.recordsets[2][0]);
            Investigaciones_Londres = result2.recordsets[2].map(function (row) {
                return fields_Investigaciones_Londres.map(function (fieldName) {
                    return row[fieldName]
                })
            })
        }
        let Investigaciones_M5 = [];
        let fields_Investigaciones_M5 = [];
        if (result2.recordsets[3][0] !== undefined) {
            fields_Investigaciones_M5 = Object.keys(result2.recordsets[3][0]);
            Investigaciones_M5 = result2.recordsets[3].map(function (row) {
                return fields_Investigaciones_M5.map(function (fieldName) {
                    return row[fieldName]
                })
            })
        }

        let Investigaciones_Naranjo = [];
        let fields_Investigaciones_Naranjo = [];
        if (result2.recordsets[4][0] !== undefined) {
            fields_Investigaciones_Naranjo = Object.keys(result2.recordsets[4][0]);
            Investigaciones_Naranjo = result2.recordsets[4].map(function (row) {
                return fields_Investigaciones_Naranjo.map(function (fieldName) {
                    return row[fieldName]
                })
            })
        }

        //const replacer = function (key, value) { return value === null ? "" : value; };

        if (reportes.length > 0) {
            reportes.unshift(fields);
        }

        if (Investigaciones_P5.length > 0) {
            Investigaciones_P5.unshift(fields_Investigaciones_P5);
        }
        if (Investigaciones_Londres.length > 0) {
            Investigaciones_Londres.unshift(fields_Investigaciones_Londres);
        }
        if (Investigaciones_M5.length > 0) {
            Investigaciones_M5.unshift(fields_Investigaciones_M5);
        }
        if (Investigaciones_Naranjo.length > 0) {
            Investigaciones_Naranjo.unshift(fields_Investigaciones_Naranjo);
        }
        XlsxPopulate.fromBlankAsync()
            .then((workbook) => {
                workbook.addSheet("Investigaciones_P5");
                workbook.addSheet("Investigaciones_Londres");
                workbook.addSheet("Investigaciones_M5");
                workbook.addSheet("Investigaciones_Naranjo");

                workbook.sheet("Investigaciones_P5").row(1).style("bold", true);
                workbook.sheet("Investigaciones_Londres").row(1).style("bold", true);
                workbook.sheet("Investigaciones_M5").row(1).style("bold", true);
                workbook.sheet("Investigaciones_Naranjo").row(1).style("bold", true);

                workbook.sheet("Sheet1").column("B").style("numberFormat", "yyyy-mm-dd");
                workbook.sheet("Sheet1").column("C").style("numberFormat", "yyyy-mm-dd");
                workbook.sheet("Sheet1").column("Z").style("numberFormat", "yyyy-mm-dd");

                workbook.sheet("Investigaciones_P5").column("C").style("numberFormat", "yyyy-mm-dd");
                workbook.sheet("Investigaciones_P5").column("D").style("numberFormat", "yyyy-mm-dd");

                workbook.sheet("Investigaciones_Londres").column("C").style("numberFormat", "yyyy-mm-dd");
                workbook.sheet("Investigaciones_Londres").column("D").style("numberFormat", "yyyy-mm-dd");

                workbook.sheet("Investigaciones_M5").column("C").style("numberFormat", "yyyy-mm-dd");
                workbook.sheet("Investigaciones_M5").column("D").style("numberFormat", "yyyy-mm-dd");

                workbook.sheet("Investigaciones_Naranjo").column("C").style("numberFormat", "yyyy-mm-dd");
                workbook.sheet("Investigaciones_Naranjo").column("D").style("numberFormat", "yyyy-mm-dd");

                if (reportes.length > 0) {
                    workbook.sheet("Sheet1").row(1).style("bold", true);
                    workbook.sheet("Sheet1").cell("A1").value(reportes);
                }
                if (Investigaciones_P5.length > 0) {
                    workbook.sheet("Investigaciones_P5").cell("A1").value(Investigaciones_P5);
                }
                if (Investigaciones_Londres.length > 0) {
                    workbook.sheet("Investigaciones_Londres").cell("A1").value(Investigaciones_Londres);
                }
                if (Investigaciones_M5.length > 0) {
                    workbook.sheet("Investigaciones_M5").cell("A1").value(Investigaciones_M5);
                }
                if (Investigaciones_Naranjo.length > 0) {
                    workbook.sheet("Investigaciones_Naranjo").cell("A1").value(Investigaciones_Naranjo);
                }

                const file = `./${Start_Date_F}-${End_Date_F}.xlsx`;
                workbook.toFileAsync(file).then((f) => {
                    res.download(file);
                });

            });

        //res.send("OK");
    } catch (err) {
        res.status(400).send(`${err} ${req.body}`);
    }
};
