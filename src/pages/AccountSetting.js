import React, { Component } from "react";
import axios from "axios";
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
