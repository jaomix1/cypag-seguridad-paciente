/* eslint-disable no-console */
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

// swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = require("./config/swaggerSpecs");

const app = express(); // creates express http server

// Conectar con MSSQL Server
const connectDatabase = require("./config/db");

connectDatabase.connectDatabase();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/api-doc",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsDoc(swaggerSpec)),
);

// Require ROUTES
const combos = require("./src/routes/combos/combos");
const master = require("./src/routes/forms/master");
const usuarios = require("./src/routes/seguridad/usuarios");

dotenv.config();

// USE RUTAS
app.use("/v1/api/combos", combos);
app.use("/v1/api/master", master);
app.use("/v1/api/usuarios", usuarios);

app.get("/", (req, res) => {
  res.send("20220629 1314");
});

app.listen(process.env.PORT, () => console.dir(`Running on PORT: ${process.env.PORT}`));
