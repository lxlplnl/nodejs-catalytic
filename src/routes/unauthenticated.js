import { Router } from 'express';
import { UnauthenticatedController } from '../controllers';
import { validateLogin, validateRegister } from '../data/validations/user';
import { validation } from '../middlewares/validator';

const router = Router();

router.post(
  '/login',
  validation(validateLogin),
  UnauthenticatedController.login,
);
router.post(
  '/register',
  validation(validateRegister),
  UnauthenticatedController.register,
);

export default router;
