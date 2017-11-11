import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutAction } from '../actions';

import { DashboardNavbar } from './headers/Index';
import {
  DashboardPanel,
  SideNavDashboard,
  UserRecipe,
  UserFavoriteRecipe,
  UserProfile } from './dashboard/Index';
import { DeleteModal, NewPostModal, EditPostModal } from './modals/Index';

class DashboardPage extends Component {
  render() {
    return (
      <div>
        <DashboardNavbar { ...this.props }/>
        <div className="row">
          <DashboardPanel />
          <UserProfile />
          <UserRecipe />
          <UserFavoriteRecipe />
        </div>
        <DeleteModal />
        <NewPostModal />
        <EditPostModal />
        <SideNavDashboard />
      </div>
    );
  }
}

const mapStateToProps = ({ signinState }) => {
  return { 
    user: signinState.user,
    isAuthenticated: signinState.isAuthenticated
  }
}

export default connect(mapStateToProps, { logoutAction })(DashboardPage);