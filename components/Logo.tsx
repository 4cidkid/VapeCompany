import { twMerge } from "tailwind-merge"
import Link from "next/link"
import { Inter } from "next/font/google"
import { clsx } from 'clsx';
const inter = Inter({ subsets: ["latin"] })

export default function Logo({ className }: { className?: string }) {
    const classname = twMerge("w-10 h-10 text-2xl text-white font-bold select-none", className ?? "")
    return (
        <Link href={"/"} className={clsx(classname, inter.className)}>
            VapeCompany
        </Link>
    )
}