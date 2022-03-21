import {Router} from 'express';
import {DateTime} from 'luxon';

const notifications = Router();

notifications.get('/', (req, res) => {
  res.send({
    notifications: [
      {
        id: '696969696969696969696969',
        type: 'NEWS',
        date: DateTime.now().minus({days: 7}).toJSDate(),
        title: 'Test API',
        content: 'Ta wiadomość nie istnieje',
        imageUrl: 'https://i.kym-cdn.com/entries/icons/original/000/001/030/DButt.jpg',
        read: false
      }
    ]
  });
});

export default notifications;
