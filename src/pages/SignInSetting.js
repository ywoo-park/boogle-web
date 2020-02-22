import React, { Component } from "react";
import axios from "axios";
import ModifyAuth from "../components/SigninSetting/ModifyAuth";

class SigninSetting extends Component {
  state = {};

  render() {
    return (
      <section id="signInSetting">
        <ModifyAuth></ModifyAuth>
      </section>
    );
  }
}

export default SigninSetting;
