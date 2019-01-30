import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import LoginPage from './LoginPage';
import HomePage from './HomePage';

const RouterConfig = ({ history }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" exact component={LoginPage} />
        <Route path="/" exact component={HomePage} />
      </Switch>
    </Router>
  );
};

export default RouterConfig;
