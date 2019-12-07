import React, { Component } from 'react';
import Banner from '../components/Home/Banner';
import Navbar from '../components/Navbar/Navbar';
import SignUp from '../components/SignUp/SignUp';
import Search from '../components/Navbar/Search';
import axios from 'axios';

class Home extends Component {

  state = {

  }


  componentDidMount() {
    this.targetElement = document.querySelector('#home');
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <section id="home">
        <Banner
          navbar={(<Navbar />)}
          signUp={(<SignUp />)}>
        </Banner>
      </section>
    );
  };
}

export default Home;