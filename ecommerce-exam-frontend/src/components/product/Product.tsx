import { Button } from '@mui/material'
import React from 'react'

interface productProps {
  id: number
  title: string
  description: string
  price: number
  // categoryId: number
}

// const handleClick = () => {
//   console.log('category clicked')
// }

const Product = (prop: productProps) => {
  const { title, description, price/*, categoryId*/ }: productProps = prop

  
  const addToCart = () => {
    console.log('product added to cart')

    // use redux toolkit to call the function to add the product to the cart
  }

  
  // const Wrapper: React.ElementType = price !== undefined ? 'div' : 'Link' // use <div> in case of product card, <a> in case of category card

  return (
    <div
      role="button"
      tabIndex={0}
      // onClick={handleClick}
      // onKeyDown={(e) => {
      //   if (e.key === 'Enter' || e.key === ' ') handleClick()
      // }}
      className="relative bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700 overflow-hidden group"
    >
      
      <div className="absolute top-6 right-7">
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={addToCart}
        >
          Add to Cart
        </Button>
      </div>

      {/* TODO: replace the below code with <Card> component and use context api to pass the props down */}
      <div className="absolute " />
      <div className="flex-1 pl-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
        {price !== undefined && (
          <p className="text-gray-600 dark:text-gray-300 text-right">
            {price}$
          </p>
        )}
      </div>
    </div>
  )
}

export default Product