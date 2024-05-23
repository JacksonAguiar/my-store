import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppEnviroment } from "src/infra/config/enviroment";

export default function EnsureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;
  
  if (!authHeader) {
    response.status(403).json("JWT token is missing.")
    throw new Error("JWT token is missing.");

  }
  
  const [, token] = authHeader.split(" ");
  
  try {
    verify(token,  AppEnviroment.JWT_SECRET);

    return next();
  } catch (err) {
    console.log("middleware catch: " + err);
    response.status(403).json("Invalid JWT token.")
    throw new Error(`Invalid JWT token: ${err}`);
  }
}