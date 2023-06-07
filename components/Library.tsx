import React from 'react'
import {TbPlaylist} from 'react-icons/tb'
import {AiOutlinePlus} from 'react-icons/ai'
import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser';
import useUploadModal from '@/hooks/useUploadModal';
import { Song } from '@/types';
import MediaItem from './MediaItem';

interface LibraryProps{
    songs:Song[];
}

function Library({songs}:LibraryProps) {

    const authModal=useAuthModal();
    const uploadModal=useUploadModal()
    const {user}=useUser()
    const handleAddSong=()=>{
        if(!user){
            return authModal.onOpen();
        }
        return uploadModal.onOpen()
    }
  return (
    <div className="flex flex-col">
        <div className="flex items-center justify-between px-5 pt-4 text-neutral-400">
            <div className="inline-flex items-center gap-x-2">
                <TbPlaylist
                size={26}
                className=''
                />
                <p className=' font-medium text-md'>
                    Your Library
                </p>
            </div>
            <AiOutlinePlus
            onClick={handleAddSong}
            size={20}
             className='hover:text-white cursor-pointer transition'
            />
        </div>
        <div className="flex flex-col gap-y-2 mt-4 px-3">
            {
                songs.map(song=><MediaItem key={song.id} song={song}/>)
            }
        </div>
    </div>
  )
}

export default Library
