/* eslint-disable indent */
const express = require("express");

const router = express.Router();

const { seguridad } = require("../../../middleware/seguridad");

const {
    reporte,
} = require("../../../controllers/forms/excel/exportar");

router.route("/Excel/:Start_Date/:End_Date")
    .get(reporte);

module.exports = router;
