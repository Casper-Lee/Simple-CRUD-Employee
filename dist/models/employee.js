"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = exports.sequelize = void 0;
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
class Employee extends Model {
}
exports.Employee = Employee;
Employee.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salary: {
        type: DataTypes.STRING,
        allowNull: false
    },
    department: {
        type: DataTypes.ENUM('HR', 'PS'),
        allowNull: false
    }
}, {
    sequelize: exports.sequelize
});
