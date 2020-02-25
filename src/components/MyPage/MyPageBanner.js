import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { Row, Col, Icon, Card, Modal, Divider, Popconfirm } from "antd";
import axios from 'axios';
import './MyPageBanner.css';
import { useForm } from 'react-hook-form';

export default function MyPageBanner() {
  const [name, setName] = useState("");
  const [likeList, setLikeList] = useState([]);
  const [buyList, setBuyList] = useState([]);
  const [sellList, setSellList] = useState([]);

  const [likeProduct, setLikeProduct] = useState(true);
  const [buyProduct, setBuyProduct] = useState(false);
  const [sellProduct, setSellProduct] = useState(false);
  const [dirDetailCard, setDirDetailCard] = useState(false);
  const [boxDetailCard, setBoxDetailCard] = useState(false);
  const [boxActiveIndex, setBoxActiveIndex] = useState(-1);
  const [dirActiveIndex, setDirActiveIndex] = useState(-1);

  const [modal, setModal] = useState(false);
  const [level, setLevel] = useState(false);
  const [boogleBank, setBoogleBank] = useState(false);
  const [boxNum, setBoxNum] = useState(false);
  const [boxPassword, setBoxPassword] = useState(false);
  const [inputBoxId, setInputBoxId] = useState("");
  const [inputBoxPassword, setInputBoxPassword] = useState("");
  const [inputBoogleBoxComplete, setInputBoolgeBoxComplete] = useState(false);
  const [openBoxNum, setOpenBoxNum] = useState(false);
  const [openBoxPassword, setOpenBoxPassword] = useState(false);

  const [needRender, setNeedRender] = useState(false);

  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    console.log(data);
  };


  useEffect(() => {
    getMyPage();
  }, []);

  useEffect(() => {
    if(needRender) {
      getMyPage();
      setNeedRender(false)
    }
  }, [needRender]);

  const getMyPage = () => {
    axios.get('http://13.124.113.72:8080/myPage', {
      headers: { Authorization: localStorage.getItem('token') }
    })
      .then((response) => {
        console.log(response);
        setName(response.data.data.userName)
        setLikeList(response.data.data.bookmarkedItemList)
        setBuyList(response.data.data.buyTransList)
        setSellList(response.data.data.sellTransList)
        
      });
    
      /*
    setName("김유진");
    setLikeList([
      {
        "sellItemId": "5e4a7e5fcf6c2a3185854ba3",
        "imageUrl": "https://bookthumb-phinf.pstatic.net/cover/139/212/13921278.jpg?type=m1&udate=20181224",
        "title": "맨큐의 경제학",
        "regiPrice": "10000"
      },
    ]);
    setBuyList([
      {
        "sellItemId": "5e4a7e5fcf6c2a3185854ba3",
        "traderName": "박영우",
                "traderPhoneNumber": "01040525345",
                "title": "미시경제학",
                "transactionType": 0,
                "transPrice": "3000",
                "itemImageUrl": "https://bookthumb-phinf.pstatic.net/cover/144/297/14429703.jpg?type=m1&udate=20190207",
                "boxId": "",
                "boxPassword": "",
                "transactionCreatedTime": "2020-02-14T13:30:04.231+0000",
                "transactionProcessedTimeList": [
                    "2020-02-14T13:30:04.231+0000"
                ],
        "transactionStep": 3
      },
      {
        "sellItemId": "5e4a7e5fcf6c2a3185854ba3",
        "traderName": "박영우",
                "traderPhoneNumber": "01040525345",
                "title": "미시경제학",
                "transactionType": 1,
                "transPrice": "3000",
                "itemImageUrl": "https://bookthumb-phinf.pstatic.net/cover/144/297/14429703.jpg?type=m1&udate=20190207",
                "boxId": "",
                "boxPassword": "",
                "transactionCreatedTime": "2020-02-14T13:30:04.231+0000",
                "transactionProcessedTimeList": [
                    "2020-02-14T13:30:04.231+0000"
                ],
        "transactionStep": 1
      }
    ]);
    setSellList([
     {
        "sellItemId": "5e4a7e5fcf6c2a3185854ba3",
        "traderName": "박영우",
                "traderPhoneNumber": "01040525345",
                "title": "미시경제학",
                "transactionType": 0,
                "transPrice": "3000",
                "itemImageUrl": "https://bookthumb-phinf.pstatic.net/cover/144/297/14429703.jpg?type=m1&udate=20190207",
                "boxId": "",
                "boxPassword": "",
                "transactionCreatedTime": "2020-02-14T13:30:04.231+0000",
                "transactionProcessedTimeList": [
                    "2020-02-14T13:30:04.231+0000"
                ],
        "transactionStep": 3
      },
      {
        "sellItemId": "5e4a7e5fcf6c2a3185854ba3",
        "traderName": "박영우",
                "traderPhoneNumber": "01040525345",
                "title": "미시경제학",
                "transactionType": 1,
                "transPrice": "3000",
                "itemImageUrl": "https://bookthumb-phinf.pstatic.net/cover/144/297/14429703.jpg?type=m1&udate=20190207",
                "boxId": "",
                "boxPassword": "",
                "transactionCreatedTime": "",
                "transactionProcessedTimeList": [
                    "2020-02-14T13:30:04.231+0000"
                ],
        "transactionStep": 2
      }
      
    ]
    );
    */
    
  }


    const acceptBuyRequest = (sellItemId) => {
      axios.get('http://13.124.113.72:8080/transaction/step?sellItemId=' + sellItemId, {
      })
        .then((response) => {
            setNeedRender(true);
        });
    }

    const rejectBuyRequest = (sellItemId) => {
      axios.delete('http://13.124.113.72:8080/transaction?sellItemId=' + sellItemId, {
      })
        .then((response) => {
            setNeedRender(true);
        });
    }

  const completePayment = (sellItemId) => {
    axios.get('http://13.124.113.72:8080/transaction/payment?sellItemId=' + sellItemId, {
    })
      .then((response) => {
          setNeedRender(true);
      });    
  }

  const setBoogleBoxInfo = (boxId, boxPassword, sellItemId) => {

    axios.post('http://13.124.113.72:8080/transaction/booglebox', {
      "sellItemId" : sellItemId,
      "id" : boxId,
      "password" : boxPassword
    })
      .then((response) => {
          setNeedRender(true);
      });    

  }

  const changeTransactionStep = (sellItemId) => {

    axios.get('http://13.124.113.72:8080/transaction/step?sellItemId=' + sellItemId, {
      headers: { Authorization: localStorage.getItem('token') }
    })

      .then((response) => {
        console.log(response);
      });

  }

  const setBoogleBoxInfoOnClickHandler = (boxId, boxPassword, sellItemId) => {
    setBoogleBoxInfo(boxId, boxPassword, sellItemId);
  }

  const payConfirmOnClickHandler = (sellItemId) => {
    completePayment(sellItemId)
  }

  const boogleBoxInfoReceiveConfirmOnClickHandler = (sellItemId) => {
    changeTransactionStep(sellItemId);
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
    setBoogleBank(false);
    setBoxNum(false);
    setBoxPassword(false);
    setOpenBoxNum(false);
    setOpenBoxPassword(false);
  }

  const showBoogleBank = e => {
    setLevel(false);
    setBoogleBank(true);
    setBoxNum(false);
    setBoxPassword(false);
    setOpenBoxNum(false);
    setOpenBoxPassword(false);
  }

  const showBoxNum = e => {
    setLevel(false);
    setBoogleBank(false);
    setBoxNum(true);
    setBoxPassword(false);
    setOpenBoxNum(false);
    setOpenBoxPassword(false);
  }

  const showBoxPassword = e => {
    setLevel(false);
    setBoogleBank(false);
    setBoxNum(false);
    setBoxPassword(true);
    setOpenBoxNum(false);
    setOpenBoxPassword(false);
  }

  const showOpenBoxNum = e => {
    setLevel(false);
    setBoogleBank(false);
    setBoxNum(false);
    setBoxPassword(false);
    setOpenBoxNum(true);
    setOpenBoxPassword(false);
  }

  const showOpenBoxPassword = e => {
    setLevel(false);
    setBoogleBank(false);
    setBoxNum(false);
    setBoxPassword(false);
    setOpenBoxNum(false);
    setOpenBoxPassword(true);
  }


  return (
    <div style={{
      background: "url(https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/banner_background.png)",
      backgroundSize: "cover"
      , paddingTop: "24px"
    }} className="mypage">
      <Row style={{ top: 10, marginBottom: "24px" }}>
        <Col xs={{ span: 3 }}>
          <Link to="/">
            <img style={{
              width: "32px",
              height: "auto",
              marginLeft: "20px",
              filter: "brightness(0) invert(1)"
            }}
              src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/left_arrow.png" />
          </Link>
        </Col>
        <Col xs={{ span: 8, offset: 5 }}>
          <h5 style={{ color: "white", fontSize: "18px" }}>
            마이페이지</h5>
        </Col>
        <Link to='/'>
          <Col xs={{ span: 3, offset: 5 }}>
          </Col>
        </Link>
      </Row>
      <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Col>
          <Icon style={{
            color: "#ffffff",
            fontSize: "20vw"
          }} type="user"
            id="profile-circle"
            onClick={() => { /*showModal(); showLevel();*/ }}
          />
        </Col>
        {/* {modal === true ?
          <Modal
            visible={modal}
            onOk={() => { closeModal(); }}
            onCancel={() => { closeModal(); }}>
            {level === true ?
              <p>User Level Image</p>
              : null}
          </Modal>
            : null} */}
      </Row>
      <Row style={{ marginTop: "16px" }}>
        <label style={{ fontSize: "15px", color: "#ffffff" }}>{name}님, 안녕하세요!</label>
      </Row>

      <Row style={{ marginTop: "16px" }}>
        <Col xs={{ span: 4, offset: 6 }}
        onClick={() => {window.location.href='http://www.notion.so/boogle/3bbbb6ce5b554209ac14c900dba8ea88';}}>
          <Row>
            <Col xs={{ span: 24 }}>
              <img src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/bell.png"
              style={{width: "16px"}}/>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }}>
              <label style={{
                color: "#ffffff",
                fontSize: "12px"
              }}>
                공지사항
                  </label>
            </Col>
          </Row>
        </Col>
        <Link to='/customercenter'>
          <Col xs={{ span: 4 }}>
            <Row>
              <Col xs={{ span: 24 }}>
              <img src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/call.png"
              style={{width: "16px"}}/>
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 24 }}>
                <label style={{
                  color: "#ffffff",
                  fontSize: "12px"
                }}>
                  고객센터
                  </label >
              </Col>
            </Row>
          </Col>
        </Link>
        <Link to='/setting'>
        <Col xs={{ span: 4 }}>
          <Row>
            <Col xs={{ span: 24 }}>
            <img src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/setting.png"
              style={{width: "16px"}}/>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }}>
              <label style={{
                color: "#ffffff",
                fontSize: "12px"
              }}>
                설정
                  </label>
            </Col>            
          </Row>
        </Col>
        </Link>
      </Row>

      <Row style={{ marginTop: "27px" }}>
        <Col xs={{ span: 6, offset: 3 }}>
          <Row>
            <Col span={24}>
              {likeProduct === true ?
                <img src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/heart_selected.png"
                style={{width:"24px"}}
                  onClick={() => { viewLikeProduct(); }}
                />
                :
                <img src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/heart.png"
                style={{width:"24px"}}
                  onClick={() => { viewLikeProduct(); }}
                />
              }
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <small style={{
                color: "#ffffff",
                fontSize: "12px"
              }}>
                관심상품
                    </small>
            </Col>
          </Row>
        </Col>
        <Col xs={{ span: 6 }}>
          <Row>
            <Col span={24}>
              {buyProduct === true ?
                <img src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/heart_selected.png"
                style={{width:"24px"}}
                  onClick={() => { viewBuyProduct();
                  setDirDetailCard(false); setBoxDetailCard(false); }}
                />
                :
                <img src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/heart.png"
                style={{width:"24px"}}
                  onClick={() => { viewBuyProduct(); 
                  setDirDetailCard(false); setBoxDetailCard(false);}}
                />
              }
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <small style={{
                color: "#ffffff",
                fontSize: "12px"
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
                <img src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/heart_selected.png"
                  style={{width:"24px"}}
                  onClick={() => { viewSellProduct(); 
                    setDirDetailCard(false); setBoxDetailCard(false);}}
                />
                :
                <img src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/heart.png"
                  style={{width:"24px"}}
                  onClick={() => { viewSellProduct(); 
                    setDirDetailCard(false); setBoxDetailCard(false);}}
                />
              }
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <small style={{
                color: "#ffffff",
                fontSize: "12px"
              }}>
                판매현황
                    </small>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row id="user-product"
        style={{ marginTop: "24px", height: "45vh" }}>
        {likeProduct === true ?
          <Card style={{ width: "100%", height: "100%", backgroundColor: "#ffffff", border: 0, paddingBottom: "5vh" }}>
            {likeList.length !== 0 ?
              <div>
                <Row style={{margin: "auto auto", marginTop: "-1px", marginBottom: "2vh"}}>
                  {likeList.map((value, index) => (

                    <Col span={10} offset={0}
                    style={{width: "20vw", margin: "auto auto", marginLeft: "7vw"}}>
                      <Row>
                        <Col span={24}>
                          <Link to = {'/buy/detail/'+value.sellItemId}>
                          <img style={{
                            width: "18vw", height: "25vw", backgroundSize: "contain", borderRadius: "7px" }} 
                            src={value.imageUrl}></img>
                          </Link>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <label style={{ marginTop: "7px", marginBottom: "3px", fontSize: "12px" }}>
                            {value.title}</label>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} style={{ marginBottom: "23px" }}>
                          <label style={{ fontSize: "12px", color: "rgba(51, 158, 172, 0.9)" }}>{value.regiPrice}원</label>
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
                <Row style={{ padding: "2vh", margin: "2vh", marginBottom: "45%" }}>
                  <p style={{ color: "#000000", fontSize: "15px" }}>관심상품이 없습니다.</p>
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
          : null} {/* likeProduct != true 일 때는 null */}

        {buyProduct === true ?
          <Card style={{ width: "100%", backgroundColor: "#ffffff", border: 0}}>
            {buyList.length !== 0 && buyList != null ?
              buyList.map((value, index) => (
                <div style={{ width: "95%", margin: "auto auto", padding: "0px" }}>
                  {value.transactionType === 0 ?
                    <Card class = "product-card"
                    style={{
                      width: "100%", height: "40%", backgroundColor: "#e5fdfc",
                      border: "none", borderRadius: "2.25vh", boxShadow: "0px 5px 10px #d3d3d3",
                      margin: "auto auto", marginBottom: "2vh", padding: "0px",
                    }}>
                      <div style={{margin: "-15px"}}>
                      <Row style={{padding: "0"}}>
                        <Col span={24} style={{ color: "#339eac", fontSize: "16px", textAlign: "right" }}>직거래</Col>
                      </Row>

                      {value.transactionStep === 0 ?
                        <div>
                          <Row>
                            <Col span={6} offset={0}>
                            <Link to = {'/buy/detail/'+value.sellItemId}>
                              <img style={{
                                width: "64px", height: "97px", backgroundSize: "contain",
                                borderRadius: "7px", overflow: "hidden"
                              }} src={value.itemImageUrl}></img>
                            </Link>
                            </Col>
                            <Col span={17} offset={1}>
                              <Row style={{ fontStyle: "bold", fontSize: "15px", textAlign: "left",
                            color: "#656565", marginTop: "8px" }}>
                                <Col offset={0}>
                                  {value.title}
                                </Col>
                              </Row>
                              <Row style={{ fontSize: "12px", color: "#656565",marginTop: "24px", textAlign: "left" }}>
                                <Col span={14}>
                                  주문일자 : {/*나중에 수정하기*/}
                                  {value.transactionCreatedTime[2]}
                                  {value.transactionCreatedTime[3]}.
                                  {value.transactionCreatedTime[5]}
                                  {value.transactionCreatedTime[6]}.
                                  {value.transactionCreatedTime[8]}
                                  {value.transactionCreatedTime[9]}   |
                                </Col>
                                <Col span={10}>  금액 : {value.transPrice}원
                              </Col>
                              </Row>
                              <Row style={{ fontSize: "15px", color: "#959595", marginTop: "24px" }}>
                                <Col offset={2}>
                                  판매자 수락 대기 중
                              </Col>
                              </Row>
                            </Col>
                          </Row>
                        </div>
                        : 
                        <div>
                        <Row>
                            <Col span={6} offset={0}>
                            <Link to = {'/buy/detail/'+value.sellItemId}>
                              <img style={{
                                width: "64px", height: "97px", backgroundSize: "contain",
                                borderRadius: "7px", overflow: "hidden"
                              }} src={value.itemImageUrl}></img>
                            </Link>
                            </Col>
                            <Col span={17} offset={1}>
                            <Row style={{ fontStyle: "bold", fontSize: "15px", textAlign: "left",
                            color: "#656565" }}>
                                <Col offset={0}>
                                  {value.title}
                                </Col>
                              </Row>
                              <Row style={{ fontSize: "12px", color: "#656565", marginTop: "8px", textAlign: "left" }}>
                                <Col span={14}>
                                  주문일자 : {/*나중에 수정하기*/}
                                  {value.transactionCreatedTime[2]}
                                  {value.transactionCreatedTime[3]}.
                                  {value.transactionCreatedTime[5]}
                                  {value.transactionCreatedTime[6]}.
                                  {value.transactionCreatedTime[8]}
                                  {value.transactionCreatedTime[9]}   |
                                </Col>
                                <Col span={10}>  금액 : {value.transPrice}원
                              </Col>
                              </Row>
                            <Row style={{ fontSize: "12px", color: "#656565", marginTop: "24px", textAlign: "left" }}>
                                <Col offset={0} style={{ fontStyle: "bold" }}>
                                  판매자 : {value.traderName}  |
                                   연락처 : {value.traderPhoneNumber}
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                          <Row style={{ fontSize: "12px", color: "#656565", marginTop: "24px", textDecoration: "underline" }}>
                              {dirDetailCard === true && dirActiveIndex === index ?
                                <Col offset={20}>
                                <label onClick={() => { setDirDetailCard(false) }}>접기</label>
                                </Col>
                                :
                                <Col offset={16}>
                                <label onClick={() => { setDirDetailCard(true); 
                                  setDirActiveIndex(index) }}>거래상세보기</label>
                                </Col>
                              }
                          </Row>
                        {dirDetailCard === true && dirActiveIndex === index ?
                          <div style={{fontSize: "15px"}}>
                            <Row style={{ marginTop: "10px", color: "#44a0ac" }}>
                              판매자 수락
                            </Row>
                            <Row style={{ fontSize: "5vh", marginTop: "13.5px", color: "#038155" }}>
                                <Icon type="line" rotate="90" />
                            </Row>
                            {value.transactionStep === 2 || value.transactionStep > 2 ?
                            <Row style={{ marginTop: "13.5px", color: "#038196" }}>
                              거래중
                            </Row>
                            :
                            <Row style={{ marginTop: "13.5px", color: "#959595" }}>
                              거래중
                            </Row>
                            }
                            {value.transactionStep ===2 ?
                            <Row>
                            <button style={{
                              padding: "0",
                              width: "52px",
                              height: "21px",
                              background: "#075e92", color: "#ffffff",
                              border: "none", borderRadius: "5px", fontSize: "10px",
                              marginTop: "4px"
                            }}
                              onClick={() => { }}
                            >수령 완료</button> {/*버튼 통신 필요*/}
                          </Row>
                          : null}
                            {value.transactionStep === 3 ?
                            <div>
                              <Row style={{ fontSize: "5vh", marginTop: "13.5px", color: "#0b308e" }}>
                                <Icon type="line" rotate="90" />
                              </Row>
                              <Row style={{ marginTop: "13.5px", color: "#0b308e", marginBottom: "20px" }}>
                                거래 완료
                              </Row>
                            </div>
                            :
                            <div>
                            <Row style={{ fontSize: "5vh", marginTop: "13.5px", color: "#959595" }}>
                              <Icon type="line" rotate="90" />
                            </Row>
                            <Row style={{ marginTop: "13.5px", color: "#959595", marginBottom: "20px" }}>
                              거래 완료
                            </Row>
                            </div>
                            } {/*직거래 3단계*/}
                            
                          </div>
                          : null } {/*직거래 step들*/}
                      </div>
                    }
                    </div>
                    </Card>
                    :
                    <Card class = "product-card"
                    style={{
                      width: "100%", height: "40%", backgroundColor: "#e8f5ff",
                      border: "none", borderRadius: "2.25vh", boxShadow: "0px 5px 10px #d3d3d3",
                      margin: "auto auto", marginBottom: "2vh", padding: "0px",
                    }}>
                      <div style={{margin: "-15px"}}>
                      <Row style={{padding: "0"}}>
                        <Col span={24}style={{ color: "#0b308e", fontSize: "16px", textAlign: "right" }}>북을박스</Col>
                      </Row>
                      {value.transactionStep === 0 ?
                        <div>
                         <Row>
                            <Col span={6} offset={0}>
                            <Link to = {'/buy/detail/'+value.sellItemId}>
                              <img style={{
                                width: "10vh", height: "15vh", backgroundSize: "contain",
                                borderRadius: "7px", overflow: "hidden"
                              }} src={value.itemImageUrl}></img>
                            </Link>
                            </Col>
                            <Col span={17} offset={1}>
                              <Row style={{ fontStyle: "bold", fontSize: "15px", textAlign: "left",
                            color: "#656565" }}>
                                <Col offset={0}>
                                  {value.title}
                                </Col>
                              </Row>
                              <Row style={{ fontSize: "12px", color: "#656565", marginTop: "8px", textAlign: "left" }}>
                                <Col span={14}>
                                  주문일자 : {/*나중에 수정하기*/}
                                  {value.transactionCreatedTime[2]}
                                  {value.transactionCreatedTime[3]}.
                                  {value.transactionCreatedTime[5]}
                                  {value.transactionCreatedTime[6]}.
                                  {value.transactionCreatedTime[8]}
                                  {value.transactionCreatedTime[9]}   |
                                </Col>
                                <Col span={10}>  금액 : {value.transPrice}원
                              </Col>
                              </Row>
                              <Row style={{ fontSize: "15px", color: "#959595", marginTop: "24px" }}>
                                <Col offset={2}>
                                  판매자 수락 대기 중
                              </Col>
                              </Row>
                            </Col>
                          </Row>
                        </div>

                        : /*구매상품의 step이 0일 때와 아닐 때(판매자 수락 전, 후)*/

                        <div style={{ fontSize: "15px" }}>
                          <Row>
                            <Col span={6} offset={0}>
                            <Link to = {'/buy/detail/'+value.sellItemId}>
                              <img style={{
                                width: "64px", height: "97px", backgroundSize: "contain",
                                borderRadius: "7px", overflow: "hidden"
                              }} src={value.itemImageUrl}></img>
                            </Link>
                            </Col>
                            <Col span={17} offset={1}>
                            <Row style={{ fontStyle: "bold", fontSize: "15px", textAlign: "left",
                            color: "#656565" }}>
                                <Col offset={0}>
                                  {value.title}
                                </Col>
                              </Row>
                              <Row style={{ fontSize: "12px", color: "#656565", marginTop: "8px", textAlign: "left" }}>
                                <Col span={14}>
                                  주문일자 : {/*나중에 수정하기*/}
                                  {value.transactionCreatedTime[2]}
                                  {value.transactionCreatedTime[3]}.
                                  {value.transactionCreatedTime[5]}
                                  {value.transactionCreatedTime[6]}.
                                  {value.transactionCreatedTime[8]}
                                  {value.transactionCreatedTime[9]}   |
                                </Col>
                                <Col span={10}>  금액 : {value.transPrice}원
                              </Col>
                              </Row>
                            <Row style={{ fontSize: "12px", color: "#656565", marginTop: "24px", textAlign: "left" }}>
                                <Col offset={0} style={{ fontStyle: "bold" }}>
                                  판매자 : {value.traderName} 
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                          <Row style={{ fontSize: "12px", color: "#656565", marginTop: "24px", textDecorationLine: "underline" }}>
                              {boxDetailCard === true && boxActiveIndex === index ?
                                <Col offset={20}>
                                <label onClick={() => { setBoxDetailCard(false) }}>접기</label>
                                </Col>
                                : 
                                <Col offset={16}>
                                <label onClick={() => { setBoxDetailCard(true); 
                                  setBoxActiveIndex(index) }}>거래상세보기</label>
                                </Col>
                              }
                          </Row>
                        {boxDetailCard === true && boxActiveIndex === index ?
                          <div>
                          <Row style={{ marginTop: "10px", color: "#44a0ac" }}>
                            판매자 수락
                          </Row>
                          <Row style={{ fontSize: "5vh", marginTop: "13.5px", color: "#038155" }}>
                            <Icon type="line" rotate="90" />
                          </Row>
                          <Row style={{ marginTop: "13.5px", color: "#038196" }}>
                            결제 요청중
                          </Row>

                          {value.transactionStep === 1 ?
                            <div>
                              <Row>
                                <button style={{
                                  padding: "0",
                                  width: "52px",
                                  height: "21px",
                                  background: "#075e92", color: "#ffffff",
                                  border: "none", borderRadius: "5px", fontSize: "10px",
                                  marginTop: "4px"
                                }}
                                  onClick={() => { showModal(); showBoogleBank(); }}
                                >결제 하기</button>
                              </Row>
                              {modal === true ?
                                      <Modal
                                        footer={null}
                                        visible={modal}
                                        onCancel={() => { closeModal(); }}>
                                        {modal === true && boogleBank === true ?
                                        <div>
                                          <div style={{ textAlign: "left", border: "1px solid #a7a7a7", padding: "20px", marginTop: "40px", borderRadius: "18px" }}>
                                            <Row>
                                              <Col>
                                                <p style={{ color: "#535353", fontSize: "18px", fontWeight: 700 }}>
                                                  [국민은행] 030301-04-179401
                                                </p>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col>
                                                <p style={{ color: "#535353", fontSize: "18px", fontStyle: "bold" }}>
                                                  예금주 : 김수빈(북을)
                                                </p>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col>
                                                <p style={{ color: "#535353", fontSize: "18px", fontStyle: "bold" }}>
                                                  결제금액 : {value.transPrice}  원 </p>
                                              </Col>
                                            </Row>
                                          </div>
                                          <div style={{textAlign : "center", color : "707070", fontSize : "12px"}}>
                                            <Row style={{marginTop : "30px", marginBottom : "10px"}}>
                                              <Col><span>송금완료 확인 후 결제가 정상적으로 처리됩니다.</span></Col>
                                            </Row>
                                            <Row>
                                              <Col><span>북을 > 마이페이지에서 결제 상황을 반드시 확인해주세요.</span></Col>
                                            </Row>
                                          </div>
                                          <Row style={{marginTop : "30px"}}>
                                            <Col>
                                              <button style={{
                                                borderRadius: "14px", background: "rgba(51, 158, 172, 0.9)",
                                                color: "white", border: "none", fontSize: "12px", height: "25px", width: "100%",
                                                padding: "auto"
                                              }}
                                                onClick={() => {
                                                  
                                                  payConfirmOnClickHandler(value.sellItemId);
                                                  setNeedRender(true);
                                                  closeModal();
                                                  
                                                }}
                                              ><span>결제 완료</span></button>
                                            </Col>
                                          </Row>
                                          </div>                                          
                                          : null} {/*북을 계좌 끝*/}
                                      </Modal>
                                      : null} {/*모달 끝*/}
                              <Row style={{ fontSize: "5vh", marginTop: "13.5px", color: "#959595" }}>
                                <Icon type="line" rotate="90" />
                              </Row>
                            </div>
                            : /*1단계 아니면*/
                              <Row style={{ fontSize: "5vh", marginTop: "13.5px", color: "#065d33" }}>
                                <Icon type="line" rotate="90" />
                              </Row>
                          } {/*1단계 끝*/}

                          {value.transactionStep >= 3 ?
                          <div>
                          <Row style={{ marginTop: "13.5px", color: "#065d92" }}>
                              물건 비치 중
                          </Row>
                          <Row style={{ fontSize: "5vh", marginTop: "13.5px", color: "#065d33" }}>
                            <Icon type="line" rotate="90" />
                          </Row>
                          </div>
                          :
                          <div>
                          <Row style={{ marginTop: "13.5px", color: "#959595" }}>
                            물건 비치 중
                          </Row>
                          <Row style={{ fontSize: "5vh", marginTop: "13.5px", color: "#959595" }}>
                            <Icon type="line" rotate="90" />
                          </Row>
                          </div>
                          }

                          {value.transactionStep === 4 || value.transactionStep > 4 ?
                            <Row style={{ marginTop: "13.5px", color: "#065d92" }}>
                              물건 비치 완료
                          </Row>
                            :
                            <Row style={{ marginTop: "13.5px", color: "#959595" }}>
                              물건 비치 완료
                          </Row>
                          } {/*4단계 끝*/}

                          {value.transactionStep === 4 ?
                            <Row >
                              <button style={{
                                padding: "0",
                                width: "52px",
                                height: "21px",
                                background: "#075e92", color: "#ffffff",
                                border: "none", borderRadius: "5px", fontSize: "10px",
                                marginTop: "4px"
                              }} onClick={() => {showModal(); showOpenBoxNum();}}
                              >수령 하기</button>

                                {modal === true && openBoxNum === true ?
                                      <Modal
                                        visible={modal}
                                        footer={null}
                                        onCancel={() => { closeModal(); }}>
                                        {value.boxId !== "" ?
                                          <div style={{ textAlign: "center" }}>
                                            <Row>
                                              <p style={{ color: "#000000", fontSize: "5vh", position: "relative", top : 135 }}>
                                                {value.boxId}
                                              </p>
                                              <img style={{width : "50%"}} src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/boogle_box.png"></img>
                                            </Row>
                                            <Row style={{margin : "20px 0 20px 0"}}>
                                                  <Col><span>위에 표시된 번호의<br/>북을 박스를 찾아주세요</span></Col>
                                              </Row>  
                                            <Row style={{marginTop : "30px"}}>
                                              <Col>
                                                <button style={{
                                                  borderRadius: "14px", background: "rgba(51, 158, 172, 0.9)",
                                                  color: "white", border: "none", fontSize: "12px", height: "25px", width: "100%",
                                                  padding: "auto"
                                                }}
                                                  onClick={() => {
                                                    closeModal(); showModal(); showOpenBoxPassword(); 
                                                  }}
                                                ><span>비밀번호 보기</span></button>
                                              </Col>
                                            </Row>
                                          </div>
                                          :
                                          <div>
                                            {openBoxNum === true && value.boxId === "" ?
                                              <p style={{ color: "#000000", fontSize: "2vh", textAlign: "center", margin: "2vh" }}>
                                                북을박스에 비치되지 않아서 박스 번호가 없습니다.</p>
                                              : null}
                                          </div>
                                        } {/*북을박스 번호 조회 끝*/}
                                      </Modal>
                                      :
                                      <div>
                                        {modal === true && openBoxPassword === true ?
                                          <Modal
                                            visible={modal}
                                            footer={null}
                                            onCancel={() => { closeModal(); }}>
                                            {value.boxPassword !== "" ?
                                            <div style={{ textAlign: "center" }}>
                                            <Row>
                                              <p style={{ color: "#000000", fontSize: "5vh", position: "relative", top : 135 }}>
                                                {value.boxPassword}
                                              </p>
                                              <img style={{width : "50%"}} src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/boogle_box.png"></img>
                                            </Row>
                                            <Row style={{margin : "20px 0 20px 0"}}>
                                                  <Col><span>위에 표시된 비밀번호를<br/>눌러주세요</span></Col>
                                              </Row>  
                                            <Row style={{marginTop : "30px"}}>
                                              <Col>
                                              <Popconfirm
                                                    placement="bottom"
                                                    title="책을 북을 박스로 부터 수령하셨나요?"
                                                    onConfirm={()=>{boogleBoxInfoReceiveConfirmOnClickHandler(value.sellItemId)}}
                                                    okText="예"
                                                    cancelText="아니오"
                                              >
                                                <button style={{
                                                  borderRadius: "14px", background: "rgba(51, 158, 172, 0.9)",
                                                  color: "white", border: "none", fontSize: "12px", height: "25px", width: "100%",
                                                  padding: "auto"
                                                }}
                                                ><span>수령 완료</span></button>
                                                </Popconfirm>
                                              </Col>
                                            </Row>
                                          </div>
                                              :
                                              <div>
                                                {openBoxPassword === true && value.boxPassword === "" ?
                                                  <p style={{ color: "#000000", fontSize: "2vh", textAlign: "center", margin: "2vh" }}>
                                                    북을박스에 비치되지 않아서 비밀번호가 없습니다.</p>
                                                  : null}
                                              </div>
                                            } {/*북을박스 비밀번호 조회 끝*/}
                                          </Modal>
                                          : null}
                                      </div>
                                       } {/*모달 끝*/}
                            </Row>
                            :
                            null } {/*4단계 끝*/}

                          {value.transactionStep > 4 ?
                            <Row style={{ fontSize: "5vh", marginTop: "13.5px", color: "#0b308e" }}>
                              <Icon type="line" rotate="90" />
                            </Row>
                            :
                            <Row style={{ fontSize: "5vh", marginTop: "13.5px", color: "#959595" }}>
                              <Icon type="line" rotate="90" />
                            </Row>
                          } {/*4단계 끝*/}

                          {value.transactionStep === 5 || value.transactionStep > 5 ?
                            <Row style={{ marginTop: "13.5px", marginBottom: "20px", color: "#0b308e" }}>
                              거래 완료
                            </Row>
                            :
                            <Row style={{ marginTop: "13.5px", marginBottom: "20px", color: "#959595" }}>
                              거래 완료
                            </Row>
                        
                          } {/*5단계 끝*/}
                        
                          </div>
                         : null}  {/*거래상세보기 끝*/}
                        </div>
                        
                        }
                        </div>
                      </Card>
                  }
                </div>
              ))
              :  /*구매현황 없을 때*/
              <div>
                <Row style={{ padding: "2vh", margin: "2vh", marginBottom: "45%" }}>
                  <p style={{ color: "#000000", fontSize: "15px" }}>
                    구매 중인 상품이 없습니다.</p>
                </Row>
                <Row>
                  <Link to="/">
                    <button style={{
                      padding: "0",
                      width: "100%",
                      background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                      border: "none", borderRadius: "2.25vh", fontSize: "2.5vh", height: "5vh"
                    }}
                    >구매하러 가기</button>
                  </Link>
                </Row>
              </div>
            } {/* 구매상품 없을 때 뷰 끝 */}
          </Card>
          : null} {/* buyProduct != true 일 때 null */}

        {sellProduct === true ?
          <Card style={{ width: "100%", backgroundColor: "#ffffff", border: 0, }}>
            {sellList.length !== 0 && sellList != null ?
              sellList.map((value, index) => (
                <div style={{ width: "95%", margin: "auto auto" }}>
                  {value.transactionType === 0 ?
                  <div>
                  <div style={{ width: "100%", margin: "auto auto", padding: "0px" }}>
                    {value.transactionStep === -1 ?
                      <Card class = "product-card"
                      style={{
                        width: "100%", height: "40%", backgroundColor: "#e0e0e0",
                        border: "none", borderRadius: "2.25vh", boxShadow: "0px 5px 10px #d3d3d3",
                        margin: "auto auto", marginBottom: "2vh", padding: "0px",
                      }}>
                        <div style={{margin: "-15px"}}>
                        <Row style={{padding: "0"}}>
                          <Col span={24} style={{ color: "#707070", fontSize: "16px", textAlign: "right" }}>직거래</Col>
                        </Row>

                        <Row>
                            <Col span={6} offset={0}>
                            <Link to = {'/buy/detail/'+value.sellItemId}>
                              <img style={{
                                width: "64px", height: "97px", backgroundSize: "contain",
                                borderRadius: "7px", overflow: "hidden"
                              }} src={value.itemImageUrl}></img>
                            </Link>
                            </Col>
                            <Col span={17} offset={0}>
                              <Row style={{ fontStyle: "bold", fontSize: "15px", textAlign: "left",
                            color: "#656565" }}>
                                <Col offset={2}>
                                  {value.title}
                                </Col>
                              </Row>
                              <Row style={{ fontSize: "12px", textAlign: "left", marginTop: "8px", color: "#656565", }}>
                                <Col span={12} offset={2}>금액 : {value.transPrice}원
                              </Col>
                              </Row>
                              <Row style={{ fontSize: "15px", color: "#959595", marginTop: "17px" }}>
                                <Col offset={2}>
                                  등록 완료
                              </Col>
                              </Row>
                            </Col>
                          </Row>
                        </div>
                    </Card>
                    : /*판매등록된 상품인지 거래 중인지*/

                    <Card class = "product-card"
                      style={{
                        width: "100%", height: "40%", backgroundColor: "#e5fdfc",
                        border: "none", borderRadius: "2.25vh", boxShadow: "0px 5px 10px #d3d3d3",
                        margin: "auto auto", marginBottom: "2vh", padding: "0px",
                      }}>
                      <div style={{margin: "-15px"}}>
                      <Row>
                        <Col span={24} style={{ color: "#339eac", fontSize: "16px", textAlign: "right" }}>직거래</Col>
                      </Row>

                      {value.transactionStep === 0 ?
                        <div>
                        <Row>
                          <Col span={6} offset={0}>
                          <Link to = {'/buy/detail/'+value.sellItemId}>
                            <img style={{
                              width: "64px", height: "97px", backgroundSize: "contain",
                              borderRadius: "7px", overflow: "hidden"
                            }} src={value.itemImageUrl}></img>
                          </Link>
                          </Col>
                          <Col span={17} offset={1}>
                            <Row style={{ fontStyle: "bold", fontSize: "15px", textAlign: "left" }}>
                              <Col offset={0}>
                                {value.title}
                              </Col>
                            </Row>
                            <Row style={{ fontSize: "12px", color: "#656565", marginTop: "8px", textAlign: "left" }}>
                              <Col span={14}>
                                주문일자 : {/*나중에 수정하기*/}
                                {value.transactionCreatedTime[2]}
                                {value.transactionCreatedTime[3]}.
                                {value.transactionCreatedTime[5]}
                                {value.transactionCreatedTime[6]}.
                                {value.transactionCreatedTime[8]}
                                {value.transactionCreatedTime[9]}   |
                              </Col>
                              <Col span={10}>  금액 : {value.transPrice}원
                            </Col>
                            </Row>
                            <Row style={{ fontSize: "14px", color: "#056d94", marginTop: "8px" }}>
                            <Col offset={7} span={8} style={{ fontStyle: "bold" }}>
                              구매 요청
                            </Col>
                          </Row>
                            <Row style={{ color: "#ffffff", marginTop: "0" }}>
                              <Col span={6} offset={5}>
                                <button style={{
                                  padding: "0",
                                  width: "42px",
                                  height: "21px",
                                  background: "#656565", 
                                  border: "none", borderRadius: "5px", fontSize: "10px",
                                  marginLeft: "0"
                                }}
                                  onClick={() => {rejectBuyRequest(value.sellItemId)}}
                                >거절</button>
                              </Col>
                              <Col span={5} offset={1}>
                                <button style={{
                                   padding: "0",
                                   width: "42px",
                                   height: "21px",
                                   background: "#075e92",
                                   border: "none", borderRadius: "5px", fontSize: "10px",
                                   marginLeft: "0"
                                }}
                                  onClick={() => {acceptBuyRequest(value.sellItemId)}}
                                >수락</button>
                              </Col>
                            </Row>

                          </Col>
                        </Row>
                      </div>
                        : 
                        <div>
                        <Row>
                            <Col span={6} offset={0}>
                            <Link to = {'/buy/detail/'+value.sellItemId}>
                              <img style={{
                                width: "64px", height: "97px", backgroundSize: "contain",
                                borderRadius: "7px", overflow: "hidden"
                              }} src={value.itemImageUrl}></img>
                            </Link>
                            </Col>
                            <Col span={17} offset={1}>
                              <Row style={{ fontStyle: "bold", fontSize: "15px", textAlign: "left" }}>
                                <Col offset={0}>
                                  {value.title}
                                </Col>
                              </Row>
                              <Row style={{ fontSize: "12px", color: "#656565", marginTop: "8px", textAlign: "left"}}>
                              <Col span={14} offset={0}>
                                주문일자 : {/*나중에 수정하기*/}
                                {value.transactionCreatedTime[2]}
                                {value.transactionCreatedTime[3]}.
                                {value.transactionCreatedTime[5]}
                                {value.transactionCreatedTime[6]}.
                                {value.transactionCreatedTime[8]}
                                {value.transactionCreatedTime[9]}   |
                              </Col>
                              <Col span={10}>  금액 : {value.transPrice}원
                            </Col>
                            </Row>
                            <Row style={{ fontSize: "12px", color: "#656565", marginTop: "24px", textAlign: "left" }}>
                                <Col offset={0} style={{ fontStyle: "bold" }}>
                                  구매자 : {value.traderName}  |
                                   연락처 : {value.traderPhoneNumber}
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                          <Row style={{ fontSize: "12px", color: "#656565", marginTop: "24px", textDecoration: "underline" }}>
                              {dirDetailCard === true && dirActiveIndex === index ?
                                <Col offset={20}>
                                <label onClick={() => { setDirDetailCard(false) }}>접기</label>
                                </Col>
                                :
                                <Col offset={16}>
                                <label onClick={() => { setDirDetailCard(true); 
                                  setDirActiveIndex(index) }}>거래상세보기</label>
                                </Col>
                              }
                          </Row>
                        {dirDetailCard === true && dirActiveIndex === index ?
                          <div style={{fontSize: "15px"}}>
                            <Row style={{ marginTop: "10px", color: "#44a0ac" }}>
                              구매 요청 수락
                            </Row>
                            <Row style={{ fontSize: "5vh", margin: "13.5px", color: "#038155" }}>
                              <Icon type="line" rotate="90" />
                            </Row>
                            {value.transactionStep === 2 || value.transactionStep > 2 ?
                            <Row style={{ marginTop: "13.5px", color: "#038196" }}>
                              거래중
                            </Row>
                            :
                            <Row style={{ marginTop: "13.5px", color: "#656565" }}>
                              거래중
                            </Row>
                            }
                            {value.transactionStep === 3 ?
                            <div>
                              <Row style={{ fontSize: "5vh", marginTop: "13.5px", color: "#0b308e" }}>
                                <Icon type="line" rotate="90" />
                              </Row>
                              <Row style={{ marginTop: "13.5px", color: "#0b308e", marginBottom: "20px" }}>
                                거래 완료
                              </Row>
                            </div>
                            :
                            <div>
                            <Row style={{ fontSize: "5vh", marginTop: "13.5px", color: "#656565" }}>
                              <Icon type="line" rotate="90" />
                            </Row>
                            <Row style={{ marginTop: "13.5px", color: "#656565", marginBottom: "20px" }}>
                              거래 완료
                            </Row>
                            </div>
                            } {/*직거래 3단계*/}
                            
                          </div>
                          : null } {/*직거래 step들*/}
                      </div>
                    }
                    </div>
                    </Card>
                    } {/*판매등록된 상품 끝*/}
                    </div>
                  </div>
                    :  /*직거래인지 북을박스인지 구분*/
                    <div>
                    <div>
                    {value.transactionStep === -1 ?
                    <Card class = "product-card"
                    style={{
                      width: "100%", height: "40%", backgroundColor: "#e0e0e0",
                      border: "none", borderRadius: "2.25vh", boxShadow: "0px 5px 10px #d3d3d3",
                      margin: "auto auto", marginBottom: "2vh", padding: "0px",
                    }}>
                      <div style={{margin: "-15px"}}>
                      <Row style={{padding: "0"}}>
                        <Col span={24}style={{ color: "#707070", fontSize: "16px", textAlign: "right" }}>북을박스</Col>
                      </Row>

                      <Row>
                          <Col span={6} offset={0}>
                          <Link to = {'/buy/detail/'+value.sellItemId}>
                            <img style={{
                              width: "64px", height: "97px", backgroundSize: "contain",
                              borderRadius: "7px", overflow: "hidden"
                            }} src={value.itemImageUrl}></img>
                          </Link>
                          </Col>
                          <Col span={17} offset={0}>
                            <Row style={{ fontStyle: "bold", fontSize: "15px", textAlign: "left",
                          color: "#656565" }}>
                              <Col offset={2}>
                                {value.title}
                              </Col>
                            </Row>
                            <Row style={{ fontSize: "12px", textAlign: "left", marginTop: "8px", color: "#656565", }}>
                              <Col span={12} offset={2}>금액 : {value.transPrice}원
                            </Col>
                            </Row>
                            <Row style={{ fontSize: "15px", color: "#959595", marginTop: "17px" }}>
                              <Col offset={2}>
                                등록 완료
                            </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                  </Card>
                    : /*판매등록된 상품인지 거래 중인지*/
                    <Card class = "product-card"
                      style={{
                        width: "100%", height: "40%", backgroundColor: "#e8f5ff",
                        border: "none", borderRadius: "2.25vh", boxShadow: "0px 5px 10px #d3d3d3",
                        margin: "auto auto", marginBottom: "2vh", padding: "0px",
                      }}>
                      <div style={{margin: "-15px"}}>
                      <Row>
                        <Col span={24} style={{ color: "#0b308e", fontSize: "16px", textAlign: "right" }}>북을박스</Col>
                      </Row>

                      {value.transactionStep === 0 ?
                        <div>
                          <Row>
                            <Col span={6} offset={0}>
                            <Link to = {'/buy/detail/'+value.sellItemId}>
                              <img style={{
                                width: "64px", height: "97px", backgroundSize: "contain",
                                borderRadius: "7px", overflow: "hidden"
                              }} src={value.itemImageUrl}></img>
                            </Link>
                            </Col>
                            <Col span={17} offset={1}>
                              <Row style={{ fontStyle: "bold", fontSize: "15px", textAlign: "left" }}>
                                <Col offset={0}>
                                  {value.title}
                                </Col>
                              </Row>
                              <Row style={{ fontSize: "12px", color: "#656565", marginTop: "8px", textAlign: "left" }}>
                                <Col span={14}>
                                  주문일자 : {/*나중에 수정하기*/}
                                  {value.transactionCreatedTime[2]}
                                  {value.transactionCreatedTime[3]}.
                                  {value.transactionCreatedTime[5]}
                                  {value.transactionCreatedTime[6]}.
                                  {value.transactionCreatedTime[8]}
                                  {value.transactionCreatedTime[9]}   |
                                </Col>
                                <Col span={10}>  금액 : {value.transPrice}원
                              </Col>
                              </Row>
                              <Row style={{ fontSize: "14px", color: "#056d94", marginTop: "8px" }}>
                              <Col offset={7} span={8} style={{ fontStyle: "bold" }}>
                                구매 요청
                              </Col>
                            </Row>
                              <Row style={{ color: "#ffffff", marginTop: "0" }}>
                                <Col span={6} offset={5}>
                                  <button style={{
                                    padding: "0",
                                    width: "42px",
                                    height: "21px",
                                    background: "#656565", 
                                    border: "none", borderRadius: "5px", fontSize: "10px",
                                    marginLeft: "0"
                                  }}
                                    onClick={() => {rejectBuyRequest(value.sellItemId)}}
                                  >거절</button>
                                </Col>
                                <Col span={5} offset={1}>
                                  <button style={{
                                     padding: "0",
                                     width: "42px",
                                     height: "21px",
                                     background: "#075e92",
                                     border: "none", borderRadius: "5px", fontSize: "10px",
                                     marginLeft: "0"
                                  }}
                                    onClick={() => {acceptBuyRequest(value.sellItemId)}}
                                  >수락</button>
                                </Col>
                              </Row>

                            </Col>
                          </Row>
                        </div>

                        : /*판매상품의 step이 0일 때와 아닐 때(판매자 수락 전, 후)*/

                        <div>
                          <Row>
                            <Col span={6} offset={0}>
                            <Link to = {'/buy/detail/'+value.sellItemId}>
                              <img style={{
                                width: "64px", height: "97px", backgroundSize: "contain",
                                borderRadius: "7px", overflow: "hidden"
                              }} src={value.itemImageUrl}></img>
                            </Link>
                            </Col>
                            <Col span={17} offset={1}>
                              <Row style={{ fontStyle: "bold", fontSize: "15px", textAlign: "left" }}>
                                <Col offset={0}>
                                  {value.title}
                                </Col>
                              </Row>
                              <Row style={{ fontSize: "12px", color: "#656565", marginTop: "8px", textAlign: "left" }}>
                                <Col span={14}>
                                  주문일자 : {/*나중에 수정하기*/}
                                  {value.transactionCreatedTime[2]}
                                  {value.transactionCreatedTime[3]}.
                                  {value.transactionCreatedTime[5]}
                                  {value.transactionCreatedTime[6]}.
                                  {value.transactionCreatedTime[8]}
                                  {value.transactionCreatedTime[9]}   |
                                </Col>
                                <Col span={10}>  금액 : {value.transPrice}원
                              </Col>
                              </Row>
                              <Row style={{ fontSize: "12px", color: "#656565", marginTop: "24px" }}>
                                <Col offset={0} style={{ fontStyle: "bold", textAlign: "left" }}>
                                  구매자 : {value.traderName}
                                </Col>
                              </Row>
                          </Col>
                          </Row>
                          <Row style={{ fontSize: "12px", color: "#656565", marginTop: "24px", textDecoration: "underline" }}>
                              {boxDetailCard === true && boxActiveIndex === index ?
                                <Col offset={20}>
                                <label onClick={() => { setBoxDetailCard(false) }}>접기</label>
                                </Col>
                                :
                                <Col offset={16}>
                                <label onClick={() => { setBoxDetailCard(true); 
                                  setBoxActiveIndex(index) }}>거래상세보기</label>
                                </Col>
                              }
                          </Row>
                        {boxDetailCard === true && boxActiveIndex === index ?
                          <div style={{fontSize: "15px"}}>
                          <Row style={{ marginTop: "10px", color: "#44a0ac" }}>
                            구매 요청 수락
                          </Row>
                          <Row style={{ fontSize: "5vh", marginTop: "13.5px", color: "#038155" }}>
                            <Icon type="line" rotate="90" />
                          </Row>
                          <Row style={{ marginTop: "13.5px", color: "#038196" }}>
                            구매자 결제 완료
                          </Row>

                          {value.transactionStep === 1 ?
                            <div>
                              <Row>
                              <button style={{
                                padding: "0",
                                width: "52px",
                                height: "21px",
                                background: "#075e92", color: "#ffffff",
                                border: "none", borderRadius: "5px", fontSize: "10px",
                                marginTop: "4px"
                              }} onClick={() => {}}
                              >결제 정보</button> {/* 결제정보 설정페이지로 연결해야할 듯 */}
                              </Row>
                              <Row style={{ fontSize: "5vh", marginTop: "13.5px", color: "#656565" }}>
                                <Icon type="line" rotate="90" />
                              </Row>
                            </div>
                            : /*1단계 아니면*/
                              <Row style={{ fontSize: "5vh", marginTop: "13.5px", color: "#065d33" }}>
                                <Icon type="line" rotate="90" />
                              </Row>
                          } {/*1단계 끝*/}

                          {value.transactionStep === 2 || value.transactionStep > 2 ?
                            <Row style={{ marginTop: "13.5px", color: "#065d92" }}>
                              물품 비치 중
                            </Row>
                            : /*4단계 이상인지 아닌지*/
                            <Row style={{ marginTop: "13.5px", color: "#656565" }}>
                              물품 비치 중
                            </Row>
                          } {/*4단계 이상인지 끝*/}

                          {value.transactionStep === 2 ?
                            <Row>
                              <button style={{
                                padding: "0",
                                width: "52px",
                                height: "21px",
                                background: "#075e92", color: "#ffffff",
                                border: "none", borderRadius: "5px", fontSize: "10px",
                                marginTop: "4px"
                              }} onClick={() => {showModal(); showBoxNum();}}
                              >비치 하기</button>
                               {modal === true && boxNum === true ?
                                          <Modal
                                            footer={null}
                                            visible={modal}
                                            onCancel={() => { closeModal(); }}>
                                            <div style={{ textAlign: "center" }}>
                                              <form onSubmit={handleSubmit(onSubmit)}>
                                                <Row>
                                                  <img style={{width : "50%"}} src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/boogle_box.png"></img>
                                                </Row>
                                                <Row style={{margin : "20px 0 0 0"}}>
                                                  <input
                                                  style={{border : "1px solid #707070", borderRadius : "16px", 
                                                width : "50%", textAlign : "center"}}
                                                  type="text" name="id" ref={register}
                                                  onChange={(e) => {setInputBoxId(e.target.value)}} />
                                                </Row>
                                                <Row style={{margin : "20px 0 20px 0"}}>
                                                  <Col><span>도서를 비치하신 북을박스 번호를 입력해주세요</span></Col>
                                                </Row>  
                                                <Row>
                                                  <button style={{
                                                    borderRadius: "14px", background: "rgba(51, 158, 172, 0.9)",
                                                    color: "white", border: "none", fontSize: "12px", height: "25px", width: "75%",
                                                    padding: "auto"
                                                  }}
                                                    onClick={() => {closeModal(); showModal(); showBoxPassword(); }}
                                                  >입력하기</button>                                                  
                                                </Row>
                                              </form>{/*북을박스 번호 입력 끝*/}
                                            </div>
                                          </Modal>
                                          :
                                          <div>
                                            {modal === true && boxPassword === true ?
                                              <Modal
                                                visible={modal}
                                                footer={null}
                                                onCancel={() => { closeModal(); }}>
                                                <div style={{ textAlign: "center" }}>
                                                <Row>
                                                  <img style={{width : "50%"}} src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/boogle_box.png"></img>
                                                </Row>
                                                <Row style={{margin : "20px 0 0 0"}}>
                                                  <input
                                                  style={{border : "1px solid #707070", borderRadius : "16px", 
                                                width : "50%", textAlign : "center"}}
                                                  type="text" name="password" ref={register}
                                                  onChange={(e) => {setInputBoxPassword(e.target.value)}} />
                                                </Row>
                                                <Row style={{margin : "20px 0 20px 0"}}>
                                                  <Col><span>도서를 비치하신 북을박스 비밀번호를 <br/>입력해주세요</span></Col>
                                                </Row>  
                                                <Row>
                                                  <button style={{
                                                    borderRadius: "14px", background: "rgba(51, 158, 172, 0.9)",
                                                    color: "white", border: "none", fontSize: "12px", height: "25px", width: "75%",
                                                    padding: "auto"
                                                  }}
                                                  onClick={() => {
                                                    setBoogleBoxInfoOnClickHandler(inputBoxId, inputBoxPassword, value.sellItemId); 
                                                    closeModal();}}
                                                  >입력하기</button>                                                  
                                                </Row>
                                                </div>
                                              </Modal>
                                              : null}
                                          </div>
                                        } {/*모달 끝*/}
                              
                            </Row>
                            :
                            null } {/*4단계 버튼 끝*/}

                          {value.transactionStep > 4 ?
                            <Row style={{ fontSize: "5vh", marginTop: "13.5px", color: "#0b308e" }}>
                              <Icon type="line" rotate="90" />
                            </Row>
                            :
                            <Row style={{ fontSize: "5vh", marginTop: "13.5px", color: "#656565" }}>
                              <Icon type="line" rotate="90" />
                            </Row>
                          } {/*4단계 끝*/}

                          {value.transactionStep === 5 || value.transactionStep > 5 ?
                          <div>
                            <Row style={{ marginTop: "13.5px", marginBottom: "20px", color: "#0b308e" }}>
                              거래 완료
                            </Row>
                          </div>
                            : /*5단계 이상인지 아닌지*/
                            <Row style={{ marginTop: "13.5px", marginBottom: "20px", color: "#656565" }}>
                              거래 완료
                            </Row>
                        
                          } {/*5단계 끝*/}
                        
                          </div>
                         : null}  {/*거래상세보기 끝*/}
                        </div>
                        
                        }
                      </div>
                      </Card>
                      } {/*판매등록된 상품이 아닐 때 끝*/}
                      </div>

                    </div>}
                
                </div>
              ))
              :  /*판매현황 없을 때*/
              <div>
                <div>
                <Row style={{ padding: "2vh", margin: "2vh", marginBottom: "45%" }}>
                  <p style={{ color: "#000000", fontSize: "15px" }}>
                    판매 중인 상품이 없습니다.</p>
                </Row>
                <Row>
                  <Link to="/">
                    <button style={{
                      padding: "0",
                      width: "100%",
                      background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                      border: "none", borderRadius: "2.25vh", fontSize: "2.5vh", height: "5vh"
                    }}
                    >판매하러 가기</button>
                  </Link>
                </Row>
              </div>
              </div>
            } {/* 판매상품 없을 때 뷰 끝 */}
          </Card>
          : null} {/* sellProduct != true 일 때 null */}

      </Row>
    </div>
  )
}