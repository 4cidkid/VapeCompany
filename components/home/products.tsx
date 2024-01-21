import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { headers } from 'next/headers'
import ProductCarousel from "./productCarousel";
import { productMock } from "@/mocks/products";
import { getDeviceType } from "@/utils/utils";
export default function Products() {
    const deviceType = getDeviceType(headers);
    return (
        <div className="bg-background-light py-20">
            <div className="max-sm:w-full w-[90%] ml-auto flex flex-col items-start">
                <div className="w-full max-sm:px-3">
                    <div className="max-lg:px-3 max-sm:flex-col max-sm:text-center pr-16 flex justify-between items-center mb-8 gap-2">
                        <h2 className="max-md:text-xl text-3xl font-black max-sm:flex-col max-sm:flex gap-2">Deals of the week <span className="max-sm:hidden">-</span> <span className="text-[#8D8B8B]"> Enjoy the offer!</span></h2>
                        <Link href="/products" className="whitespace-nowrap max-md:text-base  flex items-center gap-2 text-primary-500 text-lg">
                            See all Deals of the week <FaArrowRight />
                        </Link>
                    </div>
                    <ProductCarousel deviceType={deviceType} products={productMock} />
                </div>
            </div>
            <div className="max-sm:w-full w-[90%] ml-auto flex flex-col items-start mt-52">
                <div className="w-full max-sm:px-3">
                    <div className="max-lg:px-3 max-sm:flex-col max-sm:text-center pr-16 flex justify-between items-center mb-8 gap-2">
                        <h2 className="max-md:text-xl  text-3xl font-black max-sm:flex-col max-sm:flex gap-2">Vape Kits <span className="max-sm:hidden">-</span> <span className="text-[#8D8B8B] ">Made for everyone</span></h2>
                        <Link href="/products" className="whitespace-nowrap max-md:text-base  flex items-center gap-2 text-primary-500 text-lg">
                            See all Vape kits <FaArrowRight />
                        </Link>
                    </div>
                    <ProductCarousel deviceType={deviceType} products={productMock} />
                </div>
            </div>
            <div className="max-sm:w-full w-[90%] ml-auto flex flex-col items-start mt-52">
                <div className="w-full max-sm:px-3">
                    <div className="max-lg:px-3 max-sm:flex-col max-sm:text-center pr-16 flex justify-between items-center mb-8 gap-2">
                        <h2 className="max-md:text-xl  text-3xl font-black max-sm:flex-col max-sm:flex gap-2">Dispensables <span className="max-sm:hidden">-</span> <span className="text-[#8D8B8B] ">Perfect for any ocasion</span></h2>
                        <Link href="/products" className="whitespace-nowrap max-md:text-base flex items-center gap-2 text-primary-500 text-lg">
                            See all Dispensables <FaArrowRight />
                        </Link>
                    </div>
                    <ProductCarousel deviceType={deviceType} products={productMock} />
                </div>
            </div>
        </div>
    )
}