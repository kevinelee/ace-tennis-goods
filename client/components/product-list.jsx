import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        this.setState(() => {
          // eslint-disable-next-line no-console
          console.log(data);
          return { products: data };
        });
      }).catch(err => console.error(err));
  }

  renderProducts() {
    const { products } = this.state;
    const productsList = products.map(product => {
      return (
        <ProductListItem
          key={product.productId}
          img={product.image}
          name={product.name}
          price={product.price}
          id={product.productId}
          description={product.shortDescription}
          setView={this.props.setView}/>
      );
    });
    return productsList;
  }

  render() {
    return (
      <div className='d-flex flex-wrap justify-content-around'>
        {this.renderProducts()}
      </div>
    );
  }
}
