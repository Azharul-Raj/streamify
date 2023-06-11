"use client"

import useGetSongById from "@/hooks/useGetSongById";
import usePlayer from "@/hooks/usePlayer";
import useSongUrl from "@/hooks/useSongUrl";
import PlayerContent from "./PlayerContent";

function Player() {
    const player=usePlayer();
    const {isLoading,song}=useGetSongById(player?.activeId);
    const songUrl=useSongUrl(song!);

    if(!player || !song || !songUrl){
        return null;
    }

  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
        <PlayerContent
         key={songUrl}
         song={song}
         songUrl={songUrl}
        />
    </div>
  )
}

export default Player;