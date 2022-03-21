import {Router} from 'express';

const notifications = Router();

notifications.post('/read', (req, res) => res.sendStatus(200));

// ! idk if this is right
notifications.post('/readAll', (req, res) => res.sendStatus(200));

export default notifications;
