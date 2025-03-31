'use client'

import { isUserAuthenticated } from '@/redux/features/authentication/authSlice'
import { AppDispatch } from '@/redux/store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'


// TODO: checking whether the user is authenticated could be done better by doing the 
// check before the any mounting of the app happens, by for example storing the token in a 
// cookie instead and using SSR rendeing in ths case
const AuthProvider = () => {
  const dispatch = useDispatch<AppDispatch>()

  const router = useRouter()

  useEffect(() => {
    // const token: string = localStorage.getItem('token') as string;
    const token: string = localStorage.getItem('token') || ''

    // if (!token) {
    //   // navigate to login page
    //   router.push('/login')
    // }

    const checkAuth = async () => {


      // console.log('token', token as string || 'no token')

      //   setIsLoading(true)
      try {
        const isAuthenticated: boolean = await dispatch(
          isUserAuthenticated({token})
        ).unwrap()

        // console.log('isAuthenticated', isAuthenticated)

        if (!isAuthenticated) {
          // navigate to login page
          router.push('/login')
        }
      } catch (error) {
        // setError(error)
        console.error(error)
      } finally {
        // setIsLoading(false)
      }
    }

    checkAuth()
  }, [dispatch, router])

  return null // this component render nothing
}

export default AuthProvider
