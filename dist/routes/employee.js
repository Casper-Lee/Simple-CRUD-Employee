"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_1 = require("../controllers/employee");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
router.post("/", validation_1.createOrUpdateEmployee, employee_1.createEmployee); //add
router.get("/", employee_1.getEmployees); //get
router.get("/:id", employee_1.getSpecificEmployee); //get
router.put("/:id", validation_1.createOrUpdateEmployee, employee_1.updateEmployee); //update
router.delete("/:id", employee_1.deleteEmployee); //delete
exports.default = router;
