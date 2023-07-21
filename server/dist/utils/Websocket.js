"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const Websocket = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: '*'
        }
    });
    io.on('connection', (socket) => {
        socket.on('joinRoom', (room) => {
            socket.join(room);
            console.log(`User joined room: ${room}`);
        });
        socket.on('leaveRoom', (room) => {
            socket.leave(room);
            console.log(`User left room: ${room}`);
        });
        socket.on('sendMessage', (data) => {
            const { room, message } = data;
            socket.to(room).emit('receiveMessage', message);
        });
        socket.on('setTyper', (data) => {
            const { room, typer } = data;
            socket.to(room).emit('typing', typer);
        });
        socket.on('updateFriends', (data) => {
            const { userId } = data;
            console.log(data.userId);
            io.sockets.emit("friendOnline", { userId: userId });
        });
        socket.on("friendLoggedOff", (data) => {
            io.sockets.emit("friendOffline", { userId: data.userId });
        });
        socket.on('disconnect', (data) => {
            console.log('User disconnected');
        });
    });
};
exports.default = Websocket;
