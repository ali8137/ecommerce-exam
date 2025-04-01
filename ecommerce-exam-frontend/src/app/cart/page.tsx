'use client'

import Cart from '@/components/cart/Cart'
// import Modal from '@/components/cart/Modal'
import { getCartItems } from '@/redux/features/cartSlice/cartSlice'
import { useAppDispatch/*, useAppSelector*/ } from '@/redux/store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const CartContainer = () => {
  // const { token }: { token: string | null } = useAppSelector(
  //   (store) => store.auth
  // )

  const dispatch = useAppDispatch()

  const router = useRouter()

  useEffect(() => {
    // TODO:[wrong: redux toolkit management happens at the client side also] it would be better to remove this, and
    // import the token from the store of the redux toolkit. and
    //  remove all the code inside this useEffect() into a function defined above and outside this component
    const token = localStorage.getItem('token')

    // TODO: we can also call isUserAuthenticated() here to check if the user is logged in or not
    if (!token) {

      console.log("token", token)
      router.push('/login')
      return
    }

    // fetch cart items:
    dispatch(
      getCartItems({
        authToken: token,
      })
    )
  }, [dispatch, router])

  return (
    <>
      {/* <Modal /> */}
      <Cart />
    </>
  )
}

export default CartContainer
