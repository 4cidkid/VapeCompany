'use client';
import { Brands } from "@/interfaces/interfaces";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';

export default function BrandsCarousel({ brandsComponents, deviceType }: { brandsComponents: React.ReactNode[], deviceType: string }) {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
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
            <div className="bg-primary-500 p-2 rounded-full absolute left-0 top-2/4 -translate-y-2/4 cursor-pointer z-10" onClick={() => onClick()}>
                <FaChevronLeft className="text-white text-2xl" />
            </div>
        );
    };
    return (
        <Carousel
            responsive={responsive}
            arrows={true}
            containerClass="mx-auto w-full relative cursor-pointer min-h-[400px] py-2 max-w-[90%]"
            itemClass="w-full flex justify-center items-center select-none"
            autoPlay={false}
            ssr={true}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            renderArrowsWhenDisabled={true}
            deviceType={deviceType}
        >
            {
                brandsComponents.map((brand, index) => <div key={index}>{brand}</div>)
            }

        </Carousel>
    )
}