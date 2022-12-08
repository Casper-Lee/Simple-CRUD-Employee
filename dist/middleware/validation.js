"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrUpdateEmployee = void 0;
const Joi = require("joi");
const employeeName = Joi.string().required();
const employeeSalary = Joi.number().integer().strict().required();
const employeeDepartment = Joi.string().valid('HR', 'PS').required();
const createOrUpdateEmployee = (req, res, next) => {
    const schema = Joi.object({
        name: employeeName,
        salary: employeeSalary,
        department: employeeDepartment,
    });
    const value = schema.validate(req.body);
    if (value.error) {
        return res.status(400).json({
            message: "Bad Request! " + value.error.message
        });
    }
    next();
};
exports.createOrUpdateEmployee = createOrUpdateEmployee;
