import Header from '@/components/layout/Header'
import HeroSection from '@/components/home/Hero'
import Image from 'next/image'
import Categories from '@/components/home/Categories'
import { categories } from '@/mocks/search'
export default function Home() {
  const allCategories = categories
  return (
    <>
      <HeroSection />
      <Categories categories={allCategories} numPagesProp={Math.round(categories.length / 6)} />
    </>
  )
}
