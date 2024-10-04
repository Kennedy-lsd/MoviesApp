import  { Request, Response, NextFunction } from 'express';
import imageTableValidator from '../validatorSchemas/imageTableValidator';

const validateImage = (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = imageTableValidator.parse({
            ...req.body,
            image: req.file?.path,
        });
        req.body = validatedData; 
        next(); 
    } catch (err: any) {
        return res.status(400).json({ error: err.errors });
    }
};

export default validateImage