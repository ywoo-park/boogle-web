import React, { Component } from 'react';

import Nav from 'react-bootstrap/Nav';
import NavBar from 'react-bootstrap/Navbar';
import './Navbar.css';

import { withRouter, Link } from "react-router-dom";

import { Modal, Button, Col, Row, Icon, Carousel } from 'antd';
import Search from './Search';


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
    }

    componentDidMount() {
        this.setState({
            element:
                { element: document.getElementById("navbar"), speed: 100, minDuration: 700, }
        });
        if (document.getElementById("main") != null) {
            this.setState({
                elementTop:
                    { element: document.getElementById("main"), speed: 100, minDuration: 700, }
            });
        }
        if (document.getElementById('banner') != null) {
            this.setState({
                height: document.getElementById('banner').clientHeight
            });
        }
    }

    setNameValue = () => {
        const localName = localStorage.getItem('name');
        return localName;
    }

    focusOnSearch = (isFocused) => {
        this.setState({ isFocused: isFocused });
        this.setState({ isFocusedClass: "isFocused" })
        this.props.focusOnSearch(isFocused);
    }
    
    updateInputValue = (resdata) => {
        this.props.updateInputValue(resdata);
    }

    render() {
        return (
            <div id="navbar" className={this.state.isFocusedClass}>
                {
                    this.state.isFocused == true ?
                        <header>
                            <Row id="navbar-search-row-after-focused">
                                    <Col xs={{ span: 4 }}><img style={{
                                        width : "22px",
                                        height : "auto",
                                        marginLeft: "40%",   
                                        filter: "brightness(0) invert(1)"
                                    }} 
                                    src = "https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/left_arrow.png"
                                        onClick={() => {
                                            this.setState({ isFocused: false });
                                            this.setState({ isFocusedClass: "" })
                                            this.props.unFocusOnSearch();
                                            this.props.updateInputValue(null);                            
                                        }} /></Col>
                                <Col xs={{ span: 18, offset: 0 }} >
                                    <Search focusOnSearch={this.focusOnSearch}
                                        updateInputValue={this.updateInputValue}
                                        placeHoldere = "구매할 도서의 제목, 저자를 입력해주세요."></Search>
                                </Col>
                            </Row>
                        </header> :
                        <div>
                        <header id="navbar-fixed">
                            <Row id="navbar-top-row">
                                <Col xs={{ span: 5, offset: 2 }}>
                                    <img style={{ width: "7.0vh", height: "auto" }}
                                        src="https://s3.ap-northeast-2.amazonaws.com/boogle.shop/logo.png"></img>
                                </Col>
                                <Col style={{marginTop : "1vh"}} xs={{ span: 2, offset: 11 }}>
                                    <img style={{ width: "4.0vh", height: "auto" }}
                                    src = "https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/navbar_button_1.png"></img>
                                </Col>
                                <Col style={{marginTop : "1vh"}} xs={{ span: 2, offset: 1 }}>
                                    <img style={{ width: "3.0vh", height: "auto" }}
                                    src = "https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/navbar_button_2.png"></img>
                                </Col>
                            </Row>
                            <Row id="navbar-search-row">
                            
                                <Col xs={{ span: 20, offset: 2 }}>                                    
                                    <Search focusOnSearch={this.focusOnSearch}
                                    placeHolder = "구매할 도서의 제목, 저자를 입력해주세요."></Search>                                       
                                </Col>
                                 
                            </Row>
                        </header>
                        <header id="navbar-unfixed">
                        <Row>
                            <Col xs={{ span: 20, offset: 2 }}>
                                <Carousel className="navbar-carousel" autoplay>
                                    <div className="navbar-carousel-div">
                                        <h3 className="navbar-carousel-title">판매 등록 시,  </h3>
                                        <h3 className="navbar-carousel-title">50% 선 지급 이벤트</h3>
                                        <h3 className="navbar-carousel-title">진행 중!</h3>
                                    </div>
                                    <div className="navbar-carousel-div">
                                        <h3 className="navbar-carousel-title">오프라인  </h3>
                                        <h3 className="navbar-carousel-title">북을 박스</h3>
                                        <h3 className="navbar-carousel-title">COMING SOON</h3>
                                    </div>
                                    <div className="navbar-carousel-div">
                                        <h3 className="navbar-carousel-title">판매 등록 시,  </h3>
                                        <h3 className="navbar-carousel-title">50% 선 지급 이벤트</h3>
                                        <h3 className="navbar-carousel-title">진행 중!</h3>
                                    </div>
                                    <div className="navbar-carousel-div">
                                        <h3 className="navbar-carousel-title">오프라인  </h3>
                                        <h3 className="navbar-carousel-title">북을 박스</h3>
                                        <h3 className="navbar-carousel-title">COMING SOON</h3>
                                    </div>
                                </Carousel>
                            </Col>
                        </Row>
                    </header>
                    </div>

                }
            </div>

        );
    }
}

export default Navbar;