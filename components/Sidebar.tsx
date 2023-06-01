"use client"
import React, { useMemo } from "react";
import {usePathname} from 'next/navigation';
import {HiHome} from 'react-icons/hi';
import {BiSearch} from 'react-icons/bi'


interface SidebarProps{
    children:React.ReactNode
}
const Sidebar:React.FC<SidebarProps> =({children})=>{
    const pathname=usePathname();
    const routes=useMemo(()=>[
        {
            icon:HiHome,
            label:'Home',
            active:pathname !=='/search',
            href:'/'
        },
        {
            icon:BiSearch,
            label:'Search',
            active:pathname ==='/search',
            href:'/search'
        },
    ],[pathname])

    return (
        <div className="hidden md:flex flex-col gap-y-2 bg-black ">
            {children}
        </div>
    )
}

export default Sidebar;