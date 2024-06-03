import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import { AnyZodObject } from 'zod';

import catchAsync from '../../utils/catchAsync';
import ValidationMiddleWar from '../../middlewares/ValidRequest';
import { createStudentValidationSchema } from '../student/student.validation';

const router = express.Router();

router.post(
  '/create-student',
  ValidationMiddleWar(createStudentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
