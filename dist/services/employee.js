"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployeeData = exports.updateEmployeeData = exports.getEmployeeById = exports.filteredEmployee = exports.getAllEmployeeData = exports.createEmployeeData = void 0;
const employee_1 = require("../models/employee");
const createEmployeeData = async (name, salary, department_id) => {
    let employee = await employee_1.employees.create({
        name: name,
        salary: salary,
        department_id: department_id,
        created_at: new Date(),
        updated_at: new Date(),
        // created_at: created_at,
        // updated_at: updated_at
    });
    return employee;
};
exports.createEmployeeData = createEmployeeData;
//ADMIN
const getAllEmployeeData = async () => {
    let employee = await employee_1.employees.findAll({
        // where: {
        //     department_id : department_id
        // },
        attributes: {
            exclude: ['created_at', 'updated_at']
        }
    });
    return employee;
};
exports.getAllEmployeeData = getAllEmployeeData;
//PS, HR
const filteredEmployee = async (department_id) => {
    let employee = await employee_1.employees.findAll({
        where: {
            department_id: department_id
        },
        attributes: {
            exclude: ['created_at', 'updated_at']
        }
    });
    return employee;
};
exports.filteredEmployee = filteredEmployee;
const getEmployeeById = async (id) => {
    let employee = await employee_1.employees.findByPk(id, {
        attributes: {
        // exclude: ['createdAt', 'updatedAt']
        }
    });
    return employee;
};
exports.getEmployeeById = getEmployeeById;
const updateEmployeeData = async (name, salary, department_id, id) => {
    let employee = await employee_1.employees.update({
        name: name,
        salary: salary,
        department: department_id
    }, {
        where: { id }
    });
    return employee;
};
exports.updateEmployeeData = updateEmployeeData;
const deleteEmployeeData = async (id) => {
    let employee = await employee_1.employees.destroy({ where: { id } });
    return employee;
};
exports.deleteEmployeeData = deleteEmployeeData;
