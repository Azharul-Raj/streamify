import {create} from 'zustand';

interface SubscriptionModalProps{
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}

const useSubscriptionModal=create<SubscriptionModalProps>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}))

export default useSubscriptionModal;