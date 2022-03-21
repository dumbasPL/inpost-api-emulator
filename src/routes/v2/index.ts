import {Router} from 'express';
import {EMAIL_ADDRESS} from '../../data';
import notifications from './notifications';
import parcels from './parcels';

const v2 = Router();

// ! idk if this is correct
v2.post('/setPushId', (req, res) => res.sendStatus(200));

v2.get('/agreement', (req, res) => {
  res.send([
    {
      agreementType: 'marketing2',
      status: 'granted',
      email: EMAIL_ADDRESS
    }
  ]);
});

v2.use('/parcels', parcels);
v2.use('/notifications', notifications);

export default v2;
