import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import inobounce from './utils/inobounce';

import Home from './pages/Home';
import Sell from './pages/Sell';

class App extends Component {

  componentDidMount(){
      inobounce.enable();
  }
  
  render() {

    return (
      <Router>
        <Route exact path="/" component={Home}/>
        <Route path="/sell" component={Sell}/>
      </Router>
    );
  }
}

export default App;