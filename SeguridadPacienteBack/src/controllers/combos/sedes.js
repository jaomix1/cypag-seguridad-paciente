const SedesModel = require("../../models/combos/sedes");

exports.obtenerSedes = async (req, res) => {
  try {
    const { empresa } = req.query;
    const data = await SedesModel.findAll({
      where: { Id_Empresa: empresa, Estado: "ACT" },
      attributes: ["Id", "Nombre"],
    });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(503).send("Error Procesando la Consulta");
  }
};
