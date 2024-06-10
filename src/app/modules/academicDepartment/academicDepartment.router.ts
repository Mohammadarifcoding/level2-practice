import express from 'express'
import ValidationMiddleWar from '../../middlewares/ValidRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';


const router = express.Router();

router.post(
  '/create-academic-department',
  ValidationMiddleWar(AcademicDepartmentValidation.createAcademicDepartmentValidation),
  AcademicDepartmentController.createAcademicDepartment,
);

router.get(
  '/get-academic-department',
  AcademicDepartmentController.getAcademicDepartment,
);

router.get('/get-academic-department/:id',AcademicDepartmentController.getAcademicDepartmentById)

router.patch('/update-academic-department/:id',ValidationMiddleWar(AcademicDepartmentValidation.updateAcademicDepartmentValidation),AcademicDepartmentController.updateAcademicDepartment)

export const AcademicDepartmentRoute = router;
