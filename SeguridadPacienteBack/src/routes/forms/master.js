const express = require("express");

const router = express.Router();

// const { seguridad } = require("../../../config/db");

const {
  getAnswers,
  createEntry,
} = require("../../controllers/forms/master");

router.route("/")
  .post(createEntry);

router.route("/registros")
  .post(getAnswers);

module.exports = router;
