import {randomUUID} from 'crypto';
import {Request, Response, Router} from 'express';
import {DateTime} from 'luxon';
import * as jwt from 'jsonwebtoken';
import {promisify} from 'util';
import {EMAIL_ADDRESS, FULL_NAME, PHONE_NUMBER} from '../../data';
import returns from './returns';
import documents from './documents';
import prices from './prices';
import collect from './collect';
import notifications from './notifications';

const jwtSign = promisify(jwt.sign).bind(jwt);

const v1 = Router();

v1.post('/sendSMSCode', (req: Request<{}, {}, {phoneNumber: string}>, res: Response<{expirationTime: Date}>) => {
  const {phoneNumber} = req.body;

  console.log(`sendSMSCode called with phone number ${phoneNumber}`);

  res.send({expirationTime: DateTime.now().plus({minutes: 5}).toJSDate()});
});

async function getToken() {
  return 'Bearer ' + await jwtSign({
    aud: 'IMA',
    sub: '133742069',
    iss: 'IMA',
    exp: DateTime.now().plus({hours: 2}).toUnixInteger(),
    iat: DateTime.now().toUnixInteger(),
    did: '1337420' // device id (used for crashlytics)
  }, 'we will never verify this anyway');
}

v1.post('/confirmSMSCode', async (req, res: Response<{refreshToken: string, authToken: string}>, next) => {
  try {
    res.send({
      refreshToken: randomUUID(),
      authToken: await getToken(),
    });
  } catch (error) {
    next(error);
  }
});

v1.post('/authenticate', async (req: Request<{}, {}, {refreshToken: string, phoneOS: string}>, res: Response<{authToken: string, reauthenticationRequired: boolean}>, next) => {
  try {
    res.send({
      authToken: await getToken(),
      reauthenticationRequired: false, // TODO: check what effect this has on the app
    });
  } catch (error) {
    next(error);
  }
});

v1.get('/preferences', (req, res) => {
  res.send({
    preferences: [
      {
        key: 'PHONE_NUMBER',
        value: PHONE_NUMBER
      },
      {
        key: 'FULL_NAME',
        value: FULL_NAME,
      },
      {
        key: 'EMAIL',
        value: EMAIL_ADDRESS
      }
    ]
  });
});

v1.get('/companies/:taxNumber', (req: Request<{taxNumber: string}>, res) => {
  res.send({
    taxNumber: req.params.taxNumber,
    nationalBusinessRegistryNumber: '123456789',
    companies: [
      {
        name: 'Fake company',
        street: 'Nieistniejąca',
        buildingNumber: '0',
        city: 'Wypizdowie',
        postCode: '00-000',
        postOffice: 'Wypizdowie'
      }
    ]
  });
});

v1.post('/logout', (req, res) => res.sendStatus(200));

v1.use('/returns', returns);
v1.use('/notifications', notifications);
v1.use('/documents', documents);
v1.use('/prices', prices);
v1.use('/collect', collect);

export default v1;
