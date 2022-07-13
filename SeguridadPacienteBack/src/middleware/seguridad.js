/* eslint-disable prefer-destructuring */
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.seguridad = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization
    && req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).send("El cliente no envio el token");
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.Usuario = decoded;
    next();
  } catch (err) {
    return next(
      res.status(403).send("Error en el procesamiento del token"),
    );
  }
  return null;
};
