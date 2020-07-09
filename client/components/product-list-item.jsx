import React from 'react';

export default class ProductListItem extends React.Component {

  render(props) {
    return (
      <div className="card" style={{ width: '18rem' }}>
        <img src={this.props.img} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{this.props.name}</h5>
          <p className="card-text">
          ${(this.props.price / 100).toFixed(2)}
          </p>
          <p className="card-text">
            {this.props.description}
          </p>
        </div>
      </div>
    );
  }
}
