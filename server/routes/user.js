import { Router } from 'express';

const router = Router();

const user = {
  firstName: 'AT',
  lastName: 'ADAM',
};

router.get('/', (req, res) => {
  return res.send(JSON.stringify(user));
});

export default router;
