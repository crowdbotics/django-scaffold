import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';

// sidebar nav config
import {loggedRoutes, publicRoutes} from '../../_nav';
// routes config
import routes from '../../routes';
import * as emailAuthActions from '../../features/EmailAuth/redux/actions';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navItems: publicRoutes
    };
  }

  authCheck() {
    if (!this.props.loggedIn) {
      this.setState({
        navItems: publicRoutes
      })
      this.props.history.push(`/login`);
    } else {
      this.setState({
        navItems: loggedRoutes
      })
    }
  }

  componentDidMount() {
    this.authCheck()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.loggedIn !== prevProps.loggedIn) {
      this.authCheck()
    }
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut = async (e) => {
    const { logout } = this.props;
    await logout();
    this.props.history.push(`/login`);
  }

  render() {

    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={this.state.navItems} {...this.props} router={router}/>
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/welcome" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.EmailAuth.loggedIn,
});

const mapDispatchToProps = {
  logout: emailAuthActions.logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefaultLayout);
