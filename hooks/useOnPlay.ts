import { Song } from "@/types";
import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";

// const useOnPlay=(songs:Song[])=>{
//     const {setActiveId,setIds}=usePlayer();
//     const authModal=useAuthModal();
//     const {user}=useUser();

//     if(!user){
//         return authModal.onOpen();
//     }

//     const onPlay=(id:string)=>{
//         setActiveId(id);
//         setIds(songs.map(song=>song.id));
//     }

//     return onPlay;
// }

const useOnPlay = (songs: Song[]) => {
    const { setActiveId, setIds } = usePlayer();
    const authModal = useAuthModal();
    const { user } = useUser();
  
    const onPlay = (id: string) => {
      setActiveId(id);
      setIds(songs.map((song) => song.id));
    };
  
    const handlePlay = user ? onPlay : authModal.onOpen;
  
    return handlePlay;
  };
  
export default useOnPlay;