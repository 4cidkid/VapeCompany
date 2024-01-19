'use client';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import { Product } from "@/interfaces/interfaces";
import ProductCard from "../common/ProductCard";
export default function ProductCarousel({ deviceType, products }: { deviceType: string, products: Product[] }) {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 3.5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 640 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 640, min: 0 },
            items: 1
        }
    }

    const CustomRightArrow = ({ onClick, ...rest }: any) => {
        const {
            onMove,
            carouselState: { currentSlide, deviceType }
        } = rest;
        return (
            <div className="bg-primary-500 p-2 rounded-full absolute right-5 top-2/4 -translate-y-2/4 cursor-pointer z-10" onClick={() => onClick()}>
                <FaChevronRight className="text-white text-2xl" />
            </div>
        )
    };

    const CustomLeftArrow = ({ onClick, ...rest }: any) => {
        const {
            onMove,
            carouselState: { currentSlide, deviceType }
        } = rest;
        return (
            <div className="bg-primary-500 p-2 rounded-full absolute max-sm:left-5 sm:left-0 top-2/4 -translate-y-2/4 cursor-pointer z-10" onClick={() => onClick()}>
                <FaChevronLeft className="text-white text-2xl" />
            </div>
        );
    };



    return (
        <Carousel
            responsive={responsive}
            arrows={true}
            containerClass="mx-auto w-full relative cursor-pointer min-h-[400px] py-2"
            itemClass="w-full flex justify-center items-center select-none max-md:px-2 max-sm:px-0"
            autoPlay={false}
            ssr={true}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            renderArrowsWhenDisabled={true}
            deviceType={deviceType}
        >
            {
                products.map((product, index) => (
                    <ProductCard product={product} key={index} />
                ))
            }
        </Carousel>
    )
}