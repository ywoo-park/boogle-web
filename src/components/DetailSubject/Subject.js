import React, { useState, useEffect } from "react";
// import styled from "styled-components";
import { Col, Row, Carousel, Icon, Divider } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Subject() {
  const [id, setId] = useState("5e2d0c1d3eb3eeed8c6d89cc");
  const [item, setItem] = useState({});
  const detail_sub_url = `http://13.124.113.72:8080/sell/detail?id=${id}`;

  useEffect(() => {
    const getItemData = async () => {
      const result = await axios.get(detail_sub_url);
      setItem(result.data.data);
    };
    getItemData();
  }, []);

  const dateFormat = rawDate => {
    const date = rawDate.slice(0, 10).split("-");
    return date[0] + "." + date[1] + "." + date[2];
  };
  // const qualDisplay = qual =>{
  //   qual == 0 ?
  // }

  return (
    <div>
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
            <Icon type="heart" />
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
                      <img src={imgUrl}></img>
                    </div>
                  );
                })
              : null}
          </Carousel>
        </Col>
      </Row>

      <Row>
        <Row>
          <Col>
            <h1>{item.title}</h1>
          </Col>
        </Row>
        <Row>
          <Row>
            <Col>
              <h2>{item.author}</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3>{item.publisher}</h3>
            </Col>
          </Row>
        </Row>
        <Row>
          <Row>
            <Col>
              <p>{item.price}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>{item.regiPrice}</p>
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
        <Col>셀러 멤버</Col>
        {/* 아직 셀러 정보 조회 API 없음 */}
        <Col>
          <Row>
            <Col>셀러 이름</Col>
            <Col>셀러 학과</Col>
          </Row>
        </Col>
        <Col>
          <Link>
            <span>판매자 정보 더보기</span>
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
            <Col>별점</Col>
            {/* item.qualOut 개수에 따라서 별점 */}
            <Col>
              {item.regiTime != undefined ? dateFormat(item.regiTime) : null}
            </Col>
            <Col>
              {item.dealType == 0 ? <span>북을박스</span> : <span>직거래</span>}
            </Col>
          </Row>
          <Row>{/* <Col>{th</Col> */}</Row>
        </Col>
      </Row>
      <Row>
        <Col align="center">{item.comment}</Col>
      </Row>
      {/* <Button>구매하기</Button> */}
    </div>
  );
}
