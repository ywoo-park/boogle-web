import React, { Component } from "react";
import ManageAccount from "../components/AccountSetting/ManageAccount";

import axios from "axios";

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
