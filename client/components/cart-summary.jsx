import React from 'react';
import CartSummaryItem from './cart-summary-item';

const CartSummary = props => {
  // props turns into an array of cart items

  // props.cart = this.state.cart

  const { cart } = props;

  return (
    <div>
      <button onClick={() => { props.setView('catalog'); }}>@Back to Catalog</button>
      <div>
        {cart && cart.length > 0 ? (
          cart.map(item => {
            return <CartSummaryItem key={item.cartItemId} cartItem={item}/>;
          })
        ) : (
          <p>No items in cart</p>
        )}
      </div>
    </div>
  );
};

export default CartSummary;
