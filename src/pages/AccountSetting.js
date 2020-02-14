import React, { Component } from "react";
// import ManageAccount from "../components/AccountSetting/ManageAccount";

import axios from "axios";
import AccountForm from "../components/AccountSetting/AccountForm";
import ManageAccount from "../components/AccountSetting/ManageAccount";

class AccountSetting extends Component {
  state = {};

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <section id="accountSetting">
        <ManageAccount></ManageAccount>
      </section>
    );
  }
}

export default AccountSetting;
