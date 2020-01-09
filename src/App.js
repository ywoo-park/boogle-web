import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import Home from './pages/Home';
import Sell from './pages/Sell';
import SignUp from './pages/SignUp';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/sell" component={Sell} />
        <Route path="/signup" component={SignUp}/>
      </Router>
    );
  }
}

export default App;