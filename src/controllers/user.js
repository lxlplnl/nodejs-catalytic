import { UserDAO } from '../data/daos';
import BaseController from './BaseController';

class _UserController extends BaseController {
  constructor(params = {}) {
    super(params);
  }
}

export const UserController = new _UserController({ DAO: UserDAO });
