'use client';
import { signIn } from "next-auth/react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import clsx from "clsx";
export default function SignInButton({ provider, text, className }: { provider: string, text: string, className?: string }) {
    const classname = twMerge("px-12 py-2 flex items-center justify-center gap-2 rounded-md", className)
    return (
        <button className={classname} aria-label={`sign up with ${provider}`} onClick={() => {
            signIn(provider)
        }}>
            <Image src={`https://cdn.nicotordev.com/files/${provider}.svg`} width={20} height={20} alt={`${provider} logo`} />
            {text}
        </button>
    )
}