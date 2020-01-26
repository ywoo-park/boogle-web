import React, { Component } from 'react';
import './Banner.css';
import '../Navbar/Search.css';
import { Row, Col, Icon, List, Divider, Rate } from 'antd';
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
    scrolledDown: false,
    scrollTop: 0,
    scrolledDownClass: "",
    isFocused: false,
    inDetail: false,
    isDoubleFocused: false
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

  getHomeData = async () => {
    axios.get('http://13.124.113.72:8080/home')
      .then((response) => {
        this.setState({
          bookResList1: response.data.data.bookResList1,
          bookResList2: response.data.data.bookResList2,
          bookResList3: response.data.data.bookResList3
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
  
  componentWillMount() {
    this.getHomeData();
    inobounce.enable();
    
  }
  componentDidMount(){
    console.log(inobounce.isEnabled);
  }
  
  render() {
    if (this.state.isDoubleFocused) {
      this.setState({ inDetail: false });
      this.setState({ isDoubleFocused: false });
    }
    return (
      <section id="banner-container" onScroll={this.handleScroll} >
        
        <Navbar focusOnSearch={this.focusOnSearch} updateInputValue={this.updateInputValue}
          unFocusOnSearch={this.unFocusOnSearch}
          search={<Search searchType="buy"/>}
          id="navbar"></Navbar>

        {this.state.isFocused && this.state.resdata != null && this.state.inDetail == false ?
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
                      onClick={() => {
                        if (value.registeredCount != 0) {
                          this.setState({ value: value });
                          this.setState({ inDetail: true });
                          this.getSellItemList(value.itemId);
                        }
                      }}
                      src={this.state.resdata != null ? value.imageUrl.replace("type=m1", "") :""}></img>
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
                          {this.state.resdata != null && value.regiCount != 0 ? "재고 : " + value.regiCount
                            : this.state.resdata != null && value.regiCount == 0 ? "재고 : 재고 없음"
                              : null}
                        </small>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "3.5vh" }}>
                      <Col style={{ marginBottom: "-1.0vh" }} xs={{ span: 24 }}>
                        <small style={{ color: "#656565", fontSize: "1.75vh", textDecoration: "line-through" }}>
                          {this.state.resdata != null ? "정가 : " : null}
                          {this.state.resdata != null ?
                            <NumberFormat value={value.price} displayType={'text'} thousandSeparator={true} />
                            : null}
                          {this.state.resdata != null ? "원" : null}
                        </small>
                      </Col>
                    </Row>

                    {this.state.resdata != null && value.lowestPrice != 0 ?
                      <Row>
                        <Col xs={{ span: 24 }}>
                          <small style={{ color: "#656565", fontSize: "2.3vh", fontWeight: "500" }}>
                            {this.state.resdata != null && value.regiPrice != "" ? "북을 판매가 : " : null}
                            {this.state.resdata != null ?
                              <small style={{ color: "rgba(51, 158, 172, 0.9)", fontSize: "2.3vh" }}>
                                <NumberFormat value={value.regiPrice} displayType={'text'} thousandSeparator={true} />
                              </small>
                              : null}
                            {this.state.resdata != null && value.regiPrice != "" ?
                              <small style={{ color: "rgba(51, 158, 172, 0.9)", fontSize: "2.3vh" }}>원~</small> :
                              null}
                          </small>
                        </Col>
                      </Row>
                      :
                      <Row>
                        <Col xs={{ span: 12 }}>
                          <small style={{ color: "#656565", fontSize: "2.3vh", fontWeight: "500" }}>
                            {this.state.resdata != null && value.regiPrice != "" ? "북을 판매가 : " : null}
                            {this.state.resdata != null ?
                              <small style={{ color: "rgba(51, 158, 172, 0.9)", fontSize: "2.3vh" }}>
                                <NumberFormat value={value.regiPrice} displayType={'text'} thousandSeparator={true} />
                              </small>
                              : null}
                            {this.state.resdata != null && value.regiPrice != "" ?
                              <small style={{ color: "rgba(51, 158, 172, 0.9)", fontSize: "2.3vh" }}>원~</small> :
                              null}
                          </small>
                        </Col>
                        <Col style={{ marginTop: "-2.95vh" }} xs={{ span: 12 }}>
                          <button style={{
                            borderRadius: "14px", background: "rgba(51, 158, 172, 0.9)",
                            color: "white", border: "none", fontSize: "1.6vh", height: "3.5vh", width: "110%"
                          }}>재입고알림 신청하기</button>
                        </Col>
                      </Row>
                    }
                  </Col>
                </Row>
              </div>
            );
          })
          :
          this.state.isFocused && this.state.resdata == null ?
            <div style={{ height: "100%" }}>
              <div style={{ marginTop: "50%" }}>
                <h5 style={{
                  textAlign: "center",
                  color: "gray", fontWeight: "500"
                }}>구매할 도서를<br /> 검색해주세요!</h5>
              </div>
            </div>
            : this.state.isFocused && this.state.resdata != null && this.state.inDetail &&
              !this.state.inSubDetail ?
              <div>
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
                        <small style={{ color: "#656565", fontSize: "1.75vh" }}>
                          {this.state.resdata != null ? this.state.value.author.replace(/(<([^>]+)>)/ig, "") : null}
                          {this.state.resdata != null ? " / " : null}
                          {this.state.resdata != null ? this.state.value.publisher.replace(/(<([^>]+)>)/ig, "") : null}
                        </small>
                      </Col>
                    </Row>
                    <Row>
                      <Col style={{}} xs={{ span: 24 }}>
                        <small style={{ color: "#656565", fontSize: "1.75vh" }}>
                          {this.state.resdata != null ? this.state.value.pubdate.toString().substring(0, 4) + "년 " +
                            this.state.value.pubdate.toString().substring(4, 6) + "월" : null}
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
                    <Row style={{ marginTop: "3.5vh" }}>
                      <Col style={{ marginBottom: "-1.0vh" }} xs={{ span: 24 }}>
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
                      <Row>
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
                      <Row>
                        <Col xs={{ span: 12 }}>
                          <small style={{ color: "#656565", fontSize: "2.3vh", fontWeight: "500" }}>
                            {this.state.resdata != null && this.state.value.lowestPrice != 0 ? "북을 판매가 : " : null}
                            {this.state.resdata != null ?
                              <small style={{ color: "rgba(51, 158, 172, 0.9)", fontSize: "2.3vh" }}>
                                <NumberFormat value={this.state.value.lowestPrice} displayType={'text'} thousandSeparator={true} />
                              </small>
                              : null}
                            {this.state.resdata != null && this.state.value.lowestPrice != 0 ?
                              <small style={{ color: "rgba(51, 158, 172, 0.9)", fontSize: "2.3vh" }}>원~</small> :
                              null}
                          </small>
                        </Col>
                        <Col style={{ marginTop: "-2.95vh" }} xs={{ span: 12 }}>
                          <button style={{
                            borderRadius: "14px", background: "rgba(51, 158, 172, 0.9)",
                            color: "white", border: "none", fontSize: "1.6vh", height: "3.5vh", width: "110%"
                          }}>재입고알림 신청하기</button>
                        </Col>
                      </Row>
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
                      <Row>
                        <Col xs={{ span: 3, offset: 1 }}>
                          <div style={{
                            width: "10vh", height: "10vh"
                          }}>
                            <img style={{
                              width: "10vh", height: "10vh", backgroundSize: "contain",
                              borderRadius: "7px", overflow: "hidden"
                            }}
                              onClick={() => {
                                this.setState({ inSubDetail: true });
                                this.setState({ sellItem: value });
                              }}
                              src={this.state.resdata != null ? value.regiImageUrlList[0].replace("type=m1", "") : null}></img>
                          </div>
                        </Col>
                        <Col xs={{ span: 18, offset: 2 }}>
                          <Row>
                            <Col xs={{ span: 24 }}>
                              <small style={{ color: "#656565", fontSize: "2.3vh", fontWeight: "500" }}>
                                {"북을 판매가 : "}
                                {this.state.resdata != null ?
                                  <small style={{ color: "rgba(51, 158, 172, 0.9)", fontSize: "2.3vh" }}>
                                    <NumberFormat value={value.regiPrice} displayType={'text'} thousandSeparator={true} />원
                              </small>
                                  : null}
                              </small>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={{ span: 24 }}>
                              <small style={{ color: "#656565", fontSize: "1.75vh" }}>
                                <Rate style={{
                                  color: "rgba(51, 158, 172, 0.9)",
                                  fontSize: "1.5vh", textAlign: "center"
                                }} disabled defaultValue={value.quality} />
                                <small style={{
                                  color: "#656565", fontSize: "1.6vh", fontWeight: "500",
                                  textAlign: "center", padding: "auto"
                                }} />
                                &nbsp;  | &nbsp; {moment(value.date).add(9, 'hours').format('YYYY.MM.DD')}
                                &nbsp;  | &nbsp; {value.dealType == 0 ? "직거래" : "북을박스 거래"}
                              </small>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    )
                  }) : null}
              </div>

              : this.state.isFocused && this.state.resdata != null && this.state.inDetail &&
                this.state.inSubDetail ?
                <div>
                  <Row>
                    <Col xs={{ span: 24 }}>
                      <img></img>
                    </Col>
                  </Row>
                </div>
                :
                <div id="banner-list">
                  <Row clasnsName="banner-list-title">
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
                              <Col span={24}>
                                <img
                                  style={{ width: "10vh", height: "15vh", backgroundSize: "contain" }}
                                  src={item.imageUrl.replace("type=m1", "")}
                                ></img>
                              </Col>
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
                              <Col span={24}>
                                <img
                                  style={{ width: "10vh", height: "15vh", backgroundSize: "contain" }}
                                  src={item.imageUrl.replace("type=m1", "")}
                                ></img>
                              </Col>
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
                              <Col span={24}>
                                <img
                                  style={{ width: "10vh", height: "15vh", backgroundSize: "contain" }}
                                  src={item.imageUrl.replace("type=m1", "")}
                                ></img>
                              </Col>
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
        }
        <Row id="banner-bottom-navbar" className={this.state.scrolledDownClass}>
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
          <Col xs={{ span: 6, offset: 0 }}>
            <Row>
              <Col span={24}>
                <Icon className="navbar-top-icon" type="edit" theme="outlined" style={{ color: "#666666", margin: "auto", marginTop: "1vh" }}></Icon>
              </Col>
            </Row>
            <Row>
              <Col onClick={() => { this.props.history.push('/sell'); }} span={24}>
                <small >판매하기</small>
              </Col>
            </Row>
          </Col>
          <Link to="/signin">
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
      </section>
    );
  };
}


export default withRouter(Banner);