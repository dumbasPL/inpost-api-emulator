
import {Request, Router} from 'express';
import {DateTime} from 'luxon';
import {PARCELS} from '../../data';

const parcels = Router();

parcels.get('/tracked', (req, res) => {
  res.send({
    updatedUntil: DateTime.now().toJSDate(),
    more: false,
    parcels: Object.values(PARCELS),
  });
});

parcels.get('/tracked/:shipmentNumber', (req: Request<{shipmentNumber: string}>, res) => {
  res.send(PARCELS[req.params.shipmentNumber]);
});

parcels.get('/sent', (req, res) => {
  res.send({
    updatedUntil: DateTime.now().toJSDate(),
    more: false,
    parcels: []
  });
});

export default parcels;
