/* eslint-disable no-console */
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jwtMV from 'express-jwt';
import jwt from 'jsonwebtoken';
import * as bodyParser from 'body-parser';
import morgan from 'morgan';
import fs from 'fs';
import uuidMV from './middlewares/uuidMV';
import routes from './routes';
import DB from './database';

if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined.');
  process.exit(1);
}
if (!process.env.DATABASE_URL) {
  console.error('FATAL ERROR: DATABASE_URL is not defined.');
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(uuidMV);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

morgan.token('id', function getId(req) {
  return req.id;
});

app.use(
  morgan(
    ':id :date[iso] :status :method\t  :res[content-length]\t :response-time ms\t :url',
    {
      stream: fs.createWriteStream('access.log', {
        flags: 'a',
      }),
    },
  ),
);

app.use(
  jwtMV({
    secret: process.env.JWT_SECRET,
    credentialsRequired: true,
  }).unless({ path: ['/login', '/register'] }),
);

app.use((req, res, next) => {
  const token = req.headers.authorization;
  req.user = jwt.verify(token, process.env.JWT_SECRET);
  next();
});

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
  next();
});

DB.connectDb().then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});

app.use('/session', routes.session);
app.use('/user', routes.user);
app.use('/', routes.root);
