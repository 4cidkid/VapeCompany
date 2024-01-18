'use client';
import { Transition } from "@headlessui/react";
import { useEffect, useState, forwardRef, Fragment, LegacyRef, Ref } from "react";
import Link from "next/link";
import { Inter } from "next/font/google"
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineUser, AiOutlineUserAdd, AiOutlineMessage } from "react-icons/ai"
import { CiUser, CiBoxes, CiHeart } from "react-icons/ci";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { MdVapingRooms, MdCloudQueue } from "react-icons/md";
import { FiChevronRight } from "react-icons/fi";
import SetFullScreenMobile from "../common/FullScreenMobile";
import styles from "@/styles/styles.module.css"
const inter = Inter({ subsets: ["latin"] })
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";


export function NavBar({ deviceType }: { deviceType: string }) {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4
        },
    }



    const CustomRightArrow = ({ onClick, ...rest }: any) => {
        const {
            onMove,
            carouselState: { currentSlide, deviceType }
        } = rest;
        return <FaChevronRight className="text-text text-xl absolute right-0 top-2/4 -translate-y-2/4 cursor-pointer z-10" onClick={() => onClick()} />;
    };

    const CustomLeftArrow = ({ onClick, ...rest }: any) => {
        const {
            onMove,
            carouselState: { currentSlide, deviceType }
        } = rest;
        return <FaChevronLeft className="text-text text-xl absolute left-0 top-2/4 -translate-y-2/4 cursor-pointer z-10" onClick={() => onClick()} />;
    };



    return (
        <div className="bg-background-light py-2 max-lg:hidden">
            <Carousel
                responsive={responsive}
                arrows={true}
                containerClass="mx-auto w-[80%] relative cursor-pointer"
                itemClass="w-fit flex justify-center items-center select-none"
                autoPlay={true}
                autoPlaySpeed={2500}
                infinite={true}
                ssr={true}
                pauseOnHover={true}
                customLeftArrow={<CustomLeftArrow />}
                customRightArrow={<CustomRightArrow />}
                deviceType={deviceType}
            >
                <Link href="/products/vape-kits">
                    Vape kits
                </Link>
                <Link href="/products/dispensables">
                    Dispensables
                </Link>
                <Link href="/products/e-liquids">
                    E-Liquids
                </Link>
                <Link href="/products/pods-and-tanks">
                    Pods & Tanks
                </Link>
                <Link href="/products/coils">
                    Coils
                </Link>
                <Link href="/products/brands">
                    Brands
                </Link>
            </Carousel>

        </div>
    )
}

export function NavBarMobile() {


    const [showMenu, setShowMenu] = useState<boolean>(false)


    const handleOpenMenu = () => setShowMenu(true);

    const handleCloseMenu = () => setShowMenu(false);


    useEffect(() => {
        if (showMenu) {
            document.body.classList.add('overflow-hidden');
            document.body.classList.add('h-screen');
            document.body.id = styles['full-screen'];
        } else {
            document.body.classList.remove('overflow-hidden');
            document.body.classList.remove('h-screen');
        }
    }, [showMenu])

    return (
        <>
            <div onClick={handleOpenMenu} className="lg:hidden flex items-center justify-center">
                <button aria-label="menu">
                    <AiOutlineMenu className="text-3xl" />
                </button>
            </div>
            {showMenu && <SetFullScreenMobile />}
            <Transition.Root show={showMenu} as={Fragment}>
                <ChildTransitions handleCloseMenu={handleCloseMenu} />
            </Transition.Root>
        </>
    )
}

const BackgroundFixed = forwardRef((props, forwardedRef) => (
    <div ref={forwardedRef as LegacyRef<HTMLDivElement>} className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.6)] z-20"></div>
))

const ChildTransitions = forwardRef((props: { handleCloseMenu: () => void }, forwardedRef) => (
    <>
        <Transition.Child
            ref={forwardedRef as Ref<HTMLElement> | undefined}
            as={Fragment}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <BackgroundFixed />
        </Transition.Child>
        <Transition.Child
            ref={forwardedRef as Ref<HTMLElement> | undefined}
            as="div"
            enter="transition-transform duration-500"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition-transform duration-500"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
            className="max-sm:w-screen w-2/4 h-screen bg-white fixed left-0 top-0 z-50 py-16 px-8"
        >
            <div className="flex flex-col gap-5 items-center pb-4 border-b border-[#ccc]">
                <div aria-label="close menu" onClick={props.handleCloseMenu} className="w-10 h-10 bg-primary-500 rounded-full text-2xl text-white flex items-center justify-center">
                    <FaArrowLeft />
                </div>
                <Link className={`${inter.className} text-primary-500 text-3xl font-black lg:hidden`} href={"/"}>
                    VapeCompany
                </Link>
                <div className="flex max-sm:flex-col gap-2 w-full">
                    <Link href="/sign-in" className="flex items-center justify-center gap-3 w-full px-5 py-2 bg-primary-500 font-medium text-white rounded-full" aria-label="sign in">
                        <AiOutlineUser /> Sign In
                    </Link>
                    <Link href="/sign-up" className="flex items-center justify-center gap-3 w-full px-5 py-2 bg-primary-500 font-medium text-white rounded-full" aria-label="sign up">
                        <AiOutlineUserAdd /> Sign Up
                    </Link>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-col child:py-2 py-2 child:cursor-pointer border-b border-[#ccc]">
                    <div className="flex items-center text-text gap-2">
                        <CiUser />
                        <span>Account</span>
                    </div>
                    <div className="flex items-center text-text gap-2">
                        <CiBoxes />
                        <span>Orders</span>
                    </div>
                    <div className="flex items-center text-text gap-2">
                        <CiHeart />
                        <span>Wishlist</span>
                    </div>
                </div>
                <div className="flex flex-col child:py-2 py-2 child:cursor-pointer border-b border-[#ccc]">
                    <div className="flex items-center text-text gap-2">
                        <IoIosHelpCircleOutline />
                        <span>Help</span>
                    </div>
                </div>
                <div className="flex flex-col child:py-2 py-2 child:cursor-pointer border-b border-[#ccc]">
                    <div className="flex items-center justify-between text-text gap-2">
                        <div className="flex items-center text-text gap-2">
                            <MdVapingRooms />
                            <span>Categories</span>
                        </div>
                        <FiChevronRight className="text-xl" />
                    </div>
                    <div className="flex items-center justify-between text-text gap-2">
                        <div className="flex items-center text-text gap-2">
                            <MdCloudQueue />
                            <span>Subcategories</span>
                        </div>
                        <FiChevronRight className="text-xl" />
                    </div>
                </div>
                <div className="flex flex-col child:py-2 py-2 child:cursor-pointer  border-[#ccc]">
                    <div className="flex items-center  text-text gap-2">
                        <AiOutlineMessage />
                        <span>Contact</span>
                    </div>
                </div>
            </div>
        </Transition.Child>
    </>
))


ChildTransitions.displayName = "ChildTransitions";
BackgroundFixed.displayName = "BackgroundFixed";