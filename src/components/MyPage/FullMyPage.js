import React, { useState, useEffect } from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import { withRouter, Link, Redirect } from "react-router-dom";
import { Row, Col, Icon, Divider } from "antd";
import Axios from "axios";
import './FullMyPage.css';
import Banner from '../Home/Banner.js';

export default function FullMyPage() {
    const[token, setToken] = useState("");
    const[isLogIn, setIsLogIn] = useState(false);
    const[name, setName] = useState("");
    const[search, setSearch] = useState(false);

    const[isScrolled, setIsScrolled] = useState(false);
    //const[bannerList, setBannerList] = useState("banner-list");
    const[scrolledDown, setScrolledDown] = useState(false);
    const[scrollTop, setScrollTop] = useState(0);
    const[scrolledDownClass, setScrolledDownClass] = useState("");

    useEffect(() => {
        console.log({
            name,
            isLogIn,
          });
    }, []);

    const changeToken = tokenValue => {
        //setToken(tokenValue); // for UI test
        setToken("1234567"); // for UI test
    }

    const changeIsLogIn = e =>{
        setIsLogIn(true);
    }

    const changeName = e => {
        //setName(e.target.value); // for UI test
        setName("김유진"); // for UI test
    }

    const loginOk = props => {
        if (localStorage.getItem('token') != null && token == "") {
            changeToken(localStorage.getItem('token'));
            changeName();
        }

        else if (token != "" && isLogIn == false) {
            changeIsLogIn();
        }
        else if (token == ""){ // for UI test
            changeToken(); // for UI test
            changeName(); // for UI test 
            changeIsLogIn(); // for UI test
        }
    }

    const handleScroll = e => {
      const element = e.target;
      if (element.clientHeight > element.scrollHeight - element.scrollTop - 10) {
        return;
      }
      if (element.scrollTop > this.state.scrollTop && element.scrollTop != 0
        && element.scrollTop + 30 < element.scrollHeight && element.scrollTop > 30) {
        setScrolledDown(true);
        setScrolledDownClass("scrolled-down");
      }
      else {
        setScrolledDown(false);
        setScrolledDownClass("");
      }
  
      setScrollTop(element.scrollTop);
  
      if (element.scrollTop > 188 && !isScrolled) {
        setIsScrolled(true);
        //setBannerList("banner-list-after-scrolled")
      }
      if (element.scrollTop < 188 && isScrolled) {
        setIsScrolled( false );
        //setBannerList("banner-list")
      }
    }

    if (localStorage.getItem('token') != null) {
        //loginOk(); // for UI test
    }else if(localStorage.getItem('token') === null){
        console.log("token: (" + localStorage.getItem('token') + ") Sign in, Please"); // for UI test
        loginOk(); // for UI test
    }

    if (search === true){
      console.log("Go to Search");
      return(
        <Banner isFocused={true}></Banner>
        //isFocused로 해도 검색페이지 안 뜸, url은 mypage 그대로
      );
    }

    const mypage = ({token}) => (
       // localStorage.getItem('token') === null ? ( // for UI test
        token == "" ? (
          <Redirect to="/signin" />
        ) : (
            <div style={{
                background: "url(https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/background.png)",
                height: "100vh", backgroundSize: "cover"
                ,paddingTop : "1vh"
              }} className="mypage">
                  <Row style={{marginBottom: "1vh"}}>
                    <Col xs={{ span: 3 }}>
                    <Link to="/">
                      <Icon style={{
                        fontSize: "3vh", color: "#ffffff"
                      }} type="home"
                      />
                    </Link>
                    </Col>
                    <Col xs={{ span: 8, offset: 5 }}>
                        <label style={{color : "white"}}>
                            마이페이지
                        </label>
                    </Col>
                    <Col xs={{ span: 3, offset: 5 }}>
                      <Icon style={{
                        fontSize: "3vh", color: "#ffffff"
                      }} 
                      type="search"
                      onClick = {() => {
                        setSearch(true);
                      }}
                      />
                    </Col>
                  </Row>
                  <Row style={{marginTop: "7vh"}}>
                    <Col>
                      {/* <Icon style={{
                        color: "#ffffff",
                        fontSize: "10vh",
                        marginLeft: "42%",
                        marginTop: "10%",
                      }} type="question-circle"
                      id="profile-circle"
                      onClick = {() => {}}
                      /> 지금은 텍스트, 나중엔 이미지*/}
                      <Icon style={{
                        color: "#ffffff",
                        fontSize: "10vh",
                      }} type="question-circle"
                      id="profile-circle"
                      onClick = {() => {}}
                      />
                    </Col>
                  </Row>
                  <Row style={{marginTop: "5vh"}}>
                    <label style={{color: "#ffffff"}}>{name}님, 안녕하세요!</label> 
                  </Row>

                  <Row>
                    <Col xs={{span: 2, offset: 9}}>
                      <Row>
                        <Col xs={{span: 2}}>
                          <Icon style={{
                            color: "#ffffff",
                            fontSize: "3vh",
                          }}type="bell"
                          onClick = {() => {}}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={{span: 2}}>
                          <small style={{ color: "#ffffff"}}>
                            알림
                          </small>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={{span: 2}}>
                      <Row>
                        <Col xs={{span: 2}}>
                          <Icon style={{
                            color: "#ffffff",
                            fontSize: "3vh",
                          }}type="phone"
                          onClick = {() => {}}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={{span: 2}}>
                          <small style={{ color: "#ffffff"}}>
                            고객센터
                          </small>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={{span: 2}}>
                      <Row>
                        <Col xs={{span: 2}}>
                          <Icon style={{
                            color: "#ffffff",
                            fontSize: "3vh",
                          }}type="setting"
                          onClick = {() => {}}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={{span: 2}}>
                          <small style={{ color: "#ffffff"}}>
                            설정
                          </small>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  
                  <Row style={{marginTop: "5vh"}}>
                    <Col xs={{span: 4, offset: 6}}>
                      <Row>
                        <Col span={4}>
                          <Icon style={{
                            color: "#ffffff",
                            fontSize: "5vh",
                          }}type="heart"
                          onClick = {() => {}}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={4}>
                            <small style={{ color: "#ffffff"}}>
                              관심상품
                            </small>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={{span: 4}}>
                      <Row>
                        <Col span={4}>
                          <Icon style={{
                            color: "#ffffff",
                            fontSize: "5vh",
                          }}type="heart"
                          onClick = {() => {}}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={4}>
                            <small style={{ color: "#ffffff"}}>
                              구매상품
                            </small>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={{span: 4}}>
                      <Row>
                        <Col span={4}>
                          <Icon style={{
                            color: "#ffffff",
                            fontSize: "5vh",
                          }}type="heart"
                          onClick = {() => {}}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={4}>
                            <small style={{ color: "#ffffff"}}>
                              판매상품
                            </small>
                        </Col>
                      </Row>
                    </Col>
                  </Row>


                  <Row id="banner-bottom-navbar" className={scrolledDownClass}>
                  <Link to='/'>
                    <Col xs={{ span: 6, offset: 0 }}>
                      <Row>
                        <Col span={24}>
                          <Icon className="navbar-top-icon" type="home" theme="outlined" style={{ color: "#666666", margin: "auto", marginTop: "1vh" }}></Icon>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <small>홈</small>
                        </Col>
                      </Row>
                    </Col>
                    </Link>
                    <Col xs={{ span: 6, offset: 0 }}>
                      <Row>
                        <Col span={24}>
                          <Icon className="navbar-top-icon" type="heart" theme="outlined" style={{ color: "#666666", margin: "auto", marginTop: "1vh" }}></Icon>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <small>관심상품</small>
                        </Col>
                      </Row>
                    </Col>
                    <Link to='/sell'>
                    <Col xs={{ span: 6, offset: 0 }}>
                      <Row>
                        <Col span={24}>
                          <Icon className="navbar-top-icon" type="edit" theme="outlined" style={{ color: "#666666", margin: "auto", marginTop: "1vh" }}></Icon>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <small >판매하기</small>
                        </Col>
                      </Row>
                    </Col>
                    </Link>
                    <Link to="/mypage">
                    <Col xs={{ span: 6, offset: 0 }}>
                      <Row>
                        <Col span={24}>
                          <Icon className="navbar-top-icon" type="user" theme="outlined" style={{ color: "#666666", margin: "auto", marginTop: "1vh" }}></Icon>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                            <small style={{ color: "#666666"}}>
                              마이페이지
                            </small>
                        </Col>
                      </Row>
                    </Col>
                    </Link>
                  </Row>

              </div>
        )
      );

    return mypage(token);
}