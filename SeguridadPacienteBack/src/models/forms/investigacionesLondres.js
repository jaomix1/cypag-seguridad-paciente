const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../../config/db");

class InvestigacionesLondresModel extends Model {}

InvestigacionesLondresModel.init(
  {
    Id: { type: DataTypes.UUID, defaultValue: sequelize.literal("newid()"), primaryKey: true },
    Id_Detalle: { type: DataTypes.UUID, allowNull: false },
    Londres_X: { type: DataTypes.STRING(255), allowNull: true },
    Evento_Adverso_Tipo: { type: DataTypes.STRING(20), allowNull: true },
    Evento_Adverso_Estado: { type: DataTypes.STRING(20), allowNull: true },
    Estado: {
      type: DataTypes.STRING(3), defaultValue: "ACT", allowNull: false, validate: { isIn: [["ACT", "INA"]] },
    },
    Fecha_Creacion: { type: DataTypes.DATE, defaultValue: sequelize.literal("getdate()"), allowNull: false },
    Fecha_Modificacion: { type: DataTypes.DATE, defaultValue: null, allowNull: true },
  },
  {
    sequelize,
    tableName: "SEGPAC_Investigaciones_Londres",
    createdAt: false,
    updatedAt: false,
    timestamps: false,
  },
);

module.exports = InvestigacionesLondresModel;
