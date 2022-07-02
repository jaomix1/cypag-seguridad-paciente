const express = require("express");

const router = express.Router();

// const { seguridad } = require("../../../config/db");

const {
  createDetail,
  getDetail,
  deleteDetail,
} = require("../../controllers/forms/detalles");

router.route("/")
  .post(createDetail);

router.route("/registros")
  .post(getDetail);

router.route("/borrar")
  .post(deleteDetail);

module.exports = router;
