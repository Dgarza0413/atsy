import React, { useState, useEffect } from 'react'
import { Segment, Divider, Button } from 'semantic-ui-react';
import calculateCartTotal from '../../utils/calculateCartTotal';


function CartSummary({ products }) {
  const [cartAmount, setCartAmount] = useState(0)
  const [stripeAmount, setStripeAmount] = useState(0)
  const [isCartEmpty, setCartEmpty] = useState(false)


  useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products)
    setCartAmount(cartTotal)
    setStripeAmount(stripeTotal)
    setCartEmpty(products.length === 0)
  }, [products])
  return <>
    <Divider />
    <Segment clearing size="large">
      <strong>Sub total:</strong> ${cartAmount}
      <Button
        icon="cart"
        color="teal"
        disabled={isCartEmpty}
        floated="right"
        content="checkout"
      />
    </Segment>
  </>;
}

export default CartSummary;
