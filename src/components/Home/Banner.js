import React, { Component } from 'react';
import './Banner.css';
import '../Navbar/Search.css';
import { Row, Col, Icon, List, Divider, Rate, message } from 'antd';
import Navbar from '../Navbar/Navbar';
import Search from '../Navbar/Search';
import { withRouter, Link } from "react-router-dom";
import moment from 'moment';
import NumberFormat from 'react-number-format';
import axios from 'axios';
import inobounce from '../../utils/inobounce';

class Banner extends Component {
  state = {
    isScrolled: false,
    bannerList: "banner-list",
    isFocused: false,
    inDetail: false,
    isDoubleFocused: false,
    mode: "buy",
    isAlarmNeedSectionAppened : false
  }

  getHomeData = async () => {
    axios.get('http://13.124.113.72:8080/home')
      .then((response) => {
        this.setState({
          bookResList1: response.data.data[0],
          bookResList2: response.data.data[1],
          bookResList3: response.data.data[2]
        })
      });
  }

  getSellItemList = async (itemId) => {
    axios.get('http://13.124.113.72:8080/sell?itemId=' + itemId)
      .then((response) => {
        console.log(response);
        this.setState({
          sellItemList: response.data.data
        });
      });
  }

  focusOnSearch = (isFocused) => {
    if (this.state.isFocused) {
      this.setState({ isDoubleFocused: true });
    }
    this.setState({ isFocused: isFocused });
  }

  unFocusOnSearch = () => {
    this.setState({ isFocused: false, bannerList: "banner-list" });
  }

  updateInputValue = (resdata) => {
    this.setState({ resdata: resdata });
  }

  changeMode = (mode) => {
    this.setState({ mode: mode });
  }

  changeIsAlarmNeedSectionAppened = (isAlarmNeedSectionAppened) => {
    this.setState({ isAlarmNeedSectionAppened : isAlarmNeedSectionAppened });
  }

  componentWillMount() {
    this.getHomeData();
  }

  render() {
    if (this.state.isDoubleFocused) {
      this.setState({ inDetail: false });
      this.setState({ isDoubleFocused: false });
    }
    return (
      <section id="banner-container" onScroll={this.handleScroll}>
        <Navbar focusOnSearch={this.focusOnSearch} updateInputValue={this.updateInputValue}
          unFocusOnSearch={this.unFocusOnSearch}
          changeMode={this.changeMode}
          changeIsAlarmNeedSectionAppened = {this.changeIsAlarmNeedSectionAppened}
          search={<Search searchType="buy" />}
          id="navbar"></Navbar>


        {
          this.state.mode == "sell" ?
            <Row>
              <Col xs={{ span: 24 }}>
                <div onClick={() => { this.props.history.push('/sell'); }} style={{
                  width: "35vh", height: "35vh",
                  backgroundSize: "cover",
                  backgroundImage: "url('https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/sell_button_2.png')",
                  margin: "auto", marginTop: "4vh", marginBottom: "2vh", borderRadius: "50%"
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
            </Row> : null
        }
        {
          this.state.mode == "buy" && this.state.isFocused && this.state.resdata != null 
          && this.state.inDetail == false && this.state.isAlarmNeedSectionAppened == false ?
            
          this.state.resdata.filter(r => r.regiPrice != "").map((value, index) => {
              return (
                <div>
                  <Row>
                    <Col offset={1} span={22}><Divider /></Col>
                  </Row>
                  <Row key={index} className="search-result-row"
                    onClick={() => {
                      if (value.regiPrice != "") {
                        this.setState({ value: value });
                        this.setState({ inDetail: true });
                        this.getSellItemList(value.itemId);
                      }
                    }}>
                    <Col xs={{ span: 5, offset: 1 }}>
                      <img style={{
                        width: "100px", height: "150px", backgroundSize: "contain",
                        borderRadius: "7px"
                      }}
                        src={this.state.resdata != null ? value.imageUrl.replace("type=m1", "") : ""}></img>
                    </Col>
                    <Col xs={{ span: 14, offset: 3 }}>
                      <Row>
                        <Col xs={{ span: 24 }}>
                          <span style={{ color: "#656565", fontSize: "17px" }}>{this.state.resdata != null ? value.title.replace(/(<([^>]+)>)/ig, "") : null}</span>
                        </Col>
                      </Row>
                      <Row>
                        <Col style={{ marginTop: "10px", marginBottom: "-9px" }} xs={{ span: 24 }}>
                          <small style={{ color: "#656565", fontSize: "12px", fontWeight: "400" }}>
                            저자 : {this.state.resdata != null ? value.author.replace(/(<([^>]+)>)/ig, "") : null}
                          </small>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={{ span: 24 }}>
                          <small style={{ color: "#656565", fontSize: "12px", fontWeight: "400" }}>
                            출판사 : {this.state.resdata != null ? value.publisher.replace(/(<([^>]+)>)/ig, "") : null}
                          </small>
                        </Col>
                      </Row>
                      <Row>
                        <Col style={{}} xs={{ span: 24 }}>
                          <small style={{ color: "#656565", fontSize: "12px" }}>
                            {this.state.resdata != null && value.regiCount != 0 ? "재고 : " + value.regiCount + "부"
                              : this.state.resdata != null && value.regiCount == 0 ? "재고 : 재고 없음"
                                : null}
                          </small>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: "3.5vh" }}>
                        <Col style={{ marginBottom: "-0.2vh" }} xs={{ span: 24 }}>
                          <small style={{ color: "#656565", fontSize: "13px", textDecoration: "line-through" }}>
                            {this.state.resdata != null ? "정가 : " : null}
                            {this.state.resdata != null ?
                              <NumberFormat value={value.price} displayType={'text'} thousandSeparator={true} />
                              : null}
                            {this.state.resdata != null ? "원" : null}
                          </small>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={{ span: 24 }}>
                          <small style={{ color: "#656565", fontSize: "15px", fontWeight: "500" }}>
                            {this.state.resdata != null && value.regiPrice != "" ? "북을 판매가  : " : null}
                            {this.state.resdata != null ?
                              <small style={{ color: "rgba(51, 158, 172, 0.9)", fontSize: "15px" }}>
                                <NumberFormat value={value.regiPrice} displayType={'text'} thousandSeparator={true} />
                              </small>
                              : null}
                            {this.state.resdata != null && value.regiPrice != "" ?
                              <small style={{ color: "rgba(51, 158, 172, 0.9)", fontSize: "2.3vh" }}>원~</small> :
                              null}
                          </small>
                        </Col>
                      </Row>

                    </Col>
                  </Row>
                </div>
              );
              } 
            )

            :
            this.state.isFocused && this.state.resdata == null ?
              <div style={{ height: "100%" }}>
                <div style={{ marginTop: "25%" }}>
                  <h5 style={{
                    textAlign: "center",
                    color: "gray", fontWeight: "500"
                  }}>구매할 도서를<br /> 검색해주세요!</h5>
                </div>
              </div>
              
              : this.state.isFocused && this.state.resdata != null && this.state.inDetail &&
                !this.state.inSubDetail ?
                <div style={{ marginBottom: "12vh" }}>
                  <Row className="search-result-row" style={{ paddingTop: "5vh", paddingBottom: "-5vh", marginBottom: "-5vh" }}>
                    <Col xs={{ span: 5, offset: 1 }}>
                      <img style={{
                        width: "14vh", height: "21vh", backgroundSize: "contain",
                        borderRadius: "7px"
                      }}
                        onClick={() => {
                          this.setState({ inDetail: true });
                        }}
                        src={this.state.resdata != null ? this.state.value.imageUrl.replace("type=m1", "") : null}></img>
                    </Col>
                    <Col xs={{ span: 14, offset: 2 }}>
                      <Row>
                        <Col xs={{ span: 24 }}>
                          <span style={{ color: "#656565", fontSize: "2.2vh" }}>{this.state.resdata != null ? this.state.value.title.replace(/(<([^>]+)>)/ig, "") : null}</span>
                        </Col>
                      </Row>
                      <Row>
                        <Col style={{ marginTop: "2.5vh", marginBottom: "-1.5vh" }} xs={{ span: 24 }}>
                          <small style={{ color: "#656565", fontSize: "1.75vh", fontWeight: "400" }}>
                            저자 : {this.state.resdata != null ? this.state.value.author.replace(/(<([^>]+)>)/ig, "") : null}
                          </small>
                        </Col>
                      </Row>
                      <Row>
                        <Col style={{}} xs={{ span: 24 }}>
                          <small style={{ color: "#656565", fontSize: "1.75vh", fontWeight: "400" }}>
                            출판사 : {this.state.resdata != null ? this.state.value.publisher.replace(/(<([^>]+)>)/ig, "") : null}
                          </small>
                        </Col>
                      </Row>
                      <Row>
                        <Col style={{}} xs={{ span: 24 }}>
                          <small style={{ color: "#656565", fontSize: "1.75vh" }}>
                            {this.state.resdata != null && this.state.value.regiCount > 0 ? "재고 : " + this.state.value.regiCount.toString()
                              : this.state.resdata != null && this.state.value.regiCount == 0 ? "재고 : 재고 없음"
                                : null}
                          </small>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: "2.0vh" }}>
                        <Col style={{ marginBottom: "-0.2vh" }} xs={{ span: 24 }}>
                          <small style={{ color: "#656565", fontSize: "1.75vh", textDecoration: "line-through" }}>
                            {this.state.resdata != null ? "정가 : " : null}
                            {this.state.resdata != null ?
                              <NumberFormat value={this.state.value.price} displayType={'text'} thousandSeparator={true} />
                              : null}
                            {this.state.resdata != null ? "원" : null}
                          </small>
                        </Col>
                      </Row>

                      {this.state.isFocused && this.state.resdata != null && this.state.inDetail &&
                        this.state.sellItemList != null && this.state.sellItemList.length != 0 ?
                        <Row style={{}}>
                          <Col xs={{ span: 24 }}>
                            <small style={{ color: "#656565", fontSize: "2.3vh", fontWeight: "500" }}>
                              {this.state.resdata != null && this.state.value.regiPrice != "" ? "북을 판매가 : " : ""}
                              {this.state.resdata != null ?
                                <small style={{ color: "rgba(51, 158, 172, 0.9)", fontSize: "2.3vh" }}>
                                  <NumberFormat value={this.state.value.regiPrice} displayType={'text'} thousandSeparator={true} />
                                </small>
                                : null}
                              {this.state.resdata != null && this.state.value.regiPrice != "" ?
                                <small style={{ color: "rgba(51, 158, 172, 0.9)", fontSize: "2.3vh" }}>원~</small> :
                                null}
                            </small>
                          </Col>
                        </Row>
                        :
                        null
                      }
                    </Col>
                  </Row>
                  <Row>
                    <Col offset={1} span={22}><Divider /></Col>
                  </Row>
                  {this.state.isFocused && this.state.resdata != null && this.state.inDetail &&
                    this.state.sellItemList != null && this.state.sellItemList.length != 0 ?
                    this.state.sellItemList.map((value, index) => {
                      return (
                        <Link to={"/buy/detail/" + value._id}>
                          <Row style={{ marginBottom: "40px" }}>
                            <Col xs={{ span: 3, offset: 1 }}>
                                <img style={{
                                  width: "60px", height: "60px", backgroundSize: "contain",
                                  borderRadius: "7px", overflow: "hidden"
                                }}
                                  onClick={() => {
                                    this.setState({ inSubDetail: true });
                                    this.setState({ sellItem: value });
                                  }}
                                  src={this.state.resdata != null ? value.regiImageUrlList[0].replace("type=m1", "") : null}></img>
                            </Col>
                            <Col style={{marginTop : "5.5px"}} xs={{ span: 18, offset: 2 }}>
                              <Row>
                                <Col xs={{ span: 24 }}>
                                  <small style={{ color: "#656565", fontSize: "15px", fontWeight: "500" }}>
                                    {"북을 판매가 : "}
                                    {this.state.resdata != null ?
                                      <small style={{ color: "rgba(51, 158, 172, 0.9)", fontSize: "15px" }}>
                                        <NumberFormat value={value.regiPrice} displayType={'text'} thousandSeparator={true} />원
                                      </small>
                                      : null}
                                  </small>
                                </Col>
                              </Row>
                              <Row>
                                <Col xs={{ span: 24 }}>
                                  <small style={{ color: "#656565", fontSize: "12px" }}>
                                    <Rate style={{
                                      color: "rgba(51, 158, 172, 0.9)",
                                      fontSize: "10px", textAlign: "center"
                                    }} disabled defaultValue={value.quality} />
                                    <small style={{
                                      color: "#656565", fontSize: "12px",
                                      textAlign: "center", padding: "auto"
                                    }} />
                                    &nbsp;  | &nbsp; {moment(value.date).add(9, 'hours').format('YYYY.MM.DD')}
                                    &nbsp;  | &nbsp; {value.dealType == 0 ? "직거래" : "북을박스 거래"}
                                  </small>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Link>
                      )
                    }) : null}
                </div>
                : null}

        {this.state.mode == "buy" && this.state.isFocused && this.state.resdata != null 
          && this.state.inDetail == false && this.state.isAlarmNeedSectionAppened == false ? 
          <div>
            <Row>
              <Col offset={1} span={22}><Divider /></Col>
            </Row>
            <Row>
              <Col xs={{offset : 2, span : 20}}>
                <h5 style={{color : "#707070"}}>찾고있는 서적이 없다면…</h5>     
              </Col>
            </Row> 
            <Row>
              <Col xs={{offset : 1, span : 22}}>
                <ul style={{color : "#707070"}}>
                  <li>핵심 단어를 띄어쓰기 하여 입력해주세요.</li>
                  <li>오타가 있는지 다시 확인해보세요.</li>
                  <li style={{color : "#e95513"}}>‘입고 알림 신청하기’를 눌러 입고 알림을 신청해보세요.</li>
                </ul>            
              </Col>
            </Row> 
            <Row style={{ marginBottom: "100px" }}>
              <Col xs={{offset : 2, span : 20}}>
                <button
                  style={{
                    padding: "0",
                    width: "100%",
                    background: "rgba(51, 158, 172, 0.9)",
                    color: "#ffffff",
                    border: "none", borderRadius: "14px", fontSize: "18px", height: "32px"
                  }}
                  onClick={()=>{this.setState({isAlarmNeedSectionAppened : true})}}
                >
                  입고 알림 신청하기
                </button>
              </Col>
            </Row>
          </div>
          
          : null}
        {this.state.mode == "buy" && this.state.isFocused && this.state.resdata != null 
          && this.state.inDetail == false && this.state.isAlarmNeedSectionAppened == true ? 
          this.state.resdata.filter(r => r.regiPrice == "").map((value, index) => {
            return (
              <div>
                <Row>
                  <Col offset={1} span={22}><Divider /></Col>
                </Row>
                <Row key={index} className="search-result-row"
                  onClick={() => {
                    if (value.regiPrice != "") {
                      this.setState({ value: value });
                      this.setState({ inDetail: true });
                      this.getSellItemList(value.itemId);
                    }
                  }}>
                  <Col xs={{ span: 5, offset: 1 }}>
                    <img style={{
                      width: "100px", height: "150px", backgroundSize: "contain",
                      borderRadius: "7px"
                    }}
                      src={this.state.resdata != null ? value.imageUrl.replace("type=m1", "") : ""}></img>
                  </Col>
                  <Col xs={{ span: 14, offset: 3 }}>
                    <Row>
                      <Col xs={{ span: 24 }}>
                        <span style={{ color: "#656565", fontSize: "17px" }}>{this.state.resdata != null ? value.title.replace(/(<([^>]+)>)/ig, "") : null}</span>
                      </Col>
                    </Row>
                    <Row>
                      <Col style={{ marginTop: "10px", marginBottom: "-9px" }} xs={{ span: 24 }}>
                        <small style={{ color: "#656565", fontSize: "12px", fontWeight: "400" }}>
                          저자 : {this.state.resdata != null ? value.author.replace(/(<([^>]+)>)/ig, "") : null}
                        </small>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={{ span: 24 }}>
                        <small style={{ color: "#656565", fontSize: "12px", fontWeight: "400" }}>
                          출판사 : {this.state.resdata != null ? value.publisher.replace(/(<([^>]+)>)/ig, "") : null}
                        </small>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "3.5vh" }}>
                      <Col style={{ marginBottom: "-0.2vh" }} xs={{ span: 24 }}>
                        <small style={{ color: "rgba(51, 158, 172, 0.9)", fontSize: "15px", fontWeight: "500"}}>
                          {this.state.resdata != null ?
                            <NumberFormat value={value.price} displayType={'text'} thousandSeparator={true} />
                            : null}
                          {this.state.resdata != null ? "원" : null}
                        </small>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={{ offset : 18, span: 4 }}>
                        <Icon type="bell" style={{color : "#e95513", fontSize : "45px"}}
                        onClick={()=>{message.success("입고 알림이 정상적으로 신청되었습니다!");}}></Icon>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
          )})
          : null}
        {
          this.state.mode == "buy" && this.state.isFocused == false?
            <div id="banner-list">
              <Row clasnsName="banner-list-title" style={{ marginBottom: "3vh" }}>
                <Col xs={{ span: 18, offset: 1 }}><h5 style={{ fontSize: "2.8vh", color: "#707070", fontWeight: 500 }}>방금 올라온 책</h5></Col>
              </Row>
              <Row>
                <Col xs={{ span: 22, offset: 1 }}>
                  <List
                    className="list"
                    grid={{
                      gutter: 16,
                      xs: 4,
                      sm: 1,
                      md: 4,
                      lg: 4,
                      xl: 4,
                      xxl: 3,
                    }}
                    dataSource={this.state.bookResList1}
                    renderItem={item => (

                      <List.Item
                        key={item.title}
                      >
                        <Row>
                          <Link to={"/buy/detail/" + item._id}>
                            <Col span={24}>
                              <img
                                style={{ width: "10vh", height: "15vh", backgroundSize: "contain" }}
                                src={item.imageUrl.replace("type=m1", "")}
                              ></img>
                            </Col>
                          </Link>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <small class="banner-list-item-title">{item.title}</small>
                          </Col>
                        </Row>
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
              <Row className="banner-list-title">
                <Col xs={{ span: 18, offset: 1 }}><h5 style={{ fontSize: "2.8vh", color: "#707070", fontWeight: 500 }}>금주의 핫딜</h5></Col>
              </Row>
              <Row>
                <Col xs={{ span: 22, offset: 1 }}>
                  <List
                    className="list"
                    grid={{
                      gutter: 16,
                      xs: 4,
                      sm: 1,
                      md: 4,
                      lg: 4,
                      xl: 4,
                      xxl: 3,
                    }}
                    dataSource={this.state.bookResList2}
                    renderItem={item => (

                      <List.Item
                        key={item.title}
                      >
                        <Row>
                          <Link to={"/buy/detail/" + item._id}>
                            <Col span={24}>
                              <img
                                style={{ width: "10vh", height: "15vh", backgroundSize: "contain" }}
                                src={item.imageUrl.replace("type=m1", "")}
                              ></img>
                            </Col>
                          </Link>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <small class="banner-list-item-title">{item.title}</small>
                          </Col>
                        </Row>
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
              <Row className="banner-list-title">
                <Col xs={{ span: 18, offset: 1 }}><h5 style={{ fontSize: "2.8vh", color: "#707070", fontWeight: 500 }}>인기 도서</h5></Col>
              </Row>
              <Row>
                <Col xs={{ span: 22, offset: 1 }}>
                  <List
                    className="list"
                    grid={{
                      gutter: 16,
                      xs: 4,
                      sm: 1,
                      md: 4,
                      lg: 4,
                      xl: 4,
                      xxl: 3,
                    }}
                    dataSource={this.state.bookResList3}
                    renderItem={item => (

                      <List.Item
                        key={item.title}
                      >
                        <Row>
                          <Link to={"/buy/detail/" + item._id}>
                            <Col span={24}>
                              <img
                                style={{ width: "10vh", height: "15vh", backgroundSize: "contain" }}
                                src={item.imageUrl.replace("type=m1", "")}
                              ></img>
                            </Col>
                          </Link>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <small class="banner-list-item-title">{item.title}</small>
                          </Col>
                        </Row>
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
            </div>
            : null
        }

      </section>
    );
  };
}


export default withRouter(Banner);