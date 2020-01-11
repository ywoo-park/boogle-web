import React, { Component } from "react";
import SignInForm from "../components/SignIn/SignInForm";

import axios from "axios";

class SignIn extends Component {
  state = {};

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <section id="signIn">
        <SignInForm></SignInForm>
      </section>
    );
  }
}

export default SignIn;
