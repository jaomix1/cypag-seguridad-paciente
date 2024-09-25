/* eslint-disable indent */
const express = require("express");

const router = express.Router();

const { seguridad } = require("../../../middleware/seguridad");

const {
    crearOpotunidad,
    getAllOportunidades,
    getOportunidad,
    getAllOportunidadesByMasterId,
    createMasterOpotunidad,
    getQuejasAsociadasByOportunidadId,
} = require("../../../controllers/forms/oportunidad/oportunidades2");

router.route("/create")
    .post(seguridad, crearOpotunidad);

router.route("/getAll")
    .post(seguridad, getAllOportunidades);

router.route("/getOne/:Id")
    .get(seguridad, getOportunidad);

router.route("/byMaster/:MasterId")
    .get(seguridad, getAllOportunidadesByMasterId);

router.route("/byOportunidad/:OportunidadId")
    .get(seguridad, getQuejasAsociadasByOportunidadId);

router.route("/AsignarAOportunidad/:OportunidadId")
    .post(seguridad, createMasterOpotunidad);

module.exports = router;
