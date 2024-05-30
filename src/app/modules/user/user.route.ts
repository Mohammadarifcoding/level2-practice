import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

const ValidationMiddleWar = (req:Request,res:Response,next : NextFunction)=>{
    console.log('I am super hero')
}

router.post('/create-student',ValidationMiddleWar., UserControllers.createStudent);

export const UserRoutes = router;
