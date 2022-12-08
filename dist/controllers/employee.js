"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.getSpecificEmployee = exports.getEmployees = exports.createEmployee = void 0;
const employee_1 = require("../models/employee");
const EMPLOYEES = [];
//Create new employee
const createEmployee = (req, res, next) => {
    const name = req.body.name;
    const salary = req.body.salary;
    const department = req.body.department;
    const newEmployee = new employee_1.Employee(Math.random().toString(), name, salary, department);
    EMPLOYEES.push(newEmployee);
    res.status(200).json(newEmployee);
};
exports.createEmployee = createEmployee;
//Get All
const getEmployees = (req, res, next) => {
    res.json({ employee: EMPLOYEES });
};
exports.getEmployees = getEmployees;
//Get by ID
const getSpecificEmployee = (req, res, nexct) => {
    const employeeId = req.params.id;
    const employeeIndex = EMPLOYEES.findIndex((employee) => employee.id === employeeId);
    if (employeeIndex < 0) {
        res.status(404).json({
            message: "Employee not found!",
        });
    }
    res.json(EMPLOYEES[employeeIndex]);
};
exports.getSpecificEmployee = getSpecificEmployee;
//Update
const updateEmployee = (req, res, next) => {
    const employeeId = req.params.id;
    const updatedEmployeeName = req.body.name;
    const updatedEmployeeSalary = req.body.salary;
    const updatedEmployeeDepartment = req.body
        .department;
    const employeeIndex = EMPLOYEES.findIndex((employee) => employee.id === employeeId);
    if (employeeIndex < 0) {
        res.status(404).json({
            message: "Employee not found!",
        });
    }
    const oldEmployeeDataObj = EMPLOYEES[employeeIndex];
    const oldEmployeeData = JSON.stringify(oldEmployeeDataObj);
    EMPLOYEES[employeeIndex] = new employee_1.Employee(EMPLOYEES[employeeIndex].id, updatedEmployeeName, updatedEmployeeSalary, updatedEmployeeDepartment);
    const newEmployeeDataObj = EMPLOYEES[employeeIndex];
    const newEmployeeData = JSON.stringify(newEmployeeDataObj);
    if (oldEmployeeData === newEmployeeData) {
        res.status(304).json();
    }
    res.json(EMPLOYEES[employeeIndex]);
};
exports.updateEmployee = updateEmployee;
//Delete
const deleteEmployee = (req, res, next) => {
    const employeeId = req.params.id;
    const employeeIndex = EMPLOYEES.findIndex((employee) => employee.id === employeeId);
    if (employeeIndex < 0) {
        res.status(404).json({
            message: "Employee not found!",
        });
    }
    else {
        EMPLOYEES.splice(employeeIndex, 1);
    }
    res.status(204).json();
};
exports.deleteEmployee = deleteEmployee;
