import { Product } from "@/interfaces/interfaces";
import Image from "next/image";
export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="flex flex-col items-center text-center p-3 border border-[#CCCCCC] bg-white rounded-[33px] w-full h-full max-w-[370px] shadow-[0px_4px_4px_0px_rgba(170,170,170,0.25)]" >
            <div className="w-full aspect-[0.8152] h-auto">
                <Image className={`w-full h-full object-contain drag-select-none`} src={product.image} alt={product.name} width={200} height={200} />
            </div>
            <div>
                <p className="text-xl max-md:text-lg">{
                    product.name.toUpperCase()
                }</p>
                <div className="flex flex-col">
                    <b className="text-primary-500 text-xl max-md:text-lg">
                        ${
                            product.price
                        }
                    </b>
                    <span className="text-[rgba(62,62,62,1)] text-sm max-md:text-xs">
                        Before <b className="text-base max-md:text-sm">${(product.price + 10).toFixed(2)}</b>
                    </span>
                </div>
            </div>
        </div>
    )
}