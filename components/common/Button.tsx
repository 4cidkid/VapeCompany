import { twMerge } from "tailwind-merge"
export default function Button({ className, ariaLabel, text }: { className?: string, ariaLabel?: string, text: string | JSX.Element }) {
    const mergedClassName = twMerge('hover:bg-primary-600 hover:-translate-y-1 transition-all px-12 py-2 text-white bg-primary-500 rounded-md', className)
    return (
        <button aria-label={ariaLabel} className={mergedClassName}>{text}</button>
    )
}