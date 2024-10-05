import  { Request, Response, NextFunction } from 'express';
import userTableValidator from '../validatorSchemas/userTableValidator';


const validateUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = userTableValidator.parse({
            ...req.body,
            avatar: req.file?.path,
        });
        req.body = validatedData; 
        next(); 
    } catch (err: any) {
        return res.status(400).json({ error: err.errors });
    }
};

export default validateUser