
import http from 'http';
import { Server } from 'socket.io';

const Websocket = (server: http.Server) => {
    const io = new Server(server, {
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
    });
    
};

export default Websocket;