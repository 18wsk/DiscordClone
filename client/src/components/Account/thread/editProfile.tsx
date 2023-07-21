
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { MdAddAPhoto } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import { BiEditAlt } from "react-icons/bi"
import ChatStore from '../../../store';
import { trpc } from '../../../utils/trpc';
import { Socket } from 'socket.io-client';

export const EditProfile = ({
    socket
    }:{
        socket: Socket | null;
    }) => {
    let [isOpen, setIsOpen] = useState(false);

    const currentUser = ChatStore(state => state.currentUser);
    const [currentPfp, setCurrentPfp] = useState(currentUser?.pfp ?? "");
    const setCurrentUser = ChatStore(state => state.actions.setCurrentUser);

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleFileInputChange = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        if (file && file.type.startsWith("image/")) {
            reader.readAsDataURL(file);
            reader.onload = async () => {
                if (reader.result) {
                    setCurrentPfp(reader.result as string);
                }
            };
        } else {
            toast.error("Please select an image file.", {
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
    };

    const updateProfile = trpc.auth.updateProfile.useMutation();

    const sumbitNewProfilePicture = async () => {
        if(currentUser?.userId && currentPfp !== "") {
            await updateProfile.mutateAsync(
				{
                    userId: currentUser?.userId ?? "",
                    pfp: currentPfp,
                }, {
                    onSuccess: (data) => {
                        if (data.pfp) {
							setCurrentUser({...currentUser, pfp: data.pfp});
							socket?.emit("getFriends", { userId: currentUser?.userId, pfp: data.pfp });
                            closeModal();
						}
                    },
                }
			)
        }
    };


    return (
        <>
        <div className="flex items-center justify-center">
            <button
                type="button"
                onClick={openModal}
                className="bg-accent h-5 w-5 rounded-md text-white flex flex-col items-center justify-center "
            >
                <BiEditAlt className="h-4 w-4"/>
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
                                className="text-xl font-extrabold leading-6 text-white text-center mb-4"
                            >
                                Edit Profile Picture
                            </Dialog.Title>
                            <div className="w-full min-h-full p-4 flex flex-col items-center justify-center gap-y-4 h-[250px]">
                                <div className="w-full h-full flex items-center justify-center">
                                {
                                    currentPfp === '' ? (
                                        <>
                                            <input
                                                id="file-input"
                                                type="file"
                                                accept="image/*"
                                                className="pfp-input"
                                                onChange={(e) => handleFileInputChange(e)}
                                            />
                                            <label htmlFor="file-input" className="pfp-input-label">
                                                <MdAddAPhoto className="pfp-input-icon" fill={"#ffffff"} />
                                            </label>
                                        </>
                                        ) : (
                                            <img
                                                src={currentPfp}
                                                alt="GG"
                                                className='w-[128px] h-[128px] rounded-full object-cover'
                                                onClick={() => {setCurrentPfp('')}}
                                            />
                                    )
                                }
                                </div>
                            </div>
                            <div className="pt-4 w-full flex flex-cols-2 items-center justify-center">
                                <div className="w-full h-fit flex items-center justify-center">
                                    {
                                        currentPfp !== '' && (
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-accent px-4 py-2 text-sm font-bold text-white hover:bg-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={() => sumbitNewProfilePicture()}
                                            >
                                                Confirm
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
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

