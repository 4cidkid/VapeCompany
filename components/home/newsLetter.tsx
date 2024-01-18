'use client';
import { useState } from "react";

export default function Newsletter() {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    return (
        <>
            <input value={email} onChange={handleEmailChange} type='email' placeholder='Enter your email address' className='rounded-md py-2 pl-3 w-4/5' />
            <button className='w-1/5 rounded-md bg-white text-primary-500 hover:-translate-y-1 hover:bg-gray-100 transition-all duration-100'>Subscribe</button>
        </>
    )
}