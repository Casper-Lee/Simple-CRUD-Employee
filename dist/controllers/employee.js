"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.getSpecificEmployee = exports.getEmployees = exports.createEmployee = void 0;
const employee_1 = require("../services/employee");
// const EMPLOYEES: Employee[] = [];
//Create new employee
const createEmployee = async (req, res, next) => {
    const name = req.body.name;
    const salary = req.body.salary;
    const department = req.body.department_id;
    // const createdat = new Date()
    // const updatedat = new Date()
    // const newEmployee = new Employee(
    // //   // Math.random().toString(),
    // //   // name,
    // //   // salary,
    // //   // department
    // );
    try {
        const employee = await (0, employee_1.createEmployeeData)(name, salary, department);
        res.status(200).json(employee);
    }
    catch (error) {
        console.log(error);
    }
    // EMPLOYEES.push(newEmployee);
};
exports.createEmployee = createEmployee;
//Get All
const getEmployees = async (req, res, next) => {
    var _a;
    const getUserDepartment = (_a = req.user) === null || _a === void 0 ? void 0 : _a.department;
    try {
        // TODO: If department is ADMIN, take all employees, else take employee in given deprtment
        if (getUserDepartment === 3) {
            const employee = await (0, employee_1.getAllEmployeeData)();
            res.json({ employee });
        }
        if (getUserDepartment === 2) {
            const employee = await (0, employee_1.filteredEmployee)(2);
            res.json({ employee });
        }
        else if (getUserDepartment === 1) {
            const employee = await (0, employee_1.filteredEmployee)(1);
            res.json({ employee });
        }
        // const employee = await getAllEmployeeData();
        // console.log('testing: ', req.user?.department)
        // console.log('request ',req)
        // console.log('employee', employee)
        // res.json({ employee });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getEmployees = getEmployees;
//Filtering employee
// export const filterEmployeeByDep: RequestHandler =async (req, res, next) => {
//   const getEmployeeData = await getAllEmployeeData()
//   const getEmployeeDep = await getEmployeeData.department_id
//   const getDepId = await getDepartmentById(getEmployeeDep)
//   try {
//     const employee = await filteredEmployee(getDepId)
//     res.json({employee})
//   } catch (error) {
//     console.log(error)
//   }
// }
//Get by ID
const getSpecificEmployee = async (req, res, next) => {
    const employeeId = req.params.id;
    let employee;
    try {
        employee = await (0, employee_1.getEmployeeById)(employeeId);
        if (!employee) {
            res.status(404).json({ message: "Employee not found!" });
        }
        else {
            res.json(employee);
        }
    }
    catch (error) {
        console.log(error);
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
exports.getSpecificEmployee = getSpecificEmployee;
//Update
const updateEmployee = async (req, res, next) => {
    const employeeId = req.params.id;
    const updatedEmployeeName = req.body.name;
    const updatedEmployeeSalary = req.body.salary;
    const updatedEmployeeDepartment = req.body
        .department_id;
    let employee;
    try {
        employee = await (0, employee_1.getEmployeeById)(employeeId);
        if (!employee) {
            res.status(404).json({ message: "Employee not found!" });
        }
        if (employee.name === updatedEmployeeName &&
            employee.salary === updatedEmployeeSalary &&
            employee.department_id === updatedEmployeeDepartment) {
            res.status(304).json({ message: "No changes made" });
        }
        await (0, employee_1.updateEmployeeData)(updatedEmployeeName, updatedEmployeeSalary, updatedEmployeeDepartment, employeeId);
        res.status(200).json({
            id: employeeId,
            name: updatedEmployeeName,
            salary: updatedEmployeeSalary,
            department: updatedEmployeeDepartment,
        });
    }
    catch (error) {
        console.log(error);
    }
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
exports.updateEmployee = updateEmployee;
//Delete
const deleteEmployee = async (req, res, next) => {
    const employeeId = req.params.id;
    let employee;
    try {
        employee = await (0, employee_1.getEmployeeById)(employeeId);
        if (!employee) {
            res.status(404).json({ message: "Employee not found!" });
        }
        else
            employee = await (0, employee_1.deleteEmployeeData)(employeeId);
        res.status(204).end();
    }
    catch (error) {
        console.log(error);
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
exports.deleteEmployee = deleteEmployee;
