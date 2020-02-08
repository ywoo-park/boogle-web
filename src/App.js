import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Sell from "./pages/Sell";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import DetailSubject from "./pages/DetailSubject.js";
import MyPage from "./pages/MyPage";
<<<<<<< HEAD
import Setting from "./pages/Setting";
import ModifyInfo from "./pages/ModifyInfo";
// import firebase from 'firebase';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
=======
import CustomerInquiry from "./pages/CustomerInquiry";

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

class App extends Component {
  render() {
    if(isMobile){
      return (
        <Router>
          <Switch>
>>>>>>> 1ca505020c70822cbe0454cedd993ac48acc160c
          <Route exact path="/" component={Home} />
          <Route path="/sell" component={Sell} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="mypage" component={MyPage} />
          <Route path="/buy/detail/:id" component={DetailSubject} />
<<<<<<< HEAD
          <Route path="/mypage" component={MyPage} />
          <Route path="/setting" component={Setting} />
          <Route path="/modifyInfo" component={ModifyInfo} />
        </Switch>
      </Router>
    );
  }
}

=======
          <Route path="/mypage" component={MyPage}/>
          <Route path="/customerinquiry" component={CustomerInquiry}/>
          </Switch>
        </Router>
      );
    }
    else{
      return <h1>모바일로 접속하세요.</h1>
    }
  }
}
>>>>>>> 1ca505020c70822cbe0454cedd993ac48acc160c
export default App;
