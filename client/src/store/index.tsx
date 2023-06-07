import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { User } from "../../../server/src/types/User";

export interface Message {
    user: User | null;
    payload: string;
    timeStamp: string | null;
}

export interface Thread {
    roomId: string;
    users: User[];
    messages: Message[];
    creator: User;
}

export interface TChatStore {
    currentUser: User | null;
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
        setCurrentUser: (user: any) => void;
    }
};

const initialState: Omit<TChatStore, "actions"> = { 
    currentUser: null,
    threads: [],
    users: [],
    messages: [],
}

const ChatStore = create(immer<TChatStore>((set, get) => ({
    ...initialState,
    actions: {
        addThread: (thread) => set((state: TChatStore) => ({ threads: [...state.threads, thread] })),
        addUser: (user) => set((state: TChatStore) => ({ users: [...state.users, user] })),
        addMessage: (message) => set((state: TChatStore) => ({messages: [...state.messages, message],})),
        removeThread: (thread) => set((state: TChatStore) => ({ threads: state.threads.filter((t) => t.roomId !== thread.roomId) })),
        removeUser: (user) => set((state: TChatStore) => ({ users: state.users.filter((u) => u.userId !== user.userId) })),
        removeMessage: (message) => set((state: TChatStore) => ({ messages: state.messages.filter((m) => m.timeStamp !== message.timeStamp) })),
        updateThread: (thread) => set((state: TChatStore) => ({ threads: state.threads.map((t) => t.roomId === thread.roomId ? thread : t) })),
        updateUser: (user) => set((state: TChatStore) => ({ users: state.users.map((u) => u.userId === user.userId ? user : u) })),
        updateMessage: (message) => set((state: TChatStore) => ({ messages: state.messages.map((m) => m.timeStamp === message.timeStamp ? message : m) })),
        setCurrentUser: (user) => set(() => ({ currentUser: user })),
    }}),
    
));

export default ChatStore;