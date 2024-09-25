import { Request, Response, NextFunction } from "express";
import { validate as isUUID } from "uuid";

const handleRequest = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params as { id: string }; 

  if (!isUUID(id)) {
    return res.status(400).json({ error: "Invalid UUID format." });
  }

  console.log("Valid UUID:", id);

  next();
};

export { handleRequest };