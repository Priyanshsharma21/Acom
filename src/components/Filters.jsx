import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid'
import { filters } from '../constants'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const Filters = ({setProducts}) => {
    const [selectedFilters, setSelectedFilters] = useState({
        price: [],
        color: [],
        size: [],
        category: [],
        sorts: [],
    });
    const [loader, setLoader] = useState(false)
    const {VITE_URL} = import.meta.env
    const navigate = useNavigate()

    const handleFilterChange = (filterType, value) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: [value],
        }));
    };

    const handleClear = ()=>{
        setSelectedFilters({
            price: [],
            color: [],
            size: [],
            category: [],
            sorts: [],
        })
    }


    const handleFormSubmit = async(e)=>{
        e.preventDefault()
        try {
            const res = await axios.post(`${VITE_URL}/advancefilter`, selectedFilters)

            console.log(res.data)
            setProducts(res.data.products)
        } catch (error) {
            toast(error.response.data.message);
        }
    }

  return (
    <div className="w-full flex flex-col mt-10">
        <div className="bg-[#020202]">
      {/* Filters */}
      <Disclosure
        as="section"
        aria-labelledby="filter-heading"
        className="grid items-center border-b border-t border-gray-200"
      >
        <h2 id="filter-heading" className="sr-only">
          Filters
        </h2>
        <div className="relative col-start-1 row-start-1 py-4">
          <div className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
            <div>
              <Disclosure.Button className="group flex items-center font-medium text-gray-300">
                <FunnelIcon
                  className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                2 Filters
              </Disclosure.Button>
            </div>
            <div className="pl-6">
              <button type="button" className="text-gray-300" onClick={handleClear}>
                Clear all
              </button>
            </div>
          </div>
        </div>
        <Disclosure.Panel className="border-t border-gray-200 py-10">
          {/* <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8"> */}
            <form className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8" onSubmit={handleFormSubmit}>
            <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
              <fieldset>
                <legend className="block text-slate-300 font-medium">Price</legend>
                <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                  {filters.price.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center text-base sm:text-sm">
                      <input
                        id={`price-${optionIdx}`}
                        name="price[]"
                        defaultValue={option.value}
                        type="checkbox"
                        checked={selectedFilters.price.includes(option.value)}
                        className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-400 focus:ring-indigo-500"
                        defaultChecked={option.checked}
                        onChange={() => handleFilterChange('price', option.value)}
                      />
                      <label htmlFor={`price-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-300">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="block text-slate-300 font-medium">Color</legend>
                <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                  {filters.color.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center text-base sm:text-sm">
                      <input
                        id={`color-${optionIdx}`}
                        name="color[]"
                        defaultValue={option.value}
                        type="checkbox"
                        checked={selectedFilters.color.includes(option.value)}
                        onChange={() => handleFilterChange('color', option.value)}
                        className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-400 focus:ring-indigo-500"
                        defaultChecked={option.checked}
                      />
                      <label htmlFor={`color-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-300">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
            <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
              <fieldset>
                <legend className="block text-slate-300 font-medium">Size</legend>
                <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                  {filters.size.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center text-base sm:text-sm">
                      <input
                        id={`size-${optionIdx}`}
                        name="size[]"
                        defaultValue={option.value}
                        type="checkbox"
                        onChange={() => handleFilterChange('size', option.value)}
                        className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-400 focus:ring-indigo-500"
                        checked={selectedFilters.size.includes(option.value)}
                        defaultChecked={option.checked}
                      />
                      <label htmlFor={`size-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-300">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="block text-slate-300 font-medium">Category</legend>
                <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                   {filters.category.map((option, optionIdx) => (
                            <div
                                 key={option.value}
                                 className="flex items-center text-base sm:text-sm"
                            >
                                <input
                                     id={`category-${optionIdx}`}
                                    name="price[]"
                                     value={option.value}
                                      type="checkbox"
                                       className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-400 focus:ring-indigo-500"
                                      checked={selectedFilters.category.includes(option.value)}
                                       onChange={() => handleFilterChange('category', option.value)}
                                 />
                                  <label htmlFor={`price-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-300">
                                       {option.label}
                                </label>
                        </div>
                    ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="block text-slate-300 font-medium">Sort</legend>
                <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                  {filters.sorts.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center text-base sm:text-sm">
                      <input
                        id={`sorts-${optionIdx}`}
                        name="sorts[]"
                        defaultValue={option.value}
                        type="checkbox"
                        checked={selectedFilters.sorts.includes(option.value)}
                        className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-400 focus:ring-indigo-500"
                        defaultChecked={option.checked}
                        onChange={() => handleFilterChange('sorts', option.value)}
                      />
                      <label htmlFor={`price-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-300">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="w-full">
                        <button
                                type="button"
                                onClick={handleFormSubmit}
                                className=" w-full  mt-10 cursor-pointer items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Apply Filters
                            </button>
            </div>
            </form>
          {/* </div> */}
        </Disclosure.Panel>
      </Disclosure>
    </div>
    </div>
  )
}

export default Filters