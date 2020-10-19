/* eslint-disable no-console */
import './envCheck';
import express from 'express';
import * as bodyParser from 'body-parser';
import listEndpoints from 'express-list-endpoints';
import jwtMV from './middlewares/jwtMV';
import uuidMV from './middlewares/uuidMV';
import routes from './routes';
import { connectDb } from './data';
import logger from './middlewares/morgan';
import bindUser from './middlewares/bindUser';
import unauthorizedErrorHandler from './middlewares/unauthorizedErrorHandler';

const app = express();
app.use(uuidMV);
app.use(logger);
app.use(jwtMV);
app.use(bindUser);
app.use(unauthorizedErrorHandler);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/me', routes.me);
app.use('/api/user', routes.user);
app.use('/api/', routes.unauthenticated);
app.get('/api/health-check', (req, res) =>
  res.json({ Health_Check: 'OK', endpoints: listEndpoints(app) }),
);

export function initApp() {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Example api running on port ${PORT}!`));
}

if (process.env.NODE_ENV !== 'test') connectDb().then(initApp);

export default app;
