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

  let total = 0;

  if (priceMap.length > 0) {
    total = priceMap.reduce(reducer);
  }

  return (
    <div className="fade-in">
      <button
        onClick={() => {
          props.setView('catalog');
        }}
        style={{ border: 'none', backgroundColor: 'white', padding: '5px' }}
        className="btn btn-3"
      >
        &lt; Back to Catalog
      </button>
      <div>
        {cart && cart.length > 0 ? (
          cart.map(item => {
            return <CartSummaryItem key={item.cartItemId} cartItem={item} />;
          })
        ) : (
          <div className="no-cart-item">
            <h1>No items in cart!</h1>
          </div>
        )}
      </div>

      <br />

      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <div style={{ margin: '16px', fontSize: '24px', fontWeight: '500' }}>Total Price: ${total * 0.01}</div>
        <button
          onClick={total > 0 ? () => props.setView('checkout', {}) : null}
          style={{
            backgroundColor: '#141518',
            color: 'white',
            border: 'none',
            height: '50px',
            width: '250px',
            borderRadius: '5px',
            fontSize: '16px',
            marginBottom: '16px'
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
