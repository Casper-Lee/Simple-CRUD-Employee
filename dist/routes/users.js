"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const authorisation_1 = require("../middleware/authorisation");
const router = (0, express_1.Router)();
router.post("/register", users_1.createUser);
router.post("/login", users_1.loginUser);
router.get("/is-verify", authorisation_1.jwtAuthorisation, async (req, res) => {
    try {
        res.json(true);
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = router;
