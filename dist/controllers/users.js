"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = void 0;
const users_1 = require("../services/users");
const bcrypt = require("bcryptjs");
const jwtGenerator = require("../utils/jwtGenerator");
//register users
const createUser = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const department = req.body.department_id;
    const salt = await bcrypt.genSaltSync(10);
    const bcryptPassword = await bcrypt.hashSync(password, salt);
    const token = jwtGenerator(username, department);
    console.log('token:', token);
    const dbUsernameExists = await (0, users_1.loginUserData)(username);
    try {
        if (dbUsernameExists) {
            return res.status(403).json({ message: "username already exists!" });
        }
        else {
            const users = await (0, users_1.createUserData)(username, bcryptPassword, department);
            // res.status(200).json(users);
            res.json({ token });
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.createUser = createUser;
//login
const loginUser = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const dbUser = await (0, users_1.loginUserData)(username);
    try {
        console.log("DBDATA", dbUser);
        console.log("inputPass:", password); //inputpass: is whatever input on postman
        if (!dbUser.username) {
            return res.status(401).json({ message: "User does not exists" });
        }
        const hashedPassword = dbUser.password;
        const validPassword = await bcrypt.compare(password, hashedPassword);
        console.log("validpass:", validPassword);
        if (!validPassword) {
            return res.status(401).json({ message: "Password is incorrect" });
        }
        const token = jwtGenerator(dbUser.username, dbUser.department_id);
        res.json({ token });
    }
    catch (error) {
        console.log(error);
    }
};
exports.loginUser = loginUser;
