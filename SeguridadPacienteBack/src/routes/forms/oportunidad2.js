const express = require("express");

const router = express.Router();

const { seguridad } = require("../../middleware/seguridad");

const {
    crearOpotunidad,
    getAllOportunidades,
} = require("../../controllers/forms/oportunidades2");

router.route("/")
    .post(seguridad, crearOpotunidad);


router.route("/")
    .get(seguridad, getAllOportunidades);

module.exports = router;
