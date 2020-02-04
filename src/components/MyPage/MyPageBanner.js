import React, { useState, useEffect } from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import { withRouter, Link, Redirect } from "react-router-dom";
import { Row, Col, Icon, Card, Modal, Divider } from "antd";
import axios from 'axios';
import './MyPageBanner.css';
import Banner from '../Home/Banner.js';

export default function MyPageBanner() {
    const[name, setName] = useState("");
    const[likeList, setLikeList] = useState([]);
    const[buyList, setBuyList] = useState([]);
    const[sellList, setSellList] = useState([]);

    const[likeProduct, setLikeProduct] = useState(true);
    const[buyProduct, setBuyProduct] = useState(false);
    const[sellProduct, setSellProduct] = useState(false);

    const[level, setLevel] = useState(false);
    const[modal, setModal] = useState(false);


    useEffect(() => {
          getMyPage();
    }, []);

    const getMyPage = () => {
      // axios.get('http://13.124.113.72:8080/myPage', {
      //   headers: { Authorization: localStorage.getItem('token') }
      // })
      // .then((response) => {
      //   console.log(response);
      //   setName(response.data.data.userName)
      //   setLikeList(response.data.data.bookmarkedItemList)
      //   setBuyList(response.data.data.buyTransList)
      //   setSellList(response.data.data.sellTransList)
      // });
      setName("김유진");
      setLikeList([
        {
          "sellItemId": "5e302b91cf6c2a2fab5324fb",
          "imageUrl": "https://bookthumb-phinf.pstatic.net/cover/139/212/13921278.jpg?type=m1&udate=20181224",
          "title": "맨큐의 경제학",
          "regiPrice": "20000"
        },
        {
          "sellItemId": "5e302b91cf6c2a2fab5324fb",
          "imageUrl": "https://bookthumb-phinf.pstatic.net/cover/139/212/13921278.jpg?type=m1&udate=20181224",
          "title": "맨큐의 경제학",
          "regiPrice": "20000"
        }
      ]);
      setBuyList([
        {
          "sellItemId": "5e302b91cf6c2a2fab5324fb",
          "traderName": "북을",
          "traderPhoneNumber": "01012345678",
          "title": "맨큐의 경제학",
          "transactionType": 0,
          "transPrice": "20000",
          "transactionCreatedTime": "2020-02-01T10:17:13.576+0000",
          "transactionProcessedTimeList": [
              "2020-02-01T10:17:13.576+0000"
          ],
          "transactionStep": 0
        },
        {
          "sellItemId": "5e302b91cf6c2a2fab5324fb",
          "traderName": "북을북을",
          "traderPhoneNumber": "01012345678",
          "title": "맨큐의 경제학",
          "transactionType": 1,
          "transPrice": "20000",
          "transactionCreatedTime": "2020-02-01T10:17:13.576+0000",
          "transactionProcessedTimeList": [
              "2020-02-01T10:17:13.576+0000"
          ],
          "transactionStep": 3
        }
      ]);
      setSellList([
        {
          "sellItemId": "5e302c68cf6c2a2fab5324fe",
          "traderName": "북을",
          "traderPhoneNumber": "01012345678",
          "title": "대학수학",
          "transactionType": 1,
          "transPrice": "8000",
          "transactionCreatedTime": "2020-02-01T10:31:19.317+0000",
          "transactionProcessedTimeList": [
              "2020-02-01T10:31:19.317+0000"
           ],
          "transactionStep": 0
        },
        {
          "sellItemId": "5e302c68cf6c2a2fab5324fe",
          "traderName": "북을",
          "traderPhoneNumber": "01012345678",
          "title": "대학수학",
          "transactionType": 1,
          "transPrice": "8000",
          "transactionCreatedTime": "2020-02-01T10:31:19.317+0000",
          "transactionProcessedTimeList": [
              "2020-02-01T10:31:19.317+0000"
           ],
          "transactionStep": 0
        }
      ]
      );
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

    const showLevel = e => {
      setLevel(true);
    }

    return (
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
            {/* <Link to='/'>
              <Col xs={{ span: 3, offset: 5 }}>
                <Icon style={{
                  fontSize: "3vh", color: "#ffffff"
                }} 
                type="search"
                />
              </Col>
            </Link> */}
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
                  onClick = {() => {}}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={{span: 24}}>
                <label style={{ 
                      color: "#ffffff",
                      fontSize: "2vh"}}>
                    공지사항
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
                  onClick = {() => {}}
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
                  onClick = {() => {}}
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
            <Card style={{ width: "100%", height: "100%", backgroundColor: "#ffffff", border: 0, }}>
              {likeList != null ?
              <div>
                {likeList.map((value, index) => (
                    <div>
                      <Row>
                        <Col span={5} offset={3}>
                        <img style={{ width: "10vh", height: "10vh", backgroundSize: "contain",
                                  borderRadius: "7px", overflow: "hidden"}}
                        onClick={() => {}}
                        src={value.imageUrl}></img>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={5} offset={3}>
                          <label>{value.title}</label>
                        </Col>
                      </Row>
                      <Row>
                      <Col span={5} offset={3}>
                          <label>{value.regiPrice}원</label>
                        </Col>
                      </Row>
                    </div>
                ))}
                <Link to="/">
                  <button style={{
                    padding: "0",
                    width: "100%",
                    background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                    border: "none", borderRadius: "2.25vh", fontSize: "2.5vh", height: "5vh"
                    }}
                  >더 담으러 가기</button>
                </Link>
              </div>
              : 
              <div>
                <Row>
                  <p style={{color: "#000000"}}>관심상품이 없습니다.</p>
                </Row>
                <Row>
                  <Icon style={{
                    color: "#000000",
                    fontSize: "5vh",
                  }}type="plus"></Icon>
                </Row>
                <Row>
                  <Link to="/">
                    <button style={{
                      padding: "0",
                      width: "100%",
                      background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                      border: "none", borderRadius: "2.25vh", fontSize: "2.5vh", height: "5vh"
                      }}
                    >더 담으러 가기</button>
                  </Link>
                </Row>
              </div>
            }
            </Card>
            : null }
            {buyProduct == true ?
            <Card style={{ width: "100%", height: "100%", backgroundColor: "#ffffff", border: 0, }}>
              {buyProduct != null ?
                buyList.map((value,index) => (
                  <div>
                    {value.transactionType == 0 ?
                      <Card style={{ width: "90%", height: "40%", backgroundColor: "#e5fdfc" }}>
                        <Row>
                          <Col span={6} offset={6}> </Col>
                          <Col span={6} offset={6}>직거래</Col>
                        </Row>
                        <Row>
                          <Col span={10} offset={1}>
                            <img style={{ width: "10vh", height: "10vh", backgroundSize: "contain",
                                    borderRadius: "7px", overflow: "hidden"}}
                              onClick={() => {}}
                              ></img>
                          </Col>
                          <Col span={10} offset={2}>
                            <Row>{value.title}</Row>
                            <Row>
                              <Col>{value.traderName} | </Col>
                              <Col>{value.traderPhoneNumber}</Col>
                            </Row>
                            <Row>
                            <Col>{value.transactionCreatedTime[0]}{/*나중에 수정하기*/}
                            {value.transactionCreatedTime[1]}
                            {value.transactionCreatedTime[2]}
                            {value.transactionCreatedTime[3]}.
                            {value.transactionCreatedTime[5]}
                            {value.transactionCreatedTime[6]}.
                            {value.transactionCreatedTime[8]}
                            {value.transactionCreatedTime[9]}.
                               | </Col>
                              <Col>{value.transPrice}원</Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card>
                    :
                      <Card style={{ width: "90%", height: "40%", backgroundColor: "#e8f5ff" }}>
                        <Row>
                        <Col span={7} offset={5}> </Col>
                          <Col span={7} offset={5}>북을박스</Col>
                        </Row>
                        <Row>
                          <Col span={10} offset={1}>
                            <img style={{ width: "10vh", height: "10vh", backgroundSize: "contain",
                                    borderRadius: "7px", overflow: "hidden"}}
                              onClick={() => {}}
                              ></img>
                          </Col>
                          <Col span={10} offset={2}>
                            <Row>{value.title}</Row>
                            <Row>
                              <Col>{value.traderName} | </Col>
                              <Col>{value.traderPhoneNumber}</Col>
                            </Row>
                            <Row>
                            <Col>{value.transactionCreatedTime[0]}{/*나중에 수정하기*/}
                            {value.transactionCreatedTime[1]}
                            {value.transactionCreatedTime[2]}
                            {value.transactionCreatedTime[3]}.
                            {value.transactionCreatedTime[5]}
                            {value.transactionCreatedTime[6]}.
                            {value.transactionCreatedTime[8]}
                            {value.transactionCreatedTime[9]}.
                               | </Col>
                              <Col>{value.transPrice}원</Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card>
                    }
                  </div>
                ))
              : 
              <div>

              </div>
              }
            </Card>
            : null }
            {sellProduct == true ?
              <p>판매상품 프로세스</p>
            : null }
          </Row>
      </div>
  )
}