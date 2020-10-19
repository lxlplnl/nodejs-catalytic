import BaseDAO from './BaseDAO';
import { User } from '../models';

class _UserDAO extends BaseDAO {
  constructor(params = {}) {
    super({ ...params });
  }

  getUnsafe(id) {
    return super.get(id);
  }

  get(id) {
    return super.get(id).select('-password');
  }

  findOne(query) {
    return super.findOne(query).select('-password');
  }

  list(query, _options = { select: '' }) {
    const options = { ..._options };
    options.select = options.select.concat(' -password');
    return super.list(query, options);
  }

  update(_id, data) {
    // eslint-disable-next-line no-unused-vars
    const { password, email, ...safeUser } = data;
    return super.update(_id, safeUser).select('-password');
  }
}

export const UserDAO = new _UserDAO({ Model: User });
