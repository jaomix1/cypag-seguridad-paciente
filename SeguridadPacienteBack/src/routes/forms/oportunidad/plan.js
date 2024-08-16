const express = require("express");

const router = express.Router();

const { seguridad } = require("../../../middleware/seguridad");

const {
    crearPlan,
    // getAllPlanes,
    getPlan,
    //crearOpotunidadPlan,
} = require("../../../controllers/forms/oportunidad/plan");


router.route("/create/:OportunidadId")
    .post(seguridad, crearPlan);


// router.route("/getAll")
//     .post(seguridad, getAllPlanes);

router.route("/getOne/:Id")
    .get(seguridad, getPlan);

// router.route("/create/plan/:OportunidadId")
//     .post(seguridad, crearOpotunidadPlan);

module.exports = router;
