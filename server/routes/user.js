import { Router } from 'express';
import User from '../database/models/user';

const router = Router();

router.get('/me', async (req, res) => {
  return User.findById(req.user._id)
    .select('-password -__v')
    .then(result => res.json(result));
});

router.get('/:id', (req, res) => {
  return User.findById(req.params.id)
    .select('-password -__v')
    .then(result => res.json(result));
});

export default router;
