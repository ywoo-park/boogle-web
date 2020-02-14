import React, { Component } from "react";
// import ManageAccount from "../components/AccountSetting/ManageAccount";

import axios from "axios";
import AccountForm from "../components/AccountSetting/AccountForm";

class AccountSetting extends Component {
  state = {};

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <section id="accountSetting">
        <AccountForm></AccountForm>
      </section>
    );
  }
}

export default AccountSetting;
