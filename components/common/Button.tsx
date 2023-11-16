import { ButtonProps } from "@/interfaces/interfaces"
import { twMerge } from "tailwind-merge"
import Link from "next/link"
export default function Button({ className, ariaLabel, text, link }: ButtonProps) {
    const mergedClassName = twMerge('hover:bg-primary-600 hover:-translate-y-1 transition-all px-12 py-2 text-white bg-primary-500 rounded-md', className)
    return (
        <>
            {
                link ? <Link href={link} aria-label={ariaLabel} className={mergedClassName}> {text}</Link> :
                    <button aria-label={ariaLabel} className={mergedClassName}>{text}</button>
            }
        </>
    )
}