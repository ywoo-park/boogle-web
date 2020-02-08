import React, { useState, useEffect } from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import { withRouter, Link, Redirect } from "react-router-dom";
import { Row, Col, Icon, Card, Modal, Divider } from "antd";
import axios from 'axios';
import './MyPageBanner.css';
import Banner from '../Home/Banner.js';

export default function MyPageBanner() {
  const [name, setName] = useState("");
  const [likeList, setLikeList] = useState([]);
  const [buyList, setBuyList] = useState([]);
  const [sellList, setSellList] = useState([]);

  const [likeProduct, setLikeProduct] = useState(true);
  const [buyProduct, setBuyProduct] = useState(false);
  const [sellProduct, setSellProduct] = useState(false);

  const [level, setLevel] = useState(false);
  const [modal, setModal] = useState(false);
  const [boogleMoney, setBoogleMoney] = useState(false);

  // const[directStep, setDirectStep] = useState("");
  // const[boxStep, setBoxStep] = useState("");

  useEffect(() => {
    getMyPage();
  }, []);

  const getMyPage = () => {
    axios.get('http://13.124.113.72:8080/myPage', {
       headers: { Authorization: localStorage.getItem('token') }
     })

     .then((response) => {

       setName(response.data.data.userName)
       setLikeList(response.data.data.bookmarkedItemList)
       setBuyList(response.data.data.buyTransList)
       setSellList(response.data.data.sellTransList)

     });
     /*
     setBuyList([
      {
        "sellItemId": "5e302b91cf6c2a2fab5324fb",
        "traderName": "김중고",
        "traderPhoneNumber": "01012345678",
        "title": "선형대수학",
        "transactionType": 1,
        "transPrice": "20000",
        "transactionCreatedTime": "2020-02-01T10:17:13.576+0000",
        "transactionProcessedTimeList": [
            "2020-02-01T10:17:13.576+0000"
        ],
        "transactionStep": 4
      }
    ]); 
    */
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

  const changeTransactionStep = (sellItemId) => {
    axios.get('http://13.124.113.72:8080/transaction/step?sellItemId=' + sellItemId, {
       headers: { Authorization: localStorage.getItem('token') }
     })

     .then((response) => {
          console.log(response);
     });

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
    setBoogleMoney(false);
  }

  const showBoogleMoney = e => {
    setBoogleMoney(true);
    setLevel(false);
  }

  const payConfirmButtonHandler = () => {

  }

  return (
    <div style={{
      background: "url(https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/background.png)",
      height: "100vh", backgroundSize: "cover"
      , paddingTop: "1vh"
    }} className="mypage">
      <Row style={{ top: 10, marginBottom: "1vh" }}>
        <Col xs={{ span: 3 }}>
          <Link to="/">
            <img style={{
              width: "32px",
              height: "auto",
              marginLeft: "40%",
              filter: "brightness(0) invert(1)"
            }}
              src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/left_arrow.png" />
          </Link>
        </Col>
        <Col xs={{ span: 8, offset: 5 }}>
          <h5 style={{ color: "white" }}>
            마이페이지
                        </h5>
        </Col>
        <Link to='/'>
          <Col xs={{ span: 3, offset: 5 }}>
          </Col>
        </Link>
      </Row>
      <Row style={{ marginTop: "7vh" }}>
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
            onClick={() => { showModal(); showLevel(); }}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "5vh" }}>
        <label style={{ color: "#ffffff" }}>{name}님, 안녕하세요!</label>
      </Row>

      <Row>
        <Col xs={{ span: 4, offset: 6 }}>
          <Row>
            <Col xs={{ span: 24 }}>
              <Icon style={{
                color: "#ffffff",
                fontSize: "3vh",
              }} type="bell"
                onClick={() => { }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }}>
              <label style={{
                color: "#ffffff",
                fontSize: "2vh"
              }}>
                공지사항
                  </label>
            </Col>
          </Row>
        </Col>
        <Col xs={{ span: 4 }}>
          <Row>
            <Col xs={{ span: 24 }}>
              <Icon style={{
                color: "#ffffff",
                fontSize: "3vh",
              }} type="phone"
                onClick={() => { }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }}>
              <label style={{
                color: "#ffffff",
                fontSize: "2vh"
              }}>
                고객센터
                  </label >
            </Col>
          </Row>
        </Col>
        <Col xs={{ span: 4 }}>
          <Row>
            <Col xs={{ span: 24 }}>
              <Icon style={{
                color: "#ffffff",
                fontSize: "3vh",
              }} type="setting"
                onClick={() => { }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }}>
              <label style={{
                color: "#ffffff",
                fontSize: "2vh"
              }}>
                설정
                  </label>
            </Col>
          </Row>
        </Col>
      </Row>

      {modal == true ?
        <Modal
          visible={modal}
          onOk={() => { closeModal(); }}
          onCancel={() => { closeModal(); }}>
          {level == true ?
            <p>User Level Image</p>
            : null}
        </Modal>
        : null}

      <Row style={{ marginTop: "5vh" }}>
        <Col xs={{ span: 6, offset: 3 }}>
          <Row>
            <Col span={24}>
              {likeProduct == true ?
                <Icon style={{
                  color: "#ffffff",
                  fontSize: "5vh",
                }} type="heart"
                  theme="filled"
                  onClick={() => { viewLikeProduct(); }}
                />
                :
                <Icon style={{
                  color: "#ffffff",
                  fontSize: "5vh",
                }} type="heart"
                  onClick={() => { viewLikeProduct(); }}
                />
              }
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <small style={{
                color: "#ffffff",
                fontSize: "2vh"
              }}>
                관심상품
                    </small>
            </Col>
          </Row>
        </Col>
        <Col xs={{ span: 6 }}>
          <Row>
            <Col span={24}>
              {buyProduct == true ?
                <Icon style={{
                  color: "#ffffff",
                  fontSize: "5vh",
                }} type="heart"
                  theme="filled"
                  onClick={() => { viewBuyProduct(); }}
                />
                :
                <Icon style={{
                  color: "#ffffff",
                  fontSize: "5vh",
                }} type="heart"
                  onClick={() => { viewBuyProduct(); }}
                />
              }
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <small style={{
                color: "#ffffff",
                fontSize: "2vh"
              }}>
                구매현황
                    </small>
            </Col>
          </Row>
        </Col>
        <Col xs={{ span: 6 }}>
          <Row>
            <Col span={24}>
              {sellProduct == true ?
                <Icon style={{
                  color: "#ffffff",
                  fontSize: "5vh",
                }} type="heart"
                  theme="filled"
                  onClick={() => { viewSellProduct(); }}
                />
                :
                <Icon style={{
                  color: "#ffffff",
                  fontSize: "5vh",
                }} type="heart"
                  onClick={() => { viewSellProduct(); }}
                />
              }
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <small style={{
                color: "#ffffff",
                fontSize: "2vh"
              }}>
                판매현황
                    </small>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row id="user-product"
        style={{ marginTop: "5%", height: "45%" }}>
        {likeProduct == true ?
          <Card style={{ width: "100%", backgroundColor: "#ffffff", border: 0, paddingBottom: "15vh" }}>
            {likeList != null ?
              <div>
                <Row>
                  {likeList.map((value, index) => (

                    <Col span={7} offset={1}>
                      <Row>
                        <Col span={24}>
                          <img style={{ width: "10vh", height: "15vh", backgroundSize: "contain", borderRadius: "7px" }}
                            onClick={() => { }}
                            src={value.imageUrl}></img>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <label style={{ marginTop: "1vh", marginBottom: "-1vh", fontSize: "2vh" }}>
                            {value.title}</label>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} style={{ marginBottom: "2vh" }}>
                          <label style={{ fontSize: "2vh", color: "rgba(51, 158, 172, 0.9)" }}>{value.regiPrice}원</label>
                        </Col>
                      </Row>
                    </Col>

                  ))}
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
              :
              <div>
                <Row style={{ padding: "2vh" }}>
                  <p style={{ color: "#000000" }}>관심상품이 없습니다.</p>
                </Row>
                <Row>
                  <Icon style={{
                    color: "#000000",
                    fontSize: "5vh",
                  }} type="plus"></Icon>
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
          : null}
        {buyProduct == true ?
          <Card style={{ width: "100%", backgroundColor: "#ffffff", border: 0, }}>
            {buyProduct != null ?
              buyList.map((value, index) => (
                <div style={{ width: "95%", margin: "auto auto" }}>
                  {value.transactionType == 0 ?
                    <Card style={{
                      width: "100%", height: "40%", backgroundColor: "#e5fdfc",
                      marginBottom: "2vh", border: "none", borderRadius: "2.25vh", boxShadow: "0px 5px 10px #d3d3d3",
                      padding: "2vh",
                    }}>
                      <Row>
                        <Col span={6} offset={6}> </Col>
                        <Col span={6} offset={6} style={{ color: "#339eac", fontSize: "12pt" }}>직거래</Col>
                      </Row>

                      {value.transactionStep == 0 ?
                        <div>
                          <Row>
                            <Col span={5} offset={1}>
                              <img style={{
                                width: "8vh", height: "12vh", backgroundSize: "contain",
                                borderRadius: "7px", overflow: "hidden"
                              }}
                                onClick={() => { }}
                              ></img>
                            </Col>
                            <Col span={18} offset={0}>
                              <Row style={{ fontStyle: "bold", fontSize: "12pt", textAlign: "left" }}>
                                <Col offset={1}>
                                  {value.title}
                                </Col>
                              </Row>
                              <Row style={{ fontSize: "8pt", color: "gray", }}>
                                <Col span={11}>
                                  주문일자 : {/*나중에 수정하기*/}
                                  {value.transactionCreatedTime[2]}
                                  {value.transactionCreatedTime[3]}.
                              {value.transactionCreatedTime[5]}
                                  {value.transactionCreatedTime[6]}.
                              {value.transactionCreatedTime[8]}
                                  {value.transactionCreatedTime[9]}
                                </Col>
                                <Col span={12}> | 판매가격 : {value.transPrice}원
                              </Col>
                              </Row>
                              <Row style={{ fontSize: "12pt", color: "gray", marginTop: "2vh" }}>
                                <Col offset={3}>
                                  판매자 수락 대기 중
                              </Col>
                              </Row>
                            </Col>
                          </Row>
                        </div>
                        : null}

                    </Card>
                    :
                    <Card style={{
                      width: "100%", height: "40%", backgroundColor: "#e8f5ff",
                      marginBottom: "2vh", border: "none", borderRadius: "2.25vh", boxShadow: "0px 5px 10px #d3d3d3",
                      padding: "2vh",
                    }}>
                      <Row>
                        <Col span={7} offset={5}> </Col>
                        <Col span={7} offset={5} style={{ color: "#0b308e", fontSize: "12pt" }}>북을박스</Col>
                      </Row>
                      {value.transactionStep == 0 ?
                        <div>
                          <Row>
                            <Col span={5} offset={1}>
                              <img style={{
                                width: "8vh", height: "12vh", backgroundSize: "contain",
                                borderRadius: "7px", overflow: "hidden"
                              }}
                                onClick={() => { }}
                              ></img>
                            </Col>
                            <Col span={17} offset={0}>
                              <Row style={{ fontStyle: "bold", fontSize: "12pt", textAlign: "left" }}>
                                <Col offset={1}>
                                  {value.title}
                                </Col>
                              </Row>
                              <Row style={{ fontSize: "8pt", color: "gray", }}>
                                <Col span={12}>
                                  주문일자 : {/*나중에 수정하기*/}
                                  {value.transactionCreatedTime[2]}
                                  {value.transactionCreatedTime[3]}.
                              {value.transactionCreatedTime[5]}
                                  {value.transactionCreatedTime[6]}.
                              {value.transactionCreatedTime[8]}
                                  {value.transactionCreatedTime[9]}
                                </Col>
                                <Col span={12}> | 판매가격 : {value.transPrice}원
                              </Col>
                              </Row>
                              <Row style={{ fontSize: "12pt", color: "gray", marginTop: "2vh" }}>
                                <Col offset={3}>
                                  판매자 수락 대기 중
                              </Col>
                              </Row>
                            </Col>
                          </Row>
                        </div>

                        :

                        <div style={{ fontSize: "12pt", fontStyle: "bold" }}>
                          <Row>
                            <Col span={5} offset={1}>
                              <img style={{
                                width: "8vh", height: "12vh", backgroundSize: "contain",
                                borderRadius: "7px", overflow: "hidden"
                              }}
                                onClick={() => { }}
                              ></img>
                            </Col>
                            <Col span={17} offset={0}>
                              <Row style={{ fontStyle: "bold", fontSize: "12pt", textAlign: "left" }}>
                                <Col offset={1}>
                                  {value.title}
                                </Col>
                              </Row>
                              <Row style={{ fontSize: "8pt", color: "gray", }}>
                                <Col span={12}>
                                  주문일자 : {/*나중에 수정하기*/}
                                  {value.transactionCreatedTime[2]}
                                  {value.transactionCreatedTime[3]}.
                              {value.transactionCreatedTime[5]}
                                  {value.transactionCreatedTime[6]}.
                              {value.transactionCreatedTime[8]}
                                  {value.transactionCreatedTime[9]}
                                </Col>
                                <Col span={12}> | 판매가격 : {value.transPrice}원
                              </Col>
                              </Row>
                              <Row style={{ fontSize: "8pt", color: "gray", marginTop: "2vh" }}>
                                <Col offset={0} style={{ fontStyle: "bold" }}>
                                  판매자 : {value.traderName} |
                              연락처 : {value.traderPhoneNumber}
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                          <Row style={{ margin: "2vh", color: "#44a0ac" }}>
                            판매자 수락
                        </Row>
                          <Row style={{ fontSize: "5vh", margin: "2vh", color: "#038155" }}>
                            <Icon type="line" rotate="90" />
                          </Row>
                          <Row style={{ marginTop: "2vh", color: "#038196" }}>
                            결제 요청중
                        </Row>

                          {value.transactionStep == 1 ?
                            <div>
                              <Row style={{ marginBottom: "2vh" }}>
                                <button style={{
                                  padding: "0",
                                  width: "30%",
                                  background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                                  border: "none", borderRadius: "2.25vh", fontSize: "2vh", height: "3vh"
                                }}
                                  onClick={() => { showModal(); showBoogleMoney(); }}
                                >결제 하기</button>
                              </Row>
                              {modal == true ?
                                <Modal
                                  visible={modal}
                                  onOk={() => { closeModal(); }}
                                  onCancel={() => { closeModal(); }}>
                                  {boogleMoney == true ?
                                    <p>북을 계좌번호로 입금해주세요</p>
                                    : null}
                                </Modal>
                                : null}
                              <Row style={{ fontSize: "5vh", margin: "2vh", color: "gray" }}>
                                <Icon type="line" rotate="90" />
                              </Row>
                            </div>
                            :
                            <div>
                              <Row style={{ marginBottom: "2vh" }}>
                                <button style={{
                                  padding: "0",
                                  width: "30%",
                                  background: "gray", color: "#ffffff",
                                  border: "none", borderRadius: "2.25vh", fontSize: "2vh", height: "3vh"
                                }}
                                >결제 하기</button>
                              </Row>
                              <Row style={{ fontSize: "5vh", margin: "2vh", color: "#065d33" }}>
                                <Icon type="line" rotate="90" />
                              </Row>
                            </div>
                          }

                          {value.transactionStep == 4 || value.transactionStep > 4 ?
                            <Row style={{ margin: "2vh", color: "#065d92" }}>
                              물건 비치 완료
                          </Row>
                            :
                            <Row style={{ margin: "2vh", color: "gray" }}>
                              물건 비치 완료
                          </Row>
                          }

                          {value.transactionStep == 4 ?
                            <Row style={{ marginBottom: "2vh" }}>
                              <button style={{
                                padding: "0",
                                width: "30%",
                                background: "#075e92", color: "#ffffff",
                                border: "none", borderRadius: "2.25vh", fontSize: "2vh", height: "3vh"
                              }} onClick={() => { }}
                              >수령 하기</button>
                            </Row>
                            :
                            <Row style={{ marginBottom: "2vh" }}>
                              <button style={{
                                padding: "0",
                                width: "30%",
                                background: "gray", color: "#ffffff",
                                border: "none", borderRadius: "2.25vh", fontSize: "2vh", height: "3vh"
                              }} onClick={() => { }}
                              >수령 하기</button>
                            </Row>
                          }

                          {value.transactionStep > 4 ?
                            <Row style={{ fontSize: "5vh", margin: "2vh", color: "#0b308e" }}>
                              <Icon type="line" rotate="90" />
                            </Row>
                            :
                            <Row style={{ fontSize: "5vh", margin: "2vh", color: "gray" }}>
                              <Icon type="line" rotate="90" />
                            </Row>
                          }

                          {value.transactionStep == 5 || value.transactionStep > 5 ?
                            <Row style={{ marginBottom: "2vh", color: "#0b308e" }}>
                              거래 완료
                        </Row>
                            :
                            <Row style={{ marginBottom: "2vh", color: "gray" }}>
                              거래 완료
                        </Row>
                          }

                        </div>

                      }
                    </Card>
                  }
                </div>
              ))
              :
              <div>

              </div>
            }
          </Card>
          : null}
        {sellProduct == true ?
          <p>판매상품 프로세스</p>
          : null}
      </Row>
    </div>
  )
}