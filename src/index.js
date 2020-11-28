import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect, HashRouter } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

//redux
import { createStore } from 'redux';
import allReducer from 'lib/redux/reducers'
import { Provider } from 'react-redux';

const store = createStore(
    allReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
export default store;

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <Route path="/admin" render={props => <AdminLayout {...props}/>} />
        <Redirect from="/" to='/auth/login'/>
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
