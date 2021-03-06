import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * @summary - SideNav class declaration
 * @class SideNav
 * @extends {Component}
 */
class SideNav extends Component {
  /**
   * Renders the component
   * @method render
   *
   * @returns {JSX} JSX
   */
  render() {
    return (
      <ul className="side-nav teal" id="navlink">
        <li>
          <form>
            <input className="white-text" type="text" placeholder="Search" />
          </form>
        </li>
        <li>
          <Link to="/" className="white-text">Top Recipes</Link>
        </li>
        <li>
          <Link to="/signin" className="white-text">Log In</Link>
        </li>
        <li >
          <Link to="signup" className="white-text">Sign Up</Link>
        </li>
      </ul>
    );
  }
}

export default SideNav;
