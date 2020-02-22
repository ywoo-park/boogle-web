import React, { Component } from 'react';
import axios from 'axios';
import CustomerCenter from '../components/MyPage/CustomerCenter';

class CustomerCenterPage extends Component {

  state = {

  }

  render() {
    return (
      <section id="customercenter">
        <CustomerCenter></CustomerCenter>
      </section>
    );
  };
}

export default CustomerCenterPage;
