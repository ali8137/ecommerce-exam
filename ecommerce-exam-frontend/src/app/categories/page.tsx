// TODO: it would better to remove this, and import the token from the store of the redux toolkit
'use client'

import Category from '@/components/category/Category'
import { getCategories } from '@/redux/features/category/categorySlice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
// import { getCategories } from '@/utils/api'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

// fetching of the categories, and server-side rendering them

interface categoryType {
  id: string
  title: string
  description: string
}

const CategoryContainer = () => {
  // const [categories, setCategories] = useState<categoryType[]>([])
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  const {categories}: {categories: categoryType[]} = useAppSelector((state) => state.category)

  console.log('categories', categories)

  const [
    error
    // , setError
  ] = useState<string | null>(null)

  const router = useRouter()

  const dispatch = useAppDispatch()

  useEffect(() => {
    // TODO:[wrong: redux toolkit management happens at the client side also] it would be better to remove this, and
    //  import the token from the store of the redux toolkit. and
    //  remove all the code inside this useEffect() into a function defined above and outside this component
    const token = localStorage.getItem('token')

    if (!token) {
      router.push('/login')
      return
    }

    // the below async could be removed
    const fetchCategories = async (): Promise<void> => {


      dispatch(getCategories({ authToken: token }))

      // // setIsLoading(true);
      // try {
      //   const responseData: categoryType[] = await getCategories({
      //     authToken: token,
      //   })

      //   console.log('Fetched categories:', responseData)

      //   setCategories(responseData as categoryType[])
      // } catch (err) {
      //   setError('An error occurred while fetching categories.')
      //   console.error(err)
      // } finally {
      //   // setIsLoading(false);
      // }
    }

    fetchCategories()
  }, [dispatch, router])

  return (
    <>
      {error ? (
        <p className="text-red-500 text-center my-4">{error}</p>
      ) : (
        <div className="flex flex-col gap-4 p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
          {categories?.map((category) => (
            // <Category key={category.id as number} {...category} />
            // <Category key={Number(category.id)} {...category} />
            <Category key={category.id as string} {...category} />
          ))}
        </div>
      )}
    </>
  )
}

export default CategoryContainer
