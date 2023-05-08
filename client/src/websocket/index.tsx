const Socket = new WebSocket('ws://localhost:8080');

Socket.addEventListener('open', () => {
    console.log('WebSocket connected');
});

Socket.addEventListener('message', event => {
    console.log('Received message:', event.data);
});

Socket.addEventListener('close', () => {
    console.log('WebSocket disconnected');
});

Socket.addEventListener('error', error => {
    console.error('WebSocket error:', error);
});

export function sendMessage(message: string) {
    Socket.send(JSON.stringify(message));
}

export function closeConnection() {
    Socket.close();
}

export { Socket };