const express = require('express');
const SocketServer = require('ws');
const uuidv4 = require('uuid/v4');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () =>
    console.log(`Listening on ${PORT}`)
  );

const wss = new SocketServer.Server({ server });
const clients = {};

const generateColor = () => {
  const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
  let color = [0, 0, 0, 0, 0, 0, 0];

  color = color.map(hexCode => hex[Math.floor(Math.random() * 16)]);
  color[0] = '#';
  return color.join('');
};

const addClient = (ws, username = 'Anonymous') => {
  const clientId = uuidv4();
  ws.clientId = clientId;
  clients[clientId] = { ws, username, color: generateColor() };
};

const updateClient = (username, ws) => {
  clients[ws.clientId].username = username;
  console.log(clients[ws.clientId]);
};

const sendClientColor = ws => {
  const { color } = clients[ws.clientId];

  const message = {
    type: 'incomingUserNotification',
    userId: ws.clientId,
    color
  };

  ws.send(JSON.stringify(message));
};

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === SocketServer.OPEN) {
      try {
        client.send(data);
      } catch (error) {
        console.log('Error: ', error);
      }
    }
  });
};

wss.on('connection', ws => {
  console.log('Client connected');
  addClient(ws);

  ws.on('message', message => {
    const receivedMsg = JSON.parse(message);
    switch (receivedMsg.type) {
      case 'postUsername':
        updateClient(receivedMsg.username, ws);
        sendClientColor(ws);
        break;
      default:
        console.log('Unkown message type');
    }
  });
});

wss.on('close', () => {
  console.log('Client disconnected');
});
