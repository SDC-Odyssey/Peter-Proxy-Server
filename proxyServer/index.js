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

// Check In Service Proxy Here (Port 3003)
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

// Room Service Proxy Here (Port 3002)
app.get('/rooms', async (req, res) => {
  try {
    const response = await axios.get('http://127.0.0.1:3002/rooms');
    const responseString = JSON.stringify(response.data);

    res.status(200);
    res.send(responseString);
    res.end();
  } catch {
    res.sendStatus(404);
    res.end();
  }
});

app.get('/rooms/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params;
    const response = await axios.get(`http://127.0.0.1:3002/rooms/${roomId}`);
    const responseString = JSON.stringify(response.data);
    res.status(200);
    res.send(responseString);
    res.end();
  } catch {
    console.log('An error gets hit');
    res.sendStatus(404);
    res.end();
  }
});

app.get('/rooms/:roomId/title', async (req, res) => {
  try {
    const { roomId } = req.params;
    const response = await axios.get(`http://127.0.0.1:3002/rooms/${roomId}/title`);
    const responseString = JSON.stringify(response.data);

    res.status(200);
    res.send(responseString);
    res.end();
  } catch {
    res.sendStatus(404);
    res.end();
  }
});

app.get('/rooms/:roomId/overview', async (req, res) => {
  try {
    const { roomId } = req.params;
    const response = await axios.get(`http://127.0.0.1:3002/rooms/${roomId}/overview`);
    const responseString = JSON.stringify(response.data);

    res.status(200);
    res.send(responseString);
    res.end();
  } catch {
    res.sendStatus(404);
    res.end();
  }
});

app.get('/rooms/:roomId/highlights', async (req, res) => {
  try {
    const { roomId } = req.params;
    const response = await axios.get(`http://127.0.0.1:3002/rooms/${roomId}/highlights`);
    const responseString = JSON.stringify(response.data);

    res.status(200);
    res.send(responseString);
    res.end();
  } catch {
    res.sendStatus(404);
    res.end();
  }
});

app.get('/rooms/:roomId/description', async (req, res) => {
  try {
    const { roomId } = req.params;
    const response = await axios.get(`http://127.0.0.1:3002/rooms/${roomId}/description`);
    const responseString = JSON.stringify(response.data);

    res.status(200);
    res.send(responseString);
    res.end();
  } catch {
    res.sendStatus(404);
    res.end();
  }
});

app.get('/rooms/:roomId/sleeping-arranges', async (req, res) => {
  try {
    const { roomId } = req.params;
    const response = await axios.get(`http://127.0.0.1:3002/rooms/${roomId}/sleeping-arranges`);
    const responseString = JSON.stringify(response.data);

    res.status(200);
    res.send(responseString);
    res.end();
  } catch {
    res.sendStatus(404);
    res.end();
  }
});

// app.post('/rooms', async (req, res) => {
//   try {
//     const response = await axios.post(`http://127.0.0.1:3002`);
//     const responseString = JSON.stringify(response.data);

//     res.status(200);
//     res.send(responseString);
//     res.end();
//   } catch {
//     res.sendStatus(404);
//     res.end();
//   }
// });
