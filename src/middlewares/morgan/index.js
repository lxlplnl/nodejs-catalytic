import morgan from 'morgan';
import fs from 'fs';

morgan.token('id', function getId(req) {
  return req.id;
});

const logger = morgan(
  ':id :date[iso] :status :method\t  :res[content-length]\t :response-time ms\t :url',
  {
    stream: fs.createWriteStream('access.log', {
      flags: 'a',
    }),
  },
);

export default logger;
