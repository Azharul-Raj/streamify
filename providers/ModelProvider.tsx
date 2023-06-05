"use client"

import React, { useEffect, useState } from 'react'
import Modal from '@/components/Modal';


function ModalProvider() {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) return null;
    return (
        <Modal 
        isOpen 
        title='Title' 
        description='description' 
        onChange={()=>{}}
        children={'hey'}
        />
    )
}

export default ModalProvider;