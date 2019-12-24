import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import { connectDb } from './database';

const app = express();

app.use(cors());

app.use((req, res, next) => {
  console.log(req);
  next();
});

connectDb().then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});

app.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});
app.post('/', (req, res) => {
  return res.send('Received a POST HTTP method');
});
app.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});
app.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});

app.use('/session', routes.session);
app.use('/user', routes.user);
