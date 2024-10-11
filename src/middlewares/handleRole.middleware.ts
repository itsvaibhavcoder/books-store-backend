import { Request, Response, NextFunction } from 'express';

export const handleRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const adminEndPoint = '/adminsignup';

    if (req.path === adminEndPoint) {
        req.body.role = 'admin';
    } 
    else {
        req.body.role = 'customer'; 
    }
    next();
};
