import React, { Fragment } from 'react';
import Navigation from './Navigation';

export default class Layout extends React.Component {
  render() {
    return (
      <Fragment>
        <Navigation />
        <section className="section">
          <div className="App container">
            {this.props.children}
          </div>
        </section>
      </Fragment>
    );
  }
}