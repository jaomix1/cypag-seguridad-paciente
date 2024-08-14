const express = require("express");

const router = express.Router();

const { seguridad } = require("../../middleware/seguridad");

const {
    crearOpotunidad,
    getAllOportunidades,
} = require("../../controllers/forms/oportunidades2");

router.route("/create")
    .post(seguridad, crearOpotunidad);


router.route("/getAll")
    .post(seguridad, getAllOportunidades);

module.exports = router;
