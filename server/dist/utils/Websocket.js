// import WebSocket from 'ws';
// const wss = new WebSocket.Server({ noServer: true });
// const clients = new Set<WebSocket>();
// { /* server handles incoming requests and upgrades them to a socket connection */ }
// server.on('upgrade', (request, socket, head) => {
//   wss.handleUpgrade(request, socket, head, (ws) => {
//     wss.emit('connection', ws, request);
//   });
// });
// wss.on('connection', (socket) => {
//   console.log("Client connected");
//   clients.add(socket);
//   wss.clients.forEach((client) => {
//     const welcomeMsg = {
//       user: null,
//       payload: "Welcome to the chat!",
//       timestamp: null // new Date().toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
//     }
//     client.send(Buffer.from(JSON.stringify(welcomeMsg)));
//   });
//   socket.on('message', (message: string) => {
//     if (message) {
//       clients.forEach((client) => {
//         if (client !== socket) {
//           client.send(message);
//         }
//       });
//     }
//   });
//   socket.on('close', () => {
//     console.log("Client disconnected");
//     clients.delete(socket);
//   });
// });
