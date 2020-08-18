import React from 'react';
// import CheckoutModal from '../assets/checkout-modal';

export default class Header extends React.Component {
  render() {
    return (
      <div style={{ backgroundColor: 'red', color: 'white' }}>
        <div
          style={{
            display: 'flex',
            margin: '0 auto',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '95%',
            flexWrap: 'wrap'
          }}
        >
          <img
            onClick={
              this.props.view === 'checkout'
                ? null // change this to <CheckoutModal/> ?
                : () => this.props.setView('catalog', {})
            }
            src="/images/ace-tennis-goods-banner.png"
            alt="banner"
            style={{ padding: '10px', cursor: 'pointer', maxWidth: '50%' }}
          />
          <h4 style={{ cursor: 'pointer' }} onClick={() => this.props.setView('cart', {})}>
            Cart: {this.props.cardItemCount} Item(s)
          </h4>
        </div>
      </div>
    );
  }
}
