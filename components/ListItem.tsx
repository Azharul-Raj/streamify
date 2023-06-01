
"use client"
import React from 'react'
import Image from 'next/image';
import {FaPlay} from 'react-icons/fa'
import { useRouter } from 'next/navigation';

interface ListItemProps{
  image:string;
  name:string;
  href:string;  
}

function ListItem({image,name,href}:ListItemProps) {
  const router=useRouter();
  const onClick=()=>{
    router.push(href);
  }
  return (
    <button className='relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4'>
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image 
        src={image}
        className='object-cover'
        alt='Image'
        fill
        />
      </div>
      <p>{name}</p>
      <div className="absolute transition rounded-full flex justify-center items-center opacity-0 bg-green-500 right-5 drop-shadow-md p-4 group-hover:opacity-100 hover:scale-110">
        <FaPlay
         className='text-black'
        />
      </div>
    </button>
  )
}

export default ListItem;