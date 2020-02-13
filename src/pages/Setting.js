import React, { Component } from "react";
import axios from "axios";
import SettingMenu from "../components/Setting/SettingMenu";

class Setting extends Component {
  state = {};

  render() {
    return (
      <section id="setting">
        <SettingMenu></SettingMenu>
      </section>
    );
  }
}

export default Setting;
