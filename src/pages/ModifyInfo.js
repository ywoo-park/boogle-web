import React, { Component } from "react";
import axios from "axios";
import ModifyInfoForm from "../components/ModifyInfo/ModifyInfoForm";

class ModifyInfo extends Component {
  state = {};

  render() {
    return (
      <section id="modifyInfo">
        <ModifyInfoForm></ModifyInfoForm>
      </section>
    );
  }
}

export default ModifyInfo;
