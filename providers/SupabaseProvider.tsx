
import { useState } from 'react';
import {SessionContextProvider} from '@supabase/auth-helpers-react'
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'

interface SupabaseProviderProps{
    children:React.ReactNode;
}

const SupabaseProvider=({children}:SupabaseProviderProps)=>{
    const [supabaseClient]=useState(()=>{
        createClientComponentClient()
    })

    return (
        <SessionContextProvider supabaseClient={supabaseClient}>
            {children}
        </SessionContextProvider>
    )
}
export default SupabaseProvider;