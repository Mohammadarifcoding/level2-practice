import express, { NextFunction, Request, Response } from 'express';
import { AcademicSemesterController } from './academicSemister.controller';



const router = express.Router();



router.post('/create-academic-semester',AcademicSemesterController.createAcademicSemester)

export const AcademicSemesterRoute = router;
