// import { Button } from '@mui/material'
import CartProduct from './CartProduct'
import CartOrderSummary from './CartOrderSummary'
import { /*useAppDispatch,*/ useAppSelector } from '@/redux/store'
// import { openModal } from '@/redux/features/modal/modalSlice'

interface ProductType {
  id: number | string
  title: string
  description: string
  price: number
}

interface CartItem {
  id: number | string
  quantity: number
  product: ProductType
}

const Cart = () => {
  const { cartItems = [] } = useAppSelector((store) => store.cart) as {
    cartItems: CartItem[]
  }

  // const dispatch = useAppDispatch()

  return (
    <div className="m-10 dark:text-white min-h-screen">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>
      <div className="lg:mx-20 flex flex-col-reverse lg:flex-row lg:justify-between pt-10">
        {/* cart items */}
        <div className="lg:w-3/5 flex flex-col pt-2 mt-24 lg:mt-0 border-t-2 dark:border-gray-700">
          <div>
            {cartItems?.map((product) => (
              <CartProduct key={Number(product.id)} {...product} />
            ))}
          </div>
        </div>
        {/* order summary */}
        <div className="lg:mx-5 px-5 pb-5 lg:w-2/5 lg:self-start flex flex-col border-2 rounded-xl shadow-xl dark:border-gray-700 dark:bg-gray-800">
          <CartOrderSummary />
        </div>
      </div>
    </div>
  )
}

export default Cart
