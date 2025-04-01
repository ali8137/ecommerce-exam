'use server'

import axios from 'axios'

// const backendApiUrl: string = process.env.NEXT_PUBLIC_BACKEND_URL

interface categoryType {
  id: string
  title: string
  description: string
  categoryListingOrder: number
}

// send request to nextjs API, which in turn call the backend server 
export async function getCategories(
  params: { authToken?: string } = {}
): Promise<Array<categoryType>> {
  try {
    const { authToken = '' }: { authToken?: string } = params

    if (!authToken) {
      throw new Error('No auth token provided')
    }

    const response = await axios(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken as string}`,
        },
      }
    )

    return response.data
  } catch (error) {
    console.error('error fetching categories: ', error)
    throw error
  }
}

interface productType {
  // id: number
  id: string
  title: string
  description: string
  price: number
}

export async function getProducts(
  params: { authToken?: string; categoryName?: string } = {}
): Promise<Array<productType>> {
  try {
    const {
      authToken = '',
      categoryName = '',
    }: { authToken?: string; categoryName?: string } = params

    if (!authToken) {
      throw new Error('No auth token provided')
    }

    const response = await axios(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products${
        categoryName ? `?categoryName=${encodeURIComponent(categoryName)}` : ''
      }`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken as string}`,
        },
      }
    )

    return response.data
  } catch (error) {
    console.error('error fetching categories: ', error)
    throw error
  }
}