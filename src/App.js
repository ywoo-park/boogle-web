import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./pages/Home";
import Sell from "./pages/Sell";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import DetailSubject from "./pages/DetailSubject.js";
import MyPage from "./pages/MyPage";
<<<<<<< HEAD
import CustomerInquiry from "./pages/CustomerInquiry";
=======
>>>>>>> 39963c4d89af7981bb7c5a63778d7ea67a68d7f1
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
<<<<<<< HEAD
        <Route path="/customerinquiry" component={CustomerInquiry}/>
=======
>>>>>>> 39963c4d89af7981bb7c5a63778d7ea67a68d7f1
        </Switch>
      </Router>
    );
  }
}

export default App;