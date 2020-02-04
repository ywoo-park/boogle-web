import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./pages/Home";
import Sell from "./pages/Sell";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import DetailSubject from "./pages/DetailSubject.js";
import MyPage from "./pages/MyPage";
<<<<<<< HEAD
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

import CustomerInquiry from "./pages/CustomerInquiry";
// import firebase from 'firebase';

class App extends Component {
  render() {
    if(isMobile){
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
    }
    else{
      return <h1>모바일로 접속하세요.</h1>
    }
  }
}

export default App;