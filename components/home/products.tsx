import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { headers } from 'next/headers'
import { UAParser } from "ua-parser-js";
import ProductCarousel from "./productCarousel";
import { productMock } from "@/mocks/products";
export default function Products() {
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
        <div className="bg-background-light py-20">
            <div className="w-[90%] ml-auto flex flex-col items-start">
                <div className="w-full">
                    <div className="pr-16 flex justify-between items-center mb-8">
                        <b className="text-3xl font-black">Deals of the week - <span className="text-[#8D8B8B]"> Enjoy the offer!</span></b>
                        <Link href="/products" className="flex items-center gap-2 text-primary-500 text-lg">
                            See all Deals of the week <FaArrowRight />
                        </Link>
                    </div>
                    <ProductCarousel deviceType={deviceType} products={productMock} />
                </div>
            </div>
            <div className="w-[90%] ml-auto flex flex-col items-start mt-52">
                <div className="w-full">
                    <div className="pr-16 flex justify-between items-center mb-8">
                        <b className="text-3xl font-black">Vape Kits - <span className="text-[#8D8B8B]">Made for everyone</span></b>
                        <Link href="/products" className="flex items-center gap-2 text-primary-500 text-lg">
                            See all Vape kits <FaArrowRight />
                        </Link>
                    </div>
                    <ProductCarousel deviceType={deviceType} products={productMock} />
                </div>
            </div>
            <div className="w-[90%] ml-auto flex flex-col items-start mt-52">
                <div className="w-full">
                    <div className="pr-16 flex justify-between items-center mb-8">
                        <b className="text-3xl font-black">Dispensables - <span className="text-[#8D8B8B]">Perfect for any ocasion</span></b>
                        <Link href="/products" className="flex items-center gap-2 text-primary-500 text-lg">
                            See all Dispensables <FaArrowRight />
                        </Link>
                    </div>
                    <ProductCarousel deviceType={deviceType} products={productMock} />
                </div>
            </div>
        </div>
    )
}