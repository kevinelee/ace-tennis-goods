import React from 'react';

export default class ProductListItem extends React.Component {
  render() {
    const { product, viewProduct } = this.props || {};
    const { name, price, image } = product || {};

    return (
      <div
        className="card product-card"
        style={{
          maxHeight: 'fit-content',
          borderRadius: '10px',
          marginBottom: '24px'
        }}
      >
        <img
          src={image}
          className="card-img-top product-image"
          alt="..."
          style={{ objectFit: 'contain', height: '10rem', padding: '16px' }}
        />
        <div className="card-body">
          <div className="card-body__top">
            <h5 className="card-title">{name}</h5>
          </div>
          <div className="card-body__bottom">
            <p className="card-text">${(price / 100).toFixed(2)}</p>
            <p className="card-text">
              {/* {this.props.description} */}
              <button
                className="view-details-button"
                onClick={() => viewProduct(product)}
              >
                View Product
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
