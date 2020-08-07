import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div style={{ backgroundColor: '#343A40', color: 'white' }}>
        <div style={{ display: 'flex', margin: '0 auto', justifyContent: 'space-between', alignItems: 'center', width: '95%' }}>
          <h1 style={{ backgroundColor: '#343A40', color: 'white' }}>
            $ Wicked Sales
          </h1>
          <h4>cartIcon: {this.props.cardItemcount}</h4>
        </div>
      </div>
    );
  }
}
