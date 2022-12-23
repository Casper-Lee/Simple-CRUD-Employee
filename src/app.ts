import express, {Request, Response, NextFunction} from "express";
import { json } from 'body-parser';
const {sequelize, Employee} = require('./models/employee')

import employeeRoutes from './routes/employee'

const app = express();

app.use(json())

app.use('/employee', employeeRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: err.message})
})

// app.listen(3000);

app.listen({port: 3000}, async () => {
    console.log('Server up!')
    await sequelize.authenticate()
    console.log('Database Connected')
})