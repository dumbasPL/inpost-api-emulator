import {Router} from 'express';

const returns = Router();

returns.get('/tickets', (req, res) => {
  res.send({tickets: []});
});

returns.get('/parcels', (req, res) => {
  res.send({parcels: []});
});

export default returns;
