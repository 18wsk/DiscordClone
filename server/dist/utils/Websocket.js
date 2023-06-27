"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const Websocket = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: 'http://localhost:3000'
        }
    });
    io.on('connection', (socket) => {
        socket.on('joinRoom', (room) => {
            socket.join(room);
            console.log(`User joined room: ${room}`);
            io.to(room).emit('receiveMessage', `User joined room: ${room}`);
        });
        socket.on('leaveRoom', (room) => {
            socket.leave(room);
            console.log(`User left room: ${room}`);
        });
        socket.on('sendMessage', (data) => {
            const { room, message } = data;
            socket.broadcast.to(room).emit('receiveMessage', message);
        });
    });
};
exports.default = Websocket;
