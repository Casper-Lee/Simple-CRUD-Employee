"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employees = exports.sequelize = void 0;
const dotenv = require('dotenv');
dotenv.config();
const { Sequelize, DataTypes, Model } = require('sequelize');
exports.sequelize = new Sequelize({
    username: process.env.USER_NAME,
    password: process.env.PASS_WORD,
    database: process.env.DATA_BASE,
    host: "emp_api_db",
    dialect: "postgres"
});
class employees extends Model {
    static associate(models) {
        // define association here
        employees.belongsTo(models.Department, { foreignKey: 'department_id' });
    }
}
exports.employees = employees;
employees.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salary: {
        type: DataTypes.STRING,
        allowNull: false
    },
    department_id: {
        type: DataTypes.ENUM(1, 2, 3),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE(),
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE(),
        allowNull: false
    }
}, {
    timestamps: false,
    sequelize: exports.sequelize
});
