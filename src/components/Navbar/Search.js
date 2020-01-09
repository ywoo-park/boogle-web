import React, { Component } from 'react';
import useForm from 'react-hook-form';
import { Modal, Button, Col, Row, Icon } from 'antd';
import axios from 'axios';

import './Search.css';


class Search extends Component {

  state = {
    inputValue : "",
    onFocus : "search-result-col-before-focus",
    onBlur : "search-result-col",
    isUpdated : false
  }

  updateInputValue(e) {
    this.setState({
      inputValue: e.target.value,
    });
    this.getNaverBookInfo(this.state.inputValue);
  }

  getNaverBookInfo = async (keyword) => {
    axios.get('http://13.125.191.60:8080/naver/bookApi?keyword=' + keyword)
      .then((response) => {
        const items = response.data.rss.channel.item;
        if(items!= undefined && items.length > 0 && keyword !=''){
          this.setState({
            resdata: items,
            isUpdated : true
          });
        }
          if(keyword == ''){
            this.setState({
              resdata: null,
              isUpdated : true
            });
          }
          this.props.updateInputValue(this.state.resdata);
      });
  }

  onFocus = () =>{
    this.setState({onFocus : "search-result-col"})
    this.props.focusOnSearch(true);  
  }

  onBlur = () => {
    this.setState({onBlur : "search-result-col-before-focus"});
  }

  render() {
    
    return (
      <form className="search-form">
        <input onFocus={this.onFocus} onBlur={this.onBlur}
         className="search-input" type="text" name="name"
          value={this.state.inputValue}
          onChange={evt => this.updateInputValue(evt)}
          placeholder={this.props.placeHolder} />
        <Icon className="search-input-button" type="search" theme="outlined" style={{ color: "white", margin: "auto" }}></Icon>
      </form>
    );
  }

};
export default Search;