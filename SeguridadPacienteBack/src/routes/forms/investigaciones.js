const express = require("express");

const router = express.Router();

// const { seguridad } = require("../../../config/db");

const {
  createInvM5,
  getInvM5,
  deleteInvM5,
} = require("../../controllers/forms/investigaciones");

router.route("/5m")
  .post(createInvM5);

router.route("/5m/registros")
  .post(getInvM5);

router.route("/5m/borrar")
  .post(deleteInvM5);

module.exports = router;
