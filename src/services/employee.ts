import { Employee } from "../models/employee"

export const createEmployeeData = async (name: string, salary: number, department: string) => {
    let employee = await Employee.create({
        name: name,
        salary: salary,
        department: department
    })
    return employee
}

export const getAllEmployeeData = async() => {
    let employee = await Employee.findAll()
    return employee
} 

export const getEmployeeById = async(id: string) => {
    let employee = await Employee.findByPk(id)
    return employee
}

export const updateEmployeeData = async (name: string, salary: number, department: string, id:string) => {
    let employee = await Employee.update({
        name: name,
        salary: salary,
        department: department
    },{
        where: {id}
    })
    return employee
}

export const deleteEmployeeData = async (id: string) =>{
    let employee = await Employee.destroy({where: {id}})
    return employee
}