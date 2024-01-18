import { getDeviceType } from "@/utils/utils";
import BrandsCarousel from "./brandsCarousel";
import { brandsMock } from "@/mocks/brands";
export default function FeaturedBrands(){
    const deviceType = getDeviceType();
    return(
        <div className="py-32">
            <div className="text-center">
                <h3 className="text-3xl uppercase font-black">
                    Featured Brands
                </h3>
                <BrandsCarousel brands={brandsMock} deviceType={deviceType} />
            </div>
        </div>
    )
}