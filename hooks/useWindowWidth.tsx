import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';



export default function useWindowWidth(){
    const [width, setWidth] = useState<number>(0);

    const handleResize = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return width === 0 ? null : width;
}