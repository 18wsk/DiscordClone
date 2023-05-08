const express = require('express');
const app = express();
const port = 8000;
const WebSocketServer = require('ws');

const wss = new WebSocketServer.Server(({ port: 8080 }));

wss.on('connection', (ws) => {
  console.log("Client connected");

  ws.on('message', (message) => {
    console.log("Recieved msg from client: " + message);
  });
});