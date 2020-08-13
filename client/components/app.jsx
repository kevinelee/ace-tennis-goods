import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  addToCart(product) {
    fetch('/api/cart', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then(data => {
        // const updatedCart = [...this.state.cart, data];
        const updatedCart = this.state.cart.concat(data);
        return this.setState({ cart: updatedCart });
      });
  }

  removeFromCart(product) {
    return null;
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => this.setState({ cart: data }));
  }

  setView(name, params) {
    this.setState(() => {
      return { view: { name, params } };
    });
  }

  // order = object with name creditCard and shippingAddress
  placeOrder(order) {
    fetch('/api/orders', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    }).then(res => {
      res.json();
      this.setState({ cart: [] });
      this.setView('catalog', {});
    });
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))

      .catch(err => this.setState({ message: err.message }));
    this.getCartItems();
  }

  render() {
    const { view, cart } = this.state;
    const { name } = view || {};

    return (
      <div>
        <Header cardItemCount={cart && cart.length} setView={this.setView} />

        <br/>

        <div className="container">
          {(() => {
            switch (name) {
              case 'catalog':
                return <ProductList setView={this.setView} />;
              case 'cart':
                return <CartSummary cart={cart} setView={this.setView} />;
              case 'checkout':
                return <CheckoutForm placeOrder={this.placeOrder}/>;
              default:
                return (
                  <ProductDetails
                    params={view.params}
                    setView={this.setView}
                    addToCart={this.addToCart}
                  />
                );
            }
          })()}
        </div>
      </div>
    );
  }
}
