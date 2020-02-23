import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Sell from "./pages/Sell";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import DetailSubject from "./pages/DetailSubject.js";
import MyPage from "./pages/MyPage";
import CustomerInquiry from "./pages/CustomerInquiry";
<<<<<<< Updated upstream
import CustomerCenterPage from "./pages/CustomerCenterPage";
import ModifyInfo from "./pages/ModifyInfo";
import BoxCheckPage from "./pages/BoxCheckPage";
import BoxInputPage from "./pages/BoxInputPage";
import Setting from "./pages/Setting";
import AccountSetting from "./pages/AccountSetting";
import Admin from "./pages/Admin";
import SignInSetting from "./pages/SignInSetting";

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

class App extends Component {
  render() {
    const warning = () => {
      return <h1>모바일로 접속하세요.</h1>;
    };

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
            <Route path="/mypage" component={MyPage} />
            <Route path="/customerinquiry" component={CustomerInquiry} />
            <Route path="/customercenter" component={CustomerCenterPage} />
            <Route path="/modifyInfo" component={ModifyInfo} />
            <Route path="/setting" component={Setting} />
            <Route path="/accountSetting" component={AccountSetting} />
            <Route path="/admin" component={Admin} />
            <Route path="/signinSetting" component={SignInSetting} />
          </Switch>
        </Router>
      );
    } else {
      return (
        <Router>
          <Switch>
            <Route exact path="/" component={warning}></Route>
            <Route path="/admin" component={Admin}></Route>
          </Switch>
        </Router>
      );
    }
=======
// import firebase from 'firebase';

class App extends Component {
  render() {
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
        </Switch>
      </Router>
    );
>>>>>>> Stashed changes
  }
}
export default App;
