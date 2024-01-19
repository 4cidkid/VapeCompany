import Logo from "../common/Logo";
import facebookImage from '@/public/assets/images/icons/facebook.svg';
import xImage from '@/public/assets/images/icons/x.svg';
import instagramImage from '@/public/assets/images/icons/instagram.svg';
import Image from "next/image";
export default function Footer() {
    return (
        <footer className="bg-primary-500">
            <div className="p-7">
                <div className="max-md:text-left max-md:child:w-fit max-md:gap-3 max-md:items-start max-md:flex-col w-full flex md:items-center md:justify-between">
                    <Logo className="text-4xl max-md:text-2xl" />
                    <div className="flex items-center gap-7 child:cursor-pointer">
                        <Image width={31} height={31} src={facebookImage} alt="facebook" />
                        <Image width={31} height={31} src={instagramImage} alt="instagram" />
                        <Image width={31} height={31} src={xImage} alt="x" />
                    </div>
                </div>
                <div className="max-md:pt-8 pt-4 pb-5 flex flex-wrap child:flex-grow gap-4 child:min-w-[200px] items-center justify-between text-white">
                    <div className="flex flex-col gap-2">
                        <b className="text-xl max-md:text-lg">Customer service</b>
                        <ul className="child:font-light max-md:text-sm">
                            <li>Contact us</li>
                            <li>Payment</li>
                            <li>Delivery information</li>
                            <li>Return policy</li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-2">
                        <b className="text-xl max-md:text-lg">About us</b>
                        <ul className="child:font-light max-md:text-sm">
                            <li>About us</li>
                            <li>Customer reviews</li>
                            <li>Careers</li>
                            <li>Sitemap</li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-2">
                        <b className="text-xl max-md:text-lg">Vaping</b>
                        <ul className="child:font-light max-md:text-sm">
                            <li>Blog</li>
                            <li>All products</li>
                            <li>FAQ</li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-2">
                        <b className="text-xl max-md:text-lg">Legal</b>
                        <ul className="child:font-light max-md:text-sm">
                            <li>Age verification</li>
                            <li>Terms & Conditions</li>
                            <li>Privacy policy</li>
                            <li>Cookie policy</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className=" w-full py-3 px-6 border-t border-white text-white max-md:text-sm">
                <span>&copy;{new Date().getFullYear()} VapeCompany All Rights Reserved</span>
            </div>
        </footer>
    )
}