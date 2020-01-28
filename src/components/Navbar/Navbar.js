import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import NavBar from "react-bootstrap/Navbar";
import "./Navbar.css";

import { Navbar as Navigation } from "react-bootstrap";

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
    isFocused: false
  };

  componentDidMount() {
    this.setState({
      element: {
        element: document.getElementById("navbar"),
        speed: 100,
        minDuration: 700
      }
    });
    if (document.getElementById("main") != null) {
      this.setState({
        elementTop: {
          element: document.getElementById("main"),
          speed: 100,
          minDuration: 700
        }
      });
    }
    if (document.getElementById("banner") != null) {
      this.setState({
        height: document.getElementById("banner").clientHeight
      });
    }
  }

  setModal1Visible = v => {
    this.setState({
      modal1Visible: v
    });
  };

  setModal2Visible = v => {
    this.setState({
      modal2Visible: v
    });
  };

  setTokenValue = () => {
    const localToken = localStorage.getItem("token");
    return localToken;
  };

  setNameValue = () => {
    const localName = localStorage.getItem("name");
    return localName;
  };

  logOut = () => {
    localStorage.clear();
    this.setState({
      tokenValue: "",
      nameValue: "",
      isLogIn: false
    });
    window.location.reload();
  };

  loginNavbarChange = () => {
    if (localStorage.getItem("token") != null && this.state.tokenValue == "") {
      const token = this.setTokenValue();
      const name = this.setNameValue();

      this.setState({
        tokenValue: token,
        nameValue: name
      });
    } else if (
      this.state.tokenValue != "" &&
      this.state.isLogIn == false &&
      this.state.afterLogin != null
    ) {
      this.setState({
        userNav: this.state.afterLogin,
        isLogIn: true
      });
    }
  };

  focusOnSearch = isFocused => {
    this.setState({ isFocused: isFocused });
    this.setState({ isFocusedClass: "isFocused" });
    this.props.focusOnSearch(isFocused);
  };
  updateInputValue = resdata => {
    this.props.updateInputValue(resdata);
  };

  render() {
    const logOut = this.logOut;
    const fetchState = this.state.fetchState;

    if (localStorage.getItem("token") != null) {
      this.loginNavbarChange();
    }

    const beforeLogin = (
      <Nav className="before-login-text">
        <Nav.Link onClick={() => this.setModal1Visible(true)}>로그인</Nav.Link>
        <Nav.Link href="/signup">회원가입</Nav.Link>
      </Nav>
    );

    if (this.state.userNav == null) {
      this.setState({
        userNav: beforeLogin
      });
    }

    if (
      this.state.afterLogin == null &&
      this.state.nameValue != "" &&
      localStorage.getItem("token") != null
    ) {
      this.setState({
        afterLogin: (
          <Nav className="login">
            <NavBar.Text className="nav-txt">
              {this.state.nameValue}님 안녕하세요!
            </NavBar.Text>
            <Nav.Link className="nav-link" href="/myPage">
              마이페이지
            </Nav.Link>
            <Nav.Link onClick={logOut}>로그아웃</Nav.Link>
          </Nav>
        )
      });
    }

    return (
      <div id="navbar" className={this.state.isFocusedClass}>
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
                  }}
                    src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/left_arrow.png"/>
              </Col>
              <Col xs={{ span: 18, offset: 0 }}>
                <Search
                  focusOnSearch={this.focusOnSearch}
                  updateInputValue={this.updateInputValue}
                  placeHoldere="구매할 도서의 제목, 저자를 입력해주세요."
                ></Search>
              </Col>
            </Row>
          </header>
        ) : (
          <div>
            <header id="navbar-fixed">
              <Row id="navbar-top-row">
                <Col xs={{ span: 5, offset: 2 }}>
                  <img
                    style={{ width: "6.0vh", height: "auto" }}
                    src="https://s3.ap-northeast-2.amazonaws.com/boogle.shop/logo.png"
                  ></img>
                </Col>
                <Col xs={{ span: 1, offset: 11 }}>
                  <Icon
                    className="navbar-top-icon"
                    type="mail"
                    theme="outlined"
                    style={{
                      color: "lightgrey",
                      margin: "auto",
                      marginTop: "1vh"
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
                    onClick={()=>{
                      localStorage.removeItem('token');
                      setTimeout(() => {
                        window.location.reload();
                      }, 500);
                  }}
                  ></Icon>
                </Col>
              </Row>
              <Row id="navbar-search-row">
                <Col xs={{ span: 20, offset: 2 }}>
                  <Search
                    focusOnSearch={this.focusOnSearch}
                    placeHolder="구매할 도서의 제목, 저자를 입력해주세요."
                  ></Search>
                </Col>
              </Row>
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

export default Navbar;
