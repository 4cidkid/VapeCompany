import { FaArrowRight } from "react-icons/fa";
import Button from "../common/Button";
import Image from "next/image";
export default function HeroSection() {
    const ButtonElement = (
        <>
            Buy now for <strong>&#36;82.90</strong>
        </>
    )
    return (
        <>
            <section className="w-full h-[650px] max-sm:h-[550px] bg-no-repeat bg-right bg-cover max-sm:bg-center max-sm:bg-[url('https://cdn.nicotordev.com/files/7c32ac19-e9e3-4852-a14b-4aca25d57e9a.webp')] max-lg:bg-[url('https://cdn.nicotordev.com/files/8e16a671-4a6a-4293-9b3b-10d5a221929b.webp')] bg-[url('https://cdn.nicotordev.com/files/80a2adb6-6318-4b95-a5f3-e0038d3d08d8.webp')]">
                <div className="relative z-10 max-sm:px-0 max-lg:px-5  max-lg:backdrop-brightness-[35%] w-full h-full px-24 flex items-center justify-start max-lg:justify-center">
                    <div className="text-white mb-20 max-lg:flex max-lg:flex-col max-lg:items-center max-lg:text-center">
                        <h2 className="uppercase font-black text-white text-6xl max-md:text-4xl">VAPORESSO<br /> TAROT NANO</h2>
                        <p className="font-light">All-inclusive ultra compact vaping device equipped with a<br className="max-md:hidden" /> 2000mAh battery alongside the top-filled VECO Tank.</p>
                        <div className="max-sm:flex-col flex items-center gap-5 mt-5">
                            <Button ariaLabel="Buy now" text={ButtonElement}></Button>
                            <button aria-label="see other options" className="flex items-center gap-2">See options <FaArrowRight /></button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}