import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './components/App';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

export const Routes = () => (
    <Switch>
      <PrivateRoute exact path='/' component={App}/>
      <Route exact path='/login' component={Login} />
    </Switch>
);
export default Routes;

function requireAuth() {
  let loggedIn = localStorage.getItem('authenticated');
  if(!loggedIn) {
    return false;
  } else {
    return true;
  }
}

const PrivateRoute = ({ component: Component}) => (
  <Route
    render={props =>
      requireAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      )
    }
  />
);