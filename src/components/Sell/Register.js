import React, { Component } from 'react';
import { Row, Col, notification, Layout, Icon, List, Card, Divider, Rate } from 'antd';
import Navbar from '../Navbar/Navbar';
import Search from '../Navbar/Search';
import { withRouter } from "react-router-dom";
import moment from 'moment';
import NumberFormat from 'react-number-format';
import axios from 'axios';
import './Register.css';

class Register extends Component {
    state = {
        step: 0
    }


    focusOnSearch = (isFocused) => {
        this.setState({ isFocused: isFocused });
        this.setState({ isFocusedClass: "isFocused" })
    }

    updateInputValue = (resdata) => {
        this.setState({ resdata: resdata });
    }

    handleScroll = e => {
        const element = e.target;
        if (element.clientHeight > element.scrollHeight - element.scrollTop - 10) {
            return;
        }

        if (element.scrollTop > this.state.scrollTop && element.scrollTop != 0
            && element.scrollTop + 30 < element.scrollHeight && element.scrollTop > 30) {
            this.setState({ scrolledDown: true })
            this.setState({ scrolledDownClass: "scrolled-down" })
        }
        else {
            this.setState({ scrolledDown: false });
            this.setState({ scrolledDownClass: "" })
        }

        this.setState({ scrollTop: element.scrollTop })

        if (element.scrollTop > 188 && !this.state.isScrolled) {
            this.setState({ isScrolled: true });
            this.setState({ bannerList: "banner-list-after-scrolled" })
        }
        if (element.scrollTop < 188 && this.state.isScrolled) {
            this.setState({ isScrolled: false });
            this.setState({ bannerList: "banner-list" })
        }
    }

    componentWillMount() {
        window.addEventListener('touchmove', function (event) {
            event.preventDefault()
        }, { passive: false });
    }

    componentDidMount() {
        this.targetElement = document.querySelector('#register-container');
        document.querySelector('#register-container').addEventListener('touchmove', function (event) {
            event.stopPropagation()
        }, false);
    }


    render() {
        return (
            <section id="register-container" onScroll={this.handleScroll}>
                {
                    this.state.step == 0 ?
                        <div>
                            <Row style={{ marginTop: "3vh" }}>
                                <Col xs={{ span: 8 }}>
                                    <Icon style={{
                                        marginLeft: "25%",
                                        fontSize: "3vh", color: "#707070"
                                    }} type="arrow-left"
                                        onClick={() => {
                                            this.props.history.push('/');
                                        }} />
                                </Col>
                                <Col style={{ textAlign: "center", padding: "auto" }} xs={{ span: 8 }}>
                                    <h5 style={{ color: "#707070" }}>판매하기</h5>
                                </Col>
                                <Col xs={{ span: 8 }}>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={{ span: 24 }}>
                                    <div style={{
                                        width: "35vh", height: "35vh",
                                        margin: "auto", marginTop: "4vh", marginBottom: "2vh", borderRadius: "50%", background: "rgba(0, 161, 153, 0.9)"
                                    }}>
                                        <Row>
                                            <Col style={{ marginTop: "10vh" }} xs={{ span: 6, offset: 9 }}>
                                                <Icon style={{
                                                    fontSize: "9vh", color: "white"
                                                }} type="camera" />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col style={{ padding: "auto", marginTop: "1.0vh" }} xs={{ span: 24 }}>
                                                <h6 style={{ fontSize: "2.0vh", color: "white", textAlign: "center" }}>바코드 스캔</h6>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={{ offset: 2, span: 20 }}>
                                    <Divider />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={{ span: 24 }}>
                                    <div onClick={() => { this.setState({ step: 1 }) }} style={{
                                        width: "35vh", height: "35vh",
                                        margin: "auto", marginTop: "4vh", marginBottom: "2vh", borderRadius: "50%", background: "rgba(0, 161, 153, 0.9)"
                                    }}>
                                        <Row>
                                            <Col style={{ marginTop: "10vh" }} xs={{ span: 6, offset: 9 }}>
                                                <Icon style={{
                                                    fontSize: "8vh", color: "white"
                                                }} type="search" />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col style={{ padding: "auto", marginTop: "1.0vh" }} xs={{ span: 24 }}>
                                                <h6 style={{ fontSize: "2.0vh", color: "white", textAlign: "center" }}>검색 또는 직접 입력</h6>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </div> :
                        this.state.step == 1 ?
                            <div>
                                <div id="navbar">
                                    <header>
                                        <Row id="navbar-search-row-after-focused">
                                            <Col xs={{ span: 4 }}><Icon style={{
                                                marginLeft: "40%",
                                                fontSize: "3vh", color: "white"
                                            }} type="arrow-left"
                                                onClick={() => {
                                                    this.setState({ step: 0 })
                                                }} /></Col>
                                            <Col xs={{ span: 18, offset: 0 }} >
                                                <Search focusOnSearch={this.focusOnSearch}
                                                    updateInputValue={this.updateInputValue}
                                                    placeHolder={""}></Search>
                                            </Col>
                                        </Row>
                                    </header>
                                </div>
                                {this.state.resdata != null && this.state.resdata.length != 0 ?
                                    this.state.resdata.map((value, index) => {
                                        return (
                                            <div>
                                                <Row>
                                                    <Col offset={1} span={22}><Divider /></Col>
                                                </Row>
                                                <Row key={index} className="search-result-row" style={{ paddingTop: "1vh" }}>
                                                    <Col xs={{ span: 5, offset: 1 }}>
                                                        <img style={{
                                                            width: "14vh", height: "21vh", backgroundSize: "contain",
                                                            borderRadius: "7px"
                                                        }}
                                                            src={this.state.resdata != null ? value.image.replace("type=m1", "") : null}></img>
                                                    </Col>
                                                    <Col xs={{ span: 14, offset: 2 }}>
                                                        <Row>
                                                            <Col xs={{ span: 24 }}>
                                                                <span style={{ color: "#656565", fontSize: "2.2vh" }}>{this.state.resdata != null ? value.title.replace(/(<([^>]+)>)/ig, "") : null}</span>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col style={{ marginTop: "2.5vh", marginBottom: "-1.5vh" }} xs={{ span: 24 }}>
                                                                <small style={{ color: "#656565", fontSize: "1.75vh" }}>
                                                                    {this.state.resdata != null ? value.author.replace(/(<([^>]+)>)/ig, "") : null}
                                                                    {this.state.resdata != null ? " / " : null}
                                                                    {this.state.resdata != null ? value.publisher.replace(/(<([^>]+)>)/ig, "") : null}
                                                                </small>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col style={{}} xs={{ span: 24 }}>
                                                                <small style={{ color: "#656565", fontSize: "1.75vh" }}>
                                                                    {this.state.resdata != null ? value.pubdate.toString().substring(0, 4) + "년 " +
                                                                        value.pubdate.toString().substring(4, 6) + "월" : null}
                                                                </small>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col style={{}} xs={{ span: 24 }}>
                                                                <small style={{ color: "#656565", fontSize: "1.75vh" }}>
                                                                    {this.state.resdata != null ? "ISBN : " + value.isbn.split(" ")[1] : null }
                                                                </small>
                                                            </Col>
                                                        </Row>
                                                        <Row style={{ marginTop: "3.5vh" }}>
                                                            <Col style={{ marginBottom: "-1.0vh" }} xs={{ span: 24 }}>
                                                                <small style={{ color: "#656565", fontSize: "1.75vh"}}>
                                                                    {this.state.resdata != null ? "정가 : " : null}
                                                                    {this.state.resdata != null ?
                                                                        <NumberFormat value={value.price} displayType={'text'} thousandSeparator={true} />
                                                                        : null}
                                                                    {this.state.resdata != null ? "원" : null}
                                                                </small>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={{ span: 12 }}>
                                                                <small style={{ color: "#656565", fontSize: "2.3vh", fontWeight: "700" }}>
                                                                    {this.state.resdata != null && value.lowestPrice != 0 ? "북을 판매가 : " : null}
                                                                    {this.state.resdata != null ?
                                                                        <small style={{ color: "rgba(51, 158, 172, 0.9)", fontSize: "2.3vh" }}>
                                                                            <NumberFormat value={value.lowestPrice} displayType={'text'} thousandSeparator={true} />
                                                                        </small>
                                                                        : null}
                                                                    {this.state.resdata != null && value.lowestPrice != 0 ?
                                                                        <small style={{ color: "rgba(51, 158, 172, 0.9)", fontSize: "2.3vh" }}>원~</small> :
                                                                        null}
                                                                </small>
                                                            </Col>
                                                            <Col style={{ marginTop: "-2.95vh" }} xs={{ span: 12 }}>
                                                                <button style={{
                                                                    borderRadius: "14px", background: "rgba(51, 158, 172, 0.9)",
                                                                    color: "white", border: "none", fontSize: "1.6vh", height: "3.5vh", width: "110%"
                                                                }}
                                                                onClick={()=>{this.setState({step : 2})}}
                                                                >판매 등록하기</button>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </div>
                                        );
                                    })
                                    :
                                    <div style={{ height: "100%" }}>
                                        <div style={{ marginTop: "50%" }}>
                                            <h5 style={{
                                                textAlign: "center",
                                                color: "gray", fontWeight: "600"
                                            }}>판매 등록할 도서를<br /> 검색해주세요!</h5>
                                        </div>
                                    </div>
                                }

                            </div>

                            : 
                            this.state.step == 2 ?
                            <div>
                            <Row style={{ marginTop: "3vh" }}>
                                <Col xs={{ span: 8 }}>
                                    <Icon style={{
                                        marginLeft: "25%",
                                        fontSize: "3vh", color: "#707070"
                                    }} type="arrow-left"
                                        onClick={() => {
                                            this.props.history.push('/');
                                        }} />
                                </Col>
                                <Col style={{ textAlign: "center", padding: "auto" }} xs={{ span: 8 }}>
                                    <h5 style={{ color: "#707070" }}>판매하기</h5>
                                </Col>
                                <Col xs={{ span: 8 }}>
                                </Col>
                            </Row>
                            </div>
                            :
                            null
                }
            </section>
        )
    }
}
export default withRouter(Register);