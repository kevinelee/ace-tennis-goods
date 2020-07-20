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

    return (
      <Product product={product}/>
    );
  }
}

const Product = props => {
  const { product } = props || {};
  const { image, name } = product || {};

  return (
    <div>
      <button>Back to catalog</button>
      <div>
        <img src={image} alt={name} />
        <h3>{name}</h3>
      </div>
      <div>LONG DESCRIPTION</div>
    </div>
  );
};
