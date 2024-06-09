import ValidationMiddleWar from "../../middlewares/ValidRequest";
import { AcademicSemesterValidation } from "../academicSemister/academicSemester.validation";
import { AcademicFacultyController } from "./academicFaculty.controller";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
import express from 'express'

const router = express.Router();

router.post(
  '/create-academic-faculty',
  ValidationMiddleWar(AcademicFacultyValidation.createAcademicFacultyValidation),
  AcademicFacultyController.createAcademicFaculty,
);

router.get(
  '/get-academic-faculty',
  AcademicFacultyController.getAcademicFaculty,
);

router.get('/get-academic-facult/:id',AcademicFacultyController.getAcademicFacultyById)

router.patch('/update-academic-faculty/:id',ValidationMiddleWar(AcademicSemesterValidation.updateAcamdemicSemesterValidaiton),AcademicFacultyController.updateAcademicFaculty)

export const AcademicSemesterRoute = router;
