import React from 'react';
import { useEffect } from 'react';



export default function useBlockScroll(block: boolean) {
    useEffect(() => {
        if (block) {
            document.body.style.overflowY = "hidden"
            document.body.style.position = "fixed"
        } else {
            document.body.style.overflowY = "auto"
            document.body.style.position = "relative"
        }
    }, [block])
}