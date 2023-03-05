"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtAuthorisation = void 0;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const jwtAuthorisation = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log('req headers get: ', authHeader);
    // console.log('req headers:' , req.headers)
    if (!authHeader) {
        // console.log('request:', req)
        // console.log('req head:', req.header)
        console.log('authHeader: ', authHeader);
        // console.log('req user:' , req.user)
        return res.status(401).json({ message: "Authorization header not found" });
    }
    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
        // console.log(`bearer; ${bearer}, token; ${token}, authheader; ${authHeader} `)
        return res.status(401).json({ message: "Invalid authorization header format" });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    }
    catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
exports.jwtAuthorisation = jwtAuthorisation;
