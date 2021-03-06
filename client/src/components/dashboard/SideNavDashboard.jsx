import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'proptypes';

import { routeAction } from '../../actions';
import dash from '../../../assets/css/img/dash.jpg';
import holderProfile from '../../../assets/css/img/holder-profile.png';

/**
 * SideNavDashboard
 * @function SideNavDashboard
 *
 * @param {object} props
 *
 * @return {JSX} JSX
 */
const SideNavDashboard = props => (
  <ul className="side-nav" id="dashboard">
    <div id="dash-panel" className="col l3 teal darken-2">
      <div className="teal darken-2">
        <div
          id="profile-page-header"
          className="card teal darken-2 z-depth-0"
        >
          <div className="card-image">
            <img
              className="responsive-img"
              id="dash-img"
              src={dash}
              alt="user-background"
            />
            <figure className="card-profile-image">
              <img
                src={holderProfile}
                className="z-depth-2 responsive-img"
                alt=""
              />
            </figure>
          </div>
          <div id="dash-links">
            <div className="collection">
              <a
                id="dashboard-parent"
                className="collection-item"
              >
                <strong>Dashboard</strong> <span
                  className="right fa fa-user-circle"
                />
              </a>
              <br />
              <div id="myTab" className="tabs-vertical">
                <ul className="tabs">
                  <li className="tab">
                    <a
                      className="white-text"
                      onClick={() => {
                        this.props.routeAction('profile');
                      }}
                    >
                      <i
                        className="fa fa-vcard-o white-text"
                      /> My Profile
                    </a>
                  </li>
                  <li className="tab">
                    <a
                      className="white-text"
                      onClick={() => {
                        props.routeAction('recipes');
                      }}
                    >
                      <i
                        className="fa fa-briefcase white-text"
                      /> My Recipes
                    </a>
                  </li>
                  <li className="tab">
                    <a
                      className="white-text"
                      onClick={() => {
                        props.routeAction('favorites');
                      }}
                    >
                      <i
                        className="fa fa-heart white-text"
                      /> Favorite Recipes
                    </a>
                  </li>
                  <li className="tab">
                    <a
                      className="white-text"
                      href=""
                    >
                      <i
                        className="fa fa-comments-o white-text"
                      /> Notifications
                      <span
                        id="not-badge"
                        className="red new badge"
                      >10</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ul>
);

SideNavDashboard.propTypes = {
  routeAction: PropTypes.func.isRequired,
};

export default connect(null, { routeAction })(SideNavDashboard);
