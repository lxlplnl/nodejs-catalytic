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

const app = express();

app.use(cors());
app.use(uuidMV);

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
  }).unless({ path: ['/login'] }),
);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
  next();
});

// Setting up bodyParser to use json and set it to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

DB.connectDb().then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});

app.post('/login', (req, res) => {
  const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: 10 });
  return res.json({
    token,
  });
});

app.get('/', (req, res) => {
  return res.end('Received a GET HTTP method');
});

app.post('/', (req, res) => {
  return res.end('Received a POST HTTP method');
});
app.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});
app.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});

app.use('/session', routes.session);
app.use('/user', routes.user);
