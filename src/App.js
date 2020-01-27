import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./pages/Home";
import Sell from "./pages/Sell";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import DetailSubject from "./pages/DetailSubject.js";
import MyPage from "./pages/MyPage";
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
<<<<<<< HEAD
        <Route path="/detailsubject" component={DetailSubject} />
        <Route path="mypage" component={MyPage} />
=======
        <Route path="/buy/detail/:id" component={DetailSubject} />
        <Route path="mypage" component={MyPage}/>
        </Switch>
>>>>>>> 05ad15fc22bde7cf656aa86bb8c647474ab1d355
      </Router>
    );
  }
}

export default App;
