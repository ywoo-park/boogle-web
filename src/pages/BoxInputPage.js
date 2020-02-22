import React, { Component } from 'react';
import axios from 'axios';
import BoxInput from '../components/MyPage/BoxInput';

class BoxInputPage extends Component {

  state = {

  }

  render() {
    return (
      <section id="boxinput">
        <BoxInput></BoxInput>
      </section>
    );
  };
}

export default BoxInputPage;
