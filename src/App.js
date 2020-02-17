import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Sell from "./pages/Sell";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import DetailSubject from "./pages/DetailSubject.js";
import MyPage from "./pages/MyPage";
import CustomerInquiry from "./pages/CustomerInquiry";
import CustomerCenterPage from "./pages/CustomerCenterPage";
import ModifyInfo from "./pages/ModifyInfo";
import BoxCheckPage from "./pages/BoxCheckPage";
import BoxInputPage from "./pages/BoxInputPage";

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

class App extends Component {
  render() {
    if (isMobile) {
      return (
        <Router>
          <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/sell" component={Sell} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="mypage" component={MyPage} />
          <Route path="/buy/detail/:id" component={DetailSubject} />
          <Route path="/mypage" component={MyPage}/>
          <Route path="/customerinquiry" component={CustomerInquiry}/>
          <Route path="/customercenter" component={CustomerCenterPage}/>
          <Route path="/modifyInfo" component={ModifyInfo} />
          <Route path="/boxinput" component={BoxInputPage}/>
          <Route path="/boxcheck" component={BoxCheckPage}/>
          </Switch>
        </Router>
      );
    } else {
      return <h1>모바일로 접속하세요.</h1>;
    }
  }
}
export default App;
