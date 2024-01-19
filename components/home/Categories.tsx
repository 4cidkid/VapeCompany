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
            <div className="max-lg:pt-12 max-xl:px-3 mx-auto flex items-center flex-wrap child:flex-grow child:min-w-[300px] justify-center max-w-7xl child:basis-[calc(50%-2rem)] child:relative child:h-72 gap-[2rem]">
                {
                    categories.slice(0, 5).map((category, index) => {
                        return (
                            <div key={index} className={`${styles.category} flex-grow`}>
                                <Image className="absolute left-0 top-0 w-full h-full object-cover object-center" src={category.image} alt={category.name} width={1000} height={1000} />
                                <div className="w-full h-full flex items-center justify-center backdrop-brightness-[50%]">
                                    <p className="max-md:text-xl text-center text-3xl absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 font-bold">
                                        {
                                            category.name
                                        }
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}