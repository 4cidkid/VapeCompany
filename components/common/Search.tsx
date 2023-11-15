'use client';
import { useEffect, useState, useRef } from 'react'
import { Combobox } from '@headlessui/react'
import clsx from 'clsx';
import { FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { searchProducts } from '@/mocks/search';
import { Transition } from '@headlessui/react';
export default function Search() {

  const { push } = useRouter()


  // query that user is searching
  const [query, setQuery] = useState<string>("")


  // all options filtered by query
  const [filteredOptions, setFilteredOptions] = useState<string[]>([])


  // rounded borders
  const [roundedBorderOnInput, setRoundedBorderOnInput] = useState<boolean>(true)

  // width of the window
  const [windowWidth, setWindowWidth] = useState<number>(0)


  // set mobile search state
  const [mobileSearch, setMobileSearch] = useState<boolean>(false)


  // link to the user query
  useEffect(() => {
    if (query !== "") {
      var filteredItems = searchProducts.filter((item) => {
        // item and query to lower case and replace all white spaces with nothing.
        var itemLower = item.toLowerCase().replace(/\s/g, "");
        var queryLower = query.toLowerCase().replace(/\s/g, "");
        if (itemLower.includes(queryLower) || queryLower.includes(itemLower)) {
          return item;
        }
      })
      setFilteredOptions(filteredItems)
    } else {
      setFilteredOptions([])
    }
  }, [query])


  // set width of the window on first render
  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [])


  // set width of the window on resize
  useEffect(() => {
    window.addEventListener('resize', setWindowWidthOnResize)
    return () => window.removeEventListener('resize', setWindowWidthOnResize)
  }, [])



  const handleInputFocus = () => setRoundedBorderOnInput(false);

  const handleInputBlur = () => setRoundedBorderOnInput(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

  const handleSearch = () => push("/search?" + "q" + "=" + query);

  const setWindowWidthOnResize = () => setWindowWidth(window.innerWidth);

  const handleClickMobileSearch = () => windowWidth <= 640 && setMobileSearch(true)

  const handleCloseMobileSearch = () => setMobileSearch(false)

  return (
    <div className={clsx(mobileSearch ? "w-full absolute left-0 h-full -translate-y-2/4 top-2/4 bg-white flex justify-center items-center gap-5" : "w-[70%] max-lg:w-[90%] relative","transition-colors")}>
      <Combobox value={query} onChange={setQuery}>
        <Combobox.Input onClick={handleClickMobileSearch} onFocus={handleInputFocus} onBlur={handleInputBlur} className={clsx(mobileSearch ? "w-[80%]" : "w-full", roundedBorderOnInput ? "rounded-md" : "rounded-tr-md rounded-tl-md", "max-sm:hidden relative text-sm bg-transparent border-2 border-[rgba(0,0,0,0.5)] px-4 py-2")} placeholder="Search for products" onChange={handleInputChange} />

        <Combobox.Options className={"max-sm:hidden border border-[#ccc] shadow-sm absolute top-full left-0 w-full bg-white max-h-60 overflow-y-scroll"}>
          {filteredOptions.map((option, index) => (
            <Combobox.Option className={clsx(index !== filteredOptions.length - 1 && "cursor-pointer border-b border-[#ccc]", "hover:bg-[#ececec] bg-white transition-colors py-3 w-full")} key={index} value={option}>
              <span className='px-3'>{option}</span>
            </Combobox.Option>
          ))}
        </Combobox.Options>
        <button onClick={handleSearch} aria-label="search" className="max-sm:hidden border-b-2 border-t-2 border-r-2 border-[rgba(0,0,0,0.5)]  rounded-tr-md rounded-br-md absolute -translate-y-2/4 top-2/4 right-0 flex items-center justify-center text-xl font-bold text-white h-full w-10 bg-primary-500">
          <FiSearch />
        </button>


        { /*  MOBILE SEARCH */}


        <div className={clsx(mobileSearch ? "w-[80%]" : "w-full", "sm:hidden relative")} >
          <Combobox.Input onClick={handleClickMobileSearch} onFocus={handleInputFocus} onBlur={handleInputBlur} className={clsx(roundedBorderOnInput ? "rounded-md" : "rounded-tr-md rounded-tl-md", "w-full sm:hidden relative text-sm bg-transparent border-2 border-[rgba(0,0,0,0.5)] px-4 py-2")} placeholder="Search for products" onChange={handleInputChange} />
          <button onClick={handleSearch} aria-label="search" className="border-b-2 border-t-2 border-r-2 border-[rgba(0,0,0,0.5)]  rounded-tr-md rounded-br-md absolute -translate-y-2/4 top-2/4 right-0 flex items-center justify-center text-xl font-bold text-white h-full w-10 bg-primary-500">
            <FiSearch />
          </button>
          <Combobox.Options className={"sm:hidden border border-[#ccc] shadow-sm absolute top-full left-0 w-full bg-white max-h-60 overflow-y-scroll"}>
            {filteredOptions.map((option, index) => (
              <Combobox.Option className={clsx(index !== filteredOptions.length - 1 && "cursor-pointer border-b border-[#ccc]", "hover:bg-[#ececec] bg-white transition-colors py-3 w-full")} key={index} value={option}>
                <span className='px-3'>{option}</span>
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
        <button onClick={handleCloseMobileSearch} className={clsx(mobileSearch ? "" : "hidden", "text-primary-500 underline underline-offset-4")} aria-label='cancel search'>
          Cancel
        </button>
      </Combobox>
    </div>
  )
}



