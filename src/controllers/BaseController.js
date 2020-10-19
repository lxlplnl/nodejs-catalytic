import _ from 'lodash';

export default class BaseController {
  constructor(params) {
    this.DAO = params.DAO;
    this.find = this.find.bind(this);
    this.list = this.list.bind(this);
    this.update = this.update.bind(this);
    this.create = this.create.bind(this);
    this.remove = this.remove.bind(this);
  }

  get dao() {
    return this.DAO;
  }

  handleError(res) {
    return function (err) {
      if (res.statusCode === 200) res.status(422);
      if (err.status) res.status(err.status);
      if (err instanceof Error) res.json({ apiError: [err.message] });
      else res.json({ apiError: [err] });
    };
  }

  find(req, res) {
    let promise;
    if (req.params.id) {
      promise = this.DAO.get(req.params.id);
    } else if (!_.isEmpty(req.query)) {
      promise = this.DAO.findOne(req.query);
    } else {
      return res.status(400).json({ apiError: ['Bad Request'] });
    }
    return promise
      .then((result) => {
        if (result) res.json(result);
        else res.status(404).end();
      })
      .catch(this.handleError(res));
  }

  list(req, res) {
    return this.DAO.list(req.query)
      .then((result) => res.json(result))
      .catch(this.handleError(res));
  }

  update(req, res) {
    return this.DAO.update(req.params.id, req.body)
      .then((result) => {
        if (result !== null) res.json(result);
        else {
          res.status(404).end();
        }
      })
      .catch(this.handleError(res));
  }

  create(req, res) {
    return this.DAO.create(req.body)
      .then((result) => res.status(201).json(result))
      .catch(this.handleError(res));
  }

  remove(req, res) {
    return this.DAO.remove(req.params.id)
      .then(() => res.status(204).end())
      .catch(this.handleError(res));
  }
}
