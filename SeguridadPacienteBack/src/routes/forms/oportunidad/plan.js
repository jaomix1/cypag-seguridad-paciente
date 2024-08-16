const express = require("express");

const router = express.Router();

const { seguridad } = require("../../../middleware/seguridad");

const {
    crearPlan,
    getPlan,
    crearSeguimiento,
} = require("../../../controllers/forms/oportunidad/plan");


router.route("/create/:OportunidadId")
    .post(seguridad, crearPlan);


// router.route("/getAll")
//     .post(seguridad, getAllPlanes);

router.route("/getOne/:Id")
    .get(seguridad, getPlan);

router.route("/create/seguimiento/:PlanId")
    .post(seguridad, crearSeguimiento);

module.exports = router;
