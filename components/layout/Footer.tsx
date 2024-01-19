import Logo from "../common/Logo";
import facebookImage from '@/public/assets/images/icons/facebook.svg';
import xImage from '@/public/assets/images/icons/x.svg';
import instagramImage from '@/public/assets/images/icons/instagram.svg';
import Image from "next/image";
export default function Footer() {
    return (
        <footer className="bg-primary-500">
            <div className="p-7">
                <div className="w-full flex items-center justify-between">
                    <Logo className="text-4xl" />
                    <div className="flex items-center gap-7 child:cursor-pointer">
                        <Image width={31} height={31} src={facebookImage} alt="facebook" />
                        <Image width={31} height={31} src={instagramImage} alt="instagram" />
                        <Image width={31} height={31} src={xImage} alt="x" />
                    </div>
                </div>
                <div className="pt-4 pb-5 flex items-center justify-between text-white">
                    <div className="flex flex-col gap-2">
                        <b className="text-xl">Customer service</b>
                        <ul className="child:font-light">
                            <li>Contact us</li>
                            <li>Payment</li>
                            <li>Delivery information</li>
                            <li>Return policy</li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-2">
                        <b className="text-xl">About us</b>
                        <ul className="child:font-light">
                            <li>About us</li>
                            <li>Customer reviews</li>
                            <li>Careers</li>
                            <li>Sitemap</li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-2">
                        <b className="text-xl">Vaping</b>
                        <ul className="child:font-light">
                            <li>Blog</li>
                            <li>All products</li>
                            <li>FAQ</li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-2">
                        <b className="text-xl">Legal</b>
                        <ul className="child:font-light">
                            <li>Age verification</li>
                            <li>Terms & Conditions</li>
                            <li>Privacy policy</li>
                            <li>Cookie policy</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="w-full py-3 px-6 border-t border-white text-white">
                <span>&copy;{new Date().getFullYear()} VapeCompany All Rights Reserved</span>
            </div>
        </footer>
    )
}