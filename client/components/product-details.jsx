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
        // eslint-disable-next-line no-console
        console.log(data);
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
          <LoadingComponent />
        </div>
      );
    }

    return <Product product={product} setView={this.props.setView} addToCart={this.props.addToCart} />;
  }
}

const Product = props => {
  const { product } = props || {};
  const { image, name, price, shortDescription, longDescription } =
    product || {};

  return (
    <div style={{ border: '1px solid black', padding: '30px' }}>
      <button
        onClick={() => props.setView('catalog', {})}
        style={{ border: 'none', backgroundColor: 'white' }}
      >
        @ Back to catalog
      </button>
      <br />
      <div>
        <div className="d-flex" style={{}}>
          <img src={image} alt={name} style={{ width: '40%' }} />
          <div style={{ marginLeft: '20px', width: '50%' }}>
            <h3>{name}</h3>
            <p>${(price / 100).toFixed(2)}</p>
            <p>{shortDescription}</p>
            <button onClick={() => props.addToCart(product)}>
              Add to Cart
            </button>
          </div>
        </div>
        <br />
        <div>
          <p>{longDescription}</p>
        </div>
      </div>
    </div>
  );
};
