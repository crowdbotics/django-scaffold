import React, { Component } from 'react';
import { connect } from "react-redux";
import { UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.png'
import sygnet from '../../assets/img/brand/sygnet.png'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {
    // eslint-disable-next-line
    const { loggedIn } = this.props;

    return (
      {% raw %}
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: '100%', height: '100%', alt: 'Crowdbotics' }}
          minimized={{ src: sygnet, width: 25, height: 25, alt: 'Crowdbotics' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="ml-auto" navbar>

          {/* Hide if user is authenticated */}
          {
            loggedIn ?
              <UncontrolledDropdown nav direction="down">
                <DropdownToggle nav>
                <i className="icon-user" style={{width: 100, height: '100%'}}></i>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
                  <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              : null
          }

        </Nav>

        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
      {% endraw %}
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

const mapStateToProps = state => ({
  loggedIn: state.EmailAuth.loggedIn,
})

export default connect(mapStateToProps, null)(DefaultHeader);
