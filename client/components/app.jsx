import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {},
        cart: []
      }
    };
    this.setView = this.setView.bind(this);
  }

  setView(name, params) {
    this.setState(() => {
      return { view: { name, params } };
    });
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }));
  }

  render() {
    const { view } = this.state;

    return (
      <div>
        <Header />
        <div className="container">
          {view.name === 'catalog' ? (
            <ProductList setView={this.setView} />
          ) : (
            <ProductDetails params={view.params} setView={this.setView}/>
          )}
        </div>
      </div>
    );
  }
}
