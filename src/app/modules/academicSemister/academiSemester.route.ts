import express, { NextFunction, Request, Response } from 'express';
import { AcademicSemesterController } from './academicSemister.controller';
import ValidationMiddleWar from '../../middlewares/ValidRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';


const router = express.Router();

router.post(
  '/create-academic-semester',
  ValidationMiddleWar(AcademicSemesterValidation.createAcamdemicSemesterValidaiton),
  AcademicSemesterController.createAcademicSemester,
);

router.get(
  '/get-academic-semester',
  AcademicSemesterController.getAcademicSemester,
);

router.get('/get-academic-semester/:id',AcademicSemesterController.getAcademicSemesterById)

router.patch('/update-academic-semester/:id',ValidationMiddleWar(AcademicSemesterValidation.updateAcamdemicSemesterValidaiton),AcademicSemesterController.updateAcademicSemester)

export const AcademicSemesterRoute = router;
