import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { BsPersonAdd } from 'react-icons/bs';
import ChatStore from '../../../store';
import { Combobox } from '@headlessui/react'
import { Friend } from '../../../../../server/src/types/Friend';
import { trpc } from '../../../utils/trpc';

export const AddFriendToThreadModal = (
    { 
        buttonWidth, 
        buttonHeight
    }:{
        buttonWidth: string, 
        buttonHeight: string
    }) => {
    let [isOpen, setIsOpen] = useState(false);
    const currentThread = ChatStore(state => state.currentThread);
    const currentUser = ChatStore(state => state.currentUser);
    const [selectedFriend, setSelectedFriend] = useState<Friend>({
        id: "",
        userName: ""
    });
    const [query, setQuery] = useState('');


    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const filteredFriends = 
        (query === '') 
            ? currentUser?.friends 
            : currentUser?.friends.filter((friend) => {
            return !currentThread?.users.includes(friend.id) && friend?.userName?.toLowerCase().includes(query.toLowerCase())
        });

    const addFriendToCommunity = trpc.thread.addFriendToThread.useMutation();

    const handleAddFriendToThread = async () => {
        if (currentThread?.roomId && selectedFriend?.id) {
            await addFriendToCommunity.mutateAsync(
                {
                    threadId: currentThread.roomId ,
                    friendId: selectedFriend.id,
                },
                {
                    onSuccess: () => {
                        toast.success(`You have successfully added ${selectedFriend.userName} to ${currentThread.name}`, {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        closeModal();
                    }, 
                    onError: (error) => {
                        toast.error(error.message, {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    },
                }
            );
        }
    }

    return (
        <>
        <div className="flex items-center justify-center">
            <button 
                className="rounded-full bg-accent hover:bg-white flex items-center justify-center" 
                onClick={() => openModal()}
            >
                <BsPersonAdd fill={"#ffff"} className={`w-[${buttonWidth}px] h-[${buttonHeight}px] p-[4px] hover:fill-accent`} />
            </button>
        </div>
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-black bg-opacity-60" />
                </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel 
                            className="w-full max-w-md transform overflow-hidden bg-[#232428] p-6 text-left align-middle shadow-lg transition-all
                                        rounded-md border-2 border-accent shadow-accent"
                            >
                            <Dialog.Title
                                as="h3"
                                className="text-xl leading-6 text-white text-center mb-4"
                            >
                                Add Friend To <span className="font-extrabold text-accent rounded-md">{currentThread?.name}</span>
                            </Dialog.Title>
                            <Combobox value={selectedFriend} onChange={setSelectedFriend}>
                                <div className="w-full h-fit flex">
                                    <Combobox.Input 
                                        className="text-white w-full h-[34px] xs:px-1 xs:py-1 sm:px-2 sm:py-2 bg-secondary rounded-l-md outline-none 
                                                    focus:outline-none" 
                                        onChange={(event) => setQuery(event.target.value)}
                                        value={query}
                                    />
                                    <button 
                                        className='w-[40px] h-[34px] rounded-r-md outline-none focus:outline-none
                                                    text-sm text-white bg-accent text-center border border-accent shadow-2xl shadow-accent'
                                        onClick={() => handleAddFriendToThread()}
                                    >
                                        Add
                                    </button>
                                </div>
                                <Combobox.Options 
                                    className="text-white w-full h-full xs:px-1 xs:py-1 sm:px-2 sm:py-2 bg-secondary rounded-md outline-none 
                                                focus:outline-none mt-2 hover:bg-primary cursor-pointer"
                                >
                                    {filteredFriends?.map((friend) => (
                                        <Combobox.Option
                                            className="text-white w-full h-full xs:px-1 xs:py-1 sm:px-2 sm:py-2 bg-secondary rounded-md outline-none 
                                                        focus:outline-none hover:bg-primary"
                                            key={friend.id} 
                                            value={friend}
                                            onClick={() => {
                                                setSelectedFriend(friend);
                                                setQuery(friend?.userName ?? "");
                                            }}
                                        >
                                            {friend.userName}
                                        </Combobox.Option>
                                        
                                        
                                    ))}
                                </Combobox.Options>
                            </Combobox>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition>
        <ToastContainer limit={1}/>
    </>
    )
}

