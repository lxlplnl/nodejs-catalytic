import jwt from 'express-jwt';

const jwtMV = jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: true,
}).unless({ path: ['/login', '/register', '/health-check'] });

export default jwtMV;
