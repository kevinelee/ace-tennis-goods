import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleCardChange(e) {
    this.setState({ creditCard: e.target.value });
  }

  handleAddressChange(e) {
    this.setState({ shippingAddress: e.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // const { name, creditCard, address } = this.state;

    // if (name && creditCard && address) {
    this.props.placeOrder(this.state);
    // }
  }

  render() {
    const { name, creditCard, address } = this.state;

    return (
      <div>
        <h1>Checkout</h1>
        <form className="checkout-form" onSubmit={this.handleSubmit}>
          <label htmlFor="name">
            Name:
            <input
              type="text"
              value={name}
              onChange={this.handleNameChange}
              required
            />
          </label>

          <label htmlFor="credit-card">
            Credit Card:
            <input
              type="text"
              value={creditCard}
              onChange={this.handleCardChange}
              required
            />
          </label>

          <label htmlFor="address">
            Address:
            <input
              type="textarea"
              value={address}
              onChange={this.handleAddressChange}
              required
            />
          </label>
          <input type="submit" />

        </form>
      </div>
    );
  }
}
