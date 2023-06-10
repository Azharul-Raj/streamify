"use client"

import useGetSongById from "@/hooks/useGetSongById";
import usePlayer from "@/hooks/usePlayer";

function Player() {
    const player=usePlayer();
    const {isLoading,song}=useGetSongById(player?.activeId);
    
  return (
    <div>Player</div>
  )
}

export default Player;