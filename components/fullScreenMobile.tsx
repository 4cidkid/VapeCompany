'use client';

import { useEffect } from "react";

export default function SetFullScreenMobile() {

    useEffect(() => {
        const resizeFunction = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        window.addEventListener('resize', resizeFunction);
        return () => window.removeEventListener('resize', resizeFunction)
    }, [])
    return (
        <>
        </>
    )
}