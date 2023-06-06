"use client"
import { useState } from 'react';
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/db.types';

interface SupabaseProviderProps {
    children: React.ReactNode;
}

const SupabaseProvider = ({ children }: SupabaseProviderProps) => {
    const [supabaseClient] = useState(() =>
        createClientComponentClient<Database>()
    )
    
    return (
        <SessionContextProvider supabaseClient={supabaseClient}>
            {children}
        </SessionContextProvider>
    )
}
export default SupabaseProvider;