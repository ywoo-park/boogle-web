import React, { Component } from "react";
import SignUpForm from "../components/SignUp/SignUpForm";

import axios from "axios";

class SignUp extends Component {
  state = {};

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <section id="signUp" >
        <SignUpForm></SignUpForm>
      </section>
    );
  }
}

export default SignUp;
