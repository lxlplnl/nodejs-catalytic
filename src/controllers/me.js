import { UserDAO } from '../data/daos';
import BaseController from './BaseController';

class _MeController extends BaseController {
  constructor(params = {}) {
    super(params);
  }

  find = (req, res) => {
    req.params.id = req.user._id;
    return super.find(req, res);
  };

  update = (req, res) => {
    req.params.id = req.user._id;
    return super.update(req, res);
  };

  updatePassword = (req, res) => {
    const { password, newPassword } = req.body;
    return this.dao
      .getUnsafe(req.user._id)
      .then((user) =>
        user.comparePassword(password).then((isMatch) => {
          if (isMatch) {
            user.set({ password: newPassword });
            return user.save();
          }
          res.status(403).json({ apiError: ['Password is wrong'] });
        }),
      )
      .then(() => res.status(204).end())
      .catch(this.handleError(res));
  };
}

export const MeController = new _MeController({ DAO: UserDAO });
