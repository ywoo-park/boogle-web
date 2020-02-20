import React, { useState, useEffect } from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import { withRouter, Link, Redirect } from "react-router-dom";
import { Row, Col, Icon, Card, Modal, Divider } from "antd";
import axios from 'axios';
import './MyPageBanner.css?ver=2';


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

  const [level, setLevel] = useState(false);
  const [modal, setModal] = useState(false);
  const [boogleBank, setBoogleBank] = useState(false);
  const [sellerBank, setSellerBank] = useState(false);

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
        console.log(response);
        setName(response.data.data.userName)
        //setLikeList(response.data.data.bookmarkedItemList)
        //setBuyList(response.data.data.buyTransList)
        //setSellList(response.data.data.sellTransList)
      });
    //setName("김유진");
    setLikeList([
      {
        "sellItemId": "5e302b91cf6c2a2fab5324fb",
        "imageUrl": "https://bookthumb-phinf.pstatic.net/cover/139/212/13921278.jpg?type=m1&udate=20181224",
        "title": "맨큐의 경제학",
        "regiPrice": "8000"
      },
    ])
    setBuyList([
      {
        "sellItemId": "5e302b91cf6c2a2fab5324fb",
        "traderName": "김판매",
        "traderPhoneNumber": "01012345678",
        "title": "맨큐의 경제학",
        "transactionType": 0,
        "transPrice": "20000",
         "itemImageUrl": "https://bookthumb-phinf.pstatic.net/cover/140/134/14013423.jpg?type=m1&udate=20190204",
        "transactionCreatedTime": "2020-02-01T10:17:13.576+0000",
        "transactionProcessedTimeList": [
          "2020-02-01T10:17:13.576+0000"
        ],
        "transactionStep": 1
      },
      {
        "sellItemId": "5e302b91cf6c2a2fab5324fb",
        "traderName": "김중고",
        "traderPhoneNumber": "01012345678",
        "title": "선형대수학",
        "transactionType": 1,
        "transPrice": "20000",
         "itemImageUrl": "https://bookthumb-phinf.pstatic.net/cover/140/134/14013423.jpg?type=m1&udate=20190204",
        "transactionCreatedTime": "2020-02-01T10:17:13.576+0000",
        "transactionProcessedTimeList": [
          "2020-02-01T10:17:13.576+0000"
        ],
        "transactionStep": 4
      }
    ]);
    setSellList([
      {
        "sellItemId": "5e302c68cf6c2a2fab5324fe",
        "traderName": "북을",
        "traderPhoneNumber": "01012345678",
        "title": "프랑스어",
        "transactionType": 1,
        "transPrice": "8000",
        "itemImageUrl": "https://bookthumb-phinf.pstatic.net/cover/140/134/14013423.jpg?type=m1&udate=20190204",
        "transactionCreatedTime": "2020-02-01T10:31:19.317+0000",
        "transactionProcessedTimeList": [
          "2020-02-01T10:31:19.317+0000"
        ],
        "transactionStep": -1
      },
      {
        "sellItemId": "5e302c68cf6c2a2fab5324fe",
        "traderName": "북을",
        "traderPhoneNumber": "01012345678",
        "title": "대학수학",
        "transactionType": 1,
        "transPrice": "8000",
        "itemImageUrl": "https://bookthumb-phinf.pstatic.net/cover/140/134/14013423.jpg?type=m1&udate=20190204",
        "transactionCreatedTime": "2020-02-01T10:31:19.317+0000",
        "transactionProcessedTimeList": [
          "2020-02-01T10:31:19.317+0000"
        ],
        "transactionStep": 4
      },
      {
        "sellItemId": "5e302c68cf6c2a2fab5324fe",
        "traderName": "새내기",
        "traderPhoneNumber": "01012345678",
        "title": "읽기와 쓰기",
        "transactionType": 1,
        "transPrice": "8000",
        "itemImageUrl": "https://bookthumb-phinf.pstatic.net/cover/140/134/14013423.jpg?type=m1&udate=20190204",
        "transactionCreatedTime": "2020-02-01T10:31:19.317+0000",
        "transactionProcessedTimeList": [
          "2020-02-01T10:31:19.317+0000"
        ],
        "transactionStep": 4
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

  const payConfirmOnClickHandler = (sellItemId) => {
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
    setSellerBank(false);
  }

  const showBoogleBank = e => {
    setLevel(false);
    setBoogleBank(true);
    setSellerBank(false);
  }

  const showSellerBank = e => {
    setLevel(false);
    setBoogleBank(false);
    setSellerBank(true);
  }


  return (
    <div className="mypage" style={{background: "url(https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/background.png)"}}>
      <Row className="header">
        <Col xs={{ span: 3 }}>
          <Link to="/">
            <img id="goBackButton"
              src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/left_arrow.png" />
          </Link>
        </Col>
        <Col xs={{ span: 8, offset: 5 }}>
          <h5>
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
          <Icon type="question-circle"
            id="profile-circle"
            onClick={() => { showModal(); showLevel(); }}
          />
        </Col>
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
      </Row>
      <Row id="profile-announce">
        <label style={{ color: "#ffffff" }}>{name}님, 안녕하세요!</label>
      </Row>

      <Row>
        <Col xs={{ span: 4, offset: 6 }}>
          <Row>
            <Col xs={{ span: 24 }}>
              <Icon className="profile-icon"
                type="bell"
                onClick={() => { }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }}>
              <label className="profile-label">
                공지사항
                  </label>
            </Col>
          </Row>
        </Col>
        <Link to='/customercenter'>
          <Col xs={{ span: 4 }}>
            <Row>
              <Col xs={{ span: 24 }}>
                <Icon className="profile-icon"
                  type="phone"
                  onClick={() => { }}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 24 }}>
                <label className="profile-label">
                  고객센터
                  </label >
              </Col>
            </Row>
          </Col>
        </Link>
        <Col xs={{ span: 4 }}>
          <Row>
            <Col xs={{ span: 24 }}>
              <Icon className="profile-icon" 
                type="setting"
                onClick={() => { }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }}>
              <label className="profile-label">
                설정
                  </label>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row style={{ marginTop: "5vh" }}>
        <Col xs={{ span: 6, offset: 3 }}>
          <Row>
            <Col span={24}>
              {likeProduct == true ?
                <Icon className="menu-icon"
                  type="heart"
                  theme="filled"
                  onClick={() => { viewLikeProduct(); }}
                />
                :
                <Icon className="menu-icon"
                  type="heart"
                  onClick={() => { viewLikeProduct(); }}
                />
              }
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <small className="menu-label">
                관심상품
              </small>
            </Col>
          </Row>
        </Col>
        <Col xs={{ span: 6 }}>
          <Row>
            <Col span={24}>
              {buyProduct == true ?
                <Icon className="menu-icon" 
                  type="heart"
                  theme="filled"
                  onClick={() => { viewBuyProduct();
                  setDirDetailCard(false); setBoxDetailCard(false); }}
                />
                :
                <Icon className="menu-icon"
                  type="heart"
                  onClick={() => { viewBuyProduct(); 
                  setDirDetailCard(false); setBoxDetailCard(false);}}
                />
              }
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <small className="menu-label">
                구매현황
              </small>
            </Col>
          </Row>
        </Col>
        <Col xs={{ span: 6 }}>
          <Row>
            <Col span={24}>
              {sellProduct == true ?
                <Icon className="menu-icon" 
                  type="heart"
                  theme="filled"
                  onClick={() => { viewSellProduct(); 
                    setDirDetailCard(false); setBoxDetailCard(false);}}
                />
                :
                <Icon className="menu-icon"
                  type="heart"
                  onClick={() => { viewSellProduct(); 
                    setDirDetailCard(false); setBoxDetailCard(false);}}
                />
              }
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <small className="menu-label">
                판매현황
              </small>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row id="user-product">
        {likeProduct == true ?
          <Card className="product-card">
            {likeList.length != 0 ?
              <div>
                <Row>
                  {likeList.map((value, index) => (
                    <Col span={7} offset={1}>
                      <Row>
                        <Col span={24}>
                          <Link to = {'/buy/detail/'+value.sellItemId}>
                          <img className="likeList-image"
                            src={value.imageUrl}></img>
                          </Link>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <label className="likeList-title">
                            {value.title}</label>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <label className="likeList-price">{value.regiPrice}원</label>
                        </Col>
                      </Row>
                    </Col>

                  ))}
                </Row>
                <Row>
                  <Link to="/">
                    <button className="normal-button"
                    >더 담으러 가기</button>
                  </Link>
                </Row>
              </div>
              :
              <div>
                <Row>
                  <p className="normal-font">관심상품이 없습니다.</p>
                </Row>
                <Row>
                  <Link to="/">
                    <button className="normal-button"
                    >더 담으러 가기</button>
                  </Link>
                </Row>
              </div>
            }
          </Card>
          : null} {/* likeProduct != true 일 때는 null */}

        {buyProduct == true ?
          <Card className="product-card">
            {buyList.length != 0 && buyList != null ?
              buyList.map((value, index) => (
                <div>
                  {value.transactionType == 0 ?
                    <Card className="transaction-card-dir">
                      <Row>
                        <Col span={6} offset={6}> </Col>
                        <Col span={6} offset={6} className="transaction-type-dir">직거래</Col>
                      </Row>

                      {value.transactionStep == 0 ?
                        <div>
                          <Row>
                            <Col span={5} offset={1}>
                            <Link to = {'/buy/detail/'+value.sellItemId}>
                              <img className="transaction-image" 
                              src={value.itemImageUrl}></img>
                            </Link>
                            </Col>
                            <Col span={17} offset={0}>
                              <Row className="transaction-title">
                                <Col offset={1}>
                                  {value.title}
                                </Col>
                              </Row>
                              <Row className="transaction-info">
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
                              <Row className="before-transactions">
                                <Col offset={3}>
                                  판매자 수락 대기 중
                              </Col>
                              </Row>
                            </Col>
                          </Row>
                        </div>
                        : 
                        <div>
                        <Row>
                          <Col span={5} offset={1}>
                          <Link to = {'/buy/detail/'+value.sellItemId}>
                            <img className="transaction-image" 
                            src={value.itemImageUrl}></img>
                          </Link>
                          </Col>
                          <Col span={17} offset={0}>
                            <Row className="transaction-title">
                              <Col offset={1}>
                                {value.title}
                              </Col>
                            </Row>
                            <Row className="transaction-info">
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
                            <Row className="transaction-info">
                                <Col offset={0}>
                                  판매자 : {value.traderName} |
                                  연락처 : {value.traderPhoneNumber}
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                          <Row>
                            {dirDetailCard == true && dirActiveIndex == index ?
                              <button className="normal-button"
                              onClick={() => { setDirDetailCard(false) }}>접기</button>
                              :
                              <button className="normal-button"
                              onClick={() => { setDirDetailCard(true); 
                                setDirActiveIndex(index) }}>거래상세보기</button>
                            }
                          </Row>
                        {dirDetailCard == true && dirActiveIndex == index ?
                          <div>
                            <Row className="process-1">
                              판매자 수락
                            </Row>
                            <Row className="process-2">
                              <Icon type="line" rotate="90" />
                            </Row>
                            {value.transactionStep == 2 || value.transactionStep > 2 ?
                            <Row className="process-3-on">
                              거래중
                            </Row>
                            :
                            <Row className="process-3-off">
                              거래중
                            </Row>
                            }
                            {value.transactionStep == 3 ?
                            <div>
                              <Row className="process-4-on">
                                <Icon type="line" rotate="90" />
                              </Row>
                              <Row className="process-5-on">
                                거래 완료
                              </Row>
                            </div>
                            :
                            <div>
                            <Row className="process-4-off">
                              <Icon type="line" rotate="90" />
                            </Row>
                            <Row className="process5-off">
                              거래 완료
                            </Row>
                            </div>
                            } {/*직거래 3단계*/}
                            
                          </div>
                          : null } {/*직거래 step들*/}
                      </div>
                    }
                    </Card>
                    :
                    <Card className="transaction-card-box">
                      <Row>
                        <Col span={7} offset={5}> </Col>
                        <Col span={7} offset={5} className="transaction-type-box">북을박스</Col>
                      </Row>
                      {value.transactionStep == 0 ?
                        <div>
                          <Row>
                            <Col span={5} offset={1}>
                            <Link to = {'/buy/detail/'+value.sellItemId}>
                              <img className="transaction-image" 
                              src={value.itemImageUrl} ></img>
                            </Link>
                            </Col>
                            <Col span={17} offset={0}>
                              <Row className="transaction-title">
                                <Col offset={1}>
                                  {value.title}
                                </Col>
                              </Row>
                              <Row className="transaction-info">
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
                              <Row className="before-transaction">
                                <Col offset={3}>
                                  판매자 수락 대기 중
                              </Col>
                              </Row>
                            </Col>
                          </Row>
                        </div>

                        : /*구매상품의 step이 0일 때와 아닐 때(판매자 수락 전, 후)*/

                        <div>
                          <Row>
                            <Col span={5} offset={1}>
                            <Link to = {'/buy/detail/'+value.sellItemId}>
                              <img className="transaction-image" 
                              src={value.itemImageUrl} ></img>
                            </Link>
                            </Col>
                            <Col span={17} offset={0}>
                              <Row className="transaction-title">
                                <Col offset={1}>
                                  {value.title}
                                </Col>
                              </Row>
                              <Row className="transaction-info">
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
                              <Row className="transaction-info">
                                <Col offset={0}>
                                  판매자 : {value.traderName} |
                                  연락처 : {value.traderPhoneNumber}
                                </Col>
                              </Row>
                          </Col>
                          </Row>
                          <Row>
                            {boxDetailCard == true && boxActiveIndex == index ?
                              <button className="normal-button"
                              onClick={() => { setBoxDetailCard(false) }}>접기</button>
                              : /* 토글 버튼 역할 */
                              <button className="normal-button"
                              onClick={() => { setBoxDetailCard(true); 
                                setBoxActiveIndex(index) }}>거래상세보기</button>
                            }
                          </Row>
                        {boxDetailCard == true && boxActiveIndex == index ?
                          <div>
                          <Row className="process-1">
                            판매자 수락
                          </Row>
                          <Row className="process-2">
                            <Icon type="line" rotate="90" />
                          </Row>
                          <Row className="process-3-on">
                            결제 요청중
                          </Row>

                          {value.transactionStep == 1 ?
                            <div>
                              <Row>
                                <button className="card-button"
                                  onClick={() => { showModal(); showBoogleBank(); }}
                                >결제 하기</button>
                              </Row>
                              {modal == true ?
                                <Modal
                                  visible={modal}
                                  onOk={() => { payConfirmOnClickHandler(value.sellItemId) }}
                                  onCancel={() => { closeModal(); }}>
                                  {boogleBank == true ?
                                    <p className="normal-font">
                                      북을 계좌번호로 입금해주세요</p>
                                    : null} {/*북을 계좌 끝*/}
                                </Modal>
                                : null} {/*모달 끝*/}
                              <Row className="process-4-off">
                                <Icon type="line" rotate="90" />
                              </Row>
                            </div>
                            : /*1단계 아니면*/
                              <Row className="process-4-on">
                                <Icon type="line" rotate="90" />
                              </Row>
                          } {/*1단계 끝*/}

                          {value.transactionStep == 4 || value.transactionStep > 4 ?
                            <Row className="process-5-on">
                              물건 비치 완료
                          </Row>
                            :
                            <Row className="process-5-off">
                              물건 비치 완료
                          </Row>
                          } {/*4단계 끝*/}

                          {value.transactionStep == 4 ?
                            <Row>
                              <Link to = '/boxcheck'>
                              <button className="card-button">수령 하기</button>
                              </Link>
                            </Row>
                            :
                            null } {/*4단계 끝*/}

                          {value.transactionStep > 4 ?
                            <Row className="process-6-on">
                              <Icon type="line" rotate="90" />
                            </Row>
                            :
                            <Row className="process-6-off">
                              <Icon type="line" rotate="90" />
                            </Row>
                          } {/*4단계 끝*/}

                          {value.transactionStep == 5 || value.transactionStep > 5 ?
                            <Row className="process-7-on">
                              거래 완료
                            </Row>
                            :
                            <Row className="process-7-off">
                              거래 완료
                            </Row>
                        
                          } {/*5단계 끝*/}
                        
                          </div>
                         : null}  {/*거래상세보기 끝*/}
                         
                         </div>
                        
                        
                        }
                      
                      </Card>
                  }
                </div>
              ))
              :  /*구매현황 없을 때*/
              <div>
                <Row>
                  <p className="normal-font">
                    구매 중인 상품이 없습니다.
                  </p>
                </Row>
                <Row>
                  <Link to="/">
                    <button className="normal-button"
                    >구매하러 가기</button>
                  </Link>
                </Row>
              </div>
            } {/* 구매상품 없을 때 뷰 끝 */}
          </Card>
          : null} {/* buyProduct != true 일 때 null */}

        {sellProduct == true ?
          <Card className="product-card">
            {sellList.length != 0 && sellList != null ?
              sellList.map((value, index) => (
                <div>
                  {value.transactionType == 0 ?
                  <div>
                  <div>
                    {value.transactionStep == -1 ?
                    <Card className="transaction-card-dir">
                      <Row>
                        <Col span={6} offset={6}> </Col>
                        <Col span={6} offset={6} className="transaction-type-dir">직거래</Col>
                      </Row>

                      <Row>
                            <Col span={5} offset={1}>
                            <Link to = {'/buy/detail/'+value.sellItemId}>
                              <img className="transaction-image" 
                              src={value.itemImageUrl}></img>
                            </Link>
                            </Col>
                            <Col span={17} offset={0}>
                              <Row className="transaction-title">
                                <Col offset={1}>
                                  {value.title}
                                </Col>
                              </Row>
                              <Row className="transaction-info">
                                <Col span={12}>
                                  등록일자 : {/*나중에 수정하기*/}
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
                              <Row className="before-transaction">
                                <Col offset={3}>
                                  판매 등록 완료
                              </Col>
                              </Row>
                            </Col>
                          </Row>
                    
                    </Card>
                    : /*판매등록된 상품인지 거래 중인지*/

                    <Card className="transaction-card-dir">
                      <Row>
                        <Col span={6} offset={6}> </Col>
                        <Col span={6} offset={6} className="transaction-type-dir">직거래</Col>
                      </Row>

                      {value.transactionStep == 0 ?
                        <div>
                          <Row>
                            <Col span={5} offset={1}>
                            <Link to = {'/buy/detail/'+value.sellItemId}>
                              <img className="transaction-image" 
                              src={value.itemImageUrl} ></img>
                            </Link>
                            </Col>
                            <Col span={17} offset={0}>
                              <Row className="transaction-title">
                                <Col offset={1}>
                                  {value.title}
                                </Col>
                              </Row>
                              <Row className="transaction-info">
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
                              <Row>
                                <Col span={4} offset={1}>
                                  <button className="card-button"
                                    onClick={() => { }}
                                  >거절</button>
                                </Col>
                                <Col span={4} offset={1}>
                                  <button className="card-button"
                                    onClick={() => { }}
                                  >수락</button>
                                </Col>
                                <Col span={4} offset={1}>
                                  <button className="card-button"
                                    onClick={() => { }}
                                  >조회</button>
                                </Col>
                              </Row>

                            </Col>
                          </Row>
                        </div>
                        : 
                        <div>
                        <Row>
                          <Col span={5} offset={1}>
                          <Link to = {'/buy/detail/'+value.sellItemId}>
                            <img className="transaction-image"
                            src={value.itemImageUrl} ></img>
                          </Link>
                          </Col>
                          <Col span={17} offset={0}>
                            <Row className="transaction-title">
                              <Col offset={1}>
                                {value.title}
                              </Col>
                            </Row>
                            <Row className="transaction-info">
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
                            <Row className="transaction-info">
                                <Col offset={0}>
                                  구매자 : {value.traderName} |
                                  연락처 : {value.traderPhoneNumber}
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                          <Row>
                            {dirDetailCard == true && dirActiveIndex == index ?
                              <button className="normal-button"
                              onClick={() => { setDirDetailCard(false) }}>접기</button>
                              :
                              <button className="normal-button"
                              onClick={() => { setDirDetailCard(true); 
                                setDirActiveIndex(index) }}>거래상세보기</button>
                            }
                          </Row>
                        {dirDetailCard == true && dirActiveIndex == index ?
                          <div>
                            <Row className="process-1">
                              판매자 수락
                            </Row>
                            <Row className="process-2">
                              <Icon type="line" rotate="90" />
                            </Row>
                            {value.transactionStep == 2 || value.transactionStep > 2 ?
                            <Row className="process-3-on">
                              거래중
                            </Row>
                            :
                            <Row className="process-3-off">
                              거래중
                            </Row>
                            }
                            {value.transactionStep == 3 ?
                            <div>
                              <Row className="process-4-on">
                                <Icon type="line" rotate="90" />
                              </Row>
                              <Row className="process-5-on">
                                거래 완료
                              </Row>
                            </div>
                            :
                            <div>
                            <Row className="process-4-off">
                              <Icon type="line" rotate="90" />
                            </Row>
                            <Row className="process-5-off">
                              거래 완료
                            </Row>
                            </div>
                            } {/*직거래 3단계*/}
                            
                          </div>
                          : null } {/*직거래 step들*/}
                      </div>
                    }
                    </Card>
                    } {/*판매등록된 상품 끝*/}
                    </div>
                  </div>
                    :  /*직거래인지 북을박스인지 구분*/
                    <div>
                    <div>
                    {value.transactionStep == -1 ?
                    <Card className="transaction-card-box">
                      <Row>
                        <Col span={6} offset={6}> </Col>
                        <Col span={7} offset={5} className="transaction-type-box">북을박스</Col>
                        </Row>

                      <Row>
                            <Col span={5} offset={1}>
                            <Link to = {'/buy/detail/'+value.sellItemId}>
                              <img className="transaction-image" 
                              src={value.itemImageUrl}></img>
                            </Link>
                            </Col>
                            <Col span={17} offset={0}>
                              <Row className="transaction-title">
                                <Col offset={1}>
                                  {value.title}
                                </Col>
                              </Row>
                              <Row className="transaction-info">
                                <Col span={12}>
                                  등록일자 : {/*나중에 수정하기*/}
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
                              <Row className="normal-font">
                                <Col offset={3}>
                                  판매 등록 완료
                              </Col>
                              </Row>
                            </Col>
                          </Row>
                    
                    </Card>
                    : /*판매등록된 상품인지 거래 중인지*/
                    <Card className="transaction-card-box">
                      <Row>
                        <Col span={7} offset={5}> </Col>
                        <Col span={7} offset={5} className="transaction-type-box">북을박스</Col>
                      </Row>
                      {value.transactionStep == 0 ?
                        <div>
                          <Row>
                            <Col span={5} offset={1}>
                            <Link to = {'/buy/detail/'+value.sellItemId}>
                              <img className="transaction-image" 
                              src={value.itemImageUrl} ></img>
                            </Link>
                            </Col>
                            <Col span={17} offset={0}>
                              <Row className="transaction-title">
                                <Col offset={1}>
                                  {value.title}
                                </Col>
                              </Row>
                              <Row className="transaction-info">
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
                              <Row>
                                <Col span={4} offset={1}>
                                  <button className="card-button"
                                    onClick={() => { }}
                                  >거절</button>
                                </Col>
                                <Col span={4} offset={1}>
                                  <button className="card-button"
                                    onClick={() => { }}
                                  >수락</button>
                                </Col>
                                <Col span={4} offset={1}>
                                  <button className="card-button"
                                    onClick={() => { }}
                                  >조회</button>
                                </Col>
                              </Row>

                            </Col>
                          </Row>
                        </div>

                        : /*판매상품의 step이 0일 때와 아닐 때(판매자 수락 전, 후)*/

                        <div>
                          <Row>
                            <Col span={5} offset={1}>
                            <Link to = {'/buy/detail/'+value.sellItemId}>
                              <img className="transaction-image" 
                              src={value.itemImageUrl}></img>
                            </Link>
                            </Col>
                            <Col span={17} offset={0}>
                              <Row className="transaction-title">
                                <Col offset={1}>
                                  {value.title}
                                </Col>
                              </Row>
                              <Row className="transaction-info">
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
                              <Row className="transaction-info">
                                <Col offset={0}>
                                  구매자 : {value.traderName} |
                                  연락처 : {value.traderPhoneNumber}
                                </Col>
                              </Row>
                          </Col>
                          </Row>
                          <Row>
                            {boxDetailCard == true && boxActiveIndex == index ?
                              <button className="normal-button"
                              onClick={() => { setBoxDetailCard(false) }}>접기</button>
                              : /* 토글 버튼 역할 */
                              <button className="normal-button"
                              onClick={() => { setBoxDetailCard(true); 
                                setBoxActiveIndex(index) }}>거래상세보기</button>
                            }
                          </Row>
                        {boxDetailCard == true && boxActiveIndex == index ?
                          <div>
                          <Row className="process-1">
                            판매자 수락
                          </Row>
                          <Row className="process-2">
                            <Icon type="line" rotate="90" />
                          </Row>
                          <Row className="process-3">
                            결제 요청중
                          </Row>

                          {value.transactionStep == 1 ?
                            <div>
                              <Row>
                                <button className="card-button"
                                  onClick={() => { showModal(); showSellerBank(); }}
                                >결제 정보</button>
                              </Row>
                              {modal == true ?
                                <Modal
                                  visible={modal}
                                  onOk={() => { payConfirmOnClickHandler(value.sellItemId) }}
                                  onCancel={() => { closeModal(); }}>
                                  {sellerBank == true ?
                                    <p className="normal-font">
                                      판매자의 계좌 정보</p>
                                    : null} {/*판매자 계좌 끝*/}
                                </Modal>
                                : null} {/*모달 끝*/}
                              <Row className="process-4-off">
                                <Icon type="line" rotate="90" />
                              </Row>
                            </div>
                            : /*1단계 아니면*/
                              <Row className="process-4-on">
                                <Icon type="line" rotate="90" />
                              </Row>
                          } {/*1단계 끝*/}

                          {value.transactionStep == 4 || value.transactionStep > 4 ?
                            <Row className="process-5-on">
                              물건 비치 중
                            </Row>
                            : /*4단계 이상인지 아닌지*/
                            <Row className="process-5-off">
                              물건 비치 중
                            </Row>
                          } {/*4단계 이상인지 끝*/}

                          {value.transactionStep == 4 ?
                            <Row>
                            <Link to = '/boxinput'>
                              <button className="card-button">비치 하기</button>
                            </Link>
                            </Row>
                            :
                            null } {/*4단계 버튼 끝*/}

                          {value.transactionStep > 4 ?
                            <Row className="process-6-on">
                              <Icon type="line" rotate="90" />
                            </Row>
                            :
                            <Row className="process-6-off">
                              <Icon type="line" rotate="90" />
                            </Row>
                          } {/*4단계 끝*/}

                          {value.transactionStep == 5 || value.transactionStep > 5 ?
                          <div>
                            <Row className="process-7-on">
                              거래 완료
                            </Row>
                            <Row>
                            <button className="card-button">송금 문의</button>
                            {/*링크 걸어야함*/}
                            </Row>
                          </div>
                            : /*5단계 이상인지 아닌지*/
                            <Row className="process-7-off">
                              거래 완료
                            </Row>
                        
                          } {/*5단계 끝*/}
                        
                          </div>
                         : null}  {/*거래상세보기 끝*/}
                        </div>
                        
                        }
                      
                      </Card>
                      } {/*판매등록된 상품이 아닐 때 끝*/}
                      </div>

                    </div>}
                
                </div>
              ))
              :  /*판매현황 없을 때*/
              <div>
                <Row>
                  <p className="normal-font">
                    판매 중인 상품이 없습니다.
                  </p>
                </Row>
                <Row>
                  <Link to="/sell">
                    <button className="normal-button">판매하러 가기</button>
                  </Link>
                </Row>
              </div>
            } {/* 판매상품 없을 때 뷰 끝 */}
          </Card>
          : null} {/* sellProduct != true 일 때 null */}

      </Row>
    </div>
  )
}