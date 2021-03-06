import React from 'react';
import { LoadingComponent } from '../assets/Svg';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: null };
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.params.productId}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState(() => {
          return { product: data };
        });
      });
  }

  render() {
    const { product } = this.state;

    if (!product) {
      return (
        <div
          style={{
            height: '300px',
            width: '300px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <LoadingComponent className="center" />
        </div>
      );
    }

    return (
      <Product
        product={product}
        setView={this.props.setView}
        addToCart={this.props.addToCart}
      />
    );
  }
}

const Product = props => {
  const { product } = props || {};
  const { image, name, price, shortDescription } = product || {};

  return (
    <div
      style={{ border: '1px solid black', padding: '30px' }}
      className="fade-in"
    >
      <button
        onClick={() => props.setView('catalog', {})}
        style={{ border: 'none', backgroundColor: 'white' }}
        className="btn btn-3"
      >
        &lt; Back to Catalog
      </button>
      <br />
      <div>
        <div className="d-flex product-detail-item">
          <img src={image} alt={name} className="product-detail-item-image" />
          <div className="product-detail-item-div">
            <h3>{name}</h3>
            <p>${(price / 100).toFixed(2)}</p>
            <p>{shortDescription}</p>
            <button
              onClick={() => props.addToCart(product)}
              className="add-to-cart-button"
            >
              ADD TO CART
            </button>
          </div>
        </div>
        {/* <br />
        <div>
          <p>{longDescription}</p>
        </div> */}
      </div>
    </div>
  );
};
