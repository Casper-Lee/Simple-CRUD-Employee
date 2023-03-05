import { Router } from "express";
import {
  createEmployee,
  getEmployees,
  getSpecificEmployee,
  updateEmployee,
  deleteEmployee,
  // filterEmployeeByDep
} from "../controllers/employee";
import { jwtAuthorisation } from "../middleware/authorisation";

import { createOrUpdateEmployee } from "../middleware/validation";

const router = Router();

router.post("/", jwtAuthorisation ,createOrUpdateEmployee, createEmployee); //add

router.get("/", jwtAuthorisation ,getEmployees); //get

router.get("/:id", jwtAuthorisation ,getSpecificEmployee); //get

router.put("/:id", jwtAuthorisation ,createOrUpdateEmployee ,updateEmployee); //update

router.delete("/:id", jwtAuthorisation ,deleteEmployee); //delete

export default router;

// module.exports = router

