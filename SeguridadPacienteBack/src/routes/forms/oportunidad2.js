const express = require("express");

const router = express.Router();

const { seguridad } = require("../../middleware/seguridad");

const {
    crearOpotunidad,
    getAllOportunidades,
    getOportunidad,
    crearOpotunidadPlan,
} = require("../../controllers/forms/oportunidades2");

router.route("/create")
    .post(seguridad, crearOpotunidad);


router.route("/getAll")
    .get(seguridad, getAllOportunidades);

router.route("/getOne/:Id")
    .get(seguridad, getOportunidad);

router.route("/create/plan/:OportunidadId")
    .post(seguridad, crearOpotunidadPlan);

module.exports = router;
