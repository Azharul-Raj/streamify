"use client"

import PlayButton from "@/components/PlayButton";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";

interface SongItemProps {
    song: Song;
    onClick: (id: string) => void;
}

function SongItem({ song, onClick }: SongItemProps) {
    const imagePath = useLoadImage(song);

    return (
        <div
            className="relative group rounded-md flex flex-col justify-center items-center overflow-hidden
            cursor-pointer p-3 transition bg-neutral-400/5 hover:bg-neutral-400/10
    ">
            <div className="w-full h-full aspect-square relative rounded-md overflow-hidden">
                <Image
                    src={imagePath ? imagePath : '/images/liked.png'}
                    fill
                    alt="Image"
                />
            </div>
            <div className="flex flex-col items-start gap-y-1 pt-4">
                <p className="font-semibold truncate w-full">
                    {song.title}
                </p>
                <p className="text-neutral-400 truncate text-sm ">
                    By {song.author}
                </p>
            </div>
            <div className="absolute bottom-24 right-5">
                <PlayButton />
            </div>
        </div>
    )
}

export default SongItem;