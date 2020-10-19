import { validateRegister, validateLogin } from '../data/validations/user';
import { UserDAO } from '../data/daos';

class _UnauthenticatedController {
  login = (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    UserDAO.Model.findOne({ email: req.body.email })
      .then((user) => {
        return user.comparePassword(req.body.password).then((isMatch) => {
          if (isMatch) {
            const token = user.generateAuthToken();
            return res.header('x-auth-token', token).status(204).send();
          }
          return res.status(400).send('Invalid Credentials');
        });
      })
      .catch(() => {
        return res.status(400).send('Bad Request');
      });
  };

  register = async (req, res) => {
    const { error } = validateRegister(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await UserDAO.Model.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new UserDAO.Model({
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
  };
}

export const UnauthenticatedController = new _UnauthenticatedController();
