import * as fs from 'fs';
import * as https from 'https';
import * as express from 'express';
import v1 from './routes/v1';
import v2 from './routes/v2';
import * as morgan from 'morgan';
import {inspect} from 'util';

const app = express();
const port = process.env.PORT || 3000;
const httpsPort = process.env.PORT_HTTPS || 4000;

app.use(express.json());

app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log(inspect(req.body, false, 69, true));
  next();
});

app.use('/v1', v1);
app.use('/v2', v2);

app.use((error, req, res, next) => {
  if (typeof error == 'string') {
    return res.status(400).send({
      status: 400,
      error: 'badRequest',
      description: '###',
      message: error,
    });
  }
  return res.status(500).send({
    status: 500,
    error: 'internalServerError',
    description: '###',
    message: error.message ?? error.toString(),
  });
});

app.listen(port, () => {
  console.log(`App listening on http port ${port}`);
});

const httpsServer = https.createServer({
  key: fs.readFileSync(__dirname + '/../certs/cert-key.pem'),
  cert: fs.readFileSync(__dirname + '/../certs/fullchain.pem'),
}, app);

httpsServer.listen(httpsPort, () => {
  console.log(`App listening on https port ${httpsPort}`);
});
