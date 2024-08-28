const express = require("express");

const router = express.Router();

const { seguridad } = require("../../../middleware/seguridad");

const {
    crearPlan,
    getPlan,
    crearSeguimiento,
    UpdatePlan,
} = require("../../../controllers/forms/oportunidad/plan");


router.route("/create/:OportunidadId")
    .post(seguridad, crearPlan);


router.route("/getOne/:Id")
    .get(seguridad, getPlan);

router.route("/create/seguimiento/:PlanId")
    .post(seguridad, crearSeguimiento);


router.route("/update")
    .post(seguridad, UpdatePlan);

module.exports = router;
