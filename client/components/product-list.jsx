import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
    this.getProducts = this.getProducts.bind(this);
    this.viewProduct = this.viewProduct.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        this.setState(() => {
          return { products: data };
        });
      })
      .catch(err => console.error(err));
  }

  viewProduct(product) {
    this.props.setView('details', { productId: product.productId });
  }

  renderProducts() {
    const { products } = this.state;
    const productsList = products.map(product => {
      return (
        <div key={product.productId} className="col-md-4 fade-in">
          <ProductListItem
            key={product.productId}
            product={product}
            viewProduct={this.viewProduct}
          />
        </div>
      );
    });
    return productsList;
  }

  render() {
    return <div className="row">{this.renderProducts()}</div>;
  }
}
