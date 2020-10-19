import { Router } from 'express';
import { MeController } from '../controllers';
import { validation } from '../middlewares/validator';
import { validateUpdate, validateUpdatePassword } from '../data/validations/user';

const router = Router();

router.get('/', MeController.find);
router.post('/', validation(validateUpdatePassword), MeController.updatePassword);
router.patch('/', validation(validateUpdate), MeController.update);

export default router;
