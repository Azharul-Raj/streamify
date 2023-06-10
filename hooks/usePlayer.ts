import {create} from 'zustand';

interface PlayerStoreProps{
    ids:string[];
    activeId?:string;
    setIds:(ids:string[])=>void;
    setActiveId:(id:string)=>void;
    reset:()=>void;
}

const usePlayer=create<PlayerStoreProps>((set)=>({
    ids:[],
    activeId:undefined,
    setIds:(ids:string[])=>set({ids:ids}),
    setActiveId:(id:string)=>set({activeId:id}),
    reset:()=>({ids:[],activeId:undefined})
}))

export default usePlayer;