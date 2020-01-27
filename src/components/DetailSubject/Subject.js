import React, { useState, useEffect } from "react";
// import styled from "styled-components";
import { Col, Row, Carousel, Icon, Divider, Popconfirm, message, Tag } from "antd";
import { Link, RouteComponentProps } from "react-router-dom";
import axios from "axios";
import NumberFormat from 'react-number-format';

function Subject({match}) {

  //const [id, setId] = useState("5e2d39aa3eb3ee04d828414d");
  const [id, setId] = useState("");
  const [item, setItem] = useState({});
  const [seller, setSeller] = useState({});
  const [isBookmarked, setIsBookmarked] = useState(0);
  const authToken =
    localStorage.getItem("token") == null ? "" : localStorage.getItem("token");
  const server_url = `http://13.124.113.72:8080`;
  const detail_sub_url = `${server_url}/sell/detail?id=${id}`;
  const bookmark_url = `${server_url}/bookmark?sellItemId=${id}`;
  const transaction_url = `${server_url}/transaction`;

  useEffect(() => {

    const id = window.location.pathname.substring(12);
    setId(id);

  }, []);

  useEffect(() => {

      if(id != ""){
      const getItemData = async () => {
        const result = await axios.get(detail_sub_url, {
          headers: { Authorization: authToken }
        });
        // console.log(result.data.data);
        // 로그인 인증 정보 보내기. 에러 처리 필요
        setItem(result.data.data.sellItem);
        setSeller(result.data.data.sellerUser);
        setIsBookmarked(result.data.data.bookmarked);
      };
      getItemData();
      }

  }, [id]);

  const dateFormat = rawDate => {
    const date = rawDate.slice(0, 10).split("-");
    // return date[0] + "." + date[1] + "." + date[2];
    return `${date[0]}.${date[1]}.${date[2]}`;
  };
  const qualDisplay = (qualInList, qualOutList) => {
    const qualLi = qualOutList.concat(qualInList);
    const qualValueOut = ["깨끗", "이름기입", "긁힘/접힘", "찢어짐"];
    const qualValueIn = ["밑줄", "연필", "볼펜/형광펜", "문제풀음", "물에젖음"];
    const qualValueLi = qualValueOut.concat(qualValueIn);

    return (
      <Row>
        {qualValueLi.map((val, i) => {
          return qualLi[i] == 1 ? 
          <Col xs={{offset : 1, span : 2}}><Tag color="#44a0ac">{val}</Tag></Col> : null;
        })}
      </Row>
    );
  };

  const confirm = e => {
    message.success("구매 신청이 완료되었습니다.");
    const buyReq = {
      sellItemId: id,
      sellerId: seller.id,
      transactionType: item.dealType,
      sellerStep: 0,
      buyerStep: 0,
      boxId: "",
      boxPassword: ""
    };
    axios.post(transaction_url, buyReq, {
      headers: { Authorization: authToken }
    });
  };

  const updateBookmark = isBookmarked => {
    isBookmarked = setIsBookmarked(!isBookmarked);
    axios
      .get(bookmark_url, {
        headers: { Authorization: authToken }
      })
      .then(res => console.log(res));
  };

  return (
    <div style={{ width: "100%",
      height: "100vh",
      overflow: "auto"}}>
      <header>
        <Row style={{ marginTop: "3vh", marginBottom: "5vh" }}>
          <Col xs={{ span: 8 }}>
            <Link to="/">
              <Icon
                type="arrow-left"
                style={{
                  marginLeft: "25%",
                  fontSize: "3vh"
                  // color: "#ffffff"
                }}
              />
            </Link>
          </Col>
          <Col xs={{ span: 1, offset: 11 }}>
            <Icon
              type="heart"
              theme={isBookmarked == 1 ? "filled" : "outlined"}
              onClick={() => {
                return authToken != "" ? updateBookmark(isBookmarked) : null;
              }}
            />
          </Col>
          <Col xs={{ span: 1, offset: 2 }}>
            <Icon type="share-alt" />
          </Col>
        </Row>
      </header>
      <Row>
        <Col align="center">
          <Carousel>
            {item.regiImageUrlList != undefined
              ? item.regiImageUrlList.map((imgUrl, i) => {
                  return (
                    <div>
                      <img style={{ width: "100vh", height: "40vh", 
                      backgroundSize: "contain" }} src={imgUrl}></img>
                    </div>
                  );
                })
              : null}
          </Carousel>
        </Col>
      </Row>

      <Row style={{marginTop : "3vh"}}>
        <Row>
          <Col xs={{span : 22, offset : 1}}>
            <h1 style={{fontSize : "3.5vh", color : "#656565",
          fontWeight : "500"}}>{item.title}</h1>
          </Col>
        </Row>
        <Row>
          <Row >
            <Col style={{marginBottom : "-1vh"}} xs={{span : 22, offset : 1}}>
              <h2 style={{fontSize : "1.75vh", color : "#656565"}}>{item.author}</h2>
            </Col>
          </Row>
          <Row>
            <Col xs={{span : 22, offset : 1}}>
              <h3 style={{fontSize : "1.75vh", color : "#656565"}}>{item.publisher}</h3>
            </Col>
          </Row>
        </Row>
        <Row style={{marginTop : "1.25vh"}}>
          <Row>
            <Col xs={{span : 22, offset : 1}}>
              <span style={{fontSize : "1.75vh", color : "#656565",
            textDecoration : "line-through"}}>정가 : 
            <NumberFormat value={item.price} displayType={'text'} thousandSeparator={true}/>
            원</span>
            </Col>
          </Row>
          <Row>
            <Col xs={{span : 22, offset : 1}}>
              <span style={{fontSize : "2.25vh",
            color : "#44a0ac", fontWeight : "600" }}>북을 판매가 :  <NumberFormat value={item.regiPrice} displayType={'text'} thousandSeparator={true}/>
            원</span>
            </Col>
          </Row>
        </Row>
      </Row>
      <Row>
        <Col>
          <Divider style={{ background: "lightgray" }} />
        </Col>
      </Row>
      <Row>
        <Col xs={{span : 2, offset : 1}}>
          <Icon type="user" />
        </Col>
        {/* 아직 셀러 정보 조회 API 없음 */}
        <Col xs={{span : 10, offset : 1}}>
          <Row>
            <Col><span style={{fontSize : "2vh", color : "#656565"}}>{seller.nickname}</span></Col>
            <Col><span style={{fontSize : "2vh", color : "#656565"}}>{seller.major}</span></Col>
          </Row>
        </Col>
        <Col xs={{span : 6, offset : 4}}>
          <Link>
            <span style={{fontSize : "1.5vh"}}>판매자 정보 더보기</span>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Divider style={{ background: "lightgray" }} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col xs={{span : 23, offset : 1}}>
              <span style={{fontSize : "2vh", color : "#656565"}}>
                {item.regiTime != undefined ? dateFormat(item.regiTime): null}
               {item.dealType == 0 ? " | 북을박스" : " | 직거래"}</span>
            </Col>
          </Row>
              {item.qualityIn != undefined && item.qualityOut != undefined
                ? qualDisplay(item.qualityIn, item.qualityOut)
                : null}
        </Col>
      </Row>
      <Row style={{marginTop : "2vh", marginBottom : "2vh"}}>
        <Col xs={{span : 22, offset : 1}}>
          <span style={{fontSize : "2vh", color : "#656565"}}>{item.comment}</span>
          </Col>
      </Row>
      <Row style={{marginBottom : "7vh"}}>
        <Col xs={{offset : 1, span : 22}}>
          <Popconfirm
            placement="bottom"
            title="판매자에게 구매 신청을 보내겠습니까?"
            onConfirm={confirm}
            okText="네"
            cancelText="아니오"
          >
            <button
              style={{
                padding: "0",
                width: "100%",
                background: "rgba(51, 158, 172, 0.9)",
                color: "#ffffff",
                border: "none",
                borderRadius: "2.25vh",
                fontSize: "2.5vh",
                height: "5vh"
              }}
            >
              구매하기
            </button>
          </Popconfirm>
        </Col>
      </Row>
    </div>
  );
}
export default Subject;
