import React, { Component } from 'react';
import Banner from '../components/Home/Banner';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import axios from 'axios';

class Home extends Component {

  state = {

  }
  render() {
    return (
      <section id="home">
        <Banner
          navbar={(<Navbar />)}>
        </Banner>
      </section>
    );
  };
}

export default Home;