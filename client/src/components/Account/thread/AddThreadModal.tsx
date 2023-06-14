
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { trpc } from '../../../utils/trpc';
import ChatStore from '../../../store';
import { Thread } from '../../../../../server/src/types/Thread';
import FormInput from '../../ReUsable/FormInput';
import { MdAddAPhoto } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';

export const AddThreadModal = () => {
    let [isOpen, setIsOpen] = useState(false);

    const [threadName, setThreadName] = useState('');
    const [threadNameValid, setThreadNameValid] = useState(true);
    // const [threadImage, setThreadImage] = useState('');

    const useAddThread = trpc.thread.addThread.useMutation();
    const addThread = ChatStore(state => state.actions.addThread);
    const user = ChatStore(state => state.currentUser);

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const createNewThread = async () => {
        setThreadNameValid(true);
        if (threadName !== '' && user && user.userId) {
            const roomId = uuidv4();
            await useAddThread.mutateAsync(
                {
                    roomId:roomId,
                    name: threadName,
                    users: [],
                    messages: [],
                    creator: user.userId,
                },
                {
                    onSuccess: (data: Thread ) => {
                        addThread( data );
                        toast.success("You have successfully created a new Komos community!", {
                            position: "top-right",
                            autoClose: 10000,
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
                            position: "top-right",
                            autoClose: 10000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    },
                },
            );
        }
        else {
            setThreadNameValid(false);
            toast.error("Please provide a community name!", {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
	};

    const AddImgButton = () => {
        const handleFileInputChange = (e: any) => {
        };

        return (
            <div className="w-full h-full flex items-center justify-center">
                <input
                    id="file-input"
                    type="file"
                    className="discord-input"
                    onChange={handleFileInputChange}
                />
                <label htmlFor="file-input" className="discord-input-label">
                    <MdAddAPhoto className="discord-input-icon" />
                    <span className="discord-input-text">Upload Photo</span>
                </label>
            </div>
        );
    };


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
                Create Community
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
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden bg-primary p-6 text-left align-middle shadow-xl transition-all rounded-md border-1 border-accent">
                            <Dialog.Title
                                as="h3"
                                className="text-xl font-extrabold leading-6 text-gray-900 text-center mb-4"
                            >
                                Create A New Community
                            </Dialog.Title>
                            <div className="w-full min-h-full p-4 flex flex-col items-center justify-center gap-y-4 h-[250px]">
                                <AddImgButton/>
                                <div className="w-full h-fit">
                                    <h1 className="text-black font-bold">Community Name</h1>
                                    <FormInput value={threadName} onInputChange={setThreadName} valid={threadNameValid} />
                                </div>
                            </div>
                            <div className="pt-4 w-full flex flex-cols-2 items-center justify-center">
                                <div className="w-full h-fit flex items-center justify-center">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-accent hover:bg-red-300/2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <div className="w-full h-fit flex items-center justify-center">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-accent px-4 py-2 text-sm font-bold text-white hover:bg-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={() => createNewThread()}
                                    >
                                        Create
                                    </button>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition>
        <ToastContainer/>
    </>
    )
}
