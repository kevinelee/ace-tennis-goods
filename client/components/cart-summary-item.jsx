import React from 'react';

const CartSummaryItem = props => {
  const { image, name, price, shortDescription } = props.cartItem;

  return (
    <div>
      <div>
        <div className="d-flex" style={{ border: '1px solid black', padding: '30px' }}>
          <img src={image} alt={name} style={{ width: '40%', maxHeight: '490px', objectFit: 'contain' }} />
          <div style={{ marginLeft: '20px', width: '50%' }}>
            <h3>{name}</h3>
            <p>${(price / 100).toFixed(2)}</p>
            <p>{shortDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummaryItem;
