import { departments } from "../models/department"

// export const findAllDepartment = async() => {
//     let department = await departments.findAll({
//         attributes: {
//             // exclude: ['createdAt', 'updatedAt']
//         }
//     })
//     return department
// } 

export const getDepartmentById = async(id: number) => {
    let department = await departments.findByPk(id, {
        attributes: {
            // exclude: ['createdAt', 'updatedAt']
        }
    })
    return department
}