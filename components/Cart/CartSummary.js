import React, { useState, useEffect } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { Segment, Divider, Button } from 'semantic-ui-react';
import calculateCartTotal from '../../utils/calculateCartTotal';

function CartSummary({ products, handleCheckout, success }) {
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
      <StripeCheckout
        name="React Reserve"
        amount={stripeAmount}
        image={products.length > 0 ? products[0].product.mediaUrl : ''}
        currency="USD"
        billingAddress={true}
        shippingAddress={true}
        zipCode={true}
        stripeKey="pk_test_YhGdbjxBmjeiKlcpOd7oy10U00uejKmS4w"
        token={handleCheckout}
        triggerEvent="onClick"
      >
        <Button
          icon="cart"
          color="teal"
          disabled={isCartEmpty || success}
          floated="right"
          content="checkout"
        />
      </StripeCheckout>
    </Segment>
  </>;
}

export default CartSummary;
