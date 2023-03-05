import { RequestHandler } from "express";
import { getDepartmentById } from "../services/department";
import {
  createEmployeeData,
  deleteEmployeeData,
  filteredEmployee,
  getAllEmployeeData,
  getEmployeeById,
  updateEmployeeData
} from "../services/employee";
import { loginUserData } from "../services/users";

// const EMPLOYEES: Employee[] = [];

//Create new employee
export const createEmployee: RequestHandler = async (req, res, next) => {
  const name = (req.body as { name: string }).name;
  const salary = (req.body as { salary: number }).salary;
  const department = (req.body as { department_id: number }).department_id;
  // const createdat = new Date()
  // const updatedat = new Date()
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
    console.log(error);
  }
  // EMPLOYEES.push(newEmployee);
};

//Get All
export const getEmployees: RequestHandler = async (req, res, next) => {
  const getUserDepartment = req.user?.department
  

  try {
    // TODO: If department is ADMIN, take all employees, else take employee in given deprtment
      if(getUserDepartment  === 3){
        const employee = await getAllEmployeeData();
        res.json({ employee });
      }

      if(getUserDepartment === 2){
       const employee = await filteredEmployee(2)
       res.json({employee})
      }else if(getUserDepartment === 1){
        const employee = await filteredEmployee(1)
        res.json({employee})
      }


      // const employee = await getAllEmployeeData();
      // console.log('testing: ', req.user?.department)
      // console.log('request ',req)
      // console.log('employee', employee)
    // res.json({ employee });
  } catch (error) {
    console.log(error);
  }
};

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

//Update
export const updateEmployee: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  const employeeId = req.params.id;
  const updatedEmployeeName = (req.body as { name: string }).name;
  const updatedEmployeeSalary = (req.body as { salary: number }).salary;
  const updatedEmployeeDepartment = (req.body as { department_id: number })
    .department_id;

  let employee;
  try {
    employee = await getEmployeeById(employeeId);
    if (!employee) {
      res.status(404).json({ message: "Employee not found!" });
    }

    if (
      employee.name === updatedEmployeeName &&
      employee.salary === updatedEmployeeSalary &&
      employee.department_id === updatedEmployeeDepartment
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
  } catch (error) {
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
