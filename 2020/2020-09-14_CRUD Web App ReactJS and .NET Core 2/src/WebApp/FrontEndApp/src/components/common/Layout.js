import React, { Fragment } from 'react';
import Navigation from './Navigation';

export default class Layout extends React.Component {
  render() {
    return (
      <Fragment>
        <Navigation />
        <div className="App">
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}