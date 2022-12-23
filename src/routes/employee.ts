import { Router } from "express";
import {
  createEmployee,
  getEmployees,
  getSpecificEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee";

import { createOrUpdateEmployee } from "../middleware/validation";

const router = Router();

router.post("/", createOrUpdateEmployee, createEmployee); //add

router.get("/", getEmployees); //get

router.get("/:id", getSpecificEmployee); //get

router.put("/:id", createOrUpdateEmployee ,updateEmployee); //update

router.delete("/:id", deleteEmployee); //delete

export default router;
