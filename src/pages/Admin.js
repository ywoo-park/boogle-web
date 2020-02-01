import React, { Component } from "react";
import DashBoard from "../components/Admin/DashBoard";

import axios from "axios";

class Admin extends Component {
  state = {};

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <section id="admin">
        <DashBoard></DashBoard>
      </section>
    );
  }
}

export default Admin;
