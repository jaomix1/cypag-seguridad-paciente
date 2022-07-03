const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../../config/db");

class InvestigacionesNaranjoModel extends Model {}

InvestigacionesNaranjoModel.init(
  {
    Id: { type: DataTypes.UUID, defaultValue: sequelize.literal("newid()"), primaryKey: true },
    Id_Detalle: { type: DataTypes.UUID, allowNull: false },
    Naranjo_1: { type: DataTypes.STRING(2), allowNull: true, validate: { isIn: [["SI", "NO", "NA"]] } },
    Naranjo_2: { type: DataTypes.STRING(2), allowNull: true, validate: { isIn: [["SI", "NO", "NA"]] } },
    Naranjo_3: { type: DataTypes.STRING(2), allowNull: true, validate: { isIn: [["SI", "NO", "NA"]] } },
    Naranjo_4: { type: DataTypes.STRING(2), allowNull: true, validate: { isIn: [["SI", "NO", "NA"]] } },
    Naranjo_5: { type: DataTypes.STRING(2), allowNull: true, validate: { isIn: [["SI", "NO", "NA"]] } },
    Naranjo_6: { type: DataTypes.STRING(2), allowNull: true, validate: { isIn: [["SI", "NO", "NA"]] } },
    Naranjo_7: { type: DataTypes.STRING(2), allowNull: true, validate: { isIn: [["SI", "NO", "NA"]] } },
    Naranjo_8: { type: DataTypes.STRING(2), allowNull: true, validate: { isIn: [["SI", "NO", "NA"]] } },
    Naranjo_9: { type: DataTypes.STRING(2), allowNull: true, validate: { isIn: [["SI", "NO", "NA"]] } },
    Naranjo_10: { type: DataTypes.STRING(2), allowNull: true, validate: { isIn: [["SI", "NO", "NA"]] } },
    Naranjo_Observaciones: { type: DataTypes.STRING(255), allowNull: true },
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
    tableName: "SEGPAC_Investigaciones_Naranjo",
    createdAt: false,
    updatedAt: false,
    timestamps: false,
  },
);

module.exports = InvestigacionesNaranjoModel;
