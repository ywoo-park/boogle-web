import React, { Component } from "react";
import { render } from "react-dom";
import Subject from "../components/DetailSubject/Subject";

function DetailSubject() {
  render = () => {
    return (
      <section id="detailSubject">
        <Subject></Subject>
      </section>
    );
  };
}

export default DetailSubject;
