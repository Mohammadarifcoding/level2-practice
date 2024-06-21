import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createStudentValidationSchema } from './../student/student.validation';
import { UserControllers } from './user.controller';
import { createFacultyValidationSchema } from './../faculty/faculty.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post('/create-faculty', validateRequest(createFacultyValidationSchema),UserControllers.createFaculty)
export const UserRoutes = router;
