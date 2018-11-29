// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

const PORT = 3001;

const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
const colors = [
  '#875F9A',
  '#59ABE3',
  '#6bb9f0',
  '#407A52',
];

const CLIENTS = [];
let numOfConnected = 0;

wss.on('connection', (ws) => {
  numOfConnected ++;
  CLIENTS.push(ws);
  ws.on('message', (event) => {
    const data = JSON.parse(event);
    switch(data.type) {
      case 'incomingMessage':
        data.type = 'postMessage';
        break;
      case 'incomingNotification':
        data.type = 'postNotification';
        break;
      default:
        throw new Error('Unknown event type: ' + data.type);
    }
    let i = 0;
    wss.clients.forEach(function each(client) {
      // CLIENTS[index].send(JSON.stringify({type: 'messageColor', color: colors[index]}));
      client.send(JSON.stringify({...data, color: colors[i]}));
      i++;
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
    console.log('Client disconnected');
  });
});