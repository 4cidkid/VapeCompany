import { useEffect, useState } from "react";
import { CategoriesProps } from "@/interfaces/interfaces";
import clsx from "clsx";
import Image from "next/image";
import Button from "../common/Button";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from './categories.module.css';
export default function Categories({ categories }: CategoriesProps) {


    return (
        <div>
            <div id={styles.categoryContainer} className="max-lg:pt-12 max-xl:px-3 mx-auto justify-center w-full child:relative child:rounded-xl px-16 child:h-full gap-[2rem]">
                {
                    categories.slice(0, 10).map((category, index) => {
                        return (
                            <div key={index} className={`${index} w-full ${styles.category} ${index === 1 ? styles.categoryOne : index === 3 ? styles.categoryThree: index === 7 ? styles.categoryThree:index=== 9 ? styles.categoryNine: index === 0 ? styles.categoryCero : index === 8 ? styles.categoryEight: ''}`}>
                                <Image className="absolute left-0 top-0 w-full h-full object-cover object-center" src={category.image} alt={category.name} width={1000} height={1000} />
                                <div className="w-full h-full flex items-center justify-center backdrop-brightness-[50%] max-sm:backdrop-brightness-[40%]">
                                    <div className="p-1 w-full absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 flex flex-col gap-2">
                                        <p className="max-md:text-xl text-center text-3xl font-bold">
                                            {
                                                category.name
                                            }
                                        </p>
                                        <button className="max-sm:p-0 max-sm:w-full max-sm:text-primary-300 max-sm:underline max-sm:font-bold rounded-full flex-wrap justify-center flex items-center gap-2 sm:bg-primary-500 w-[80%] mx-auto max-w-[260px] py-2 text-white">
                                            <span>See {category.name}</span> <FaArrowRight className="max-sm:hidden" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}