const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });
const colors = [
  '#6bb9f0',
  '#875F9A',
  '#59ABE3',
  '#407A52',
];

let numOfConnected = 0;

const users = {};

wss.on('connection', (ws) => {
  numOfConnected ++;
  const id = uuidv4();
  users[id] = 'Anonymous';
  ws.send(JSON.stringify({type: 'userid', id: id}))
  ws.send(JSON.stringify({type: 'messageColor', color: colors[numOfConnected]}));

  ws.on('message', (event) => {
    const data = JSON.parse(event);
    switch(data.type) {
      case 'postMessage':
        data.type = 'incomingMessage';
        data.id = uuidv4();
        break;
      case 'postNotification':
        data.type = 'incomingNotification';
        if(users[data.id] !== data.content) {
          data.oldUser = users[data.id];
          users[data.id] = data.content;
          data.key = uuidv4();
        }
        break;
      default:
        throw new Error('Unknown event type: ' + data.type);
    }
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify({...data}));
    });
  })

  wss.clients.forEach(function each(client) {
    const numOfUsers = {
      type: 'num',
      numOfUsers: numOfConnected,
    }
    client.send(JSON.stringify(numOfUsers));
  });

  console.log('Listening on 3001');

  ws.on('close', () => {
    numOfConnected --;
    wss.clients.forEach(function each(client) {
      const numOfUsers = {
        type: 'num',
        numOfUsers: numOfConnected,
      }
      client.send(JSON.stringify(numOfUsers));
    });
    delete users[id];
    console.log('Client disconnected');
  });
});