import { Router } from 'express';
import User, { validate, validateLogin } from '../database/models/user';

const router = Router();

router.post('/login', async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });

  user
    .comparePassword(req.body.password)
    .then(isMatch => {
      if (isMatch) {
        const token = user.generateAuthToken();
        return res
          .header('x-auth-token', token)
          .status(204)
          .send();
      }
      return res.status(400).send('Invalid Credentials');
    })
    .catch(() => {
      return res.status(400).send('Bad Request');
    });
});

router.post('/register', async (req, res) => {
  // validate the request body first
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // find an existing user
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User({
    password: req.body.password,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send({
    _id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  });
});

export default router;
