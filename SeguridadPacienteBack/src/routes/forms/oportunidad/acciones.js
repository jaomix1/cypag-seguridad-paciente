const express = require("express");

const router = express.Router();

const { seguridad } = require("../../../middleware/seguridad");

const {
    crearAccion,
    getAccion,
    crearSeguimiento,
} = require("../../../controllers/forms/oportunidad/acciones");

router.route("/create/:PlanAccionId")
    .post(seguridad, crearAccion);

router.route("/getOne/:Id")
    .get(seguridad, getAccion);

router.route("/create/seguimiento/:AccionId")
    .post(seguridad, crearSeguimiento);

module.exports = router;
