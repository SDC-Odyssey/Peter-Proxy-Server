require('newrelic');
const proxy = require('express-http-proxy');
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
// const localhost = 'http://127.0.0.1';
const proxyAWS = ' http://ec2-3-137-167-31.us-east-2.compute.amazonaws.com';
// const supraAWS = 'http://ec2-13-56-20-100.us-west-1.compute.amazonaws.com';
// const peterAWS = 'http://52.42.95.134';
// const amandaAWS = 'http://ec2-54-215-129-94.us-west-1.compute.amazonaws.com';

app.use(cors());

app.listen('3000', () => {
  console.log('Server is listening at port 3000.');
});

app.use(express.static(path.join(__dirname, '/proxyClient'), {
  index: 'index.html',
}));

// Picture Service Proxy Here (Port 3001)
// app.use('/images', proxy(`${amandaAWS}:3001`, {
//   proxyReqPathResolver: function proxyReq(req) {
//     const parts = req.url.split('/');
//     const roomId = parts[1];

//     if (roomId === undefined || roomId === 0) {
//       return `${amandaAWS}:3001/images`;
//     }

//     return `${amandaAWS}:3001/images/${roomId}`;
//   },
// }));

// Check In Service Proxy Here (Port 3003)
// app.use('/pricing/:room_id', proxy(`${localhost}:3003/pricing/room_id`));

// app.use('/pricing', proxy(`${peterAWS}:3003`, {
//   proxyReqPathResolver: function proxyReq(req) {
//     const parts = req.url.split('/');
//     return `${peterAWS}:3003/pricing/${parts[1]}`;
//   },
// }));

app.use('/availability', proxy(`${proxyAWS}`, {
  proxyReqPathResolver: function proxyReq(req) {
    const parts = req.url.split('/');
    console.log('parts ', parts)
    return `${proxyAWS}/availability/${parts[1]}`;
  },
}));

// Room Service Proxy Here (Port 3002)
// app.use('/rooms', proxy(`${supraAWS}:3002`, {
//   proxyReqPathResolver: function proxyReq(req) {
//     const parts = req.url.split('/');
//     const roomId = parts[1];
//     const finalPath = parts[2];

//     if (roomId === '') {
//       return `${supraAWS}:3002/rooms`;
//     }

//     if (finalPath === undefined) {
//       return `${supraAWS}:3002/rooms/${roomId}`;
//     }

//     return `${supraAWS}:3002/rooms/${roomId}/${finalPath}`;
//   },
// }));

// Host Information Service Proxy Here (Port 3006)
// app.use('/hostInfo', proxy(`${supraAWS}:3006`, {
//   proxyReqPathResolver: function proxyReq(req) {
//     const parts = req.url.split('/');
//     const hostId = parts[1];

//     if (hostId === '') {
//       return `${supraAWS}:3006/hostInfo`;
//     }

//     return `${supraAWS}:3006/hostInfo/${hostId}`;
//   },
// }));
