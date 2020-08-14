import React from 'react';
// import {} from '../../server/public/images/ace'

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
            width: '95%'
          }}
        >
          <h1
            onClick={() => this.props.setView('catalog', {})}
            style={{ backgroundColor: 'red', color: 'white', fontStyle: 'italic' }}
          >
            ACE TENNIS GOODS
          </h1>
          {/* <img src="../../server/public/images/ace-tennis-goods-banner.png" alt="banner"/> */}
          <h4
            onClick={() => this.props.setView('cart', {})}
          >
            Cart: {this.props.cardItemCount} Item(s)
          </h4>
        </div>
      </div>
    );
  }
}
