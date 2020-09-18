import React from 'react';

export default class PrimaryButton extends React.Component {
  render() {
    return (
        <button className="button is-primary is-outlined" {...this.props}>
            {this.props.children}
        </button>
    );
  }
}