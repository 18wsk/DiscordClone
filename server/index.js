const express = require('express');
const http = require('http');
const bodyParser = require("body-parser");
const cors = require("cors");

const WebSocketServer = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer.Server({ noServer: true });

const clients = new Set();

{ /* server handles incoming requests and upgrades them to a socket connection */ }
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

wss.on('connection', (socket) => {
  console.log("Client connected");
  clients.add(socket);

  wss.clients.forEach((client) => {

    const welcomeMsg = {
      user: null,
      payload: "Welcome to the chat!",
      timestamp: null // new Date().toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
    }
    client.send(Buffer.from(JSON.stringify(welcomeMsg)));
  
  });

  socket.on('message', (message) => {
    clients.forEach((client) => {
      if (client !== socket) {
        client.send(message);
      }
      // client.send(message);
    });
  });

  socket.on('close', () => {
    console.log("Client disconnected");
    clients.delete(socket);
  });

});

app.use(cors());
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({ limit: '100mb', extended: true}));

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});