const express = require("express");

const router = express.Router();

// const { seguridad } = require("../../../config/db");

const {
  getAnswers,
  createEntry,
  createMejora,
  getMejora,
  updateMejora,
} = require("../../controllers/forms/master");

router.route("/")
  .post(createEntry);

router.route("/registros")
  .post(getAnswers);

router.route("/mejoras")
  .post(createMejora);

router.route("/mejoras/registros")
  .post(getMejora);

router.route("/mejoras/actualizar")
  .post(updateMejora);

module.exports = router;
