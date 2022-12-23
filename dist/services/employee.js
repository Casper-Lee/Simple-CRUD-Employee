"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployeeData = exports.updateEmployeeData = exports.getEmployeeById = exports.getAllEmployeeData = exports.createEmployeeData = void 0;
const employee_1 = require("../models/employee");
const createEmployeeData = async (name, salary, department) => {
    let employee = await employee_1.Employee.create({
        name: name,
        salary: salary,
        department: department
    });
    return employee;
};
exports.createEmployeeData = createEmployeeData;
const getAllEmployeeData = async () => {
    let employee = await employee_1.Employee.findAll();
    return employee;
};
exports.getAllEmployeeData = getAllEmployeeData;
const getEmployeeById = async (id) => {
    let employee = await employee_1.Employee.findByPk(id);
    return employee;
};
exports.getEmployeeById = getEmployeeById;
const updateEmployeeData = async (name, salary, department, id) => {
    let employee = await employee_1.Employee.update({
        name: name,
        salary: salary,
        department: department
    }, {
        where: { id }
    });
    return employee;
};
exports.updateEmployeeData = updateEmployeeData;
const deleteEmployeeData = async (id) => {
    let employee = await employee_1.Employee.destroy({ where: { id } });
    return employee;
};
exports.deleteEmployeeData = deleteEmployeeData;
