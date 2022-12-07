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
    res
        .status(201)
        .json({ message: "created employee", createdEmployee: newEmployee });
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
        throw new Error("Could not find employee!");
    }
    res.json({
        message: "Found Employee!",
        foundEmployee: EMPLOYEES[employeeIndex],
    });
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
        throw new Error("Could not find employee!");
    }
    EMPLOYEES[employeeIndex] = new employee_1.Employee(EMPLOYEES[employeeIndex].id, updatedEmployeeName, updatedEmployeeSalary, updatedEmployeeDepartment);
    res.json({ message: "Updated!", updateEmployee: EMPLOYEES[employeeIndex] });
};
exports.updateEmployee = updateEmployee;
//Delete
const deleteEmployee = (req, res, next) => {
    const employeeId = req.params.id;
    const employeeIndex = EMPLOYEES.findIndex((employee) => employee.id === employeeId);
    if (employeeIndex < 0) {
        throw new Error("Could not find employee!");
    }
    EMPLOYEES.splice(employeeIndex, 1);
    res.json({ message: "Employee Deleted!" });
};
exports.deleteEmployee = deleteEmployee;
