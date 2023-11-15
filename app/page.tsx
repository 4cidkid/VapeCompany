import Header from '@/components/layout/Header'
import HeroSection from '@/components/Hero'
import Image from 'next/image'
import Categories from '@/components/Categories'
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
