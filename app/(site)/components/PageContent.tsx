"use client"

import { Song } from "@/types";
import SongItem from "../../../components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";

interface PageContentProps {
    songs: Song[];
}

function PageContent({ songs }: PageContentProps) {
    const onPlay = useOnPlay(songs);
    if (!songs.length) {
        return (
            <div className="">
                No songs available!
            </div>
        )
    }
    return (
        <div
            className=" grid  grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4
    ">
            {
                songs.map(song => <SongItem key={song.id} onClick={(id: string) => onPlay(id)} song={song} />)
            }
        </div>
    )
}

export default PageContent;