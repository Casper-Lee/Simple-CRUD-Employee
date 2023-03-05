"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_1 = require("../controllers/employee");
const authorisation_1 = require("../middleware/authorisation");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
router.post("/", authorisation_1.jwtAuthorisation, validation_1.createOrUpdateEmployee, employee_1.createEmployee); //add
router.get("/", authorisation_1.jwtAuthorisation, employee_1.getEmployees); //get
router.get("/:id", authorisation_1.jwtAuthorisation, employee_1.getSpecificEmployee); //get
router.put("/:id", authorisation_1.jwtAuthorisation, validation_1.createOrUpdateEmployee, employee_1.updateEmployee); //update
router.delete("/:id", authorisation_1.jwtAuthorisation, employee_1.deleteEmployee); //delete
exports.default = router;
// module.exports = router
