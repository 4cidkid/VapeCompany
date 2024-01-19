import { getDeviceType } from "@/utils/utils";
import BrandsCarousel from "./brandsCarousel";
import { brandsMock } from "@/mocks/brands";
import Image from "next/image";
import { headers } from 'next/headers'
export default function FeaturedBrands() {
    const deviceType = getDeviceType(headers);
    let allBrandComponents: React.ReactNode[] = [];
    let temporalBrandArray: React.ReactNode[] = [];
    for (let i = 0; i < brandsMock.length; i++) {
        temporalBrandArray.push(
            <div className="w-full h-full">
                <Image className="w-full h-full object-contain" src={brandsMock[i].image} alt={brandsMock[i].name} width={500} height={500} />
            </div>
        )
        if ((i % 11 === 0 && i !== 0) || i === brandsMock.length - 1) {
            allBrandComponents.push(
                <div className="flex flex-wrap h-full">
                    {temporalBrandArray.map((brand, index) => <div className="basis-1/6 p-12" key={index}>{brand}</div>)}
                </div>
            )
            temporalBrandArray = [];
        }
    }
    return (
        <div className="pt-32">
            <div className="text-center">
                <h3 className="text-3xl uppercase font-black">
                    Featured Brands
                </h3>
                <BrandsCarousel brandsComponents={allBrandComponents} deviceType={deviceType} />
            </div>
        </div>
    )
}