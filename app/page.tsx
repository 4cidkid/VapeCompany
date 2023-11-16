import Header from '@/components/layout/Header'
import HeroSection from '@/components/home/Hero'
import Image from 'next/image'
import Categories from '@/components/home/Categories'
import { categories } from '@/mocks/search'
export default function Home() {

  return (
    <>
      <Header />
      <HeroSection />
      <Categories categories={categories} />
    </>
  )
}
