import {Router} from 'express';

const prices = Router();

prices.get('/parcels', (req, res) => {
  res.send({
    boxMachine: {
      price: {
        sizeA: 12.99,
        sizeB: 13.99,
        sizeC: 15.49
      },
      endOfWeekCollectionPrice: 0.00
    },
    courier: {
      price: {
        sizeA: 14.99,
        sizeB: 16.49,
        sizeC: 19.99
      },
      endOfWeekCollectionPrice: 0.00
    },
    expandAvizo: {
      price: 7.99,
      time: 1440
    }
  });
});

export default prices;
