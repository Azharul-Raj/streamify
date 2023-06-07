import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";

interface MediaItemProps{
    song:Song;
    onClick?:(id:string)=>void;
}

function MediaItem({song,onClick}:MediaItemProps) {
    const imageUrl=useLoadImage(song);

    const handleClick=()=>{
        if(onClick){
            return onClick(song.id);
        }
        //TODO:Default turn on player
    }
  return (
    <div 
    onClick={handleClick}
    className="flex p-2 w-full gap-x-2 rounded-md cursor-pointer hover:bg-neutral-800/50">
        <div className="relative rounded-md min-h[48px] min-w-[48px] overflow-hidden ">
            <Image
             fill
             src={imageUrl? imageUrl :'/images/liked.png'}
             alt="Image"
             className="object-cover "
            />
        </div>
            <div className="flex flex-col overflow-hidden gap-y-1">
                <p className="text-white truncate">{song?.title}</p>
                <p className="text-neutral-400 text-sm truncate">{song?.author}</p>
            </div>
    </div>
  )
}

export default MediaItem;