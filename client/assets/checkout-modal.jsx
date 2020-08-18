import React from 'react';

export default class CheckoutModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { display: 'none' };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleConfirm() {
    this.setState({ display: '' });
  }

  handleCancel() {
    this.setState({ display: 'none' });
  }

  render() {
    return (
      <div
        className="new-post-modal"
        style={{ display: `${this.state.display}` }}
      >
        <div className="new-post-modal-content">
          Would you like to exit checkout?
          <div>
            <button
              className="yes-button"
              onClick={() => this.props.setView('catalog', {})}
            >
              Yes
            </button>
            <button className="cursor-pointer" onClick={() => this.handleCancel}>
              No
            </button>
          </div>
        </div>
      </div>
    );
  }
}
