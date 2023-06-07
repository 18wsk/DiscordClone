
{
    /** noSERVER: true ????
    *** By default, when you create a WebSocket.Server instance, it automatically 
    *** creates an HTTP server instance as well. This HTTP server is used to handle 
    *** the initial WebSocket handshake and upgrade the HTTP connection to a WebSocket 
    *** connection. However, in some cases, you may already have an existing HTTP server 
    *** (such as an Express server) and want to attach the WebSocket server to it manually.
    *** 
    *** When you set noServer: true, it tells the WebSocket.Server instance not to 
    *** create its own HTTP server. Instead, you have to handle the HTTP upgrade 
    *** manually and pass the resulting WebSocket connection to the WebSocket.Server 
    *** instance using the handleUpgrade method.
    */
}
import WebSocket from 'ws';
import http from 'http';

export const runWSS = ( server: http.Server ) => {

    const wss = new WebSocket.Server({ noServer: true });
    const clients = new Set<WebSocket>();

    server.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
    });

    wss.on('connection', (socket) => {
        console.log(`➕➕➕➕➕ Connection (${wss.clients.size}) ➕➕➕➕➕`);
        clients.add(socket);

        wss.clients.forEach((client) => {
            const welcomeMsg = {
                user: null,
                payload: "Welcome to the chat!",
                timestamp: null // new Date().toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
            }
            client.send(Buffer.from(JSON.stringify(welcomeMsg)));
        });

        socket.on('message', (message: string) => {
        if (message) {
            clients.forEach((client) => {
                if (client !== socket) {
                    client.send(message);
                }
            });
        }
        });

        socket.on('close', () => {
            console.log("Client disconnected");
            clients.delete(socket);
        });
    });
};