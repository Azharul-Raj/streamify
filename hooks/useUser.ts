import { createContext, useEffect, useState } from "react";
import { Subscription,UserDetails } from "@/types";
import { useSessionContext,useUser as useSupabaseUser } from "@supabase/auth-helpers-react";
import { User } from "@supabase/supabase-js";

type UserContextType={
    accessToken:string;
    user:User | null;
    userDetails:UserDetails;
    isLoading:boolean;
    subscription:Subscription| null;
}

export const UserContext=createContext<UserContextType |undefined>(undefined);

export interface Props{
    [propName:string]:any;
}

export const UserContextProvider=(props:Props)=>{
    const { session,isLoading:userLoading,supabaseClient:supabase}=useSessionContext();
    const user=useSupabaseUser();
    const accessToken=session?.access_token ?? null;
    const [isLoadingData,setIsLoadingDta]=useState(false);
    const [userDetails,setUserDetails]=useState<UserDetails | null>(null);
    const [subscription,setSubscription]=useState<Subscription | null>(null);

    const getUserDetails=()=>supabase.from('users').select('*').single();

    const getSubscriptionDetails=()=>
    supabase.from('subscription')
    .select('*,prices(*,products(*))')
    .in('status',['trialing','active'])
    .single();

    useEffect(()=>{
        if(user && !isLoadingData && !userDetails && !subscription){
            setIsLoadingDta(true);
            Promise.allSettled([getUserDetails(),getSubscriptionDetails()])
            .then(results=>{
                const userDetailsPromise=results[0];
                const subscriptionDetailsPromise=results[1];
                if(userDetailsPromise.status==='fulfilled'){
                    setUserDetails(userDetailsPromise.value.data as UserDetails);
                }
                if(subscriptionDetailsPromise.status==='fulfilled'){
                    setSubscription(subscriptionDetailsPromise.value.data as Subscription)
                }
                setIsLoadingDta(false)
            })
        }
        else if(!user && !userLoading && !isLoadingData){
            setUserDetails(null);
            setSubscription(null);
        }
    },[user,userLoading]);
    const value={
        user,
        accessToken,
        userDetails,
        isLoading:isLoadingData || userLoading,
        subscription
    }

    return <UserContext.Provider value={value}/>
}
