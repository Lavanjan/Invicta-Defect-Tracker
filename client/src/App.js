import React, { Fragment } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, BrowserRouter } from "react-router-dom";

import Layout from "./layouts/Layouts";
import SignInForm from "./components/authentication/SignIn";
import Signup from "./components/authentication/Signup";
import ConfirmEmail from './components/authentication/ConfirmEmail';
import ActivateAccount from './components/authentication/ActivateAccount';
import Reset from './components/authentication/Reset';
import NewPassword from './components/authentication/NewPassword';

function App() {
  return (
    <Fragment>
      <Route exact path = "/" component = {SignInForm} />
      <Route path = "/account-activation/:token" component = {ActivateAccount} />
      <Route path = "/sign-up" component = {Signup} />
      <Route path = "/confirm-email-address" component = { ConfirmEmail } />
      <Route exact path = "/reset" component = { Reset } />
      <Route path = "/reset/:token" component = { NewPassword } />
        {/* <Layout /> */}
    <Route exact path = "/home" component = { Layout } />
    </Fragment>
  );
}

export default App;
