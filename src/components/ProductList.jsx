import React from 'react'
import { Link } from 'react-router-dom'

const ProductList = ({products}) => {

  return (
    <div className="w-full min-h-screen bg-[#020202] mt-10">
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 id="products-heading" className="sr-only">
        Products
      </h2>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {products.map((product) => (
          <Link key={product?.id} to={`/product/${product?._id}`} className="group">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2">
              <img
                src={product?.photos[0]}
                alt={product.imageAlt}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
              <h3 className="text-slate-200">{product?.name}</h3>
              <p className="text-slate-200">₹ {product?.price}</p>
            </div>
            <p className="mt-1 text-sm italic text-gray-400">{product?.description}</p>
          </Link>
        ))}
      </div>
    </div>
  </div>
  )
}

export default ProductList