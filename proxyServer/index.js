const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

app.listen('3000', () => {
  console.log('Server is listening at port 3000.');
});

app.use(express.static(path.join(__dirname, '/proxyClient'), {
  index: 'index.html',
}));

// app.get('/', (req, res) => {
//   res.status('200');
//   res.send('hello, world');
//   res.end();
// });

app.get('/pricing/:room_id', async (req, res) => {
  try {
    const roomId = req.params.room_id;
    const pricingResponseObject = await axios.get(`http://127.0.0.1:3003/pricing/${roomId}`);
    const pricingResponseString = JSON.stringify(pricingResponseObject.data);

    res.status(200);
    res.send(pricingResponseString);
    res.end();
  } catch {
    res.sendStatus(404);
    res.end();
  }
});

app.get('/availability/:room_id', async (req, res) => {
  try {
    const roomId = req.params.room_id;
    const availabilityResponseObject = await axios.get(`http://127.0.0.1:3003/availability/${roomId}`);
    const availabilityResponseString = JSON.stringify(availabilityResponseObject.data);

    res.status(200);
    res.send(availabilityResponseString);
    res.end();
  } catch {
    res.sendStatus(404);
    res.end();
  }
});
