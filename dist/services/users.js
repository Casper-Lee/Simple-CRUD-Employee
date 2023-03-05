"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.loginUserData = exports.createUserData = void 0;
const users_1 = require("../models/users");
const createUserData = async (username, password, department_id) => {
    let user = await users_1.users.create({
        username: username,
        password: password,
        department_id: department_id,
        created_at: new Date(),
        updated_at: new Date(),
    });
    return user;
};
exports.createUserData = createUserData;
// export const loginUserData = async (username: string) => {
//         let user = await users.findByPk(username, {
//             attributes: {
//                 // exclude: ['createdAt', 'updatedAt']
//             }
//         })
//         return user
//     }
const loginUserData = async (username) => {
    let user = await users_1.users.findOne({
        where: {
            username: username
        }
    });
    return user;
};
exports.loginUserData = loginUserData;
const getUserById = async (id) => {
    let user = await users_1.users.findByPk(id, {
        attributes: {
        // exclude: ['createdAt', 'updatedAt']
        }
    });
    return user;
};
exports.getUserById = getUserById;
