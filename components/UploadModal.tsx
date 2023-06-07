"use client"
import unique from 'uniqid';
import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal"
import { useForm,FieldValues,SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

const UploadModal=()=>{
    const {user}=useUser();
    const router=useRouter();
    const {isOpen,onClose} =useUploadModal();
    const supabaseClient=useSupabaseClient();
    const [isLoading,setIsLoading]=useState(false);
    
    const {register,reset,handleSubmit}=useForm<FieldValues>({
        defaultValues:{
            author:'',
            title:'',
            song:null,
            image:null
        }
    })
    const onChange=(open:boolean)=>{
        if(!open){
            reset()
            onClose()
        }
    }

    //submitHandler
    const onSubmit:SubmitHandler<FieldValues> =async(data)=>{
        try {
            setIsLoading(true);
            const imageFile=data?.image?.[0];
            const songFile=data?.song?.[0];
            if(!user || !imageFile || !songFile){
                toast.error('Some fields are missing');
                return;
            }
            const uniqueId=unique();
            //Upload songs
            const {
                data:songData,
                error:uploadSongError
            
            }=await supabaseClient.storage.from('songs').upload(`song-${data.title}-${uniqueId}`,songFile,{
                cacheControl:'3600',
                upsert:false
            
            })

            if(uploadSongError){
                setIsLoading(false);
                return toast.error('Something went wrong in song upload.')
            }

            //Upload image 
            const {
                data:imageData,
                error:imageUploadError
            }=await supabaseClient.storage.from('images').upload(`image-${data.title}-${uniqueId}`,imageFile,{
                cacheControl:'3600',
                upsert:false
            })

            if(imageUploadError){
                return toast.error('Something went wrong in image upload.')
            }

            const {
                error:supabaseError
            }=await supabaseClient.from('songs').insert({
                user_id:user.id,
                title:data.title,
                author:data.author,
                image_path:imageData.path,
                song_path:songData.path
            })
            
            if(supabaseError){
                setIsLoading(false);
                return toast.error(supabaseError?.message);
            }            
            router.refresh();
            onClose();
            reset()
            toast.success('Song uploaded successfully.')
        } catch (error) {
            toast.error('Something went wrong.')
        }finally{
            setIsLoading(false)
        }
    }


    return(
        <Modal
         isOpen={isOpen}
         title="Upload your song"
         description="Upload a mp3 song"
         onChange={onChange}          
        >
            <form
             action=""
             onSubmit={handleSubmit(onSubmit)}
             >
                <Input
                 id='title'
                 disabled={isLoading}
                 {...register('title',{required:true})}
                 placeholder='Add Song'
                />
                <Input
                 id='author'
                 disabled={isLoading}
                 {...register('author',{required:true})}
                 placeholder='Add Auhor'
                />
                <div className="">
                    <p className="">Select Song</p>
                <Input
                 id='song'
                 type="file"
                 accept=".mp3"
                 disabled={isLoading}
                 {...register('song',{required:true})}
                 placeholder='Add Auhor'
                />
                </div>
                <div className="">
                    <p className="">Select Image</p>
                <Input
                 id='image'
                 type="file"
                 accept="image/*"
                 disabled={isLoading}
                 {...register('image',{required:true})}
                 placeholder='Add Thumbnail'
                />
                </div>
                <Button
                className="mt-2"
                 disabled={isLoading}
                 type="submit"
                 children={'Create A Song'}
                />
            </form>
        </Modal>
    )
}
export default UploadModal;