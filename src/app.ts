import express, {Request, Response, NextFunction} from "express";
import { json } from 'body-parser';
import cors from 'cors';
const {sequelize, Employee} = require('./models/employee')

import userRoutes from './routes/users'
import employeeRoutes from './routes/employee'

const app = express();
app.use(cors())

app.use(json())

app.use('/auth', userRoutes )

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