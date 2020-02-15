import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import NavBar from "react-bootstrap/Navbar";
import "./Navbar.css";
import "../Sell/Register.css";

import { Navbar as Navigation } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";

import { Modal, Button, Col, Row, Icon, Carousel } from "antd";
import Search from "./Search";

import { Typography } from "antd";

const { Title } = Typography;

class Navbar extends Component {
  state = {
    signUpToggle: false,
    form: null,
    modal1Visible: false,
    modal2Visible: false,

    userNav: null,
    tokenValue: "",
    nameValue: "",

    isLogIn: false,

    afterLogin: null,
    fetchState: false,

    loginState: 0,

    afterScrolled: "before-scrolled",
    isFocused: false,
    mode: "buy"
  };

  componentDidMount() {

  }

  focusOnSearch = isFocused => {
    this.setState({ isFocused: isFocused });
    this.setState({ isFocusedClass: "isFocused" });
    this.props.focusOnSearch(isFocused);
  };

  updateInputValue = resdata => {
    this.props.updateInputValue(resdata);
  };

  changeMode = (mode) => {
    this.props.changeMode(mode);
  }

  changeIsAlarmNeedSectionAppened = (isAlarmNeedSectionAppened) => {
    this.props.changeIsAlarmNeedSectionAppened(false);
  }

  render() {

    return (
      <div id="navbar">
        {this.state.isFocused == true ? (
          <header>
            <Row id="navbar-search-row-after-focused">
              <Col xs={{ span: 4 }}>
                <img style={{
                  width: "22px",
                  height: "auto",
                  marginLeft: "40%",
                  filter: "brightness(0) invert(1)"
                }}
                  onClick={() => {
                    this.setState({ isFocused: false });
                    this.setState({ isFocusedClass: "" });
                    this.props.unFocusOnSearch();
                    this.updateInputValue(null);
                    this.props.changeIsAlarmNeedSectionAppened(false);
                  }}
                  src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/left_arrow.png" />
              </Col>
              <Col xs={{ span: 18, offset: 0 }}>
                <Search
                  focusOnSearch={this.focusOnSearch}
                  updateInputValue={this.updateInputValue}
                  mode={this.state.mode}
                  placeHolder={this.state.mode == "buy" ?
                    "구매할 도서의 제목, 저자를 입력해주세요."
                    : "판매할 도서의 제목, 저자를 입력해주세요."}
                ></Search>
              </Col>
            </Row>
          </header>
        ) : (
            <div>
              <header id="navbar-fixed">
                <Row id="navbar-top-row">
                  <Col xs={{ span: 4, offset: 2 }}>
                    <img
                      style={{ width: "6.0vh", height: "auto" }}
                      src="https://s3.ap-northeast-2.amazonaws.com/boogle.shop/logo.png"
                    ></img>
                  </Col>
                  <Col xs={{ span: 4, offset: 0 }}>
                    <button
                      class={this.state.mode == "sell" ? "mode-button-active" : "mode-button"}
                      style={{
                        width: "100%",
                        border: "#ffffff 1px solid",
                        borderRight: "none",
                        borderTopLeftRadius: "12px",
                        borderBottomLeftRadius: "12px",
                        borderTopRightRadius: "0px",
                        borderBottomRightRadius: "0px",
                        fontSize: "11px",
                        height: "30px",
                        marginTop: "7.5%"
                      }}
                      onClick={() => {
                        if (this.state.mode == "buy") {
                          this.changeMode("sell");
                          this.setState({ mode: "sell" });
                        }
                      }
                      }>판매하기</button>
                  </Col>
                  <Col xs={{ span: 4, offset: 0 }}>
                    <button
                      class={this.state.mode == "buy" ? "mode-button-active" : "mode-button"}
                      style={{
                        width: "100%",
                        border: "#ffffff 1px solid",
                        borderLeft: "none",
                        borderTopRightRadius: "12px",
                        borderBottomRightRadius: "12px",
                        borderTopLeftRadius: "0px",
                        borderBottomLeftRadius: "0px",
                        fontSize: "11px",
                        height: "30px",
                        marginTop: "7.5%"
                      }}
                      onClick={() => {
                        if (this.state.mode == "sell") {
                          this.changeMode("buy");
                          this.setState({ mode: "buy" });
                        }
                      }}>구매하기</button>
                  </Col>
                  <Col xs={{ span: 1, offset: 3 }}>
                    <Icon
                      className="navbar-top-icon"
                      type="mail"
                      theme="outlined"
                      style={{
                        color: "lightgrey",
                        margin: "auto",
                        marginTop: "1vh"
                      }}
                      onClick={() => {
                        localStorage.removeItem('token');
                        setTimeout(() => {
                          window.location.reload();
                        }, 1000);
                      }}
                    ></Icon>
                  </Col>
                  <Col xs={{ span: 1, offset: 2 }}>
                    <Icon
                      className="navbar-top-icon"
                      type="user"
                      theme="outlined"
                      style={{
                        color: "lightgrey",
                        margin: "auto",
                        marginTop: "1vh"
                      }}
                      onClick={() => {
                        this.props.history.push('/signin');
                      }}
                    ></Icon>
                  </Col>
                </Row>
                {this.state.mode == "buy" ?
                  <Row id="navbar-search-row">
                    <Col xs={{ span: 20, offset: 2 }}>
                      <Search
                        focusOnSearch={this.focusOnSearch}
                        placeHolder={this.state.mode == "buy" ?
                          "구매할 도서의 제목, 저자를 입력해주세요."
                          : "판매할 도서의 제목, 저자를 입력해주세요."}
                        mode={this.state.mode}
                      ></Search>
                    </Col>
                  </Row>
                  : null
                }

              </header>
              <header id="navbar-unfixed">
                <Row>
                  <Col xs={{ span: 20, offset: 2 }}>
                    <Carousel className="navbar-carousel" autoplay>
                      <div className="navbar-carousel-div">
                        <h3 className="navbar-carousel-title">판매 등록 시, </h3>
                        <h3 className="navbar-carousel-title">
                          50% 선 지급 이벤트
                      </h3>
                        <h3 className="navbar-carousel-title">진행 중!</h3>
                      </div>
                      <div className="navbar-carousel-div">
                        <h3 className="navbar-carousel-title">오프라인 </h3>
                        <h3 className="navbar-carousel-title">북을 박스</h3>
                        <h3 className="navbar-carousel-title">COMING SOON</h3>
                      </div>
                      <div className="navbar-carousel-div">
                        <h3 className="navbar-carousel-title">판매 등록 시, </h3>
                        <h3 className="navbar-carousel-title">
                          50% 선 지급 이벤트
                      </h3>
                        <h3 className="navbar-carousel-title">진행 중!</h3>
                      </div>
                      <div className="navbar-carousel-div">
                        <h3 className="navbar-carousel-title">오프라인 </h3>
                        <h3 className="navbar-carousel-title">북을 박스</h3>
                        <h3 className="navbar-carousel-title">COMING SOON</h3>
                      </div>
                    </Carousel>
                  </Col>
                </Row>
              </header>
            </div>
          )}
      </div>
    );
  }
}

export default withRouter(Navbar);