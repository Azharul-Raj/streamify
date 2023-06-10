"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-hot-toast";

interface LikedButtonProps {
    songId: string;
}

function LikedButton({ songId }: LikedButtonProps) {
    const router = useRouter();
    const { supabaseClient } = useSessionContext();
    const [isLiked, setIsLiked] = useState(false);

    const { onOpen } = useAuthModal()
    const { user } = useUser();

    useEffect(() => {
        if (!user) {
            return;
        }
        const fetchData = async () => {
            const { data, error } = await supabaseClient
            .from('liked_songs')
            .select('*').eq('user_id', user?.id)
            .eq('song_id', songId).single();
            if (!error && data) {
                setIsLiked(true);
            }
        }
        fetchData();
    }, [songId, user?.id,router])
    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    const handleLike = async () => {
        if (!user) {
            return onOpen();
        }
        if (isLiked) {
            const { error } = await supabaseClient.from('liked_songs')
                .delete().eq('user_id', user?.id).eq('song_id', songId);

            if (error) {
                return toast.error(error?.message)
            } else {
                setIsLiked(false);
            }
        } else {
            const { error } = await supabaseClient.from('liked_songs')
                .insert({
                    song_id: songId,
                    user_id: user?.id
                })
            if (error) {
                return toast.error(error?.message);
            } else {
                setIsLiked(true);
                return toast.success('Liked!!')
            }
        }
        router.refresh();
    }
    return (
        <button
            onClick={handleLike}
            className="transition hover:opacity-70"
        >
            <Icon
                size={25}
                className={`${isLiked ? 'text-green-500' : "white"}`}
            />
        </button>
    )
}

export default LikedButton;