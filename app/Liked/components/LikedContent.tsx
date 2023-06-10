'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import MediaItem from "@/components/MediaItem";
import LikedButton from "@/components/LikedButton";

interface LikedContentProps{
  songs:Song[];
}

function LikedContent({songs}:LikedContentProps) {
  const router=useRouter();
  const {isLoading,user}=useUser();
  
  useEffect(()=>{
    if(!isLoading && !user){
      router.replace('/')
    }
  },[])

  if(!songs.length){
    return(
      <div className="flex flex-col gap-y-2 w-full px-6">
        No liked songs.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
     {
      songs.map(song=>(
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem song={song} />
          </div>
          <LikedButton key={song.id} songId={song.id}/>
        </div>
      ))
     }
    </div>
  )
}

export default LikedContent;