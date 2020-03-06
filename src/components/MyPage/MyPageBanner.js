import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Icon, Card, Modal, Popconfirm, Collapse } from "antd";
import axios from 'axios';
import './MyPageBanner.css';
import { useForm } from 'react-hook-form';

import host from '../../server-settings/ServerApiHost';

export default function MyPageBanner() {
    const [name, setName] = useState("");
    const [likeList, setLikeList] = useState([]);
    const [buyList, setBuyList] = useState([]);
    const [sellList, setSellList] = useState([]);
    const [reserveList, setReserveList] = useState([]);

    const [likeProduct, setLikeProduct] = useState(true);
    const [buyProduct, setBuyProduct] = useState(false);
    const [sellProduct, setSellProduct] = useState(false);
    const [reserveProduct, setReserveProduct] = useState(false);

    const [buyDetailIndex, setBuyDetailIndex] = useState([]);
    const [sellDetailIndex, setSellDetailIndex] = useState([]);

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
        axios.get(host + '/myPage', {
            headers: { Authorization: localStorage.getItem('token') }
        })
            .then((response) => {
                setName(response.data.data.userName)
                setLikeList(response.data.data.bookmarkedItemList)
                setBuyList(response.data.data.buyTransList)
                setSellList(response.data.data.sellTransList)

            });
        axios.get(host + '/itemReceiving' , {
            headers: { Authorization: localStorage.getItem('token') }
        })
            .then((response) => {
                setReserveList(response.data.data)
            })
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
                        "transactionType": 1,
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
                "transactionStep": 5
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
                "transactionStep": 5
              }
            ]);

            setReserveList([
              {
                "_id": "5e5f9268367e0826aa7fb4a3",
                "itemId": "9788962184181",
                "userId": 10,
                "imageUrl": "https://bookthumb-phinf.pstatic.net/cover/139/212/13921278.jpg?type=m1&udate=20181224",
                "title": "맨큐의 경제학",
                "author": "그레고리 맨큐",
                "publisher": "한티에듀"
            },
            {
                "_id": "5e5f9908367e0826aa7fb4a5",
                "itemId": "9788962184204",
                "userId": 10,
                "imageUrl": "https://bookthumb-phinf.pstatic.net/cover/140/134/14013423.jpg?type=m1&udate=20190204",
                "title": "맨큐의 경제학 연습문제풀이",
                "author": "그레고리 맨큐",
                "publisher": "한티미디어"
            }
            ]);
        */
    }

    // 거래상세보기 기능을 위한 함수들
    const setList = () => {
        for (var buy in buyList) {
            buyDetailIndex[buy] = 0
        }
        for (var sell in sellList) {
            sellDetailIndex[sell] = 0
        }
    }
    const buyDetail = (i) => {
        buyDetailIndex[i] = 1
        setNeedRender(true)
    }
    const noBuyDetail = (i) => {
        buyDetailIndex[i] = 0
        setNeedRender(true)
    }
    const sellDetail = (i) => {
        sellDetailIndex[i] = 1
        setNeedRender(true)
    }
    const noSellDetail = (i) => {
        sellDetailIndex[i] = 0
        setNeedRender(true)
    }


    const acceptBuyRequest = (sellItemId) => {
        axios.get(host + '/transaction/step?sellItemId=' + sellItemId, {
        })
            .then((response) => {
                setNeedRender(true);
            });
    }

    const rejectBuyRequest = (sellItemId) => {
        axios.delete(host + '/transaction?sellItemId=' + sellItemId, {
        })
            .then((response) => {
                setNeedRender(true);
            });
    }

    const completePayment = (sellItemId) => {
        axios.get(host + '/transaction/payment?sellItemId=' + sellItemId, {
        })
            .then((response) => {
                setNeedRender(true);
            });
    }

    const setBoogleBoxInfo = (boxId, boxPassword, sellItemId) => {

        axios.post(host + '/transaction/booglebox', {
            "sellItemId" : sellItemId,
            "id" : boxId,
            "password" : boxPassword
        })
            .then(() => {
                setNeedRender(true);
            });

    }

    const changeTransactionStep = (sellItemId) => {

        axios.get(host + '/transaction/step?sellItemId=' + sellItemId, {
            headers: { Authorization: localStorage.getItem('token') }
        })

            .then(() => {
                setNeedRender(true);
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
        setReserveProduct(false);
    }

    const viewBuyProduct = e => {
        setLikeProduct(false);
        setBuyProduct(true);
        setSellProduct(false);
        setReserveProduct(false);
    }

    const viewSellProduct = e => {
        setLikeProduct(false);
        setBuyProduct(false);
        setSellProduct(true);
        setReserveProduct(false);
    }

    const viewReserveProduct = e => {
        setLikeProduct(false);
        setBuyProduct(false);
        setSellProduct(false);
        setReserveProduct(true);
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
                <Col xs={{ span: 5, offset: 2 }}>
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
                <Col xs={{ span: 5 }}>
                    <Row>
                        <Col span={24}>
                            {buyProduct === true ?
                                <img src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/heart_selected.png"
                                     style={{width:"24px"}}
                                     onClick={() => { viewBuyProduct(); setList();}}
                                />
                                :
                                <img src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/heart.png"
                                     style={{width:"24px"}}
                                     onClick={() => { viewBuyProduct(); setList();}}
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
                <Col xs={{ span: 5 }}>
                    <Row>
                        <Col span={24}>
                            {sellProduct == true ?
                                <img src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/heart_selected.png"
                                     style={{width:"24px"}}
                                     onClick={() => { viewSellProduct(); setList();}}
                                />
                                :
                                <img src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/heart.png"
                                     style={{width:"24px"}}
                                     onClick={() => { viewSellProduct(); setList();}}
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
                <Col xs={{ span: 5 }}>
                    <Row>
                        <Col span={24}>
                            {reserveProduct === true ?
                                <img src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/heart_selected.png"
                                     style={{width:"24px"}}
                                     onClick={() => { viewReserveProduct(); }}
                                />
                                :
                                <img src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/heart.png"
                                     style={{width:"24px"}}
                                     onClick={() => { viewReserveProduct(); }}
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
                                입고알림
                            </small>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row id="user-product"
                 style={{ marginTop: "24px", height: "auto" }}>
                {likeProduct === true ?
                    <Card style={{ width: "100%", height: "auto", backgroundColor: "#ffffff", border: 0, paddingBottom: "5vh" }}>
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
                    <Card style={{ width: "100%", height: "auto", backgroundColor: "#ffffff", border: 0}}>
                        {buyList.length !== 0 && buyList != null ?
                            buyList.map((value, index) => (
                                <div style={{ width: "95%", margin: "auto auto", padding: "0px" }}>
                                    {value.transactionType === 0 ?
                                        <Card className = "product-card"
                                              style={{
                                                  width: "100%", height: "40%", backgroundColor: "#e5fdfc",
                                                  border: "none", borderRadius: "2.25vh", boxShadow: "0px 5px 10px #d3d3d3",
                                                  margin: "auto auto", marginBottom: "2vh", padding: "0px",
                                              }}>
                                            <div style={{margin: "-15px"}}>
                                                <Row style={{padding: "0"}}>
                                                    <Col span={24} style={{ color: "#339eac", fontSize: "16px", textAlign: "right", fontWeight: "bold" }}>직거래</Col>
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
                                                                        판매자 : {value.traderNickname}  |
                                                                        연락처 : {value.traderPhoneNumber}
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                        <Row style={{ fontSize: "12px", color: "#656565", marginTop: "24px", textDecoration: "underline" }}>
                                                            {buyDetailIndex[index] === 1  ?
                                                                <Col offset={20} onClick={() => { noBuyDetail(index) }}>
                                                                    <label>접기</label>
                                                                </Col>
                                                                :
                                                                <Col offset={16} onClick={() => { buyDetail(index) }}>
                                                                    <label>거래상세보기</label>
                                                                </Col>
                                                            }
                                                        </Row>
                                                        {buyDetailIndex[index] === 1 ?
                                                            <div style={{fontSize: "15px"}}>
                                                                <Row style={{ marginTop: "10px", color: "#44a0ac" }}>
                                                                    판매자 수락
                                                                </Row>
                                                                <Row style={{ fontSize: "5vh", marginTop: "13.5px", color: "#038155" }}>
                                                                    <Col className="line" offset={12} span={1}
                                                                         style={{width: "2px", height: "45px",
                                                                             backgroundImage: "-webkit-linear-gradient(#00a199 -62%, #0b308e 280%)"}}>
                                                                    </Col>
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
                                                                {value.transactionStep === 2 ?
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
                                                                            <Col className="line" offset={12} span={1}
                                                                                 style={{width: "2px", height: "45px",
                                                                                     backgroundImage: "-webkit-linear-gradient(#00a199 -153%, #0b308e 100%)"}}>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row style={{ marginTop: "13.5px", color: "#0b308e", marginBottom: "20px" }}>
                                                                            거래 완료
                                                                        </Row>
                                                                    </div>
                                                                    :
                                                                    <div>
                                                                        <Row style={{ fontSize: "5vh", marginTop: "13.5px", color: "#959595" }}>
                                                                            <Col className="line" offset={12} span={1}
                                                                                 style={{width: "2px", height: "45px",
                                                                                     backgroundColor: "#959595"}}>
                                                                            </Col>
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
                                        <Card className = "product-card"
                                              style={{
                                                  width: "100%", height: "40%", backgroundColor: "#e8f5ff",
                                                  border: "none", borderRadius: "2.25vh", boxShadow: "0px 5px 10px #d3d3d3",
                                                  margin: "auto auto", marginBottom: "2vh", padding: "0px",
                                              }}>
                                            <div style={{margin: "-15px"}}>
                                                <Row style={{padding: "0"}}>
                                                    <Col span={24}style={{ color: "#0b308e", fontSize: "16px", textAlign: "right", fontWeight: "bold" }}>북을박스</Col>
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
                                                                        판매자 : {value.traderNickname}
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                        <Row style={{ fontSize: "12px", color: "#656565", marginTop: "24px", textDecorationLine: "underline" }}>
                                                            {buyDetailIndex[index] === 1  ?
                                                                <Col offset={20}>
                                                                    <label onClick={() => { noBuyDetail(index) }}>접기</label>
                                                                </Col>
                                                                :
                                                                <Col offset={16}>
                                                                    <label onClick={() => {
                                                                        buyDetail(index) }}>거래상세보기</label>
                                                                </Col>
                                                            }
                                                        </Row>
                                                        {buyDetailIndex[index] === 1  ?
                                                            <div>
                                                                <Row style={{ marginTop: "10px", color: "#44a0ac" }}>
                                                                    판매자 수락
                                                                </Row>
                                                                <Row style={{ fontSize: "5vh", marginTop: "13.5px" }}>
                                                                    <Col offset={12} span={1} class="line"
                                                                         style={{width: "2px", height: "33px",
                                                                             backgroundImage: "-webkit-linear-gradient(#00a199 -62%, #0b308e 450%)"}}>
                                                                    </Col>
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
                                                                            <Col className="line" offset={12} span={1}
                                                                                 style={{width: "2px", height: "33px",
                                                                                     backgroundColor: "#959595"}}>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                    : /*1단계 아니면*/
                                                                    <Row style={{ fontSize: "5vh", marginTop: "13.5px", color: "#065d33" }}>
                                                                        <Col className="line" offset={12} span={1}
                                                                             style={{width: "2px", height: "33px",
                                                                                 backgroundImage: "-webkit-linear-gradient(#00a199 -231%, #0b308e 325%)"}}>
                                                                        </Col>
                                                                    </Row>
                                                                } {/*1단계 끝*/}

                                                                {value.transactionStep === 3 || value.transactionStep > 3 ?
                                                                    <Row style={{ marginTop: "13.5px", color: "#065d92" }}>
                                                                        물건 비치 완료
                                                                    </Row>
                                                                    :
                                                                    <Row style={{ marginTop: "13.5px", color: "#959595" }}>
                                                                        물건 비치 완료
                                                                    </Row>
                                                                } {/*3단계 끝*/}

                                                                {value.transactionStep === 3 ?
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
                                                                                                            onConfirm={()=>{
                                                                                                                boogleBoxInfoReceiveConfirmOnClickHandler(value.sellItemId);
                                                                                                                closeModal();
                                                                                                            }}
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
                                                                    null } {/*3단계 끝*/}

                                                                {value.transactionStep >= 4 ?
                                                                    <Row style={{ fontSize: "5vh", marginTop: "13.5px", color: "#0b308e" }}>
                                                                        <Col className="line" offset={12} span={1}
                                                                             style={{width: "2px", height: "33px",
                                                                                 backgroundImage: "-webkit-linear-gradient(#00a199 -357%, #0b308e 262%)"}}>
                                                                        </Col>
                                                                    </Row>
                                                                    :
                                                                    <Row style={{ fontSize: "5vh", marginTop: "13.5px", color: "#959595" }}>
                                                                        <Col className="line" offset={12} span={1}
                                                                             style={{width: "2px", height: "33px",
                                                                                 backgroundColor: "#959595"}}>
                                                                        </Col>
                                                                    </Row>
                                                                } {/*4단계 끝*/}

                                                                {value.transactionStep === 5 || value.transactionStep >= 5 ?
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
                    <Card style={{ width: "100%", height: "auto", backgroundColor: "#ffffff", border: 0, }}>
                        {sellList.length !== 0 && sellList != null ?
                            sellList.map((value, index) => (
                                <div style={{ width: "95%", margin: "auto auto" }}>
                                    {value.transactionType === 0 ?
                                        <div>
                                            <div style={{ width: "100%", margin: "auto auto", padding: "0px" }}>
                                                {value.transactionStep === -1 ?
                                                    <Card className = "product-card"
                                                          style={{
                                                              width: "100%", height: "40%", backgroundColor: "#e0e0e0",
                                                              border: "none", borderRadius: "2.25vh", boxShadow: "0px 5px 10px #d3d3d3",
                                                              margin: "auto auto", marginBottom: "2vh", padding: "0px",
                                                          }}>
                                                        <div style={{margin: "-15px"}}>
                                                            <Row style={{padding: "0"}}>
                                                                <Col span={24} style={{ color: "#707070", fontSize: "16px", textAlign: "right", fontWeight: "bold" }}>직거래</Col>
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

                                                    <Card className = "product-card"
                                                          style={{
                                                              width: "100%", height: "40%", backgroundColor: "#e5fdfc",
                                                              border: "none", borderRadius: "2.25vh", boxShadow: "0px 5px 10px #d3d3d3",
                                                              margin: "auto auto", marginBottom: "2vh", padding: "0px",
                                                          }}>
                                                        <div style={{margin: "-15px"}}>
                                                            <Row>
                                                                <Col span={24} style={{ color: "#339eac", fontSize: "16px", textAlign: "right", fontWeight: "bold" }}>직거래</Col>
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
                                                                                        background: "#075e92",
                                                                                        border: "none", borderRadius: "5px", fontSize: "10px",
                                                                                        marginLeft: "0"
                                                                                    }}
                                                                                            onClick={() => {acceptBuyRequest(value.sellItemId)}}
                                                                                    >수락</button>
                                                                                </Col>
                                                                                <Col span={5} offset={1}>
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
                                                                                    구매자 : {value.traderNickname}  |
                                                                                    연락처 : {value.traderPhoneNumber}
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row style={{ fontSize: "12px", color: "#656565", marginTop: "24px", textDecoration: "underline" }}>
                                                                        {sellDetailIndex[index] === 1  ?
                                                                            <Col offset={20}>
                                                                                <label onClick={() => { noSellDetail(index) }}>접기</label>
                                                                            </Col>
                                                                            :
                                                                            <Col offset={16}>
                                                                                <label onClick={() => {
                                                                                    sellDetail(index) }}>거래상세보기</label>
                                                                            </Col>
                                                                        }
                                                                    </Row>
                                                                    {sellDetailIndex[index] === 1  ?
                                                                        <div style={{fontSize: "15px"}}>
                                                                            <Row style={{ marginTop: "10px", color: "#44a0ac" }}>
                                                                                구매 요청 수락
                                                                            </Row>
                                                                            <Row style={{ fontSize: "5vh", margin: "13.5px", color: "#038155" }}>
                                                                                <Col className="line" offset={12} span={1}
                                                                                     style={{width: "2px", height: "45px",
                                                                                         backgroundImage: "-webkit-linear-gradient(#00a199 -62%, #0b308e 280%)"}}>
                                                                                </Col>
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
                                                                            {value.transactionStep === 2 ?
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
                                                                                        <Col className="line" offset={12} span={1}
                                                                                             style={{width: "2px", height: "45px",
                                                                                                 backgroundImage: "-webkit-linear-gradient(#00a199 -153%, #0b308e 100%)"}}>
                                                                                        </Col>
                                                                                    </Row>
                                                                                    <Row style={{ marginTop: "13.5px", color: "#0b308e", marginBottom: "20px" }}>
                                                                                        거래 완료
                                                                                    </Row>
                                                                                </div>
                                                                                :
                                                                                <div>
                                                                                    <Row style={{ fontSize: "5vh", marginTop: "13.5px", color: "#656565" }}>
                                                                                        <Col className="line" offset={12} span={1}
                                                                                             style={{width: "2px", height: "45px",
                                                                                                 backgroundColor: "#959595"}}>
                                                                                        </Col>
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
                                                    <Card className = "product-card"
                                                          style={{
                                                              width: "100%", height: "40%", backgroundColor: "#e0e0e0",
                                                              border: "none", borderRadius: "2.25vh", boxShadow: "0px 5px 10px #d3d3d3",
                                                              margin: "auto auto", marginBottom: "2vh", padding: "0px",
                                                          }}>
                                                        <div style={{margin: "-15px"}}>
                                                            <Row style={{padding: "0"}}>
                                                                <Col span={24}style={{ color: "#707070", fontSize: "16px", textAlign: "right", fontWeight: "bold" }}>북을박스</Col>
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
                                                    <Card className = "product-card"
                                                          style={{
                                                              width: "100%", height: "40%", backgroundColor: "#e8f5ff",
                                                              border: "none", borderRadius: "2.25vh", boxShadow: "0px 5px 10px #d3d3d3",
                                                              margin: "auto auto", marginBottom: "2vh", padding: "0px",
                                                          }}>
                                                        <div style={{margin: "-15px"}}>
                                                            <Row>
                                                                <Col span={24} style={{ color: "#0b308e", fontSize: "16px", textAlign: "right", fontWeight: "bold" }}>북을박스</Col>
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
                                                                                    구매자 : {value.traderNickname}
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row style={{ fontSize: "12px", color: "#656565", marginTop: "24px", textDecoration: "underline" }}>
                                                                        {sellDetailIndex[index] === 1   ?
                                                                            <Col offset={20}>
                                                                                <label onClick={() => { noSellDetail(index) }}>접기</label>
                                                                            </Col>
                                                                            :
                                                                            <Col offset={16}>
                                                                                <label onClick={() => {
                                                                                    sellDetail(index) }}>거래상세보기</label>
                                                                            </Col>
                                                                        }
                                                                    </Row>
                                                                    {sellDetailIndex[index] === 1 ?
                                                                        <div style={{fontSize: "15px"}}>
                                                                            <Row style={{ marginTop: "10px", color: "#44a0ac" }}>
                                                                                구매 요청 수락
                                                                            </Row>
                                                                            <Row style={{ fontSize: "5vh", marginTop: "13.5px", color: "#038155" }}>
                                                                                <Col className="line" offset={12} span={1}
                                                                                     style={{width: "2px", height: "33px",
                                                                                         backgroundImage: "-webkit-linear-gradient(#00a199 -62%, #0b308e 450%)"}}>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row style={{ marginTop: "13.5px", color: "#038196" }}>
                                                                                구매자 결제 완료
                                                                            </Row>

                                                                            {value.transactionStep === 1 ?
                                                                                <Row>
                                                                                    <button style={{
                                                                                        padding: "0",
                                                                                        width: "52px",
                                                                                        height: "21px",
                                                                                        background: "#075e92", color: "#ffffff",
                                                                                        border: "none", borderRadius: "5px", fontSize: "10px",
                                                                                        marginTop: "4px"
                                                                                    }} onClick={() => {showModal(); showBoxNum();}}
                                                                                    >물품 비치</button>
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
                                                                                null } {/*1단계 버튼 끝*/}

                                                                            {value.transactionStep >= 2 ?
                                                                                <Row style={{ fontSize: "5vh", marginTop: "13.5px", color: "#0b308e" }}>
                                                                                    <Col className="line" offset={12} span={1}
                                                                                         style={{width: "2px", height: "33px",
                                                                                             backgroundImage: "-webkit-linear-gradient(#00a199 -357%, #0b308e 262%)"}}>
                                                                                    </Col>
                                                                                </Row>
                                                                                :
                                                                                <Row style={{ fontSize: "5vh", marginTop: "13.5px", color: "#656565" }}>
                                                                                    <Col className="line" offset={12} span={1}
                                                                                         style={{width: "2px", height: "33px",
                                                                                             backgroundColor: "#959595"}}>
                                                                                    </Col>
                                                                                </Row>
                                                                            } {/*2단계 끝*/}

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

            {reserveProduct === true ?
                <Card style={{ width: "100%", height: "auto", backgroundColor: "#ffffff", border: 0, }}>
                    {reserveList.length !== 0 && reserveList != null ?
                        reserveList.map((value, index) => (
                            <div style={{ width: "95%", margin: "auto auto" }}>
                                <div style={{ width: "100%", margin: "auto auto", padding: "0px" }}>
                                    <Card className = "product-card"
                                          style={{
                                              width: "100%", height: "40%", backgroundColor: "#e0e0e0",
                                              border: "none", borderRadius: "2.25vh", boxShadow: "0px 5px 10px #d3d3d3",
                                              margin: "auto auto", marginBottom: "2vh", padding: "0px",
                                          }}>
                                        <div style={{margin: "-15px"}}>
                                            <Row>
                                                <Col span={6} offset={0}>
                                                    <Link to = {'/buy/detail/'+value.itemId}>
                                                        <img style={{
                                                            width: "64px", height: "97px", backgroundSize: "contain",
                                                            borderRadius: "7px", overflow: "hidden"
                                                        }} src={value.imageUrl}></img>
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
                                                        <Col span={12} offset={2}>작가 : {value.author}
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ fontSize: "12px", textAlign: "left", marginTop: "8px", color: "#656565", }}>
                                                        <Col span={12} offset={2}>출판사 : {value.publisher}
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ fontSize: "15px", color: "#959595", marginTop: "17px" }}>
                                                        <Col offset={2}>
                                                            신청 완료
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        ))
                        :  /*입고알림 없을 때*/
                        <div>
                            <div>
                                <Row style={{ padding: "2vh", margin: "2vh", marginBottom: "45%" }}>
                                    <p style={{ color: "#000000", fontSize: "15px" }}>
                                        입고알림 신청한 책이 없습니다.</p>
                                </Row>
                                <Row>
                                    <Link to="/">
                                        <button style={{
                                            padding: "0",
                                            width: "100%",
                                            background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                                            border: "none", borderRadius: "2.25vh", fontSize: "2.5vh", height: "5vh"
                                        }}
                                        >검색하러 가기</button>
                                    </Link>
                                </Row>
                            </div>
                        </div>
                    } {/* 입고신청 없을 때 뷰 끝 */}
                </Card>
                : null} {/* reserveProduct != true 일 때 null */}


            {/*Footer*/}
            <div style={{backgroundColor : "#F5F5F5", height : "20px", width : "100%"}}></div>
            <div style={{backgroundColor: "white", padding: "10px"}}>
                <Row style={{marginBottom : "10px", color: "#666666", fontSize: "14px"}}>
                    <Col xs={{span : 24}}>
                        <Row>카카오톡 플러스 친구 '북을'을 검색한 후 문의하시면</Row>
                        <Row>더욱 신속한 답변을 받을 수 있습니다!</Row>
                    </Col>
                </Row>
                <Row style={{marginBottom : "10px"}}>
                    <Col xs={{span : 24}}>
                        <small>
                            <a style={{color : "orange", textDecoration : "underline"}} href="http://pf.kakao.com/_xnlmlxb">카카오톡 플러스친구 '북을'</a>
                        </small>
                    </Col>
                </Row>
                <Row style={{marginBottom : "10px"}}>
                    <Col xs={{span : 2, offset : 5}}>
                        <img
                            style={{ width: "80%", height: "auto"}}
                            src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/logo_gray.png"
                        ></img></Col>
                    <Col xs={{span : 10, offset : 1}} style={{color: "#666666"}}><small>캠퍼스 거래의 모든 것, 북을</small></Col>
                </Row>
            </div>
            <div style={{backgroundColor : "#F5F5F5", height : "20px", width : "100%"}}></div>
        </div>
    )
}