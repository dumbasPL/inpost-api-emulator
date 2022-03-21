import {randomUUID} from 'crypto';
import {Router} from 'express';

const collect = Router();

collect.post('/validate', (req, res) => {
  res.send({
    sessionUuid: randomUUID(),
    sessionExpirationTime: 40000
  });
});

collect.post('/terminate', (req, res) => res.sendStatus(200));

const compartment = Router();

compartment.post('/open', (req, res) => {
  res.send({
    compartment: {
      name: '1R1',
      location: {
        side: 'R',
        column: 1,
        row: 1
      }
    },
    openCompartmentWaitingTime: 37000,
    actionTime: 25000,
    confirmActionTime: 50000
  });
});

compartment.post('/claim', (req, res) => {
  res.send({
    openCompartmentWaitingTime: 37000,
    actionTime: 45000,
    confirmActionTime: 35000
  });
});

compartment.post('/reopen', (req, res) => {
  res.send({
    compartment: {
      name: '1R1',
      location: {
        side: 'R',
        column: 1,
        row: 1
      }
    },
    openCompartmentWaitingTime: 37000,
    actionTime: 45000,
    confirmActionTime: 35000
  });
});

compartment.post('/closed', (req, res) => {
  res.send({
    closed: true
  });
});

compartment.post('/status', (req, res) => {
  res.send({
    compartment: {
      name: '1R1',
      location: {
        side: 'R',
        column: 1,
        row: 1
      }
    },
    status: 'OPENED'
  });
});

collect.use('/compartment', compartment);

export default collect;
