const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../../config/db");

class OportunidadesMejoraModel extends Model {}

OportunidadesMejoraModel.init(
  {
    Id: { type: DataTypes.UUID, defaultValue: sequelize.literal("newid()"), primaryKey: true },
    Id_Master: { type: DataTypes.UUID, allowNull: false },
    Codigo_Externo: { type: DataTypes.STRING(30), allowNull: true },
    Descripcion: ,
    Porcentaje_Mejora: ,
    Responsable: ,
    Estado: {
      type: DataTypes.STRING(3), defaultValue: "ACT", allowNull: false, validate: { isIn: [["ACT", "INA"]] },
    }
  },
  {
    sequelize,
    tableName: "SEGPAC_Oportunidades_Mejora",
    createdAt: false,
    updatedAt: false,
    timestamps: false,
  },
);

module.exports = OportunidadesMejoraModel;
