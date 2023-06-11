import { Song } from "@/types";
import MediaItem from "./MediaItem";
import LikedButton from "./LikedButton";

import {BsPauseFill,BsPlayFill} from 'react-icons/bs';
import { AiFillBackward, AiFillForward } from "react-icons/ai";
import {HiSpeakerWave, HiSpeakerXMark} from 'react-icons/hi2'

interface PlayerContentProps{
    song:Song;
    songUrl:string;
}

function PlayerContent({song,songUrl}:PlayerContentProps) {
    const Icon=true? BsPauseFill : BsPlayFill;
    const VolumeIcon=true ? HiSpeakerXMark : HiSpeakerWave;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
        <div className="flex justify-start w-full">
            <div className="flex items-center gap-x-4">
                <MediaItem  song={song}/>
                <LikedButton key={song.id} songId={song.id}/>
            </div>
        </div>
        <div className="flex items-center justify-end md:hidden col-auto w-full">
            <div className="h-10 w-10 flex justify-center items-center rounded-full bg-white p-1 cursor-pointer">
                <Icon size={30} className="text-black"/>
            </div>
        </div>
        <div className="hidden h-full md:flex justify-center items-center max-w-[722px] gap-x-2">
            <AiFillBackward 
             onClick={()=>{}}
             size={30}
             className="text-neutral-400 cursor-pointer hover:text-white transition"
            />
        <div className="h-10 w-10 flex justify-center items-center rounded-full bg-white p-1 cursor-pointer">
                <Icon size={30} className="text-black"/>
            </div>
            <AiFillForward 
             onClick={()=>{}}
             size={30}
             className="text-neutral-400 cursor-pointer hover:text-white transition"
            />
        </div>
        <div className="hidden md:flex w-full justify-end pr-2">
            <div className="flex items-center gap-x-2">
                <VolumeIcon
                 size={30}
                 onClick={()=>{}}
                 className="text-neutral-400 cursor-pointer hover:text-white transition"
                />
            </div>
        </div>
    </div>
  )
}

export default PlayerContent;