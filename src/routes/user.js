import { Router } from 'express';
import { UserController } from '../controllers';
import { validation } from '../middlewares/validator';
import { validateUpdate } from '../data/validations/user';

const router = Router();

router.get('/list', UserController.list);
router.get('/find', UserController.find);
router.get('/:id', UserController.find);
router.patch('/:id', validation(validateUpdate), UserController.update);
router.delete('/:id', UserController.remove);

export default router;
