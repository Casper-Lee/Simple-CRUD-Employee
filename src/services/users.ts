import { users } from "../models/users";

export const createUserData = async (username: string, password: string, department_id: number) => {
    let user = await users.create({
        username: username,
        password: password,
        department_id: department_id,
        created_at : new Date(),
        updated_at: new Date(),
    })
    return user
}

// export const loginUserData = async (username: string) => {
//         let user = await users.findByPk(username, {
//             attributes: {
//                 // exclude: ['createdAt', 'updatedAt']
//             }
//         })
//         return user
//     }

export const loginUserData = async(username: string) => {
    let user = await users.findOne({
        where:{
            username: username
        }
    })
    return user
}


export const getUserById = async(id: number) => {
    let user = await users.findByPk(id, {
        attributes: {
            // exclude: ['createdAt', 'updatedAt']
        }
    })
    return user
}
