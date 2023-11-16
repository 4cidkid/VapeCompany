'use client';
import { useEffect, useState } from "react";
import { CategoriesProps } from "@/interfaces/interfaces";
import clsx from "clsx";
import Image from "next/image";
import Button from "../common/Button";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "@/styles/styles.module.css"
export default function Categories({ categories }: CategoriesProps | { categories: { name: string; image: string; }[] }) {

    // total number of pages based on the number of categories
    const [numPages, setNumPages] = useState<number>(Math.round(categories.length / 6))
    // define the current page that we're at
    const [currentPage, setCurrentPage] = useState<number>(1)
    // array of all pages eg: [1,2,3]
    const [allPagesNumber, setAllPagesNumber] = useState<number[]>([])


    // set the current page to x number
    const currentPageSetter = (num: number) => setCurrentPage(num)
    // go forward with the carousel
    const forwardCurrentPage = () => setCurrentPage((prev) => {
        const newPageNumber = prev + 1;
        prev !== numPages && document.getElementById('pagination-' + newPageNumber)?.scrollIntoView({ behavior: "smooth" })
        return prev === numPages ? numPages : newPageNumber
    })
    // go back with the carousel
    const backCurrentPage = () => setCurrentPage((prev) => {
        const prevPageNumber = prev - 1;
        prev !== numPages && document.getElementById('pagination-' + prevPageNumber)?.scrollIntoView({ behavior: "smooth" })
        return prev === 1 ? 1 : prevPageNumber;
    })


    useEffect(() => {
        var pagesArr = [];
        for (let i = 1; i <= numPages; i++) {
            pagesArr.push(i);
        }
        setAllPagesNumber(pagesArr)
    }, [numPages])


    const ButtonElement = ({ text }: { text: string }) => (
        <>
            {text}
            <FaArrowRight />
        </>
    )

    return (
        <div className='pt-4 w-full overflow-hidden'>
            <div className="text-center relative transition-transform duration-500" style={{ transform: `translateX(-${100 * (currentPage - 1)}vw)` }}>
                {
                    allPagesNumber.map((num, index) => (
                        <div key={index} style={{ transform: `translateX(${100 * index}vw)` }} className={clsx(index !== 0 && `top-0 absolute`, "mx-auto w-screen flex flex-wrap justify-between gap-y-5 child:min-h-[340px] child:bg-primary-200")}>
                            {
                                categories.slice(5 * index, (index + 1) * 5).map((category, catIndex) => {
                                    if (catIndex % 4 === 0 && catIndex !== 0) {
                                        return (
                                            <div key={catIndex + category.name} className={`basis-full bg-cover bg-center relative ${styles.categories} overflow-hidden transition-transform h-[300px]`}>
                                                <div className={`relative z-10 text-white flex flex-col gap-4 items-center justify-center w-full h-full backdrop-blur-sm hover:backdrop-blur-0 hover:backdrop-brightness-95 backdrop-brightness-50 transition-all`}>
                                                    <span className="text-5xl font-semibold">{category.name}</span>
                                                    <Button link={"/products/"+category.name.replace(/\s/g, '-').toLowerCase()} className="font-medium flex items-center justify-center gap-4" text={<ButtonElement text={`See ${category.name}`} />} />
                                                </div>
                                                <Image className={`transition-transform w-full h-full object-cover absolute left-0 top-0`} width={1000} height={1000} src={category.image} alt={category.name} />
                                            </div>
                                        )
                                    }
                                    return (
                                        <div key={catIndex + category.name} className={clsx(`max-sm:basis-full basis-[49%] relative ${styles.categories} overflow-hidden transition-transform h-[300px]`)}>
                                            <div className={` relative z-10 text-white flex flex-col gap-4 items-center justify-center w-full h-full backdrop-blur-sm hover:backdrop-blur-0 hover:backdrop-brightness-95 backdrop-brightness-50 transition-all`}>
                                                <span className=" text-5xl font-semibold">{category.name}</span>
                                                <Button link={"/products/"+category.name.replace(/\s/g, '-').toLowerCase()} className="max-sm:px-3 font-medium flex items-center justify-center gap-4" text={<ButtonElement text={`See ${category.name}`} />} />
                                            </div>
                                            <Image className={`transition-transform w-full h-full object-cover absolute left-0 top-0`} width={1000} height={1000} src={category.image} alt={category.name} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </div>
            <div className="w-[80%] mx-auto pt-5 flex items-center gap-5 justify-center select-none">
                <div>
                    <div onClick={backCurrentPage} className="w-10 h-10 rounded-full border border-[#ccc] flex items-center justify-center cursor-pointer">
                        <FaChevronLeft />
                    </div>
                </div>
                <div className="overflow-hidden w-[300px]">
                    <div className="inline-flex items-center child:w-[50px]">
                        {allPagesNumber.map((num) => (
                            <div id={`pagination-${num}`}>
                                <div onClick={() => currentPageSetter(num)} className={clsx(currentPage === num ? "border border-primary-500 bg-primary-500" : "border border-[#ccc] scale-[70%]", "flex items-center justify-center rounded-full w-10 h-10 cursor-pointer transition-all duration-100")}>
                                    <span className={clsx(num === currentPage && "text-xl font-bold text-white", "transition-all")}>{num}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
                <div>
                    <div onClick={forwardCurrentPage} className="w-10 h-10 rounded-full border border-[#ccc] flex items-center justify-center cursor-pointer">
                        <FaChevronRight />
                    </div>
                </div>
            </div>
        </div>
    )
}