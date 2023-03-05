import { users } from "../models/users";
import { RequestHandler } from "express";
import { createUserData, getUserById, loginUserData } from "../services/users";
const bcrypt = require("bcryptjs");
const jwtGenerator = require("../utils/jwtGenerator");

//register users
export const createUser: RequestHandler = async (req, res, next) => {
  const username = (req.body as { username: string }).username;
  const password = (req.body as { password: string }).password;
  const department = (req.body as { department_id: number }).department_id;

  const salt = await bcrypt.genSaltSync(10);
  const bcryptPassword = await bcrypt.hashSync(password, salt);
  const token = jwtGenerator(username, department);
  console.log('token:' , token)

  const dbUsernameExists = await loginUserData(username);
  
  try {
    if(dbUsernameExists){
      return res.status(403).json({message: "username already exists!"})
    }else{
      const users = await createUserData(username, bcryptPassword, department);
      // res.status(200).json(users);
      res.json( {token} );
    }

    
  } catch (error) {
    console.log(error);
  }
};

//login
export const loginUser: RequestHandler = async (req, res, next) => {
  const username = (req.body as { username: string }).username;
  const password = (req.body as { password: string }).password;
  
  const dbUser = await loginUserData(username);
  
  try {
    console.log("DBDATA", dbUser);
    console.log("inputPass:", password); //inputpass: is whatever input on postman
    
    if (!dbUser.username) {
      return res.status(401).json({ message: "User does not exists" });
    }
    
    const hashedPassword = dbUser.password;
    const validPassword = await bcrypt.compare(password, hashedPassword);
    console.log("validpass:", validPassword);

    if (!validPassword) {
      return res.status(401).json({ message: "Password is incorrect" });
    }

    const token = jwtGenerator(dbUser.username, dbUser.department_id)

    res.json({token})

  } catch (error) {
    console.log(error);
  }
};