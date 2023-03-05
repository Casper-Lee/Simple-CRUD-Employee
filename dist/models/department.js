"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.departments = exports.sequelize = void 0;
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
class departments extends Model {
}
exports.departments = departments;
departments.init({
    department: {
        type: DataTypes.ENUM('HR', 'PS', 'ADMIN'),
        allowNull: false
    }
}, {
    sequelize: exports.sequelize
});
