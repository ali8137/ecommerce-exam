import { Button } from '@mui/material'
import PropTypes from 'prop-types'
import { /*useAppDispatch,*/ useAppSelector } from '@/redux/store'
import { useRouter } from 'next/navigation'

const CartOrderSummary = () => {
  const { subTotalPrice } = useAppSelector((store) => store.cart) as {
    subTotalPrice: number
  }

  const router = useRouter()

  // const dispatch = useAppDispatch()

  return (
    <>
      <h3 className="text-xl font-semibold mt-6 pb-3">Order Summary</h3>
      {/* TODO: might choose to add a bag or cart icon here later  */}
      <hr />
      <div className="space-y-2">
        <div className="flex justify-between font-semibold">
          <p>subtotal</p>
          <div>${subTotalPrice}</div>
        </div>
        <div className="flex justify-between font-semibold">
          <p>tax</p>
          <div>$0</div>
        </div>
        <div className="flex justify-between font-semibold pb-2">
          <p>delivery/shipping</p>
          <div>$0</div>
        </div>
        <hr />
        <div className="flex justify-between font-bold text-xl mt-4">
          <p>Order total</p>
          <div>${subTotalPrice}</div>
        </div>
          <div className="pt-4">
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ width: '100%' }}
              onClick={() => {
                router.push('/')
              }}
            >
              Checkout
            </Button>
          </div>
      </div>
    </>
  )
}

CartOrderSummary.propTypes = {
  onNext: PropTypes.func,
}

export default CartOrderSummary
