// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
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

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
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
    wss.clients.forEach(function each(client) {
      for(let i in colors){
        client.send(JSON.stringify({type: 'messageColor', color: colors[i]}));
      }
      client.send(JSON.stringify(data));
    });
  })

  setInterval(() => {
    wss.clients.forEach(function each(client) {
      const numOfUsers = {
        type: 'num',
        numOfUsers: wss.clients.size,
      }
      client.send(JSON.stringify(numOfUsers));
    })
  }, 2000)

  console.log('Listening on 3001');

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});