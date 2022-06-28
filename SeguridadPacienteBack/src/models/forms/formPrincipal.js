const { Sequelize, DataTypes, Model } = require("sequelize");
require("dotenv").config();

const user = process.env.USER;
const password = process.env.PASS;
const host = process.env.SERVER_SQL;
const database = process.env.BD;
const dialect = process.env.DIALECT;

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect,
});

class FormPrincipalModel extends Model {}

FormPrincipalModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    typeId: { type: DataTypes.INTEGER, allowNull: false }, // Combo
    email: { type: DataTypes.STRING, defaultValue: "", allowNull: false },
    numberDoc: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    secondName: { type: DataTypes.STRING, defaultValue: "", allowNull: false },
    firstSurname: { type: DataTypes.STRING, allowNull: false },
    secondSurname: { type: DataTypes.STRING, defaultValue: "", allowNull: false },
    sex: { type: DataTypes.STRING, allowNull: false },
    typeBlood: { type: DataTypes.STRING, allowNull: false },
    dateOfBirth: { type: DataTypes.DATEONLY, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    userCondition: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
    student: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
    menstruation: { type: DataTypes.STRING, defaultValue: "" },
    weeksGestation: { type: DataTypes.STRING(2), defaultValue: "" },
    cantPregnancies: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
    birthProbDate: { type: DataTypes.DATEONLY },
    birthPlace: { type: DataTypes.STRING }, // Combo
    otherBirthPlace: { type: DataTypes.STRING, defaultValue: "" }, // Combo
    disability: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
    displaced: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
    armedConflict: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
    dptoBirth: { type: DataTypes.STRING, allowNull: false },
    municipalityBirth: { type: DataTypes.STRING, allowNull: false },
    dptoResidence: { type: DataTypes.STRING, allowNull: false },
    municipalityResidence: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    neighborhood: { type: DataTypes.STRING, allowNull: false },
    eps: { type: DataTypes.STRING, allowNull: false }, // combo PENDIENTE
    regimen: { type: DataTypes.INTEGER, allowNull: false }, // Combo
    phone: { type: DataTypes.STRING(10), defaultValue: "", allowNull: false },
    optionalPhone: { type: DataTypes.STRING, defaultValue: "", allowNull: false },
    ethnicGroup: { type: DataTypes.INTEGER, allowNull: false }, // Combo
    typeIdCarer: { type: DataTypes.STRING, defaultValue: "", allowNull: false },
    numberDocCarer: { type: DataTypes.STRING, defaultValue: "", allowNull: false },
    firstNameCarer: { type: DataTypes.STRING, defaultValue: "", allowNull: false },
    secondNameCarer: { type: DataTypes.STRING, defaultValue: "", allowNull: false },
    firstSurnameCarer: { type: DataTypes.STRING, defaultValue: "", allowNull: false },
    secondSurnameCarer: { type: DataTypes.STRING, defaultValue: "", allowNull: false },
    relationshipCarer: { type: DataTypes.STRING, allowNull: false },
    vaccinationStage: { type: DataTypes.INTEGER, allowNull: false }, // Combo
    vaccinationStrategy: { type: DataTypes.STRING, defaultValue: "", allowNull: false },
    typePopulation: { type: DataTypes.STRING, allowNull: false },
    biological: { type: DataTypes.INTEGER, allowNull: false }, // Combo
    appliedDose: { type: DataTypes.INTEGER, allowNull: false }, // Combo
    nameVaccinator: { type: DataTypes.STRING, allowNull: false },
    syringeType: { type: DataTypes.INTEGER, allowNull: false }, // Combo
    syringeLot: { type: DataTypes.STRING, allowNull: false },
    biologicalLot: { type: DataTypes.STRING, allowNull: false },
    ips: { type: DataTypes.INTEGER, allowNull: false }, // Combo PENDIENTE
    typist: { type: DataTypes.STRING, defaultValue: "" },
    observation: { type: DataTypes.STRING(1000), defaultValue: "", allowNull: false },
  },
  {
    sequelize,
    tableName: "VAC_Formulario_Principal",
  },
);

module.exports = FormPrincipalModel;
