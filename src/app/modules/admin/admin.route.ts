import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { updateAdminValidationSchema } from './admin.validation';
import { AdminControllers } from './admin.controller';

const router = express.Router();

router.get('/', AdminControllers.getAllAdmins);

router.get('/:id', AdminControllers.getSingleAdmin);

router.patch(
  '/:id',
  validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/:adminId', AdminControllers.deleteAdmin);

export const AdminRoutes = router;