import { RequestHandler } from "express";
import { Employee } from "../models/employee";
import {
  createEmployeeData,
  deleteEmployeeData,
  getAllEmployeeData,
  getEmployeeById,
  updateEmployeeData,
} from "../services/employee";

const EMPLOYEES: Employee[] = [];

//Create new employee
export const createEmployee: RequestHandler = async (req, res, next) => {
  const name = (req.body as { name: string }).name;
  const salary = (req.body as { salary: number }).salary;
  const department = (req.body as { department: string }).department;
  // const newEmployee = new Employee(
  // //   // Math.random().toString(),
  // //   // name,
  // //   // salary,
  // //   // department
  // );
  try {
    const employee = await createEmployeeData(name, salary, department);
    res.status(200).json(employee);
  } catch (error) {
    // res.status(400).json('Something went wrong!')
  }
  // EMPLOYEES.push(newEmployee);
};

//Get All
export const getEmployees: RequestHandler = async (req, res, next) => {
  try {
    const employee = await getAllEmployeeData();
    res.json({ employee });
  } catch (error) {}
};

//Get by ID
export const getSpecificEmployee: RequestHandler = async (req, res, next) => {
  const employeeId = req.params.id;
  let employee;
  try {
    employee = await getEmployeeById(employeeId);
    if (!employee) {
      res.status(404).json({ message: "Employee not found!" });
    } else {
      res.json(employee);
    }
  } catch (error) {
    throw error;
  }

  // const employeeIndex = EMPLOYEES.findIndex(
  //   (employee) => employee.id === employeeId
  // );

  // if (employeeIndex < 0) {
  //   res.status(404).json({
  //     message: "Employee not found!",
  //   });
  // }

  // res.json(EMPLOYEES[employeeIndex]);
};

//Update
export const updateEmployee: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  const employeeId = req.params.id;
  const updatedEmployeeName = (req.body as { name: string }).name;
  const updatedEmployeeSalary = (req.body as { salary: number }).salary;
  const updatedEmployeeDepartment = (req.body as { department: string })
    .department;

    
    let employee;
    try {
      employee = await getEmployeeById(employeeId);
      if (!employee) {
        res.status(404).json({ message: "Employee not found!" });
      } 
      
      if (
        employee.name === updatedEmployeeName &&
        employee.salary === updatedEmployeeSalary &&
        employee.department === updatedEmployeeDepartment
      ) {
        res.status(304).json({ message: "No changes made" });
      }
      await updateEmployeeData(
        updatedEmployeeName,
        updatedEmployeeSalary,
        updatedEmployeeDepartment,
        employeeId
      );
      res.status(200).json({
        id: employeeId,
        name: updatedEmployeeName,
        salary: updatedEmployeeSalary,
        department: updatedEmployeeDepartment,
      });
    
  } catch (error) {}

  // const employeeIndex = EMPLOYEES.findIndex(
  //   (employee) => employee.id === employeeId
  // );

  // if (employeeIndex < 0) {
  //   res.status(404).json({
  //     message: "Employee not found!",
  //   });
  // }

  // const oldEmployeeDataObj = EMPLOYEES[employeeIndex]
  // const oldEmployeeData = JSON.stringify(oldEmployeeDataObj)

  // EMPLOYEES[employeeIndex] = new Employee(
  //   EMPLOYEES[employeeIndex].id,
  //   updatedEmployeeName,
  //   updatedEmployeeSalary,
  //   updatedEmployeeDepartment
  // );

  // const newEmployeeDataObj = EMPLOYEES[employeeIndex]
  // const newEmployeeData = JSON.stringify(newEmployeeDataObj)

  // if (oldEmployeeData === newEmployeeData) {
  //   res.status(304).json();
  // }

  // res.json(EMPLOYEES[employeeIndex]);
};

//Delete
export const deleteEmployee: RequestHandler = async (req, res, next) => {
  const employeeId = req.params.id;
  let employee;
  try {
    employee = await getEmployeeById(employeeId);
    if (!employee) {
      res.status(404).json({ message: "Employee not found!" });
    } else employee = await deleteEmployeeData(employeeId);
    res.status(204).end();
  } catch (error) {
    throw error;
  }

  // const employeeIndex = EMPLOYEES.findIndex(
  //   (employee) => employee.id === employeeId
  // );

  // if (employeeIndex < 0) {
  //   res.status(404).json({
  //     message: "Employee not found!",
  //   });
  // } else {
  //   EMPLOYEES.splice(employeeIndex, 1);
  // }

  // res.status(204).json();
};
