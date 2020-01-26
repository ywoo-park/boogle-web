import React, { useState, useEffect } from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import { withRouter, Link, Redirect } from "react-router-dom";
import { Row, Col, Icon, Card, Modal, Divider } from "antd";
import Axios from "axios";
import './MyPageBanner.css';
import Banner from '../Home/Banner.js';

export default function MyPageBanner() {
    const[token, setToken] = useState("");
    const[isLogIn, setIsLogIn] = useState(false);
    const[name, setName] = useState("");

    const[isScrolled, setIsScrolled] = useState(false);
    //const[bannerList, setBannerList] = useState("banner-list");
    const[scrolledDown, setScrolledDown] = useState(false);
    const[scrollTop, setScrollTop] = useState(0);
    const[scrolledDownClass, setScrolledDownClass] = useState("");

    const[likeProduct, setLikeProduct] = useState(true);
    const[buyProduct, setBuyProduct] = useState(false);
    const[sellProduct, setSellProduct] = useState(false);

    const[notice, setNotice] = useState(false);
    const[callCenter, setCallCenter] = useState(false);
    const[setting, setSetting] = useState(false);
    const[level, setLevel] = useState(false);
    const[modal, setModal] = useState(false);


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

    const viewLikeProduct = e => {
        setLikeProduct(true);
        setBuyProduct(false);
        setSellProduct(false);
    }

    const viewBuyProduct = e => {
      setLikeProduct(false);
      setBuyProduct(true);
      setSellProduct(false);
  }

    const viewSellProduct = e => {
      setLikeProduct(false);
      setBuyProduct(false);
      setSellProduct(true);
  }

    const showModal = e => {
      setModal(true);
    }

    const closeModal = e => {
      setModal(false);
    }

    const showNotice = e => {
      setNotice(true);
      setCallCenter(false);
      setSetting(false);
      setLevel(false);
    }

    const showCallCenter = e => {
      setNotice(false);
      setCallCenter(true);
      setSetting(false);
      setLevel(false);
    }

    const showSetting = e => {
      setNotice(false);
      setCallCenter(false);
      setSetting(true);
      setLevel(false);
    }

    const showLevel = e => {
      setNotice(false);
      setCallCenter(false);
      setSetting(false);
      setLevel(true);
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
                    <Link to='/'>
                      <Col xs={{ span: 3, offset: 5 }}>
                        <Icon style={{
                          fontSize: "3vh", color: "#ffffff"
                        }} 
                        type="search"
                        />
                      </Col>
                    </Link>
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
                      onClick = {() => {showModal(); showLevel();}}
                      />
                    </Col>
                  </Row>
                  <Row style={{marginTop: "5vh"}}>
                    <label style={{color: "#ffffff"}}>{name}님, 안녕하세요!</label> 
                  </Row>

                  <Row>
                    <Col xs={{span: 4, offset: 6}}>
                      <Row>
                        <Col xs={{span: 24}}>
                          <Icon style={{
                            color: "#ffffff",
                            fontSize: "3vh",
                          }}type="bell"
                          onClick = {() => {showModal(); showNotice();}}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={{span: 24}}>
                        <label style={{ 
                              color: "#ffffff",
                              fontSize: "2vh"}}>
                            알림
                          </label>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={{span: 4}}>
                      <Row>
                        <Col xs={{span: 24}}>
                          <Icon style={{
                            color: "#ffffff",
                            fontSize: "3vh",
                          }}type="phone"
                          onClick = {() => {showModal(); showCallCenter();}}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={{span: 24}}>
                        <label style={{ 
                              color: "#ffffff",
                              fontSize: "2vh"}}>
                            고객센터
                          </label >
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={{span: 4}}>
                      <Row>
                        <Col xs={{span: 24}}>
                          <Icon style={{
                            color: "#ffffff",
                            fontSize: "3vh",
                          }}type="setting"
                          onClick = {() => {showModal(); showSetting();}}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={{span: 24}}>
                        <label style={{ 
                              color: "#ffffff",
                              fontSize: "2vh"}}>
                            설정
                          </label>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  {modal == true ? 
                    <Modal
                    visible={modal}
                    onOk={() => {closeModal();}}
                    onCancel={() => {closeModal();}}>
                      {notice == true ?
                        <p>notice</p>
                      : null }
                      {callCenter == true ?
                        <p>callCenter</p>
                      : null }
                      {setting == true ?
                        <p>setting</p> 
                      : null }
                      {level == true ?
                        <p>User Level Image</p> 
                      : null }

                    </Modal>
                  : null }
                  
                  <Row style={{marginTop: "5vh"}}>
                    <Col xs={{span: 6, offset: 3}}>
                      <Row>
                        <Col span={24}>
                          <Icon style={{
                            color: "#ffffff",
                            fontSize: "5vh",
                          }}type="heart"
                          onClick = {() => {viewLikeProduct();}}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                        <small style={{ 
                              color: "#ffffff",
                              fontSize: "2vh"}}>
                              관심상품
                            </small>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={{span: 6}}>
                      <Row>
                        <Col span={24}>
                          <Icon style={{
                            color: "#ffffff",
                            fontSize: "5vh",
                          }}type="heart"
                          onClick = {() => {viewBuyProduct();}}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                        <small style={{ 
                              color: "#ffffff",
                              fontSize: "2vh"}}>
                              구매상품
                            </small>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={{span: 6}}>
                      <Row>
                        <Col span={24}>
                          <Icon style={{
                            color: "#ffffff",
                            fontSize: "5vh",
                          }}type="heart"
                          onClick = {() => {viewSellProduct();}}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                            <small style={{ 
                              color: "#ffffff",
                              fontSize: "2vh"}}>
                              판매상품
                            </small>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row id="user-product"
                  style={{marginTop: "5%", height: "45%"}}>
                    {likeProduct == true ?
                    <Card style={{ width: "100%", height: "100%", backgroundColor: "#ffffff" }}>
                      <p style={{color: "#000000"}}>관심상품이 없습니다.</p>
                      <Icon style={{
                        color: "#000000",
                        fontSize: "5vh",
                    }}type="plus"></Icon>
                    </Card>
                    : null }
                    {buyProduct == true ?
                    <Card style={{ width: "100%", height: "100%", backgroundColor: "#ffffff" }}>
                      <p>구매상품 프로세스</p>
                    </Card>
                    : null }
                    {sellProduct == true ?
                    <Card style={{ width: "100%", height: "100%", backgroundColor: "#ffffff" }}>
                      <p>판매상품 프로세스</p>
                    </Card>
                    : null }
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