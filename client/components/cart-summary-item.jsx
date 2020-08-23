import React from 'react';

const CartSummaryItem = props => {
  const { image, name, price, shortDescription } = props.cartItem;

  return (
    <div>
      <div>
        <div className="d-flex product-detail-item" style={{ border: '1px solid black', padding: '30px', minWidth: '200px', borderRadius: '5px' }}>
          <img className="product-detail-item-image" src={image} alt={name}/>
          <div className="product-detail-item-div">
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
