"use client"
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {IoMdClose} from 'react-icons/io'

interface ModalProps {
    title: string;
    description: string;
    isOpen: boolean;
    onChange: (value: boolean) => void;
    children: React.ReactNode;
}

function Modal({ title, description, isOpen, onChange, children }: ModalProps) {
    return (
        <Dialog.Root
         open={isOpen}
         onOpenChange={onChange}
         defaultOpen={isOpen}
        >
            <Dialog.Portal>
                <Dialog.Overlay
                 className='bg-neutral-900/90 backdrop-blur-sm inset-0 fixed'
                />
                <Dialog.Content 
                 className='fixed drop-shadow-md border-neutral-700 top-[50%] left-[50%]
                  max-h-full h-full md:h-auto md:max-h-full w-full md:w-[90vh] md:max-w-[450px]
                   rounded-md bg-neutral-800 p-[25px] focus:outline-none transition-all
                   -translate-x-1/2 -translate-y-1/2'
                >
                    <Dialog.Title
                     className='text-xl text-center font-bold'
                    >
                        {title}
                    </Dialog.Title>
                    <Dialog.Description
                     className='text-sm text-center leading-normal py-2'
                    >
                        {description}
                    </Dialog.Description>
                    <div className="">
                        {children}
                    </div>
                    <Dialog.Close asChild>
                     <IoMdClose className='text-neutral-400 hover:text-white absolute top-3 right-3'/>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default Modal;