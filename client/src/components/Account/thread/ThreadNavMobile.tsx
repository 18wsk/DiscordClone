import { Menu, Transition } from '@headlessui/react'
import React from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import ProfileLink from '../ProfileLink'
import { Thread } from '../../../../../server/src/types/Thread'
import { ThreadListComponent } from './ThreadListItem'
import { AddThreadModal } from './AddThreadModal'
import clsx from 'clsx'

const ThreadNavMobile = ({ 
  currentThread,
  setCurrentThread,
  threads 
} : {
  currentThread: Thread | null,
  setCurrentThread: (thread: Thread | null) => void,
  threads: Thread[]
}) => {
  return (
    <>
      <Menu>
        <div className={
          clsx(
            "bg-primary",
            currentThread && "w-screen h-screen block pt-12",
            !currentThread && "hidden"
          )
        }>
          <Menu.Button>
            <AiOutlineMenu 
              size={12} 
              className='fill-white bg-accent absolute rounded-md h-[24px] w-[24px] top-4 right-4 p-1 xs:block lg:hidden'
            />
          </Menu.Button>
        </div>
        <div className={
          clsx(
            "bg-primary",
            currentThread && "w-screen h-screen block pt-12",
            !currentThread && "hidden"
          )
        }>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Menu.Items>
              <div 
                className='w-screen flex flex-col items-center justify-center overflow-hidden'
                style={{ height: 'calc(100vh - 72px)' }}
              >
                <Menu.Item >
                  <div className="w-3/4 bg-tertiary p-2 rounded-md">
                    <ProfileLink/>
                  </div>
                </Menu.Item>
                  <div className="w-3/4 bg-primary py-2">
                    <h1 className="px-2 py-2 font-bold text-[#949ba4]">Your Communities:</h1>
                  </div>
                  <div className='w-full h-full flex flex-col items-center overflow-y-scroll scrollbar-hide'>
                    {threads.map((thread: Thread) => {
                      return (
                            <Menu.Item >
                              <div className="w-3/4 h-fit py-1 px-2" key={thread.roomId}>
                                <ThreadListComponent currentThread={currentThread} setCurrentThread={setCurrentThread} thread={thread} key={thread.roomId}/>
                              </div>
                            </Menu.Item>
                        )
                    })}
                  </div>
                  <div className="w-full h-[100px] pt-4">
                    <AddThreadModal/>
                  </div>
              </div>
            </Menu.Items>
          </Transition>
        </div>
      </Menu>
    </>
  )
}

export default ThreadNavMobile
