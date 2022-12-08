import { RequestHandler } from "express";
import { domainToASCII } from "url";
import { Employee } from "../models/employee";

const EMPLOYEES: Employee[] = [];

//Create new employee
export const createEmployee: RequestHandler = (req, res, next) => {
  const name = (req.body as { name: string }).name;
  const salary = (req.body as { salary: number }).salary;
  const department = (req.body as { department: string }).department;
  const newEmployee = new Employee(
    Math.random().toString(),
    name,
    salary,
    department
  );

  EMPLOYEES.push(newEmployee);

  res.status(200).json(newEmployee);
};

//Get All
export const getEmployees: RequestHandler = (req, res, next) => {
  res.json({ employee: EMPLOYEES });
};

//Get by ID
export const getSpecificEmployee: RequestHandler = (req, res, nexct) => {
  const employeeId = req.params.id;

  const employeeIndex = EMPLOYEES.findIndex(
    (employee) => employee.id === employeeId
  );

  if (employeeIndex < 0) {
    res.status(404).json({
      message: "Employee not found!",
    });
  }

  res.json(EMPLOYEES[employeeIndex]);
};

//Update
export const updateEmployee: RequestHandler<{ id: string }> = (
  req,
  res,
  next
) => {
  const employeeId = req.params.id;

  const updatedEmployeeName = (req.body as { name: string }).name;
  const updatedEmployeeSalary = (req.body as { salary: number }).salary;
  const updatedEmployeeDepartment = (req.body as { department: string })
    .department;

  const employeeIndex = EMPLOYEES.findIndex(
    (employee) => employee.id === employeeId
  );

  if (employeeIndex < 0) {
    res.status(404).json({
      message: "Employee not found!",
    });
  }

  const oldEmployeeDataObj = EMPLOYEES[employeeIndex]
  const oldEmployeeData = JSON.stringify(oldEmployeeDataObj)

  EMPLOYEES[employeeIndex] = new Employee(
    EMPLOYEES[employeeIndex].id,
    updatedEmployeeName,
    updatedEmployeeSalary,
    updatedEmployeeDepartment
  );

  const newEmployeeDataObj = EMPLOYEES[employeeIndex]
  const newEmployeeData = JSON.stringify(newEmployeeDataObj)

  if (oldEmployeeData === newEmployeeData) {
    res.status(304).json();
  }

  res.json(EMPLOYEES[employeeIndex]);
};

//Delete
export const deleteEmployee: RequestHandler = (req, res, next) => {
  const employeeId = req.params.id;

  const employeeIndex = EMPLOYEES.findIndex(
    (employee) => employee.id === employeeId
  );

  if (employeeIndex < 0) {
    res.status(404).json({
      message: "Employee not found!",
    });
  } else {
    EMPLOYEES.splice(employeeIndex, 1);
  }

  res.status(204).json();
}