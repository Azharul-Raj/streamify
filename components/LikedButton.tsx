"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";

interface LikedButtonProps{
    songId:string;
}

function LikedButton({songId}:LikedButtonProps) {
    const router=useRouter();
    const {supabaseClient}=useSessionContext();
    const [isLiked,setIsLiked]=useState(false);

    const {onClose}=useAuthModal()
    const {user}=useUser();

    useEffect(()=>{
        if(!user){
            return;
        }
        
    },[])
  return (
    <div>LikedButton</div>
  )
}

export default LikedButton;