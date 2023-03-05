"use strict";
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const jwtGenerator = (id, department_id) => {
    const payload = {
        username: id,
        department: department_id
    };
    console.log(payload);
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1hr" });
};
module.exports = jwtGenerator;
