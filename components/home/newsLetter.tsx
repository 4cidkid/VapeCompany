'use client';
import { useState } from "react";

export default function Newsletter() {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    return (
        <>
            <div className="flex items-stretch flex-wrap child:flex-grow gap-2 w-full">
                <input value={email} onChange={handleEmailChange} type='email' placeholder='Enter your email address' className='basis-[calc(80%-0.5rem)] rounded-md py-2 pl-3 w-4/5' />
                <button className='py-2 min-w-[100px] basis-1/5 rounded-md bg-white text-primary-500 hover:-translate-y-1 hover:bg-gray-100 transition-all duration-100 max-md:text-sm'>Subscribe</button>
            </div>
        </>
    )
}