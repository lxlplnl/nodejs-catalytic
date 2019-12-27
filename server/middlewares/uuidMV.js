import uuid from 'node-uuid';

export default function uuidMV(req, res, next) {
  req.id = uuid.v4();
  next();
}
