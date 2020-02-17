import React, { Component } from 'react';
import axios from 'axios';
import BoxCheck from '../components/MyPage/BoxCheck';

class BoxCheckPage extends Component {

  state = {

  }

  render() {
    return (
      <section id="boxcheck">
        <BoxCheck></BoxCheck>
      </section>
    );
  };
}

export default BoxCheckPage;
