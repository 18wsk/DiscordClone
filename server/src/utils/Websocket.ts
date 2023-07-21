
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

        socket.on('updateFriends', (data) => {
            const { userId } = data;
            console.log("***********NOTIFIED***********")
            io.sockets.emit("friendOnline", { userId: userId });
        });

        socket.on("friendLoggedOff", (data) => {
            io.sockets.emit("friendOffline", { userId: data.userId });
            console.log("!!!!!!!!!!!!NOTIFIED!!!!!!!!!!!!");
        })

        socket.on('disconnect', (data) => {
            console.log('User disconnected');
        });
    });
    
};

export default Websocket;