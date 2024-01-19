import Header from '@/components/layout/Header'
import HeroSection from '@/components/home/Hero'
import Image from 'next/image'
import Categories from '@/components/home/Categories'
import Products from '@/components/home/products'
import { categories } from '@/mocks/search'
import Newsletter from '@/components/home/newsLetter'
import vapeOneImage from '@/public/assets/images/home/vape-1.webp'
import vapeTwoImage from '@/public/assets/images/home/vape-2.webp'
import vapeThreeImage from '@/public/assets/images/home/vape-3.webp'
import vapeFourImage from '@/public/assets/images/home/vape-4.webp'
import customServiceImage from '@/public/assets/images/home/customerService.jpg';
import earnPointsImage from '@/public/assets/images/home/earnPoints.jpg';
import freeShippingImage from '@/public/assets/images/home/freeShipping.jpg';
import exclusiveDealsImage from '@/public/assets/images/home/exclusiveDeals.jpg';
import FeaturedBrands from '@/components/home/featuredBrands'
export default function Home() {
  const allCategories = categories
  return (
    <>
      <HeroSection />
      <Categories categories={allCategories} />
      <div className='relative bg-primary-600 min-h-44 w-full mt-16 flex items-center justify-center overflow-hidden'>
        <div className='absolute w-full h-full z-10 max-sm:hidden'>
          <Image className='absolute left-2 max-md:-left-20 top-2' width={400} height={400} src={vapeOneImage} alt='vape' />
          <Image className='absolute left-12 max-md:-left-14 -top-6' width={400} height={400} src={vapeTwoImage} alt='vape' />
        </div>
        <div className='flex flex-col justify-center gap-4 text-center relative z-20 max-xl:backdrop-brightness-50 max-sm:backdrop-brightness-[25%] w-full h-full py-8 px-3' >
          <div className='gap-1'>
            <b className='text-white text-3xl font-bold max-md:text-xl'>Discover Vape Bliss: Your Gateway to Flavorful Moments</b>
            <p className='text-white'>Elevate Your Vaping Experience with Our Exclusive Newsletter</p>
          </div>
          <div className='flex items-stretch w-2/4 max-sm:w-full mx-auto gap-2'>
            <Newsletter />
          </div>
        </div>
        <div className='absolute w-full h-full z-10'>
          <Image className='absolute right-2 max-md:-right-20 max-sm:-right-2/4 max-sm:-translate-x-2/4 -top-1' width={400} height={400} src={vapeThreeImage} alt='vape' />
          <Image className='absolute right-12 max-md:-right-14 max-sm:-right-2/4 max-sm:-translate-x-2/4 -top-4' width={400} height={400} src={vapeFourImage} alt='vape' />
        </div>
      </div>
      <Products />
      <FeaturedBrands />
      <div className='w-[90%] mt-12 mx-auto pb-32'>
        <div className='cursor-pointer flex max-lg:flex-wrap max-lg:child:flex-grow child:min-w-[200px] items-center child:basis-[calc(25%-2rem)] child:h-[400px] child-hover:basis-[calc(50%-2rem)] child:transition-all child:duration-300 child:flex-shrink gap-[2rem]'>
          <div className='relative'>
            <Image width={267} height={267} className='w-full h-full object-cover absolute left-0 top-0' src={freeShippingImage} alt='Free shipping over $50' />
            <div className='p-4 text-white w-full h-full flex items-center justify-center backdrop-brightness-50'>
              <p className='text-5xl max-xl:text-3xl max-md:text-xl'>
                <b>Free shipping</b>{" "}
                over $50
              </p>
            </div>
          </div>
          <div className='relative'>
            <Image width={267} height={267} className='w-full h-full object-cover absolute left-0 top-0' src={customServiceImage} alt='Customer service 24/7' />
            <div className='p-4 text-white w-full h-full flex items-center justify-center backdrop-brightness-50'>
              <p className='text-5xl max-xl:text-3xl max-md:text-xl'>
                Customer service{" "}
                <b>24/7</b>
              </p>
            </div>
          </div>
          <div className='relative'>
            <Image width={267} height={267} className='w-full h-full object-cover absolute left-0 top-0' src={exclusiveDealsImage} alt="Exclusive deals 4 y'all" />
            <div className='p-4 text-white w-full h-full flex items-center justify-center backdrop-brightness-50'>
              <p className='text-5xl max-xl:text-3xl max-md:text-xl'>
                <b>Exclusive Deals</b>{" "}
                4 y&apos;all
              </p>
            </div>
          </div>
          <div className='relative'>
            <Image width={267} height={267} className='w-full h-full object-cover absolute left-0 top-0' src={earnPointsImage} alt='Earn points for each purchase' />
            <div className='p-4 text-white w-full h-full flex items-center justify-center backdrop-brightness-50'>
              <p className='text-5xl max-xl:text-3xl max-md:text-xl'>
                <b>Earn points</b>{" "}
                for each purchase
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
