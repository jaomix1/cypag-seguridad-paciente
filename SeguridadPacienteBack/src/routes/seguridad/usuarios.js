const express = require("express");
const { seguridad } = require("../../middleware/seguridad");
const {
  registrarUsuario,
  obtenerPerfiles,
  login,
  getAllUsers,
  inactiveUser,
} = require("../../controllers/seguridad/seguridad");

const router = express.Router();

// Route: /V1/usuarios
router.get("/", seguridad, getAllUsers);
router.post("/registrar", seguridad, registrarUsuario);
router.post("/login", login);
router.put("/desactivar", seguridad, inactiveUser);
router.get("/perfiles", seguridad, obtenerPerfiles);

module.exports = router;
