import React, { Component } from 'react';
import Banner from '../components/Home/Banner';
import Navbar from '../components/Navbar/Navbar';
import SignUp from '../components/SignUp/SignUp';
import Search from '../components/Navbar/Search';
import Register from '../components/Sell/Register';

import axios from 'axios';

class Sell extends Component {

  state = {

  }


  componentDidMount() {
    this.targetElement = document.querySelector('#home');
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <section id="sell">
        <Register>
        </Register>
      </section>
    );
  };
}

export default Sell;