'use client'

import Product from '@/components/product/Product'
import { getProducts } from '@/utils/api'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

// fetching of the categories, and server-side rendering them

interface productType {
  id: number
  title: string
  description: string
}

const ProductContainer = () => {
  const [products, setProducts] = useState<productType[]>([])
//   const [products, setProducts] = useState<Array(productType)>([])
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const {categoryName} = useParams();
  const decodedCategory = decodeURIComponent(categoryName as string)

  // console.log("categoryName", categoryName);

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      router.push('/login')
      return
    }

    const fetchProducts = async (): Promise<void> => {
      // setIsLoading(true);
      try {
        const responseData: productType[] = await getProducts({
          authToken: token,
          categoryName: decodedCategory as string,
        })

        console.log('Fetched products:', responseData)

        setProducts(responseData as productType[])
      } catch (err) {
        setError('An error occurred while fetching categories.')
        console.error(err)
      } finally {
        // setIsLoading(false);
      }
    }

    fetchProducts()
  }, [decodedCategory, router])

  return (
    <>
      {error ? (
        <p className="text-red-500 text-center my-4">{error}</p>
      ) : (
        <div className="flex flex-col gap-4 p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
          {products?.map((product) => (
            // <Category key={category.id as number} {...category} />
            <Product key={Number(product.id)} {...product} />
          ))}
        </div>
      )}
    </>
  )
}

export default ProductContainer
