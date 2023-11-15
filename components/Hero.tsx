import { FaArrowRight } from "react-icons/fa";
import Button from "./common/Button";
export default function HeroSection() {
    const buttonElement = (
        <>
            Buy now for <strong>&#36;82.90</strong>
        </>
    )
    return (
        <>
            <section className="w-full h-[650px] bg-no-repeat bg-right bg-cover bg-[url('https://cdn.nicotordev.com/files/80a2adb6-6318-4b95-a5f3-e0038d3d08d8.webp')]">
                <div className="max-sm:px-0 max-md:px-5 max-lg:backdrop-blur-sm  max-lg:backdrop-brightness-75 w-full h-full px-24 flex items-center justify-start max-md:justify-center">
                    <div className="text-white mb-20 max-md:flex max-md:flex-col max-md:items-center max-md:text-center">
                        <h2 className="uppercase font-black text-white text-6xl max-sm:text-5xl">VAPORESSO<br /> TAROT NANO</h2>
                        <p className="font-light">All-inclusive ultra compact vaping device equipped with a<br className="max-md:hidden" /> 2000mAh battery alongside the top-filled VECO Tank.</p>
                        <div className="max-sm:flex-col flex items-center gap-5 mt-5">
                            <Button ariaLabel="Buy now" text={buttonElement}></Button>
                            <button aria-label="see other options" className="flex items-center gap-2">See options <FaArrowRight /></button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}