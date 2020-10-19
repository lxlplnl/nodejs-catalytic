export default class BaseDAO {
  constructor(params) {
    this._Model = params.Model;
  }

  get Model() {
    return this._Model;
  }

  get(id) {
    return this.Model.findById(id);
  }

  findOne(query) {
    return this.Model.findOne(query);
  }

  list(_query, _options) {
    const options = { ..._options };
    const query = { ..._query };

    if (query.sort !== undefined) {
      options.sort = query.sort;
      delete query.sort;
    }
    if (query.page !== undefined) {
      options.page = parseInt(query.page, 10);
      delete query.page;
    }
    if (query.limit !== undefined) {
      options.limit = parseInt(query.limit, 10);
      delete query.limit;
    }
    if (query.pagination !== undefined) {
      options.pagination = query.pagination;
      delete query.pagination;
    }

    return this.Model.paginate(query, options);
  }

  update(_id, data) {
    return this.Model.findByIdAndUpdate({ _id }, data, { new: true });
  }

  create(modelInstance) {
    return this.Model.create(modelInstance);
  }

  remove(_id) {
    return this.Model.findByIdAndRemove(_id);
  }
}
