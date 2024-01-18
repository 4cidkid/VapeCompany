import Logo from "../common/Logo";
import { AiOutlineUser } from "react-icons/ai";
import { BsCart2, BsShieldShaded } from "react-icons/bs";
import { PiAirplaneTakeoffFill } from "react-icons/pi";
import Link from "next/link";
import { Inter } from "next/font/google"
import Search from "../common/Search"
import { NavBar, NavBarMobile } from "./NavBar";
import { headers } from 'next/headers'
import { UAParser } from "ua-parser-js";


const inter = Inter({ subsets: ["latin"] })


export default function Header() {
    /* 
       Get device type from user agent
    */
    let deviceType = 'desktop'
    const userAgent = headers().get('user-agent')
    const parser = new UAParser()
    if (userAgent) {
        parser.setUA(userAgent)
        const result = parser.getResult()
        deviceType = (result.device && result.device.type) || 'desktop'
    }
    return (
        <>
            <header className="w-full">
                <div className="bg-background-light py-2 w-full flex items-center justify-end ">
                    <ul className="max-md:text-sm max-sm:text-xs flex items-center justify-end gap-8 rgba(0,0,0,0.65) w-[90%] max-lg:w-[95%] mx-auto">
                        <li>About us</li>
                        <li>Customer service</li>
                        <li>Shipping</li>
                    </ul>
                </div>
                <div className="bg-white w-full py-4">
                    <div className="relative max-lg:justify-between  flex items-center gap-5 max-sm:gap-2 lg:justify-between w-[90%] max-lg:w-[95%] mx-auto">
                        <NavBarMobile />
                        <div>
                            <Logo className="text-primary-500 text-3xl font-black max-lg:hidden" />
                            <Link className={`${inter.className} text-primary-500 text-3xl font-black lg:hidden`} href={"/"}>
                                V
                            </Link>
                        </div>
                        <Search />


                        <div className="whitespace-nowrap flex items-center gap-8 w-fit text-text">
                            <button aria-label="sign in" className="max-lg:hidden flex items-center">
                                <span>Sign in</span>
                                <AiOutlineUser className="text-3xl" />
                            </button>
                            <button aria-label="cart">
                                <BsCart2 className="text-3xl" />
                            </button>
                        </div>
                    </div>
                </div>
                <NavBar deviceType={deviceType} />
                <div className="max-sm:px-3 max-sm:text-xs max-sm:gap-4 text-sm py-1 w-full flex items-center justify-center gap-12 bg-primary-500">
                    <div className="flex items-center gap-3 max-sm:gap-1 text-center">
                        <BsShieldShaded className=" text-white max-sm:hidden" />
                        <span className="text-white text-sm">100% secure payment</span>
                    </div>
                    <div className="flex items-center gap-3 max-sm:gap-1 text-center">
                        <PiAirplaneTakeoffFill className=" text-white max-sm:hidden" />
                        <span className="text-white text-sm">Free delivery over $30</span>
                    </div>
                </div>
            </header>
        </>
    )
}