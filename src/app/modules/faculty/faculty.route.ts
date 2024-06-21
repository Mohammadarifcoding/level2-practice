import validateRequest from "../../middlewares/validateRequest";
import { FacultyControllers } from "./faculty.controller";
import { updateFacultyValidationSchema } from "./faculty.validation";
import express from 'express'


const router = express.Router();

router.get('/:FacultyId', FacultyControllers.getSingleFaculty);

router.patch(
  '/:FacultyId',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:FacultyId', FacultyControllers.deleteFaculty);

router.get('/', FacultyControllers.getAllFacultys);

export const FacultyRoutes = router;
