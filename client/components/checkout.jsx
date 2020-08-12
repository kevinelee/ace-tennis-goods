import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      address: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleCardChange(e) {
    this.setState({ creditCard: e.target.value });
  }

  handleAddressChange(e) {
    this.setState({ address: e.target.value });
  }

  render() {

    const { name, creditCard, address } = this.state;

    return (
      <div>
        <p>Checkout Page Stuff</p>
        <form action="">

          <label htmlFor="name">
            <input type="text" value={name} onChange={this.handleNameChange}/>
          </label>

          <label htmlFor="credit-card">
            <input type="text" value={creditCard} onChange={this.handleCardChange}/>
          </label>

          <label htmlFor="address">
            <input type="textarea" value={address} onChange={this.handleAddressChange}/>
          </label>
          <button onClick={() => this.props.placeOrder(this.state)}>Place Order</button>
        </form>
      </div>
    );
  }
}
