'use client'
import { Song } from '@/types'; 
import MediaItem from '@/components/MediaItem';
import LikedButton from '@/components/LikedButton';

interface SearchContentProps{
    songs:Song[];
}

function SearchContent({songs}:SearchContentProps) {
    if(!songs.length){
        return (
            <div className="">No songs found</div>
        )
    }
  return (
    <div className="flex flex-col gap-y-2 px-6 w-full">
       {
        songs.map(song=>(
            <div key={song.id} className="flex items-center gap-x-4 w-full">
            <div className="flex-1">
            <MediaItem
             key={song.id}
             song={song}
            />
            </div>
             <LikedButton key={song.id} songId={song.id} />
        </div>
        ))
       }
    </div>
  )
}

export default SearchContent;