const NovedadCausaModel = require("../../models/combos/novedadCausa");

exports.obtenerCausasByNovedades = async (req, res) => {
  console.log("obtenerCausasByNovedades");
  try {
    const novedad = req.params.nodedadId;
    const data = await NovedadCausaModel.findAll({
      where: { Id_Tipo_Novedad: novedad, Estado: "ACT" },
      attributes: ["Id", "Descripcion"],
      order: [["Descripcion", "ASC"]],
    });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(503).send("Error Procesando la Consulta");
  }
};
