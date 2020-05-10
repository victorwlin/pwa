import React, { useContext } from 'react';
import { Router } from "@reach/router";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import PasswordReset from "./PasswordReset";
import Tracking from './Tracking/Tracking';

import { UserContext } from "../providers/UserProvider";


function Application() {
  const user = useContext(UserContext);
  
  return (
    user ?
    <Tracking /> :
    <Router>
      <SignIn path="/" />
      <SignUp path="signUp" />
      <PasswordReset path="passwordReset" />
    </Router>
  );
}

export default Application;
