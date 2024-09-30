import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    console.log("Authorization header missing");
    return res.status(401).json({ error: "Unauthorized" });
  }

  console.log("Authorization header received:", authHeader);

  const token = authHeader.split(" ")[1];
  if (!token) {
    console.log("Token missing after Bearer");
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      console.log("Token verification failed:", err.message);
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = decoded;
    next();
  });
};

export default verifyToken;
