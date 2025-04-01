import Link from 'next/link'
import React from 'react'

interface categoryProps {
  id: string
  title: string
  description: string
  // price?: number
  isAdmin?: boolean
}

// const handleClick = () => {
//   console.log('category clicked')
// }

const Category = (prop: categoryProps) => {
  const { title, description/*, price, isAdmin = false */}: categoryProps = prop

  // const Wrapper: React.ElementType = price !== undefined ? 'div' : 'Link' // use <div> in case of product card, <a> in case of category card


  // console.log('isAdmin', isAdmin)


  return (
    <Link
      href={`/categories/${title.toLowerCase()}`}
      passHref
      role="button"
      tabIndex={0}
      // onClick={handleClick}
      // onKeyDown={(e) => {
      //   if (e.key === 'Enter' || e.key === ' ') handleClick()
      // }}
      className="relative bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700 overflow-hidden group"
    >
      {/* TODO: replace the below code with <Card> component and use context api to pass the props down */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
        <div className="flex-1 pl-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
          {/* {price !== undefined && (
            <p className="text-gray-600 dark:text-gray-300 text-right">
              {price}$
            </p>
          )} */}
        </div>
    </Link>
  )
}

export default Category
