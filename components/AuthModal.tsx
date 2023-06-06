"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react'
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Modal from './Modal';
import useAuthModal from '@/hooks/useAuthModal';

function AuthModal() {
    const {onClose,isOpen}=useAuthModal();
    const supabaseClient=useSupabaseClient();
    const {session}=useSessionContext()
    const router=useRouter();

    useEffect(()=>{
        if(session){
            router.refresh();
            onClose()
        }
    },[session])
    const handleClose=(open:boolean)=>{
        
        if(!open){
            onClose();
            router.refresh()
        }
    }

  return (
    <Modal
     isOpen={isOpen}
     title='Welcome back'
     description='Login to your account.'
     onChange={handleClose}
    >
        <Auth 
         supabaseClient={supabaseClient}         
         theme='dark'
         providers={['google','github']}
         magicLink
         appearance={{
            theme:ThemeSupa,
            style:{
                container:{marginTop:'0px',marginBottom:'0px'}
            },
            variables:{
                default:{
                    colors:{
                        brand:'#404040',
                        brandAccent:'gray'
                    }
                }
            }
         }}
        />
    </Modal>
  )
}

export default AuthModal;