// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
// import { Button } from '@mui/material'
// import { useAppDispatch } from '@/redux/store'

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

const CartProduct = (prop: CartItem) => {
  const { quantity, product }: CartItem = prop

  const { title, /*description,*/ price } = product

  // const dispatch = useAppDispatch()

  return (
    <div className="flex flex-row gap-4 ml-3 border-b">
      <div className="lg:relative w-3/5 mt-5">
        <h3 className="font-semibold">{title}</h3>
        <div className="mt-5 ">
          <span className="font-bold">${price}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <div>{quantity}</div>
      </div>
    </div>
  )
}

export default CartProduct
