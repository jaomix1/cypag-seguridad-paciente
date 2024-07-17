const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../../config/db");

class ClasificacionReporteModel extends Model {}

ClasificacionReporteModel.init(
  {
    Id: { type: DataTypes.INTEGER, primaryKey: true },
    Descripcion: { type: DataTypes.STRING(50), allowNull: false },
    Estado: { type: DataTypes.STRING(3), allowNull: false },
  },
  {
    sequelize,
    tableName: "SEGPAC_Clasificacion_Reporte",
    createdAt: false,
    updatedAt: false,
    timestamps: false,
  },
);

module.exports = ClasificacionReporteModel;
