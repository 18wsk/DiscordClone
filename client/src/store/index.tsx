import { create } from "zustand";
import { immer } from "zustand/middleware/immer";


export interface Message {
    user: User | null;
    payload: string;
    timeStamp: string;
}

export interface User {
    id: string;
    userName: string;
    avatar: string;
}

export interface Thread {
    roomId: string;
    users: User[];
    messages: Message[];
}

export interface TChatStore {
    currentUser: User;
    threads: Thread[];
    users: User[];
    messages: Message[];
    actions: {
        addThread: (thread: Thread) => void;
        addUser: (user: User) => void;
        addMessage: (message: Message) => void;
        removeThread: (thread: Thread) => void;
        removeUser: (user: User) => void;
        removeMessage: (message: Message) => void;
        updateThread: (thread: Thread) => void;
        updateUser: (user: User) => void;
        updateMessage: (message: Message) => void;
    }
};

const initialState: Omit<TChatStore, "actions"> = { 
    currentUser: { id: "#4973", userName: "NotChillis", avatar: "" },
    threads: [],
    users: [],
    messages: [],
}

const ChatStore = create(immer<TChatStore>((set) => ({
    ...initialState,
    actions: {
        addThread: (thread) => set((state: TChatStore) => ({ threads: [...state.threads, thread] })),
        addUser: (user) => set((state: TChatStore) => ({ users: [...state.users, user] })),
        addMessage: (message) => set((state: TChatStore) => ({messages: [...state.messages, message],})),
        removeThread: (thread) => set((state: TChatStore) => ({ threads: state.threads.filter((t) => t.roomId !== thread.roomId) })),
        removeUser: (user) => set((state: TChatStore) => ({ users: state.users.filter((u) => u.id !== user.id) })),
        removeMessage: (message) => set((state: TChatStore) => ({ messages: state.messages.filter((m) => m.timeStamp !== message.timeStamp) })),
        updateThread: (thread) => set((state: TChatStore) => ({ threads: state.threads.map((t) => t.roomId === thread.roomId ? thread : t) })),
        updateUser: (user) => set((state: TChatStore) => ({ users: state.users.map((u) => u.id === user.id ? user : u) })),
        updateMessage: (message) => set((state: TChatStore) => ({ messages: state.messages.map((m) => m.timeStamp === message.timeStamp ? message : m) })),
    }
})));

export default ChatStore;