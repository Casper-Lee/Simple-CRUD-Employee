import { Request, Response, NextFunction } from "express";
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

declare global {
    namespace Express {
      interface Request {
        user?: JWTPayload;
      }
    }
  }
  

interface JWTPayload {
  username: number;
  department: number
  // add any other properties you want to include in the JWT payload
}

export const jwtAuthorisation = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  console.log('req headers get: ', authHeader)
  // console.log('req headers:' , req.headers)

  if (!authHeader) {
    // console.log('request:', req)
    // console.log('req head:', req.header)
    console.log('authHeader: ',authHeader)
    // console.log('req user:' , req.user)
    return res.status(401).json({ message: "Authorization header not found" });
  }



  const [bearer, token] = (authHeader as string).split(" ")

  if (bearer !== "Bearer" || !token) {
    // console.log(`bearer; ${bearer}, token; ${token}, authheader; ${authHeader} `)
    return res.status(401).json({ message: "Invalid authorization header format" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
    req.user = decodedToken;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};