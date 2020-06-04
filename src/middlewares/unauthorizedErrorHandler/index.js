export default function unauthorizedErrorHandler(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ apiError: ['invalid token...'] });
  }
  next();
}
