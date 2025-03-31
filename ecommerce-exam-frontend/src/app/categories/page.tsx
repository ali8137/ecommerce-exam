'use client'

import Category from '@/components/category/Category'
import { getCategories } from '@/utils/api'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

// fetching of the categories, and server-side rendering them

interface categoryType {
  id: number
  title: string
  description: string
}

const CategoryContainer = () => {
  const [categories, setCategories] = useState<categoryType[]>([])
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      router.push('/login')
      return
    }

    const fetchCategories = async (): Promise<void> => {
      // setIsLoading(true);
      try {
        const responseData: categoryType[] = await getCategories({
          authToken: token,
        })

        console.log('Fetched categories:', responseData)

        setCategories(responseData as categoryType[])
      } catch (err) {
        setError('An error occurred while fetching categories.')
        console.error(err)
      } finally {
        // setIsLoading(false);
      }
    }

    fetchCategories()
  }, [router])

  return (
    <>
      {error ? (
        <p className="text-red-500 text-center my-4">{error}</p>
      ) : (
        <div className="flex flex-col gap-4 p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
          {categories?.map((category) => (
            // <Category key={category.id as number} {...category} />
            <Category key={Number(category.id)} {...category} />
          ))}
        </div>
      )}
    </>
  )
}

export default CategoryContainer
