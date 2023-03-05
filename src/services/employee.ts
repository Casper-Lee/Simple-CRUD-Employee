import { employees } from "../models/employee"

export const createEmployeeData = async (name: string, salary: number, department_id: number) => {
    let employee = await employees.create({
        name: name,
        salary: salary,
        department_id: department_id,
        created_at : new Date(),
        updated_at: new Date(),
        
        // created_at: created_at,
        // updated_at: updated_at
    })
    return employee
}

//ADMIN
export const getAllEmployeeData = async() => {
    let employee = await employees.findAll({
        // where: {
        //     department_id : department_id
        // },
        attributes: {
            exclude: ['created_at', 'updated_at']
        }
    })
    return employee
} 

//PS, HR
export const filteredEmployee = async(department_id: number) => {
    let employee = await employees.findAll({
        where: {
            department_id : department_id
        },
        attributes: {
            exclude: ['created_at', 'updated_at']
        }
    })
    return employee
}

export const getEmployeeById = async(id: string) => {
    let employee = await employees.findByPk(id, {
        attributes: {
            // exclude: ['createdAt', 'updatedAt']
        }
    })
    return employee
}

export const updateEmployeeData = async (name: string, salary: number, department_id: number, id:string) => {
    let employee = await employees.update({
        name: name,
        salary: salary,
        department: department_id
    },{
        where: {id}
    })
    return employee
}

export const deleteEmployeeData = async (id: string) =>{
    let employee = await employees.destroy({where: {id}})
    return employee
}