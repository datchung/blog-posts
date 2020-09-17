import React from 'react';
import { Link } from "react-router-dom";

export default class Navigation extends React.Component {
  toggleBurgerMenu() {
    document.querySelector('.navbar-menu').classList.toggle('is-active');
  }
  
  render() {
    return (
      <nav className="navbar has-background-light" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item is-size-5 has-text-weight-semibold">React App</Link>

          <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasic"
            onClick={this.toggleBurgerMenu}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasic" className="navbar-menu">
          <div className="navbar-start">
            <Link to="/about" className="navbar-item" onClick={this.toggleBurgerMenu}>About</Link>
            <Link to="/notes" className="navbar-item" onClick={this.toggleBurgerMenu}>Notes</Link>
          </div>
        </div>
      </nav>
    );
  }
}