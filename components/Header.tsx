"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import Button from './Button';
import useAuthModal from '@/hooks/useAuthModal';

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

function Header({ children, className }: HeaderProps) {
    const router = useRouter();
    const {onOpen}=useAuthModal()

    const handleLogout = () => {

    }
    return (
        <div
            className={twMerge(`bg-gradient-to-b h-fit from-emerald-500 p-6`, className)}
        >
            <div className="w-full flex justify-between items-center mb-4">
                <div className="hidden md:flex gap-x-2 items-center">
                    <button
                        onClick={() => router.back()}
                        className='rounded-full bg-black flex justify-center items-center hover:opacity-75 transition'>
                        <RxCaretLeft className='text-white' size={35} />
                    </button>
                    <button
                        onClick={() => router.forward()}
                        className='rounded-full bg-black flex justify-center items-center hover:opacity-75 transition'>
                        <RxCaretRight className='text-white' size={35} />
                    </button>
                </div>
                <div className="flex md:hidden gap-x-2 items-center ">
                    <button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'>
                        <HiHome className='text-black ' size={20} />
                    </button>
                    <button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'>
                        <BiSearch className='text-black ' size={20} />
                    </button>
                </div>
                <div className="flex justify-center items-center gap-x-4">
                    <div className="">

                    <Button className='bg-transparent text-neutral-300 font-medium '>
                        Sign Up
                    </Button>
                    </div>
                    <div className="">

                    <Button onClick={onOpen} className='bg-white px-6 py-2 '>
                        Log in
                    </Button>
                    </div>
                </div>
                
            </div>
            {children}
        </div>
    )
}

export default Header;