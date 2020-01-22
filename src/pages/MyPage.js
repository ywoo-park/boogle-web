import React, { Component } from "react";
import FullMyPage from "../components/MyPage/FullMyPage";

import axios from "axios";

class MyPage extends Component {
  state = {};

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <section id="mypage">
        <FullMyPage></FullMyPage>
      </section>
    );
  }
}

export default MyPage;
