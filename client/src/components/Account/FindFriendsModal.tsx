import { Dialog, Transition } from '@headlessui/react'
import { Fragment, JSXElementConstructor, ReactElement, ReactFragment, ReactNode, ReactPortal, useState } from 'react'
import { ToastContainer, ToastContentProps, toast } from 'react-toastify';
import { AiOutlineUserAdd } from 'react-icons/ai';
import ChatStore from '../../store';
import { Combobox } from '@headlessui/react'
import { Friend } from '../../../../server/src/types/Friend';
import { trpc } from '../../utils/trpc';

export const FindFriendsModal = () => {
    let [isOpen, setIsOpen] = useState(false);
    const currentUser = ChatStore(state => state.currentUser);
    const addFriend = ChatStore(state => state.actions.addFriend);
    const [selectedFriend, setSelectedFriend] = useState<Friend>({
        id: "",
        userName: "",
        pfp: "",
    });
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState<Friend[]>([]);

    function closeModal() {
        setIsOpen(false);
    }

    async function openModal() {
        setIsOpen(true);
        await getUsersQuery.refetch();
    }

    const getUsersQuery = trpc.thread.getUsersToMakeFriends.useQuery({}, {
        enabled: false, 
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: false,
        retry: false,
        onSuccess: (data: any) => {
            setUsers(data);
        },
        onError: (error: any) => {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    });
    const filteredFriends = 
        (query === '')  
        ? users.filter((user) => { 
            return !currentUser?.friends.map((friend: Friend) => friend.id).includes(user?.id ?? "") 
                && currentUser?.userName !== user.userName })
        : users.filter((user) => { 
            return !currentUser?.friends.map((friend: Friend) => friend.id).includes(user?.id ?? "") 
            && currentUser?.userName !== user.userName 
            && user?.userName?.toLowerCase().includes(query.toLowerCase())})

    const addFriendToCurrentUser = trpc.thread.addFriend.useMutation();
    const handleAddFriend = async ({
        selectedFriend
    }:{
        selectedFriend: Friend
    }) => {
        if (currentUser?.userId && selectedFriend) {
            await addFriendToCurrentUser.mutateAsync(
                {
                    currentId: currentUser.userId,
                    friend: {
                        id: selectedFriend.id,
                        userName: selectedFriend.userName,
                        pfp: selectedFriend.pfp,
                    },
                },
                {
                    onSuccess: () => {
                        toast.success(`You have successfully added ${selectedFriend.userName}`, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        addFriend(selectedFriend);
                    }, 
                    onError: (error: { message: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | ((props: ToastContentProps<unknown>) => ReactNode) | null | undefined; }) => {
                        toast.error(error.message, {
                            position: "top-right",
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
                type="button"
                onClick={openModal}
                className="rounded-md bg-accent bg-opacity-100 px-4 py-2 text-sm 
                        font-medium text-white hover:bg-accent-hover 
                        focus:outline-none focus-visible:ring-2 
                        focus-visible:ring-white focus-visible:ring-opacity-75"
            >
                <AiOutlineUserAdd className="fill-white h-[24px] w-[24px]" title="Add Friends"/>
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
                                Add Friends
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
                                        onClick={() => handleAddFriend({selectedFriend})}
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

