import ChatStore, { Message, TChatStore} from "../store";

const Socket = new WebSocket('ws://localhost:8080');

Socket.addEventListener('open', () => {
    console.log('WebSocket connected');
});

Socket.addEventListener('message', event => {
    const blob = event.data;
    const fileReader = new FileReader();
    const addMessage = ChatStore.getState().actions.addMessage;
    fileReader.onloadend = () => {
        const result = fileReader.result;
        if (result !== null) {
            const jsonString = result.toString();
            const json = JSON.parse(jsonString);
            console.log("Received message: ", json)
            addMessage({
                user: json.user,
                payload: json.payload,
                timeStamp: json.timeStamp
            });
        }
    };
    fileReader.readAsText(blob);
});

Socket.addEventListener('close', () => {
    console.log('WebSocket disconnected');
});

Socket.addEventListener('error', error => {
    console.error('WebSocket error:', error);
});

export const sendMessage = (message: Message) => {
    Socket.send(JSON.stringify(message));
}

export function closeConnection() {
    Socket.close();
}