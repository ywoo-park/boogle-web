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
                      <Icon style={{
                        color: "#ffffff",
                        fontSize: "3vh",
                      }}type="bell"
                      onClick = {() => {}}
                      />
                    </Col>
                    <Col xs={{span: 2}}>
                      <Icon style={{
                        color: "#ffffff",
                        fontSize: "3vh",
                      }}type="phone"
                      onClick = {() => {}}
                      />
                    </Col>
                    <Col xs={{span: 2}}>
                      <Icon style={{
                        color: "#ffffff",
                        fontSize: "3vh",
                      }}type="setting"
                      onClick = {() => {}}
                      />
                    </Col>
                  </Row>
                  
                  <Row style={{marginTop: "5vh"}}>
                    <Col xs={{span: 4, offset: 6}}>
                      <Icon style={{
                        color: "#ffffff",
                        fontSize: "5vh",
                      }}type="heart"
                      onClick = {() => {}}
                      />
                    </Col>
                    <Col xs={{span: 4}}>
                      <Icon style={{
                        color: "#ffffff",
                        fontSize: "5vh",
                      }}type="heart"
                      onClick = {() => {}}
                      />
                    </Col>
                    <Col xs={{span: 4}}>
                      <Icon style={{
                        color: "#ffffff",
                        fontSize: "5vh",
                      }}type="heart"
                      onClick = {() => {}}
                      />
                    </Col>
                  </Row>

              </div>
        )
      );

    return mypage(token);
}