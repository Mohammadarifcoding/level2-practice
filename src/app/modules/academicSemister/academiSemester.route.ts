import express, { NextFunction, Request, Response } from 'express';
import { AcademicSemesterController } from './academicSemister.controller';
import ValidationMiddleWar from '../../middlewares/ValidRequest';
import { AcademicValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  ValidationMiddleWar(AcademicValidation.createAcamdemicSemesterValidaiton),
  AcademicSemesterController.createAcademicSemester,
);

export const AcademicSemesterRoute = router;
