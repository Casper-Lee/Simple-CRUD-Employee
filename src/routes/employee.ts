import { Router } from "express";

import { createEmployee, getEmployees, getSpecificEmployee ,updateEmployee, deleteEmployee } from "../controllers/employee";

const router = Router()

router.post('/', createEmployee) //add

router.get('/', getEmployees)//get

router.get('/:id', getSpecificEmployee) //get

router.put('/:id', updateEmployee) //update

router.delete('/:id', deleteEmployee) //delete

export default router