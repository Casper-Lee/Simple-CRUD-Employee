import { RequestHandler } from "express";
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

  res
    .status(201)
    .json({ message: "created employee", createdEmployee: newEmployee });
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
    throw new Error("Could not find employee!");
  }

  res.json({
    message: "Found Employee!",
    foundEmployee: EMPLOYEES[employeeIndex],
  });
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
    throw new Error("Could not find employee!");
  }

  EMPLOYEES[employeeIndex] = new Employee(
    EMPLOYEES[employeeIndex].id,
    updatedEmployeeName,
    updatedEmployeeSalary,
    updatedEmployeeDepartment
  );

  res.json({ message: "Updated!", updateEmployee: EMPLOYEES[employeeIndex] });
};

//Delete
export const deleteEmployee: RequestHandler = (req, res, next) => {
  const employeeId = req.params.id;

  const employeeIndex = EMPLOYEES.findIndex(
    (employee) => employee.id === employeeId
  );

  if (employeeIndex < 0) {
    throw new Error("Could not find employee!");
  }

  EMPLOYEES.splice(employeeIndex, 1);

  res.json({ message: "Employee Deleted!" });
};
