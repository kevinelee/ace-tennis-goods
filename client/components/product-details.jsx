import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: null };
  }

  componentDidMount() {
    fetch('/api/products/1')
      .then(res => {
        return res.json();
      })
      .then(data => {
        // eslint-disable-next-line no-console
        console.log(data);
      });
  }

  render() {
    return null;
  }
}
