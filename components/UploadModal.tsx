"use client"
import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal"
import { useForm,FieldValues,SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";

const UploadModal=()=>{
    const {isOpen,onClose} =useUploadModal();
    const [isLoading,setIsLoading]=useState(false);
    
    const {register,reset,handleSubmit,formState:{errors}}=useForm<FieldValues>({
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
    const onSubmit:SubmitHandler<FieldValues> =(data)=>{

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