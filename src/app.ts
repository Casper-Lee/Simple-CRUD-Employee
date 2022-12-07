import express, {Request, Response, NextFunction} from "express";
import { json } from 'body-parser';

import employeeRoutes from './routes/employee'

const app = express();

app.use(json())

app.use('/employee', employeeRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: err.message})
})

app.listen(3000);
