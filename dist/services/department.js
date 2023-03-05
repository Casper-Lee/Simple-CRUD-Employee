"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDepartmentById = void 0;
const department_1 = require("../models/department");
// export const findAllDepartment = async() => {
//     let department = await departments.findAll({
//         attributes: {
//             // exclude: ['createdAt', 'updatedAt']
//         }
//     })
//     return department
// } 
const getDepartmentById = async (id) => {
    let department = await department_1.departments.findByPk(id, {
        attributes: {
        // exclude: ['createdAt', 'updatedAt']
        }
    });
    return department;
};
exports.getDepartmentById = getDepartmentById;
