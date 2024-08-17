import React from 'react'

function ProductCardSkeleton() {
  return (
    <div className="bg-background text-white dark rounded-lg shadow-lg overflow-hidden w-full max-w-sm animate-pulse">
      <div className="aspect-[4/3] bg-gray-300 w-400 h-300"></div>
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-300 rounded w-1/4"></div>
          <div className="h-8 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  )
}

export default ProductCardSkeleton
