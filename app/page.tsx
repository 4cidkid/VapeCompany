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
export default function Home() {
  const allCategories = categories
  return (
    <>
      <HeroSection />
      <Categories categories={allCategories} />
      <div className='relative bg-primary-600 h-44 w-full mt-16 py-4 flex items-center justify-center overflow-hidden'>
        <div className='absolute w-full h-full z-10'>
          <Image className='absolute left-2 top-2' width={400} height={400} src={vapeOneImage} alt='vape' />
          <Image className='absolute left-12 -top-6' width={400} height={400} src={vapeTwoImage} alt='vape' />
        </div>
        <div className='flex flex-col justify-center gap-4 text-center relative z-20' >
          <div className='gap-1'>
            <b className='text-white text-3xl font-bold'>Discover Vape Bliss: Your Gateway to Flavorful Moments</b>
            <p className='text-white'>Elevate Your Vaping Experience with Our Exclusive Newsletter</p>
          </div>
          <div className='flex items-stretch w-3/4 mx-auto gap-2'>
            <Newsletter />
          </div>
        </div>
        <div className='absolute w-full h-full z-10'>
          <Image className='absolute right-2 -top-1' width={400} height={400} src={vapeThreeImage} alt='vape' />
          <Image className='absolute right-12 -top-4' width={400} height={400} src={vapeFourImage} alt='vape' />
        </div>
      </div>
      <Products/>
    </>
  )
}
