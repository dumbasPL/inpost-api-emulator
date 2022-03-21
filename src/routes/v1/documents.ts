import {Router} from 'express';

const documents = Router();

documents.get('/policy', (req, res) => {
  res.send({
    version: 69,
    content: 'Srata tata, nikt tego i tak nie czyta XD'
  });
});

export default documents;
