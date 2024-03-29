"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const { sequelize, Employee } = require('./models/employee');
const users_1 = __importDefault(require("./routes/users"));
const employee_1 = __importDefault(require("./routes/employee"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, body_parser_1.json)());
app.use('/auth', users_1.default);
app.use('/employee', employee_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
// app.listen(3000);
app.listen({ port: 3000 }, async () => {
    console.log('Server up!');
    await sequelize.authenticate();
    console.log('Database Connected');
});
