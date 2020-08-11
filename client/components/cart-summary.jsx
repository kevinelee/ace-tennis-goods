import React from 'react';
import CartSummaryItem from './cart-summary-item';

const CartSummary = props => {
  // props turns into an array of cart items

  // props.cart = this.state.cart

  const { cart } = props;

  const priceMap = cart.map(item => {
    return item.price;
  });
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const total = priceMap.reduce(reducer);

  return (
    <div>
      <button
        onClick={() => {
          props.setView('catalog');
        }}
      >
        @Back to Catalog
      </button>
      <div>
        {cart && cart.length > 0 ? (
          cart.map(item => {
            return <CartSummaryItem key={item.cartItemId} cartItem={item} />;
          })
        ) : (
          <p>No items in cart</p>
        )}
      </div>
      <div>Total Price: ${total * 0.01}</div>
    </div>
  );
};

export default CartSummary;
