/* eslint-disable indent */
const express = require("express");
const { seguridad } = require("../../middleware/seguridad");
const {
registrarUsuario,
editarUsuario,
login,
getAllUsers,
getUser,
inactiveUser,
} = require("../../controllers/seguridad/tokenes");

const router = express.Router();

// // Route: /V1/usuarios
router.get("/index", seguridad, getAllUsers);
router.get("/index/:IdUser", seguridad, getUser);
router.post("/Create", seguridad, registrarUsuario);
router.post("/login", login);
router.post("/Edit", seguridad, editarUsuario);
router.post("/Bloq/:IdUser", seguridad, inactiveUser);

module.exports = router;
