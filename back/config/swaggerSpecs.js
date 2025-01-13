const path = require("path");

const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Vacuna Cypag",
      version: "1.0.0",
    },
    servers: [
      {
        url: "https://cypag-vacuna.azurewebsites.net",
      },
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: [`${path.join(__dirname, "../src/routes/*.js")}`],
};

module.exports = swaggerSpec;
