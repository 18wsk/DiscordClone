import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { User } from "../../../server/src/types/User";
import { Thread } from "../../../server/src/types/Thread";
import { Message } from "../../../server/src/types/Message";
import { Friend } from "../../../server/src/types/Friend";

export interface TChatStore {
    currentUser: User | null;
    currentThread: Thread | null;
    threads: Thread[];
    users: User[];
    messages: Message[];
    actions: {
        addThread: (thread: Thread) => void;
        updateThread: (thread: Thread) => void;
        removeThread: (thread: Thread) => void;
        setThreads: (threads: Thread[]) => void;
        setCurrentThread : (thread: Thread | null) => void;

        addMessage: (message: Message) => void;
        removeMessage: (message: Message) => void;
        updateMessage: (message: Message) => void;
        setMessages: (messages: Message[]) => void;

        setCurrentUser: (user: User | null) => void;
        addUser: (user: User) => void;
        removeUser: (user: User) => void;
        updateUser: (user: User | null) => void;
        addFriend: (friend: Friend) => void;
    }
};

const initialState: Omit<TChatStore, "actions"> = { 
    currentUser: null,
    currentThread: null,
    threads: [],
    users: [],
    messages: []
}

const ChatStore = create(immer<TChatStore>((set) => ({
    ...initialState,
    actions: {
        // Thread actions
        addThread: (thread) => set((state: TChatStore) => ({ threads: [...state.threads, thread] })),
        updateThread: (thread) => set((state: TChatStore) => ({ threads: state.threads.map((t) => t.roomId === thread.roomId ? thread : t) })),
        removeThread: (thread) => set((state: TChatStore) => ({ threads: state.threads.filter((t) => t.roomId !== thread.roomId) })),
        setThreads: (threads) => set(() => ({ threads: threads })),
        setCurrentThread: (thread) => set(() => ({ currentThread: thread})),
        // Message actions
        addMessage: (message) => set((state: TChatStore) => ({messages: [...state.messages, message],})),
        removeMessage: (message) => set((state: TChatStore) => ({ messages: state.messages.filter((m) => m.timeStamp !== message.timeStamp) })),
        updateMessage: (message) => set((state: TChatStore) => ({ messages: state.messages.map((m) => m.timeStamp === message.timeStamp ? message : m) })),
        setMessages: (messages) => set(() => ({ messages: messages })),
        // User actions
        setCurrentUser: (user) => set(() => ({ currentUser: user })),
        addUser: (user) => set((state: TChatStore) => ({ users: [...state.users, user] })),
        removeUser: (user) => set((state: TChatStore) => ({ users: state.users.filter((u) => u.userId !== user.userId) })),
        updateUser: (user) => set((state: TChatStore) => ({ users: state.users.map((u) => u.userId === user?.userId ? user : u) })),
        addFriend: (friend) => set((state: TChatStore) => ({ 
            currentUser: {...state.currentUser, friends: state.currentUser 
                ? [...state.currentUser?.friends, friend] 
                : []}
        })),
    }}),
    
));

export default ChatStore;