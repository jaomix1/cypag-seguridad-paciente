const express = require("express");

const router = express.Router();

const { seguridad } = require("../../middleware/seguridad");

const {
  createDetail,
  getDetail,
  deleteDetail,
} = require("../../controllers/forms/detalles");

router.route("/")
  .post(seguridad, createDetail);

router.route("/registros")
  .post(seguridad, getDetail);

router.route("/borrar")
  .post(seguridad, deleteDetail);

module.exports = router;
