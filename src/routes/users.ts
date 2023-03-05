import { Router } from "express";
import { Request, Response, NextFunction } from 'express';
import { createUser, loginUser } from "../controllers/users";
import { jwtAuthorisation } from "../middleware/authorisation";
const router = Router();

router.post("/register", createUser)
router.post("/login", loginUser)
router.get("/is-verify", jwtAuthorisation, async (req, res) => {
    try {
        res.json(true)
    } catch (error) {
        console.log(error)
    }    
})


export default router;
